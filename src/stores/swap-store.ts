import { create } from 'zustand'
import type { SwapResult } from '@/types'

type SwapStatus = 'idle' | 'uploading' | 'analyzing' | 'generating' | 'done' | 'error'

interface SwapState {
  readonly status: SwapStatus
  readonly progress: number
  readonly statusText: string
  readonly result: SwapResult | null
  readonly error: string | null
  readonly previewUrl: string | null
}

interface SwapActions {
  readonly setPreview: (url: string | null) => void
  readonly startSwap: (imageBase64: string) => Promise<void>
  readonly reset: () => void
}

type SwapStore = SwapState & SwapActions

const INITIAL_STATE: SwapState = {
  status: 'idle',
  progress: 0,
  statusText: '',
  result: null,
  error: null,
  previewUrl: null,
}

const STATUS_MESSAGES: Record<SwapStatus, string> = {
  idle: '',
  uploading: 'Uploading your face...',
  analyzing: 'Scanning facial geometry... cross-referencing Galactic Species Database...',
  generating: 'Reconstructing your alien form...',
  done: 'Species identified.',
  error: 'Something went wrong.',
}

export const useSwapStore = create<SwapStore>((set) => ({
  ...INITIAL_STATE,

  setPreview: (url) => set({ previewUrl: url }),

  startSwap: async (imageBase64: string) => {
    set({
      status: 'uploading',
      progress: 10,
      statusText: STATUS_MESSAGES.uploading,
      error: null,
      result: null,
    })

    // Simulate progress through stages
    const progressInterval = setInterval(() => {
      set((state) => {
        if (state.status === 'uploading' && state.progress < 25) {
          return { progress: state.progress + 2 }
        }
        if (state.status === 'analyzing' && state.progress < 60) {
          return { progress: state.progress + 1 }
        }
        if (state.status === 'generating' && state.progress < 90) {
          return { progress: state.progress + 0.5 }
        }
        return {}
      })
    }, 500)

    try {
      set({
        status: 'analyzing',
        progress: 25,
        statusText: STATUS_MESSAGES.analyzing,
      })

      const response = await fetch('/api/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      })

      set({
        status: 'generating',
        progress: 60,
        statusText: STATUS_MESSAGES.generating,
      })

      const data = await response.json()

      clearInterval(progressInterval)

      if (!data.success) {
        set({
          status: 'error',
          progress: 0,
          statusText: STATUS_MESSAGES.error,
          error: data.error ?? 'Unknown error',
        })
        return
      }

      set({
        status: 'done',
        progress: 100,
        statusText: STATUS_MESSAGES.done,
        result: data.data,
      })
    } catch (error: unknown) {
      clearInterval(progressInterval)
      const message = error instanceof Error ? error.message : 'Network error'
      set({
        status: 'error',
        progress: 0,
        statusText: STATUS_MESSAGES.error,
        error: message,
      })
    }
  },

  reset: () => set(INITIAL_STATE),
}))
