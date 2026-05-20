# 注单记录
**MINI.GAME**服务器时区：**UTC+0** 接入方需注意数据统计的时区计算
## GetGameRecordList <a href="#getgamerecordlist" id="getgamerecordlist"></a>

> 该API接口由MINI.GAME**平台**提供,由**接入方**进行调用

**`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/GetGameRecordList`?trace_id=`**`your`**`_trace_id`
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
| `page`       | integer | 当前页                    |
| `size`       | integer | 查询条数                   |
| `start_time` | integer | 查询起始时间 时间戳             |
| `end_time`   | integer | 查询结束时间 时间戳             |
**start\_time**和**end\_time**如果需要通过日期转换获得,需要用**utc0**时区的日期转换成时间戳
### **请求参数示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
    "uname": "1004613",
    "game_id": "10049",
    "start_time": 0,
    "end_time": 0,
    "page": 1,
    "size": 2
}
```

### **响应参数示例** <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success（special）" %}

```json
//多步押注多返奖游戏
{
    "code": 1,
    "msg": "success",
    "data": [
		{
			"uuid": "f060ca98-9b4e-e0d6-a68c-69d95eee547e",
			"order_id": "c91af8605dc2c24695019e6984610e0280c7a621d0403e73965848bd5909be15",
			"create_time": 1749181074,
			"round_id": 1749181040,
			"account": "10056080126",
			"account_id": "b3a40400fad139084df435f151a224fc",
			"game_id": 3000001,
			"currency": "mmk",
			"win": 11360,
			"enter_money": 19610,
			"after_settlement_money": 30970,
			"bet": 2000,
			"state": 1,
			"action_type": 4
		},
		{
			"uuid": "10d978fd-dce9-ce75-4414-7fe8acd7c580",
			"order_id": "b8bf051636a3e0577b7c3d835b4acc8792b63e0298c492cfc86adc3802afd2fa",
			"create_time": 1749181072,
			"round_id": 1749181040,
			"account": "3023391580",
			"account_id": "631820e6073db67cb58051943092023f",
			"game_id": 3000001,
			"currency": "vnd",
			"win": 606600.122,
			"enter_money": 1820,
			"after_settlement_money": 608420.122,
			"bet": 5000,
			"state": 1,
			"action_type": 4
		},
		{
			"uuid": "77e59435-0d04-6e96-67d4-bb5bee17efdc",
			"order_id": "6b1dea8ed8592b5e0e5b4bf334d38bc2ddb3346680fe734778cab18c758b8d98",
			"create_time": 1749181071,
			"round_id": 1749181040,
			"account": "3023391580",
			"account_id": "631820e6073db67cb58051943092023f",
			"game_id": 3000001,
			"currency": "vnd",
			"win": -569100.122,
			"enter_money": 570920.122,
			"after_settlement_money": 1820,
			"bet": 4000,
			"state": 1,
			"action_type": 3
		},
		{
			"uuid": "2ae1a6ea-5190-6f7e-83b9-6ca4eea2f779",
			"order_id": "f4cdc523cd31e266cdb654493044070c82f220c4eef69d6a443f2dfd21d8e531",
			"create_time": 1749181045,
			"round_id": 1749181040,
			"account": "3023391580",
			"account_id": "631820e6073db67cb58051943092023f",
			"game_id": 3000001,
			"currency": "vnd",
			"win": -5000,
			"enter_money": 575920.122,
			"after_settlement_money": 570920.122,
			"bet": 5000,
			"state": 1,
			"action_type": 1
		},
		{
			"uuid": "3cf86bdf-46c9-410f-7fff-1658d0abe7a4",
			"order_id": "57c9dcf8224c38e7223aa650eaaa426b2aeb8125b2f1815e17d34294a37c2786",
			"create_time": 1749181045,
			"round_id": 1749181040,
			"account": "10056080126",
			"account_id": "b3a40400fad139084df435f151a224fc",
			"game_id": 3000001,
			"currency": "mmk",
			"win": -2000,
			"enter_money": 21610,
			"after_settlement_money": 19610,
			"bet": 2000,
			"state": 1,
			"action_type": 1
		},
		{
			"uuid": "798d0580-b736-28e7-1a5a-2fecd6910beb",
			"order_id": "9d8890d698e92dd6abedb2e163d2ca65f5aca2eeeb147ff828705f4a1025863b",
			"create_time": 1749181045,
			"round_id": 1749181040,
			"account": "3023391580",
			"account_id": "631820e6073db67cb58051943092023f",
			"game_id": 3000001,
			"currency": "vnd",
			"win": -4000,
			"enter_money": 579920.122,
			"after_settlement_money": 575920.122,
			"bet": 4000,
			"state": 1,
			"action_type": 1
		}
	]
}
```

{% endtab %}

{% tab title="success（normal）" %}

