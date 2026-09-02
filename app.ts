import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "./src/env/index.ts";
import { orgRoutes } from "./src/http/org/routes.ts";
import fastifyCookie from "@fastify/cookie";
const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refresh',
        signed: false
    }
})

app.register(orgRoutes)

export default app