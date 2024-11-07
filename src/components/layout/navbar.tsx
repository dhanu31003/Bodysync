// src/components/layout/navbar.tsx
import Link from 'next/link'
import { Button } from '../ui/button'

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">VirtualTryOn</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/try-on">
              <Button variant="ghost">Try On</Button>
            </Link>
            <Link href="/wardrobe">
              <Button variant="ghost">Wardrobe</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}