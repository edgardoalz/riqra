import { ProductModel, Product } from '../model'
import { algolia } from '../libs'
import { v4 } from 'uuid'

export async function save(product: Product): Promise<Product> {
  product.id = v4()
  const result = await ProductModel.create(product)

  await algolia.saveProduct(result)
  return result
}

export async function search(
  term: string,
  page: number,
  limit: number,
  userId: string
): Promise<Product[]> {
  return await algolia.searchProducts(term, page, limit, userId)
}
