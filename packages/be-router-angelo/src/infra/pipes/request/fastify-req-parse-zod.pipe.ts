import { ZodException } from '@olympus/lib-hera'
import { IAngelo } from '../../adapters/route/index.dto'

export const fastifyReqParseZodPipe = async <
  IRequest extends { [key: string]: any },
>(
  acc: any,
  request: IRequest,
  { dto }: IAngelo.AddProps,
) => {
  if (!dto) return null
  try {
    return dto.parse(acc)
  } catch (error) {
    throw new ZodException(error)
  }
}
