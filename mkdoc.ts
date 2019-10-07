import * as fs from 'fs-extra';
import {LazyGetter} from 'lazy-get-decorator';
import {basename, dirname, join} from 'path';
import * as pluralise from 'pluralize';
import {sync as rimraf} from 'rimraf';
import {
  Application,
  DeclarationReflection,
  ProjectReflection,
  ReflectionKind,
  SignatureReflection,
  TypeParameterReflection
} from 'typedoc';
import {
  ArrayType,
  Comment,
  IntrinsicType,
  ReferenceType,
  ReflectionType,
  Type,
  TypeParameterType
} from 'typedoc/dist/lib/models';
import {SourceReference} from 'typedoc/dist/lib/models/sources/file';
import find = require('lodash/find');
import get = require('lodash/get');
import sortBy = require('lodash/sortBy');
import upperFirst = require('lodash/upperFirst');

//tslint:disable:no-var-requires max-file-line-count

const GIT_REPO = 'Alorel/rxutils';
const REVISION = require('./package.json').version;
const WRITE_PATH = join(__dirname, 'docs');
const DEFAULT_LANG = 'typescript';

const referenceLinks = {
  MonoTypeOperatorFunction: 'https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction',
  Observable: 'https://rxjs.dev/api/index/class/Observable',
  ObservableInput: 'https://rxjs.dev/api/index/type-alias/ObservableInput',
  Observer: 'https://rxjs.dev/api/index/interface/Observer',
  OperatorFunction: 'https://rxjs.dev/api/index/interface/OperatorFunction',
  Pick: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk',
  PropertyKey: '#',
  SchedulerLike: 'https://rxjs.dev/api/index/interface/SchedulerLike'
};
const CUSTOM_WRITE_PATHS = {
  setDefaultLogger: 'misc/setDefaultLogger.md',
  wasLogged: 'misc/wasLogged.md'
};

rimraf(WRITE_PATH);

function processComment(c?: Comment | null): string {
  if (!c) {
    return '';
  }

  const lines: string[] = [];
  if (c.shortText) {
    lines.push(c.shortText.trim());
  }
  if (c.text) {
    lines.push(c.text.trim());
  }

  return lines.join('');
}

function linkReference(ref: ReferenceType, referenceLineNumbers = true): string {
  if (!referenceLinks[ref.name]) {
    const def = <DeclarationReflection>find(project.children, {name: ref.name});
    if (def) {
      let out = sourceRefLink(def.sources![0], referenceLineNumbers);
      if (def.typeParameters && def.typeParameters.length) {
        out += `\\<${def.typeParameters.map(t => t.name)}>`;
      }

      return out;
    }

    throw new Error(`Unknown reference type: ${ref.name}`);
  }

  let out = `[${ref.name}](${referenceLinks[ref.name]})`;
  if (ref.typeArguments && ref.typeArguments.length) {
    out += `\\<${ref.typeArguments.map(t => stringifyType(t, false)).join(', ')}>`;
  }

  return out;
}

function stringifyType(type?: Type | null, referenceLineNumbers = true): string {
  if (type) {
    let out: string;

    switch (type.type) {
      case 'intrinsic':
      case 'typeParameter':
        return (<IntrinsicType | TypeParameterType>type).name;
      case 'array':
        return `${stringifyType((<ArrayType>type).elementType)}[]`;
      case 'reference':
        const rt = <ReferenceType>type;
        out = linkReference(rt, referenceLineNumbers);

        return out;
      case 'reflection':
        return stringifySignature((<ReflectionType>type).declaration.signatures![0], false);
      default:
        throw new Error(`Don't know how to stringify type ${type.type}`);
    }
  }

  return '';
}

function stringifySignature(sig: SignatureReflection, includeName = true): string {
  let out = includeName ? sig.name : '';
  out += `${typeParamsToString(sig.typeParameters)}(`;

  if (sig.parameters && sig.parameters.length) {
    const params: string[] = [];
    for (const p of sig.parameters) {
      let paramStr = p.flags.isRest ? `...${p.name}` : p.name;
      if (p.flags.isOptional || (p.defaultValue && p.defaultValue.trim())) {
        paramStr += '?';
      }
      paramStr += `: ${stringifyType(p.type, false)}`;
      params.push(paramStr);
    }
    out += `${params.join(', ')}`;
  }

  return `${out})${includeName ? ':' : ' =>'} ${sig.type ? stringifyType(sig.type, false) : 'any'}`;
}

