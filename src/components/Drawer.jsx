import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { showAdminBoundaries, setShowAdminBoundaries } = useAppContext()

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >

    {/*=====================================================================*/}
    {/*                Navigation Menu                                      */}
    {/*=====================================================================*/}

    <nav className="p-2">
        <div className="space-y-1 border-b border-gray-200">
            <div className="text-md text-gray-600 flex items-center justify-between w-full py-2 pl-2 pr-6">
            Admin Boundaries
            <input 
              type="checkbox"
              checked={showAdminBoundaries}
              onChange={(e) => setShowAdminBoundaries(e.target.checked)}
            />
            </div>
            
            {/* List of examples with smooth animations */}
            <div 
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showAdminBoundaries ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-2 pl-2 space-y-1 w-[60%] pb-2">
                <div className="text-sm text-gray-600 flex justify-between items-center">
                  <label className="font-sm">Labels</label>
                  <input type="checkbox"/>
                </div>
                <div className="text-sm text-gray-600 flex justify-between items-center">
                  <label className="font-sm">Colors</label>
                  <input type="checkbox"/>
                </div>
              </div>
            </div>
        </div>
    </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500 text-center">
            © 2026 CeyMapper
          </p>
        </div>
      </div>

      {/* Toggle Button - Arrow from Left Border */}
      {!isOpen && (
        <button
          onClick={toggleDrawer}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-2 px-1 rounded-r-lg shadow-lg z-30 hover:bg-gray-50 transition-colors border border-l-0 border-gray-100"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default Drawer
