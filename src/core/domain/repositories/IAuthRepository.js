/**
 * Puerto (interfaz) del repositorio de autenticación.
 * La capa de dominio/aplicación solo conoce este "contrato".
 * JavaScript no tiene interfaces nativas, así que se documenta
 * la forma esperada y se lanza error si alguien no la implementa.
 */
export class IAuthRepository {
  // eslint-disable-next-line no-unused-vars
  async login(email, password) {
    throw new Error('IAuthRepository.login() no implementado')
  }

  async logout() {
    throw new Error('IAuthRepository.logout() no implementado')
  }

  async getCurrentUser() {
    throw new Error('IAuthRepository.getCurrentUser() no implementado')
  }
}
