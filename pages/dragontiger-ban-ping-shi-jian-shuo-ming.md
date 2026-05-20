# 《DragonTiger》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `gameId`    | number    | 游戏ID               |
| `curGameId` | number    | 当前游戏id             |
| `userId`    | number    | 玩家id               |
| `name`      | string    | 三方玩家名称             |
| `id`        | string    | 三方玩家ID             |
| `amount`    | number    | 总下注金额              |
| `bets`      | number\[] | 下注列表 \[龙0,虎1,和2]   |
| `ticket`    | number    | 投注倍数               |
| `currency`  | string    | 货币名称（usdt等，详见货币列表） |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:[
			{
				gameId:number,          //下注游戏id
				curGameId:number,       //当前游戏id
				userId:number,          //玩家id
			        name:string,            //玩家名字
			        id:string,              //对局id
				amount:number,          //下注金额
				bets:  [0,1,2], //下注列表 [龙0,虎1,和2]
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

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| gameId    | number    | 游戏id        |
| `roundId` | number    | 期号          |
| `nums`    | number\[] | 数字结果展示      |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			gameId:123123			//游戏id
			roundId:202504090002,		//期号
			nums:[0]		//数字开奖号码（龙0,虎1,和2）
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

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `gameId`    | number    | 游戏ID               |
| `curGameId` | number    | 当前游戏id             |
| `userId`    | number    | 玩家id               |
| `name`      | string    | 三方玩家名称             |
| `id`        | string    | 三方玩家ID             |
| `amount`    | number    | 总下注金额              |
| `bets`      | number\[] | 下注列表 \[龙0,虎1,和2]   |
| `ticket`    | number    | 投注倍数               |
| `currency`  | string    | 货币名称（usdt等，详见货币列表） |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:[
			{
				gameId:number,          //下注游戏id
				curGameId:number,       //当前游戏id
				userId:number,          //玩家id
			        name:string,            //玩家名字
			        id:string,              //对局id
				amount:number,          //下注金额
				bets:  [0,1,2], //下注列表 [龙0,虎1,和2]
				ticket: 10,		//投注倍数
				currency:"usdt",	//货币名称（usdt...）
				 
			}
		 ]
	}
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/dragontiger-ban-ping-shi-jian-shuo-ming
