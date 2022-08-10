import { Query, Resolver } from 'type-graphql'

import { getCunnyResponse } from './types/halo.types'
import { getCunnySauce } from './halo.service'

@Resolver(() => getCunnyResponse)
export class HaloResolver {
  @Query(() => getCunnyResponse)
  async getCunny(): Promise<getCunnyResponse> {
    const { url, name } = await getCunnySauce()
    return { ok: true, message: 'Successful', url, name }
  }
}
