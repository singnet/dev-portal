import type { MarkdownOptions } from "vitepress";
import languages from "./customLanguages.ts";

export default {
    lineNumbers: false,
    math: false,
    languages: languages,
} as MarkdownOptions;
