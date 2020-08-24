import axios from 'axios'
import { config, endPoints } from './config'
import { log } from '@/utils'

const ApiWrap = function (instance, points, { run, description }) {
  this.api = instance
  this.endPoints = points
  this.isHasMethod = method => typeof this.api[method] === 'function'
  this.isHasPoint = point => typeof this.endPoints[point] === 'function'
  const logDescription = description
  const log = run

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
        const result = await this.api[method](url, dataRequest)
        const { data } = result

        log(logDescription.request(url, method), console.log)
        log(logDescription.data(data), console.dir)

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default new ApiWrap(axios.create(config), endPoints, log)
