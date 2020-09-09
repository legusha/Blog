const permissionTypes = {
  dev: {
    posts: {
      create: true,
      edit: true,
      destroy: true,
      like: true
    }
  },
  write: {
    posts: {
      create: true,
      edit: true,
      destroy: true
    }
  },
  read: {
    posts: {
      like: true
    }
  },
  free: {
    posts: {}
  }
}

class Permission {
  #currentAccess = ''
  #currentType = {}
  #defaultAccess = 'free'
  #defaultType = {
    posts: {}
  }

  constructor (permissionAccess = this.#defaultAccess, permissionTypes) {
    this.#currentAccess = permissionAccess
    this.#currentType = permissionTypes[permissionAccess] || this.#defaultType
  }

  get current () {
    return this.#currentType
  }

  get currentAccess () {
    return this.#currentAccess
  }
}

export default class PermissionFactory {
  constructor (type) {
    const permissionType = {
      dev: 'dev',
      writer: 'write',
      reader: 'read',
      free: 'free'
    }
    const permissionKey = permissionType[type] || permissionType.free
    return new Permission(permissionKey, permissionTypes)
  }
}
