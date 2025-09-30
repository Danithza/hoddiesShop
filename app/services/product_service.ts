import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductService {
  public async list() {
    return await Product.all()
  }

  public async create(request: HttpContext['request']) {
    const data = request.only(['name', 'description', 'price', 'imageUrl', 'stock'])
    return await Product.create(data)
  }

  public async getById(id: number) {
    return await Product.findOrFail(id)
  }

  public async update(id: number, request: HttpContext['request']) {
    const data = request.only(['name', 'description', 'price', 'imageUrl', 'stock'])
    const product = await Product.findOrFail(id)
    product.merge(data)
    await product.save()
    return product
  }

  public async delete(id: number) {
    const product = await Product.findOrFail(id)
    await product.delete()
    return { message: 'Producto eliminado exitosamente' }
  }
}
