import { HTTP } from '@/api'
import type { Job } from '@/api/jobs/types.ts'

export const getJobs = async () => {
  return await HTTP.get<Job[]>('/jobs.json')
}
