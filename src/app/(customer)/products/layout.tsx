import React from 'react'
import Navbar from '@/components/navigation/Navbar' 
import SearchBar from '@/components/navigation/SearchBar' 

const ProductsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden">
      <main className="flex-1 bg-background-secondary overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default ProductsLayout