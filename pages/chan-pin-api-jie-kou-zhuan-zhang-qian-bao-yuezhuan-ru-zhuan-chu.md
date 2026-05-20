# 余额转入/转出

## Transfer <a href="#transfer" id="transfer"></a>

> 该API接口由 **POLY平台** 提供,由 **接入方** 进行调用 **`POST`**  { **`MINIGAME_APIURL`** }/api/cash/v1/transfer?trace_id= **`your`**`_trace_id`
 { **`POLY_APIURL`** } 为POLY接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name        | Type             | Description                                                                                                                                                        |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appid`     | string           | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                                                                                                                     |
| `timestamp` | integer          | 时间戳(秒)                                                                                                                                                             |
| `token`     | string           | 用户在**POLY**平台的token,可以通过[获取玩家鉴权token接口](#/chan-pin-api-jie-kou-zhuan-zhang-qian-bao-huo-qu-yong-hu-jian-quan-token)获得 |
| currency    | string           | 货币名称，"usdt"                                                                                                |
| `amount`    | string (decimal) | <p>转账的金额(最多支持4位小数)</p><p>正数加钱，负数扣钱</p>                                                                                                                             |
| `tx_id`     | string           | 转账的流水id，由接入方产生，必须唯一                                                                                                                                                |

## **接入方请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```json
{
    "appid": "13",
    "timestamp": 1711954264,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGUiOjE3MTk2Mjk2NDQsInVzZXIiOiJ7XCJpZFwiOjM1NzE0MSxcIm9wZXJhdGVyX2lkXCI6MSxcImFnZW50X2lkXCI6MTAwMDIwLFwiYXBwX2lkXCI6MTAzMSxcImFjY291bnRfdHlwZVwiOjAsXCJ2YWx1ZVwiOlwiMVwiLFwibm93X2dhbWVfaWRcIjowfSJ9.tXfaavxZu7PIedpJ5Tp7oL0aBEnb5ujok4cbKWoNj0U",
    "currency":"usdt",
    "amount":"1000.01",
    "tx_id":"etx0917yn"
}
```

## POLY平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>


```json
{
    "data": {
        "tx_id":"etx0917yn",
        "ptx_id":"1024",
        "state":1
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

| 参数名     | 必选 | 类型      | 说明                                                                                                              |
| ------- | -- | ------- | --------------------------------------------------------------------------------------------------------------- |
| data    | 是  | object  | 返回的数据                                                                                                           |
| tx\_id  | 是  | string  | 由接入方传递的流水id                                                                                                     |
| ptx\_id | 是  | string  | POLY平台返回的流水id,由POLY平台产生 |
| state   | 是  | integer | 转账状态 0:失败 1:成功 2:Pending(非1均代表失败)                                                                               |
| code    | 是  | integer | 状态码                                                                                                             |
| msg     | 是  | string  | 提示信息                                                                                                            |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述
