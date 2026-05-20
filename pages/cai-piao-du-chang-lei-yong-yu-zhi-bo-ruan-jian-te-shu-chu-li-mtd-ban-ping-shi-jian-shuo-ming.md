# 《MTD》半屏事件说明

## 1、玩家的下注结果通知

用于平台获取每个玩家的下注信息，然后同步到如直播间里

步骤：op:"Bet",

### data参数说明 <a href="#body" id="body"></a>

| Name        | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gameId`    | number | 游戏ID                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `curGameId` | number | 当前游戏id                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `userId`    | number | 玩家id                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `name`      | string | 三方玩家名称                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `id`        | string | 三方玩家ID                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `amount`    | number | 总下注金额                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `currency`  | string | 货币类型                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `page`      | number | <p>页签编号:</p><p>1:包胆后数; 2:上下正数; 3:上反数; 4:整合; 5:番摊</p>                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sub`       | number | <p><code>page=1</code></p><p>包胆后数:</p><p>1:后2数; 2:后3数; 3:后4数;</p><p><code>page=2</code></p><p>上下正数:</p><p>1:上正2数; 2:上正3数; 3:上正4数; 4:下正2数;</p><p><code>page=3</code></p><p>上反数:</p><p>1:上反3数; 2:上反4数;</p><p><code>page=4</code></p><p>整合:</p><p>1:上跑两数;2:下跑两数;3:鱼虾蟹;</p><p><code>page=5</code></p><p>番摊:</p><p>1:整合; 2:番; 3:念1-2; 4:念3-4; 5:角;</p>                                                                                                                  |
| `currency`  | string | 货币名称（usdt等，详见货币列表）                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `amount`    | number | 下注金额                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `num`       | number | <p>具体下注内容:</p><p><code>page=1</code></p><p>包胆后数:具体的数字<br><code>page=2</code></p><p>上下正数:具体的数字<br><code>page=3</code></p><p>上反数:具体的数字<br><code>page=4</code></p><p>上跑两数:具体的数字<br>下跑两数:具体的数字<br>鱼虾蟹:<br>0:鱼; 1:虾; 2:蟹;<br><code>page=5</code></p><p>整合:<br>1:大; 2:小; 3:单; 4:双;<br>番:<br>1:1番; 2:2番; 3:3番; 4:4番;<br>念1-2:<br>1:1念2; 2:1念3; 3:1念4; 4:2念1; 5:2念3; 6:2念4;<br>念3-4:<br>1:3念1; 2:3念2; 3:3念4; 4:4念1; 5:4念2; 6:4念3;<br>角:<br>1:1-2; 2:1-4; 3:2-3; 4:3-4;</p> |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

<pre class="language-python"><code class="lang-python">{
	action: 'sendData', 
<strong>	data: {
</strong>		op:"Bet",
		data:{
			gameId:123,          //游戏id
			curGameId::123,      //当前的游戏游戏id
			userId:123,          //玩家id
		        name:"name",            //玩家名字
		        id:"12313",              //玩家id
			amount:123,          //下注金额
			currency:"USDT",        //货币类型
			bets:{
				1:{
					page:1,		//页签编号
					sub:1,		//子区域编号
					currency:"usdt",	//货币（usdt...）
					amount:10,		//下注金额
					num:"12",		//具体下注内容
				}
			}[]                   
		}
	}
}
</code></pre>

## 2、开奖结果通知

彩票每期结果通知

步骤：op:"ShowRound",

### data参数说明 <a href="#body" id="body"></a>

| Name      | Type         | Description                                   |
| --------- | ------------ | --------------------------------------------- |
| gameId    | number       | 游戏id                                          |
| `roundId` | number       | 期号                                            |
| `nums`    | string\[]\[] | 开奖结果(索引0\~8依次表示SP,G1,G2,G3,G4,G5,G6,G7,G8的结果) |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

```python
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			gameId:123,			//游戏id
			roundId:202504090002,		//期号
			num:string[][],	//开奖结果G7,G8的结果
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

| Name        | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gameId`    | number | 游戏ID                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `curGameId` | number | 当前游戏id                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `userId`    | number | 玩家id                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `name`      | string | 三方玩家名称                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `id`        | string | 三方玩家ID                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `amount`    | number | 总下注金额                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `currency`  | string | 货币类型                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `page`      | number | <p>页签编号:</p><p>1:包胆后数; 2:上下正数; 3:上反数; 4:整合; 5:番摊</p>                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sub`       | number | <p><code>page=1</code></p><p>包胆后数:</p><p>1:后2数; 2:后3数; 3:后4数;</p><p><code>page=2</code></p><p>上下正数:</p><p>1:上正2数; 2:上正3数; 3:上正4数; 4:下正2数;</p><p><code>page=3</code></p><p>上反数:</p><p>1:上反3数; 2:上反4数;</p><p><code>page=4</code></p><p>整合:</p><p>1:上跑两数;2:下跑两数;3:鱼虾蟹;</p><p><code>page=5</code></p><p>番摊:</p><p>1:整合; 2:番; 3:念1-2; 4:念3-4; 5:角;</p>                                                                                                                  |
| `currency`  | string | 货币名称（usdt等，详见货币列表）                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `amount`    | number | 下注金额                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `num`       | number | <p>具体下注内容:</p><p><code>page=1</code></p><p>包胆后数:具体的数字<br><code>page=2</code></p><p>上下正数:具体的数字<br><code>page=3</code></p><p>上反数:具体的数字<br><code>page=4</code></p><p>上跑两数:具体的数字<br>下跑两数:具体的数字<br>鱼虾蟹:<br>0:鱼; 1:虾; 2:蟹;<br><code>page=5</code></p><p>整合:<br>1:大; 2:小; 3:单; 4:双;<br>番:<br>1:1番; 2:2番; 3:3番; 4:4番;<br>念1-2:<br>1:1念2; 2:1念3; 3:1念4; 4:2念1; 5:2念3; 6:2念4;<br>念3-4:<br>1:3念1; 2:3念2; 3:3念4; 4:4念1; 5:4念2; 6:4念3;<br>角:<br>1:1-2; 2:1-4; 3:2-3; 4:3-4;</p> |

## **示例** <a href="#qing-qiu-can-shu-shi-li" id="qing-qiu-can-shu-shi-li"></a>

<pre class="language-python"><code class="lang-python">{
	action: 'sendData', 
<strong>	data: {
</strong>		op:"Bet",
		data:{
			gameId:123,          //游戏id
			curGameId::123,      //当前的游戏游戏id
			userId:123,          //玩家id
		        name:"name",            //玩家名字
		        id:"12313",              //玩家id
			amount:123,          //下注金额
			currency:"USDT",        //货币类型
			bets:{
				1:{
					page:1,		//页签编号
					sub:1,		//子区域编号
					currency:"usdt",	//货币（usdt...）
					amount:10,		//下注金额
					num:"12",		//具体下注内容
				}
			}[]                   
		}
	}
}
</code></pre>
**跟投玩家下注信息转发步骤一：op:"Bet"的下注信息即可。**
---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/mtd-ban-ping-shi-jian-shuo-ming
