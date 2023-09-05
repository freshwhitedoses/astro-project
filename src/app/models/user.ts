export interface User{
  iD?: number
  email: string
  sign?: string
  name:string
  password: string
  notifications: boolean
  birthInfo: {
    year: number,
    month: number,
    day: number
  }
}
