import axios from 'axios'

export const baseURLAPI = 'http://127.0.0.1:8000/'

const api = axios.create({
  baseURL: baseURLAPI
})

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('Success', response)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('Error', error)
  if (error.response) console.log('Response error', error.response)
  return Promise.reject(error)
})

export default api
