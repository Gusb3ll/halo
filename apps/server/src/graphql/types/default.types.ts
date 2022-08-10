import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export class baseResponse {
  @Field(() => Boolean)
    ok: boolean

  @Field(() => String)
    message: string
}
