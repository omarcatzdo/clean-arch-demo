import { IAuthRepository } from '../../core/domain/repositories/IAuthRepository'
import { User } from '../../core/domain/entities/User'

const STORAGE_KEY = 'demo_auth_session'

// Usuario de demo. En un caso real esto viviría en un backend.
const ADMIN = {
  id: '1',
  email: 'admin@fitgym.com',
  password: '1111',
  name: 'Juan'
}

/**
 * Implementación concreta de IAuthRepository.
 * Simula una llamada de red con un pequeño delay y persiste
 * la sesión en localStorage para sobrevivir al refresh.
 *
 * Al ser una clase que implementa el mismo contrato, se podría
 * reemplazar por una que use fetch/axios contra una API real
 * sin cambiar ni un solo caso de uso ni componente de React.
 */
export class AuthRepository extends IAuthRepository {
  async login(email, password) {
    await simulateDelay()

    if (email !== ADMIN.email || password !== ADMIN.password) {
      throw new Error('Credenciales inválidas')
    }

    const user = new User({ id: ADMIN.id, email: ADMIN.email, name: ADMIN.name })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  }

  async logout() {
    await simulateDelay(150)
    localStorage.removeItem(STORAGE_KEY)
  }

  async getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return new User(data)
  }
}

function simulateDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
