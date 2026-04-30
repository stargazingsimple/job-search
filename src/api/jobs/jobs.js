import { HTTP } from '@/api/index.js'

export const getJobs = async () => {
  return await HTTP.get('/jobs.json')
}
