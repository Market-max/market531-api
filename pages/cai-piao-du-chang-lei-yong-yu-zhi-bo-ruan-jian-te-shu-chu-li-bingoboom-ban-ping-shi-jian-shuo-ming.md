# 《BingoBoom》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name       | Type         | Description        |
| ---------- | ------------ | ------------------ |
| `gameId`   | number       | 游戏ID               |
| `name`     | string       | 商户玩家名称             |
| `id`       | string       | 商户玩家ID             |
| `bets`     | number\[]\[] | 下注列表               |
| `ticket`   | number       | 投注倍数               |
| `currency` | string       | 货币名称（usdt等，详见货币列表） |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:[
			{
				gameId:number,                  //游戏id
				name:"hhsayy22"			//商户玩家名称
				id:"12132111313",		//商户玩家id
				
				bets:  [[2,23,41,65,76,4,24,47,64,81,10,32,54,63,87],
            				[2,24,42,64,76,3,35,51,68,77,13,36,54,72,80],
           			        [10,19,46,55,81,13,32,51,64,86,17,36,52,66,87]], //下注的数字球，举例如3组卡牌，每组卡牌的具体数字
				ticket: 10,		//投注倍数
				currency:"usdt",	//货币名称（usdt...）
				 
			}
		 ]
	}
}
```

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name       | Type                 | Description                          |
| ---------- | -------------------- | ------------------------------------ |
| `id`       | string               | 商户玩家ID                               |
| `name`     | string               | 商户玩家名称                               |
| `roundId`  | number               | 期号                                   |
| `draw`     | number\[]            | 30个数字展示                              |
| `extra`    | {\[k:number]:number} | 额外球kv，k:30开始，表示第30个球，一共10个额外球，30-39号 |
| `currency` | string               | 货币名称（usdt等，详见货币列表）                   |
| `money`    | number               | 该玩家本次赢取金额                            |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

<pre class="language-python"><code class="lang-python">{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			id:"12132111313",		//商户玩家id
			name:"hhsayy22"			//商户玩家名称
			roundId:202504090002,		//期号
			draw:[1, 16, 38, 15, 32, 77, 13, 8, 51, 22, 55, 47, 35, 21, 34, 12, 44, 6, 31, 69, 67, 87, 62, 65, 89, ....]//30个数字展示
			extra{
<strong>				30: 39, 31: 50, 32: 71, 33: 48, 34: 83, 35: 36, 36: 28, 37: 85, 38: 82
</strong><strong>				},       //额外球kv，k:30开始，表示第30个球，一共10个额外球，30-39号
</strong>			currency:"usdt,			//货币名称（usdt...）
			money:0.05			//玩家本次赢取金额
		} 
	}
}
</code></pre>

## 3、赢钱玩家赢钱金额通知

用于直播间同步赢钱玩家金额

步骤：op:"Reward",

### data参数说明 <a href="#body" id="body"></a>

| Name       | Type   | Description        |
| ---------- | ------ | ------------------ |
| `id`       | string | 三方玩家ID             |
| `name`     | string | 三方玩家名称             |
| `userId`   | number | 游戏玩家ID             |
| `channel`  | string | 频道名称               |
| `gameID`   | number | 游戏ID               |
| `amount`   | number | 金额                 |
| `currency` | string | 货币名称（usdt等，详见货币列表） |
| `multi`    | number | 倍数                 |
| `payout`   | number | 奖金                 |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Reward",
		data:{
			userId:123,   // 游戏玩家ID
			id:123,       // 三方玩家ID
			name:"PlayerName", // 三方玩家名称
			channel:"Channel",// 频道名称
			gameID:10001,// 游戏ID
			amount:1,// 金额
			currency:"usdt", // 货币类型
			multi:1,// 倍数
			payout:1,// 奖金
		} 
	}
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/bingoboom-ban-ping-shi-jian-shuo-ming