const typeParamsToString = (() => {
  const mapper = (t: TypeParameterReflection) => t.name;

  return (params?: TypeParameterReflection[]): string => {
    if (params && params.length) {
      return `\\<${params.map(mapper).join(', ')}>`;
    }

    return '';
  };
})();

const project: ProjectReflection = (() => {
  const app = new Application({
    mode: 'file',
    logger: 'none',
    target: 'ES6',
    module: 'CommonJS',
    name: 'RxUtils',
    excludeNotExported: true,
    excludeExternals: true
  });

  return <ProjectReflection>app.convert(app.expandInputFiles(['src']));
})();

function tryGetCommentKind(c?: Comment | null): string | void {
  return (c && c.hasTag('kind') && c.getTag('kind')!.text) || undefined;
}

function sourceRefLink({fileName, line, character, url}: SourceReference, referenceLineNumbers = true): string {
  if (!url) {
    url = `https://github.com/${GIT_REPO}/blob/${REVISION}/src/${fileName}#${line}`;
  }
  let linkTxt = fileName;
  if (referenceLineNumbers) {
    linkTxt += `:${line}:${character}`;
  } else {
    linkTxt = basename(linkTxt).replace(/\.[a-zA-Z0-9]+$/, '');
  }

  return `[${linkTxt}](${url})`;
}

class ChildProcessor {
  public static byKind: { [k: string]: ChildProcessor[] } = {};

  private readonly lines: string[] = [];

  public constructor(public readonly child: DeclarationReflection) {
    if (!ChildProcessor.byKind[this.category]) {
      ChildProcessor.byKind[this.category] = [];
    }
    ChildProcessor.byKind[this.category].push(this);
  }

  @LazyGetter()
  public get category(): string {
    let tried = tryGetCommentKind(this.child.comment);
    if (tried) {
      return tried.trim();
    } else if (this.child.signatures && this.child.signatures.length) {
      for (const s of this.child.signatures) {
        tried = tryGetCommentKind(s.comment);
        if (tried) {
          return tried.trim();
        }
      }
    }

    return (this.child.kindString || '').trim();
  }

  public process(): boolean {
    this.lines.splice(0, Number.MAX_VALUE);

    switch (this.child.kind) {
      case ReflectionKind.TypeAlias:
        this.processTypeAlias();
        break;
      case ReflectionKind.Function:
        this.processFunction();
        break;
      case ReflectionKind.Variable:
        this.processVariable();
        break;
      default:
        return false;
    }

    return true;
  }

  public toString(): string {
    return this.lines.join('\n');
  }

  public write(): Promise<void> {
    let filepath: string;
    if (CUSTOM_WRITE_PATHS[this.child.name]) {
      filepath = join(WRITE_PATH, CUSTOM_WRITE_PATHS[this.child.name]);
    } else {
      filepath = join(WRITE_PATH, this.child.sources![0].fileName).replace(/\.ts$/, '.md');
    }
    const dirpath = dirname(filepath);
    fs.mkdirpSync(dirpath);

    return fs.writeFile(filepath, this.toString());
  }

  private getDefLink(source?: SourceReference): string {
    if (!source) {
      return '';
    }

    return `*Defined in ${sourceRefLink(source, true)}.*`;
  }

