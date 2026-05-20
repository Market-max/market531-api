# 获取用户余额

## GetBalance <a href="#getbalance" id="getbalance"></a>

该API接口由 **接入方** 提供 **POLY 平台** 进行调用`POST` { **`ACCESS_URL`** }/api/balance/get_balance?trace_id=minigame_trace_id { **`ACCESS_URL`** }为接入方后台填写的回调地址
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                             |
| -------------- | ----------------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                                 |
| `sign`         | "sign\_string" |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述

## **Body** <a href="#body" id="body"></a>

<table><thead><tr><th>Name</th><th width="197">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>app_id</code></td><td>string</td><td><p>商户的唯一标识</p><p>可通过商户后台获得</p></td></tr><tr><td><code>game_id</code></td><td>integer <code>非必填</code></td><td>游戏id</td></tr><tr><td><code>player_login_token</code></td><td>string<code>非必填</code></td><td>接入方上传的用户token，登录凭证，/api/user/verify_session接口验证成功的token</td></tr><tr><td><code>uname</code></td><td>string</td><td>接入方提供的用户id</td></tr><tr><td><code>currency</code></td><td>string</td><td>货币名称，"USDT"</td></tr><tr><td><code>timestamp</code></td><td>integer</td><td>时间戳(秒)</td></tr></tbody></table>

## MINI.GAME**请求参数示例** <a href="#omg-qing-qiu-can-shu-shi-li" id="omg-qing-qiu-can-shu-shi-li"></a>

```
{
    "app_id": "13",
    "player_login_token": "50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "uname": "1003803",
    "game_id": 99,
    "currency":"usdt",
    "timestamp": 1711954264
}
```

## 接入方响应参数示例 <a href="#jie-ru-fang-xiang-ying-can-shu-shi-li" id="jie-ru-fang-xiang-ying-can-shu-shi-li"></a>

```json
{
    "data": {
        "balance": "4299.1"
    },
    "code": 1,
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

## **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

平台方只记录余额的数值，具体货币单位根据接入方后台选择为准

| 参数名     | 必选 | 类型               | 说明            |
| ------- | -- | ---------------- | ------------- |
| data    | 是  | object           | 返回数据          |
| balance | 是  | string (decimal) | 余额 (最多支持4位小数) |
| code    | 是  | integer          | 状态码           |
| msg     | 是  | string           | 提示信息          |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述
