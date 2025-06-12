import React from 'react'
import Navbar from '@/components/Navbar' 
import SearchBar from '@/components/SearchBar' 
import Sidebar from '@/components/Sidebar' 

const CustomerLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
        <SearchBar userType="seller" />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-background-secondary pl-5 py-6 pr-14 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default CustomerLayout 