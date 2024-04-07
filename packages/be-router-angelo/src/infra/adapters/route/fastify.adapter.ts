import { BaseAppAdapter } from '.'
import { IAngelo } from './index.dto'

export class FastifyAdapter<
    IApp extends { route: Function },
    IRequest,
    IReply extends { status: any },
  >
  extends BaseAppAdapter
  implements IAngelo.Implements
{
  constructor(private readonly app: IApp) {
    super()
  }

  private handler(props: IAngelo.AddProps) {
    return async (request: IRequest, reply: IReply) => {
      try {
        if (props.propertyKey in props.target) {
          const { code, data } = await this.execute(request, reply, props)
          return reply.status(code).send(data)
        }
        throw new Error('Method not found')
      } catch (error) {
        const dataError = await this.errorPipeline.execute(
          { name: this.constructor.name },
          error,
          props,
        )
        reply.status(dataError.code).send(dataError)
      }
    }
  }

  public addRoute(props: IAngelo.AddProps) {
    this.app.route({
      method: props.method,
      url: props.url,
      handler: this.handler(props).bind(this),
    })
  }
}
