import type { HttpContext } from '@adonisjs/core/http'
import OrderItemService from '../services/order_item_service.js'

export default class OrderItemsController {
  private service = new OrderItemService()

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
