import { InjectorFactory } from '@olympus/be-di-ilitia'
import { BadRequestException, ZodException } from '@olympus/lib-hera'
import { IAngelo } from '../../adapters/route/index.dto'

export const fastifyReqGuardPipe = async <
  IRequest extends { [key: string]: any },
>(
  acc: any,
  request: IRequest,
  { target }: IAngelo.AddProps,
) => {
  const guard = Reflect.getMetadata('guard', target.constructor)
  if (guard && guard.dto) {
    try {
      //INFO: Parse DTO @Guard
      const responseParseGuard = guard.dto.parse(acc)
      if (!responseParseGuard) {
        throw new BadRequestException('Invalid request guard')
      }

      if (guard.dep) {
        //INFO: Resolve service @Guard
        const targetService = InjectorFactory.raw.get(guard.dep)
        if (targetService) {
          //INFO: Execute service @Guard
          const depInstance = InjectorFactory.resolve(
            targetService,
            guard,
          ) as any
          const responseServiceGuard =
            await depInstance.execute(responseParseGuard)
          return { [guard.key]: responseServiceGuard, ...acc }
        }
      }
      return { [guard.key]: responseParseGuard, ...acc }
    } catch (error) {
      throw new ZodException(error)
    }
  }
  return acc
}
