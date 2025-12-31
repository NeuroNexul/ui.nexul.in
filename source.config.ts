import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      tags: z
        .array(z.string())
        .optional()
        .describe("Tags associated with the documentation page."),
      registry_url: z
        .string()
        .url()
        .optional()
        .describe("URL to the registry JSON file for this component."),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypeCodeOptions: {
      inline: "tailing-curly-colon",
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
    },
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
