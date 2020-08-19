class Permission {
  #currentPermission = {}
  #typesPermission = {
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

  constructor (permissionKey = 'free') {
    this.#currentPermission = this.#typesPermission[permissionKey] || this.#typesPermission.free
  }

  get current () {
    return this.#currentPermission
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
    return new Permission(permissionKey)
  }
}
