import { $Enums } from "@prisma/client";

export const oAuthProviders = [
  $Enums.AuthProvider.github,
  $Enums.AuthProvider.google,
  $Enums.AuthProvider.facebook,
] as const;

export type OAuthProvider = (typeof oAuthProviders)[number];
