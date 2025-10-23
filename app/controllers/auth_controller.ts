import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  /**
   * Registro de usuario
   */
  public async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['fullName', 'email', 'password'])

      // ✅ Validar formato del correo electrónico
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@([a-zA-Z]+\.)+(com|co|net|org|edu|gov|info|io|es|mx|ar|cl|pe)$/
      if (!emailRegex.test(data.email)) {
        return response.badRequest({
          error:
            'El correo electrónico debe tener un formato válido (ejemplo: usuario@gmail.com)',
        })
      }

      // ✅ Validar nombre (solo letras y espacios)
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,40}$/
      if (!nameRegex.test(data.fullName)) {
        return response.badRequest({
          error:
            'El nombre completo solo puede contener letras y espacios (mínimo 3 caracteres).',
        })
      }

      // ✅ Validar contraseña (6–20 caracteres, sin comas ni espacios)
      const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=\-]{6,20}$/
      if (!passwordRegex.test(data.password)) {
        return response.badRequest({
          error:
            'La contraseña debe tener entre 6 y 20 caracteres y no contener comas ni espacios.',
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
    } catch (err) {
      console.error('❌ Error en registro:', err)
      return response.internalServerError({
        error: 'Ocurrió un error interno al registrar el usuario.',
      })
    }
  }

  /**
   * Inicio de sesión
   */
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@([a-zA-Z]+\.)+(com|co|net|org|edu|gov|info|io|es|mx|ar|cl|pe)$/
    if (!emailRegex.test(email)) {
      return response.badRequest({ error: 'Correo electrónico no válido.' })
    }

    try {
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
    } catch (err) {
      console.error('❌ Error en login:', err)
      return response.unauthorized({ error: 'Credenciales inválidas.' })
    }
  }

  /**
   * Cerrar sesión
   */
  public async logout({ auth, response }: HttpContext) {
    await auth.user?.related('accessTokens').query().delete()
    return response.ok({ message: 'Sesión cerrada correctamente 👋' })
  }
}
