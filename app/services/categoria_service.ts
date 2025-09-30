import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriaService {
  public async list() {
    return await Categoria.all()
  }

  public async create(request: HttpContext['request']) {
    const data = request.only(['name'])
    return await Categoria.create(data)
  }

  public async getById(id: number) {
    return await Categoria.findOrFail(id)
  }

  public async update(id: number, request: HttpContext['request']) {
    const data = request.only(['name'])
    const categoria = await Categoria.findOrFail(id)
    categoria.merge(data)
    await categoria.save()
    return categoria
  }

  public async delete(id: number) {
    const categoria = await Categoria.findOrFail(id)
    await categoria.delete()
    return { message: 'Categoría eliminada exitosamente' }
  }
}
