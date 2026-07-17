import { Link } from 'react-router-dom'

/**
 * Página de registro de solo presentación.
 * No está conectada a ningún caso de uso: el objetivo de esta demo
 * es mostrar la arquitectura del login y del CRUD, no un registro real.
 */
export function RegisterPage() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <p className="auth-hint">Vista de ejemplo — este formulario no está conectado a ningún caso de uso.</p>

        <label>
          Nombre
          <input type="text" placeholder="Tu nombre" />
        </label>

        <label>
          Email
          <input type="email" placeholder="tu@email.com" />
        </label>

        <label>
          Contraseña
          <input type="password" placeholder="••••••••" />
        </label>

        <button type="submit" className="btn btn-primary btn-full" disabled>
          Registrarme (deshabilitado)
        </button>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
