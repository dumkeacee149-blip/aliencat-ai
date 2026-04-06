export type AlienSpecies = 'grey' | 'reptilian' | 'nordic' | 'insectoid' | 'shadow' | 'feline'

export interface SpeciesInfo {
  readonly id: AlienSpecies
  readonly name: string
  readonly description: string
  readonly traits: readonly string[]
  readonly color: string
  readonly emoji: string
}

export interface SwapResult {
  readonly id: string
  readonly species: AlienSpecies
  readonly matchPercent: number
  readonly originalUrl: string
  readonly alienUrl: string
  readonly createdAt: string
}

export interface SwapRequest {
  readonly imageBase64: string
}

export interface ApiResponse<T> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
}

export interface BailianTaskResponse {
  readonly request_id: string
  readonly output: {
    readonly task_id: string
    readonly task_status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED'
    readonly results?: readonly { readonly url: string }[]
  }
}
