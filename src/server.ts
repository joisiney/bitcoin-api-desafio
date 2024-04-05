import cors from '@fastify/cors'
import Fastify from 'fastify'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true, // Substitua pelo domínio que irá aceitar as requisições EX: meudominio.com.br
  })

  const port = Number(process.env.PORT || 3333)
  await fastify.listen({ port, host: '0.0.0.0' })

  console.log(`🔥 HTTP server running at 3333`)
}

bootstrap()
