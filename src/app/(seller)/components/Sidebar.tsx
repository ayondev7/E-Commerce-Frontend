"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/overview' },
    { name: 'Products', href: '/products' },
    { name: 'Orders', href: '/orders' },
    { name: 'Customers', href: '/customers' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
  ]

  return (
    <aside className="w-64 min-h-screen bg-white shadow-sm relative z-[10]">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar 