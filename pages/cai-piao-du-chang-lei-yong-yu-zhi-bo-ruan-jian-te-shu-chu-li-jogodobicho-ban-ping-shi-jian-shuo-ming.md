# 《JogoDoBicho》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name        | Type      | Description                                                                                                                   |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `gameId`    | number    | 游戏ID                                                                                                                          |
| `curGameId` | number    | 当前的游戏ID(正在玩A游戏，推送了B游戏的下注信息的话：curGameId = A id，gameId = B id)                                                                  |
| `userId`    | number    | 玩家id                                                                                                                          |
| `name`      | string    | 商户玩家名称                                                                                                                        |
| `id`        | string    | 商户玩家ID                                                                                                                        |
| `amount`    | number    | 总下注金额                                                                                                                         |
| `currency`  | string    | 货币类型                                                                                                                          |
| `k`         | number    | <p>下注类型:<br>1：单个动物； 2：双向动物； 3：二联动物；4：三联动物；5：四联动物；6：五联动物；<br>7：千数；8：百数；9：十数；10：个数；11：倒置千数；12：倒置百数；13：倒置十数；14：二联十数；15：三联十数；</p> |
| `amount`    | number    | 下注倍数                                                                                                                          |
| `baseBet`   | string    | 下注的动物ID数字                                                                                                                     |
| `group`     | number\[] | 下注的开奖的数字(1-7)                                                                                                                 |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

<pre class="language-python"><code class="lang-python">{
    action: 'sendData', 
    op:"Bet",
<strong>    data:{
</strong>        gameId:123,          //游戏id
	curGameId::123,      //当前的游戏游戏id
	userId:123,          //玩家id
        name:"name",            //玩家名字
        id:"12313",              //玩家id
	amount:123,          //下注金额
	currency:"USDT",        //货币类型
        //下注kv队列
        bets:{
            1:{
                amount: 1;    //下注倍数
                baseBet: [1,2];  //下注动物id数字
                group: [2,5];  //下面的区域
            }[]
         }
      }
<strong>}
</strong></code></pre>

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| gameId    | number    | 游戏id        |
| `roundId` | number    | 期号          |
| `nums`    | string\[] | 7个结果数字展示    |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			gameId:123123			//游戏id
			roundId:202504090002,		//期号
			num:["1234","1234","1234","1234","1234","1234","123"],	//7个结果数字展示
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

| Name      | Type      | Description                                                                                                                   |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`      | string    | 三方玩家ID                                                                                                                        |
| `name`    | string    | 三方玩家名称                                                                                                                        |
| `userId`  | number    | 游戏玩家ID                                                                                                                        |
| `gameID`  | number    | 游戏ID                                                                                                                          |
| `k`       | number    | <p>下注类型:<br>1：单个动物； 2：双向动物； 3：二联动物；4：三联动物；5：四联动物；6：五联动物；<br>7：千数；8：百数；9：十数；10：个数；11：倒置千数；12：倒置百数；13：倒置十数；14：二联十数；15：三联十数；</p> |
| `amount`  | number    | 下注倍数                                                                                                                          |
| `baseBet` | string\[] | 货币名称（usdt等，详见货币列表）                                                                                                            |
| `group`   | number\[] | 下注的开奖的数字(1-7)                                                                                                                 |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```json
{
    action: 'sendData', 
    op:"Bet",
    data:{
        gameId:123,          //游戏id
	curGameId::123,      //当前的游戏游戏id
	userId:123,          //玩家id
        name:"name",            //玩家名字
        id:"12313",              //玩家id
	amount:123,          //下注金额
	currency:"USDT",        //货币类型
        //下注kv队列
        bets:{
            1:{
                amount: 1;    //下注倍数
                baseBet: [1,2];  //下注动物id数字
                group: [2,5];  //下面的区域
            }[]
         }
      }
}
```
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/jogodobicho-ban-ping-shi-jian-shuo-ming
