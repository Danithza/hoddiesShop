import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  /**
   * Registro de usuario
   */
  public async register({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])

    // ✅ Validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(data.email)) {
      return response.badRequest({
        error: 'El correo electrónico debe tener un formato válido (ejemplo: usuario@gmail.com)',
      })
    }

    // ✅ Validar contraseña (6–20 caracteres, sin comas o espacios)
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=\-]{6,20}$/
    if (!passwordRegex.test(data.password)) {
      return response.badRequest({
        error: 'La contraseña debe tener entre 6 y 20 caracteres y no contener comas ni espacios.',
      })
    }

    // ✅ Validar nombre (solo letras y espacios)
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,40}$/
    if (!nameRegex.test(data.fullName)) {
      return response.badRequest({
        error: 'El nombre completo solo puede contener letras y espacios (mínimo 3 caracteres).',
      })
    }

    // ✅ Verificar si el correo ya existe
    const existing = await User.findBy('email', data.email)
    if (existing) {
      return response.badRequest({ error: 'El correo ya está registrado.' })
    }

    // ✅ Crear usuario
    const user = await User.create(data)

    // ✅ Crear token de acceso
    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'Usuario registrado correctamente 🎉',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token: token.value!.release(),
    })
  }

  /**
   * Inicio de sesión
   */
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return response.badRequest({ error: 'Correo electrónico no válido.' })
    }

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Inicio de sesión exitoso ✅',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token: token.value!.release(),
    })
  }

  /**
   * Cerrar sesión
   */
  public async logout({ auth, response }: HttpContext) {
    await auth.user?.related('accessTokens').query().delete()
    return response.ok({ message: 'Sesión cerrada correctamente 👋' })
  }
}
