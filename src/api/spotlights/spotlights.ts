import { HTTP } from '..'
import type { Spotlight } from '@/api/spotlights/types.ts'

export const getSpotlights = async () => {
  return await HTTP.get<Spotlight[]>('/spotlights.json')
}
