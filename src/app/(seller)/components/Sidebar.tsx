"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Box, CreditCard, ShoppingCart, Settings } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/overview', icon: Home },
    { name: 'Products', href: '/products', icon: Box },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-76 pl-14 min-h-screen bg-white relative z-[10] border-r border-border-primary">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-danger-secondary text-danger-primary'
                  : 'text-text-secondary hover:bg-background-secondary'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar 