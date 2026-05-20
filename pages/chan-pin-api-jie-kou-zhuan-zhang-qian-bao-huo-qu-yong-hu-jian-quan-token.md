# 获取用户鉴权token

## Authorize <a href="#authorize" id="authorize"></a>
该API接口由 **POLY 平台** 提供,由 **接入方** 进行调用 `POST`  { **`POLY_APIURL`** }/api/player/v1/authorize?trace_id=your_trace_id`
 { **`POLY_APIURL`** } 为POLY接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name        | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| `appid`     | string  | <p>商户的唯一标识</p><p>可通过商户后台获得</p> |
| `timestamp` | integer | 时间戳(秒)                         |
| `nickname`  | string  | 用户昵称 最长40个字节                   |
| `uname`     | string  | 用户的id 必须唯一                     |

## **接入方****请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```
{
    "appid": "13",
    "timestamp": 1711954264,
    "nickname": "Kate",
    "uname": "1024",
}
```

## POLY 平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>


```json
{
    "data": {
        "token": "1003803",
        "balance": "42766.25",
        "appid":1024
    },
    "code": 0,
    "msg": "ok"
    }
}
```


```json
{
    "code": 10002,
    "msg": "sign invalid"
}
```



### **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名     | 必选 | 类型      | 说明                                                                                                    |
| ------- | -- | ------- | ----------------------------------------------------------------------------------------------------- |
| data    | 是  | object  | 返回的数据                                                                                                 |
| token   | 是  | string  | 玩家在POLY平台的token，后续操作这个玩家的数据都需要带上这个token，例如:查询玩家余额，给玩家充值等 |
| balance | 是  | decimal | 用户余额 (最多支持4位小数)                                                                                       |
| appid   | 是  | string  | 玩家归属商户的appid                                                                                          |
| code    | 是  | integer | 状态码                                                                                                   |
| msg     | 是  | string  | 提示信息                                                                                                  |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述

