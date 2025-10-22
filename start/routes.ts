import router from '@adonisjs/core/services/router'

// Controllers
import ProductsController from '#controllers/products_controller'
import OrdersController from '#controllers/orders_controller'
import OrderItemsController from '#controllers/order_items_controller'
import CategoriasController from '#controllers/categorias_controller'
import AuthController from '#controllers/auth_controller'

// PRODUCTS CRUD
router.get('/products', [ProductsController, 'index'])
router.post('/products', [ProductsController, 'store'])
router.get('/products/:id', [ProductsController, 'show'])
router.put('/products/:id', [ProductsController, 'update'])
router.delete('/products/:id', [ProductsController, 'destroy'])
router.get('/products/categoria/id/:id', [ProductsController, 'getByCategoriaId'])

// ORDERS CRUD
router.get('/orders', [OrdersController, 'index'])
router.post('/orders', [OrdersController, 'store'])
router.get('/orders/:id', [OrdersController, 'show'])
router.put('/orders/:id', [OrdersController, 'update'])
router.delete('/orders/:id', [OrdersController, 'destroy'])

// ORDER ITEMS CRUD
router.get('/order-items', [OrderItemsController, 'index'])
router.post('/order-items', [OrderItemsController, 'store'])
router.get('/order-items/:id', [OrderItemsController, 'show'])
router.put('/order-items/:id', [OrderItemsController, 'update'])
router.delete('/order-items/:id', [OrderItemsController, 'destroy'])

// CATEGORIAS CRUD
router.get('/categorias', [CategoriasController, 'index'])
router.post('/categorias', [CategoriasController, 'store'])
router.get('/categorias/:id', [CategoriasController, 'show'])
router.put('/categorias/:id', [CategoriasController, 'update'])
router.delete('/categorias/:id', [CategoriasController, 'destroy'])

// AUTH
router.get('/', async () => {
  return { message: 'Servidor funcionando 🚀' }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout'])
