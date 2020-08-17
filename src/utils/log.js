const isDev = process.env.NODE_ENV === 'development'

function logger (display) {
  if (display) {
    return (description, log) => log.call(null, description)
  }
  return () => {}
}

export default {
  log: logger(isDev),
  description: {
    error: x => `${x} is not defined`,
    request: (url, method) => `\nmethod: ${method.toUpperCase()}\nurl: ${url}`,
    data: d => d
  }
}
