# 改变用户余额
这个接口只会在余额有变动的时候调用，例如下注扣钱调用一次，派奖调用一次，验证结束调用一次。每一次调用都有type字段指明调用原因。
## ChangeBalance <a href="#changebalance" id="changebalance"></a>

> 该API接口由 **接入方** 提供 MINI.GAME**平台** 进行调用

`POST` `{`**`ACCESS_URL`**`}/api/balance/change_balance?trace_id=`**`minigame`**`_trace_id`
`{`**`ACCESS_URL`**`}`为接入方后台填写的回调地址
## **Headers** <a href="#headers" id="headers"></a>

| Name           | Value                                                           |
| -------------- | --------------------------------------------------------------- |
| `Content-Type` | "application/json; charset=utf-8"                               |
| `sign`         | "**minigame**\_sign\_string" |
签名算法请查阅 [签名算法及示例](/cc/kuai-su-kai-shi/jie-ru-shuo-ming-bi-kan.md#qian-ming-suan-fa-ji-shi-li) 页面描述
## **Body** <a href="#body" id="body"></a>

<table><thead><tr><th>Name</th><th width="161">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>app_id</code></td><td>string</td><td><p>商户的唯一标识</p><p>可通过商户后台获得</p></td></tr><tr><td><code>player_login_token</code></td><td>string <code>非必填</code></td><td>接入方上传的用户token,登录凭证，/api/user/verify_session接口验证成功的token</td></tr><tr><td><code>uname</code></td><td>string</td><td>接入方提供的用户id</td></tr><tr><td><code>currency</code></td><td>string</td><td>货币名称，详情查看<a href="/pages/XxEzPcgCbO02nnmZxCo0">货币列表</a>支持的货币的name字段</td></tr><tr><td><code>money</code></td><td>decimal</td><td>余额变动（正、负）</td></tr><tr><td><code>game_id</code></td><td>integer</td><td>游戏id</td></tr><tr><td><code>session_id</code></td><td>string</td><td>游戏局号 每局游戏会产生的唯一识别</td></tr><tr><td><code>order_id</code></td><td>string</td><td>订单号,每次有金额改变会产生的唯一编号(长度最长64位)</td></tr><tr><td><code>timestamp</code></td><td>integer</td><td>时间戳(秒)</td></tr><tr><td><code>bet</code></td><td>decimal</td><td>下注金额,该值始终为正数,只有在玩家下注时才会有值</td></tr><tr><td><code>type</code></td><td>integer</td><td>1:游戏下注; 2:取消下注; 3:对局中返奖; 4:对局结束验证; ； 详见下方 <a href="#type-zi-duan-shuo-ming"><strong>type类型说明</strong>*</a></td></tr><tr><td><code>end_round</code></td><td>bool</td><td>当前局是否结束</td></tr><tr><td><code>cancel_order_id</code></td><td>string</td><td>仅当type=2时有值，表示取消的是哪一笔订单</td></tr><tr><td><code>award_order_ids</code></td><td>array</td><td>仅当type=3时有值，表示这一轮所有注单的派奖金额,详见下方 <a href="#awardorderids-zi-duan-shuo-ming"><strong>award_order_ids参数说明</strong>*</a></td></tr></tbody></table>

## **MINI.GAME请求参数示例** <a href="#omg-qing-qiu-can-shu-shi-li" id="omg-qing-qiu-can-shu-shi-li"></a>

```json
{
    "app_id": "10013",
    "bet": 3,
    "game_id": 74,
    "currency":"usdt",
    "money": -3,
    "order_id": "20240716195311drxaoz1mxx6g",
    "player_login_token": "66de94a2-4368-11ef-a0be-581122c6f6d4",
    "session_id": "1813180074526625845",
    "timestamp": 1721130791,
    "uname": "1006417",
    "end_round": false,
    "type": 1,
    "cancel_order_id": "",
    "award_order_ids": null
}
```

## 接入方响应参数示例 <a href="#jie-ru-fang-xiang-ying-can-shu-shi-li" id="jie-ru-fang-xiang-ying-can-shu-shi-li"></a>

{% tabs %}
{% tab title="success" %}

```json
{
    "data": {
        "balance": "4289.1"
    },
    "code": 1,
    "msg": "ok"
}
```

{% endtab %}

{% tab title="fail" %}

```json
{
    "code": 10001,
    "msg": "balance is not enough"
}
```

{% endtab %}
{% endtabs %}

## **成功返回示例的参数说明** <a href="#cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming" id="cheng-gong-fan-hui-shi-li-de-can-shu-shuo-ming"></a>

| 参数名     | 必选 | 类型      | 说明           |
| ------- | -- | ------- | ------------ |
| data    | 是  | object  | 返回数据         |
| balance | 是  | decimal | 余额(最多支持4位小数) |
| code    | 是  | integer | 状态码          |
| msg     | 是  | string  | 提示信息         |

## 错误码 <a href="#cuo-wu-ma" id="cuo-wu-ma"></a>
## 更多返回错误代码请查阅 [通用错误码 ](/cc/kuai-su-kai-shi/tong-yong-cuo-wu-ma.md)页面描述
***

#### **\*award\_order\_ids 字段说明** <a href="#awardorderids-zi-duan-shuo-ming" id="awardorderids-zi-duan-shuo-ming"></a>
award\_order\_ids是一个数组类型，里面存的是一个对象

对象的字段如下 更多请查看 [游戏返奖](#type3-you-xi-dui-ju-zhong-fan-jiang) 示例
| 参数名       | 必选 | 类型              | 说明   |
| --------- | -- | --------------- | ---- |
| order\_id | 是  | string          | 注单id |
| money     | 是  | string(decimal) | 派奖金额 |

### **\*type 字段说明** <a href="#type-zi-duan-shuo-ming" id="type-zi-duan-shuo-ming"></a>
每个type对应的都是一次http调用
* 流程举例说明：
  1. **游戏下注**→**游戏返奖并通知游戏对局结束**；对应type1→4；玩家在游戏投注，没有多次奖励，返奖后，进行牌局技术验证。此情况适用大部分游戏流程（单次返奖流程）；
  2. **游戏下注**→**取消下注**；对应type1→2；玩家在游戏内进行投注，对局开始前自主取消下注 （mini类的游戏无法自主取消下注，spribe平台切换游戏时，会自动取消下注）
  3. **游戏下注→有中奖→对局中返奖→对局中返奖→对局中返奖········→游戏返奖并游戏通知对局结束**；对应type1→3→3→········→4；
* **特殊说明：**\
  ①②一般为百人场、miniGame类游戏；取消下注的session\_id与下注的session\_id一致；\
  ③玩家在游戏内进行投注，此局中奖1次或多次直到对局结束；此种情况一般为连消类slot、slot游戏进入特殊玩法、彩票类游戏；

***

## minigame请求ChangeBalance接口示例参数举例 <a href="#omg-qing-qiu-changebalance-jie-kou-shi-li-can-shu-ju-li" id="omg-qing-qiu-changebalance-jie-kou-shi-li-can-shu-ju-li"></a>

#### **type=1 用户下注**

```json
{
    "app_id": "10013",
    "bet": "3",
    "game_id": 74,
    "money": "-3",
    "order_id": "20240716195311drxaoz1mxx6g",
    "player_login_token": "66de94a2-4368-11ef-a0be-581122c6f6d4",
    "session_id": "1813180074526625845",
    "timestamp": 1721130791,
    "uname": "1006417",
    "end_round": false,
    "type": 1,
    "cancel_order_id": "",
    "award_order_ids": null
}
```

#### **type=2 用户取消下注**

```json
{
    "app_id": "13",
    "player_login_token": "4533126b-f5af-11ee-9a0f-000c2901d9cc",
    "uname": "1033201",
    "money": "10000",
    "game_id": 100001,
    "session_id": "1777333924821798912",
    "order_id": "10920408215323di4cal9or8ji",
    "timestamp": 1712584403,
    "bet": "0",
    "type": 2,
    "end_round": false,
    "cancel_order_id":"20240408215323di4cal9or8jk",
    "award_order_ids":null
}
```

#### **type=3 游戏对局中返奖**

```json
{
    "app_id": "10013",
    "bet": "0",
    "game_id": 100001,
    "money": "33.66",
    "order_id": "20240715204114drtuiv8r7ny8",
    "player_login_token": "6049348c-42a7-11ef-a0bd-581122c6f6d4",
    "session_id": "24713",
    "timestamp": 1721047274,
    "uname": "1006415",
    "end_round": false,
    "type": 3,
    "cancel_order_id": "",
    "award_order_ids": [
        {
            "order_id": "20240715204030drtugi3tau4g",
            "money": "5.1"
        },
        {
            "order_id": "20240715204053drtuhqp0jthc",
            "money": "10.2"
        },
        {
            "order_id": "20240715204104drtuibx5hlhc",
            "money": "18.36"
        }
    ]
}
```

#### **type=4 中奖并通知接入方对局结束**

```json
{
    "app_id": "10013",
    "bet": "0",
    "game_id": 100001,
    "money": "33.66",
    "order_id": "20240715204114drtuiv8r7ny8",
    "player_login_token": "6049348c-42a7-11ef-a0bd-581122c6f6d4",
    "session_id": "24713",
    "timestamp": 1721047274,
    "uname": "1006415",
    "end_round": false,
    "type": 4,
    "cancel_order_id": "",
    "award_order_ids": [
        {
            "order_id": "20240715204030drtugi3tau4g",
            "money": "5.1"
        },
        {
            "order_id": "20240715204053drtuhqp0jthc",
            "money": "10.2"
        },
        {
            "order_id": "20240715204104drtuibx5hlhc",
            "money": "18.36"
        }
    ]
}
```

---

---
来源：https://docs.mini.game/cc/chan-pin-api-jie-kou/dan-yi-qian-bao/gai-bian-yong-hu-yu-e
