// src/app/try-on/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Upload, Camera, X } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

interface ItemData {
  id: number
  image: string
  name: string
}

export default function TryOn() {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [clothingImage, setClothingImage] = useState<string | null>(null)
  const [clothingName, setClothingName] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isDraggingUser, setIsDraggingUser] = useState(false)
  const [isDraggingClothing, setIsDraggingClothing] = useState(false)
  
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get item data from URL parameters
    const itemParam = searchParams.get('item')
    if (itemParam) {
      try {
        const itemData: ItemData = JSON.parse(decodeURIComponent(itemParam))
        setClothingImage(itemData.image)
        setClothingName(itemData.name)
      } catch (error) {
        console.error('Error parsing item data:', error)
      }
    }
  }, [searchParams])

  const handleImageUpload = (file: File, type: 'user' | 'clothing') => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (type === 'user') {
        setUserImage(reader.result as string)
      } else {
        setClothingImage(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent, type: 'user' | 'clothing') => {
    e.preventDefault()
    if (type === 'user') {
      setIsDraggingUser(true)
    } else {
      setIsDraggingClothing(true)
    }
  }

  const handleDragLeave = (type: 'user' | 'clothing') => {
    if (type === 'user') {
      setIsDraggingUser(false)
    } else {
      setIsDraggingClothing(false)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'user' | 'clothing') => {
    e.preventDefault()
    if (type === 'user') {
      setIsDraggingUser(false)
    } else {
      setIsDraggingClothing(false)
    }
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, type)
    }
  }

  const processImages = async () => {
    if (!userImage || !clothingImage) {
      alert('Please upload both a user photo and a clothing item')
      return
    }

    // For now, we'll just show a placeholder message
    setProcessedImage(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Virtual Try-On</h1>
        <p className="mt-2 text-gray-600">Upload your photo and the clothing item you want to try on</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* User Photo Upload Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Photo</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDraggingUser ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => handleDragOver(e, 'user')}
            onDragLeave={() => handleDragLeave('user')}
            onDrop={(e) => handleDrop(e, 'user')}
          >
            {!userImage ? (
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600">Drag and drop your photo or</p>
                <label className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'user')
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={userImage}
                  alt="User preview"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                  onClick={() => setUserImage(null)}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clothing Item Upload Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Clothing Item
            {clothingName && <span className="text-gray-600 text-sm ml-2">({clothingName})</span>}
          </h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDraggingClothing ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => handleDragOver(e, 'clothing')}
            onDragLeave={() => handleDragLeave('clothing')}
            onDrop={(e) => handleDrop(e, 'clothing')}
          >
            {!clothingImage ? (
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600">Drag and drop clothing item or</p>
                <label className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'clothing')
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={clothingImage}
                  alt="Clothing preview"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                  onClick={() => {
                    setClothingImage(null)
                    setClothingName(null)
                  }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Button */}
      <div className="text-center mb-8">
        <button
          onClick={processImages}
          disabled={!userImage || !clothingImage}
          className={`px-8 py-3 rounded-lg text-white font-medium ${
            userImage && clothingImage
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Generate Try-On
        </button>
      </div>

      {/* Result Section */}
      {userImage && clothingImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center text-gray-600">
              <p className="mb-2">AI Processing Feature Coming Soon!</p>
              <p className="text-sm">This feature will allow you to see the clothing item virtually fitted on your photo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}