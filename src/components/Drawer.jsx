import { useState } from 'react'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="space-y-1 border-b border-gray-200 pb-4">
            <li>
            <a
                className="flex items-center gap-4 px-1 py-1 text-gray-700 rounded-lg group"
            >
                <span className="text-md flex items-center justify-between w-full">
                Admin Boundaries
                <input type="checkbox" className="ml-2" />
                </span>
                <span className="text-base font-medium"></span>
            </a>
            </li>
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
