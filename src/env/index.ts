import 'dotenv/config.js'
import z from 'zod'

const schema = z.object({
    PORT: z.coerce.number().default(7777)
})

const _env = schema.safeParse(process.env)

if(!_env.success) {
    const msg = "Váriveis de ambiente erradas!"

    console.error(msg)
    throw new Error(msg)
}

export const env = _env.data