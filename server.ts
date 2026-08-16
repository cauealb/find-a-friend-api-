import app from "./app.ts";
import { env } from "./src/env/index.ts";

app.listen({
    port: env.PORT
}).catch((ex) => {
    console.error(ex)
}).then(() => {
    console.log(`Servidor iniciado na porta ${env.PORT} com sucesso!`)
})