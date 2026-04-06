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
          text: `You are an alien species classifier from a sci-fi universe. Analyze the human face and classify which EXTRATERRESTRIAL alien species they match. Choose from: grey, reptilian, nordic, insectoid, shadow, feline.

ALL species are ALIENS FROM OUTER SPACE — not Earth animals, not humans. Every result must look like a creature from another planet.

Species alienPrompt templates (copy the template for the matched species, fill in clothing):
- grey: "a humanoid Grey alien from outer space, extremely oversized smooth bald cranium twice the size of a human head, enormous solid pitch-black eyes with no whites taking up most of the face, grey-green rubbery skin with no pores, two tiny nostril holes where nose should be, thin lipless slit mouth, no ears visible, elongated fingers, [CLOTHING], inside a dark alien spacecraft with green holographic displays, dramatic rim lighting, science fiction concept art, ultra detailed"
- reptilian: "a humanoid Reptilian alien from outer space, entire face and head covered in thick green-brown scales like a lizard, bright yellow eyes with vertical slit reptile pupils, prominent bony ridges above eyes, no hair anywhere, forked tongue slightly visible, rows of small sharp teeth, [CLOTHING], alien temple with ancient stone carvings background, moody orange lighting, science fiction concept art, ultra detailed"
- nordic: "a tall Nordic alien from outer space, unnaturally perfect symmetrical face, skin has subtle bioluminescent blue-white glow from within, eyes are entirely white with no iris or pupil, long straight platinum-white hair, elongated pointed ears like an elf, faint glowing veins visible under translucent skin, [CLOTHING], crystal alien palace with aurora borealis background, ethereal blue lighting, science fiction concept art, ultra detailed"
- insectoid: "a humanoid Insectoid alien from outer space, large bulging compound eyes made of hundreds of hexagonal facets reflecting green light, no nose at all, mouth replaced by segmented insect mandibles, two long segmented antennae growing from forehead, face covered in hard brown-green chitinous exoskeleton plates, [CLOTHING], organic alien hive interior with bioluminescent walls, science fiction concept art, ultra detailed"
- shadow: "a mysterious Shadow alien entity from another dimension, face and body made of swirling dark smoke and void energy, features barely visible through black mist, two piercing glowing purple-white eyes floating in darkness with no face structure around them, edges of body dissolve into dark particles and smoke, [CLOTHING partially visible through smoke], dark void dimension with distant purple nebula, science fiction concept art, ultra detailed"
- feline: "a humanoid Feline alien from outer space, face structure is a hybrid of human and alien cat with green-tinted alien skin, large glowing neon-green cat eyes with vertical slit pupils, subtle scale-like skin texture mixed with very short fine fur, small flat alien nose with two slits, pointed alien ears on top of head, thin whisker-like sensory tendrils, sharp small fangs visible, [CLOTHING], alien jungle planet with two moons in sky, green bioluminescent plants, science fiction concept art, ultra detailed"

Respond in this exact JSON format:
{
  "species": "grey",
  "matchPercent": 94.7,
  "description": "Strong cranial structure suggests Grey lineage. Analytical gaze pattern detected.",
  "alienPrompt": "[paste the matching species template above, replace [CLOTHING] with what the person is wearing]"
}

CRITICAL RULES:
- Copy the EXACT template for the matched species — do NOT simplify or shorten it
- Only replace [CLOTHING] with the actual clothing from the photo
- The result MUST look like an ALIEN FROM OUTER SPACE, never a human, never an Earth animal
- NEVER generate a normal cat, a normal lizard, or any Earth creature — these are ALIEN species`
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

// Step 2: Generate alien portrait via text-to-image with strong alien prompt
export async function generateAlienPortrait(
  prompt: string,
  _originalBase64?: string
): Promise<string> {
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
        style: '<auto>',
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
