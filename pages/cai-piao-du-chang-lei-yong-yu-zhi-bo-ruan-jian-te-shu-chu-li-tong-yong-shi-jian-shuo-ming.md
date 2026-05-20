# 通用事件说明

## 1、显示/隐藏游戏区域请求

事件：op:"ShowGame",

### data参数说明 <a href="#body" id="body"></a>

| Name   | Type    | Description     |
| ------ | ------- | --------------- |
| `show` | boolean | false不显示,true显示 |

```json
{
	action: 'sendData', 
	data: {
		op:"Bet",
		data:{
			show: true	//是否显示游戏区域
		} 
	}
}
```

## 2、关闭游戏游戏返回事件

用于游戏关闭的返回事件

事件：op:"back",

```json
{
	action: 'sendData', 
	data: {
		op:"back"
	}
}
```

## 3、点击半屏上面空白区域响应

用于点击半屏上面空白区域响应关闭游戏（根据情况选择性使用）。

事件：op:"touchBackground",

```json
{
	action: 'sendData', 
	data: {
		op:"touchBackground"
	}
}
```

---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/tong-yong-shi-jian-shuo-ming
