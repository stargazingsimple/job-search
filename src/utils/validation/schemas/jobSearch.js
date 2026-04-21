import { object, string } from 'yup'

const schema = object({
  role: string().required('Role is required'),
  location: string().required('Location is required'),
})

export default schema
