import PermissionFactory from '@/permission'
import api from '@/api'

const assess = process.env.VUE_APP_ASSESS

const structUser = {
  id: 0,
  login: '',
  password: '',
  role: 'free',
  permission: new PermissionFactory(assess)
}

export default {
  state: {
    pointName: 'user',
    currentPassword: '',
    auth: structUser.permission.currentAccess === 'dev',
    user: structUser
  },
  getters: {
    user: state => state.user,
    auth: state => state.auth
  },
  mutations: {
    login (state, user) {
      state.auth = true
      state.user = {
        ...user,
        permission: new PermissionFactory(user.role)
      }
    },
    logout (state) {
      state.auth = false
      state.user = structUser
    },
    setCurrentPassword (state, password) {
      state.currentPassword = password
    }
  },
  actions: {
    async getUser ({ state, commit }, login) {
      try {
        const pointName = state.pointName
        const data = await api('get', { pointName, args: [login] })
        const user = data[0]
        const isCorrectPassword = state.currentPassword === user?.password

        if (user && isCorrectPassword) {
          commit('login', user)
          return state.user
        }
        return null
      } catch (e) {
        console.error(e)
        return null
      }
    }
  }
}
