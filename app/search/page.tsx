import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import RotatingAd from "@/components/rotating-ad"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // In a real app, you would use these params to fetch data from your API
  const keyword = (searchParams.keyword as string) || ""
  const location = (searchParams.location as string) || ""

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Buscar estrategias de marketing</h1>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Valoración</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1">{rating}+ estrellas</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Distancia</h3>
              <Slider defaultValue={[50]} max={100} step={1} className="mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 km</span>
                <span>50 km</span>
                <span>100 km</span>
              </div>
            </div>

            <Button className="w-full">Aplicar filtros</Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {keyword && location
                  ? `Mostrando resultados para: "${keyword}" en ${location}`
                  : keyword
                    ? `Mostrando resultados para: "${keyword}"`
                    : location
                      ? `Mostrando resultados en: ${location}`
                      : "Todas las estrategias"}
              </p>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Ordenar por:</span>
                <select className="text-sm border rounded p-1">
                  <option>Relevancia</option>
                  <option>Mejor valorados</option>
                  <option>Más recientes</option>
                  <option>Más populares</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* This would be populated with actual data from the API */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                <div className="md:flex">
                  <Link
                    href={`/strategy/${i + 1}`}
                    className="md:w-1/3 h-48 md:h-auto bg-gray-200 block overflow-hidden"
                  >
                    <img
                      src={`/placeholder.svg?height=200&width=300&text=Strategy+${i + 1}`}
                      alt="Strategy banner"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <Link href={`/strategy/${i + 1}`}>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                          Estrategia de Marketing #{i + 1}
                        </h3>
                      </Link>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg
                            key={j}
                            className={`w-4 h-4 ${j < 4 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">4.0</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Marketing Digital
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Keyword #{i + 1}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Keyword #{i + 2}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Buenos Aires, Argentina
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="mr-2" asChild>
                        <Link href={`/strategy/${i + 1}`}>Ver detalles</Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/strategy/${i + 1}?tab=contact`}>Contactar</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Anterior
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700"
              >
                1
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Siguiente
              </a>
            </nav>
          </div>
        </div>

        {/* Sponsored Ad Section */}
        <div className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <h3 className="text-sm font-medium text-gray-700 p-4 border-b">Publicidad</h3>
              <RotatingAd />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
