# 获取产品列表

## LoadList <a href="#loadlist" id="loadlist"></a>

> 该API接口由**POLY 平台**提供,由**接入方**进行调用

`POST` `{`**`POLY_APIURL`**`}/api/game/loadlist`
`{`**`POLY_APIURL`**`}`为**MINI.GAME**接口域名,可通过后台获得
## **Headers** <a href="#headers" id="headers"></a>

| Name                                                           | Value                             |
| -------------------------------------------------------------- | --------------------------------- |
| `Content-Type`                                                 | "application/json; charset=utf-8" |
| `sign` | "your\_sign\_string"              |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name    | Required | Type   | Description                    |
| ------- | -------- | ------ | ------------------------------ |
| `appid` | Yes      | string | <p>商户的唯一标识</p><p>可通过商户后台获得</p> |

### 响应参数示例 <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "glist": [
            {
                "gameid": "99",
                "name": "POLY",
                "platform": "600",
                "gametype": 5,
                "status":1
            }
        ]
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

| 参数名      | 必选 | 类型      | 说明             |
| -------- | -- | ------- | -------------- |
| code     | 是  | integer | 状态码            |
| msg      | 是  | string  | 提示信息           |
| data     | 是  | object  | 返回的数据          |
| glist    | 是  | array   | 游戏列表           |
| gameid   | 是  | string  | 游戏id           |
| name     | 是  | string  | 游戏名称           |
| platform | 是  | string  | 游戏所属平台         |
| gametype | 是  | integer | 游戏类型           |
| status   | 是  | integer | 游戏状态 0:关闭 1:开启 |

### **Platform字段说明** <a href="#platform-zi-duan-shuo-ming" id="platform-zi-duan-shuo-ming"></a>

<table><thead><tr><th width="125">类型</th><th width="155"> 说 明 </th></tr></thead><tbody><tr><td>600</td><td>POLY MARKET</td></tr></tbody></table>


## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述
