# Module A - API 文档

> 基础路径: `/api`  
> 请求格式: `application/json`  
> 响应格式: `application/json`

## 认证说明

| 标识 | 说明 |
|------|------|
| 👤 UserRequest | 用户注册/登录专用中间件 |
| 🔐 AuthRequest | 需要用户登录 Token，服务端从 Context 获取 UserID |

---

## UserRequest参数说明

**Header中需要参数Sign，sign=md5(body中的json字符串+签名密钥key)。**

***注意这里的body中的json字符串必须是请求中最原始的body中的字符，不能使用json包转出来之后的字符，最终使用小写输出***

---

## AuthRequest参数说明

**Header中需要参数Authorization，其值为/user/login接口返回的token。**

---

## Module A1: User（用户）

### POST `/user/login` 👤 UserRequest

用户登录/注册（自动创建账号）。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appId | int64 | 是 | 应用ID |
| account | string | 是 | 用户账号 |
| name | string | 否 | 昵称，默认与 account 相同 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | JWT 登录凭证 |
| userId | int64 | 用户ID |
| account | string | 用户账号 |
| name | string | 用户昵称 |
| balance | decimal | 钱包余额 |
| frozenAmount | decimal | 冻结金额 |
| registeredAt | int64 | 注册时间戳（秒） |
| lastActiveAt | int64 | 最后活跃时间戳（秒） |

---

## Module A2: Wallet（钱包）

所有接口均需 🔐 AuthRequest

### POST `/wallet/balance`

查询钱包余额。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appId | int64 | 是 | 应用ID |
| account | string | 是 | 用户账号 |
| currency | string | 是 | 币种 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| balance | decimal | 可用余额 |
| frozenAmount | decimal | 冻结金额 |
| totalPnl | decimal | 累计盈亏 |

---

### POST `/wallet/deposit`

钱包充值。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appId | int64 | 是 | 应用ID |
| account | string | 是 | 用户账号 |
| amount | float64 | 是 | 充值金额 |
| currency | string | 是 | 币种 |
| referenceId | string | 是 | 外部流水号（幂等键） |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| account | string | 用户账号 |
| amount | float64 | 充值金额 |
| userId | int64 | 用户ID |
| balance | decimal | 充值后余额 |

---

### POST `/wallet/withdraw`

钱包提现。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appId | int64 | 是 | 应用ID |
| account | string | 是 | 用户账号 |
| amount | float64 | 是 | 提现金额 |
| currency | string | 是 | 币种 |
| referenceId | string | 是 | 外部流水号（幂等键） |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| account | string | 用户账号 |
| amount | float64 | 提现金额 |
| userId | int64 | 用户ID |
| balance | decimal | 提现后余额 |
| totalPnl | decimal | 累计盈亏 |

---

## Module A3: Event（事件）

所有接口均需 🔐 AuthRequest

### POST `/event/list`

获取已发布的事件列表。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | 状态筛选 |
| category | string | 否 | 分类筛选 |
| limit | int | 否 | 每页数量 |
| offset | int | 否 | 偏移量 |

