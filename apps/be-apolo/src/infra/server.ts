import {
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
import { AuthSignInUseCase } from '@/application/use-cases/auth/sign-in/index.use-case'
import { TransactionCreateUseCase } from '@/application/use-cases/transactions'
import { InjectorFactory } from '@olympus/be-di-ilitia'
import {
  AddingRouteInScriptSingleton,
  FastifyAdapter,
  fastifyReqGatherDataPipe,
  fastifyReqParseUserAgentPipe,
  fastifyReqParseZodPipe,
  fastifyResGatherErrorPipe,
  fastifyResIsMyExceptionPipe,
  fastifyResPresentationErrorPipe,
  fastifyResTransformPipe,
  fastifyResTriggerControllerPipe,
  routesInfo,
} from '@olympus/be-router-angelo'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import 'reflect-metadata'
import { env } from './config/env'
import {
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
    // USE_CASE USER
    InjectorFactory.resolve(UserCreateUseCase)
    InjectorFactory.resolve(UserFindByIdUseCase)
    InjectorFactory.resolve(UserFindAllUseCase)
    InjectorFactory.resolve(UserRemoveByIdUseCase)
    InjectorFactory.resolve(UserUpdateByIdUseCase)

    // USE_CASE AUTH
    InjectorFactory.resolve(AuthSignInUseCase)

    // USE_CASE TRANSACION
    InjectorFactory.resolve(TransactionCreateUseCase)
  }
  {
    // INJECTING NEWS REPOSITORY
    InjectorFactory.resolve(UserRepositoryTypeDrizzle)
    InjectorFactory.resolve(TransactionRepositoryTypeDrizzle)
  }
  {
    // INJECTING NEWS CONTROLLER
    InjectorFactory.resolve(UserController)
    InjectorFactory.resolve(AuthController)
    InjectorFactory.resolve(TransactionController)
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
