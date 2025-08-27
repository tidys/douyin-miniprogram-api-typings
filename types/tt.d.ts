/**
 * - ## 抖音小游戏API定义接口
 * - 本文档仅录入了常用API作为提示功能使用，不建议作为官网教程文档使用。
 * - 文档内很多方法参数的层级结构提示并不准确，仅为参数的提供解释说明。
 * - 可能存在的错误：参数结构错误，参数是否为必填错误，参数类型错误 等。
 * - 人无完人，码无完码，若本文档存在编写错误请以官方文档为准。
 * - 同时也欢迎到Gitee地址Issues反馈和交流，共同完善文档，构建和谐社区。
 * - Gitee地址：https://gitee.com/showsmile/ttapidts⭐
 * + 如需更多API请翻阅官方文档。
 * + 抖音小游戏API官方文档：点击👉[抖音小游戏API](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/overview)
 */
declare namespace DouyinMinigame {
  /**通用回调接口方法，具体errMsg数据请参考官方对应接口文档 errMsg:回调信息 */
  type errCB = (res: { errMsg: string }) => void;

  /**通用回调接口 */
  type callbackObj = {
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**登陆成功返回的参数 */
  type loginSuccessRes = {
    /**临时登录凭证, 有效期 3 分钟。开发者可以通过在服务器端调用[登录凭证校验接口](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/server/log-in/code-2-session)换取 openid 和 session_key 等信息。 */
    code: string;
    /**用于标识当前设备, 无论登录与否都会返回, 有效期 3 分钟。 */
    anonymousCode: string;
    /**判断在当前 APP（头条、抖音等）是否处于登录状态。 */
    isLogin: boolean;
    /**回调信息 */
    errMsg: string;
  };

  /**登录参数 */
  type loginObj = {
    /**默认值`true` 未登录时, 是否强制调起登录框 */
    force?: boolean;
    /**成功回调 */
    success?: (res: loginSuccessRes) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**跳转参数 */
  type navigateToSceneObj = {
    /**需要确认的入口场景，scene的合法值:sidebar */
    scene: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**跳转参数 */
  type checkSceneObj = {
    /**需要确认的入口场景，scene的合法值:sidebar */
    scene: string;
    /**成功回调 @param res.isExist 为true表示支持 */
    success?: (res: {
      /**入口场景是否存在 */
      isExist: boolean;
      errMsg: string;
    }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**授权结果数据，具体参考[文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/set/auth-setting) */
  type authSettingObj = {
    /**是否授权用户信息 对应接口:tt.getUserInfo */
    "scope.userInfo": boolean;
    /**是否授权地理位置 对应接口:tt.getLocation */
    "scope.userLocation": boolean;
    /**是否授权录音功能 对应接口:tt.getRecorderManager.start */
    "scope.record": boolean;
    /**是否授权保存到相册 对应接口:tt.saveImageToPhotosAlbum tt.saveVideoToPhotosAlbum */
    "scope.album": boolean;
    /**是否授权摄像头 对应接口: tt.scanCode tt.chooseImage tt.chooseVideo */
    "scope.camera": boolean;
    /**是否授权录屏，默认为开。在 onError 里面报错到没有屏权限时，可以尝试主动调用 对应接口:tt.getGameRecorderManager */
    "scope.screenRecord": boolean;
    /**是否授权添加日历事件 对应接口:tt.addPhoneCalendar */
    "scope.calendar": boolean;
  };

  /**获取用户经授权参数 */
  type getSettingObj = {
    /**成功回调 */
    success?: (res: { authSetting: authSettingObj; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取用户信息参数 */
  type getUserInfoSuccessRes = {
    /**用户信息 [参考公告](https://developer.open-douyin.com/forum/mini-game/post/63354a56b1d3de363093289d) */
    userInfo: {
      /**用户头像 */
      avatarUrl: string;
      /**用户昵称 */
      nickName: string;
      /**用户性别，0: 未知；1:男性；2:女性。返回0，参考公告。*/
      gender: number;
      /**用户所在城市。 返回""，参考公告。 */
      city: string;
      /**用户所在省份。 返回""，参考公告。 */
      province: string;
      /**用户所在国家。 返回""，参考公告。 */
      country: string;
      /**用户语言，目前为空。 返回""，参考公告。 */
      language: string;
      /**回调信息 */
      errMsg: string;
    };
    /**userInfo 的 JSON 字符串形式 */
    rawData: string;
    /**用于校验用户信息是否被篡改，请参考[敏感数据处理](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/info/sensitive-data-process) 。仅在 `withCredentials: true` 时返回 */
    signature: string;
    /**
     * - 包括敏感信息（如 openId）在内的已加密用户数据，如需解密数据请参考[敏感数据处理](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/info/sensitive-data-process)。仅在 `withCredentials: true` 时返回
     * - 解密结果请翻阅文档：[tt.getUserInfo](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/user-information/info/tt-get-user-info) 东西太多，懒得写了。
     */
    encryptedData: string;
    /**加密算法参数，仅在 `withCredentials: true` 时返回 */
    iv: string;
    /**实名认证情况，仅在 `withRealNameAuthenticationInfo: true` 时返回 */
    realNameAuthenticationStatus: number;
  };

  /**获取用户信息参数 */
  type getUserInfoObj = {
    /**是否需要返回敏感数据，如果是则在成功回调的参数中额外返回 `encryptedData`，`signature` 和 `iv` 字段 */
    withCredentials?: boolean;
    /**是否需要返回用户实名认证状态，如果是则在成功回调参数中额外返回 `realNameAuthenticationStatus` 字段 */
    withRealNameAuthenticationInfo?: boolean;
    /**成功回调 */
    success?: (res: getUserInfoSuccessRes) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取授权结果参数 value:'ok' */
  type authorizeSuccessObj = {
    /**是否授权用户信息 */
    "scope.userInfo": string;
    /**是否授权地理位置 */
    "scope.userLocation": string;
    /**是否授权录音功能 */
    "scope.record": string;
    /**是否授权保存到相册 */
    "scope.album": string;
    /**是否授权摄像头 */
    "scope.camera": string;
    /**是否授权录屏，默认为开。在 onError 里面报错到没有屏权限时，可以尝试主动调用 */
    "scope.screenRecord": string;
    /**是否授权添加日历事件 */
    "scope.calendar": string;
  };

  /**获取授权参数 */
  type authorizeObj = {
    /**需要预授权的 scope，详见 [用户授权 scope 说明](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/authorization/authorization/) */
    scope: string;
    /**成功回调 @param data 授权结果*/
    success?: (res: { data: authorizeSuccessObj; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**展示抖音权限授权弹窗参数 */
  type showDouyinOpenAuthObj = {
    /**需要获取权限的信息，其中key值是申请权限的scope，value值必须是 0,1,2 */
    scopes?: { [key: string]: number };
    /**成功回调 @param res.ticket 票据 @param res.grantPermissions 权限 */
    success?: (res: { ticket: string; grantPermissions: any[]; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**调起关注参数 */
  type showFavoriteGuideObj = {
    /**默认:"一键添加到我的小程序" ,当 type == “tip” 时，可以配置文案，最多显示 12 个字符 */
    content: string;
    /**默认:"bottom" ,弹窗类型为 bar 时的位置参数，可以是 bottom（贴近底部）、overtab（悬于页面 tab 区域上方）*/
    position: string;
    /**组件类型：bar（底部弹窗）、tip（顶部气泡）、customize（自定义组件） */
    type: string;
    /**成功回调 @param res.isFavorited 返回是否收藏的信息，true：用户已收藏；false：用户未收藏 */
    success?: (res: { isFavorited: string; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**群聊信息 */
  type groupInfoListObj = {
    /**群ID */
    group_id: string;
    /**群名 */
    group_name: string;
    /**群现有人数 */
    exist_num: number;
    /**群最大支持进入人数 */
    max_num: number;
    /**群描述 */
    description: number;
    /**群门槛，如“无要求”、“万粉”等 */
    entry_limit: string[];
    /**群状态，正常: Normal, 封禁: Ban, 已满: Full */
    status: string;
    /**群标签，如活跃群，群主近期发言 */
    tags: string[];
    /**群头像 */
    avatar_uri: string;
  };
  /**查询群聊信息参数 */
  type checkGroupInfoObj = {
    /**建群用户的 openid。通过 [tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/log-in/tt-login/) 接口获取到登录凭证后，开发者可以通过服务器发送请求的方式获取 openid。详情参考 [code2Session](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/server/log-in/code-2-session) */
    openid: string;
    /**预留字段 */
    extraInfo?: string;
    /**预留字段 */
    sessionFrom?: string;
    /**成功回调 @param res.data.groupInfoList 群聊信息*/
    success?: (res: { data: { groupInfoList: groupInfoListObj[] }; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**加群参数 */
  type joinGroupObj = {
    /**群 ID */
    groupid: string;
    /**附加信息 */
    extraInfo?: string;
    /**成功回调 @param res.data.openid 用户的openid @param res.data.groupid 群ID */
    success?: (res: { data: { openid: string; groupid: string }; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**是否关注 */
  type AwemeObj = {
    /**成功回调 @param res.hasFollowed 是否关注抖音号 */
    success?: (res: { hasFollowed: boolean; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**创建关注头条号按钮参数 */
  type createFollowButtonObj = {
    /**默认:text 按钮的类型，取值 image 或 text。image 对应图片按钮，text 对应文本按钮 */
    type?: string;
    /**按钮的背景图片，type 为 image 时必填。仅支持本地图片，目录包括代码包目录、临时文件目录和本地用户目录 */
    imageUrl?: string;
    /**按钮的样式 [具体参考文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/follow/follow-tt/tt-create-follow-button) */
    style?: { [key: string]: any };
  };

  /**FollowButtonCallbackObj 是一个回调函数 */
  type FollowButtonCallbackObj = (obj: {
    /**关注按钮的 id 标识，每一个按钮对应唯一一个 id */
    buttonId: string;
    /**关注结果错误码，详见下方取值 */
    errCode: string;
    /**关注完成时的详细信息。成功时为"ok" 失败时为详细错误信息 */
    errMsg: string;
  }) => void;
  /**
   * - ## 关注按钮实例
   * - 可通过 [tt.createFollowButton](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/follow/follow-tt/tt-create-follow-button) 获取。通过它能够监听关注按钮的相关操作。
   * - 基础库 1.19.0 开始支持本方法，低版本需做[兼容处理](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/basic-library/compatibility-description/)。 暂时只支持在今日头条 App 上使用。
   */
  interface FollowButton {
    /**监听按钮点击事件。当按钮时，唤起关注弹层，弹层被关闭时触发用户回调。 */
    onTap: (callback: FollowButtonCallbackObj) => void;
    /**移除指定的按钮点击监听事件。 */
    offTap: (callback: FollowButtonCallbackObj) => void;
    /**销毁关注按钮。 */
    destroy: () => void;
    /**显示关注按钮。 */
    show: () => void;
    /**隐藏关注按钮。 */
    hide: () => void;
  }

  /**是否关注 */
  type checkFollowStateObj = {
    /**成功回调 @param res.result 是否已关注头条号 */
    success?: (res: { result: boolean; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**GridGamePanelStateChangeCallback 是一个回调函数 */
  type GridGamePanelStateChangeCallback = (obj: {
    /**show|close|error｜click，开发者调用hide接口 或 玩家点击组件右上角关闭组件，都会触发 close 事件 */
    state: string;
    /**state === 'click' 时返回，表示玩家点击的小游戏的名称 */
    appName: string;
    /**错误信息，同 [GridGamePanel.show](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/grid-game-panel/grid-game-panel/grid-game-panel-show) 调用时返回的错误消息 */
    errMsg: string;
  }) => void;
  /**
   * - ## 游戏推荐组件实例
   * - 通过 [tt.createGridGamePanel](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/grid-game-panel/tt-create-grid-game-panel) 获取的实例，通过它可以对 游戏推荐组件 进行展示、隐藏、销毁、注册监听等操作。
   * - Tips：实例属性修改后需要下一次GridGamePanel.show时才会生效。
   */
  interface GridGamePanel {
    /**合理值：one|four|nine，表示游戏推荐组件的格子数量。 */
    readonly gridCount: string;
    /**合理值：large|medium|small，表示组件大小，large：100%，medium：90%，small：80%。仅 gridCount=one|four 时有效。 */
    size: string;
    /**控制游戏推荐组件的展示位置，不传入时默认展示在屏幕右下角。仅 gridCount = one 时有效。 */
    position: { top: number; left: number };
    /**从组件内打开游戏时附带的query信息，请阅读文档 [query参数](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/grid-game-panel/tt-create-grid-game-panel) 确认具体格式 */
    query: { [appid: string]: string };
    /**展示游戏推荐组件。目前仅支持抖音、抖音极速版 */
    show: () => Promise<void>;
    /**隐藏游戏推荐组件。 */
    hide: () => void;
    /**销毁游戏推荐组件。 */
    destroy: () => void;
    /**绑定游戏推荐组件实例状态变化事件的监听器。 */
    onStateChange: (callback: GridGamePanelStateChangeCallback) => void;
    offStateChange: (callback: GridGamePanelStateChangeCallback) => void;
  }

  /**创建游戏推荐组件参数 */
  type createGridGamePanelObj = {
    /**表示游戏推荐组件的格子数量 one:1 fore:4 nine:9 */
    gridCount: string;
    /**默认:large:100%  medium:90%  small:80%，表示组件大小，仅gridCount=one|four时有效。 */
    size: string;
    /**控制游戏推荐组件的展示位置，不传入时默认展示在屏幕右下角。仅gridCount=one时有效 组件左上角 top纵坐标 left横坐标*/
    position?: { top: number; left: number }; //
    /**从组件内打开游戏时附带的query信息，请阅读文档 [query参数](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/grid-game-panel/tt-create-grid-game-panel) 确认具体格式 */
    query?: { [appid: string]: string };
  };

  /**检查添加桌面图标回调 */
  type shortcutObj = {
    /**成功回调 @param res.status.exist 是否已经添加了桌面快捷方式 @param res.status.needUpdate 是否需要更新快捷方式 */
    success?: (res: { status: { exist: boolean; needUpdate: boolean }; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**上传排行榜数据参数 */
  type setImRankDataObj = {
    /**预留字段 */
    extra?: string;
    /**用于判断权重 ，仅当  dataType 为 1 时需要，不传则使用默认值 0。如传入 value 为'白银'，priority 为 2，则白银的权重为 2，传入value 为 '黄金'，priority 为 3，则黄金的权重为3，高于白银，届时生成的榜单，黄金段位会排在白银前面 */
    priority?: number;
    /**排行榜分区标识，取值可以是 'default' 或 'test' 或其他开发者自定义的分区标识，'default' 表示为默认的线上分区，'test' 表示测试分区。不同分区的排行榜数据存在数据隔离，如 zoneId='test' 设置的数据不会影响通过  zoneId='default' 的排行榜，可用于测试环境。目前每个小游戏除了 default 和 test， 最多可支持 10 个分区 */
    zoneId?: string;
    /**展示出来的数值，dataType 为 0 时只能传正数的字符串  （如'103', '105'）,且取值范围为 [0, int32_MAX)，否则会报错。dataType 为 1 时，则可传入任意字符串（eg：'青铜'、'白银'） */
    value: string;
    /**可选值: 0 或 1，0 表示数据为数字类型，往往适用于游戏的通关分数（如 103分、105分）； 1 表示数据为字符串类型，适用于段位信息（如 '青铜'、'白银'） */
    dataType: number;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取排行榜数据回调 */
  type getImRankListObj = {
    /**排行榜分区标识，取值可以是 'default' 或 'test' 或其他开发者自定义字符串，'default' 表示为默认的线上分区，不同分区的排行榜数据存在数据隔离，如 zoneId='test' 设置的数据不会影响通过 zoneId='default' 的排行榜，可用于测试环境。目前每个小游戏除了 default 和 test， 最多可支持 10 个分区 */
    zoneId?: string;
    /**分数后缀补充文案 */
    suffix?: string;
    /**排行榜标题 */
    rankTitle?: string;
    /**可选值有 0 或 1。 0 表示数据被解析为数值。1 表示数据被解析为字符串 */
    dataType: number;
    /**排行榜类型 default:好友榜+总榜  friend:好友榜  all:总榜*/
    relationType: string;
    /**可选值有：day:天榜、week:周榜、month:月榜、all:总榜 */
    rankType: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取排行榜数据回调(开放数据域)结果数据中的Item数据结构 [RankResItem](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/game-rank/rank-res-item) */
  type RankResItem = {
    /**可选值：0 或 1。0 代表 value 为数字类型 ，1 代表 value 为枚举名称 */
    data_type: number;
    /**分数值或枚举名称，代表分数值时只能传正数 */
    value: string;
    /**data_type === 1时有意义，返回值为正整数，表示枚举名称对应的权重 */
    priority: number;
    /**传入的附加字段，小游戏只负责透传 */
    extra: string;
    /**用户的 openid */
    openid: string;
    /**加密后的 uid */
    sec_uid: string;
    /**用户头像 */
    user_img: string;
    /**用户昵称 */
    nick_name: string;
    /**unix秒级时间戳 */
    utime: number;
  };

  /**获取排行榜数据回调(开放数据域)结果数据 */
  type getImRankDataSuccessCallbackDataObj = {
    /**获取的榜单数据。Array<[RankResItem](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/game-rank/rank-res-item)> 类型 */
    items: RankResItem[];
    /**用户个人信息 */
    self_user_info: {
      /**用户 openid */
      openid: string;
      /**加密后的 sec_uid */
      sec_uid: string;
      /**用户头像 */
      user_img: string;
      /**用户昵称 */
      nick_name: string;
    };
    /**请求者自己的数据 */
    self_item: {
      /**	[RankResItem](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/game-rank/rank-res-item) 类型 */
      item: RankResItem;
      /**从 1 开始的排序，返回 0 表示不在排行榜内 */
      rank: number;
      /**隐私设置，0：所有人可见，1：仅好友可见，2：仅自己可见  */
      private_setting: number;
    };
    /**页码，从1开始 */
    page_num: number;
    /**总条数 */
    total_num: number;
  };

  /**获取排行榜数据回调(开放数据域) */
  type getImRankDataObj = {
    /**排行榜分区标识，取值可以是 'default' 或 'test' 或其他开发者自定义字符串，'default' 表示为默认的线上分区，不同分区的排行榜数据存在数据隔离，如 zoneId='test' 设置的数据不会影响通过 zoneId='default' 的排行榜，可用于测试环境。目前每个小游戏除了 default 和 test， 最多可支持 10 个分区 */
    zoneId?: string;
    /**可选值有 0 或 1。 0 表示数据被解析为数值。1 表示数据被解析为字符串 */
    dataType: number;
    /**排行榜类型 default:好友榜+总榜  friend:好友榜  all:总榜*/
    relationType: string;
    /**可选值有：day:天榜、week:周榜、month:月榜、all:总榜 */
    rankType: string;
    /**每页长度，大于 0 小于 40 */
    pageSize: number;
    /**页码，从 1 开始 */
    pageNum: number;
    /**成功回调 */
    success?: (res: { data: getImRankDataSuccessCallbackDataObj; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**上传排行榜数据参数(开放数据域) */
  type setImRankDataInOpenContextObj = setImRankDataObj;

  /**自定义启动场景数据上报接口参数 */
  type reportSceneObj = {
    /**​场景ID，登录抖音开放平台，进入「数据」-「性能分析」-「启动监控」-「启动场景配置」模块，添加游戏的自定义启动场景。 游戏每次启动只可以上报一次​ */
    sceneId: number;
    /**场景耗时，单位ms */
    costTime: number;
    /**自定义维度数据。只支持能够通过 JSON.stringify 序列化的对象，且序列化后长度不超过 1024 个字符 ​ */
    dimension?: object;
    /**自定义指标数据。只支持能够通过 JSON.stringify 序列化的对象，且序列化后长度不超过 1024 个字符 ​ */
    metric?: object;
    /**成功回调 @param data 开发者上报的原始数据*/
    success?: (res: { data: any; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**客户端订阅消息参数 */
  type requestSubscribeMessageObj = {
    /**需要订阅的消息模板的 id 的集合，最多支持传入三个 tmplId。消息 id 获取请参考[教程](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/subscribe-message/introduce)中的【获取消息 ID】步骤 */
    tmplIds: string[];
    /**
     * - 成功回调
     * @param res.TEMPLATE_ID 模板id:[accept,reject,ban,fail]
     * - accept:用户同意订阅该条id对应的模板消息
     * - reject:用户拒绝订阅该条id对应的模板消息
     * - ban:表示已被后台封禁
     * - fail:表示该条id对应的模版消息授权失败]
     */
    success?: (res: { TEMPLATE_ID: string; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**全局唯一的 [UpdateManager](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/update/update-manager/update-manager) 对象。 */
  interface UpdateManager {
    /**
     * 当向小游戏后台请求完新版本信息，会进行回调。
     * @param callback 请求完新版本信息后，回调的函数
     * @param res.hasUpdate 是否有新的版本
     */
    onCheckForUpdate: (callback: (res: { hasUpdate: boolean }) => void) => void;
    /**
     * 当新版本下载完成，会进行回调。
     * @param callback 当新版本下载完成后进行回调的函数
     */
    onUpdateReady: (callback: (res?: string) => void) => void;
    /**
     * 当新版本下载失败，会进行回调。
     * @param callback 当新版本下载失败时回调的函数
     */
    onUpdateFailed: (callback: (res?: any) => void) => void;
    /**
     * 当新版本下载完成，调用该方法会强制当前小游戏应用上新版本并重启。
     */
    applyUpdate: (obj: callbackObj) => void;
  }

  /**设置系统剪贴板参数 */
  type setClipboardDataObj = {
    /**剪贴板的内容 */
    data: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取系统剪贴板参数 */
  type getClipboardDataObj = setClipboardDataObj;

  /**获取网络类型参数 */
  type getNetworkTypeObj = {
    /**
     * - 成功回调
     * @param res.networkType 网络类型
     * - unknown:不常见的网路类型
     * - wifi:wifi网络
     * - 2g:2G网络
     * - 3g:3G网络
     * - 4g:4G网络
     * - none:无网络
     */
    success?: (res: { networkType: string; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**保持屏幕常亮参数 */
  type setKeepScreenOnObj = {
    /**是否保持屏幕常亮 */
    keepScreenOn: boolean;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取屏幕亮度参数 */
  type getScreenBrightnessObj = {
    /**成功回调 @param res.value 屏幕亮度值，范围 0 ～ 1。（0 最暗，1 最亮）*/
    success?: (res: { value: number; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**设置屏幕常亮参数 */
  type setScreenBrightnessObj = {
    /**屏幕亮度值，范围 0 ～ 1。（0 最暗，1 最亮） */
    value: number;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**扫码参数 */
  type scanCodeObj = {
    /**成功回调 @param res.result 所扫码的内容*/
    success?: (res: { result: number; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**设置陀螺仪参数 */
  type startGyroscopeObj = {
    /**获取陀螺仪数据的间隔时间，单位为毫秒（ms），默认大小为 50。 */
    interval: number;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };
  /**陀螺仪数据 */
  type onGyroscopeChangeObj = {
    /**x 轴的角速度 */
    x: number;
    /**y 轴的角速度 */
    y: number;
    /**z 轴的角速度 */
    z: number;
    /**姿态角值，围绕 Z 轴旋转，也叫翻滚角 */
    roll: number;
    /**姿态角值，围绕 X 轴旋转，也叫做俯仰角 */
    pitch: number;
    /**姿态角值，围绕 Y 轴旋转，也叫偏航角 */
    yaw: number;
    /**从设备启动到现在经过的时间戳，单位是 ms */
    t: number;
    /**数据是否有效的标示，但值为 -1 时表示当前值无效 */
    result: number;
  };

  /**监听设备方向参数 */
  type startDeviceMotionListeningObj = {
    /**监听设备方向的变化回调函数的执行频率，单位为ms/次  合理的值：normal:普通的回调频率约200ms/次，game:适用于更新UI的回调频率约60ms/次，ui:适用于更新游戏的回调频率约20ms/次 */
    interval: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };
  /**设备方向数据 */
  type onDeviceMotionChangeObj = {
    /**偏航角，绕z轴旋转，逆时针转动为正方向，取值范围为[-PI, PI)。 */
    alpha: number;
    /**俯仰角，绕x轴旋转，手机顶部向上为正方向，取值范围为[-PI/2, PI/2)。 */
    beta: number;
    /**翻滚角，绕y轴旋转，手机右侧向下为正方向，取值范围为[-PI, PI)。 */
    gamma: number;
  };

  /**向系统日历添加事件参数 */
  type addPhoneCalendarObj = {
    /**日历事件标题 */
    title: string;
    /**开始时间的 unix 时间戳（1970年1月1日开始所经过的秒数，单位：秒） */
    startTime: number;
    /**结束时间的 unix 时间戳。默认值为 startTime 的值 */
    alarm?: boolean;
    /**事件位置 */
    location?: string;
    /**提醒提前量（单位：秒） */
    endTime?: number;
    /**是否提醒 */
    alarmOffset?: number;
    /**是否全天事件 */
    allDay?: boolean;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**获取设备地理位置回调参数 */
  type getLocationSuccessRes = {
    /**高度，单位 m */
    altitude: number;
    /**位置的精确度，反应与真实位置之间的接近程度，可以理解成10即与真实位置相差10m，越小越精确 */
    accuracy: number;
    /**垂直精度，单位 m（Android 需要系统 8.0 及以上机型并且开启 GPS，否则返回 0） */
    verticalAccuracy: number;
    /**水平精度，单位 m */
    horizontalAccuracy: number;
    /**速度，单位 m/s */
    speed: number;
    /**定位到的城市信息（因整体性能考虑，不开放返回 iOS 端的城市数据，可基于经纬度自行测算） */
    city: string;
    /**纬度，范围为-90 ~ 90，正数表示北，负数表示南 */
    latitude: number;
    /**经度，范围为-180 ~180，正数表示东，负数表示西 */
    longitude: number;
    /**错误信息 */
    errMsg: string;
  };
  /**获取设备地理位置参数 */
  type getLocationObj = {
    /**默认值:"wgs84" 指定坐标系类型，可以是 "wgs84" 或 "gcj02"*/
    type: string;
    /**成功回调 */
    success?: (res: getLocationSuccessRes) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**录频开始参数 */
  type GameRecorderStartObj = {
    /**默认值:10  录屏的时长，单位 s，必须大于 3s，最大值 300s（5 分钟）。 */
    duration?: number;
    /**默认值:true  是否添加水印，会在录制出来的视频上添加默认水印，目前不支持自定义水印图案。 */
    isMarkOpen?: boolean;
    /**默认值:0  水印距离屏幕上边界的位置，单位为 dp。 */
    locTop?: number;
    /**默认值:0  水印距离屏幕左边界的位置，单位为 dp。 */
    locLeft?: number;
    /**默认值:30  设置录屏帧率（仅安卓系统支持），对于性能较差的手机可以调低参数以降低录屏性能消耗。 */
    frameRate?: number;
  };

  /**录频剪辑参数 */
  type GameRecorderClipObj = {
    /**数组的值表示记录这一时刻的前后时间段内的视频，单位是 s */
    timeRange?: number[];
    /**成功回调 @param res.index 裁剪片段的唯一索引，用于 [tt.clipVideo](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-clip-video) 接口调用时指定裁剪拼接顺序。 */
    success?: (res: { index: number; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };
  /**剪辑精彩的视频片段参数 */
  type GameRecorderClipVideoObj = {
    /**path 的值为停止录屏拿到的视频地址 */
    path: string;
    /**裁剪的范围，用法含义与 [recordClip](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-record-clip) 中的 timeRange 完全相同，只是记录时相对的当前时刻规定为录屏结束时刻 */
    timeRange?: number[];
    /**
     * - 指定要裁剪的范围，数组中每一项为调用 recordClip 得到返回值
     * - 若不传 clipRange 字段，会按照默认的 recordClip 的调用顺序裁剪视频并合并，对于 recordClip 调用时 timeRange 字段可能产生交集的部分会自动合并，确保生成的视频内容是无重复且顺序符合记录顺序。
     * - 若指定了 clipRange 字段，平台将只会按 clipRange 数据的顺序裁剪合并视频，并对于重复的部分不做处理，开发者可利用该功能实现自定义裁剪片段、自定义拼接顺序（若同时指定了 timeRange，该片段将依旧作为最后一段拼接），对于最终视频可能出现的重复内容，需要开发者自己保证。
     * - 若指定了 clipRange 字段，需要保证 clipRange 参数的长度需要大于 1。再同时指定了 timeRange 的情况下，timeRange 参数会在内部生成为 recordClip 得到返回值 ，并加入到 clipRange 数组中，即 timeRange 会在内部转换为 clipRange 数组的一项追加到数组末尾。
     */
    clipRange?: number[];
    /**成功回调 @param res.videoPath 剪辑的视频地址 */
    success?: (res: { videoPath: string; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**
   * - ## 全局唯一的录屏管理器。
   * - 通过[tt.getGameRecorderManager](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/tt-get-game-recorder-manager/)获取。
   * - 基础库 1.4.1 开始支持。
   */
  interface GameRecorderManager {
    /**
     * - ## 开始录屏。
     * - 基础库 1.4.1 开始支持本方法，这是一个同步方法。
     * - 可以通过 [onStart](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-on-start) 接口监听录屏开始事件。
     */
    start: (obj: GameRecorderStartObj) => void;
    /**
     * - ## 监听录屏开始事件
     * - 基础库 1.4.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听事件的回调函数
     */
    onStart: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏开始事件。
     * - 基础库 1.4.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听事件的回调函数
     */
    offStart: (callback: (res?: any) => void) => void;
    /**
     * - ## 记录精彩的视频片段。
     * - 基础库 1.6.1 开始支持本方法，这是一个异步方法。
     * - 调用时必须是正在录屏，以调用时的录屏时刻为基准，指定前 x 秒，后 y 秒为将要裁剪的片段。
     * - 可以多次调用，记录不同时刻。在结束录屏时，可以调用 [clipVideo](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-clip-video) 接口剪辑并合成记录的片段。
     */
    recordClip: (obj: GameRecorderClipObj) => void;
    /**
     * - ## 剪辑精彩的视频片段。
     * - 基础库 1.6.1 开始支持本方法，这是一个异步方法。
     */
    clipVideo: (obj: GameRecorderClipVideoObj) => void;
    /**
     * - ## 暂停录屏
     * - 可以通过 [onPause](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-on-pause) 接口监听录屏暂停事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     */
    pause: () => void;
    /**
     * - ## 监听录屏暂停事件
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听事件的回调函数
     */
    onPause: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏暂停事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听事件的回调函数
     */
    offPause: (callback: (res?: any) => void) => void;
    /**
     * - ## 继续录屏
     * - 可以通过 [onResume](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-on-resume) 接口监听录屏继续事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     */
    resume: () => void;
    /**
     * - ## 监听录屏继续事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听事件的回调函数
     */
    onResume: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏继续事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听事件的回调函数
     */
    offResume: (callback: (res?: any) => void) => void;
    /**
     * - ## 停止录屏。
     * - 可以通过 [onStop](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/screen-recording/game-recorder-manager/game-recorder-manager-on-stop) 接口监听录屏结束事件，获得录屏地址。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     */
    stop: () => void;
    /**
     * - ## 监听录屏结束事件，可以获得录屏地址。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听事件的回调函数
     * @param res.videoPath 录屏地址
     */
    onStop: (callback: (res: { videoPath: string }) => void) => void;
    /**
     * - ## 取消监听录屏结束事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听事件的回调函数
     */
    offStop: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听录屏中断开始事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听录屏中断开始事件的回调函数
     */
    onInterruptionBegin: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏中断开始事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听录屏中断开始事件的回调函数
     */
    offInterruptionBegin: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听录屏中断结束事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听录屏中断结束事件的回调函数
     */
    onInterruptionEnd: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏中断结束事件
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听录屏中断结束事件的回调函数
     */
    offInterruptionEnd: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听录屏错误事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 监听录屏错误事件的回调函数
     */
    onError: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录屏错误事件。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听录屏错误事件的回调函数
     */
    offError: (callback: (res?: any) => void) => void;
    /**
     * - ## 获取录屏水印宽高。
     * - 开发者可以通过宽高计算水印添加的位置。
     * - 基础库 1.69.0 开始支持本方法，这是一个同步方法。
     * @param markWidth 水印的宽度
     * @param markHeight 水印的高度
     */
    getMark: () => { markWidth: number; markHeight: number };
  }

  /**
   * - ## 一个相机对象实例，可以通过设置该对象上的属性和调用该对象上的方法来控制相机。
   * - 通过[tt.createCamera](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/camera/tt-create-camera)创建实例
   */
  interface Camera {
    /**
     * - ## 启动摄像头。
     * - 该方式返回一个 Promise 对象，是个异步方法。
     * - Tip：只有开启摄像头美白， 调用接口Camera.setBeautifyParam才能设置美白参数。
     * - Tip：只有开启摄像头美白， 才能进行人脸检测。
     * - Tip：对于摄像头开启后模糊，可以对摄像头 start 后返回的视频调用 focus 方法，参考上面代码示例。
     * - Tip：上面代码示例中，摄像头开启后返回的 video 对象指向的是摄像头的实时数据，内部会实时更新 video 对象指向的数据。
     * - Tip：开发者工具暂不支持此能力，请用真机扫码调试。
     * @param face 摄像头方向，取值为 "front" 或者 "back", 默认开启前置摄像头
     * @param beautify 开启摄像头美颜，false 表示不开启
     * @param option 摄像头可选参数
     * @param gesture 是否开启手势识别能力，需要开启时传入
     */
    start: (face: string, beautify: boolean, option?: { gesture: boolean }) => Promise<void>;
    /**
     * - ## 暂停摄像头视频画面，这是个同步 API。
     * - Tip：开发者工具暂不支持此能力，请用真机扫码调试。
     */
    pause: () => void;
    /**
     * - ## 恢复摄像头画面，这是个同步 API。
     * - Tip：开发者工具暂不支持此能力，请用真机扫码调试。
     */
    resume: () => void;
    /**
     * - ## 设置美颜参数，这是个同步 API。
     * - Tip：开发者工具暂不支持此能力，请用真机扫码调试。
     * - Tip：只有 [Camera.start](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/camera/camera-start) 开启摄像头美白， 调用该接口才能设置美白参数。
     * @param whiten 美白程度，取值范围为 0-1
     * @param smoothen 磨皮程度，取值范围为 0-1
     * @param enlargeEye 大眼程度，取值范围为 0-1
     * @param slimFace 瘦脸程度，取值范围为 0-1
     */
    setBeautifyParam: (whiten: number, smoothen: number, enlargeEye: number, slimFace: number) => void;
    /**
     * - ## 销毁摄像头实例，这是个同步 API。
     * - Tip：开发者工具暂不支持此能力，请用真机扫码调试。
     */
    destroy: () => void;
  }

  /**录音启动参数 */
  type RecorderStartObj = {
    /**录音自动完成时长，单位 ms */
    duration?: number;
    /**采样率 合法值参考[文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/recorder-manager/recorder-manager-start) */
    sampleRate?: number;
    /**录音通道数 值：1:1个通道 2:2个通道 */
    numberOfChannels?: number;
    /**码率 合法值参考[文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/recorder-manager/recorder-manager-start)*/
    encodeBitRate?: number;
    /**帧大小，单位 KB。如果设置了值，那么每当录音内容达到帧大小时会通过 [onFrameRecorded](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/recorder-manager/recorder-manager-on-frame-recorded) 返回内容 */
    frameSize?: number;
  };

  /**
   * 全局唯一的录音管理器，通过[tt.getRecorderManager](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/tt-get-recorder-manager)返回。
   */
  interface RecorderManager {
    /**
     * - ## 开始录音。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 该方法需要用户授权方可调用，详细信息可参考[用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/other/user-authorization/)。
     */
    start: (obj: RecorderStartObj) => void;
    /**
     * - ## 监听录音开始事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 录音开始后的回调函数
     */
    onStart: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录音开始事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offStart: (callback: (res?: any) => void) => void;
    /**
     * - ## 暂停录音
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    pause: () => void;
    /**
     * - ## 监听录音暂停事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 录音暂停后的回调函数
     */
    onPause: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录音暂停事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offPause: (callback: (res?: any) => void) => void;
    /**
     * - ## 继续录音。
     * - 在调用 [pause](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/recorder-manager/recorder-manager-resume) 暂停录音之后，可以调用 resume 继续录音，继续录音的内容会拼接到上一次暂停录音之后。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    resume: () => void;
    /**
     * - ## 监听录音继续事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 录音继续后的回调函数
     */
    onResume: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录音继续事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offResume: (callback: (res?: any) => void) => void;
    /**
     * - ## 停止录音。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    stop: () => void;
    /**
     * - ## 监听录音停止事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 如果在录音结束的 onStop 回调中立即通过 createInnerAudioContext 或者 getAudioContext 系列能力播放音频，可能会出现音频无法正常播放的情况。
     * - 这是某些情况下，录音音频文件尚未完全写完导致的，可以增加一定延时来播放音频文件。
     * @param callback 录音停止后的回调函数
     * @param res.tempFilePath 录屏文件的临时路径
     */
    onStop: (callback: (res?: { tempFilePath: string; errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录音停止事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offStop: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听录音错误事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 录音错误后的回调函数
     */
    onError: (callback: (res?: { errMsg: string }) => void) => void;
    /**
     * - ## 取消监听录音错误事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offError: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听已录制完指定帧大小的文件事件。
     * - 如果 [start](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/record/recorder-manager/recorder-manager-start) 设置了 frameSize，则会回调此事件，不设置则没有此回调。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 若设置的 frameSize 大于整个音频的大小，则在音频结束时一次性输出
     * @param callback 录音已录制完指定帧大小的文件事件后的回调函数
     * @param res.frameBuffer 录音分片数据
     * @param res.isLastFrame 是否是最后一帧
     */
    onFrameRecorded: (callback: (res?: { frameBuffer: ArrayBuffer; isLastFrame: boolean }) => void) => void;
    /**
     * - ## 取消监听已录制完指定帧大小的文件事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offFrameRecorded: (callback: (res?: any) => void) => void;
  }

  /**
   * - 转发内容类型附加信息
   * - channel = video 时，可以通过 extra 设置以下附加信息：
   */
  type ShareExtraParam1 = {
    /**是否支持跳转到播放页， 以及支持获取视频信息等接口 （为 true 时会在 success 回调中带上 videoId） */
    withVideoId?: boolean;
    /**视频地址 ，分享一个本地视频。如果 videoPath 不传入会拉起摄像头拍摄界面 */
    videoPath?: string;
    /**视频话题(仅抖音支持) ，目前由 hashtag_list 代替，即将废弃，为保证兼容性，建议同时设置hashtag_list */
    videoTopics?: string[];
    /**默认:false 是否分享为挑战视频 ( 仅头条支持 ) */
    createChallenge?: boolean;
    /**默认:'' 生成输入的默认文案 */
    video_title?: string;
    /**视频话题，字符串中间包含空格会取第一个空格前内容作为话题(仅抖音支持) */
    hashtag_list?: string[];
    /**分享视频的标签，可以结合获取[抖音视频排行榜](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/-open/function-get-video-list)使用 */
    videoTag?: string;
    /**抖音 pgc 音乐的短链(仅抖音支持，需要基础库版本大于 1.90) 。形如https://v.douyin.com/JmcxWo8/ ，参考 [抖音小游戏录屏带配乐能力](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/gain-user/record-with-bgm) */
    defaultBgm?: string;
    /**剪映模板 ID， 参考 录屏添加剪映视频模板能力 */
    cutTemplateId?: string;
    /**默认:false 剪映模板不可用或者剪映模板 ID 无效的时候是否直接回调失败 */
    abortWhenCutTemplateUnavailable?: boolean;
  };
  /**
   * - 转发内容类型附加信息
   * - channel = picture 时，可以通过 extra 设置以下附加信息：
   */
  type ShareExtraParam2 = {
    /**发布的图片地址，仅支持本地图片路径（即游戏包内路径和 `ttfile://` 路径） */
    picturePath?: string[];
    /**作品标题 */
    contentTitle?: string;
    /**作品描述信息 */
    contentDescription?: string;
    /**视频话题，字符串中间包含空格会取第一个空格前内容作为话题 */
    hashtag_list?: string[];
  };
  /**
   * - ## 开发者最终传递给发布器的数据，可以根据约定传入部分自定义数据。
   * - Tip：端外分享不支持通过代码设置自定义分享内容。
   * - Tip：如果需要获取视频信息或者跳转视频播放页，以及获取抖音视频排行榜时，需要填写 withVideoId 为 true。
   * - Tip：头条拍视频不支持设置 title 。
   */
  type ShareParam = {
    /**
     * 转发内容类型
     * - 默认分享方式, channel 为空字符串或者不传 通用
     * - invite 拉起邀请面板分享游戏给好友 仅抖音 20.6 及以上版本
     * - video 发布视频内容 通用
     * - token 口令分享，生成一串特定的字符串文本 仅头条
     * - article 发布图文内容 仅头条
     * - picture 发布图文内容，内容由接口参数直接传入 仅抖音、抖音极速版、抖音火山版 25.9 及以上版本
     */
    channel?: string;
    /**- 分享素材模板 id，指定通过平台审核的 templateId 来选择分享内容，需在平台设置且通过审核。参考[拍摄视频并发布至抖音](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/open-capacity/operation/douyin_task)
     * - 如有个性化分享诉求，请在对应场景的调用点传入对应的templateId */
    templateId?: string;
    /**分享文案，不传则默认使用后台配置内容或游戏简介 */
    desc?: string;
    /**转发标题，不传则默认使用后台配置或当前小游戏的名称 */
    title?: string;
    /**- 转发显示图片的链接，支持本地沙盒目录（`ttfile://`）或 相对代码包根目录的图片路径，不支持网络图片路径。
     * - 显示图片长宽比推荐 5:4，不传或使用网络图片路径则默认使用小游戏icon
     * - 当 `channel = video|picture` 时，该字段不生效
     * - 抖音、抖音极速版、抖音火山版 30.9.0 版本起该参数失效。
     * - 平台将使用「开发者后台-运营能力-必接能力-分享配置」的配置图片自动替代，若无，将使用平台兜底图片自动替代 */
    imageUrl?: string;
    /**- 查询字符串，必须是 key1=val1&key2=val2 的格式。
     * - 从这条转发消息进入后，可通过 [tt.getLaunchOptionsSync](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-get-launch-options-sync/) 或 [tt.onShow](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-on-show/) 获取启动参数中的 query用来实现信息透传 */
    query?: string;
    /**附加信息（仅 `channel == video|picture` 或为空字符串/不传 时生效） */
    extra?: ShareExtraParam1 | ShareExtraParam2;
    /**分享成功后执行的回调函数 @param res.name 分享对象的用户名 @param res.icon 分享对象的用户头像 */
    success?: (res: { name: string; icon: string }) => void;
    /**分享失败或者用户取消发布器后执行的回调函数 */
    fail?: errCB;
    /**分享完成（无论成功与否）后执行的回调函数 */
    complete?: errCB;
  };

  /**给指定的好友分享参数 */
  type shareMessageToFriendObj = {
    /**查询字符串，格式为JSONString。从这条转发消息进入后，可通过 [tt.getLaunchOptionsSync](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-get-launch-options-sync/) 或 [tt.onShow](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-on-show/) 获取启动参数中的 query 用来实现信息透传"*/
    query?: string;
    /**发送对象的 openId */
    openId: string;
    /**分享素材模板 id，指定通过平台审核的 templateId 来选择分享内容，需在平台设置且通过审核 */
    templateId: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**跳转到分享的视频播放页面参数 */
  type navigateToVideoViewObj = {
    /**[tt.shareAppMessage](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/retweet/tt-share-app-message/)分享视频成功后返回 */
    videoId: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**系统信息 */
  type SystemInfo = {
    /**操作系统版本。示例："11.4", "8.0.0" */
    system: string;
    /**操作系统类型。示例："ios", "android" */
    platform: string;
    /**手机品牌。示例："Apple", "Xiaomi" */
    brand: string;
    /**手机型号 */
    model: string;
    /**宿主 App 版本号（宿主指今日头条、抖音等）。示例："6.7.8" */
    version: string;
    /**
     * - 宿主 APP 名称。示例："Toutiao"
     * - Toutiao：今日头条
     * - Douyin：抖音（国内版)
     * - news_article_lite：今日头条（极速版)
     * - douyin_lite：抖音（极速版）
     * - aweme_hotsoon：抖音火山版
     * - XiGua：西瓜
     */
    appName: string;
    /**客户端基础库版本。示例："1.0.0" */
    SDKVersion: string;
    /**屏幕宽度 */
    screenWidth: number;
    /**屏幕高度 */
    screenHeight: number;
    /**可使用窗口宽度 */
    windowWidth: number;
    /**可使用窗口高度 */
    windowHeight: number;
    /**在竖屏正方向下的安全区域。安全区域指的是一个可视窗口范围，处于安全区域的内容不受圆角（corners）、齐刘海（sensor housing）、小黑条（Home Indicator）影响。 */
    safeArea: {
      /**安全区域左上角横坐标 */
      left: number;
      /**安全区域右下角横坐标 */
      right: number;
      /**安全区域左上角纵坐标 */
      top: number;
      /**安全区域右下角纵坐标 */
      bottom: number;
      /**安全区域的宽度，单位逻辑像素 */
      width: number;
      /**安全区域的高度，单位逻辑像素 */
      height: number;
    };
    /**设备像素比 */
    pixelRatio: number;
    /**机型性能评分。安卓和 IOS，设备分数满分 10 分，分数越高说明设备越好。如果获取不到对应分数，返回-1。 */
    deviceScore: {
      /**cpu 分数 */
      cpu: number;
      /**gpu 分数 */
      gpu: number;
      /**内存分数 */
      memory: number;
      /**综合评分 */
      overall: number;
    };
  };

  /**小游戏环境信息 */
  type EnvInfo = {
    /**小游戏信息 */
    microapp: {
      /**小游戏版本号（如果是预览版本的小游戏，该值为 preview ） */
      mpVersion: string;
      /**
       * - 小游戏环境
       * - production：线上版(审核版本也是该值)
       * - development：测试版
       * - preview：预览版
       * - gray：灰度版
       */
      envType: string;
      /**小游戏 appId */
      appId: string;
    };
    /**?? */
    common: {
      /**用户数据存储的路径（默认值`ttfile://user`） */
      USER_DATA_PATH: string;
    };
  };

  /**跳转到分享的视频播放页面参数 */
  type getSystemInfoObj = {
    /**成功回调 */
    success?: (res: SystemInfo & { errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**退出当前小游戏到后台参数 */
  type exitMiniProgramObj = {
    /**默认:false 是否完全关闭小游戏，当该值为 true 时，会完全关闭小游戏，下次打开将重新进入 */
    isFullExit: boolean;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**小游戏启动参数 */
  type LaunchOptions = {
    /**
     * - 启动参数。
     * - 开发者在部分场景下往query中添加自定义字段时，应避免与某些特殊字段同名，具体见：
     * - ad_params：平台的广告场景字段。如果需要消费该字段，需要对其进行一次 decode 操作。由于 ad_params 参数较长，不建议直接把 query 全部透传给服务端接口。
     * - feed_game_scene：推荐流直出场景字段。
     * - feed_game_extra：推荐流直出场景字段。
     */
    query: { [key: string]: any };
    scene: string;
    extra: {
      /**宿主 id */
      aid: string;
      /**小游戏 appId。 */
      appId: string;
      /**小游戏的版本信息。 */
      mpVersion: string;
      /**启动场景的补充信息，仅当 `scene=021020` 时返回，可用于区分微端和桌面快捷方式场景 `miniapk`表示微端场景，`desktop`表示桌面快捷方式进入 */
      launch_from: string;
    };
  };
  /**场景值 ID */
  enum Scene {
    /**抖音个人主页侧边栏 */
    homepageSidebarCard = "021001",
    /**全局扫一扫 */
    globalScan = "021002",
    /**抖音其他小游戏跳转 */
    dyOtherMiniGameJump = "021009",
    /**小程序返回小程序 */
    miniProgramReturn = "021010",
    /**抖音小游戏中心 */
    dyMiniGameCenter = "021012",
    /**抖音视频发布器 */
    dyVideoPublisher = "021014",
    /**桌面图标 */
    desktopIcon = "021020",
    /**抖音个人页我的小程序（个人简介下方）/ 抖音首页侧边栏 */
    dyHomepageMyMiniProgram = "021036",
    /**抖音ipad版 */
    dyIpad = "021042",
    /**抖音小游戏中心 */
    dyMiniGameCenterIpad = "021043",
    /**金币游戏中心 */
    dyCoinGameCenter = "021045",
    /**抖音金币任务页 */
    dyCoinTask = "021046",
    /**抖音游戏搜索 */
    dyGameSearch = "022001",
    /**抖音视频锚点 */
    dyVideoAnchor = "023001",
    /**抖音视频评论页锚点 */
    dyVideoCommentAnchor = "023002",
    /**企业号主页或个人主页 */
    dyEnterpriseHomepage = "023003",
    /**抖音直播间（仅自然转化）*/
    dyLiveRoom = "023010",
    /**抖音搜索结果视频锚点 */
    dySearchResultVideoAnchor = "023023",
    /**推荐页小游戏异化卡 */
    dyRecommendPageGameCard = "023040",
    /**抖音推荐流直出游戏 */
    dyRecommendStreamGame = "023041",
    /**私信分享 */
    dyDirectMessageShare = "024001",
    /**微信对话 */
    wechatDialogue = "024002",
    /**微信朋友圈 */
    wechatMoments = "024003",
    /**QQ 对话 */
    qqDialogue = "024004",
    /**Qzone */
    qzone = "024005",
    /**群公告 */
    groupAnnouncement = "024010",
    /**抖音广告投放 */
    dyAdDelivery = "025001",
    /**橙子建站 h5 跳转 */
    orangeSiteH5Jump = "025002",
    /**banner */
    banner = "026001",
    /**话题 */
    topic = "026002",
    /**push */
    push = "026003",
    /**抖音订阅消息 */
    dySubscribeMessage = "026004",
  }
  /**
   * - 小游戏回到前台的参数
   * - launch_from 参数说明
   * - launch_from 和 location 只有在某些启动场景才会返回。目前支持返回这两个参数的启动场景如下：
   * - 抖音首页侧边栏 homepage sidebar_card
   * - 侧边栏高价值区 homepage homepage_expand
   */
  type onShowObj = {
    /**启动参数 */
    query: { [key: string]: any };
    /**启动场景值。查看方式：1. [抖音开放平台-场景值](https://partner.open-douyin.com/docs/resource/zh-CN/mini-game/develop/framework/scene-value/)；2.抖音开发者工具中，普通编译 -> 添加编译模式 -> 进入场景 */
    scene: Scene;
    /**来源信息，从另一个小程序进入小程序时返回，否则返回空对象 {} */
    refererInfo: {
      /**来源小程序 appId */
      appId: string;
      /**来源小程序传过来的数据 */
      extraData: { [key: string]: any };
    };
    /**启动场景字段 */
    launch_from: string;
    /**启动场景字段 */
    location: string;
  };

  /**创建激励视频广告实例参数 */
  type createRewardedVideoAdObj = {
    /**广告位 id，后续可以在平台基于广告位 id 看数 */
    adUnitId: string;
    /**
     * - 默认：false
     * - 是否开启再得广告模式（只支持安卓系统的抖音和抖音极速版）
     * - 功能说明：[激励再得能力](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/ads/rewardagainintroduce)
     */
    multiton?: boolean;
    /**
     * - multiton 为 true 时必填
     * - 再得广告的奖励文案，玩家每看完一个广告都会展示，如【再看1个获得xx】
     * - xx 即 multitonRewardMsg 中的文案，按顺序依次展示，单个文案最大长度为 7
     */
    multitonRewardMsg?: string[];
    /**
     * - multiton 为 true 时必填
     * - 额外观看广告的次数，合法的数据范围为 1-4。
     */
    multitonRewardTimes?: number;
    /**
     * - 是否开启进度提醒。
     * - 开启时广告文案为【再看N个获得xx】，关闭时为【 再看1个获得xx】。
     * - N 表示玩家当前还需额外观看广告的次数。
     */
    progressTip?: boolean;
  };

  /**
   * - ## 激励视频广告实例
   * - Tip：全局只能有一个视频广告实例，重复创建没有用
   * - 开发者使用 [tt.createRewardedVideoAd](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/ad/incentive-ads) 创建激励视频广告时，会存在各种不合理情况，导致广告价值和收入降低。
   * - ## 为了帮助开发者提高广告收入，针对激励视频广告做些 [注意事项说明](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/videoAdNotice) 👈👈 点击查看
   */
  interface RewardedVideoAd {
    /**
     * - ## 广告创建后默认是隐藏的，可以通过该方法显示广告。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 该方法返回一个 Promise 对象。
     * - 当广告组件正常获取素材时，该 Promise 对象会是一个 resolved Promise。
     * - 当广告组件发生错误时，会是一个 rejected Promise，参数与 error 事件监听器获得的参数相同。
     */
    show: () => Promise<void>;
    /**
     * - ## 通过 load 方法主动预加载广告内容。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 此外，在显示广告出现问题时也可以尝试主动 load 一次。
     * - 该方法返回一个 Promise，如果广告已经自动拉取成功，调用该方法返回一个 resolved Promise。
     */
    load: () => Promise<void>;
    /**
     * - ## 绑定 load 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 在手动调用 load 方法后，广告组件会预先加载，当广告组件成功拉取广告素材时会触发 load 事件。
     * - 确保监听此事件后，开发者有主动调用 load 方法。
     * - 从最佳实践上来看，正确顺序需要监听 onLoad 事件后，再调用 load 方法。
     * @param callback 监听 load 事件的回调函数，回调参数是一个空对象
     */
    onLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 解除绑定 load 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onLoad](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-on-load) 绑定的监听器
     */
    offLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 绑定 error 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 广告组件拉取广告素材和其他情况下如果发生错误，会触发 error 事件的监听器。
     * @param callback 是一个回调函数，接收 object 类型的参数，属性如下：
     * @param res.errCode 错误码
     */
    onError: (callback: (res: { errCode: number; errMsg: string }) => void) => void;
    /**
     * - ## 解除绑定 error 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onError](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-on-error) 绑定的监听器
     */
    offError: (callback: (res?: any) => void) => void;
    /**
     * - ## 绑定 close 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 当用户点击了 Video 广告上的关闭按钮时，会触发 close 事件的监听器。
     * - count 和 isEnded 都能用于判断广告是否观看完成，在普通广告模式下，两个字段功能是重叠的。
     * - count 是新增加字段，值代表观看广告的次数，开发者能通过 count 来判断实际观看的次数。
     * - 建议开发者在返回 count 的情况下，统一使用该字段判断广告是否观看完成。
     * @param callback 是一个回调函数，接收 object 类型的参数
     */
    onClose: (
      callback: (res: {
        /**
         * 用户是否完整观看了视频
         */
        isEnded: boolean;
        /**
         * 用户完整观看了几次视频
         */
        count: number;
      }) => void
    ) => void;
    /**
     * - ## 解除绑定 close 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onClose](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-on-close) 绑定的监听器
     */
    offClose: (callback: (res?: any) => void) => void;
    /**
     * - ## 通过 destroy 方法主动销毁广告实例。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 该方法返回一个 Promise，如果广告已经销毁成功，调用该方法返回一个 resolved Promise；
     * - 如果是频繁的销毁重建，确保在收到 Promise 保证后再次创建新的。
     * - 通过销毁上一个广告实例后，再次创建时传入新的 adUnitId，可以实现不同 adUnitId 的切换。
     * - 只要调用销毁，无论销毁成功或者失败，销毁时会自动移除广告对象上监听的所有 loaded，error，close 事件。
     */
    destroy: () => Promise<void>;
  }

  /**创建Banner广告实例参数 */
  type createBannerAdObj = {
    /**广告位id */
    adUnitId: string;
    /**广告自动刷新的间隔时间，单位为秒，参数值必须大于等于 30（该参数不传入时 Banner 广告不会自动刷新） */
    adIntervals?: number;
    /**广告位区域，包括left、top、width字段 */
    style?: {
      /**广告位区域左上角横坐标 */
      left?: number;
      /**广告位区域左上角纵坐标 */
      top?: number;
      /**默认值:128 广告位区域宽度 */
      width?: number;
    };
  };

  /**
   * - ## Banner广告实例
   * - 通过 [tt.createBannerAd](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/ads/tt-create-banner-ad) 创建的广告实例。
   */
  interface BannerAd {
    /**
     * - ## 广告创建后默认是隐藏的，可以通过该方法显示广告。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 该方法返回一个 Promise 对象。
     * - 当广告组件正常获取素材时，该 Promise 对象会是一个 resolved Promise。
     * - 当广告组件发生错误时，会是一个 rejected Promise，参数与 [onError](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/ads/banner-ad/banner-ad-on-error) 事件监听器获得的参数相同。
     * - 必须调用 [onLoad](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-on-load) 监听广告素材成功拉取后才能调用 show，否则广告将无法及时展示
     */
    show: () => Promise<void>;
    /**
     * - ## 隐藏广告。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     */
    hide: () => void;
    /**
     * - ## 绑定 load 事件的监听器。
     * - 广告组件成功拉取广告素材时会触发 load 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback load事件的监听器
     */
    onLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 解除绑定 load 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onLoad](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-on-load) 绑定的监听器
     */
    offLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 绑定 error 事件的监听器。
     * - 广告组件拉取广告素材时如果发生错误，会触发 error 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback error事件的监听器
     * @param res.errCode 错误码
     */
    onError: (callback: (res?: { errCode: number; errMsg: string }) => void) => void;
    /**
     * - ## 解除绑定 error 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onError](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-off-error) 绑定的监听器
     */
    offError: (callback: (res?: any) => void) => void;
    /**
     * - ## 绑定 resize 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * - 开发者除了可以在创建 bannerAd 实例时指定广告的 style，还可以在获得实例后修改其 style 属性中的属性值。
     * - 一旦广告尺寸发生变化，会触发 resize 事件的监听器。
     * - 监听器会获得一个包含 width 和 height 属性的对象参数，该参数表征广告的实际渲染尺寸。
     * - 注意不要在该监听器内修改广告样式尺寸，否则会导致广告渲染死循环。
     * @param callback 监听器函数 是一个回调函数，接收 object 类型的参数
     * @param res.width 广告实际渲染宽度
     * @param res.height 广告实际渲染高度
     */
    onResize: (callback: (res?: { width: number; height: number }) => void) => void;
    /**
     * - ## 解除绑定 resize 事件的监听器。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onResize](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-on-resize) 绑定的监听器
     */
    offResize: (callback: (res?: any) => void) => void;
    /**
     * - ## 销毁广告实例。
     * - 当开发者确定某个广告实例无需展示时应当主动销毁以提升性能。
     * - 基础库 1.3.0 开始支持本方法，这是一个同步方法。
     */
    destroy: () => Promise<void>;
  }

  /**
   * - ## 插屏广告实例
   * - 通过 [tt.createInterstitialAd](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/ads/tt-create-interstitial-ad) 方法获取。
   * - ## 开发者使用插屏广告时，需要注意事项 [插屏广告注意事项](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/interstitial-ad/interstitial-ad-notice) 👈👈 点击查看
   */
  interface InterstitialAd {
    /**
     * - ## 显示插屏广告。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * - 出现no ad data的错误信息表示服务端无广告返回，通常是平台策略决定的。
     */
    show: () => Promise<void>;
    /**
     * - ## 加载插屏广告。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     */
    load: () => Promise<void>;
    /**
     * - ## 监听插屏广告加载事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * @param callback 监听器函数 是一个回调函数
     */
    onLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 取消监听插屏广告加载事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onLoad](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/interstitial-ad/interstitial-ad-on-load) 绑定的监听器
     */
    offLoad: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听插屏错误事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     */
    onError: (callback: (res?: any) => void) => void;
    /**
     * - ## 取消监听插屏错误事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onError](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/interstitial-ad/interstitial-ad-on-error) 绑定的监听器
     */
    offError: (callback: (res?: any) => void) => void;
    /**
     * - ## 监听插屏广告关闭事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * @param callback 监听器函数 是一个回调函数
     */
    onClose: (callback: (res?: any) => void) => void;
    /**
     * - ## 取消监听插屏广告关闭事件。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onClose](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/interstitial-ad/interstitial-ad-on-close) 绑定的监听器
     */
    offClose: (callback: (res?: any) => void) => void;
    /**
     * - ## 销毁插屏广告实例。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     */
    destroy: () => Promise<void>;
  }

  /**创建按钮实例参数 */
  type createInteractiveButtonObj = {
    /**按钮上显示图片的路径， 可以接受网络地址，本地 ttfile:// 协议地址，以及相对路径。按钮类型为 image ，该字段必填 */
    image?: string;
    /**按钮上显示的文本。按钮类型为 text，这个字段必须填 */
    text?: string;
    /**按钮类型：text 、image  */
    type: string;
    /**设置按钮的大小，位置，字体，颜色等属性 */
    style: {
      /**默认:150 宽度 */
      width: number;
      /**默认:40 高度 */
      height: number;
      /**默认:40 y 轴坐标 */
      top: number;
      /**默认:20 x 轴坐标 */
      left: number;
      /**默认:16 字体大小 */
      fontSize: number;
      /**默认:#ffffff 背景颜色 */
      backgroundColor: string;
      /**默认:#ffffff 边框颜色 */
      borderColor: string;
      /**默认:1 边框宽度 */
      borderWidth: number;
      /**默认:center 文本对齐方式：left，center 和 right */
      textAlign: string;
      /**默认:#ffffff 字体颜色 */
      textColor: string;
      /**默认:40 多行文本的间距 */
      lineHeight: number;
      /**默认:4 边框圆角 */
      borderRadius: number;
    };
    /**接口调用成功的回调函数 */
    success?: (res: InteractiveButton) => void;
    /**接口调用失败的回调函数 */
    fail?: errCB;
    /**接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: errCB;
  };

  /**创建的按钮实例 */
  interface InteractiveButton {
    /**按钮的唯一 ID， 用来区别多个 button 的场景 */
    buttonid: string;
    /**
     * - ## 显示按钮。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     */
    show: (obj?: callbackObj) => void;
    /**
     * - ## 隐藏按钮。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     */
    hide: (obj?: callbackObj) => void;
    /**
     * - ## 注册按钮点击回调事件
     * - 基础库 2.46.0 开始支持本方法。
     * @param callback 监听事件的回调函数
     * @param res.buttonid 按钮的唯一 ID， 用来区别多个 button 的场景
     */
    onTap: (callback: (res?: { buttonid: string }) => void) => void;
    /**
     * - ## 注销按钮点击回调事件。
     * - 基础库 2.46.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [onTap](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/interface/interaction/interactive-button/interactive-button-ontap) 绑定的监听器
     */
    offTap: (callback: (res?: any) => void) => void;
    /**
     * - ## 销毁按钮，释放相关的资源。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     */
    destroy: (obj?: callbackObj) => void;
  }

  /**显示模态弹窗参数 */
  type showModalObj = {
    /**标题 title和content不可同时为空*/
    title?: string;
    /**内容 title和content不可同时为空*/
    content?: string;
    /**默认值:确定 确定按钮的文案，最多 4 个字符 */
    confirmText?: string;
    /**默认值:true 是否显示取消按钮 */
    showCancel?: boolean;
    /**默认值:取消 取消按钮的文案，最多 4 个字符 */
    cancelText?: string;
    /**
     * 成功回调
     * @param res.confirm 是否点击了确定按钮
     * @param res.cancel 是否点击了取消按钮
     */
    success?: (res: { confirm: boolean; cancel: boolean; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**显示loading提示框参数 */
  type showLoadingObj = {
    /**内容，最多显示 7 个汉字长度的文本 */
    title: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**显示操作菜单参数 */
  type showActionSheetObj = {
    /**菜单的选项，最多支持 6 个选项 */
    itemList?: string[];
    /**成功回调 @param res.tapIndex 用户点击次序，从 0 开始计数 */
    success?: (res: { tapIndex: number; errMsg: string }) => void;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**显示消息提示框参数 */
  type showToastObj = {
    /**默认值:success 图标，取值范围包括success, loading, none, fail(1.36.0版本支持) */
    icon?: string;
    /**默认值:1500 提示框停留时间，单位ms */
    duration?: number;
    /**内容 */
    title: string;
    /**成功回调 */
    success?: errCB;
    /**失败回调 */
    fail?: errCB;
    /**完成回调 */
    complete?: errCB;
  };

  /**菜单按钮布局信息 */
  type getMenuButtonLayoutObj = {
    /**宽度，单位：dp */
    width: number;
    /**高度，单位：dp */
    height: number;
    /**上边界坐标，单位：dp */
    top: number;
    /**下边界坐标，单位：dp */
    bottom: number;
    /**右边界坐标，单位：dp */
    right: number;
    /**左边界坐标，单位：dp */
    left: number;
  };

  /**
   * - 抖音小游戏API定义接口
   * - 按照官网文档从上到下的顺序编写
   * - 点击 [抖音小游戏API](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/overview) 跳转官网文档
   */
  interface TT {
    /**
     * - ## 获取用户临时的登录凭证。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - force 为 true 时(默认值为 true), 如果用户未在端登录(例如未在头条 App 登录), 则会调起端的登录窗口, 如果用户点击取消则会调用 fail
     * - 只有端登录的用户 success 才有 code, 否则只有 anonymousCode
     * - code 可以换取 openid, openid 是用户的唯一标识
     * - anonymousCode 可以换取 anonymous_openid, 同一台手机 anonymous_openid 是相同
     */
    login: (obj: loginObj) => void;

    /**
     * - ## 检查用户当前的 session 状态是否有效
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 用户的登录态具有时效性，随着用户未使用小游戏的时间增加，用户的登录态越容易失效；反之，则用户登录态可持续保持有效。
     * - 使用该 API 可检查用户当前的 session 状态是否有效，登录态过期后开发者可以再调用 [tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/log-in/tt-login) 获取新的用户登录态。
     * - 只有成功调用 [tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/log-in/tt-login) 才会生成 session，tt.checkSession 也会因此进入 success 回调，当用户退出登录会清除 session
     */
    checkSession: (obj: callbackObj) => void;

    /**
     * - ## 调用该API可以跳转到某个小游戏入口场景。
     * - 目前仅支持跳转「侧边栏」场景。
     * - 基础库 2.92.0 开始支持本方法，这是一个异步方法。
     * - 仅支持抖音宿主。可以通过 [tt.checkScene](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/sidebar-capacity/tt-check-scene) 判断是否当前宿主是否支持
     * - 抖音开发者工具在4.1.5及以上版本支持通过模拟器模拟该API，详见[开发者工具更新及下载](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)。
     * - 通过侧边栏入口进入小游戏时，[tt.onShow](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-on-show/) 会在监听回调中新增两个返回字段 launch_from='homepage'和location='sidebar_card'，可用于判断用户是否从该入口场景进入小游戏
     */
    navigateToScene: (obj: navigateToSceneObj) => void;

    /**
     * - ## 确认当前宿主版本是否支持跳转某个小游戏入口场景。
     * - 目前仅支持「侧边栏」场景。
     * - 基础库 2.92.0 开始支持本方法，这是一个异步方法。
     */
    checkScene: (obj: checkSceneObj) => void;

    /**
     * - ## 获取用户已经授权过的配置。
     * - 基础库 1.3.0 开始支持本方法，结果中只会包含小程序向用户请求过的[权限](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/authorization/authorization/)，这是一个异步方法。
     * - 与 [tt.openSetting](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/set/tt-open-setting) 的区别是 getSetting 只会获取配置，而不会打开配置页面。
     */
    getSetting: (obj: getSettingObj) => void;

    /**
     * - ## 打开设置页面，返回用户设置过的授权结果。
     * - 基础库 1.3.0 开始支持本方法，这是一个异步方法。
     * - 设置页面只包含用户请求过的[权限](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/authorization/authorization/)。
     * - 与 [tt.getSetting](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/set/tt-get-setting) 的区别是，openSetting 会打开设置页面，而 getSetting 只会返回用户授权的设置信息
     */
    openSetting: (obj: getSettingObj) => void;

    /**
     * - ## 获取已登录用户的基本信息或特殊信息。
     * - 首次使用的用户会弹出授权提示窗，若用户同意，则会返回用户的真实数据。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - ***警告->用户信息获取规则已调整，参考 [公告](https://developer.open-douyin.com/forum/mini-game/post/63354a56b1d3de363093289d)。***
     * - 本API依赖于[tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/log-in/tt-login/)，请确保调用前已经调用了该API
     * - 本API需要用户授权方可调用，详细信息可参考[用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/other/user-authorization/)
     */
    getUserInfo: (obj: getUserInfoObj) => void;

    /**
     * - ## 拉起实名认证窗口。
     * - 基础库 1.80.0 开始支持本方法，这是一个异步方法。
     * - 调用该接口前请确保用户已登录。
     * - 当前用户是否已经实名认证可以通过 [tt.getUserInfo](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/info/tt-get-user-info) 查询。
     */
    authenticateRealName: (obj: callbackObj) => void;

    /**
     * - ## 监听实名认证成功
     * - 在用户未实名的情况下，打开游戏后会主动弹出实名认证弹框，用户完成认证后会回调该方法。
     * - 基础库 2.25.0 开始支持本方法，这是一个同步方法。
     * @param callback 是一个回调函数，接收 object 类型的参数
     * @param res.state 实名认证完成的状态，目前只有一种 'complete'
     */
    onRealNameAuthenticationComplete: (callback: (res: { state: string }) => void) => void;

    /**
     * - ## 提前向用户发出[用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/authorization/authorization)请求。
     * - 该方法不会调用对应接口，只会弹框咨询用户是否授权或者获取用户信息。如果用户之前有授权，该接口直接返回成功，不会跟用户产生交互。
     * - 基础库 1.3.0 开始支持本方法，这是一个异步方法。
     * - 获取用户信息授权（scope.userInfo）前需要先调用 [tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/log-in/tt-login)，否则会出现"authroize:fail invalid session"报错
     */
    authorize: (obj: authorizeObj) => void;

    /**
     * - ## 提供小游戏获取抖音权限的能力，展示出抖音权限授权弹窗。
     * - 基础库 1.93.0 开始支持本方法，这是一个异步方法。
     * - 在使用在接口前，需要小游戏拥有者登录抖音开放平台申请开通小游戏需要的权限，具体路径：控制台 -> 运营 -> 抖音开放能力
     * - 该接口只支持抖音，所以请在抖音 APP 中调用；
     * - 本方法参数及回调比较多，请参考文档：[tt.showDouyinOpenAuth](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/user-information/authorization/tt-show-douyin-open-auth)
     */
    showDouyinOpenAuth: (obj: showDouyinOpenAuthObj) => void;

    /**
     * - ## 在小游戏内调起关注小游戏的引导组件，用于引导用户关注小游戏。
     * - 基础库 1.41.0 开始支持本方法，这是一个异步方法。
     * - 展现策略仅在线上版、审核版有效，测试版、预览版不受限制。
     */
    showFavoriteGuide: (obj: showFavoriteGuideObj) => void;

    /**
     * - ## 监听用户点击右上角菜单中的【收藏】按钮时触发的事件。
     * - 基础库 1.87.0 开始支持本方法，这是一个同步方法。
     * - 当网络波动或者其他情况可能会出现收藏失败。
     * @param callback 是收藏后的回调函数
     * @param isFavorited 值：true：收藏成功，false：收藏失败
     */
    onFavoriteStateChange: (callback: (isFavorited: boolean) => void) => void;

    /**
     * - ## 调起引导用户复访的提示弹窗，目前仅抖音宿主支持。为了更好的玩家体验，建议在按钮的点击回调中使用。
     * - 基础库 2.94.0 开始支持本方法，这是一个异步方法。
     */
    showRevisitGuide: (obj: callbackObj) => void;

    /**
     * - ## 查询用户通过小游戏平台创建的群的信息
     * - 基础库 2.70.0 开始支持本方法，这是一个异步方法。
     * - 如游戏开发者在平台创建了群聊 ABC，那么游戏侧可以基于游戏开发者在这个游戏中的 openid，查询其在小游戏平台创建了哪些群，群的状态如何，做游戏内的加群逻辑优化
     * - 目前仅支持抖音，可以使用 [tt.getSystemInfoSync](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/system-information/tt-get-system-info-sync) 判断宿主
     * - 查询到的群列表只局限在通过游戏创建的群聊或开发者在平台创建的群聊，其他渠道创建的群聊不会返回
     */
    checkGroupInfo: (obj: checkGroupInfoObj) => void;

    /**
     * - ## 在平台创建群聊，获得 groupid 后，游戏内通过这个方法引导用户加入抖音群
     * - 基础库 2.70.0 开始支持本方法，这是一个异步方法。
     * - 使用本 API 前需要先在开发者平台创建群聊获取 groupid。具体可参考[游戏群聊能力接入介绍](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/im-group/groupchatintroduce)
     * - 1.前往开发者平台，「运营 - 运营能力 - 粉丝群能力 」，申请开通能力
     * - 2.扫码绑定抖音号后，点击「新建群聊」以获得对应的群 ID
     * - 目前仅支持抖音及抖音极速版
     * - 该 API 必须要由用户点击触发，只能在 tt.onTouchEnd 的回调里面同步调用该 API
     * - 相关教程[游戏群聊能力接入介绍](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/im-group/groupchatintroduce)
     */
    joinGroup: (obj: joinGroupObj) => void;

    /**
     * - ## 跳转个人抖音号主页，用户可以选择关注/取消关注抖音号。
     * - 基础库 1.84.0 开始支持本方法，这是一个异步方法。
     * - 使用该功能前开发者需要绑定想要查看的抖音号，参考[游戏内关注抖音号能力](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/-retention/follow-douyin/)接入指南
     * - 暂时只支持在抖音及抖音极速版 App 上使用。
     */
    openAwemeUserProfile: (obj: AwemeObj) => void;

    /**
     * - ## 提供从小游戏查看抖音号是否关注的能力。
     * - 基础库 2.70.0 开始支持本方法，这是一个异步方法。
     * - 该功能为抖音专有 API，使用该功能前开发者需要绑定想要查看的抖音号，参考[游戏内关注抖音号能力](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/-retention/follow-douyin/)接入指南
     * - 目前该接口只支持抖音，所以请在抖音或抖音Lite APP中调用
     */
    checkFollowAwemeState: (obj: AwemeObj) => void;

    /**
     * - ## 创建关注头条号按钮。
     * - 基础库 1.19.0 开始支持本方法，这是一个同步方法。
     * - 使用该 API 前需先在平台绑定账号，审核通过才可以使用接口关注账号。具体路径：【开发者平台】-【基础设置】-【关联设置】- 【头条号绑定】
     * - 只支持在今日头条 App 上使用
     */
    createFollowButton: (obj: createFollowButtonObj) => FollowButton;

    /**
     * - ## 查看用户是否已关注小游戏绑定的头条号
     * - 注意：这个头条号是小游戏开发者在开发者平台绑定的官方头条号
     * - 基础库 1.30.0 开始支持本方法，这是一个异步方法。
     * - 使用该功能前开发者需要绑定想要查看的头条号，参考[绑定头条号](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/-retention/binding-toutiao-account/)指南
     */
    checkFollowState: (obj: checkFollowStateObj) => void;

    /**
     * - ## 创建游戏推荐组件实例。
     * - 基础库 2.82.0 开始支持本方法，这是一个同步方法。
     * - 目前仅支持抖音、抖音极速版。
     * - 本接口是同步接口，传入参数不合法时会直接抛出参数错误的异常，请做好处理。
     */
    createGridGamePanel: (obj: createGridGamePanelObj) => GridGamePanel;

    /**
     * - ## 可以将小游戏快捷方式添加到手机桌面上。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     * - 目前仅支持抖音和抖lite，请在其它 app 做屏蔽。
     * - 该 API 必须要由用户点击触发，也就是只能在tt.onTouchEnd的回调里面同步调用该 API。
     */
    addShortcut: (obj: callbackObj) => void;

    /**
     * - ## 检查小游戏快捷方式是否已添加到手机桌面上。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     * - 仅在Android上支持
     */
    checkShortcut: (obj: shortcutObj) => void;

    /**
     * - ## 在关键的游戏场景，设置写入用户的排行榜数据（游戏成绩信息），该数据会上传到服务端。
     * - 基础库 2.70.0 开始支持本方法，抖音&抖lite 23.2.0 版本后支持。，这是一个异步方法。
     */
    setImRankData: (obj: setImRankDataObj) => void;

    /**
     * - ## 获取排行榜列表，调用 API 后， 根据参数自动绘制游戏好友排行榜（ native UI ）。
     * - 基础库 2.70.0 开始支持本方法，抖音&抖lite 23.2.0 版本后支持，这是一个异步方法。
     * - 在拉起排行榜前，需要调用 [tt.login](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/open-interface/log-in/tt-login/) 接口进行用户登录，否则可能会出现榜单无法拉起或闪退的问题
     */
    getImRankList: (obj: getImRankListObj) => void;

    /**
     * - ## 获取排序好的「好友/总榜」数据源，开发者基于数据源自行渲染返回的数据。
     * - 基础库 2.70.0 开始支持本方法，这是一个异步方法。
     * - 该方法需要在开放数据域中使用，请访问 [开放数据域能力介绍](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/relationship-chain/open-data-base/) 进行通信
     */
    getImRankData: (obj: getImRankDataObj) => void;

    /**
     * - ## 在关键的游戏场景，设置写入用户的排行榜数据（游戏成绩信息）,该数据会上传到服务端。
     * - 该方法设置的数据与[tt.setImRankData](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/game-rank/setImRankData)同源，区别在于该方法需要在开放数据域中使用，请访问 [开放数据域能力介绍](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/relationship-chain/open-data-base/) 进行通信
     * - 基础库 2.74.0 开始支持本方法，这是一个异步方法。
     * - 抖音&抖lite 23.4.0 版本后支持
     */
    setImRankDataInOpenContext: (obj: setImRankDataInOpenContextObj) => void;

    /**
     * - ## 自定义启动场景数据上报接口。
     * - 调用该接口上报场景数据（场景需在开发者后台配置）后，开发者可以在 [抖音开放平台](https://developer.open-douyin.com/)，添加游戏的自定义启动场景。
     * - 基础库 2.88.0 开始支持本方法，这是一个异步方法。
     * - 进入「数据」-「性能分析」-「启动监控」-「启动场景配置」模块，添加和看上报数据，进行数据挖掘分析。
     * - 使用前请注意阅读 [相关教程和说明](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/performance-optimization/startup-performance/startup-scene-analysis)。 ​
     */
    reportScene: (obj: reportSceneObj) => void;

    /**
     * - ## 自定义分析数据上报接口.
     * - 调用后，会将数据上报到[抖音开放平台](https://developer.open-douyin.com/).
     * - 基础库 1.8.0 开始支持本方法，这是一个同步方法。
     * - 开发者可以进入抖音开放平台「数据」-「自定义分析」-「事件分析/漏斗分析」模块查看上报数据。
     * - 使用前，需要前往抖音开放平台「数据 - 自定义分析 - 事件管理」中新建事件，配置好事件名与字段。
     * - 使用埋点验证 能力对已有埋点进行上报时，需要使用上传到开发者平台的测试版本、审核版本、线上版本。目前 IDE 预览版本不支持埋点验证。
     * - 相关教程：[事件管理](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/about-data/advanced-analysis/events)
     * @param event 事件名，注意不能超过 110 字符
     * @param data.key 配置中的字段名
     * @param data.value 上报的数据
     */
    reportAnalytics: (event: string, data: Record<string, number | string>) => void;

    /**
     * - ## 调起客户端订阅消息界面，返回用户订阅消息的操作结果。
     * - 当用户勾选了订阅面板中的 “总是保持以上选择，不再询问” 时，或是点击了订阅面板中 “拒绝，不再询问” 时，模板消息会被添加到用户的小程序设置页，用户可以在设置页面进行管理。
     * - 基础库 1.73.0 开始支持本方法，这是一个异步方法。
     * - 当前仅支持抖音宿主
     * - 只允许在以下时机中调用：点击事件、支付回调函数。
     * - 模版分为一次性模版和长期性模版，一次性模版 ID 和长期性模版 ID 不可同时使用。
     * - 版本更新提醒需要单独订阅。与其他混合的情况下会产生 1005 错误。
     * - 订阅功能介绍及使用方式见文档：[订阅消息功能](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/subscribe-message/introduce)。
     */
    requestSubscribeMessage: (obj: requestSubscribeMessageObj) => void;

    /**
     * - ## 判断小游戏的 API、回调、参数、组件等是否在当前版本可用。
     * - 基础库 1.35.0 开始支持本方法，这是一个同步方法。
     * - 不支持 fail 和 complete 回调函数的判断
     * - 纯 number 类型的属性不做支持
     * - 回调函数的名称以文档为准
     * - schema 用来测试的能力，模式为 ${API}.${method}.${param}.${option} 或者 ${component}.${attribute}.${option}
     * - - ${API}：API名字
     * - - ${method}：调用方式，有效值为 return、success、object、callback
     * - - ${param}：参数或者返回值
     * - - ${option}：参数的有效值或者返回值的属性或者组件属性的有效值
     * - - ${component}：组件名字
     * - - ${attribute}：组件属性
     */
    canIUse: (schema: string) => boolean;

    /**
     * - ## 环境变量。
     * - 从基础库 1.0.0 开始支持
     * - Tip：访问本地目录或者本地文件时，需要以 tt.env.USER_DATA_PATH 开头，否则容易出现访问受限的情况。
     * - USER_DATA_PATH 用户数据存储的路径 默认值:'ttfile://user'
     */
    env: { USER_DATA_PATH: string };

    /**
     * - ## 获取全局唯一的版本更新管理器。
     * - 用于管理小游戏更新。小游戏发布新版本后不是立即生效，在个别情况会比较慢。如果想做到立即更新，可以接入该主动更新的能力。
     * - 基础库 1.9.0 开始支持本方法，这是一个同步方法。
     * - 在有新版本的情况下，小游戏运行中任意时候单独使用 applyUpdate 即可立即重启游戏。
     * - 但建议在 onUpdateReady 中给用户提示确认后进行重启。
     */
    getUpdateManager: () => UpdateManager;

    /**
     * - ## 加快触发 JS 引擎 Garbage Collection（垃圾回收）。
     * - GC 时机是 JS 引擎控制的，并不能保证调用后马上触发 GC。
     * - 基础库 1.15.0 开始支持本方法，这是一个同步方法。
     */
    triggerGC: () => void;

    /**
     * - ## 开始监听加速度数据。
     * - 具体加速度数据通过注册 [tt.onAccelerometerChange](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/device/jerkmeter/tt-on-accelerometer-change/) 的回调方法来获取。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     */
    startAccelerometer: (obj: callbackObj) => void;

    /**
     * - ## 停止监听加速度数据。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     */
    stopAccelerometer: (obj: callbackObj) => void;

    /**
     * - ## 监听加速度数据。
     * - 回调的频率为 5 次 / 秒，暂不支持设置。接口调用后会开始监听，可通过 [tt.onStopAccelerometer](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/jerkmeter/tt-stop-accelerometer/) 停止监听。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 如果在调用该方法之前没有调用 [tt.onStartAccelerometer](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/jerkmeter/tt-start-accelerometer/)， 该方法会默认调用一次 [tt.onStartAccelerometer](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/jerkmeter/tt-start-accelerometer/) 方法。
     * @param x 加速度 x 轴
     * @param y 加速度 y 轴
     * @param z 加速度 z 轴
     */
    onAccelerometerChange: (callback: (res: { x: number; y: number; z: number }) => void) => void;

    /**
     * - ## 解绑加速度数据监听器。
     * - 基础库 1.94.0 开始支持本方法，这是一个同步方法。
     * - 不传入callback参数时，会移除所有监听函数
     */
    offAccelerometerChange: (callback?: (res?: any) => void) => void;

    /**
     * - ## 设置系统剪贴板内容。
     * - 可以和 [tt.getClipboardData](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/pasting-board/tt-get-clipboard-data) 配套使用。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     */
    setClipboardData: (obj: setClipboardDataObj) => void;

    /**
     * - ## 获取系统剪贴板内容。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     */
    getClipboardData: (obj: getClipboardDataObj) => void;

    /**
     * - ## 开始监听罗盘数据。
     * - 罗盘数据会在用户手机发生“朝向变化/加速前进&后退/摇一摇”等手势时触发变化。
     * - 基础库 1.2.0 开始支持本方法，这是一个异步方法。
     */
    startCompass: (obj: callbackObj) => void;

    /**
     * - ## 停止监听罗盘数据。
     * - 基础库 1.2.0 开始支持本方法，这是一个异步方法。
     */
    stopCompass: (obj: callbackObj) => void;

    /**
     * - ## 监听罗盘数据变化事件。
     * - 罗盘数据会在用户手机发生“朝向变化/加速前进&后退/摇一摇”等手势时触发变化。
     * - 频率：5 次/秒，接口调用后会自动开始监听，可使用 [tt.stopCompass](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/compass/tt-stop-compass) 停止监听。
     * @param res.direction 面对的方向度数(从朝南方向开始，顺时针转的角度)
     */
    onCompassChange: (callback: (res: { direction: number }) => void) => void;

    /**
     * - ## 解绑罗盘数据变化监听器。
     * - 基础库 1.94.0 开始支持本方法，这是一个同步方法。
     */
    offCompassChange: (callback: (res?: any) => void) => void;

    /**
     * - ## 获取设备当前所处的网络类型。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - networkType 在设备某些无法确定网络类型情况下会返回 "unknown"
     */
    getNetworkType: (obj: getNetworkTypeObj) => void;

    /**
     * - ## 监听网络状态变化。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param res.isConnected 当前是否有网络连接
     * @param res.networkType 网络类型 unknown:不常见的网路类型 wifi:wifi网络 2g:2G网络 3g:3G网络 4g:4G网络 none:无网络
     */
    onNetworkStatusChange: (callback: (res: { networkType: string; isConnected: boolean }) => void) => void;

    /**
     * - ## 移除网络状态变化事件的监听函数。
     * - 基础库 1.91.0 开始支持本方法，这是一个同步方法。
     * - 不传入callback参数时，会移除所有监听函数。
     */
    offNetworkStatusChange: (callback?: () => void) => void;

    /**
     * - ## 监听弱网状态变化事件。
     * - 基础库 3.44.0 开始支持本方法，这是一个同步方法。
     * @param res.weakNet 当前是否处于弱网状态
     * @param res.networkType 网络类型 unknown:不常见的网路类型 wifi:wifi网络 2g:2G网络 3g:3G网络 4g:4G网络 none:无网络
     */
    onNetworkWeakChange: (callback: (res: { weakNet: boolean; networkType: string }) => void) => void;

    /**
     * - ## 移除弱网状态变化事件的监听函数
     * - 基础库 3.44.0 开始支持本方法，这是一个同步方法。
     * - 不传入callback参数时，会移除所有监听函数。
     */
    offNetworkWeakChange: (callback?: () => void) => void;
    3;

    /**
     * - ## 设置是否保持屏幕常亮状态。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 仅在当前小游戏生效，离开小游戏后设置失效。
     */
    setKeepScreenOn: (obj: setKeepScreenOnObj) => void;

    /**
     * - ## 获取屏幕亮度。
     * - 基础库 1.79.0 开始支持本方法，这是一个异步方法
     * - 在没有设置小游戏屏幕亮度的情况下，默认获取系统屏幕亮度
     */
    getScreenBrightness: (obj: getScreenBrightnessObj) => void;

    /**
     * - ## 设置屏幕亮度。
     * - 基础库 1.79.0 开始支持本方法，这是一个异步方法
     */
    setScreenBrightness: (obj: setScreenBrightnessObj) => void;

    /**
     * - ## 使手机发生较短时间的振动。
     * - 安卓震动时间为 30ms，ios 震动时间为 15ms。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 某些机型在不支持短振动时会 fallback 到 vibrateLong，某些机型不支持时会进入 fail 回调。
     */
    vibrateShort: (obj: callbackObj) => void;

    /**
     * - ## 使手机发生较长时间的振动（400 ms)。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     */
    vibrateLong: (obj: callbackObj) => void;

    /**
     * - ## 扫描二维码并返回扫描结果。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 暂不支持 onlyFromCamera 和 scanType。
     * - 返回值不支持 scanType, charSet, path, rawData。
     * - 对于包含 GBK 编码内容的二维码扫描时会有乱码。
     */
    scanCode: (obj: scanCodeObj) => void;

    /**
     * - ## 创建陀螺仪实例，准备获取陀螺仪数据。
     * - 基础库 1.73.0 开始支持本方法，这是一个异步方法。
     */
    startGyroscope: (obj: startGyroscopeObj) => void;

    /**
     * - ## 停止获取陀螺仪数据。
     * - 调用该方法后会销毁陀螺仪实例，并会自动调用 [tt.offGyroscopeChange](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/gyroscope/tt-off-gyroscope-change) 移除陀螺仪监听。
     * - 基础库 1.72.0 开始支持本方法，这是一个同步方法。
     */
    stopGyroscope: (obj: callbackObj) => void;

    /**
     * - ## 监听陀螺仪数据变化。
     * - 数据变化及回调函数被调用的频率取决于启动陀螺仪实例时传入的参数，该方法为同步方法。
     * - 基础库 1.72.0 开始支持本方法，这是一个同步方法。
     */
    onGyroscopeChange: (callback: (res: onGyroscopeChangeObj) => void) => void;

    /**
     * - ## 移除陀螺仪监听。
     * - 但不会停止获取陀螺仪数据。
     * - 基础库 1.72.0 开始支持本方法，这是一个同步方法。
     */
    offGyroscopeChange: (callback?: () => void) => void;

    /**
     * - ## 创建设备方向监听实例，开始监听设备方向的变化。
     * - 基础库 2.92.0 开始支持本方法，这是一个异步方法。
     */
    startDeviceMotionListening: (obj: startDeviceMotionListeningObj) => void;

    /**
     * - ## 销毁设备方向监听实例，停止监听设备方向的变化。
     * - 基础库 2.92.0 开始支持本方法，这是一个异步方法。
     */
    stopDeviceMotionListening: (obj: callbackObj) => void;

    /**
     * - ## 监听设备方向变化事件。
     * - 数据变化及回调的频率根据 [tt.startDeviceMotionListening](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/device-motion/tt-start-device-motion-listening) 的 interval 参数决定。
     * - 基础库 2.92.0 开始支持本方法，这是一个同步方法。
     */
    onDeviceMotionChange: (callback: (res: onDeviceMotionChangeObj) => void) => void;

    /**
     * - ## 移除设备方向变化事件的监听函数。
     * - 但不会停止获取设备方向数据。
     * - 基础库 2.92.0 开始支持本方法，这是一个同步方法。
     * - 若需要停止设备方向数据的获取，可以使用 [tt.stopDeviceMotionListening](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/device/device-motion/tt-stop-device-motion-listening) 方法。
     */
    offDeviceMotionChange: (callback?: () => void) => void;

    /**
     * - ## 向系统日历添加事件。
     * - 基础库 2.52.0 开始支持本方法，这是一个异步方法。
     * - 本 API 需要用户授权方可调用，详细信息可参考[用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/open-capacity/user-information/authorization/authorization)
     * - 该 API 必须要由用户点击触发，也就是只能在 tt.onTouchEnd 的回调里面同步调用该 API。
     */
    addPhoneCalendar: (obj: addPhoneCalendarObj) => void;

    /**
     * - ## 获取设备当前的地理位置。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 该 API 需要用户授权方可调用，详细信息可参考[用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/other/user-authorization)。位置精度和调用耗时会因设备而异。
     * - 该 API 有一定性能消耗，请注意不要频繁调用以防设备过热和耗电过快。小游戏框架也会做相应的节流处理。
     * - 如果要将返回值使用在 [tt.openLocation](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/location/tt-open-location/) 中，必须指定坐标系为 "gcj02"
     */
    getLocation: (obj: getLocationObj) => void;

    /**
     * - ## 取全局唯一的录屏管理器。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * - 该功能只能录制到小游戏全局唯一的上屏 canvas 上的内容，即开发者逻辑所绘制的内容。
     * - 其他的包括客服按钮，任何类型的广告，以及 showToast 等 API 展示的 native 内容，都无法被录制到。
     * - 录屏可以录制游戏音频，但是暂时不支持录制通过 [tt.createOffscreenVideo](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/video/tt-create-offscreen-video/) API 播放的视频声音。
     * - 注意，开发者工具不支持录屏调试，请在真机上调试录屏相关功能。
     */
    getGameRecorderManager: () => GameRecorderManager;

    /**
     * - ## 向端上发出麦克风请求，调起麦克风功能。
     * - 基础库 1.23.0 开始支持本方法，这是一个同步方法。
     * - 对于一些声音类游戏，比如声控游戏，需要在录屏分享时带上麦克风声音，请参考 AudioContext.createMediaStreamSource 方法使用
     * - 本 API 在游戏整个生命周期过程中，应当只被调用一次，如果需要暂停恢复，请配合 [tt.pauseMicroPhone](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/mircophone/tt-pause-microphone) 和 [tt.resumeMicrophone](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/mircophone/tt-resume-microphone) 使用
     * @returns `Promise<number>` 对象，其中数字是一个 stream ID
     */
    requestMicrophone: () => Promise<number>;

    /**
     * - ## 暂停麦克风的使用。
     * - 基础库 2.4.0 开始支持本方法，这是一个同步方法。
     * - 调用该 API 后，会释放麦克风设备权限的占用，建议开发者在不需要麦克风的场景下主动调用，合理使用麦克风权限。
     */
    pauseMicrophone: () => void;

    /**
     * - ## 恢复对系统麦克风的使用。
     * - 基础库 2.4.0 开始支持本方法，这是一个同步方法。
     * - 调用该 API 后，会再次获取麦克风设备的权限。
     */
    resumeMicrophone: () => void;

    /**
     * - ## 创建并返回一个 camera 对象实例。
     * - 基础库 1.40.0 开始支持本方法，低版本需做[兼容处理](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/basic-library/compatibility-description/)。这是一个同步方法。
     * - 注意：camera.start 时会调起相机的授权弹窗，授权后方可使用。
     */
    createCamera: () => Camera;

    /**
     * - ## 获取全局唯一的 recorderManager。
     * - 基础库 1.6.1 开始支持本方法，这是一个同步方法。
     * - 通过 recorderManager 进行录音操作和管理。
     * - 该 api 多次调用时返回的是同一个实例，在多页面使用时，会操作到同一个上下文对象。
     */
    getRecorderManager: () => RecorderManager;

    /**
     * - ## 主动调用转发相关方法（拉起发布器、好友邀请、录屏分享等）
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 参数 options 是一个 ShareParam 对象
     * - 生成的分享链接有效期为 45 天，过期后链接失效
     * - 报错返回 'get shareInfo return null' 时为获取分享信息失败，可能为获取分享信息时网络请求超时。
     * - 或者是当前 appID 的分享状态异常，比如被封禁导致，可以检查站内信或通过运营群进行反馈（接入指南 -[联系我们](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/guide/contactus/feedbacks)）
     * - 相关教程	[内容转发分享](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/ability/gain-user/retweet)
     */
    shareAppMessage: (options: ShareParam) => void;

    /**
     * - ## 显示当前小游戏页面的转发按钮。
     * - 转发按钮位于小游戏页面右上角的“更多”中。
     * - 基础库 1.5.0 开始支持本方法，这是一个异步方法。
     * - 无论调用本 API 前当前页面是否显示转发按钮，调用本 API 均会执行成功回调。
     */
    showShareMenu: (obj?: callbackObj) => void;

    /**
     * - ## 隐藏转发按钮。
     * - 基础库 1.5.0 开始支持本方法，这是一个异步方法。
     * - 无论调用本 API 前当前页面是否显示转发按钮，调用本 API 均会执行成功回调。
     */
    hideShareMenu: (obj?: callbackObj) => void;

    /**
     * - ## 监听用户点击右上角菜单中的“转发”按钮时触发的事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 该方法可以监听用户通过右上角菜单中触发的分享操作，在不同宿主端具体的操作会有所差别，在抖音中包括分享和拍抖音，在头条包括分享和发头条，以此类推。
     * - 该方法的实际调用链路为：
     * - - 开发者注册此事件
     * - - 用户点击小游戏菜单中的分享或者拍抖音等按钮
     * - - 自动调用开发者通过 tt.onShareAppMessage 定义的函数，并传入带有 channel 参数的对象，执行得到该函数的返回对象
     * - - 接着调用 tt.shareAppMessage ，将上一步返回的对象传入其中，拉起分享
     *  - 当开发者发现虽然已成功配置分享内容，但是调试时内容无法生效时，有可能是分享内容触发了内容安全检测失败，导致分享失败。发生这种情况时，开发者可以尝试对分享内容进行内容安全检测，具体操作手段见[内容安全检测](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/content-security/content-security-detect/)
     * @param callback 监听触发“转发”的函数。函数可以返回 ShareParam 对象，该返回对象可以用来自定义分享的内容。
     * @param res.channel 转发内容类型，有 article:在头条内用户点击「发头条 - 发图文」时，video:在头条内用户点击「发头条 - 发视频」时，undefined:其它场景均为 undefined
     */
    onShareAppMessage: (callback: (res: { channel: string }) => ShareParam) => void;

    /**
     * - ## 取消监听用户点击右上角菜单的“转发”按钮时触发的事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    offShareAppMessage: () => void;

    /**
     * - ## 给指定的好友分享游戏信息。
     * - 基础库 2.74.0 开始支持本方法，这是一个异步方法。
     * - 目前仅支持 抖音、抖音极速版 APP
     * - 注意游戏场景，不要过度频繁引导分享：定向分享需要与游戏场景强相关，建议结合游戏内的好友系统、互动系统，会起到事半功倍的效果
     * - 配合“邀请有奖”或“礼物赠送”等功能模式，可以更大程度激发用户的分享意愿（具体实现：通过定向分享能力，入参中传入分享者的 openid（query 字段）。
     * - 结合 [tt.getLaunchOptionsSync](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-get-launch-options-sync/) 或 [tt.onShow](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/lifecycle/tt-on-show/) 获取启动参数中的 query 来判断是否通过分享链接启动的，并给分享人发放对应的奖励）
     */
    shareMessageToFriend: (obj: shareMessageToFriendObj) => void;

    /**
     * - ## 跳转到分享的视频播放页面。
     * - 基础库版本 1.40.0 开始支持本方法
     */
    navigateToVideoView: (obj: navigateToVideoViewObj) => void;

    /**
     * - ## 获取系统信息。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * - 通过 getSystemInfoSync 和 getSystemInfo 获取到的所有宽高单位均为设备的逻辑分辨率，设备的物理分辨率为逻辑分辨率*设备像素比。
     */
    getSystemInfo: (obj: getSystemInfoObj) => void;

    /**
     * - ## 获取系统信息。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 通过 getSystemInfoSync 和 getSystemInfo 获取到的所有宽高单位均为设备的逻辑分辨率，设备的物理分辨率为逻辑分辨率*设备像素比。
     */
    getSystemInfoSync: () => SystemInfo;

    /**
     * - ## 获取小游戏环境信息。
     * - 基础库 2.78.0 开始支持本方法，这是一个同步方法。
     */
    getEnvInfoSync: () => EnvInfo;

    /**
     * - ## 重启小游戏。
     * - 基础库 2.68.0 开始支持本方法，这是一个同步方法。
     */
    restartMiniProgramSync: () => void;

    /**
     * - ## 退出当前小游戏到后台。
     * - 基础库 1.12.0 开始支持本方法，这是一个异步方法。
     * - 调用该方法的预期表现会将小游戏切后台，并不会完全退出小游戏（在 IDE 预览版本表现可能会不一致）。
     * - 正常调用 exitMiniProgram 退出小游戏时，小游戏实际行为和切后台一致，并不会完全关闭小游戏，再次打开小游戏将立即返回之前的状态。
     * - 在传入 isFullExit 时，将完全关闭小游戏，下次打开会重新加载打开小游戏。
     * - isFullExit 为 true 会导致下次打开小游戏的时间变长。
     */
    exitMiniProgram: (obj?: exitMiniProgramObj) => void;

    /**
     * - ## 返回小游戏启动参数。
     * - 基础库 1.12.0 开始支持本方法，低版本需做兼容处理，这是一个同步方法
     */
    getLaunchOptionsSync: () => LaunchOptions;

    /**
     * - ## 监听小游戏回到前台的事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     */
    onShow: (callback: (res: onShowObj) => void) => void;

    /**
     * - ## 监听小游戏隐藏到后台的事件。锁屏、按 HOME 键退到桌面等操作会触发此事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 小游戏隐藏到后台的事件回调。该回调函数没有参数。
     */
    onHide: (callback: (res?: any) => void) => void;

    /**
     * - ## 取消监听小游戏回到前台的事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 小游戏回到前台的事件回调。参数非必填，不传时表示取消所有的回到前台的监听函数。传入对应的回调函数，表示取消当前传入的回到前台的监听函数。
     */
    offShow: (callback?: (res?: any) => void) => void;

    /**
     * - ## 取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面等操作会触发此事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 取消监听事件的回调函数。
     */
    offHide: (callback?: (res?: any) => void) => void;

    /**
     * - ## 全局监听错误事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 是一个回调函数，接收 object 类型的参数
     * @param res.message 错误信息
     * @param res.stack 错误位置
     */
    onError: (callback: (res: { message: string; stack: string }) => void) => void;

    /**
     * - ## 取消监听全局错误事件。
     * - 基础库 1.0.0 开始支持本方法，这是一个同步方法。
     * @param callback 通过 [tt.onError](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/global-event/tt-on-error) 注册的事件回调
     */
    offError: (callback?: () => void) => void;

    /**
     * - ## 开发者可以在小游戏中使用 Video 广告获得收入。
     * - Video 广告是由客户端原生渲染，覆盖在整个小游戏 Canvas 区域之上。
     * - 观看广告时会暂停所有 JS 逻辑。Video 广告展示的时候用户不能操作小游戏。
     * - 接入本能力需要先开通【流量主】能力，请前往小游戏开发者后台在
     * - - 「商业化」>「流量主」申请开通能力在
     * - - 「流量主」>「广告管理」中创建激励视频广告位，获取广告位 id
     * - 建议开发者在广告开发时始终注册 onError 方法的监听，保证对所有广告异常情况的处理。
     * - 广告是全屏展示，由于不同系统的识别有所区别，在 iOS 端，广告的播放和关闭会触发 onShow 和 onHide 事件，安卓则不会。
     * - 但无论是否触发，在激励广告播放期间，游戏逻辑和渲染都会被暂停，用户不能操作小游戏。
     * - Video 广告目前支持竖屏展示。如果是横屏游戏在展示时会先切到竖屏
     */
    createRewardedVideoAd: (obj: createRewardedVideoAdObj) => RewardedVideoAd;

    /**
     * - ## 开发者可以在小游戏中使用 Banner 广告获得收入。
     * - Banner 广告是由客户端原生渲染，覆盖在开发者指定的区域上。
     * - 接入本能力需要先开通【流量主】能力，请前往小游戏开发者后台
     * - - 在「商业化」> 「流量主」申请开通能力
     * - - 在「流量主」> 「广告管理」中创建Banner广告位，获取广告位id
     * - 每个广告实例只会与一条固定的广告素材绑定。开发者如果想要展示另一条广告，需要创建一个新的 bannerAd 实例。
     * - adIntervals 自动刷新并不会保证必须刷新，也不会无限刷新。
     * - 竖屏情况下，Banner 广告 接受的最小宽度是 300（设备像素），最大宽度是 Math.floor(屏幕宽度）。
     * - 横屏情况下，Banner 广告 接受的最小宽度是 128（设备像素），最大宽度是 208（设备像素）。
     * - 开发者可以在这之间自由指定广告宽度。广告组件会自动等比例缩放素材。
     */
    createBannerAd: (obj: createBannerAdObj) => BannerAd;

    /**
     * - ## 创建插屏广告，开发者可以在小游戏中使用插屏广告获得收入。
     * - 插屏广告是由客户端原生渲染，由开发者控制广告组件的显示。
     * - 该能力支持竖屏版和横屏版小游戏。
     * - 基础库 1.71.0 开始支持本方法，这是一个同步方法。
     * - 接入本能力需要先开通【流量主】能力，请前往小游戏开发者后台
     * - - 在「商业化」> 「流量主」申请开通能力
     * - - 在「流量主」> 「广告管理」中创建插屏广告位，获取广告位id
     * - 目前只能在抖音使用该方法，今日头条等宿主暂不支持。
     * - 出现 2002 错误码意味着至少需要等待 30 秒后再重新请求，建议开发者在代码中自行处理。
     * - 插屏广告组件每次创建都会返回一个全新的实例。
     * @param obj.adUnitId 广告单元 id
     */
    createInterstitialAd: (obj: { adUnitId: string }) => InterstitialAd;

    /**
     * - ## 该方法创建一个 Native 按钮，位于小游戏层级最上面，覆盖在小游戏 Canvas 画布上。
     * - 通过该方法创建的按钮在录屏时，不会被采集进录屏画面。
     * - 开发者可以通过创建此类按钮，优化录屏效果，减少录屏画面的元素内容。
     * - 基础库 2.46.0 开始支持本方法，这是一个异步方法。
     * - 按钮不使用时，务必调用 destroy() 释放资源，destroy() 会自动移除监听事件
     */
    createInteractiveButton: (obj: createInteractiveButtonObj) => void;

    /**
     * - ## 显示模态弹窗。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 暂不支持 confirmColor 和 cancelColor 参数。
     * - title 的长度限制：
     * - - android 端限制为 1 行，每行约 13 个汉字。
     * - - iOS 端限制为 3 行，每行约 17 个汉字。
     * - content 的长度限制：
     * - - android 端没有限制，Modal 最高为屏幕高度，内容滚动；
     * - - iOS 端限制为 3 行，每行约 17 个汉字。
     * - 输入参数的 title 和 content 不可同时为空。
     */
    showModal: (obj: showModalObj) => void;

    /**
     * - ## 显示灰色背景的 loading 提示框。
     * - 该提示框不会主动隐藏。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 尚未支持mask参数。
     * - loading 的实现基于 toast，等同于icon为loading，duration为24小时的 toast。
     * - 多次弹出 toast/loading 时，后一个会立刻覆盖前一个。
     */
    showLoading: (obj: showLoadingObj) => void;

    /**
     * - ## 隐藏 loading 提示框。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - loading 的实现基于 toast，所以hideLoading也会将 toast 隐藏。
     */
    hideLoading: (obj: callbackObj) => void;

    /**
     * - ## 显示操作菜单。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - iOS 实现时会自动加入「取消」选项，android 不会。
     * - 每个选项文案长度限制：
     * - - android 没有限制，超长内容滚动。
     * - - iOS 每个选项最多 1 行，每行约 18 个汉字。
     */
    showActionSheet: (obj: showActionSheetObj) => void;

    /**
     * - ## 显示灰色背景的消息提示框。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - 尚未支持 image 和 mask 参数。
     * - 多次弹出 toast/loading 时，后一个会立刻覆盖前一个。
     * - 当显示图标时，最多能够展示 8 个汉字长度。不显示图标时，文本可最多展示 2 行。
     */
    showToast: (obj: showToastObj) => void;

    /**
     * - ## 隐藏灰色背景的消息提示框。
     * - 基础库 1.0.0 开始支持本方法，这是一个异步方法。
     * - loading 的实现基于 toast，所以 hideToast 也会将 loading 隐藏。
     */
    hideToast: (obj: callbackObj) => void;

    /**
     * - ## 获取菜单按钮（右上角胶囊按钮）的布局位置信息。
     * - 坐标信息以屏幕左上角为原点。
     * - 基础库 1.25.0 开始支持本方法，这是一个同步方法。
     */
    getMenuButtonLayout: () => getMenuButtonLayoutObj;
  }
}
