export interface User {
  id: number
  createdAt?: Date
  updatedAt?: Date
  name: string | null
  email: string
  role: string
}
