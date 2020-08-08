import { db } from '../libs'

export interface Item {
  productId: number
  amount: number
  price: number
  quantity: number
}

export interface Order {
  amount: number
  deliver: number
  total: number
  items: Item[]
  businessId: string
  userId: string
}
