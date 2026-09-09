import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.ts";

export async function orgRoutes(app: FastifyInstance) {
    app.post('/org', create)
}