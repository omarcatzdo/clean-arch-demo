/**
 * Entidad de dominio: User
 * No React, HTTP ni almacenamiento.
 * Representa al "User/Usuarios" en el negocio y sus reglas
 */
export class User {
  constructor({ id, email, name }) {
    if (!email) {
      throw new Error('User: el email es obligatorio')
    }

    this.id = id
    this.email = email
    this.name = name
  }
}
