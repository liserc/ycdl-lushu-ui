// import TextIconOverlay from '@/assets/js/api/TextIconOverlay_min.js'
// import MarkerClusterer from '@/assets/js/api/MarkerClusterer_min.js'

/**
 * @description 加载百度地图相关资源js
 * @param {string} ak
 */
export function loadBMap(ak) {
  return new Promise((resolve, reject) => {
    //聚合API依赖基础库,因此先加载基础库再加载聚合API
    loadBMapBasic(ak)
      .then(() => {
        //调用加载第三方组件js公共方法加载其他资源库
        //加载聚合API
        ///MarkerClusterer_min.js依赖TextIconOverlay.js。因此先加载TextIconOverlay.js
        asyncLoadJs('http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js')
        // asyncLoadJs(TextIconOverlay)
          .then(() => {
            asyncLoadJs('http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js')
            // asyncLoadJs(MarkerClusterer)
              .then(() => {
                resolve()
                return true
              })
              .catch(err => {
                reject(err)
              })
          })
          .catch(err => {
            reject(err)
          })
      })
      .catch(err => {
        reject(err)
      })
  })

  /**
   * @description 加载百度地图基础组件js
   * @param {string} ak
   */
  function loadBMapBasic(ak) {
    return new Promise((resolve, reject) => {
      if (typeof BMap !== 'undefined') {
        resolve(BMap)
        return true
      }
      window.onBMapCallback = function() {
        resolve(BMap)
      }
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  /**
   * @description 加载第三方组件js公共方法
   * @param {string} url
   */
  function asyncLoadJs(url) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      document.head.appendChild(script)
      script.onload = () => {
        resolve()
      }
      script.onerror = reject
    })
  }
}
