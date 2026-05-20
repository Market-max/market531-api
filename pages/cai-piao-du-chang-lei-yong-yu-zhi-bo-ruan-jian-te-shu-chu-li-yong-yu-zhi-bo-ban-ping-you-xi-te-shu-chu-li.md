# 用于直播半屏游戏特殊处理

彩票通知嵌入功能及基础示例 <br>
彩票通知嵌入功能及基础示例\
通过ifame嵌入后，获取下注和开奖信息## 通用代码示例（详见附件）

{% file src="/files/3wYc1A3D2tBP23jw1F1u" %}

## 代码示例

```html
<script type="text/javascript">
const iframe = document.getElementById('myIframe');
// Basic format for sending data
const postData = { 
    action: 'sendData',
    data: { 
        op: "Follow",
        data: {} 
    }
}
// Follow-up investment
const FollowUpInvestment = () => {
    if(!postData.data.data){
        return;
    }
    iframe.contentWindow.postMessage(JSON.stringify(postData), '*');
}
// Get betting information
const getBetInfo = (data) => {
    document.querySelectorAll('#FollowUp-info h4')[0].innerHTML = JSON.stringify(data);
    postData.data.data = data;
}
// Get lottery result information
const getPrizeInfo = (data) => {
    let { roundId, nums, tags } = data;
    document.querySelectorAll('#Prize-Information h4')[0].innerHTML = `Round ID: ${roundId} Lottery Result: ${nums}******${tags}`
}
// Get reward information
const getRewardInfo = (data) => {
    console.log(data)
}
// Callback function
const callbackFunc = (arg) => {
    const { op, data } = arg;
    switch (op) {
        case 'Bet':
            getBetInfo(data)
            break;
        case 'ShowRound':
            getPrizeInfo(data)
            break;
        case 'Reward':
            getRewardInfo(data)
            break;
        default:
            break;
    }
}
// Listen for messages
((window,iframe) => {
    iframe.onload = function() {
        window.addEventListener('message', function(event) {
            var { action, data } = JSON.parse(event.data);
            if (action === 'sendData') {
                callbackFunc(data)
            }
        });
    }
})(window,iframe)
</script>
```

安卓使用webview初始化游戏，需要注入接口，示例步骤

```html
// 示例代码
// 1. 创建接口类
    class AndroidInterface {
        @JavascriptInterface
        fun showToast(message: String) {
        // 处理来自JS的调用
        }
    }

// 2. 注入接口
    webView.addJavascriptInterface(AndroidInterface(), "Android")

// 3. 在页面加载完成后检查
    webView.setWebViewClient(object : WebViewClient() {
        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
                
            // 检查Android对象是否存在
            webView.evaluateJavascript("typeof window.Android") { result ->
                Log.d("WebViewConsole", "Android对象类型: $result")
            // 如果返回 "object" 则说明注入成功
            }
        }
    })
```

---

---
来源：https://docs.mini.game/cc/cai-piao-du-chang-lei-yong-yu-zhi-bo-ruan-jian-te-shu-chu-li/yong-yu-zhi-bo-ban-ping-you-xi-te-shu-chu-li
