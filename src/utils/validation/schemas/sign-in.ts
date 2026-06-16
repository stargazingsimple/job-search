import { object, string } from 'yup'

const schema = object({
  email: string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter a valid email address')
    .required('Email is required'),
  password: string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

export default schema
