# 《Powerball》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name            | Type      | Description                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gameId`        | number    | 游戏ID                                                                                                                                                                                                                                                                                                                                                                              |
| `curGameId`     | number    | 当前游戏ID                                                                                                                                                                                                                                                                                                                                                                            |
| `userId`        | number    | 玩家ID                                                                                                                                                                                                                                                                                                                                                                              |
| `name`          | string    | 商户玩家名称                                                                                                                                                                                                                                                                                                                                                                            |
| `id`            | string    | 商户玩家ID                                                                                                                                                                                                                                                                                                                                                                            |
| `amount`        | number    | 总下注金额                                                                                                                                                                                                                                                                                                                                                                             |
| `currency`      | string    | 货币类型                                                                                                                                                                                                                                                                                                                                                                              |
| `bets.betType`  | number    | <p>下注类型:</p><p>0:双色球,   1:奇偶,   2:白球数字和大区间,   3:白球数字和小区</p><p>间,    4:强力球区间</p>                                                                                                                                                                                                                                                                                                   |
| `bets.white`    | number\[] | 白球下注数字列表                                                                                                                                                                                                                                                                                                                                                                          |
| `bets.red`      | number    | <p><code>betType=0，</code></p><p>  强力球下注的数字</p><p><code>betType=1，</code></p><p>偶数：0，奇数：1；</p><p><code>betType=2，</code></p><p>15-64：0</p><p>65-80：1</p><p>81-130：2</p><p><code>betType=3，</code></p><p>15-35：0；</p><p>36-49：1；</p><p>50-57：2；</p><p>58-65：3；</p><p>66-78：4；</p><p>79-130：5</p><p><code>betType=4，</code></p><p>0-2：0；</p><p>3-4：1；</p><p>5-6：2；</p><p>7-9：3;</p> |
| `bets.currency` | string    | 货币名称（usdt等，详见货币列表）                                                                                                                                                                                                                                                                                                                                                                |
| `bets.amount`   | number    | 下注金额                                                                                                                                                                                                                                                                                                                                                                              |
| `bets.ticket`   | number    | 下注注数                                                                                                                                                                                                                                                                                                                                                                              |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:
		{
			gameId:123,          //下注游戏id
			curGameId:123,       //当前游戏id
			userId:123,          //玩家id
		        name:"name",            //玩家名字
		        id:"12323",              //对局id
			amoung:123,          //下注金额
			currency:"usdt",        //货币类型
			// 下注列表
			bets:{
				betType: 0,		//下注类型
				white: [1,3,5,2,6],	//白球下注数字列表
				red: 9,			//强力球下注数字
				currency:"usdt",	//货币名称（usdt...）
				amount: 0.5,		//下注金额
				ticket: 10,		//注数
			} []
		}
	}
}
```

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `gameId`  | number    | 游戏ID                          |
| `roundId` | number    | 期号                            |
| `nums`    | number\[] | 数字结果展示                        |
| `tags`    | string\[] | 数字综合和区间选择游戏结果展示（奇偶结果，各种区间结果等） |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			roundId:202504090002,		//期号
			nums:[1,3,5,2,6,9],		//数字展示
			tags:["奇","大","E","C"]		//奇大EC（已经本地化多语言了的，直接展示即可）
		} 
	}
}
```

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

## 4、玩家跟投请求

参考demo示意代码：

```json
// Follow-up investment
const FollowUpInvestment = () => {
    if(!postData.data.data){
        return;
    }
    iframe.contentWindow.postMessage(JSON.stringify(postData), '*');
}
```

步骤：op:"Follow",

### data参数说明 <a href="#body" id="body"></a>

| Name            | Type      | Description                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gameId`        | number    | 游戏ID                                                                                                                                                                                                                                                                                                                                                                              |
| `curGameId`     | number    | 当前游戏ID                                                                                                                                                                                                                                                                                                                                                                            |
| `userId`        | number    | 玩家ID                                                                                                                                                                                                                                                                                                                                                                              |
| `name`          | string    | 商户玩家名称                                                                                                                                                                                                                                                                                                                                                                            |
| `id`            | string    | 商户玩家ID                                                                                                                                                                                                                                                                                                                                                                            |
| `amount`        | number    | 总下注金额                                                                                                                                                                                                                                                                                                                                                                             |
| `currency`      | string    | 货币类型                                                                                                                                                                                                                                                                                                                                                                              |
| `bets.betType`  | number    | <p>下注类型:</p><p>0:双色球,   1:奇偶,   2:白球数字和大区间,   3:白球数字和小区</p><p>间,    4:强力球区间</p>                                                                                                                                                                                                                                                                                                   |
| `bets.white`    | number\[] | 白球下注数字列表                                                                                                                                                                                                                                                                                                                                                                          |
| `bets.red`      | number    | <p><code>betType=0，</code></p><p>  强力球下注的数字</p><p><code>betType=1，</code></p><p>偶数：0，奇数：1；</p><p><code>betType=2，</code></p><p>15-64：0</p><p>65-80：1</p><p>81-130：2</p><p><code>betType=3，</code></p><p>15-35：0；</p><p>36-49：1；</p><p>50-57：2；</p><p>58-65：3；</p><p>66-78：4；</p><p>79-130：5</p><p><code>betType=4，</code></p><p>0-2：0；</p><p>3-4：1；</p><p>5-6：2；</p><p>7-9：3;</p> |
| `bets.currency` | string    | 货币名称（usdt等，详见货币列表）                                                                                                                                                                                                                                                                                                                                                                |
| `bets.amount`   | number    | 下注金额                                                                                                                                                                                                                                                                                                                                                                              |
| `bets.ticket`   | number    | 下注注数                                                                                                                                                                                                                                                                                                                                                                              |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
	action: 'sendData', 
	data: {
		op:"Follow",
		data:
		{
			gameId:123,          //下注游戏id
			curGameId:123,       //当前游戏id
			userId:123,          //玩家id
		        name:"name",            //玩家名字
		        id:"12323",              //对局id
			amoung:123,          //下注金额
			currency:"usdt",        //货币类型
			// 下注列表
			bets:{
				betType: 0,		//下注类型
				white: [1,3,5,2,6],	//白球下注数字列表
				red: 9,			//强力球下注数字
				currency:"usdt",	//货币名称（usdt...）
				amount: 0.5,		//下注金额
				ticket: 10,		//注数
			} []
		}
	}
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/powerball-ban-ping-shi-jian-shuo-ming
