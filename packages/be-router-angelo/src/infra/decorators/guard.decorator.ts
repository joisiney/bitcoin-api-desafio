import { IAngelo } from './index.dto'

export function Guard({ dep }: IAngelo.Guard) {
  return function (target: any, propertyKey: string, descriptor: any) {
    const history = Reflect.getMetadata('guard', target.constructor) || []
    history.push({ dep, propertyKey })
    Reflect.defineMetadata('guard', history, target.constructor)
    return descriptor
  }
}
