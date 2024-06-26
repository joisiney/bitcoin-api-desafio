import {
  BitcoinController,
  TransactionController,
  UserController,
} from '@/application/controllers'
import { AuthController } from '@/application/controllers/auth/index.controller'
import {
  UserCreateUseCase,
  UserFindAllUseCase,
  UserFindByIdUseCase,
  UserRemoveByIdUseCase,
  UserUpdateByIdUseCase,
} from '@/application/use-cases'
import { AuthGuardUseCase } from '@/application/use-cases/auth/guard/index.use-case'
import { AuthSignInUseCase } from '@/application/use-cases/auth/sign-in/index.use-case'
import { BitcoinQuotationUseCase } from '@/application/use-cases/bitcoins'
import { BitcoinBuyUseCase } from '@/application/use-cases/bitcoins/buy/index.use-case'
import { TransactionCreateUseCase } from '@/application/use-cases/transactions'
import { InjectorFactory } from '@olympus/be-di-ilitia'
import {
  AddingRouteInScriptSingleton,
  FastifyAdapter,
  fastifyReqGatherDataPipe,
  fastifyReqGuardPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
  fastifyResGatherErrorPipe,
  fastifyResIsMyExceptionPipe,
  fastifyResPresentationErrorPipe,
  fastifyResTransformPipe,
  fastifyResTriggerControllerPipe,
  routesInfo,
} from '@olympus/be-router-angelo'
import {
  BitcoinGateway,
  ResendService,
  SecurityService,
} from '@olympus/lib-hera'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import 'reflect-metadata'
import { env } from './config/env'
import {
  BitcoinRepositoryTypeDrizzle,
  TransactionRepositoryTypeDrizzle,
  UserRepositoryTypeDrizzle,
} from './repositories'

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({
  logger: false,
})
app.addHook(
  'preHandler',
  (req: FastifyRequest, reply: FastifyReply, done: any) => {
    reply.header('Content-Type', 'application/json; charset=utf-8')
    done()
  },
)
// INJECTING ROUTER
const fastifyRouterAdapter = new FastifyAdapter<
  FastifyInstance,
  FastifyRequest,
  FastifyReply
>(app)

fastifyRouterAdapter.reqPipeline.add(
  fastifyReqGatherDataPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqGuardPipe,
  fastifyReqParseZodPipe,
)

fastifyRouterAdapter.resPipeline.add(
  fastifyResTriggerControllerPipe,
  fastifyResTransformPipe,
)

fastifyRouterAdapter.errorPipeline.add(
  fastifyResGatherErrorPipe,
  fastifyResIsMyExceptionPipe,
  fastifyResPresentationErrorPipe,
)

AddingRouteInScriptSingleton.getInstance(fastifyRouterAdapter)

// INJECTING NEWS MODULE
{
  {
    // SERVICES
    InjectorFactory.resolve(SecurityService, { name: 'SECURITY_SERVICE' })
    InjectorFactory.resolve(ResendService, {
      name: 'MAIL_SERVICE',
      defaultArgs: { apiKey: env.resendApiKey },
    })

    // GATEWAYS
    InjectorFactory.resolve(BitcoinGateway, { name: 'BITCOIN_GATEWAY' })

    // USE_CASE USER
    InjectorFactory.resolve(UserCreateUseCase)
    InjectorFactory.resolve(UserFindByIdUseCase)
    InjectorFactory.resolve(UserFindAllUseCase)
    InjectorFactory.resolve(UserRemoveByIdUseCase)
    InjectorFactory.resolve(UserUpdateByIdUseCase)

    // USE_CASE AUTH
    InjectorFactory.resolve(AuthSignInUseCase)
    InjectorFactory.resolve(AuthGuardUseCase)

    // USE_CASE TRANSACTION
    InjectorFactory.resolve(TransactionCreateUseCase)

    // USE_CASE BITCOIN
    InjectorFactory.resolve(BitcoinQuotationUseCase)
    InjectorFactory.resolve(BitcoinBuyUseCase)
  }
  {
    // INJECTING NEWS REPOSITORY
    InjectorFactory.resolve(UserRepositoryTypeDrizzle)
    InjectorFactory.resolve(TransactionRepositoryTypeDrizzle)
    InjectorFactory.resolve(BitcoinRepositoryTypeDrizzle)
  }
  {
    // INJECTING NEWS CONTROLLER
    InjectorFactory.resolve(UserController)
    InjectorFactory.resolve(AuthController)
    InjectorFactory.resolve(TransactionController)
    InjectorFactory.resolve(BitcoinController)
  }
}

// START SERVER
app.listen(
  {
    port: env.port,
  },
  async (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.table(routesInfo())
    console.info(`Server listening at ${address} 🚀🚀`)
  },
)
