import React, { useState, useEffect } from 'react'
import TopBar from '../components/layout/TopBar'
import AuthService from '../services/AuthService'
import { theme } from '../styles/theme'

const Profile = () => {
  const authService = new AuthService()
  const [userName, setUserName] = useState('Usuario')

  useEffect(() => {
    const fullName = localStorage.getItem('userFullName')
    if (fullName) {
      const firstName = fullName.split(' ')[0]
      setUserName(firstName)
    } else {
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail) {
        const name = userEmail.split('@')[0]
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
        setUserName(capitalizedName)
      }
    }
  }, [])

  const handleEditProfile = () => {
    window.location.href = '/edit-profile'
  }

  const handleMyObservations = () => {
    window.location.href = '/my-observations'
  }

  const handleDatabase = () => {
    console.log('Base de datos RESUA')
  }

  const handleLogout = () => {
    authService.logout()
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 60px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '45px',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: theme.colors.primary,
            margin: 0,
            textAlign: 'left',
            fontFamily: theme.fonts.primary
          }}>
            Bienvenid@, {userName} 👋
          </h1>
          
          <a
            onClick={handleLogout}
            style={{
              fontSize: '14px',
              color: theme.colors.disabled,
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: theme.fonts.primary,
              transition: 'color 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = theme.colors.primary}
            onMouseOut={(e) => e.currentTarget.style.color = theme.colors.disabled}
          >
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
              logout
            </span>
            Cerrar sesión
          </a>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '150px',
          gap: '200px',
          flexWrap: 'wrap'
        }}>
          <div
            onClick={handleEditProfile}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              minWidth: '150px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span className="material-icons-outlined" style={{ fontSize: '80px', color: 'black' }}>
                mode_edit
              </span>
            </div>
            <span style={{
              fontSize: '16px',
              color: theme.colors.disabled,
              fontFamily: theme.fonts.primary,
              textAlign: 'center'
            }}>
              Editar perfil
            </span>
          </div>

          <div
            onClick={handleMyObservations}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              minWidth: '150px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span className="material-icons-outlined" style={{ fontSize: '80px', color: 'black' }}>
                camera_alt
              </span>
            </div>
            <span style={{
              fontSize: '16px',
              color: theme.colors.disabled,
              fontFamily: theme.fonts.primary,
              textAlign: 'center'
            }}>
              Mis registros
            </span>
          </div>

          <div
            onClick={handleDatabase}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              minWidth: '150px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span className="material-icons-outlined" style={{ fontSize: '80px', color: 'black' }}>
                bar_chart
              </span>
            </div>
            <span style={{
              fontSize: '16px',
              color: theme.colors.disabled,
              fontFamily: theme.fonts.primary,
              textAlign: 'center'
            }}>
              Base de datos RESUA
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile

