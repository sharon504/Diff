import { defineMiddleware } from "astro:middleware";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants";

export const onRequest = defineMiddleware((context, next) => {
	const accessToken = context.request.headers
		.get("cookie")
		?.split("; ")[0]
		.split("=")[1];
	const path = context.url.pathname;
	if (PRIVATE_ROUTES.includes(path) && !accessToken) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/auth/signin",
				"Set-Cookie": `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
			},
		});
	} else if (PRIVATE_ROUTES.includes(path) && accessToken) {
		context.locals.accessToken = accessToken;
	}
	return next();
});