  private processFunction(): void {
    this.lines.push(
      `# \`${this.category}\` ${this.child.name}`,
      ''
    );

    for (let i = 0; i < this.child.signatures!.length; i++) {
      const sig = this.child.signatures![i];

      let header = `## ${stringifySignature(sig)}`;
      let comment = processComment(sig.comment);

      if (sig.parameters && sig.parameters.length) {
        const descParams = [
          '| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |',
          '|---------------|-----------------|----------|--------------|-------------------|'
        ];

        for (const p of sig.parameters) {
          const hasDefault = p.defaultValue && p.defaultValue.trim();
          const typeStr = stringifyType(p.type, false);
          const paramsJoined = [
            p.name,
            p.comment!.text.replace(/\n/g, ' '),
            typeStr,
            p.flags.isOptional ? ':heavy_check_mark: Yes' : 'No',
            hasDefault ? p.defaultValue!.trim() : ''
          ].join(' | ');
          descParams.push(`| ${paramsJoined} |`);
        }

        comment += `\n\n${descParams.join('\n')}`;
      }

      if (sig.comment!.returns) {
        comment += `\n\n**Returns**: ${sig.comment!.returns}`;
      }

      if (sig.comment!.tags && sig.comment!.tags!.length) {
        for (const tag of sig.comment!.tags!) {
          switch (tag.tagName) {
            case 'see':
            case 'throws':
              comment += `\n\n**${upperFirst(tag.tagName)}**: ${tag.text.trim()}`;
              break;
            case 'since':
              comment += `\n\n*Added in version ${tag.text.trim()}*`;
              break;
          }
        }
        const example = processExample(sig.comment!);
        if (example) {
          comment += example;
        }
      }

      const dl = this.getDefLink(get(this.child.sources, i));
      if (dl) {
        comment += `\n\n${dl}`;
      }

      this.lines.push(header, '', comment);
    }
  }

  private processTypeAlias(): void {
    let signature = this.child.name + typeParamsToString(this.child.typeParameters);
    this.lines.push(
      `# \`${this.category}\` ${signature}`,
      ''
    );
    const comm = processComment(this.child.comment);
    if (comm) {
      this.lines.push(comm, '');
    }
    const dl = this.getDefLink(get(this.child.sources, '0'));
    if (dl) {
      this.lines.push(dl);
    }
  }

  private processVariable(): void {
    this.lines.push(`# \`${this.category}\` ${this.child.name}`);
    const comm = processComment(this.child.comment);
    if (comm) {
      this.lines.push('', comm);
    }
    const example = processExample(this.child.comment!);
    if (example) {
      this.lines.push('', example);
    }
    const dl = this.getDefLink(get(this.child.sources, '0'));
    if (dl) {
      this.lines.push('', dl);
    }
  }
}

function processExample(comment: Comment): string | null {
  const exampleTag = comment.getTag('example');
  if (exampleTag) {
    const langTag = comment.getTag('exampleLang');
    const lang = langTag ? langTag.text.trim() : DEFAULT_LANG;

    return `\n\n**Example**:\n\`\`\`${lang}\n${exampleTag.text.trim()}\n\`\`\``;
  }

  return null;
}

outer:
  for (const child of project.children!) {
    if (!child.flags.isExported || child.flags.isExternal || (child.comment && child.comment.hasTag('internal'))) {
      continue;
    } else if (child.signatures && child.signatures.length) {

      for (const s of child.signatures) {
        if (s.comment && s.comment.hasTag('internal')) {
          continue outer;
        }
      }
    }

    const proc = new ChildProcessor(child);
    if (proc.process()) {
      proc
        .write()
        .catch((e: any) => {
          console.error(e);
          process.exit(1);
        });
    }
  }

(() => {
  let contents: string[] = [
    `# rxutils ${REVISION} documentation`
  ];

  const kinds = Object.keys(ChildProcessor.byKind);
  kinds.sort();

  for (const kind of kinds) {
    contents.push('', `## ${pluralise(kind.trim())}`, '');
    const kids = sortBy(ChildProcessor.byKind[kind], ['child', 'name']);

    for (const cp of kids) {
      let link: string;
      if (CUSTOM_WRITE_PATHS[cp.child.name]) {
        link = CUSTOM_WRITE_PATHS[cp.child.name];
      } else {
        link = cp.child.sources![0].fileName.replace(/\.ts$/, '.md');
      }

      contents.push(`- [${cp.child.name}](${link})`);
    }
  }

  fs.writeFileSync(join(WRITE_PATH, 'README.md'), contents.join('\n') + '\n');
})();
