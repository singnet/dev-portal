import type { LanguageRegistration } from "shiki";

import protobufGrammar from "../../assets/languages/proto3.tmLanguage.json";

const protobufLanguage: LanguageRegistration = {
    ...protobufGrammar,
    aliases: ["protobuf", "proto"],
};

export default [protobufLanguage];