**返回值：** 数组，每个元素包含：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 事件ID |
| title | map[string]string | 标题（多语言） |
| description | map[string]string | 描述（多语言） |
| category | string | 分类 |
| imageUrl | string | 封面图URL |
| newsRef | map[string]string | 新闻引用 |
| initialPrice | float64 | 初始价格 |
| endDate | time | 截止日期 |
| status | string | 状态（published/settled/paused） |
| settledOutcome | string | 结算结果 |
| eventType | string | 事件类型 |
| tags | string | 标签（JSON） |
| initialPrices | []float64 | 各结果初始价格 |
| isLive | bool | 是否正在进行 |
| roundDurationSeconds | int | 回合时长（秒） |
| currentRound | int | 当前回合数 |
| roundStartTime | int64 | 回合开始时间（毫秒） |
| seriesId | string | 系列ID |
| todayVolume | decimal | 今日交易量 |
| liquidity | float64 | 流动性 |
| commentCount | int | 评论数 |
| isFeatured | bool | 是否推荐 |
| featuredOrder | int | 推荐排序 |
| displayMode | string | 展示模式 |
| slug | string | URL友好标识 |
| groupId | string | 分组ID |
| isDelisted | bool | 是否下架 |
| settlementMeta | object | 结算元数据 |
| depthLevel | string | 深度级别 |
| createdAt | time | 创建时间 |
| updatedAt | time | 更新时间 |
| outcomes | []object | 结果选项列表 |
| baseAsset | string | 基础资产（加密货币符号） |
| seriesTitle | map[string]string | 系列标题 |
| isAutoRotatingSeries | bool | 是否自动循环系列 |
| seriesSchedule | object | 系列调度信息 |
| lmsrPrices | [][]float64 | LMSR 价格矩阵 |
| lmsrB | []float64 | LMSR B 参数 |
| lmsrQ | [][]float64 | LMSR Q 参数 |
| totalVolume | float64 | 总交易量 |
| totalBets | int64 | 总下注数 |
| pageMode | int64 | 页面模式 |
| type | int64 | 事件主类型 |
| subType | int64 | 事件子类型 |
| uniType | int64 | 事件统一类型 |
| cryptoPrice | map[int64]float64 | 加密货币历史价格（key=时间戳ms, value=价格） |

---

### POST `/event/detail`

获取事件详情（含盘口状态、结果选项、价格等）。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventId | int | 是 | 事件ID |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventId | int | 事件ID |
| prices | [][]float64 | 各结果当前价格矩阵 |
| b | float64 | LMSR B 参数 |
| q | []float64 | LMSR Q 参数 |
| totalVolume | float64 | 总交易量 |
| totalBets | int64 | 总下注数 |
| liquidity | float64 | 流动性 |
| outcomeStats | []object | 各结果统计 |
| outcomeStats[].outcomeIndex | int | 结果索引 |
| outcomeStats[].outcomePos | int | 结果位置 |
| outcomeStats[].volume | float64 | 交易量 |
| outcomeStats[].tradeCount | int64 | 交易次数 |
| orderBook | object | 订单簿快照 |
| engine | string | 引擎类型（"clob"） |

---

## Module A4: Trading（交易）

所有接口均需 🔐 AuthRequest

### POST `/trade/buy`

市价买入。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventId | int | 是 | 事件ID |
| outcomeIndex | int | 是 | 结果索引 |
| outcomePos | int | 是 | 结果位置（0=Yes, 1=No） |
| amount | float64 | 是 | 买入金额 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 订单ID |
| shares | decimal | 获得份额数量 |
| cost | decimal | 实际成本 |
| avgPrice | decimal | 平均成交价格 |
| newPrices | [][]float64 | 成交后的最新价格矩阵 |
| totalVolume | float64 | 事件总交易量（更新后） |
| totalBets | int64 | 事件总下注数（更新后） |

---

### POST `/trade/sell`

市价卖出。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventId | int | 是 | 事件ID |
| outcomeIndex | int | 是 | 结果索引 |
| outcomePos | int | 是 | 结果位置（0=Yes, 1=No） |
| shares | float64 | 是 | 卖出份额数量 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 订单ID |
| revenue | decimal | 卖出收入 |
| avgPrice | decimal | 平均成交价格 |
| newPrices | [][]float64 | 成交后的最新价格矩阵 |
| totalVolume | float64 | 事件总交易量（更新后） |
| totalBets | int64 | 事件总下注数（更新后） |

---

### POST `/trade/order`

查询单笔订单详情。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 是 | 订单ID |

**返回值：** OrderModel 对象

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 订单ID |
| eventId | int | 事件ID |
| platformUserId | int64 | 用户ID |
| side | string | 方向（buy/sell） |
| outcomeIndex | int | 结果索引 |
| outcomePos | int | 结果位置 |
| amount | decimal | 金额 |
| shares | decimal | 份额 |
| price | decimal | 价格 |
| status | string | 状态（filled/pending/cancelled） |
| feeRate | decimal | 手续费率 |
| feeAmount | decimal | 手续费金额 |
| createdAt | time | 创建时间 |

