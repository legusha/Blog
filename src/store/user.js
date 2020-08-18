import PermissionFactory from '@/permission'
import api from '@/api'

const permissionW = new PermissionFactory('writer')
const permissionR = new PermissionFactory('reader')
console.log(permissionW.current, permissionR.permission)
// api('get', { pointName: 'user', args: ['writer@mail.com'] })
export default {
  state: {
    requestOption: {
      pointName: 'user',
      args: []
    },
    currentPassword: ''
  },
  mutations: {
    setCurrentPassword (state, password) {
      state.currentPassword = password
    }
  },
  actions: {
    getUser ({ store }, login) {
      api('get', { pointName: 'user', args: ['writer@mail.com'] })
    }
  }
}
