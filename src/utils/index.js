const isDev = process.env.NODE_ENV === 'development'

// getTime must be call getTime()()
const getTime = () => new Date().getTime.bind(new Date())

function logger (display) {
  if (display) {
    return (description, log) => log.call(null, description)
  }
  return () => {}
}

const log = {
  run: logger(isDev),
  description: {
    error: x => `${x} is not defined`,
    request: (url, method) => `\nmethod: ${method.toUpperCase()}\nurl: ${url}`,
    data: d => d
  }
}

export {
  getTime,
  log
}
