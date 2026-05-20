# 用户身份验证

## VerifySession <a href="#verifysession" id="verifysession"></a>

该API接口由 **接入方** 提供给MINI.GAME **平台** 进行调用 **`POST`** { **`ACCESS_URL`** }/api/user/verify_session?trace_id=trace_id`
`{`**`ACCESS_URL`**`}`为接入方后台填写的回调地址，,配置位置：**商户运营后台-设定-API接入配置页面**
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                             |
| -------------- | --------------------------------- |
| `Content-Type` | "application/json; charset=utf-8" |
| `sign`         | "sign\_string"         |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name                      | Type          | Description                                                         |
| ------------------------- | ------------- | ------------------------------------------------------------------- |
| `app_id`                  | string        | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                      |
| `timestamp`               | integer       | 时间戳(秒)                                                              |
| `operator_player_session` | string        | 接入方从ingame接口传递上来的token参数 |
| `ip`                      | string `非必填`  | 用户ip                                                                |
| `custom_parameter`        | string `非必填`  | 接入方需要的额外参数                                                          |
| `game_id`                 | integer `非必填` | 固定数值:99                                                                |

## MINI**请求参数示例** <a href="#omg-qing-qiu-can-shu-shi-li" id="omg-qing-qiu-can-shu-shi-li"></a>

```json
{
    "app_id": "13",
    "timestamp": 1711954264,
    "operator_player_session": "50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "ip": "127.0.0.1",
    "custom_parameter": "",
    "game_id": 99
}
```

## 接入方响应参数示例 <a href="#jie-ru-fang-xiang-ying-can-shu-shi-li" id="jie-ru-fang-xiang-ying-can-shu-shi-li"></a>

```json
{
    "data": {
        "uname": "1003803",
        "nickname": "9999999999",
        "balance":  [{
                        "currency":"usdt",
                        "amount":999.9999
            }]
       },
    "code": 1,
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

| 参数名      | 下级       | 必选 | 类型      | 说明                                                                  |
| -------- | -------- | -- | ------- | ------------------------------------------------------------------- |
| data     | ——       | 是  | object  | 详细数据                                                                |
| uname    | ——       | 是  | string  | 用户的id,必须唯一                                                          |
| nickname | ——       | 是  | string  | 用户呢称                                                                |
| balance  | ——       | 是  | array   | 用户余额 最多支持4位小数                                                       |
| ——       | currency | 是  | String  | 货币名称，"USDT" |
| ——       | amount   | 是  | decimal | 货币数值                                                                |
| code     | ——       | 是  | integer | 状态码                                                                 |
| msg      | ——       | 是  | string  | 提示信息                                                                |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述