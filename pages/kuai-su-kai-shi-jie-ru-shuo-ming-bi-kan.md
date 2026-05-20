# 接入说明 (必看)

## 商户须知 <a href="#shang-hu-xu-zhi" id="shang-hu-xu-zhi"></a>

* 服务器时区：`UTC+0`，接入方需注意数据统计的时区计算
* 平台返回的token有效期为`七天`，每次重新进入（登录）后 会重新获取
* 审核通过开户要求后，我方将提供商户后台账号，商户可通过后台查看`app_id`（商户号）和 `key`（签名密钥）
* 文档中`{`**`POLY_APIURL`**`}`需替换为在商户后台界面提供的测试/生产环境接口调用地址，查看`商户运营后台-设定-API接入配置-`**`POLY_APIURL`****`，`**&#x4D;INIGAME提供给接入方的接口。
* 文档中`{`**`ACCESS_URL`**`}`配置位置：`商户运营后台-设定-API接入配置-`**`ACCESS_URL`****，用于回调接入方接口。
* 文档中`{`**`BACKEND_URL`**`}`配置位置：`商户运营后台-设定-API接入配置-`**`BACKEND_URL`****，用于接入方查询数据。
* POLY 提供的接口`code=0`表示成功，要求接入方实现的接口`code=1`表示成功


## 公共参数 <a href="#gong-gong-can-shu" id="gong-gong-can-shu"></a>
**POLY**平台调用接入方所有API接口调用均会包含
<table><thead><tr><th width="120">参数</th><th width="131">所处位置</th><th width="101">必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>sign</td><td>header</td><td>是</td><td>string</td><td>签名算法见 <a href="#qian-ming-suan-fa-ji-shi-li">签名算法及示例</a></td></tr><tr><td>trace_id</td><td>url params</td><td>是</td><td>string</td><td>由接入方自己定义生成，每个请求的trace_id都是唯一的值</td></tr></tbody></table>

***

### 签名算法及示例 <a href="#qian-ming-suan-fa-ji-shi-li" id="qian-ming-suan-fa-ji-shi-li"></a>

## **sign=md5(`url上的参数+body中的josn字符串+签名密钥key`)**
**`注意这里的body中的json字符串必须是请求中最原始的body中的字符，不能使用json包转出来之后的字符`，最终使用小写输出**
例如：

| 类型            | 值                                                                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 请求url         | {**`MINIGAME_APIURL`**}/api/Balance/GetBalance?trace\_id=dhf1aboc1iio                                                             |
| 请求方式          | POST                                                                                                                                                                 |
| Content-Type  | "application/json; charset=utf-8"                                                                                                                                    |
| 请求body中json数据 | {“player\_logon\_token”:”b27cfe9b-f01c-11ee-a0b5-000c2901d9cc”,”account\_id”:”1002402”,”timestamp”:1711971655}                                                       |
| 签名密钥key       | 39a6581c31ef3203a22edb2daa2ab6d1                                                                                                                                     |
| 需要md5加密的字符串   | trace\_id=dhf1aboc1iio{“player\_logon\_token”:”b27cfe9b-f01c-11ee-a0b5-000c2901d9cc”,”account\_id”:”1002402”,”timestamp”:1711971655}39a6581c31ef3203a22edb2daa2ab6d1 |
| 最终加密出来md5字符串  | e3f8dc79e875e46f6755ef540c2d24f3                                                                                                                                     |

### **特别说明**
基于性能考量， 使用page和size参数进行分页的时候， 我方并不返回总页数， 需要自行循环至无数据为止，并且一次性查询条数最大为**5000**。
## 调用返回 <a href="#diao-yong-fan-hui" id="diao-yong-fan-hui"></a>

当平台返回的http code为200时，为HTTP访问API正常，可正常解析返回结果。其余http错误时为链路异常。 返回的Content-Type为 **"application/json; charset=utf-8"**

```json
{
    "code": 1,
    "msg": "success",
    "data": {
        "glist": [
            {
                "gameid": "99",
                "name": "POLY",
                "platform": "600",
            }
        ]
    }
}
```

| 参数名  | 类型      | 说明                              |
| ---- | ------- | ------------------------------- |
| code | integer | 错误编码，为1时表示调用正常，接口返回数据将放在data参数中 |
| msg  | string  | 错误信息                            |
| data | object  | 返回的数据                           |
