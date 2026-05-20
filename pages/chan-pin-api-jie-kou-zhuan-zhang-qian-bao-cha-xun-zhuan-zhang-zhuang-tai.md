# 查询转账状态

## TransferStatus <a href="#transferstatus" id="transferstatus"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`MINIGAME_APIURL`**`}/api/cash/v1/transfer/status?trace_id=`**`your`**`_trace_id`

`{`**`MINIGAME_APIURL`**`}`为MINI.GAME接口域名,可通过后台获得

### **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |

签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述

### **Body** <a href="#body" id="body"></a>

| Name        | Type    | Description                                                                                                                                                        |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appid`     | string  | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                                                                                                                     |
| `timestamp` | integer | 时间戳(秒)                                                                                                                                                             |
| `token`     | string  | 用户在**MINI.GAME**平台的token,可以通过[获取玩家鉴权token接口](/cc/chan-pin-api-jie-kou/zhuan-zhang-qian-bao/huo-qu-yong-hu-jian-quan-token.md)获得 |
| `tx_id`     | string  | 由接入方调用转账接口产生的转账流水id                                                                                                                                                |

### **接入方请求参数示例** <a href="#jie-ru-fang-qing-qiu-can-shu-shi-li" id="jie-ru-fang-qing-qiu-can-shu-shi-li"></a>

```json
{
    "appid": "1005",
    "timestamp": 1711954264,
    "token": "50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGUiOjE3MTk2Mjk2NDQsInVzZXIiOiJ7XCJpZFwiOjM1NzE0MSxcIm9wZXJhdGVyX2lkXCI6MSxcImFnZW50X2lkXCI6MTAwMDIwLFwiYXBwX2lkXCI6MTAzMSxcImFjY291bnRfdHlwZVwiOjAsXCJ2YWx1ZVwiOlwiMVwiLFwibm93X2dhbWVfaWRcIjowfSJ9.tXfaavxZu7PIedpJ5Tp7oL0aBEnb5ujok4cbKWoNj0U"
}
```

## MINI.GAME平台响应参数示例 <a href="#omg-ping-tai-xiang-ying-can-shu-shi-li" id="omg-ping-tai-xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "data": {
        "currency":"usdt",
        "amount": "4299.1",
        "state":1
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

### **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名      | 必选  | 类型      | 说明                                                                  |
| -------- | --- | ------- | ------------------------------------------------------------------- |
| data     | Yes | object  | 返回数据                                                                |
| currency | Yes | string  | 货币名称，详情查看[货币列表](/cc/kuai-su-kai-shi/huo-bi-lie-biao.md)支持的货币的name字段 |
| amount   | Yes | decimal | 转账金额(最多支持4位小数)                                                      |
| state    | Yes | integer | <p>转账状态</p><p>0:失败 1:成功 2:Pending</p>                               |
| code     | Yes | integer | 状态码                                                                 |
| msg      | Yes | string  | 提示信息                                                                |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
---

---
来源：https://docs.mini.game/cc/chan-pin-api-jie-kou/zhuan-zhang-qian-bao/cha-xun-zhuan-zhang-zhuang-tai
