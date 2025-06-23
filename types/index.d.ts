import "./tt.d.ts";
declare const ttapidtstips: null;

/**将tt声明为全局变量 */
declare const tt: DouyinMinigame.TT;

//扩展window对象
interface Window {
  /**将tt声明为Window变量 */
  tt: DouyinMinigame.TT;
}

declare global {
  const tt: DouyinMinigame.TT;
}
