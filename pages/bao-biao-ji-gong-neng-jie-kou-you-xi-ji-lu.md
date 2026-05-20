# 游戏记录

#### 玩家游戏记录说明 <a href="#h3-1" id="h3-1"></a>

* 该接口主要用于商户对玩家游戏的游戏记录进行查询
* 接口不与上面公共说明有关联
* **MINIGAME**的时区：UTC+0，接入方需注意数据统计的时区计算

## 1. GetGameLogList <a href="#getgamerecordlist" id="getgamerecordlist"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/GetGameLogList`?trace_id=`**`your`**`_trace_id`
`{`**`BACKEND_URL`**`}` 为商户后台的API配置界面获取到后台接口调用域名
## 2. 公共参数(平台调用商户所有API调用均需包含) <a href="#h3-2-api" id="h3-2-api"></a>

| 参数        | 所在位置   | 必选 | 类型     | 说明                                            |
| --------- | ------ | -- | ------ | --------------------------------------------- |
| sign      | header | 是  | string | 签名算法见 [签名算法及示例](#qian-ming-suan-fa-ji-shi-li) |
| app\_id   | header | 是  | string | 商户号                                           |
| trace\_id | url    | 是  | string | 每个请求都将有唯一的值                                   |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## 3、接口参数 <a href="#h3-3" id="h3-3"></a>

| 参数          | 所在位置 | 必选 | 类型      | 说明                     |
| ----------- | ---- | -- | ------- | ---------------------- |
| uname       | body | 否  | string  | 用户id，与游戏验证玩家的uname字段匹配 |
| game\_id    | body | 否  | integer | 游戏id，如果id=0为查询所有游戏     |
| page        | body | 是  | integer | 当前页                    |
| size        | body | 是  | integer | 查询条数                   |
| start\_time | body | 否  | integer | 查询起始时间 时间戳             |
| end\_time   | body | 否  | integer | 查询结束时间 时间戳             |

## 4、调用返回 <a href="#id-6-diao-yong-fan-hui" id="id-6-diao-yong-fan-hui"></a>
当商户返回的http code为200时，为HTTP访问API正常，可正常解析返回结果。其余http错误时为链路异常。\
200正常返回时，返回Content-Type为 “application/json;charset=UTF-8”
```json
{
    "code": 1,
    "msg": "success",
    "data": [
        {
            "uuid": "1806264170304233472",
            "create_time": 1719481910,
            "round_id": 1806264170304233472,
            "game_id": 10049,
            "account": "2024627172",
            "account_id": "1004613",
            "platform": "1",
            "usdt_exchange_rate": "1.0",
            "currency":"usdt",
            "bet": 1.0,
            "valid_bet": 1.0,
            "win": 0.0,
            "fee": 0.0,
            "enter_money": 50049.92,
            "after_settlement_money": 50049.92,
            "ip":"127.0.0.1",
            "uid":"100000001",
            "game_step": 0,
            "game_log" : ""
        },
        {
            "uuid": "1806264170304233472",
            "create_time": 1719481910,
            "round_id": 1806264170304233472,
            "game_id": 10049,
            "account": "2024627172",
            "account_id": "1004613",
            "platform": "1",
            "usdt_exchange_rate": "1.0",
            "currency":"usdt",
            "bet": 1.0,
            "valid_bet": 1.0,
            "win": 0.0,
            "fee": 0.0,
            "enter_money": 50049.92,
            "after_settlement_money": 50049.92,
            "ip":"127.0.0.1",
            "uid":"100000001",
            "game_step": 0,
            "game_log" : ""
        }
    ]
}
```

返回字段描述

<table><thead><tr><th width="175.4000244140625">返回值</th><th width="94">是否必出</th><th width="105.5999755859375">类型</th><th width="78.4000244140625">长度</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td>是</td><td>integer</td><td></td><td>状态码</td></tr><tr><td>msg</td><td>是</td><td>string</td><td></td><td>提示信息</td></tr><tr><td>uuid</td><td>是</td><td>string</td><td></td><td>日志唯一id</td></tr><tr><td>create_time</td><td>是</td><td>integer</td><td></td><td>时间戳</td></tr><tr><td>round_id</td><td>是</td><td>integer</td><td>64</td><td>牌局id</td></tr><tr><td>game_id</td><td>是</td><td>integer</td><td>32</td><td>游戏id</td></tr><tr><td>account</td><td>是</td><td>string</td><td>45</td><td>玩家昵称</td></tr><tr><td>account_id</td><td>是</td><td>string</td><td>45</td><td>玩家id</td></tr><tr><td>platform</td><td>是</td><td>string</td><td>20</td><td>游戏品牌</td></tr><tr><td>usdt_exchange_rate</td><td>是</td><td>string</td><td>45</td><td>记录时所使用货币的usdt汇率</td></tr><tr><td>currency</td><td>是</td><td>string</td><td>20</td><td>货币名称，详情查看<a href="/pages/XxEzPcgCbO02nnmZxCo0">货币列表</a>支持的货币的name字段</td></tr><tr><td>bet</td><td>是</td><td>decimal</td><td></td><td>表示下注金额</td></tr><tr><td>valid_bet</td><td>是</td><td>decimal</td><td></td><td>表示有效下注金额（一般情况下和下注金额相同）</td></tr><tr><td>win</td><td>是</td><td>decimal</td><td></td><td>表示派奖金额。</td></tr><tr><td>fee</td><td>是</td><td>decimal</td><td></td><td>服务费。</td></tr><tr><td>enter_money</td><td>是</td><td>decimal</td><td></td><td>表示游戏初始金额</td></tr><tr><td>after_settlement_money</td><td>是</td><td>decimal</td><td></td><td>表示结算之后玩家身上的钱</td></tr><tr><td>ip</td><td>是</td><td>string</td><td>20</td><td>玩家ip地址。</td></tr><tr><td>uid</td><td>是</td><td>string</td><td>20</td><td>平台玩家id。</td></tr><tr><td>game_step</td><td>是</td><td>integer</td><td>20</td><td><p>gamestep=</p><p>1，bet:下注；</p><p>2，dig:玩家局中操作；</p><p>3，：取消下注；</p><p>0，结算</p></td></tr><tr><td>game_log</td><td>是</td><td>string</td><td>200</td><td>游戏内部对象，不同游戏有不同含义。</td></tr></tbody></table>

**特别说明**

**如需展示玩家的最终输赢，用Win - Bet即为玩家的输赢`举例： Bet：50，Win：10 玩家输赢为：10-50 = -40`**

code不为1时,表示失败

```json
{
    "code": 20001,
    "msg": "no merchant"
}
```

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
游戏记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
## 5  GameLog 详细信息查看 <a href="#id-7-error-code" id="id-7-error-code"></a>

> 该详情页面，商户可直接访问，查看该局游戏记录。

**`URL`** `{`**`BACKEND_WEB_URL`**`}/`gamelog?sign=**`sign`**\&round\_id=**`round_id`**\&uid=**`uid`**\&game\_id=**`game_id`**\&app\_id=**`app_id`**\&lang=**`lang`**

<table><thead><tr><th width="137">请求参数</th><th width="91">是否必填</th><th width="101">类型</th><th width="118">说明</th><th></th></tr></thead><tbody><tr><td><strong><code>round_id</code></strong></td><td>是</td><td>string</td><td>游戏对局ID</td><td></td></tr><tr><td><strong><code>uid</code></strong></td><td>是</td><td>string</td><td>日志玩家uID</td><td></td></tr><tr><td><strong><code>game_id</code></strong></td><td>是</td><td>string</td><td>游戏类型id</td><td></td></tr><tr><td><strong><code>app_id</code></strong></td><td>是</td><td>string</td><td>商户app_id</td><td></td></tr><tr><td><strong><code>lang</code></strong></td><td>否</td><td>string</td><td>显示语言</td><td><p>默认英语,</p><p>目前支持语言： </p><p>英语(en),</p><p>法语(fr),</p><p>印尼语(id),</p><p>马来语(ms),</p><p>越南语(vi),</p><p>中文繁体(tw)</p></td></tr><tr><td><strong><code>sign</code></strong></td><td>是</td><td>string</td><td>签名</td><td>签名规则：sign = MD5(app_id=<strong><code>app_id</code></strong>&#x26;game_id=<strong><code>game_id</code></strong>&#x26;round_id=<strong><code>round_id</code></strong>&#x26;uid=<strong><code>uid[appkey]</code></strong>)</td></tr></tbody></table>

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
游戏记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
---

---
来源：https://docs.mini.game/cc/bao-biao-ji-gong-neng-jie-kou/you-xi-ji-lu
