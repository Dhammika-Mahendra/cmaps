import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'
import { useAppContext } from '../context/AppContext'

// Generate random color
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 50%)`
}

export default function Map() {
  const { showAdminBoundaries, showColomboCity, showColors } = useAppContext()
  const [geoJsonData, setGeoJsonData] = useState(null)
  const [colomboCityData, setColomboCityData] = useState(null)

  useEffect(() => {
    // Only fetch when showAdminBoundaries is true and data hasn't been loaded yet
    if (showAdminBoundaries && !geoJsonData) {
      fetch('/ADM3.json')
        .then(response => response.json())
        .then(data => setGeoJsonData(data))
        .catch(error => console.error('Error loading GeoJSON:', error))
    }
  }, [showAdminBoundaries, geoJsonData])

  useEffect(() => {
    // Only fetch when showColomboCity is true and data hasn't been loaded yet
    if (showColomboCity && !colomboCityData) {
      fetch('/Col_post.json')
        .then(response => response.json())
        .then(data => setColomboCityData(data))
        .catch(error => console.error('Error loading Colombo city GeoJSON:', error))
    }
  }, [showColomboCity, colomboCityData])

  // Generate color mapping for ADM2_EN values
  const colorMap = useMemo(() => {
    if (!geoJsonData) return {}
    
    const map = {}
    geoJsonData.features.forEach(feature => {
      const adm2 = feature.properties.ADM2_EN
      if (adm2 && !map[adm2]) {
        map[adm2] = generateRandomColor()
      }
    })
    return map
  }, [geoJsonData])

  // Style function for admin boundaries
  const getAdminStyle = (feature) => {
    if (showColors && feature.properties.ADM2_EN) {
      return {
        color: colorMap[feature.properties.ADM2_EN] || '#0400fdff',
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.1
      }
    }
    return {
      color: '#0400fdff',
      weight: 1,
      opacity: 0.9,
      fillOpacity: 0
    }
  }

  return (
    <div className='h-full w-full relative z-0'>
      <MapContainer
        center={[6.9270786, 79.8612433]}
        zoom={13}
        className='h-full w-full'
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {showAdminBoundaries && geoJsonData && (
          <GeoJSON
            key={showColors ? 'colored' : 'default'}
            data={geoJsonData}
            style={getAdminStyle}
          />
        )}
        {showColomboCity && colomboCityData && (
          <GeoJSON
            data={colomboCityData}
            style={{
              color: '#cc00ffff',
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.1
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}
