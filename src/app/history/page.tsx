// src/app/history/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Clock, Download, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface TryOnResult {
  id: string
  date: string
  originalImage: string
  resultImage: string
  clothingItem: {
    name: string
    price: string
    image: string
  }
}

export default function History() {
  const [mounted, setMounted] = useState(false)
  const [results, setResults] = useState<TryOnResult[]>([
    {
      id: '1',
      date: '2024-11-08',
      originalImage: '/images/placeholder-user.jpg',
      resultImage: '/images/placeholder-result.jpg',
      clothingItem: {
        name: 'Floral Print Blouse',
        price: '$49.99',
        image: '/images/floral.jpg'
      }
    }
  ])

  // Use useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const deleteResult = (id: string) => {
    setResults(results.filter(result => result.id !== id))
  }

  // Don't render anything until after mounting to prevent hydration errors
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Try-On History</h1>
        <p className="mt-2 text-gray-600">View and manage your previous virtual try-ons</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No try-on history yet</h3>
          <p className="mt-2 text-gray-600">Your virtual try-on results will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={result.resultImage}
                  alt="Try-on result"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{result.clothingItem.name}</h3>
                    <p className="text-sm text-gray-500">
                      {/* Use a stable string representation of the date */}
                      Tried on {result.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      title="Download result"
                      onClick={() => {
                        // Download logic here
                        console.log('Download', result.id)
                      }}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteResult(result.id)}
                      className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete result"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1 aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={result.originalImage}
                      alt="Original photo"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                      Original
                    </span>
                  </div>
                  <div className="flex-1 aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={result.clothingItem.image}
                      alt="Clothing item"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                      Item
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}