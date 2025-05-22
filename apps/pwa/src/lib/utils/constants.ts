export const HOME = "/";
export const CLIENT_ORIGIN =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "https://app.sadiksaifi.dev";
export const SERVER_ORIGIN =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://server.sadiksaifi.dev";
