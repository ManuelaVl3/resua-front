/**
 * Constantes del proyecto
 */

// Categorías de especies
export const SPECIES_CATEGORIES = [
  { value: 'aves', label: 'Aves' },
  { value: 'mamiferos', label: 'Mamíferos' },
  { value: 'reptiles', label: 'Reptiles' },
  { value: 'anfibios', label: 'Anfibios' },
  { value: 'insectos', label: 'Insectos' },
  { value: 'plantas', label: 'Plantas' },
  { value: 'hongos', label: 'Hongos' },
  { value: 'otros', label: 'Otros' }
]

// Estados de observación
export const OBSERVATION_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
}

// Tipos de archivo permitidos para imágenes
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
]

// Tamaño máximo de archivo (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Coordenadas de Armenia, Quindío (centro)
export const ARMENIA_COORDINATES = {
  lat: 4.5339,
  lng: -75.6811
}

// Configuración del mapa
export const MAP_CONFIG = {
  defaultZoom: 12,
  minZoom: 10,
  maxZoom: 18
}
