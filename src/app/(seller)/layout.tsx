import React from 'react'
import Navbar from '@/components/Navbar' 
import SearchBar from '@/components/SearchBar' 
import Sidebar from '@/components/Sidebar' 

const SellerLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
        <SearchBar />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-background-secondary px-4 py-4 pr-36 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default SellerLayout 