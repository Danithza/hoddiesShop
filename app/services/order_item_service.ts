import type { HttpContext } from '@adonisjs/core/http'
import OrderItem from '#models/order_item'

export default class OrderItemService {
  public async list() {
    return await OrderItem.all()
  }

  public async create(request: HttpContext['request']) {
    const data = request.only(['orderId', 'productId', 'quantity', 'price'])
    return await OrderItem.create(data)
  }

  public async getById(id: number) {
    return await OrderItem.findOrFail(id)
  }

  public async update(id: number, request: HttpContext['request']) {
    const data = request.only(['quantity', 'price'])
    const item = await OrderItem.findOrFail(id)
    item.merge(data)
    await item.save()
    return item
  }

  public async delete(id: number) {
    const item = await OrderItem.findOrFail(id)
    await item.delete()
    return { message: 'Item eliminado exitosamente' }
  }
}
