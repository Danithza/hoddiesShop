import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

export default class OrderService {
  public async list() {
    return await Order.all()
  }

  public async create(request: HttpContext['request']) {
    const data = request.only(['userId', 'total', 'status'])
    return await Order.create(data)
  }

  public async getById(id: number) {
    return await Order.findOrFail(id)
  }

  public async update(id: number, request: HttpContext['request']) {
    const data = request.only(['total', 'status'])
    const order = await Order.findOrFail(id)
    order.merge(data)
    await order.save()
    return order
  }

  public async delete(id: number) {
    const order = await Order.findOrFail(id)
    await order.delete()
    return { message: 'Orden eliminada exitosamente' }
  }
}
