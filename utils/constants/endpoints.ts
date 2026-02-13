
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FEEDBACK_FORM_URL: string;
    readonly VITE_JSAPI_URL: string;
    readonly VITE_CAPTCHA_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

const { VITE_FEEDBACK_FORM_URL } = import.meta.env;

interface APIEndpoints {
    [APIKey: string]: string;
}
const endpoints: APIEndpoints = {
    FEEDBACK: VITE_FEEDBACK_FORM_URL,
};

console.log("Initialized endpoints", endpoints);

export { endpoints };