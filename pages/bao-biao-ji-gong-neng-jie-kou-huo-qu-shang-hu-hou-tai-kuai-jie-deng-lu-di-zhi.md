# 获取商户后台快捷登录地址

## 1. SimulatedLoginUrl <a href="#getgamerecordlist" id="getgamerecordlist"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/SimulatedLoginUrl`?trace_id=`**`your`**`_trace_id`
`{`**`BACKEND_URL`**`}` 为商户后台的API配置界面获取到后台接口调用域名
## 2. 公共参数(平台调用商户所有API调用均需包含) <a href="#h3-2-api" id="h3-2-api"></a>

| 参数        | 所在位置   | 必选 | 类型     | 说明                                            |
| --------- | ------ | -- | ------ | --------------------------------------------- |
| sign      | header | 是  | string | 签名算法见 [签名算法及示例](#qian-ming-suan-fa-ji-shi-li) |
| app\_id   | header | 是  | string | 商户号                                           |
| trace\_id | url    | 是  | string | 每个请求都将有唯一的值                                   |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## 3、接口参数 <a href="#h3-3" id="h3-3"></a>

| 参数   | 所在位置 | 必选  | 类型      | 说明              |
| ---- | ---- | --- | ------- | --------------- |
| time | body | Yes | integer | 查询时间 时间戳`UTC+0` |

## 4、调用返回 <a href="#id-6-diao-yong-fan-hui" id="id-6-diao-yong-fan-hui"></a>
当商户返回的http code为200时，为HTTP访问API正常，可正常解析返回结果。其余http错误时为链路异常。\
200正常返回时，返回Content-Type为 “application/json;charset=UTF-8”
<pre class="language-json"><code class="lang-json">{
  "code": 1,
  "msg": "success",
  "data": {
    "url": "http://manager_bus.mini.game/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEzMTAwMSwiaXNfYWRtaW4iOjAsIm5hbWUiOiJnZ19zaF8wMDAxIiwib3BlcmF0ZWRfaWQiOjAsInBhc3N3b3JkIjoiJDJhJDEwJC9rNC5pUUgwWDJtUzJhV3NIVjZrYS5GT25tdzlSVFBQNjRBRGE0UXhhUU54eVlRZC5IeDdLIiwiaXNzIjoic2xhdmUiLCJzdWIiOiJ0b2tlbiIsImV4cCI6MTc0NTQxMDk2MiwiaWF0IjoxNzQ1MzI0NTYyfQ.4s0CrdNeZhWceSvz8RMU7Cq92uMShV2ay_u4kHz0nO8"
<strong>   }
</strong>}
</code></pre>

返回字段描述

<table><thead><tr><th width="175.4000244140625">返回值</th><th></th><th width="94">是否必出</th><th width="105.5999755859375">类型</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td></td><td>是</td><td>integer</td><td>状态码</td></tr><tr><td>msg</td><td></td><td>是</td><td>string</td><td>提示信息</td></tr><tr><td>data</td><td></td><td>是</td><td>object</td><td></td></tr><tr><td></td><td>url</td><td>是</td><td>string</td><td>商户后台登录地址</td></tr></tbody></table>

code不为1时,表示失败

```json
{
  "code": 10401,
  "msg": "token error",
  "data": null
}
```

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
游戏记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
---

---
来源：https://docs.mini.game/cc/bao-biao-ji-gong-neng-jie-kou/huo-qu-shang-hu-hou-tai-kuai-jie-deng-lu-di-zhi
