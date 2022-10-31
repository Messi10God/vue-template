type AnyObject = { [key: string]: any };

/** 清空对象内属性的值 */
export function clearObj(obj: AnyObject) {
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    if (typeof obj[key] === 'object') {
      clearObj(obj[key]);
    } else {
      obj[key] = undefined;
    }
  }
}

/** 对比两个对象是否相等 */
export function isObjEqual(obj1: AnyObject, obj2: AnyObject) {
  if (obj1 === obj2) {
    return true;
  } else {
    const keys1 = Object.getOwnPropertyNames(obj1);
    const keys2 = Object.getOwnPropertyNames(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
}

/** 数字转成千分制 */
export function formatNumber(num: string | number) {
  return num.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,');
}

/** 通过key获取缓存中的值，主要用来处理值应为对象的缓存 */
export function getValueByStorageKey(key: string, type = 'session') {
  if (!key) return '';
  const storage = type === 'session' ? sessionStorage : localStorage;
  const value = storage.getItem(key);
  if (value) {
    if (typeof JSON.parse(value) === 'object') {
      return JSON.parse(value);
    } else {
      return {};
    }
  } else {
    return '';
  }
}
