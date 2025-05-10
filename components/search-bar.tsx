"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocationSuggestions } from "@/hooks/use-location"

export default function SearchBar() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const locationInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Obtener sugerencias de ubicación
  const { data: suggestions, isLoading } = useLocationSuggestions(location)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (keyword) params.append("keyword", keyword)
    if (location) params.append("location", location)

    router.push(`/search?${params.toString()}`)
  }

  // Cerrar las sugerencias cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Seleccionar una sugerencia
  const handleSelectSuggestion = (province: string, locality: string) => {
    setLocation(`${province}, ${locality}`)
    setShowSuggestions(false)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto relative">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3">
          <Input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full border-none shadow-none focus-visible:ring-0 text-gray-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex-1 flex items-center relative p-3">
          <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          <Input
            ref={locationInputRef}
            type="text"
            placeholder="Ubicación"
            className="w-full border-none shadow-none focus-visible:ring-0 text-gray-700"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-none transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Sugerencias de ubicación */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">Cargando sugerencias...</div>
          ) : suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelectSuggestion(suggestion.province, suggestion.locality)}
              >
                <div className="p-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-700">{suggestion.province}</div>
                    <div className="text-sm text-gray-500">{suggestion.locality}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              {location ? "No se encontraron ubicaciones" : "Escribe para ver sugerencias"}
            </div>
          )}
        </div>
      )}
    </form>
  )
}
