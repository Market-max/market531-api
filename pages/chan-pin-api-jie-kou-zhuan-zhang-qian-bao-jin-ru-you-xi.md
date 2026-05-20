# 进入游戏

## Entergame <a href="#entergame" id="entergame"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`MINIGAME_APIURL`**`}/api/game/v1/entergame?trace_id=`**`your`**`_trace_id`
`{`**`MINIGAME_APIURL`**`}`为MINI.GAME接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name                                                                                                                        | Type         | Description                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appid`                                                                                                                     | string       | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                                                                                                                     |
| `timestamp`                                                                                                                 | integer      | 时间戳(秒)                                                                                                                                                             |
| `token`                                                                                                                     | string       | 用户在**MINI.GAME**平台的token,可以通过[获取玩家鉴权token接口](/cc/chan-pin-api-jie-kou/zhuan-zhang-qian-bao/huo-qu-yong-hu-jian-quan-token.md)获得 |
| `currency`                                                                                                                  | string       | 货币名称，详情查看[货币列表](/cc/kuai-su-kai-shi/huo-bi-lie-biao.md)支持的货币的name字段                                                                                                |
| `gameid`                                                                                                                    | string       | 进入的游戏id                                                                                                                                                            |
| `lang`                                                                                                                      | string `非必填` | 游戏语言，默认为en                                                                                                                                                         |
| `screen_mode`                                                                                                               | string       | 游戏类型为彩票游戏才需要传送屏幕模式，1=>竖向全屏，2=>半屏( 显示在手机屏幕下半部分)，3=>横向全屏                                                                                                             |
| `channel`                                                                                                                   | string       | <p>多人游戏（目前仅支持 平台 lottery 和 casino）;<br>channel 是一个特殊参数（默认不传），它用来支持                                                                                                 |
| <br>Special treatment for lottery games 接口的通知分组，用于直播间不同游戏的通知，如果你不使用Special treatment for lottery games 系列接口，那么可以忽略这个参数.</p> |              |                                                                                                                                                                    |

## **接入方请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```json
{
    "appid": "13",
    "token": "50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "currency":"usdt",
    "lang": "en",
    "gameid": "9",
    "timestamp": 1711954264,
    "channel":"1"
}
```

## MINI.GAME平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "data": {
        "gameurl":"https://***.mini.game?xxx=xxx"
    },
    "code": 0,
    "msg": "ok"
}
```

{% endtab %}

{% tab title="fail" %}

```json
{
    "code": 10002,
    "msg": "sign invalid"
}
```

{% endtab %}
{% endtabs %}

## **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名     | 必选 | 类型      | 说明                                                                                                                                            |
| ------- | -- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| data    | 是  | object  | 返回的数据                                                                                                                                         |
| gameurl | 是  | string  | 打开游戏客户端的url，打开游戏客户端的url.彩票类型的游戏，半屏的时候需要添加底部安全区域，需要url里添加bh=height。height为底部安全区高度像素 |
| code    | 是  | integer | 状态码                                                                                                                                           |
| msg     | 是  | string  | 提示信息                                                                                                                                          |

### ★彩票游戏添加底部安全区域说明★：
用于部分手机机型添加底部安全区域高度。
gameurl返回参数： https\://\[url]?\[param]\ 如：可调整为 https\://\[url]?bh=50&\[param] ，为底部安全区高度为50像素.

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
---

---
来源：https://docs.mini.game/cc/chan-pin-api-jie-kou/zhuan-zhang-qian-bao/jin-ru-you-xi
