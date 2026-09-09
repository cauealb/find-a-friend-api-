import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreate } from "../../../module/org/factories/make-create.ts";
import { env } from "../../../env/index.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const schemaCreate = z.object({
        nameOrg: z.string(),
        email: z.email(),
        password: z.string(),
        address: z.string(),
        number: z.coerce.number(),
        city: z.string()
    })


    const { nameOrg, email, password, address, number, city } = schemaCreate.parse(request.body)
    
    const useCase = MakeCreate()
    const {org} = await useCase.execute({ nameOrg, email, password, address, number, city })

    const token = await reply.jwtSign(
        {
            sign: {
                sub: org.idOrg!,
                expiresIn: '10m'
            }
        }
    )

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: org.idOrg!,
                expiresIn: '7d'
            }
        }
    )

    reply.setCookie('refresh', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'prod',
        sameSite: true,
    })

    console.log(request.headers)

    return reply.status(201).send({org, token})
}