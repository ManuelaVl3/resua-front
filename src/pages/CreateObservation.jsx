import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { theme } from '../styles/theme'
import { SPECIES_CATEGORIES } from '../utils/constants'
import TopBar from '../components/layout/TopBar'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import TextArea from '../components/common/TextArea'
import Select from '../components/common/Select'
import mapPlaceholder from '../assets/images/ui/map-placeholder.png'

const CreateObservation = () => {
  const [formData, setFormData] = useState({
    image: null,
    commonName: '',
    scientificName: '',
    category: '',
    observationDetail: '',
    addressDescription: ''
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [aiError, setAiError] = useState(null)

  const categoryOptions = SPECIES_CATEGORIES

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
    }
  }

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(formData.image)
      
      identifySpecies(formData.image)
    } else {
      setImagePreview(null)
      setAiSuggestions([])
    }
  }, [formData.image])

  const identifySpecies = async (file) => {
    setIsLoadingSuggestions(true)
    setAiSuggestions([])
    setAiError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post('http://localhost:8000/species/identify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setAiSuggestions(response.data.suggestions || [])
    } catch (error) {
      console.log('Error completo:', error)
      
      if (error.response) {
        setAiError(error.response.data.detail || 'Error al identificar la especie')
      } else if (error.request) {
        setAiError('Error de conexión. Verifica que el servidor esté corriendo.')
      } else {
        setAiError('Error inesperado. Intenta nuevamente.')
      }
      
      console.error('Error en la llamada a la API:', error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      commonName: suggestion.commonName,
      scientificName: suggestion.scientificName
    }))
  }

  const isFormValid = () => {
    return (
      formData.image &&
      formData.commonName.trim() !== '' &&
      formData.scientificName.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.observationDetail.trim() !== '' &&
      formData.addressDescription.trim() !== ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      setShowSuccessMessage(true)
      
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
      
      //TODO: Aquí irá la lógica para enviar al microservicio que guarda la info en bd - observations-ms
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      {}
      {showSuccessMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#f0f9f4',
          border: `1px solid #10b981`,
          borderRadius: '12px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 10000,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {}
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
          
          {}
          <span style={{
            color: '#374151',
            fontSize: '16px',
            fontWeight: 500
          }}>
            Registro guardado exitosamente
          </span>
        </div>
      )}
      
      <TopBar />
      
      <main style={{ padding: '2% 3% 3% 7%' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '3%'
        }}>
          Crear nuevo registro
        </h1>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="create-observation-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10%',
            width: '100%'
          }}>
            
            <div>
              <div className="file-upload-area" style={{
                marginBottom: '10%',
                borderRadius: '15px',
                backgroundColor: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                padding: '4% 5%'
              }}>
                {/* Vista previa de imagen o ícono */}
                <div style={{
                  width: 'clamp(40px, 5vw, 60px)',
                  height: 'clamp(40px, 5vw, 60px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  backgroundColor: imagePreview ? 'transparent' : 'transparent'
                }}>
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Vista previa" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  ) : (
                    <span className="material-icons-outlined" style={{
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      color: theme.colors.disabled
                    }}>
                      add_photo_alternate
                    </span>
                  )}
                </div>
                
                <div style={{ flex: 1, marginLeft: '3%' }}>
                  <p style={{
                    color: theme.colors.primary,
                    marginBottom: '3%',
                    marginTop: 0,
                    fontSize: '16px',
                    fontWeight: 500
                  }}>
                    {formData.image ? formData.image.name : 'Sube una imagen de la especie'}
                  </p>
                  <p style={{
                    color: theme.colors.disabled,
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Formatos permitidos: JPEG, PNG
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <Button
                  variant="primary"
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: theme.colors.primary,
                    marginLeft: '3%',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.disabled;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary;
                  }}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  Agregar archivo
                </Button>
              </div>

              {}
              {(isLoadingSuggestions || aiSuggestions.length > 0 || aiError) && (
                <div style={{
                  marginBottom: '10%',
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '15px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '20px',
                      color: theme.colors.primary
                    }}>
                      smart_toy
                    </span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: theme.colors.primary,
                      margin: 0
                    }}>
                      Sugerencias del agente de IA
                    </h3>
                  </div>

                  {isLoadingSuggestions ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: theme.colors.disabled,
                      fontSize: '14px'
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #e0e0e0',
                        borderTop: '2px solid #4CAF50',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Analizando imagen...
                    </div>
                  ) : aiError ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#dc3545',
                      fontSize: '14px',
                      backgroundColor: '#f8d7da',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #f5c6cb'
                    }}>
                      <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                        error
                      </span>
                      {aiError}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {aiSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => selectSuggestion(suggestion)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f5f5f5'
                            e.target.style.borderColor = theme.colors.primary
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white'
                            e.target.style.borderColor = '#e0e0e0'
                          }}
                        >
                          <div>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: 600,
                              color: theme.colors.primary,
                              marginBottom: '2px'
                            }}>
                              {suggestion.commonName}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: theme.colors.disabled,
                              fontStyle: 'italic'
                            }}>
                              {suggestion.scientificName}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: theme.colors.primary,
                            backgroundColor: '#e8f5e8',
                            padding: '4px 8px',
                            borderRadius: '12px'
                          }}>
                            {suggestion.confidence}%
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Input
                label="Nombre común de la especie"
                placeholder="Ej: Gavilán pollero"
                value={formData.commonName}
                onChange={(e) => handleInputChange('commonName', e.target.value)}
                style={{ marginBottom: '3%' }}
              />

              <Input
                label="Nombre científico de la especie"
                placeholder="Ej: Rupornis magnirostris"
                value={formData.scientificName}
                onChange={(e) => handleInputChange('scientificName', e.target.value)}
                style={{ marginBottom: '3%' }}
              />

              <Select
                label="Categoría"
                placeholder="Selecciona una categoría"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                options={categoryOptions}
              />
            </div>

            <div>
              <TextArea
                label="Detalle de avistamiento"
                placeholder="Describe cómo fue el avistamiento, comportamiento observado, etc."
                value={formData.observationDetail}
                onChange={(e) => handleInputChange('observationDetail', e.target.value)}
                rows={4}
              />

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme.colors.primary,
                  marginBottom: '16px'
                }}>
                  Ubicar en el mapa el lugar de avistamiento
                </h3>
                
                <div style={{
                  height: '200px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: `1px solid ${theme.colors.disabled}`,
                  position: 'relative'
                }}>
                  <img 
                    src={mapPlaceholder} 
                    alt="Mapa de ubicación" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '12px 20px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    color: theme.colors.primary,
                    fontWeight: 500
                  }}>
                    <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                      place
                    </span>
                    Mapa interactivo (próximamente)
                  </div>
                </div>
              </div>

              <TextArea
                label="Descripción de la dirección de avistamiento"
                placeholder="Describe la ubicación exacta donde observaste la especie"
                value={formData.addressDescription}
                onChange={(e) => handleInputChange('addressDescription', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10%',
            width: '100%'
          }}>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant={isFormValid() ? "primary" : "disabled"}
                size="lg"
                onClick={handleSubmit}
                style={{
                  backgroundColor: isFormValid() ? theme.colors.primary : theme.colors.disabled,
                  color: theme.colors.light,
                  padding: '5px 48px',
                  fontSize: '18px',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed'
                }}
              >
                Crear registro
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateObservation
