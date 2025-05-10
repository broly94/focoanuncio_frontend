"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

// Clave global para la consulta del usuario actual
export const CURRENT_USER_QUERY_KEY = ["currentUser"]

// Hook para obtener el usuario actual
export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: () => api.getCurrentUser(),
  })
}

// Hook para iniciar sesión
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => api.login(email, password),
    onSuccess: (data) => {
      // En una aplicación real, almacenarías el token en localStorage o una cookie segura
      localStorage.setItem("token", data.token)

      // Invalidar y volver a obtener la consulta del usuario actual
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY })
    },
  })
}

// Hook para registrarse
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      api.register(name, email, password),
    onSuccess: (data) => {
      // En una aplicación real, almacenarías el token en localStorage o una cookie segura
      localStorage.setItem("token", data.token)

      // Invalidar y volver a obtener la consulta del usuario actual
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY })
    },
  })
}

// Hook para cerrar sesión
export function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    // En una aplicación real, llamarías a un endpoint de API para invalidar el token
    localStorage.removeItem("token")

    // Restablecer los datos de la consulta del usuario actual
    queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null)
  }
}
