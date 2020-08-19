const permissionTypes = {
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
  #currentType = {}
  #defaultType = {
    posts: {}
  }

  constructor (permissionKey, permissionTypes) {
    this.#currentType = permissionTypes[permissionKey] || this.#defaultType
  }

  get current () {
    return this.#currentType
  }
}

export default class PermissionFactory {
  constructor (type) {
    const permissionType = {
      writer: 'write',
      reader: 'read',
      free: 'free'
    }
    const permissionKey = permissionType[type] || permissionType.free
    return new Permission(permissionKey, permissionTypes)
  }
}
