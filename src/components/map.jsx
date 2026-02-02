import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { useAppContext } from '../context/AppContext'

export default function Map() {
  const { showAdminBoundaries } = useAppContext()
  const [geoJsonData, setGeoJsonData] = useState(null)

  useEffect(() => {
    // Fetch the GeoJSON data
    fetch('/ADM level-3.json')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error('Error loading GeoJSON:', error))
  }, [])

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
              color: '#3388ff',
              weight: 2,
              opacity: 0.6,
              fillOpacity: 0.2
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}
