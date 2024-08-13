import type { LanguageRegistration } from "shiki";

import protobufGrammar from "../../assets/languages/proto3.tmLanguage.json";

const protobuf = {
    ...protobufGrammar,
    aliases: ["protobuf"],
};

// @ts-ignore
export default [protobuf] as LanguageRegistration[];
