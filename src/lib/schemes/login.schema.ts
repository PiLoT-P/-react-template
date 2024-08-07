import { InferType, object, string } from 'yup'

export const LoginSchema = object().shape({
  username: string().required(),
  password: string().required(),
})

export type LoginSchemaType = InferType<typeof LoginSchema>
