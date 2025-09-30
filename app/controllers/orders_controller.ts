import type { HttpContext } from '@adonisjs/core/http'
import OrderService from '../services/order_service.js'

export default class OrdersController {
  private service = new OrderService()

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
