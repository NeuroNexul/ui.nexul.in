import defaultMdxComponents from "fumadocs-ui/mdx";
import * as Twoslash from "fumadocs-twoslash/ui";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/mdx/mermaid";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import {
  createGenerator,
  createFileSystemGeneratorCache,
} from "fumadocs-typescript";

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
  tsconfigPath: './tsconfig.json',
  basePath: './',
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props} ref={_ref}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Mermaid,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...Twoslash,
    ...TabsComponents,
    ...components,
  };
}