---

### POST `/trade/list`

获取交易列表。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appId | int64 | 否 | 应用ID |
| eventId | int | 否 | 事件ID筛选 |
| account | string | 否 | 用户账号筛选 |
| limit | int | 否 | 每页数量（默认20） |
| offset | int | 否 | 偏移量 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orders | []OrderModel | 订单列表（结构同 trade/order 返回值） |
| total | int64 | 总记录数 |
| limit | int | 每页数量 |
| offset | int | 当前偏移量 |

---

## Module A5: Limit Order（限价单）

所有接口均需 🔐 AuthRequest

### POST `/limitOrder/place`

下限价单。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventId | int | 是 | 事件ID |
| outcomeIndex | int | 是 | 结果索引 |
| outcomePos | int | 是 | 结果位置（0=Yes, 1=No） |
| side | string | 是 | 方向（buy / sell） |
| price | float64 | 是 | 限价价格（0~1 之间） |
| quantity | float64 | 是 | 下单份额 |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 限价单ID |
| status | string | 状态（open/partial/filled） |
| filledQuantity | float64 | 已成交数量 |
| remainingQuantity | float64 | 剩余数量 |
| totalCost | float64 | 总成本 |
| avgFillPrice | float64 | 平均成交价 |
| fills | int | 成交笔数 |
| crossFilled | float64 | 交叉撮合成交数量 |

---

### POST `/limitOrder/cancel`

取消限价单。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 是 | 限价单ID |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 限价单ID |
| cancelled | bool | 是否取消成功 |

---

### POST `/limitOrder/list`

查询我的限价单列表。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| statusFilter | []string | 否 | 状态筛选（如 `["open","partial"]`） |

**返回值：** 数组，每个元素包含：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int64 | 记录ID |
| orderId | string | 限价单ID |
| eventId | int | 事件ID |
| side | string | 方向（buy/sell） |
| outcomeIndex | int | 结果索引 |
| outcomePos | int | 结果位置 |
| price | float64 | 限价价格 |
| quantity | float64 | 下单数量 |
| filledQuantity | float64 | 已成交数量 |
| remainingQuantity | float64 | 剩余数量 |
| totalCost | float64 | 总成本 |
| status | string | 状态（open/partial/filled/cancelled） |
| timeInForce | string | 有效期类型 |
| createdAt | time | 创建时间 |

---

## Module A6: Position（持仓）

所有接口均需 🔐 AuthRequest

### POST `/position/list`

查询我的当前持仓。

**请求参数：** 无（通过 Token 获取用户身份）

**返回值：** 数组，每个元素包含：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int64 | 持仓记录ID |
| eventId | int | 事件ID |
| outcomeIndex | int | 结果索引 |
| outcomePos | int | 结果位置 |
| shares | float64 | 持有份额 |
| avgPrice | float64 | 平均买入价 |
| totalCost | float64 | 总成本 |
| realizedPnl | float64 | 已实现盈亏 |

---

## Module A7: Price History（价格历史）

所有接口均需 🔐 AuthRequest

### POST `/priceHistory/get`

获取价格历史K线数据。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventId | string | 是 | 事件ID |
| outcomeIndex | int | 是 | 结果索引 |
| outcomePos | int | 是 | 结果位置 |
| interval | string | 否 | 时间间隔（1m / 5m / 1h / 1d） |
| limit | int | 否 | 数据点数量（默认100） |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventId | string | 事件ID |
| outcomeIndex | int | 结果索引 |
| outcomePos | int | 结果位置 |
| prices | []PriceHistoryModel | 价格历史数组 |

---

## 通用响应格式

所有接口响应统一为：

```json
{
  "json": { ... },
  "meta": { ... }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| json | object | 业务数据 |
| meta | object | 元数据（分页信息等，可选） |

---

## 错误响应

当请求失败时，响应格式如下：

```json
{
  "json": {
    "error": "错误描述信息"
  }
}
```
