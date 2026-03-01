import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { showAdminBoundaries, setShowAdminBoundaries, showColomboCity, setShowColomboCity, showAdminColors, setShowAdminColors, showColomboColors, setShowColomboColors, showLGBoundaries, setShowLGBoundaries, showAdminLabels, setShowAdminLabels, showColomboLabels, setShowColomboLabels } = useAppContext()

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

        {/* Admin L3 -------------------------------------------------- */}

        <div className="space-y-1 border-b border-gray-200">
            <div className="text-md text-gray-600 flex items-center justify-between w-full py-1 pl-2 pr-6">
            Admin Boundaries
            <input 
              type="checkbox"
              checked={showAdminBoundaries}
              onChange={(e) => setShowAdminBoundaries(e.target.checked)}
            />
            </div>
            
            {/* options */}
            <div 
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showAdminBoundaries ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-2 w-[60%] pb-3 flex items-center justify-start">
                <div className={`${showAdminColors ? 'optionBtnActive' : 'optionBtn'}`}
                  onClick={() => setShowAdminColors(!showAdminColors)}
                >
                  Colors
                </div>
                <div className={`${showAdminLabels ? 'optionBtnActive' : 'optionBtn'}`}
                  onClick={() => setShowAdminLabels(!showAdminLabels)}
                >
                  Lables
                </div>
              </div>
            </div>

        </div>

        {/* Local Gov ----------------------------------------------- */}

        <div className="space-y-1 border-b border-gray-200">
            <div className="text-md text-gray-600 flex items-center justify-between w-full py-1 pl-2 pr-6">
            Local Government
            <input 
              type="checkbox"
              checked={showLGBoundaries}
              onChange={(e) => setShowLGBoundaries(e.target.checked)}
            />
            </div>
            
            {/* options */}
            <div 
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showLGBoundaries ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-2 w-[60%] pb-3 flex items-center justify-start">
                <div className="optionBtn">
                  Colors
                </div>
                <div className="optionBtn">
                  Lables
                </div>
              </div>
            </div>

        </div>

        {/* Colombo city -------------------------------------------------- */}

        <div className="space-y-1 border-b border-gray-200">
          <div className="text-md text-gray-600 flex items-center justify-between w-full py-1 pl-2 pr-6">
          Colombo City
          <input 
            type="checkbox"
            checked={showColomboCity}
            onChange={(e) => setShowColomboCity(e.target.checked)}
          />
          </div>

            {/* options */}
            <div 
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showColomboCity ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-2 w-[60%] pb-3 flex items-center justify-start">
                <div className={`${showColomboColors ? 'optionBtnActive' : 'optionBtn'}`}
                  onClick={() => setShowColomboColors(!showColomboColors)}
                >
                  Colors
                </div>
                <div className={`${showColomboLabels ? 'optionBtnActive' : 'optionBtn'}`}
                  onClick={() => setShowColomboLabels(!showColomboLabels)}
                >
                  Lables
                </div>
              </div>
            </div>
        </div>


        {/* Bus routes -------------------------------------------------- */}
        <div className="space-y-1 border-b border-gray-200">
          <div className="text-md text-gray-600 flex items-center justify-between w-full py-1 pl-2 pr-6">
          Bus Routes
          <input 
            type="checkbox"
          />
          </div>
        </div>
    </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500 text-center">
            © 2026 Cmaps
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
