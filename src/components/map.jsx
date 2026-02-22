import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { useAppContext } from '../context/AppContext'

export default function Map() {
  const { showAdminBoundaries, showColomboCity } = useAppContext()
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
            data={geoJsonData}
            style={{
              color: '#0400fdff',
              weight: 1,
              opacity: 0.9,
              fillOpacity: 0
            }}
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
