// 公共的远程获取数据的代码，用于组件的混合

/**
 * @param {String} getDataFunctionName - 可以得到数据的异步函数的名字
 * @param {*} defaultData - 数据未获取时的默认值
 * @param {String} remoteDataName - 数据的属性名
 * @param {Array} functionArgsList - 函数的传参列表
 * @param {String} loadingTagName - 表示加载状态的属性名
 */
export default function (getDataFunctionName, defaultData = null, remoteDataName = "data", functionArgsList = [], loadingTagName = "isLoading") {
  return {
    data() {
      return {
        [remoteDataName]: defaultData,
        [loadingTagName]: true,
      }
    },
    async created() {
      this[remoteDataName] = await this[getDataFunctionName](...functionArgsList);
      this[loadingTagName] = false;
    }
  }
}