# 进入游戏

## Entergame <a href="#entergame" id="entergame"></a>

该API接口由**POLY平台**提供,由**接入方**进行调用 **`POST`**  { **`POLY_APIURL`** }/api/game/v1/entergame?trace_id= **`your`**`_trace_id`
`{`**`POLY_APIURL`**`}`为POLY接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name                                                                                                                        | Type         | Description                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appid`                                                                                                                     | string       | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                                                                                                                     |
| `timestamp`                                                                                                                 | integer      | 时间戳(秒)                                                                                                                                                             |
| `token`                                                                                                                     | string       | 用户在**POLY**平台的token,可以通过[获取玩家鉴权token接口](#/chan-pin-api-jie-kou-zhuan-zhang-qian-bao-huo-qu-yong-hu-jian-quan-token)获得 |
| `currency`                                                                                                                  | string       | 货币名称，"usdt"                                                                                                |
| `gameid`                                                                                                                    | string       | 游戏id:99                                                                                                                                                            |
| `lang`                                                                                                                      | string `非必填` | 游戏语言，默认为en                                                                                                                                                         |
| `theme`                                                                                                                      | string `非必填` | 游戏主题，1为白色，2为黑色（不传默认是白色）                                                                                                                                                         |

## **接入方请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```json
{
    "appid": "13",
    "token": "50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "currency":"usdt",
    "lang": "en",
    "gameid": "99",
    "timestamp": 1711954264
}
```

## MINI.GAME平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>


```json
{
    "data": {
        "gameurl":"https://***.mini.game?xxx=xxx"
    },
    "code": 0,
    "msg": "ok"
}
```


```json
{
    "code": 10002,
    "msg": "sign invalid"
}
```


## **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名     | 必选 | 类型      | 说明                                                                                                                                            |
| ------- | -- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| data    | 是  | object  | 返回的数据                                                                                                                                         |
| gameurl | 是  | string  | 打开POLY的url |
| code    | 是  | integer | 状态码                                                                                                                                           |
| msg     | 是  | string  | 提示信息                                                                                                                                          |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
