const SERVER_URL = (import.meta.env.PUBLIC_SERVER_URL ?? "").replace(/\/$/, "");

export const API_URL = `${SERVER_URL}/api/v1`;
export const PUBLIC_ROUTES = ["/auth/signin", "/auth/signup", "/projects"];
export const PRIVATE_ROUTES = ["/dashboard", "/profiles"];
