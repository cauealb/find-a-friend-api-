import 'dotenv/config.js'
import z from 'zod'

const schema = z.object({
    PORT: z.coerce.number().default(7777),
    SALT: z.coerce.number().min(1),
    JWT_SECRET: z.string(),
    NODE_ENV: z.enum(['dev', 'prod']).default('prod')
})

const _env = schema.safeParse(process.env)

if(!_env.success) {
    const msg = "Váriveis de ambiente erradas!"

    console.error(msg)
    throw new Error(msg)
}

export const env = _env.data