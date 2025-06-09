import React from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'

const SellerLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-screen bg-background-primary">
      <div>
        <Navbar />
        <SearchBar />
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <main className="col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}

export default SellerLayout 