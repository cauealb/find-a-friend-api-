import type { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.cookies)
    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.idOrg,
                expiresIn: '10m'
            }
        }
    )

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.idOrg,
                expiresIn: '7d'
            }
        }
    )

    reply.setCookie('refresh', refreshToken, {
        path: '/',
        secure: false,
        sameSite: true,
        httpOnly: true
    })

    return reply.status(200).send(token)
}