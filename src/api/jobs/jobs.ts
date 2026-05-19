import { HTTP } from '@/api/index.ts'

export const getJobs = async () => {
  return await HTTP.get('/jobs.json')
}
