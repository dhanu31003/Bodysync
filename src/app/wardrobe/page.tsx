// src/app/wardrobe/page.tsx
'use client'

import { useState } from 'react'
import { Shirt, CircuitBoard as Pants, Watch, ShoppingBag, X, Search } from 'lucide-react'
import Image from 'next/image'

// Types
interface ClothingItem {
  id: number
  name: string
  category: string
  image: string
  description: string
}

interface Category {
  id: string
  name: string
  icon: React.ReactNode
}

export default function Wardrobe() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Categories
  const categories: Category[] = [
    { id: 'all', name: 'All Items', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'shirts', name: 'Shirts', icon: <Shirt className="w-5 h-5" /> },
    { id: 'pants', name: 'Pants', icon: <Pants className="w-5 h-5" /> },
    { id: 'accessories', name: 'Accessories', icon: <Watch className="w-5 h-5" /> },
  ]

  // Sample clothing items
  const clothingItems: ClothingItem[] = [
    {
      id: 1,
      name: 'Floral Print Blouse',
      category: 'shirts',
      image: '/images/floral.jpg',  // Changed path
      description: 'A beautiful floral print blouse perfect for any occasion.'
    },
    {
      id: 2,
      name: 'Classic White Shirt',
      category: 'shirts',
      image: '/images/whiteshirt.jpg',  // Changed path
      description: 'A timeless white shirt that goes with everything. Made from premium cotton.'
    },
    {
      id: 3,
      name: 'Black Slim Pants',
      category: 'pants',
      image: '/images/blackpants.jpg',  // Changed path
      description: 'Sleek black pants with a modern slim fit. Perfect for both casual and formal occasions.'
    },
    {
      id: 4,
      name: 'Leather Watch',
      category: 'accessories',
      image: '/images/leatherwatch.jpg',  // Changed path
      description: 'Classic leather watch with golden details. Water-resistant up to 30m.'
    }
  ]

  // Filter items based on category and search query
  const filteredItems = clothingItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Digital Wardrobe</h1>
        <p className="mt-2 text-gray-600">Browse and try on our collection virtually</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mb-8">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredItems.map((item) => (
    <div
      key={item.id}
      className="group cursor-pointer"
      onClick={() => setSelectedItem(item)}
    >
      {/* Replace this div and img with the new Image component */}
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
      </div>
    </div>
  ))}
</div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                  
                  <button
                    onClick={() => {
                        const itemData = encodeURIComponent(JSON.stringify({
                          id: selectedItem.id,
                          image: selectedItem.image,
                          name: selectedItem.name
                        }));
                        window.location.href = `/try-on?item=${itemData}`;
                      }}
                      className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Try On Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}