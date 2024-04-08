import { z } from 'zod'

export namespace IAngelo {
  export type Route = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    url: string
    dto?: z.ZodObject<any> | z.ZodEffects<any, any>
  }
  export type Guard = {
    dep?: string
    dto: z.ZodObject<any> | z.ZodEffects<any, any>
    key: string
  }
}
