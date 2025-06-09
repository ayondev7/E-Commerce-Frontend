import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-6 px-18">
      <div className="container h-full flex items-center justify-between">
        <Link href="/overview" className="text-[32px] font-bold text-text-tertiary">
          Logo
        </Link>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Add Product
          </button>
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
              <span className="sr-only">Open user menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 