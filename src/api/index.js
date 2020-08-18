import axios from 'axios'
import { config, endPoints } from './config'
import logger from '@/utils/log'

const ApiWrap = function (instance, points, { log, description }) {
  this.api = instance
  this.endPoints = points
  this.isHasMethod = method => typeof this.api[method] === 'function'
  this.isHasPoint = point => typeof this.endPoints[point] === 'function'
  const logDescription = description

  return (method, { pointName, args = [] }, dataRequest = null) => {
    if (!this.isHasMethod(method)) {
      log(logDescription.error(method), console.error)
      return
    }

    if (!this.isHasPoint(pointName)) {
      log(logDescription.error(pointName), console.error)
      return
    }

    return new Promise(async (resolve, reject) => {
      try {
        const url = points[pointName](...args)
        const { data } = await this.api[method](url, dataRequest)

        log(logDescription.request(url, method), console.log)
        log(logDescription.data(data), console.dir)

        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default new ApiWrap(axios.create(config), endPoints, logger)
