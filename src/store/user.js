import PermissionFactory from '@/permission'

const permissionW = new PermissionFactory('writer')
const permissionR = new PermissionFactory('reader')
console.log(permissionW.current, permissionR.permission)

export default {
  state: {
  },
  mutations: {
  },
  actions: {
  }
}
