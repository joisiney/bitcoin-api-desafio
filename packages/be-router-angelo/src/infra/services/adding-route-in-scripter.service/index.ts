import { InjectorFactory } from '@olympus/be-di-ilitia'
import { findMetaData, urlFormat } from '../../../utils'
import { IRoute } from '../../adapters/route/index.dto'

export class AddingRouteInScriptSingleton {
  constructor(private readonly app: IRoute.Implements) {}

  private create(target: any) {
    const path = findMetaData(target.constructor, 'path', [])
    const routes = findMetaData(target.constructor, 'routes', [])
    for (const { method, propertyKey, url: rawUrl, dto } of routes) {
      if (!method || !rawUrl) continue
      const url = urlFormat(path, rawUrl)
      this.app.addRoute({
        method,
        url,
        dto,
        target,
        propertyKey,
      })
    }
  }

  private static instance: AddingRouteInScriptSingleton
  public static getInstance(app: IRoute.Implements) {
    if (!AddingRouteInScriptSingleton.instance) {
      AddingRouteInScriptSingleton.instance =
        new AddingRouteInScriptSingleton(app)
      InjectorFactory.use(
        AddingRouteInScriptSingleton.instance.create.bind(
          AddingRouteInScriptSingleton.instance,
        ),
      )
    }
    return AddingRouteInScriptSingleton.instance
  }
}
