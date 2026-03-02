import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip } from 'react-leaflet'
import { useEffect, useState, useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAppContext } from '../context/AppContext'

// Generate random color
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 50%)`
}

export default function Map() {
  const { showAdminBoundaries, showColomboCity, showAdminColors, showColomboColors, showLGBoundaries, showColomboLabels } = useAppContext()
  const [geoJsonData, setGeoJsonData] = useState(null)
  const [colomboCityData, setColomboCityData] = useState(null)
  const [lgBoundaryData, setLgBoundaryData] = useState(null)


  //=========================================================================
  //               dynamic json layer loading
  //=========================================================================

  useEffect(() => {
    if (showAdminBoundaries && !geoJsonData) {
      fetch('/ADM3.json')
        .then(response => response.json())
        .then(data => setGeoJsonData(data))
        .catch(error => console.error('Error loading GeoJSON:', error))
    }
  }, [showAdminBoundaries, geoJsonData])

  useEffect(() => {
    if (showColomboCity && !colomboCityData) {
      fetch('/Col_post.json')
        .then(response => response.json())
        .then(data => setColomboCityData(data))
        .catch(error => console.error('Error loading Colombo city GeoJSON:', error))
    }
  }, [showColomboCity, colomboCityData])

  useEffect(() => {
    if (showLGBoundaries && !lgBoundaryData) {
      fetch('/Lcl_GV.json')
        .then(response => response.json())
        .then(data => setLgBoundaryData(data))
        .catch(error => console.error('Error loading Local Government GeoJSON:', error))
    }
  }, [showLGBoundaries, lgBoundaryData])


  //=========================================================================
  //               layer styling and color mapping
  //=========================================================================

  // Style function for admin boundaries---------------------------------------------
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

  const getAdminStyle = (feature) => {
    if (showAdminColors && feature.properties.ADM2_EN) {
      return {
        color: colorMap[feature.properties.ADM2_EN],
        weight: 0.7,
        opacity: 0.8,
        fillOpacity: 0.1
      }
    }
    return {
      color: '#0400fdff',
      weight: 0.7,
      opacity: 0.8,
      fillOpacity: 0
    }
  }


  // Style function for Colombo City----------------------------------------------
    const colomboColorMap = useMemo(() => {
    if (!colomboCityData) return {}
    
    const map = {}
    colomboCityData.features.forEach(feature => {
      const id = feature.properties.id
      if (id && !map[id]) {
        map[id] = generateRandomColor()
      }
    })
    return map
  }, [colomboCityData])

  const getColomboStyle = (feature) => {
    if (showColomboColors && feature.properties.id) {
      return {
        color: colomboColorMap[feature.properties.id] ,
        weight: 0.5,
        opacity: 0.7,
        fillOpacity: 0.2
      }
    }
    return {
      color: '#cc00ffff',
      weight: 1,
      opacity: 0.7,
      fillOpacity: 0
    }
  }

  // Style for Local Government boundaries 

  const getLGStyle = (feature) => {
    return {
      color: '#00ccffff',
      weight: 0.7,
      opacity: 0.7,
      fillOpacity: 0.1
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
            key={showAdminColors ? 'colored' : 'default'}
            data={geoJsonData}
            style={getAdminStyle}
          />
        )}
        {showColomboCity && colomboCityData && (
          <GeoJSON
            key={showColomboColors ? 'colombo-colored' : 'colombo-default'}
            data={colomboCityData}
            style={getColomboStyle}
          />
        )}
        {showLGBoundaries && lgBoundaryData && (
          <GeoJSON
            data={lgBoundaryData}
            style={getLGStyle}
          />
        )}
        {showColomboCity && showColomboLabels && colomboCityData && colomboCityData.features.map((feature, index) => {
          const { coord_x, coord_y, name, id } = feature.properties
          if (coord_x && coord_y && name) {
            return (
              <Marker
                key={`label-${index}`}
                position={[coord_y, coord_x]}
                icon={L.divIcon({
                  className: 'colombo-label',
                  html: `<div class="colombo-label-text">${"("+id +")<br>"+ name}</div>`,
                  iconSize: [0, 0],
                  iconAnchor: [0, 0]
                })}
              />
            )
          }
          return null
        })}
      </MapContainer>
    </div>
  )
}
