import React, { useState, useRef, useEffect } from 'react'
import { theme } from '../../styles/theme'
import Button from '../common/Button'
import Input from '../common/Input'

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu agente de IA, estoy aquí para ayudarte a realizar búsquedas, ¿Qué quieres descubrir hoy?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simular respuesta del bot
  const simulateBotResponse = (userMessage) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let botResponse = ''
      
      // Respuestas predefinidas basadas en palabras clave
      if (userMessage.toLowerCase().includes('aves') || userMessage.toLowerCase().includes('pájaros')) {
        botResponse = 'Las aves son vertebrados con plumas, pico y alas. En Armenia puedes encontrar muchas especies como colibríes, gavilanes y loros. ¿Te interesa alguna especie en particular?'
      } else if (userMessage.toLowerCase().includes('mamíferos') || userMessage.toLowerCase().includes('monos')) {
        botResponse = 'Los mamíferos son animales de sangre caliente con pelo. En nuestra región destacan los monos aulladores, armadillos y murciélagos. ¿Quieres saber más sobre alguna especie específica?'
      } else if (userMessage.toLowerCase().includes('reptiles') || userMessage.toLowerCase().includes('lagartos')) {
        botResponse = 'Los reptiles son animales de sangre fría con escamas. Aquí puedes encontrar iguanas, serpientes y lagartijas. ¿Hay alguna especie que te llame la atención?'
      } else if (userMessage.toLowerCase().includes('ubicación') || userMessage.toLowerCase().includes('dónde')) {
        botResponse = 'Las especies silvestres en Armenia se pueden encontrar en diferentes zonas: parques urbanos, zonas rurales, y áreas naturales como el Jardín Botánico del Quindío. ¿En qué zona específica te interesa buscar?'
      } else if (userMessage.toLowerCase().includes('ayuda') || userMessage.toLowerCase().includes('información')) {
        botResponse = 'Puedo ayudarte con información sobre especies silvestres, ubicaciones de avistamientos, características de animales, y consejos para la observación. ¿Qué te gustaría saber?'
      } else {
        botResponse = 'Interesante pregunta. Puedo ayudarte con información sobre especies silvestres, ubicaciones, o características de animales. ¿Hay algo específico sobre la fauna de Armenia que te interese?'
      }
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      // Agregar mensaje del usuario
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      }])
      
      // Simular respuesta del bot
      simulateBotResponse(inputMessage)
      
      setInputMessage('')
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div style={{
      backgroundColor: theme.colors.white,
      borderRadius: '15px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      height: '600px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header del chat */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${theme.colors.disabled}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: theme.colors.primary,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span className="material-icons-outlined" style={{
            color: 'white',
            fontSize: '20px'
          }}>
            smart_toy
          </span>
        </div>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: theme.colors.primary,
            margin: 0
          }}>
            Agente de IA
          </h3>
          <p style={{
            fontSize: '12px',
            color: theme.colors.disabled,
            margin: 0
          }}>
            En línea
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.isBot ? 'flex-start' : 'flex-end',
              alignItems: 'flex-start',
              gap: '8px'
            }}
          >
            {message.isBot && (
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: theme.colors.disabled,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span className="material-icons-outlined" style={{
                  color: 'white',
                  fontSize: '16px'
                }}>
                  smart_toy
                </span>
              </div>
            )}
            
            <div style={{
              maxWidth: '70%',
              backgroundColor: message.isBot ? '#f8f9fa' : theme.colors.primary,
              color: message.isBot ? theme.colors.primary : 'white',
              padding: '12px 16px',
              borderRadius: '15px',
              fontSize: '14px',
              lineHeight: '1.4',
              position: 'relative'
            }}>
              <p style={{ margin: 0 }}>{message.text}</p>
              <span style={{
                fontSize: '10px',
                opacity: 0.7,
                display: 'block',
                marginTop: '4px'
              }}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        
        {/* Indicador de escritura */}
        {isTyping && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: theme.colors.disabled,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span className="material-icons-outlined" style={{
                color: 'white',
                fontSize: '16px'
              }}>
                smart_toy
              </span>
            </div>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '12px 16px',
              borderRadius: '15px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: theme.colors.disabled,
                borderRadius: '50%',
                animation: 'pulse 1.4s infinite'
              }}></div>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: theme.colors.disabled,
                borderRadius: '50%',
                animation: 'pulse 1.4s infinite 0.2s'
              }}></div>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: theme.colors.disabled,
                borderRadius: '50%',
                animation: 'pulse 1.4s infinite 0.4s'
              }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input del chat */}
      <form onSubmit={handleSendMessage} style={{
        padding: '16px',
        borderTop: `1px solid ${theme.colors.disabled}`
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Escribe tu pregunta..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                marginBottom: 0,
                fontSize: '14px'
              }}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            style={{
              backgroundColor: theme.colors.primary,
              color: 'white',
              padding: '12px 16px',
              borderRadius: '15px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
              send
            </span>
          </Button>
        </div>
      </form>

      {/* Estilos para animaciones */}
      <style>
        {`
          @keyframes pulse {
            0%, 60%, 100% {
              opacity: 0.3;
            }
            30% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

export default ChatBot
