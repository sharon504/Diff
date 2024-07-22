import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
	if (!cookies.get("accessToken")) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/auth/signin",
				"Set-Cookie": `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
			},
		});
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/auth/signin",
			"Set-Cookie": `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
		},
	});
};
