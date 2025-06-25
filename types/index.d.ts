import "./tt.d.ts";
declare const ttapidtstips: null;

/**将tt声明为全局变量 */
declare const tt: DouyinMinigame.TT;

//扩展window对象
interface Window {
  /**将tt声明为Window变量 */
  tt: DouyinMinigame.TT;

  ShowResult: DouyinMinigame.onShowObj | undefined;
}

declare global {
  const tt: DouyinMinigame.TT;
  /**
   * 安装插件后，根据抖音的官方对接要求，会自动在game.js插入以下代码
   * ```typescript
   * tt.onShow(res=>window['ShowResult'] = res)
   * ```
   * 后续在侧边栏逻辑中可以直接使用该变量
   */
  const ShowResult: DouyinMinigame.onShowObj | undefined;
}
