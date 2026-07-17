import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './presentation/context/AuthContext'
import { ProtectedRoute } from './presentation/components/ProtectedRoute'
import { LoginPage } from './presentation/pages/LoginPage'
import { RegisterPage } from './presentation/pages/RegisterPage'
import { ProductsPage } from './presentation/pages/ProductsPage'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
