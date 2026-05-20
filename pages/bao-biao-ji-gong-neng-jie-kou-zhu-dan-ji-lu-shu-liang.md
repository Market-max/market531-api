# 注单记录数量
**MINI.GAME**服务器时区：**UTC+0** 接入方需注意数据统计的时区计算
## GetGameRecordCount <a href="#getgamerecordlist" id="getgamerecordlist"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/GetGameRecordCount`?trace_id=`**`your`**`_trace_id`
`{`**`BACKEND_URL`**`}` 为商户后台的API配置界面获取到后台接口调用域名
### Headers <a href="#headers" id="headers"></a>

| 参数        | 所在位置   | 必选 | 类型     | 说明                                            |
| --------- | ------ | -- | ------ | --------------------------------------------- |
| sign      | header | 是  | string | 签名算法见 [签名算法及示例](#qian-ming-suan-fa-ji-shi-li) |
| app\_id   | header | 是  | string | 商户号                                           |
| trace\_id | url    | 是  | string | 每个请求都将有唯一的值                                   |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
### **Body** <a href="#body" id="body"></a>

| Name         | Type    | Description            |
| ------------ | ------- | ---------------------- |
| `uname`      | string  | 用户id，与游戏验证玩家的uname字段匹配 |
| `game_id`    | integer | 游戏id，如果id=0为查询所有游戏     |
| `start_time` | integer | 查询起始时间 时间戳 `UTC+0`     |
| `end_time`   | integer | 查询结束时间 时间戳 `UTC+0`     |
**start\_time**和**end\_time**如果需要通过日期转换获得,需要用**utc0**时区的日期转换成时间戳
### **请求参数示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
    "uname": "1004613",
    "game_id": "10049",
    "start_time": 0,
    "end_time": 0,
}
```

### **响应参数示例** <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "code": 1,
    "msg": "success",
    "data": 10000
}
```

{% endtab %}

{% tab title="fail" %}

```json
{
    "code": 20001,
    "msg": "no merchant"
}
```

{% endtab %}
{% endtabs %}

#### **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

<table><thead><tr><th>返回值</th><th width="141.79998779296875">是否必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td>Yes</td><td>integer</td><td>状态码</td></tr><tr><td>msg</td><td>Yes</td><td>string</td><td>提示信息</td></tr><tr><td>data</td><td>Yes</td><td>integer</td><td>注单记录数量</td></tr></tbody></table>

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
注单记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
---

---
来源：https://docs.mini.game/cc/bao-biao-ji-gong-neng-jie-kou/zhu-dan-ji-lu-shu-liang
