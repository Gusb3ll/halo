import { Field, ObjectType } from 'type-graphql'

import { baseResponse } from './default.types'

@ObjectType({ implements: baseResponse })
export class getCunnyResponse extends baseResponse {
  @Field(() => String, { nullable: true })
    url?: string

  @Field(() => String, { nullable: true })
    name?: string
}
