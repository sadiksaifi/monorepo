import { GithubAccessToken, GithubUser } from "./github.schema";
import { OAuth } from "../oauth.types";

class GithubOAuth implements OAuth {
  #CLIENT_ID = "Ov23liv9GmNNMFNoyo3o";
  #CLIENT_SECRET = "02fee430d69f40b29ab95985cc74294a4c2fe49f";
	#ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
	#GITHUB_USER_URL = "https://api.github.com/user";

  async #getAccessToken(code: string) {
    try {
      const res = await fetch(this.#ACCESS_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: this.#CLIENT_ID,
          client_secret: this.#CLIENT_SECRET,
          code,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to get access token");
      }
      const data = (await res.json()) as GithubAccessToken;
      return data.access_token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUser(code: string) {
    try {
      const accessToken = await this.#getAccessToken(code);
      if (!accessToken) {
        return null;
      }
      const res = await fetch(this.#GITHUB_USER_URL, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const user = (await res.json()) as GithubUser;

      return {
        providerAccountId: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

const githubOAuth = new GithubOAuth();

export default GithubOAuth;
export const getGithubOAuthUser = githubOAuth.getUser.bind(githubOAuth);
