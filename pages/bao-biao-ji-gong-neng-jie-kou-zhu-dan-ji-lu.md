# 注单记录
**POLY**服务器时区：**UTC+0** 接入方需注意数据统计的时区计算
## GetGameRecordList <a href="#getgamerecordlist" id="getgamerecordlist"></a>

该API接口由**POLY平台**提供,由**接入方**进行调用 **`POST`** `{`**`BACKEND_URL`**`}/`api/special/outer/record/GetGameRecordList`?trace_id=`**`your`**`_trace_id` `{`**`BACKEND_URL`**`}` 为商户后台的API配置界面获取到后台接口调用域名
### Headers <a href="#headers" id="headers"></a>

| 参数        | 所在位置   | 必选 | 类型     | 说明                                            |
| --------- | ------ | -- | ------ | --------------------------------------------- |
| sign      | header | 是  | string | 签名 |
| app\_id   | header | 是  | string | 商户号                                           |
| trace\_id | url    | 是  | string | 每个请求都将有唯一的值                                   |
签名算法请查阅 [签名算法及示例](#/kuai-su-kai-shi-jie-ru-shuo-ming-bi-kan#qian-ming-suan-fa-ji-shi-li) 页面描述
### **Body** <a href="#body" id="body"></a>

| Name         | Type    | Description            |
| ------------ | ------- | ---------------------- |
| `uname`      | string  | 用户id，与验证玩家的uname字段匹配 |
| `game_id`    | integer | 游戏id：99     |
| `page`       | integer | 当前页                    |
| `size`       | integer | 查询条数                   |
| `start_time` | integer | 查询起始时间 时间戳             |
| `end_time`   | integer | 查询结束时间 时间戳             |
**start\_time**和**end\_time**如果需要通过日期转换获得,需要用**utc0**时区的日期转换成时间戳
### **请求参数示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
    "uname": "1004613",
    "game_id": "99",
    "start_time": 0,
    "end_time": 0,
    "page": 1,
    "size": 2
}
```

### **响应参数示例** <a href="#xiang-ying-can-shu-shi-li" id="xiang-ying-can-shu-shi-li"></a>


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
          "game_id": 99,
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
          "game_id": 99,
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
          "game_id": 99,
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
          "game_id": 99,
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


```json
{
    "code": 20001,
    "msg": "no merchant"
}
```


#### **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

<table><thead><tr><th>返回值</th><th width="141.79998779296875">是否必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>code</td><td>Yes</td><td>integer</td><td>状态码</td></tr><tr><td>msg</td><td>Yes</td><td>string</td><td>提示信息</td></tr><tr><td>uuid</td><td>Yes</td><td>string</td><td>注单日志id，</td></tr><tr><td>order_id</td><td>Yes</td><td>string</td><td>注单ID</td></tr><tr><td>account</td><td>Yes</td><td>string</td><td>玩家昵称</td></tr><tr><td>account_id</td><td>Yes</td><td>string</td><td>玩家id</td></tr><tr><td>game_id</td><td>Yes</td><td>integer</td><td>游戏id:99</td></tr><tr><td>currency</td><td>Yes</td><td>string</td><td>货币名称，"usdt"</td></tr><tr><td>enter_money</td><td>Yes</td><td>decimal</td><td>游戏初始金额</td></tr><tr><td>after_settlement_money</td><td>Yes</td><td>decimal</td><td>结算之后玩家身上的钱</td></tr><tr><td>bet</td><td>Yes</td><td>decimal</td><td>下注金额</td></tr><tr><td>win</td><td>Yes</td><td>decimal</td><td>派奖金额</td></tr><tr><td>create_time</td><td>Yes</td><td>integer</td><td>时间戳</td></tr><tr><td>state</td><td>Yes</td><td>integer</td><td>状态：1成功 /2 失败</td></tr><tr><td>action_type</td><td>Yes</td><td>integer</td><td>日志类型：<p> 1下注 2取消下注 3 派彩 4 派彩并验证</p></td></tr></tbody></table>

如需展示玩家的最终输赢，用 **Win - Bet=玩家的输赢**&#x20;

举例： bet=50，win=10 玩家输赢为：10-50 = -40

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
更多返回错误代码请查阅 [通用错误码 ](#/kuai-su-kai-shi-tong-yong-cuo-wu-ma)页面描述
