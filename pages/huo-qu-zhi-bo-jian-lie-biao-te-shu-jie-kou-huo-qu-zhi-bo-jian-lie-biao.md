# 获取直播间列表

## LoadList <a href="#loadlist" id="loadlist"></a>

> 该API接口由**MINI.GAME平台**提供,由**接入方**进行调用

`POST` `{`**`MINIGAME_APIURL`**`}/api/live/list`
`{`**`MINIGAME_APIURL`**`}`为**MINI.GAME**接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name                                                           | Value                             |
| -------------------------------------------------------------- | --------------------------------- |
| `Content-Type`                                                 | "application/json; charset=utf-8" |
| `sign` | "your\_sign\_string"              |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name    | Required | Type   | Description                    |
| ------- | -------- | ------ | ------------------------------ |
| `appid` | Yes      | string | <p>商户的唯一标识</p><p>可通过商户后台获得</p> |

### 响应参数示例 <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "list": [
            {
                "roomId": 10001,
                "open": 1762496786,
                "labels": "1,2,3",
                "title": "roomtitle",
                "cover":"http://mini.game/xxx.png",
                "name":"myname",
                "gameId":101,
                "gameName":"powerball",
                "cost":0,
                "mode":0,
                "battle":0,
                "ball":0,
            }
        ]
    }
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

| 参数名      | 必选 | 类型      | 说明                         |
| -------- | -- | ------- | -------------------------- |
| code     | 是  | integer | 状态码                        |
| msg      | 是  | string  | 提示信息                       |
| data     | 是  | object  | 返回的数据                      |
| list     | 是  | array   | 直播列表                       |
| roomId   | 是  | integer | 房间号                        |
| open     | 是  | integer | 开播时间，时间戳                   |
| labels   | 是  | string  | 房间标签 多选形式 “1,2,3,4,5”      |
| title    | 是  | string  | 房间标题                       |
| cover    | 是  | string  | 房间封面                       |
| name     | 是  | string  | 房间主播名                      |
| gameId   | 是  | integer | 游戏id                       |
| gameName | 是  | string  | 游戏名称                       |
| cost     | 是  | integer | 房间价格                       |
| mode     | 是  | integer | 收费方式,0:免费,1:一次性收费,2:每分钟收费, |
| battle   | 是  | integer | 是否PK                       |
| ball     | 是  | integer | 接入玩具                       |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
---

---
来源：https://docs.mini.game/cc/huo-qu-zhi-bo-jian-lie-biao-te-shu-jie-kou/huo-qu-zhi-bo-jian-lie-biao
