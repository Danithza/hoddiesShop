import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Categoria from '#models/categoria'

export default class CategoriaSeeder extends BaseSeeder {
  public async run() {
    await Categoria.createMany([
      { name: 'Sacos' },
      { name: 'Busos' },
      { name: 'Medias deportivas' },
    ])
  }
}
