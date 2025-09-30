import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.text('description').nullable()
    table.decimal('price', 10, 2).notNullable()
    table.string('image_url').nullable()
    table.integer('stock').unsigned().defaultTo(0)
    table
        .integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categorias')
        .onDelete('CASCADE')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
