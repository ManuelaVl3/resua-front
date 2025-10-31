# Assets

Esta carpeta contiene todos los recursos estáticos del proyecto (imágenes, iconos, etc.).

## Estructura

```
assets/
├── images/
│   ├── placeholders/    # Imágenes por defecto cuando no hay contenido
│   │   └── default-species.jpg
│   ├── ui/              # Imágenes de la interfaz de usuario
│   │   └── map-placeholder.png
│   └── species/          # Imágenes de especies (si se necesitan archivos locales)
├── icons/               # Iconos SVG o PNG personalizados
└── README.md           # Este archivo
```

## Convenciones

1. **Imágenes de UI**: Colocar en `images/ui/` - mapas, banners, elementos visuales de la interfaz
2. **Placeholders**: Colocar en `images/placeholders/` - imágenes por defecto cuando falta contenido
3. **Iconos**: Colocar en `icons/` - iconos SVG o PNG personalizados (los Material Icons se usan desde CDN)

## Uso en el código

Para importar imágenes, usar imports de ES6:

```javascript
import mapPlaceholder from '../assets/images/ui/map-placeholder.png'
import defaultSpecies from '../assets/images/placeholders/default-species.jpg'

// Luego usar en el código
<img src={mapPlaceholder} alt="Mapa" />
```

Para imágenes que vienen del backend (URLs), usar directamente:

```javascript
<img src={observation.image_url} alt={observation.commonName} />
```

