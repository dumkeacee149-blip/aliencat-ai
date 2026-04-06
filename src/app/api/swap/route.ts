import { NextRequest, NextResponse } from 'next/server'
import { analyzeface, generateAlienPortrait } from '@/lib/bailian'
import type { ApiResponse, SwapResult } from '@/types'

export const maxDuration = 120

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SwapResult>>> {
  try {
    const body = await request.json()
    const { imageBase64 } = body

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    // Validate base64 size (max 10MB)
    const sizeInBytes = (imageBase64.length * 3) / 4
    if (sizeInBytes > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image too large. Max 10MB.' },
        { status: 400 }
      )
    }

    // Step 1: Analyze face and determine species
    const analysis = await analyzeface(imageBase64)

    // Step 2: Generate alien portrait
    const alienImageUrl = await generateAlienPortrait(analysis.alienPrompt)

    const result: SwapResult = {
      id: crypto.randomUUID(),
      species: analysis.species,
      matchPercent: analysis.matchPercent,
      originalUrl: `data:image/jpeg;base64,${imageBase64}`,
      alienUrl: alienImageUrl,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
