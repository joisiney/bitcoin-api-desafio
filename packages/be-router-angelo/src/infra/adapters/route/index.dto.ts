import { z } from 'zod'

export namespace IAngelo {
  export interface AddProps {
    method: string
    url: string
    propertyKey: string
    dto: any
    target: any
  }

  export type PipeRequest = (
    accumulatedData: any,
    request: any,
    dto?: z.ZodObject<any> | z.ZodEffects<any, any>,
  ) => Promise<any>

  export interface Implements {
    addRoute(props: IAngelo.AddProps): void
  }
}
