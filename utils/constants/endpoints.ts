interface APIEndpoints {
    [APIKey: string]: string,
}
export default {
    FEEDBACK: "https://gr06twz66l.execute-api.us-east-1.amazonaws.com/mt-v2/user/message"// mainnet feedback endpoint
} as APIEndpoints