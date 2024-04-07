import { IAngelo } from './index.dto'

export function Route({ method, url, dto }: IAngelo.Route) {
  return function (target: any, propertyKey: string, descriptor: any) {
    const history = Reflect.getMetadata('routes', target.constructor) || []
    history.push({ method, propertyKey, url, dto })
    Reflect.defineMetadata('routes', history, target.constructor)
    return descriptor
  }
}
