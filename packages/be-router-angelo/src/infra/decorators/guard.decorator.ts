import { IAngelo } from './index.dto'

export function Guard({ dep, dto, key }: IAngelo.Guard) {
  return function (target: any, propertyKey: string, descriptor: any) {
    Reflect.defineMetadata(
      'guard',
      { dep, dto, key, propertyKey },
      target.constructor,
    )
    return descriptor
  }
}