```json
{
    "code": 1,
    "msg": "success",
    "data": [
        {
          "uuid": "90a8f45d-2235-4a03-fe54-9d8da76d0bcd",
          "order_id": "9d6d3d4f047f1e8ada91a92feea217d2b87203b95ad4f9c522c470e5c8640b80",
          "create_time": 1749180861,
          "round_id": 1749180860831973,
          "account": "tzyy45_25",
          "account_id": "tzyy45_25",
          "game_id": 2000001,
          "currency": "idr",
          "win": 1.155,
          "enter_money": 13.763,
          "after_settlement_money": 14.918,
          "bet": 1.05,
          "state": 1,
          "action_type": 4
        },
        {
          "uuid": "6ee28ec5-3ca5-122d-1265-94724a515231",
          "order_id": "f35146a79d6c1cab2f7137191f2a9e3648aad6255323013ed976bb3cd7b53943",
          "create_time": 1749180860,
          "round_id": 1749180860831973,
          "account": "tzyy45_25",
          "account_id": "tzyy45_25",
          "game_id": 2000001,
          "currency": "idr",
          "win": -1.05,
          "enter_money": 14.813,
          "after_settlement_money": 13.763,
          "bet": 1.05,
          "state": 1,
          "action_type": 1
        },
        {
          "uuid": "eb2db78f-d579-b45a-80aa-505213084fcb",
          "order_id": "854c047302f319b017a96161a0451a70815eb2c58fa961b54a81a21f2cd3d9dd",
          "create_time": 1749180859,
          "round_id": 1749180859603870,
          "account": "tzyy45_25",
          "account_id": "tzyy45_25",
          "game_id": 2000001,
          "currency": "idr",
          "win": 1.155,
          "enter_money": 13.658,
          "after_settlement_money": 14.813,
          "bet": 1.05,
          "state": 1,
          "action_type": 4
        },
        {
          "uuid": "30377e0c-d22a-d7ac-019e-27f4210a8ea5",
          "order_id": "afd8e85a7f3ba247056d85540f520303f9fa580f67bf06ebd6480b3bb7a963fe",
          "create_time": 1749180859,
          "round_id": 1749180859603870,
          "account": "tzyy45_25",
          "account_id": "tzyy45_25",
          "game_id": 2000001,
          "currency": "idr",
          "win": -1.05,
          "enter_money": 14.708,
          "after_settlement_money": 13.658,
          "bet": 1.05,
          "state": 1,
          "action_type": 1
        }
    ]
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

<table><thead><tr><th>返回值</th><th width="141.79998779296875">是否必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td>Yes</td><td>integer</td><td>状态码</td></tr><tr><td>msg</td><td>Yes</td><td>string</td><td>提示信息</td></tr><tr><td>uuid</td><td>Yes</td><td>string</td><td>注单日志id，</td></tr><tr><td>order_id</td><td>Yes</td><td>string</td><td>注单ID</td></tr><tr><td>account</td><td>Yes</td><td>string</td><td>玩家昵称</td></tr><tr><td>account_id</td><td>Yes</td><td>string</td><td>玩家id</td></tr><tr><td>game_id</td><td>Yes</td><td>integer</td><td>游戏id</td></tr><tr><td>round_id</td><td>Yes</td><td>integer(64)</td><td>牌局id,注单和返奖round_id对应起来</td></tr><tr><td>currency</td><td>Yes</td><td>string</td><td>货币名称，详情查看<a href="/pages/XxEzPcgCbO02nnmZxCo0">货币列表</a>支持的货币的name字段(小写)</td></tr><tr><td>enter_money</td><td>Yes</td><td>decimal</td><td>游戏初始金额</td></tr><tr><td>after_settlement_money</td><td>Yes</td><td>decimal</td><td>结算之后玩家身上的钱</td></tr><tr><td>bet</td><td>Yes</td><td>decimal</td><td>下注金额</td></tr><tr><td>win</td><td>Yes</td><td>decimal</td><td>派奖金额</td></tr><tr><td>create_time</td><td>Yes</td><td>integer</td><td>时间戳</td></tr><tr><td>state</td><td>Yes</td><td>integer</td><td>状态：1成功 /2 失败</td></tr><tr><td>action_type</td><td>Yes</td><td>integer</td><td><p>日志类型：</p><p> 1下注 2取消下注 3 派彩 4 派彩并验证。</p><p>多次派彩时 3 和 4 都是 派彩，4表示这一局游戏最后一次派彩（游戏结束），状态4 唯一</p></td></tr></tbody></table>

如需展示玩家的最终输赢，用 **Win - Bet=玩家的输赢**&#x20;

举例： bet=50，win=10 玩家输赢为：10-50 = -40

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
注单记录更多返回错误代码请查阅 [特殊错误码](/cc/bao-biao-ji-gong-neng-jie-kou/te-shu-cuo-wu-dai-ma.md) 页面描述
---

---
来源：https://docs.mini.game/cc/bao-biao-ji-gong-neng-jie-kou/zhu-dan-ji-lu
