# 转账钱包

## 流程图 <a href="#liu-cheng-tu" id="liu-cheng-tu"></a>

<figure><img src="/files/7kwBQW6rM2yzhn02vCfN" alt=""><figcaption></figcaption></figure>

## Request 参数 <a href="#h3-2-api" id="h3-2-api"></a>
接入方调用MINI.GAME平台所有API调用均需包含
**`POST`** `/`**`MINIGAME_APIURL`**`?trace_id=`**`your`**`_trace_id`

### Header <a href="#header" id="header"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |

签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述

### Body <a href="#body" id="body"></a>

| Name        | Type    | Description       |
| ----------- | ------- | ----------------- |
| `appid`     | string  | 商户的唯一标识,可通过商户后台获得 |
| `timestamp` | integer | 时间戳（秒）            |

***

## Response 参数 <a href="#h3-2-api-1" id="h3-2-api-1"></a>
当接入方返回的http code为200时，为HTTP访问API正常，可正常解析返回结果。其余http错误时为链路异常。
### Header <a href="#header-1" id="header-1"></a>

| Name           | Value                             |
| -------------- | --------------------------------- |
| `Content-Type` | "application/json; charset=utf-8" |

### Body <a href="#body-1" id="body-1"></a>

| 参数名  | 类型      | 说明                   |
| ---- | ------- | -------------------- |
| code | integer | 状态码 `code=1` 时表示调用成功 |
| msg  | string  | 提示信息                 |
| data | object  | 返回的数据                |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
---

---
来源：https://docs.mini.game/cc/huo-qu-zhi-bo-jian-lie-biao-te-shu-jie-kou/zhuan-zhang-qian-bao
