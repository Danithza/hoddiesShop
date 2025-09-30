import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import Categoria from '#models/categoria'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    const sacos = await Categoria.findByOrFail('name', 'Sacos')
    const busos = await Categoria.findByOrFail('name', 'Busos')
    const medias = await Categoria.findByOrFail('name', 'Medias deportivas')

    // Sacos
    await Product.createMany([
      { name: 'Saco Negro Clásico', description: 'Saco elegante y cómodo', price: 120000, stock: 10, imageUrl: '/images/saco1.jpg', categoriaId: sacos.id },
      { name: 'Saco Azul Marino', description: 'Perfecto para ocasiones casuales', price: 110000, stock: 15, imageUrl: '/images/saco2.jpg', categoriaId: sacos.id },
      { name: 'Saco Gris Urbano', description: 'Ideal para un look juvenil', price: 115000, stock: 20, imageUrl: '/images/saco3.jpg', categoriaId: sacos.id },
      { name: 'Saco Rojo Deportivo', description: 'Comodidad y estilo en uno', price: 125000, stock: 8, imageUrl: '/images/saco4.jpg', categoriaId: sacos.id },
    ])

    // Busos
    await Product.createMany([
      { name: 'Buzo Blanco Oversize', description: 'Look fresco y moderno', price: 90000, stock: 25, imageUrl: '/images/buso1.jpg', categoriaId: busos.id },
      { name: 'Buzo Negro Básico', description: 'Prenda versátil para el día a día', price: 85000, stock: 30, imageUrl: '/images/buso2.jpg', categoriaId: busos.id },
      { name: 'Buzo Verde Militar', description: 'Estilo urbano con comodidad', price: 95000, stock: 12, imageUrl: '/images/buso3.jpg', categoriaId: busos.id },
      { name: 'Buzo Gris con Capucha', description: 'Perfecto para días fríos', price: 98000, stock: 18, imageUrl: '/images/buso4.jpg', categoriaId: busos.id },
    ])

    // Medias deportivas
    await Product.createMany([
      { name: 'Medias Running Blancas', description: 'Transpirables y resistentes', price: 25000, stock: 50, imageUrl: '/images/medias1.jpg', categoriaId: medias.id },
      { name: 'Medias Negras Fitness', description: 'Comodidad para entrenamientos', price: 27000, stock: 40, imageUrl: '/images/medias2.jpg', categoriaId: medias.id },
      { name: 'Medias Deportivas Grises', description: 'Ideales para uso diario', price: 26000, stock: 35, imageUrl: '/images/medias3.jpg', categoriaId: medias.id },
      { name: 'Medias Coloridas Sport', description: 'Estilo único para destacar', price: 30000, stock: 20, imageUrl: '/images/medias4.jpg', categoriaId: medias.id },
    ])
  }
}
