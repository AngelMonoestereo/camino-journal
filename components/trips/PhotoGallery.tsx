'use client'

import { useEffect, useState } from 'react'

type PhotoGalleryProps = {
  storageKey: string
}

export default function PhotoGallery({ storageKey }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setPhotos(JSON.parse(saved))
  }, [storageKey])

  function handleAddPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      const newPhoto = reader.result as string
      const updatedPhotos = [...photos, newPhoto]

      setPhotos(updatedPhotos)
      localStorage.setItem(storageKey, JSON.stringify(updatedPhotos))
    }

    reader.readAsDataURL(file)
  }

  return (
    <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
      <h2 className="text-2xl font-serif mb-3">📸 Fotos del día</h2>

      <input type="file" accept="image/*" onChange={handleAddPhoto} />

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Foto ${index + 1}`}
              className="w-full h-24 object-cover rounded-xl"
            />
          ))}
        </div>
      )}
    </section>
  )
}
