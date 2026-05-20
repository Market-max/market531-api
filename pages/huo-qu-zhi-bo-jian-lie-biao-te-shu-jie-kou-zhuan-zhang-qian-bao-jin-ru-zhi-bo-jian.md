# 进入直播间

## Entergame <a href="#entergame" id="entergame"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`MINIGAME_APIURL`**`}/api/live/enter`
`{`**`MINIGAME_APIURL`**`}`为MINI.GAME接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name       | Type         | Description                                                         |
| ---------- | ------------ | ------------------------------------------------------------------- |
| `appId`    | string       | 商户的唯一标识,可通过商户后台获得,给定参考的平台是有ip白名单的,他可以通过ip绑定上该请求是那个商户                |
| `token`    | string       | 登录token                                                             |
| `currency` | string       | 货币名称，详情查看[货币列表](/cc/kuai-su-kai-shi/huo-bi-lie-biao.md)支持的货币的name字段 |
| `lang`     | string `非必填` | 游戏语言，默认为en                                                          |
| `roomId`   | integer      | 房间号                                                                 |

## **接入方请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```json
{
    "appId":"2000001",
    "token":"50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "currency":"usdt",
    "lang":"en",
    "roomId":6396885064
}
```

## MINI.GAME平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "data": {
        "url":"https://***.mini.game?xxx=xxx"
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

| 参数名  | 必选 | 类型      | 说明       |
| ---- | -- | ------- | -------- |
| data | 是  | object  | 返回的数据    |
| url  | 是  | string  | 客户端跳转url |
| code | 是  | integer | 状态码      |
| msg  | 是  | string  | 提示信息     |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
---

---
来源：https://docs.mini.game/cc/huo-qu-zhi-bo-jian-lie-biao-te-shu-jie-kou/zhuan-zhang-qian-bao/jin-ru-zhi-bo-jian
