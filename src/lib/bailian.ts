import type { AlienSpecies } from '@/types'

const API_KEY = process.env.DASHSCOPE_API_KEY
const BASE_URL = 'https://dashscope.aliyuncs.com/api/v1'

function getApiKey(): string {
  if (!API_KEY) {
    throw new Error('DASHSCOPE_API_KEY not configured')
  }
  return API_KEY
}

interface VLMessage {
  readonly role: 'system' | 'user' | 'assistant'
  readonly content: readonly { readonly type: string; readonly text?: string; readonly image?: string }[]
}

interface ImageTaskInput {
  readonly prompt: string
  readonly ref_img?: string
  readonly ref_strength?: number
}

// Step 1: Analyze face with qwen-vl to determine alien species
export async function analyzeface(imageBase64: string): Promise<{
  species: AlienSpecies
  matchPercent: number
  description: string
  alienPrompt: string
}> {
  const messages: readonly VLMessage[] = [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: `You are an alien species classifier. Analyze the human face and determine which alien species they most closely match. Choose from: grey, reptilian, nordic, insectoid, shadow, feline.

Respond in this exact JSON format:
{
  "species": "grey",
  "matchPercent": 94.7,
  "description": "Strong cranial structure suggests Grey lineage. Analytical gaze pattern detected.",
  "alienPrompt": "A portrait of a Grey alien with large dark almond-shaped eyes, smooth grey-green skin, elongated skull, wearing the same expression as the original photo, the same clothing, sci-fi lighting with green ambient glow, photorealistic, cinematic portrait"
}

Make the alienPrompt describe a detailed alien portrait that preserves the person's expression, pose, and clothing but transforms their features into the matched alien species. Make it vivid and cinematic.`
        }
      ]
    },
    {
      role: 'user',
      content: [
        { type: 'image', image: `data:image/jpeg;base64,${imageBase64}` },
        { type: 'text', text: 'Analyze this face and classify the alien species. Return JSON only.' }
      ]
    }
  ]

  const response = await fetch(`${BASE_URL}/services/aigc/multimodal-generation/generation`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-vl-max',
      input: { messages },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Face analysis failed: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.output?.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('No response from vision model')
  }

  // Extract text content — handle multiple response formats
  let textContent = ''
  if (typeof content === 'string') {
    textContent = content
  } else if (Array.isArray(content)) {
    // Could be [{ type: 'text', text: '...' }] or [{ text: '...' }]
    for (const item of content) {
      if (typeof item === 'string') {
        textContent += item
      } else if (item?.text) {
        textContent += item.text
      }
    }
  }

  if (!textContent) {
    throw new Error(`No text in VL response. Raw content: ${JSON.stringify(content).slice(0, 200)}`)
  }

  // Parse JSON from response (handle markdown code blocks, extra text)
  const jsonMatch = textContent.match(/\{[\s\S]*?\}/)
  if (!jsonMatch) {
    throw new Error(`Failed to parse species classification. Response: ${textContent.slice(0, 300)}`)
  }

  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    throw new Error(`Invalid JSON in VL response: ${jsonMatch[0].slice(0, 200)}`)
  }
}

// Step 2: Generate alien portrait using wanx text-to-image
export async function generateAlienPortrait(prompt: string): Promise<string> {
  // Create async task
  const createResponse = await fetch(`${BASE_URL}/services/aigc/text2image/image-synthesis`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
    },
    body: JSON.stringify({
      model: 'wanx-v1',
      input: {
        prompt,
      },
      parameters: {
        n: 1,
        size: '1024*1024',
        style: '<photography>',
      },
    }),
  })

  if (!createResponse.ok) {
    const errorText = await createResponse.text()
    throw new Error(`Image generation failed: ${createResponse.status} - ${errorText}`)
  }

  const createData = await createResponse.json()
  const taskId = createData.output?.task_id

  if (!taskId) {
    throw new Error('No task ID returned from image generation')
  }

  // Poll for result
  return pollTask(taskId)
}

// Step 3: Style transfer - repaint portrait as alien
export async function styleTransfer(
  originalImageUrl: string,
  stylePrompt: string
): Promise<string> {
  const createResponse = await fetch(`${BASE_URL}/services/aigc/image-generation/generation`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
    },
    body: JSON.stringify({
      model: 'wanx-style-repaint-v1',
      input: {
        image_url: originalImageUrl,
        style_index: -1,
        prompt: stylePrompt,
      },
    }),
  })

  if (!createResponse.ok) {
    const errorText = await createResponse.text()
    throw new Error(`Style transfer failed: ${createResponse.status} - ${errorText}`)
  }

  const createData = await createResponse.json()
  const taskId = createData.output?.task_id

  if (!taskId) {
    throw new Error('No task ID returned from style transfer')
  }

  return pollTask(taskId)
}

// Poll task until completion
async function pollTask(taskId: string, maxAttempts = 60): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000)

    const statusResponse = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${getApiKey()}`,
      },
    })

    if (!statusResponse.ok) {
      throw new Error(`Task polling failed: ${statusResponse.status}`)
    }

    const statusData = await statusResponse.json()
    const status = statusData.output?.task_status

    if (status === 'SUCCEEDED') {
      const resultUrl =
        statusData.output?.results?.[0]?.url ??
        statusData.output?.result_url ??
        statusData.output?.results?.[0]?.b64_image

      if (!resultUrl) {
        throw new Error('Task succeeded but no result URL found')
      }
      return resultUrl
    }

    if (status === 'FAILED') {
      throw new Error(`Task failed: ${statusData.output?.message ?? 'Unknown error'}`)
    }
  }

  throw new Error('Task timed out')
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
