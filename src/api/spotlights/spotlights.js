import { HTTP } from '..'

export const getSpotlights = async () => {
  return await HTTP.get('/spotlights.json')
}
