'use client'

import { useCallback, useRef, useState } from 'react'
import { useSwapStore } from '@/stores/swap-store'

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip data URL prefix to get raw base64
      const base64 = result.split(',')[1]
      if (!base64) {
        reject(new Error('Failed to read file'))
        return
      }
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function UploadZone() {
  const { status, startSwap, setPreview } = useSwapStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const isProcessing = status !== 'idle' && status !== 'done' && status !== 'error'

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return

    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    const base64 = await fileToBase64(file)
    startSwap(base64)
  }, [setPreview, startSwap])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center
        rounded-2xl border-2 border-dashed transition-all duration-300
        ${isDragging
          ? 'border-[#39FF14] bg-[#39FF14]/10 scale-105'
          : 'border-white/20 bg-white/5 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5'
        }
        ${isProcessing ? 'pointer-events-none opacity-50' : ''}
      `}
    >
      {/* Scan line animation on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute left-0 right-0 h-0.5 animate-scan bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
      </div>

      {/* Icon */}
      <div className="mb-4 text-4xl transition-transform group-hover:scale-110">
        {isDragging ? '🛸' : '👽'}
      </div>

      {/* Text */}
      <p className="mb-1 text-lg font-medium text-white/80">
        {isDragging ? 'Release to scan' : 'Drop your selfie here'}
      </p>
      <p className="text-sm text-white/40">
        or click to upload — your alien form awaits
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
