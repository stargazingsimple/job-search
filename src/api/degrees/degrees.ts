import { HTTP } from '@/api'
import type { Degree } from '@/api/degrees/types.ts'

export const getDegrees = async () => {
  return await HTTP.get<Degree[]>('/degrees.json')
}
