class MyStorage {
  constructor() {

  }
  /**
   *
   * @param key 缓存键
   * @param value 缓存值
   * @param expire 过期时间,单位秒
   */
  setSession(key: string, value: any, expire?: number) {
    if(expire) {
      sessionStorage.setItem(key, JSON.stringify({
        value,
        expireTime: +new Date() + expire * 1000
      }))
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }
  /**
   *
   * @param key 缓存键
   * @param initValue 缓存值不存在时的备用值
   * @returns
   */
  getSession(key: string, initValue?: any) {
    let value = sessionStorage.getItem(key);
    if(value) {
      const parseValue = JSON.parse(value);
      if(typeof parseValue === 'object' && 'expireTime' in parseValue) {
        if(+new Date() > parseValue.expireTime) {
          value = undefined;
          this.clearSession(key);
        } else {
          value = parseValue.value;
        }
      } else {
        value = parseValue;
      }
    }
    return value !== undefined && value !== null ? value : initValue;
  }
  /**
   *
   * @param key 缓存键
   */
  clearSession(key?: string) {
    if(key) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  }
  /**
   *
   * @param key 缓存键
   * @param value 缓存值
   * @param expire 过期时间,单位秒
   */
  setLocal(key: string, value: any, expire?: number) {
    if(expire) {
      localStorage.setItem(key, JSON.stringify({
        value,
        expireTime: +new Date() + expire * 1000
      }))
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  /**
   *
   * @param key 缓存键
   * @param initValue 缓存值不存在时的备用值
   * @returns
   */
  getLocal(key: string, initValue?: any) {
    let value = localStorage.getItem(key);
    if(value) {
      const parseValue = JSON.parse(value);
      if(typeof parseValue === 'object' && 'expireTime' in parseValue) {
        if(+new Date() > parseValue.expireTime) {
          value = undefined;
          this.clearSession(key);
        } else {
          value = parseValue.value;
        }
      } else {
        value = parseValue;
      }
    }
    return value !== undefined && value !== null ? value : initValue;
  }
  /**
   *
   * @param key 缓存键
   */
  clearLocal(key?: string) {
    if(key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  }
}

export default new MyStorage();
