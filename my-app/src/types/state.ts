export type FormState = {
  ok?: boolean
  errors?: {
    login?: string[]
    password?: string[]
    general?: string[]
  }
  message?: string
}