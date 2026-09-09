import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.ts";
import { refresh } from "./refresh.controller.ts";

export async function orgRoutes(app: FastifyInstance) {
    app.post('/org', create)

    app.post('/refresh', refresh)
}