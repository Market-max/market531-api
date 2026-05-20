# 《BingoMega》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name            | Type      | Description                                    |
| --------------- | --------- | ---------------------------------------------- |
| `gameId`        | number    | 游戏ID                                           |
| `curGameId`     | number    | 当前游戏id                                         |
| `userId`        | number    | 玩家id                                           |
| `name`          | string    | 三方玩家名称                                         |
| `id`            | string    | 三方玩家ID                                         |
| `amount`        | number    | 总下注金额                                          |
| `currency`      | string    | 货币类型                                           |
| `bets.betType`  | number    | <p>下注类型:</p><p>1:图形模式,   2:大奖,   3:combo模式</p> |
| `bets.ball`     | number\[] | 下注的25个数字球                                      |
| `bets.currency` | string    | 货币名称（usdt等，详见货币列表）                             |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

<figure><img src="/files/s0YbwfR9GNLJJc7fbggk" alt=""><figcaption></figcaption></figure>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:
		{
			gameId:123,          //下注游戏id
			curGameId:123123,      //当前游戏id
			userId:123123,         //玩家id
		        name:"name",            //玩家名字
		        id:"12312312",              //对局id
			amoung:100,          //下注金额
			currency:"usdt",        //货币类型
			// 下注列表
			bets:{
				betType: 0,		//下注类型
				ball:  [8,22,34,57,66,7,21,45,52,69,4,27,0,51,68,12,30,41,59,72,3,24,36,50,70], //下注的25个数字球
				currency:"usdt",	//货币名称（usdt...）
			}[]
		}
	}
}
```

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `gameId`  | number    | 游戏id        |
| `roundId` | number    | 期号          |
| `nums`    | number\[] | 数字结果展示      |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			gameId = 123,			//游戏id
			roundId:202504090002,		//期号
			nums:[1,3,5,2,6,9]		//数字展示
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

| Name            | Type      | Description                                    |
| --------------- | --------- | ---------------------------------------------- |
| `gameId`        | number    | 游戏ID                                           |
| `curGameId`     | number    | 当前游戏id                                         |
| `userId`        | number    | 玩家id                                           |
| `name`          | string    | 三方玩家名称                                         |
| `id`            | string    | 三方玩家ID                                         |
| `amount`        | number    | 总下注金额                                          |
| `currency`      | string    | 货币类型                                           |
| `bets.betType`  | number    | <p>下注类型:</p><p>1:图形模式,   2:大奖,   3:combo模式</p> |
| `bets.ball`     | number\[] | 下注的25个数字球                                      |
| `bets.currency` | string    | 货币名称（usdt等，详见货币列表）                             |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
	action: 'sendData', 
	data:{
		op:"Follow",
		data:
		{
			gameId:123,          //下注游戏id
			curGameId:123123,      //当前游戏id
			userId:123123,         //玩家id
		        name:"name",            //玩家名字
		        id:"12312312",              //对局id
			amoung:100,          //下注金额
			currency:"usdt",        //货币类型
			// 下注列表
			bets:{
				betType: 0,		//下注类型
				ball:  [8,22,34,57,66,7,21,45,52,69,4,27,0,51,68,12,30,41,59,72,3,24,36,50,70], //下注的25个数字球
				currency:"usdt",	//货币名称（usdt...）
			}[]
		}
	}
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/bingomega-ban-ping-shi-jian-shuo-ming
