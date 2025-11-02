import React, { useMemo, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import mapImage from '../assets/images/ui/map-placeholder.png'
import ObservationsService from '../services/observations/ObservationsService'

const ObservationDetail = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const observationId = params ? params.get('id') : null
  const [observation, setObservation] = useState({
    id: 1,
    user: { username: '@jahashjas' },
    species: {
      commonName: 'Mono aullador rojo',
      scientificName: 'Alouatta seniculus'
    },
    location: {
      location: 'Oro Negro'
    },
    createdAt: '2024-04-10T00:00:00Z',
    description: 'Vi una tropa de monos aulladores rojos en Oro Negro, desplazándose entre los árboles y emitiendo fuertes vocalizaciones. Este avistamiento es atípico, pues usualmente la especie se registra en bosques del Quindío.',
    category: 'Mamíferos',
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1548095115-45697e220cf3?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!observationId) return
      setLoading(true)
      setError(null)
      try {
        const service = new ObservationsService()
        const data = await service.getObservationById(observationId)
        setObservation({
          id: data.id,
          user: { username: '@usuario' }, // placeholder mientras haya usuario en API
          species: {
            commonName: data.species.commonName,
            scientificName: data.species.scientificName
          },
          location: { location: data.location.location },
          createdAt: data.createdAt,
          description: data.description,
          category: data.category || '—',
          images: data.images?.map(img => ({ imageUrl: img.imageUrl })) || []
        })
      } catch (e) {
        console.error(e)
        setError('Error cargando el detalle del registro')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [observationId])

  const [comments, setComments] = useState([
    {
      id: 1,
      user: '@User0001',
      text: 'Este registro resalta la importancia de los corredores de vegetación que conectan la ciudad con áreas de bosque'
    }
  ])
  const [commentText, setCommentText] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  const addComment = (e) => {
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return
    setComments(prev => [
      ...prev,
      { id: Date.now(), user: '@yo', text }
    ])
    setCommentText('')
  }

  const formattedDate = new Date(observation.createdAt).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <TopBar />
      <main style={{ padding: '3% 4% 4% 8%' }}>
        {loading && (
          <p style={{ color: theme.colors.primary }}>Cargando...</p>
        )}
        {error && (
          <p style={{ color: '#dc3545' }}>{error}</p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          minHeight: 'calc(100vh - 160px)'
        }}>

          <div>
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              width: '100%',
              height: '360px',
              minHeight: '340px',
              position: 'relative',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!imageLoaded && (
                <span className="material-icons-outlined" style={{
                  position: 'absolute',
                  fontSize: '64px',
                  color: theme.colors.disabled
                }}>
                  image
                </span>
              )}
              <img
                src={observation.images?.[0]?.imageUrl}
                alt={observation.species.commonName}
                onLoad={() => setImageLoaded(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imageLoaded ? 1 : 0 }}
              />
            </div>
            <p style={{
              color: theme.colors.primary,
              fontSize: '12px',
              opacity: 0.8,
              marginTop: '8px'
            }}>
              Publicado por {observation.user.username}
            </p>
            {/** Ocultamos el ID del registro por solicitud **/}

            
            <div style={{
              marginTop: '24px',
              borderRadius: '15px',
              backgroundColor: '#F3EFE4',
              padding: '18px 18px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: theme.colors.primary,
                margin: 0,
                marginBottom: '12px'
              }}>Comunidad</h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxHeight: '218px',
                overflowY: 'auto',
                paddingRight: '6px'
              }}>
                {comments.map(c => (
                  <div key={c.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    border: `1px solid ${theme.colors.disabled}`
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}>
                      <span style={{ color: theme.colors.disabled, fontSize: '12px' }}>{c.user}</span>
                    </div>
                    <p style={{ color: theme.colors.primary, fontSize: '13px', margin: 0 }}>{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={addComment} style={{ marginTop: '14px' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: `1px solid ${theme.colors.disabled}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  gap: '12px'
                }}>
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Agregar un comentario"
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      color: theme.colors.primary,
                      fontSize: '14px'
                    }}
                  />
                  <button type="submit" style={{
                    border: 'none',
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    cursor: 'pointer'
                  }}>Publicar</button>
                </div>
              </form>
            </div>
          </div>

          
          <div>
            <div style={{
              backgroundColor: '#F3EFE4',
              borderRadius: '15px',
              padding: '16px 18px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.primary, margin: 0 }}>
                    {observation.species.commonName}
                  </h1>
                  <p style={{ fontStyle: 'italic', color: theme.colors.primary, opacity: 0.8, margin: 0 }}>
                    {observation.species.scientificName}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: theme.colors.primary, fontSize: '12px', margin: 0 }}>{observation.location.location}</p>
                  <p style={{ color: theme.colors.primary, fontSize: '12px', margin: 0 }}>{formattedDate}</p>
                </div>
              </div>
            </div>

            <div style={{
              borderRadius: '15px',
              border: `1px solid ${theme.colors.disabled}`,
              padding: '16px 18px',
              marginBottom: '18px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Notas del observador</h3>
              <p style={{ color: theme.colors.primary, fontSize: '14px', margin: 0 }}>{observation.description}</p>
            </div>

            {/*
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Categoría</h3>
              <p style={{ color: theme.colors.primary, fontSize: '14px', margin: 0 }}>{observation.category}</p>
            </div>
            */}

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Mapa</h3>
              <div style={{
                height: '285px',
                borderRadius: '15px',
                overflow: 'hidden',
                border: `1px solid ${theme.colors.disabled}`
              }}>
                <img
                  src={mapImage}
                  alt={'Mapa de ubicación'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ObservationDetail


