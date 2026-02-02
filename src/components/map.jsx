import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Component to manage label visibility based on zoom level
function LabelManager({ geoData, showLabels, onZoomChange }) {
  const map = useMap()
  
  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom())
    }
  })
  
  return null
}

export default function Map() {
  const { showAdminBoundaries, showLabels } = useAppContext()
  const [geoData, setGeoData] = useState(null)
  const [currentZoom, setCurrentZoom] = useState(13)
  const geoJsonRef = useRef(null)

  useEffect(() => {
    // Load GeoJSON data
    fetch('/ADM level-3.json')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading GeoJSON:', error))
  }, [])

  // Function to calculate polygon centroid
  const getCentroid = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return null
    
    // Handle MultiPolygon
    if (coordinates[0][0][0] && Array.isArray(coordinates[0][0][0])) {
      coordinates = coordinates[0] // Use first polygon of multipolygon
    }
    
    // Get the outer ring
    const ring = coordinates[0]
    let x = 0, y = 0, n = ring.length
    
    ring.forEach(coord => {
      x += coord[0]
      y += coord[1]
    })
    
    return [y / n, x / n] // [lat, lng]
  }

  // Calculate area to determine if label should be shown at current zoom
  const getPolygonArea = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return 0
    
    // Handle MultiPolygon
    if (coordinates[0][0][0] && Array.isArray(coordinates[0][0][0])) {
      coordinates = coordinates[0]
    }
    
    const ring = coordinates[0]
    let area = 0
    
    for (let i = 0; i < ring.length - 1; i++) {
      area += (ring[i][0] * ring[i + 1][1]) - (ring[i + 1][0] * ring[i][1])
    }
    
    return Math.abs(area / 2)
  }

  // Determine if label should be shown based on zoom and polygon size
  const shouldShowLabel = (feature, zoom) => {
    if (!showLabels) return false
    
    const area = getPolygonArea(feature.geometry.coordinates)
    
    // Progressive label display based on zoom level
    if (zoom < 10) return false // No labels at very low zoom
    if (zoom < 11) return area > 0.01 // Only very large regions
    if (zoom < 12) return area > 0.005 // Large regions
    if (zoom < 13) return area > 0.002 // Medium regions
    if (zoom < 14) return area > 0.001 // Smaller regions
    return true // All labels at high zoom
  }

  // Function to handle each feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties.ADM3_EN) {
      const centroid = getCentroid(feature.geometry.coordinates)
      
      if (centroid) {
        const shouldShow = shouldShowLabel(feature, currentZoom)
        
        if (shouldShow) {
          // Create a tooltip that's always visible
          const tooltip = L.tooltip({
            permanent: true,
            direction: 'center',
            className: 'custom-label',
            opacity: 0.9
          })
          .setContent(feature.properties.ADM3_EN)
          .setLatLng(centroid)
          
          layer.bindTooltip(tooltip)
        }
      }
    }
  }

  // Key changes when showLabels or zoom changes to force re-render
  const geoJsonKey = `geojson-${showLabels}-${currentZoom}`

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
        <LabelManager 
          geoData={geoData} 
          showLabels={showLabels}
          onZoomChange={setCurrentZoom}
        />
        {showAdminBoundaries && geoData && (
          <GeoJSON
            key={geoJsonKey}
            ref={geoJsonRef}
            data={geoData}
            style={{
              color: '#3b82f6',
              weight: 2,
              opacity: 0.7,
              fillOpacity: 0.1
            }}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  )
}
