import type { AlienSpecies, SpeciesInfo } from '@/types'

export const SPECIES_DATA: Record<AlienSpecies, SpeciesInfo> = {
  grey: {
    id: 'grey',
    name: 'Grey',
    description: 'Classic alien. Runs the simulation. Probably your boss.',
    traits: ['telepathic', 'analytical', 'nocturnal', 'stoic'],
    color: '#8B9DC3',
    emoji: '',
  },
  reptilian: {
    id: 'reptilian',
    name: 'Reptilian',
    description: 'Cold-blooded CEO energy. Built different (literally).',
    traits: ['strategic', 'territorial', 'patient', 'ruthless'],
    color: '#2ECC71',
    emoji: '',
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic',
    description: 'Suspiciously attractive. Main character in every timeline.',
    traits: ['charismatic', 'luminous', 'empathic', 'tall'],
    color: '#F1C40F',
    emoji: '',
  },
  insectoid: {
    id: 'insectoid',
    name: 'Insectoid',
    description: 'Hive mind activated. Ultimate productivity unlocked.',
    traits: ['collective', 'efficient', 'precise', 'tireless'],
    color: '#9B59B6',
    emoji: '',
  },
  shadow: {
    id: 'shadow',
    name: 'Shadow',
    description: 'We don\'t talk about Shadow. They prefer it that way.',
    traits: ['mysterious', 'dimensional', 'silent', 'ancient'],
    color: '#2C3E50',
    emoji: '',
  },
  feline: {
    id: 'feline',
    name: 'Feline',
    description: 'Yes, cat aliens exist. They\'ve been watching you sleep.',
    traits: ['independent', 'curious', 'agile', 'judgmental'],
    color: '#39FF14',
    emoji: '',
  },
} as const

export const SPECIES_LIST = Object.values(SPECIES_DATA)

export function getSpeciesById(id: AlienSpecies): SpeciesInfo {
  return SPECIES_DATA[id]
}
