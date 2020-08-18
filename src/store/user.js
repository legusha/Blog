import PermissionFactory from '@/permission'
import api from '@/api'

const defaultUser = {
  id: 0,
  login: '',
  password: '',
  role: 'free',
  permission: new PermissionFactory('free')
}

export default {
  state: {
    currentPassword: '',
    user: defaultUser
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    updateUser (state, user) {
      state.user = {
        ...user,
        permission: new PermissionFactory(user.role)
      }
    },
    setCurrentPassword (state, password) {
      state.currentPassword = password
    }
  },
  actions: {
    async getUser ({ state, commit }, login) {
      try {
        const data = await api('get', { pointName: 'user', args: [login] })
        const user = data[0]
        const isCorrectPassword = state.currentPassword === user?.password

        if (user && isCorrectPassword) {
          commit('updateUser', user)
          return state.user
        }
        return null
      } catch (e) {
        console.error(e)
      }
    }
  }
}
