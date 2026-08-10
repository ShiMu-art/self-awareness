import React, { useRef } from 'react'

interface AvatarPickerProps {
  src: string
  fallback: string
  // now exposes the selected File so the caller can upload it
  onChange: (file: File) => void
}

function AvatarPicker({ src, fallback, onChange }: AvatarPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(file)
  }

  return (
    <div
      className="w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      style={{ borderColor: 'var(--color-brass)', backgroundColor: 'var(--color-walnut)' }}
      onClick={handleClick}
      title="点击更换头像"
    >
      {src ? (
        <img src={src} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl">{fallback}</span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}

export default AvatarPicker
