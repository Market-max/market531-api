# 请求进入游戏

## InGame <a href="#ingame" id="ingame"></a>

该API接口由POLY **平台** 提供,由接入方 **进行调用** **`POST`** { **`POLY_APIURL`** }/api/usr/ingame?trace_id= **`your_trace_id`**
`{`**`POLY_APIURL`**`}`为POLY接口域名,可通过后台获得

## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                          |
| `sign`         | "**your**\_sign\_string" |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

| Name                                                                                                                        | Type         | Description                                                                                |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `gameid`                                                                                                                    | string       | 请求进入游戏的游戏id 游戏列表中的gameid字段的值                                                               |
| `token`                                                                                                                     | string       | 用户验证token 用于单一钱包的身份验证接口                                                                    |
| `currency`                                                                                                                  | string       | 货币名称，"USDT"                       |
| `lang`                                                                                                                      | string `非必填` | 游戏语言，默认为en                                                                                 |
| `nick`                                                                                                                      | string       | 用户昵称，最长40个字节                                                                               |
| `appid`                                                                                                                     | string       | <p>商户的唯一标识</p><p>可通过商户后台获得</p>                                                             |

## **请求参数示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
    "gameid":"99",
    "token":"50f15a92-ee8d-11ee-9a61-00ff3fae08f7",
    "currency":"usdt",
    "lang":"en",
    "nick":"6396885064",
    "appid":"3"
}
```

## 响应参数示例 <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>


```python
{
    "code": 0,
    "msg": "success",
    "data": {
        "gameurl": "https://***.XXX.com?xxx=xxx"
    }
}
```


```python
{
    "code": 10002,
    "msg": "sign invalid"
}
```


## **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名     | 必选 | 类型      | 说明                                                                                                                                |
| ------- | -- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| code    | 是  | integer | 状态码                                                                                                                               |
| msg     | 是  | string  | 提示信息                                                                                                                              |
| data    | 是  | object  | 返回的数据                                                                                                                             |
| gameurl | 是  | string  | 打开的url |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述
