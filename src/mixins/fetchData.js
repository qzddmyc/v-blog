// 公共的远程获取数据的代码，用于组件的混合

/**
 * @param {String} getDataFunctionName - 可以得到数据的异步函数的名字
 * @param {*} defaultData - 数据未获取时的默认值
 * @param {String} remoteDataName - 数据的属性名
 * @param {Array.<string>} pathListForFuncArgs - 一个数组，表示如何取到函数的传参
 *                                             - 格式如 ["a.b", "c", "d.e.f"]
 *                                             - 表示取 this.a.b, this.c, this.d.e.f 作为 getDataFunctionName 函数的参数
 * @param {String} loadingTagName - 表示加载状态的属性名
 */
export default function (getDataFunctionName, defaultData = null, remoteDataName = "data", pathListForFuncArgs = [], loadingTagName = "isLoading") {
  return {
    data() {
      return {
        [remoteDataName]: defaultData,
        [loadingTagName]: true,
      }
    },
    async created() {
      const args = pathListForFuncArgs.map(path => {
        return path.split('.').reduce((obj, prop) => obj?.[prop], this);
      });
      this[remoteDataName] = await this[getDataFunctionName](...args);
      this[loadingTagName] = false;
    }
  }
}