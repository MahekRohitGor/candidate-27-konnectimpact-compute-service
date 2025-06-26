/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleInvite } from "./handlers/invite";
import { handleRedeem } from "./handlers/redeem";
import { handleWallet } from "./handlers/wallet";
import { Env } from "./types/env";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === "/invite") {
			return handleInvite(request, env);
		}

		if (request.method === "POST" && url.pathname === "/redeem") {
			return handleRedeem(request, env);
		}

		if (request.method === "GET" && url.pathname === "/wallet") {
			return handleWallet(request, env);
		}
		return new Response("Not Found", { status: 404 });
	},
};
