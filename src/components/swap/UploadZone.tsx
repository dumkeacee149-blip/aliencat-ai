'use client'

import { useCallback, useRef, useState } from 'react'
import { useSwapStore } from '@/stores/swap-store'

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
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
        group relative flex h-72 w-full cursor-pointer flex-col items-center justify-center
        rounded-xl border transition-all duration-300
        ${isDragging
          ? 'border-[#39FF14]/30 bg-[#39FF14]/[0.03] scale-[1.01]'
          : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.03]'
        }
        ${isProcessing ? 'pointer-events-none opacity-50' : ''}
      `}
    >
      {/* Scan line on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute left-0 right-0 h-px animate-scan bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
      </div>

      {/* Corner markers */}
      <div className="absolute top-3 left-3 h-4 w-4 border-l border-t border-white/[0.08] rounded-tl transition-colors group-hover:border-[#39FF14]/20" />
      <div className="absolute top-3 right-3 h-4 w-4 border-r border-t border-white/[0.08] rounded-tr transition-colors group-hover:border-[#39FF14]/20" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-l border-b border-white/[0.08] rounded-bl transition-colors group-hover:border-[#39FF14]/20" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-r border-b border-white/[0.08] rounded-br transition-colors group-hover:border-[#39FF14]/20" />

      {/* Upload icon */}
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
        isDragging
          ? 'bg-[#39FF14]/10 text-[#39FF14]/60'
          : 'bg-white/[0.03] text-white/25 group-hover:bg-white/[0.05] group-hover:text-white/40'
      }`}>
        {isDragging ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        )}
      </div>

      <p className="mb-1 text-sm font-medium text-white/50">
        {isDragging ? 'Release to scan' : 'Drop your selfie here'}
      </p>
      <p className="text-[12px] text-white/20">
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
