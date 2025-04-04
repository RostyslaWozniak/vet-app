export const oAuthProviders = ["google"] as const;

export type OAuthProvider = (typeof oAuthProviders)[number];
