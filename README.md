# Clean Architecture Demo (React + Vite)

Proyecto pequeño de ejemplo que muestra cómo aplicar **Clean Architecture**
en una app de React, con dos módulos:

- **Login** funcional (sin backend real, con un usuario "mockdata" y persistencia en `localStorage`).
- **Registro** de solo interfaz (no está conectado a ningún caso de uso).
- **CRUD de productos** (`id`, `nombre`, `precio`, `descripcion`), persistido en `localStorage`.

## 1. Idea general de la arquitectura

Clean Architecture propone separar el código en capas concéntricas donde
**las capas externas dependen de las internas, y nunca al revés**. Aquí se
tradujo en 3 capas dentro de `src/`:

```
src/
├── core/                       → Reglas de negocio puras (no dependen de React)
│   ├── domain/
│   │   ├── entities/           → Qué ES un User, qué ES un Product (+ sus validaciones)
│   │   └── repositories/       → Contratos/interfaces (IAuthRepository, IProductRepository)
│   ├── application/            → Casos de uso: qué HACE la app (LoginUseCase, CreateProductUseCase, etc.)
│   └── container.js            → "Composition root": conecta interfaces con implementaciones reales
│
├── infrastructure/              → Detalles técnicos, implementan los contratos del dominio
│   └── repositories/
│       ├── AuthRepository.js    → Implementación de IAuthRepository (usuario demo + localStorage)
│       └── ProductRepository.js → Implementación de IProductRepository (CRUD sobre localStorage)
│
└── presentation/                 → Todo lo relacionado a React (la capa más externa)
    ├── pages/                   → LoginPage, RegisterPage, ProductsPage
    ├── components/              → ProductForm, ProductList, ProtectedRoute
    ├── context/                 → AuthContext (estado global de sesión)
    ├── hooks/                   → useAuth, useProducts (puente entre React y los casos de uso)
    └── styles/                  → CSS global
```

### Regla de dependencia

```
presentation  →  application  →  domain
infrastructure ────────────────→  domain
```

- **`domain`** no importa nada de `application`, `infrastructure` ni `presentation`. Es el centro.
- **`application`** (casos de uso) solo conoce las *interfaces* del dominio (`IAuthRepository`,
  `IProductRepository`), nunca la implementación concreta.
- **`infrastructure`** implementa esas interfaces con una tecnología concreta (aquí, `localStorage`;
  podría ser `fetch` a una API real, `IndexedDB`, Firebase, etc.).
- **`presentation`** (React) solo llama a los casos de uso a través de hooks (`useAuth`,
  `useProducts`), nunca toca `localStorage` ni las entidades directamente.

Esto se logra con **inversión de dependencias**: los casos de uso reciben el repositorio
por constructor (`new LoginUseCase(authRepository)`), y quién decide *cuál* implementación
usar es un único archivo: `core/container.js`. Si mañana quieres cambiar `localStorage`
por una API REST, solo tienes que:

1. Crear `infrastructure/repositories/ProductApiRepository.js` implementando `IProductRepository`.
2. Cambiar una línea en `core/container.js`.
3. **Nada** en `presentation/` ni en los casos de uso cambia.

## 2. Módulo de Login

- `core/domain/entities/User.js` — entidad con su validación mínima.
- `core/domain/repositories/IAuthRepository.js` — contrato: `login`, `logout`, `getCurrentUser`.
- `core/application/auth/LoginUseCase.js` y `LogoutUseCase.js` — casos de uso.
- `infrastructure/repositories/AuthRepository.js` — implementación de demo:
  - Usuario válido: **`demo@demo.com` / `123456`** (precargado en el formulario).
  - Simula latencia de red y guarda la sesión en `localStorage`.
- `presentation/context/AuthContext.jsx` + `presentation/hooks/useAuth.js` — exponen
  `login`, `logout`, `user`, `isAuthenticated` a toda la app.
- `presentation/components/ProtectedRoute.jsx` — redirige a `/login` si no hay sesión.
- `presentation/pages/RegisterPage.jsx` — **solo de interfaz**, tal como se pidió: el botón
  "Registrarme" está deshabilitado y no dispara ningún caso de uso.

## 3. Módulo CRUD de productos

- `core/domain/entities/Product.js` — valida `nombre` y `precio` al crear la entidad.
- `core/domain/repositories/IProductRepository.js` — contrato: `getAll`, `getById`, `create`,
  `update`, `remove`.
- `core/application/products/*UseCase.js` — un caso de uso por operación.
- `infrastructure/repositories/ProductRepository.js` — implementación sobre `localStorage`,
  con 3 productos de ejemplo precargados la primera vez.
- `presentation/hooks/useProducts.js` — hook que orquesta los casos de uso y expone
  `products`, `loading`, `createProduct`, `updateProduct`, `deleteProduct`.
- `presentation/pages/ProductsPage.jsx` — pantalla protegida con formulario + tabla.

## 4. Cómo instalar y correr el proyecto

Requisitos: **Node.js 18 o superior**.

```bash
# 1. Entrar a la carpeta del proyecto
cd clean-arch-demo

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Abre la URL que muestre la terminal (por defecto `http://localhost:5173`).

Credenciales de acceso:

```
Email:      admin@fitgym.com
Contraseña: 1111
```

Otros scripts disponibles:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve /dist localmente para probar el build
```

## 5. Notas de diseño

- No hay backend: todo el "persistente" (sesión y productos) vive en `localStorage`
  del navegador, para que el demo funcione sin configurar nada.
- El registro es intencionalmente no funcional, como se solicitó — sirve para mostrar
  cómo lucirían más pantallas dentro de la misma arquitectura.
- Cambiar `localStorage` por una API real, o React por otro framework, solo debería
  afectar `infrastructure/` y `presentation/` respectivamente — `core/` no debería
  necesitar ningún cambio. Esa es la prueba de que la arquitectura está bien separada.
