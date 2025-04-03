type OAuthUser = {
  providerAccountId: number | string;
  name: string;
  email: string;
  avatarUrl: string;
};

export interface OAuth {
  getUser(code: string): Promise<OAuthUser | null>;
}
