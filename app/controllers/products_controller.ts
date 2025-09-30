import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/product_service'

export default class ProductsController {
  private service = new ProductService()

  public async index({}: HttpContext) {
    return this.service.list()
  }

  public async store({ request }: HttpContext) {
    return this.service.create(request)
  }

  public async show({ params }: HttpContext) {
    return this.service.getById(params.id)
  }

  public async update({ params, request }: HttpContext) {
    return this.service.update(params.id, request)
  }

  public async destroy({ params }: HttpContext) {
    return this.service.delete(params.id)
  }
}
