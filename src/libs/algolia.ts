import algolia, { SearchClient, SearchIndex } from 'algoliasearch'
import { Product } from '../model'
import { logger, args } from '.'

let client: SearchClient
export function getClient(): SearchClient {
  if (client) {
    return client
  }

  client = algolia(args.algoliaAppId, args.algoliaAPIKey)
  return client
}

let productIndex: SearchIndex
async function products(): Promise<SearchIndex> {
  if (productIndex) {
    return productIndex
  }
  productIndex = getClient().initIndex(args.algoliaProductsIndex)
  await productIndex.setSettings({
    searchableAttributes: ['name', 'brand'],
    attributesForFaceting: ['filterOnly(userId)']
  })
  return productIndex
}

export async function saveProduct(product: Product) {
  const index = await products()
  const object = {
    userId: product.userId,
    name: product.name,
    brand: product.brand,
    image: product.image,
    objectID: product.id,
    id: product.id,
    price: product.price
  }

  return index.saveObject(object)
}

export async function searchProducts(
  term: string,
  page: number,
  limit: number,
  userId: string
): Promise<any[]> {
  logger.info(`Page: ${page}, Term: ${term}, Limit: ${limit}`)
  const index = await products()
  const response = await index.search(term, {
    page: page - 1,
    hitsPerPage: limit,
    facets: ['*', 'userId'],
    facetFilters: [[`userId:${userId}`]]
  })
  logger.info(
    `Response = Page:${response.page} Hits:${response.hits.length} PerPage:${response.hitsPerPage}`
  )
  return response.hits
}

export default {
  saveProduct,
  searchProducts
}
