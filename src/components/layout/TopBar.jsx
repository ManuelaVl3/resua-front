import React from 'react'
import { theme } from '../../styles/theme'

const TopBar = () => {
  return (
    <header 
      style={{
        backgroundColor: theme.colors.primary,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Logo/Nombre de la app */}
      <div style={{ color: theme.colors.light }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          margin: 0,
          color: theme.colors.light
        }}>
          RESUA
        </h1>
      </div>

      {/* Navegación y usuario */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        color: theme.colors.light 
      }}>
        <span style={{ 
          fontSize: '16px',
          color: theme.colors.light 
        }}>
          Registros
        </span>
        
        {/* Icono de usuario */}
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: theme.colors.light,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
              fill={theme.colors.primary}
            />
            <path 
              d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
              fill={theme.colors.primary}
            />
          </svg>
        </div>
      </div>
    </header>
  )
}

export default TopBar
