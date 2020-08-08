import { db } from '../libs'
import { Model, DataTypes } from 'sequelize'

export interface Product extends Model {
  userId: string
  id: string
  name: string
  image: string
  brand: string
  price: number
}

export const ProductModel = db.connect().define<Product>('products', {
  userId: {
    type: DataTypes.UUID
  },
  id: {
    primaryKey: true,
    type: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  brand: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE
  }
})
