import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import ObservationCard from '../components/observations/ObservationCard'
import ChatBot from '../components/chat/ChatBot'
import { SPECIES_CATEGORIES } from '../utils/constants'
import AgentService from "../services/AgentService.js";

const SearchObservations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const agentService = new AgentService()

  const loadObservations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await agentService.queryObservations("muestrame todas las observaciones")
      console.log(response.data.result)
      setObservations(response.data.result || [])
    } catch (err) {
      setError('Error al cargar las observaciones')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadObservations()
  }, [])

  const handleChatQueryResults = (queryResults) => {
    setObservations(queryResults)
    setError(null)
  }

  const handleViewMore = (observationId) => {
    console.log('Ver más detalles de la observación:', observationId)
    // Aquí irá la navegación a la página de detalles
  }

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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          <div>
            <ChatBot onQueryResults={handleChatQueryResults} />
          </div>

          <div>
            <div style={{
              backgroundColor: theme.colors.white,
              borderRadius: '15px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              height: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
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
                  Avistamientos encontrados ({observations.length})
                </h2>
              </div>

              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px'
              }}>
                {loading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '48px',
                      color: theme.colors.primary,
                      animation: 'spin 1s linear infinite'
                    }}>
                      refresh
                    </span>
                    <p style={{
                      marginTop: '16px',
                      color: theme.colors.primary,
                      fontSize: '16px'
                    }}>
                      Cargando observaciones...
                    </p>
                  </div>
                ) : error ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '48px',
                      color: '#dc3545',
                      marginBottom: '16px'
                    }}>
                      error_outline
                    </span>
                    <p style={{
                      color: '#dc3545',
                      fontSize: '16px',
                      textAlign: 'center'
                    }}>
                      {error}
                    </p>
                  </div>
                ) : observations.length > 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {observations.map((observation) => (
                      <ObservationCard
                        key={observation.id}
                        image={observation.images && observation.images.length > 0 
                          ? observation.images[0].image_url 
                          : '/src/assets/images/default-species.jpg'}
                        commonName={observation.species.common_name}
                        scientificName={observation.species.scientific_name}
                        location={observation.location.location}
                        date={new Date(observation.created_at).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
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
