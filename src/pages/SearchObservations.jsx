import React, { useState } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import ObservationCard from '../components/observations/ObservationCard'
import ChatBot from '../components/chat/ChatBot'
import { SPECIES_CATEGORIES } from '../utils/constants'

const SearchObservations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Datos de ejemplo
  const observations = [
    {
      id: 1,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Mono aullador rojo',
      scientificName: 'Alouatta seniculus',
      location: 'Oro Negro',
      date: '10 de abril de 2024',
      category: 'Mamíferos'
    },
    {
      id: 2,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Gavilán pollero',
      scientificName: 'Rupornis magnirostris',
      location: 'Centro de Armenia',
      date: '15 de marzo de 2024',
      category: 'Aves'
    },
    {
      id: 3,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Colibrí esmeralda',
      scientificName: 'Amazilia saucerottei',
      location: 'Parque de la Vida',
      date: '22 de febrero de 2024',
      category: 'Aves'
    },
    {
      id: 4,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Iguana verde',
      scientificName: 'Iguana iguana',
      location: 'Barrio Galán',
      date: '5 de enero de 2024',
      category: 'Reptiles'
    },
    {
      id: 5,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Armadillo',
      scientificName: 'Dasypus novemcinctus',
      location: 'Zona rural',
      date: '18 de diciembre de 2023',
      category: 'Mamíferos'
    }
  ]

  // Filtrar observaciones
  const filteredObservations = observations.filter(observation => {
    const matchesSearch = observation.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         observation.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         observation.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || observation.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleViewMore = (observationId) => {
    console.log('Ver más detalles de la observación:', observationId)
    // Aquí irá la navegación a la página de detalles
  }

  // Preparar opciones para el select (agregar "Todas las categorías")
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    ...SPECIES_CATEGORIES
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3EFE4' }}>
      <TopBar />
      
      <main style={{ padding: '2% 3% 3% 7%' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '32px'
        }}>
          Buscar avistamientos
        </h1>

        {/* Layout de dos columnas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Columna izquierda - Chat */}
          <div>
            <ChatBot />
          </div>

          {/* Columna derecha - Resultados */}
          <div>
            {/* Contenedor de resultados con altura fija */}
            <div style={{
              backgroundColor: theme.colors.white,
              borderRadius: '15px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              height: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Header de resultados */}
              <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${theme.colors.disabled}`,
                flexShrink: 0
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: theme.colors.primary,
                  margin: 0
                }}>
                  Avistamientos encontrados ({filteredObservations.length})
                </h2>
              </div>

              {/* Contenido scrolleable */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px'
              }}>
                {filteredObservations.length > 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {filteredObservations.map((observation) => (
                      <ObservationCard
                        key={observation.id}
                        image={observation.image}
                        commonName={observation.commonName}
                        scientificName={observation.scientificName}
                        location={observation.location}
                        date={observation.date}
                        onViewMore={() => handleViewMore(observation.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '64px',
                      color: theme.colors.disabled,
                      marginBottom: '16px'
                    }}>
                      chat_bubble_outline
                    </span>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: theme.colors.primary,
                      marginBottom: '8px'
                    }}>
                      Pregúntale al asistente de IA
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: theme.colors.disabled,
                      margin: 0
                    }}>
                      Escribe en el chat para buscar especies, ubicaciones o información sobre avistamientos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SearchObservations
