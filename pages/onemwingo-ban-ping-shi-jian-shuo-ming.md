# 《OneMWinGo》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name                                                                                                     | Type                    | Description                                       |
| -------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------- |
| `gameId`                                                                                                 | number                  | 游戏ID                                              |
| `curGameId`                                                                                              | number                  | 当前游戏id                                            |
| `userId`                                                                                                 | number                  | 玩家id                                              |
| `name`                                                                                                   | string                  | 三方玩家名称                                            |
| `id`                                                                                                     | string                  | 三方玩家ID                                            |
| `amount`                                                                                                 | number                  | 下注金额                                              |
| `currency`                                                                                               | string                  | 货币名称（usdt等，详见货币列表）                                |
| `bets.blance`                                                                                            | \[{blance,currency}...] | <p>blance<br>玩家余额<br><br>currency<br>玩家余额货币类型</p> |
| `bets.bets`                                                                                              | \[{bet,multi}...]       | <p>区域编号。<br>1:点数;2:颜色;3:大小;4:单双;<br>              |
| <br>对应区域的索引。<br>点数：0-9；颜色：1-3 对应（红，紫，绿）；大小：1小2大；单双：1单2双；<br><br>bet:注数</p><p><br>multi:倍数(投注阶段只是占位数据</p> |                         |                                                   |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:{
                        gameId: 202,
                        curGameId: 202,
                        userId: 123,
                        name: "张三",
                        id: "123456",
                        amount: 10,
                        currency: "usdt",
                        bets: [{
                                amount: 10,
                                currency: "usdt",
                                balance: {
                                    balance: 100,
                                    currency: "usdt"
                                },
                                bets: [{
                                        bet: 1,
                                        multi: 0
                                    }, {
                                        bet: 2,
                                        multi: 1
                                    }, ...]
                            }, ...]
                        }
	}
}
```

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name      | Type   | Description     |
| --------- | ------ | --------------- |
| `roundId` | number | 期号              |
| `nums`    | number | 开奖数值展示0到9任意一个数值 |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			gameId:123123			//游戏id
			roundId:202504090002,		//期号
			nums:1				//开奖数值展示0到9任意一个数值。
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

| Name                                                                                                     | Type                    | Description                                       |
| -------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------- |
| `gameId`                                                                                                 | number                  | 游戏ID                                              |
| `curGameId`                                                                                              | number                  | 当前游戏id                                            |
| `userId`                                                                                                 | number                  | 玩家id                                              |
| `name`                                                                                                   | string                  | 三方玩家名称                                            |
| `id`                                                                                                     | string                  | 三方玩家ID                                            |
| `amount`                                                                                                 | number                  | 下注金额                                              |
| `currency`                                                                                               | string                  | 货币名称（usdt等，详见货币列表）                                |
| `bets.blance`                                                                                            | \[{blance,currency}...] | <p>blance<br>玩家余额<br><br>currency<br>玩家余额货币类型</p> |
| `bets.bets`                                                                                              | \[{bet,multi}...]       | <p>区域编号。<br>1:点数;2:颜色;3:大小;4:单双;<br>              |
| <br>对应区域的索引。<br>点数：0-9；颜色：1-3 对应（红，紫，绿）；大小：1小2大；单双：1单2双；<br><br>bet:注数</p><p><br>multi:倍数(投注阶段只是占位数据</p> |                         |                                                   |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data:{
		op:"Bet",
		data:{
                        gameId: 202,
                        curGameId: 202,
                        userId: 123,
                        name: "张三",
                        id: "123456",
                        amount: 10,
                        currency: "usdt",
                        bets: [{
                                amount: 10,
                                currency: "usdt",
                                balance: {
                                    balance: 100,
                                    currency: "usdt"
                                },
                                bets: [{
                                        bet: 1,
                                        multi: 0
                                    }, {
                                        bet: 2,
                                        multi: 1
                                    }, ...]
                            }, ...]
                        }
	}
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/onemwingo-ban-ping-shi-jian-shuo-ming
