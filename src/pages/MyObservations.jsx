import React, { useMemo } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import MyObservationCard from '../components/observations/MyObservationCard'

const MyObservations = () => {
  const myObservations = useMemo(() => ([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1548095115-45697e220cf3?q=80&w=800&auto=format&fit=crop',
      commonName: 'Mono aullador rojo',
      scientificName: 'Alouatta seniculus',
      location: 'Oro Negro',
      date: '10 de abril de 2024'
    }
  ]), [])

  const handleAdd = () => {
    console.log('Agregar nuevo registro')
  }

  const handleEdit = (id) => {
    console.log('Editar registro', id)
  }

  const handleDelete = (id) => {
    console.log('Eliminar registro', id)
  }

  const handleViewMore = (id) => {
    console.log('Ver más del registro', id)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3EFE4' }}>
      <TopBar />
      <main style={{ padding: '2% 3% 3% 7%', position: 'relative' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '24px'
        }}>
          Mis registros
        </h1>

        <button
          onClick={handleAdd}
          aria-label="Agregar registro"
          style={{
            position: 'absolute',
            top: '24px',
            right: '3%',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'transparent',
            color: theme.colors.primary,
            cursor: 'pointer'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
            add_circle
          </span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '860px' }}>
          {myObservations.map(o => (
            <MyObservationCard
              key={o.id}
              image={o.image}
              commonName={o.commonName}
              scientificName={o.scientificName}
              location={o.location}
              date={o.date}
              onViewMore={() => handleViewMore(o.id)}
              onEdit={() => handleEdit(o.id)}
              onDelete={() => handleDelete(o.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default MyObservations


