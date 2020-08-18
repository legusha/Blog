const config = {
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

// Endpoints must be in the type of functions
const endPoints = {
  user: email => `users?login=${email}`
}

export { config, endPoints }
