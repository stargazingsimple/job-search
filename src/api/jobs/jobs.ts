import { HTTP } from '@/api'

export const getJobs = async () => {
  return await HTTP.get('/jobs.json')
}
