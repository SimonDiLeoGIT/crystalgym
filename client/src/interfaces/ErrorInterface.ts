export interface ErrorInterface<T = unknown> {
  error: string
  message: string
  data?: T
  code: number
}