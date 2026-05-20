# 游戏记录数量

#### 玩家游戏记录数量说明 <a href="#h3-1" id="h3-1"></a>

* 该接口主要用于商户对玩家游戏的游戏记录数量进行查询
* 接口不与上面公共说明有关联
* **MINIGAME**的时区：UTC+0，接入方需注意数据统计的时区计算

## 1. GetGameLogCount <a href="#getgamerecordlist" id="getgamerecordlist"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/GetGameLogCount`?trace_id=`**`your`**`_trace_id`
`{`**`BACKEND_URL`**`}` 为商户后台的API配置界面获取到后台接口调用域名
## 2. 公共参数(平台调用商户所有API调用均需包含) <a href="#h3-2-api" id="h3-2-api"></a>

| 参数        | 所在位置   | 必选 | 类型     | 说明                                            |
| --------- | ------ | -- | ------ | --------------------------------------------- |
| sign      | header | 是  | string | 签名算法见 [签名算法及示例](#qian-ming-suan-fa-ji-shi-li) |
| app\_id   | header | 是  | string | 商户号                                           |
| trace\_id | url    | 是  | string | 每个请求都将有唯一的值                                   |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## 3、接口参数 <a href="#h3-3" id="h3-3"></a>

| 参数          | 所在位置 | 必选 | 类型     | 说明                     |
| ----------- | ---- | -- | ------ | ---------------------- |
| uname       | body | 否  | string | 用户id，与游戏验证玩家的uname字段匹配 |
| game\_id    | body | 否  | Int    | 游戏id，如果id=0为查询所有游戏     |
| start\_time | body | 否  | Int    | 查询起始时间 时间戳`UTC+0`      |
| end\_time   | body | 否  | Int    | 查询结束时间 时间戳`UTC+0`      |

## 4、调用返回 <a href="#id-6-diao-yong-fan-hui" id="id-6-diao-yong-fan-hui"></a>
当商户返回的http code为200时，为HTTP访问API正常，可正常解析返回结果。其余http错误时为链路异常。\
200正常返回时，返回Content-Type为 “application/json;charset=UTF-8”
```json
{
    "code": 1,
    "msg": "success",
    "data":10000
}
```

返回字段描述

<table><thead><tr><th>返回值</th><th width="141.79998779296875">是否必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td>Yes</td><td>integer</td><td>状态码</td></tr><tr><td>msg</td><td>Yes</td><td>string</td><td>提示信息</td></tr><tr><td>data</td><td>Yes</td><td>integer</td><td>游戏记录数量</td></tr></tbody></table>

code不为1时,表示失败

```json
{
    "code": 20001,
    "msg": "no merchant"
}
```

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
游戏记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
---

---
来源：https://docs.mini.game/cc/bao-biao-ji-gong-neng-jie-kou/you-xi-ji-lu-shu-liang
