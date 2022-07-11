import { Query, Resolver } from 'type-graphql'

import { getCunnySauce } from '@services/halo.service'
import { getCunnyResponse } from '@qltypes/halo.types'

@Resolver()
export class haloResolver {
  @Query(() => getCunnyResponse)
  async getCunny(): Promise<getCunnyResponse | undefined> {
    const { url, name } = await getCunnySauce()
    return { ok: true, message: 'Successful', url, name }
  }
}
