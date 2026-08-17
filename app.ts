import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "./src/env/index.ts";
const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

export default app