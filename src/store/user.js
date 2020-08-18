import PermissionFactory from '@/permission'
import api from '@/api'

const permissionW = new PermissionFactory('writer')
const permissionR = new PermissionFactory('reader')
console.log(permissionW.current, permissionR.permission)
api('get', { pointName: 'user', args: ['writer@mail.com'] })
export default {
  state: {
  },
  mutations: {
  },
  actions: {
  }
}
