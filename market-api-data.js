window.MARKET_API_DATA = {
  basePath: "/api",
  requestFormat: "application/json",
  responseFormat: "application/json",
  auth: {
    user: {
      name: "UserRequest",
      icon: "👤",
      description: "用户注册/登录专用中间件。",
      headers: [
        {
          name: "Sign",
          description:
            "sign=md5(body 中的原始 JSON 字符串 + 签名密钥 key)，最终使用小写输出。注意必须使用请求原始 body 字符串，不能使用 JSON 包重新序列化后的字符串。"
        }
      ]
    },
    token: {
      name: "AuthRequest",
      icon: "🔐",
      description: "需要用户登录 Token，服务端从 Context 获取 UserID。",
      headers: [
        {
          name: "Authorization",
          description: "值为 /user/login 接口返回的 token。"
        }
      ]
    }
  },
  groups: [
    {
      title: "USER（用户）",
      items: [
        {
          slug: "user-login",
          label: "/user/login",
          method: "POST",
          path: "/user/login",
          auth: "user",
          title: "用户登录/注册",
          description: "用户登录/注册。若账号不存在，系统会自动创建账号并返回登录凭证。",
          requestFields: [
            { name: "appId", type: "int64", required: "是", description: "应用ID" },
            { name: "account", type: "string", required: "是", description: "用户账号" },
            { name: "name", type: "string", required: "否", description: "昵称，默认与 account 相同" }
          ],
          responseFields: [
            { name: "token", type: "string", description: "JWT 登录凭证" },
            { name: "userId", type: "int64", description: "用户ID" },
            { name: "account", type: "string", description: "用户账号" },
            { name: "name", type: "string", description: "用户昵称" },
            { name: "balance", type: "decimal", description: "钱包余额" },
            { name: "frozenAmount", type: "decimal", description: "冻结金额" },
            { name: "registeredAt", type: "int64", description: "注册时间戳（秒）" },
            { name: "lastActiveAt", type: "int64", description: "最后活跃时间戳（秒）" }
          ],
          requestExample: {
            appId: 10001,
            account: "demo_user_001",
            name: "Demo User"
          },
          responseExample: {
            json: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo",
              userId: 900001,
              account: "demo_user_001",
              name: "Demo User",
              balance: "1000.00",
              frozenAmount: "0.00",
              registeredAt: 1716200000,
              lastActiveAt: 1716200300
            },
            meta: {}
          }
        }
      ]
    },
    {
      title: "WALLET（钱包）",
      items: [
        {
          slug: "wallet-balance",
          label: "/wallet/balance",
          method: "POST",
          path: "/wallet/balance",
          auth: "token",
          title: "查询钱包余额",
          description: "查询指定用户账号在指定币种下的钱包余额、冻结金额和累计盈亏。",
          requestFields: [
            { name: "appId", type: "int64", required: "是", description: "应用ID" },
            { name: "account", type: "string", required: "是", description: "用户账号" },
            { name: "currency", type: "string", required: "是", description: "币种" }
          ],
          responseFields: [
            { name: "balance", type: "decimal", description: "可用余额" },
            { name: "frozenAmount", type: "decimal", description: "冻结金额" },
            { name: "totalPnl", type: "decimal", description: "累计盈亏" }
          ],
          requestExample: { appId: 10001, account: "demo_user_001", currency: "USDT" },
          responseExample: { json: { balance: "1000.00", frozenAmount: "12.50", totalPnl: "35.80" }, meta: {} }
        },
        {
          slug: "wallet-deposit",
          label: "/wallet/deposit",
          method: "POST",
          path: "/wallet/deposit",
          auth: "token",
          title: "钱包充值",
          description: "向用户钱包充值。referenceId 为外部流水号，用于保证充值请求幂等。",
          requestFields: [
            { name: "appId", type: "int64", required: "是", description: "应用ID" },
            { name: "account", type: "string", required: "是", description: "用户账号" },
            { name: "amount", type: "float64", required: "是", description: "充值金额" },
            { name: "currency", type: "string", required: "是", description: "币种" },
            { name: "referenceId", type: "string", required: "是", description: "外部流水号（幂等键）" }
          ],
          responseFields: [
            { name: "account", type: "string", description: "用户账号" },
            { name: "amount", type: "float64", description: "充值金额" },
            { name: "userId", type: "int64", description: "用户ID" },
            { name: "balance", type: "decimal", description: "充值后余额" }
          ],
          requestExample: {
            appId: 10001,
            account: "demo_user_001",
            amount: 100,
            currency: "USDT",
            referenceId: "dep-20260520-0001"
          },
          responseExample: {
            json: { account: "demo_user_001", amount: 100, userId: 900001, balance: "1100.00" },
            meta: {}
          }
        },
        {
          slug: "wallet-withdraw",
          label: "/wallet/withdraw",
          method: "POST",
          path: "/wallet/withdraw",
          auth: "token",
          title: "钱包提现",
          description: "从用户钱包扣减余额。referenceId 为外部流水号，用于保证提现请求幂等。",
          requestFields: [
            { name: "appId", type: "int64", required: "是", description: "应用ID" },
            { name: "account", type: "string", required: "是", description: "用户账号" },
            { name: "amount", type: "float64", required: "是", description: "提现金额" },
            { name: "currency", type: "string", required: "是", description: "币种" },
            { name: "referenceId", type: "string", required: "是", description: "外部流水号（幂等键）" }
          ],
          responseFields: [
            { name: "account", type: "string", description: "用户账号" },
            { name: "amount", type: "float64", description: "提现金额" },
            { name: "userId", type: "int64", description: "用户ID" },
            { name: "balance", type: "decimal", description: "提现后余额" },
            { name: "totalPnl", type: "decimal", description: "累计盈亏" }
          ],
          requestExample: {
            appId: 10001,
            account: "demo_user_001",
            amount: 50,
            currency: "USDT",
            referenceId: "wd-20260520-0001"
          },
          responseExample: {
            json: { account: "demo_user_001", amount: 50, userId: 900001, balance: "1050.00", totalPnl: "35.80" },
            meta: {}
          }
        }
      ]
    },
    {
      title: "EVENT（事件）",
      items: [
        {
          slug: "event-list",
          label: "/event/list",
          method: "POST",
          path: "/event/list",
          auth: "token",
          title: "获取事件列表",
          description: "获取已发布的事件列表，支持按状态、分类和分页参数筛选。",
          requestFields: [
            { name: "status", type: "string", required: "否", description: "状态筛选" },
            { name: "category", type: "string", required: "否", description: "分类筛选" },
            { name: "limit", type: "int", required: "否", description: "每页数量" },
            { name: "offset", type: "int", required: "否", description: "偏移量" }
          ],
          responseFields: [
            { name: "id", type: "int", description: "事件ID" },
            { name: "title", type: "map[string]string", description: "标题（多语言）" },
            { name: "description", type: "map[string]string", description: "描述（多语言）" },
            { name: "category", type: "string", description: "分类" },
            { name: "imageUrl", type: "string", description: "封面图URL" },
            { name: "initialPrice", type: "float64", description: "初始价格" },
            { name: "status", type: "string", description: "状态（published/settled/paused）" },
            { name: "outcomes", type: "[]object", description: "结果选项列表" },
            { name: "todayVolume", type: "decimal", description: "今日交易量" },
            { name: "liquidity", type: "float64", description: "流动性" },
            { name: "totalVolume", type: "float64", description: "总交易量" },
            { name: "totalBets", type: "int64", description: "总下注数" },
            { name: "cryptoPrice", type: "map[int64]float64", description: "加密货币历史价格（key=时间戳ms, value=价格）" }
          ],
          requestExample: { status: "published", category: "crypto", limit: 20, offset: 0 },
          responseExample: {
            json: [
              {
                id: 101,
                title: { zh: "BTC 今日是否上涨？", en: "Will BTC close higher today?" },
                description: { zh: "基于指定结算时间的 BTC 价格判断结果。" },
                category: "crypto",
                imageUrl: "https://example.com/btc.png",
                initialPrice: 0.5,
                status: "published",
                outcomes: [{ index: 0, name: "Yes" }, { index: 1, name: "No" }],
                todayVolume: "15000.00",
                liquidity: 8000,
                totalVolume: 125000,
                totalBets: 560,
                cryptoPrice: { "1716200000000": 68000.5 }
              }
            ],
            meta: { limit: 20, offset: 0 }
          }
        },
        {
          slug: "event-detail",
          label: "/event/detail",
          method: "POST",
          path: "/event/detail",
          auth: "token",
          title: "获取事件详情",
          description: "获取事件详情，包含盘口状态、结果选项、价格、订单簿快照和统计数据。",
          requestFields: [{ name: "eventId", type: "int", required: "是", description: "事件ID" }],
          responseFields: [
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "prices", type: "[][]float64", description: "各结果当前价格矩阵" },
            { name: "b", type: "float64", description: "LMSR B 参数" },
            { name: "q", type: "[]float64", description: "LMSR Q 参数" },
            { name: "totalVolume", type: "float64", description: "总交易量" },
            { name: "totalBets", type: "int64", description: "总下注数" },
            { name: "liquidity", type: "float64", description: "流动性" },
            { name: "outcomeStats", type: "[]object", description: "各结果统计" },
            { name: "orderBook", type: "object", description: "订单簿快照" },
            { name: "engine", type: "string", description: "引擎类型（\"clob\"）" }
          ],
          requestExample: { eventId: 101 },
          responseExample: {
            json: {
              eventId: 101,
              prices: [[0.52, 0.48]],
              b: 1200,
              q: [240, 220],
              totalVolume: 125000,
              totalBets: 560,
              liquidity: 8000,
              outcomeStats: [{ outcomeIndex: 0, outcomePos: 0, volume: 72000, tradeCount: 320 }],
              orderBook: { bids: [{ price: 0.51, quantity: 100 }], asks: [{ price: 0.53, quantity: 80 }] },
              engine: "clob"
            },
            meta: {}
          }
        }
      ]
    },
    {
      title: "TRADING（交易）",
      items: [
        {
          slug: "trade-buy",
          label: "/trade/buy",
          method: "POST",
          path: "/trade/buy",
          auth: "token",
          title: "市价买入",
          description: "按当前市场价格买入指定事件、结果和方向的份额。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置（0=Yes, 1=No）" },
            { name: "amount", type: "float64", required: "是", description: "买入金额" }
          ],
          responseFields: [
            { name: "orderId", type: "string", description: "订单ID" },
            { name: "shares", type: "decimal", description: "获得份额数量" },
            { name: "cost", type: "decimal", description: "实际成本" },
            { name: "avgPrice", type: "decimal", description: "平均成交价格" },
            { name: "newPrices", type: "[][]float64", description: "成交后的最新价格矩阵" },
            { name: "totalVolume", type: "float64", description: "事件总交易量（更新后）" },
            { name: "totalBets", type: "int64", description: "事件总下注数（更新后）" }
          ],
          requestExample: { eventId: 101, outcomeIndex: 0, outcomePos: 0, amount: 100 },
          responseExample: {
            json: {
              orderId: "ord-buy-20260520-0001",
              shares: "192.3077",
              cost: "100.00",
              avgPrice: "0.52",
              newPrices: [[0.53, 0.47]],
              totalVolume: 125100,
              totalBets: 561
            },
            meta: {}
          }
        },
        {
          slug: "trade-sell",
          label: "/trade/sell",
          method: "POST",
          path: "/trade/sell",
          auth: "token",
          title: "市价卖出",
          description: "按当前市场价格卖出指定事件、结果和方向的份额。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置（0=Yes, 1=No）" },
            { name: "shares", type: "float64", required: "是", description: "卖出份额数量" }
          ],
          responseFields: [
            { name: "orderId", type: "string", description: "订单ID" },
            { name: "revenue", type: "decimal", description: "卖出收入" },
            { name: "avgPrice", type: "decimal", description: "平均成交价格" },
            { name: "newPrices", type: "[][]float64", description: "成交后的最新价格矩阵" },
            { name: "totalVolume", type: "float64", description: "事件总交易量（更新后）" },
            { name: "totalBets", type: "int64", description: "事件总下注数（更新后）" }
          ],
          requestExample: { eventId: 101, outcomeIndex: 0, outcomePos: 0, shares: 50 },
          responseExample: {
            json: {
              orderId: "ord-sell-20260520-0001",
              revenue: "26.00",
              avgPrice: "0.52",
              newPrices: [[0.51, 0.49]],
              totalVolume: 125126,
              totalBets: 562
            },
            meta: {}
          }
        },
        {
          slug: "trade-order",
          label: "/trade/order",
          method: "POST",
          path: "/trade/order",
          auth: "token",
          title: "查询单笔订单详情",
          description: "根据订单ID查询单笔订单详情。",
          requestFields: [{ name: "orderId", type: "string", required: "是", description: "订单ID" }],
          responseFields: [
            { name: "orderId", type: "string", description: "订单ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "platformUserId", type: "int64", description: "用户ID" },
            { name: "side", type: "string", description: "方向（buy/sell）" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "amount", type: "decimal", description: "金额" },
            { name: "shares", type: "decimal", description: "份额" },
            { name: "price", type: "decimal", description: "价格" },
            { name: "status", type: "string", description: "状态（filled/pending/cancelled）" },
            { name: "feeRate", type: "decimal", description: "手续费率" },
            { name: "feeAmount", type: "decimal", description: "手续费金额" },
            { name: "createdAt", type: "time", description: "创建时间" }
          ],
          requestExample: { orderId: "ord-buy-20260520-0001" },
          responseExample: {
            json: {
              orderId: "ord-buy-20260520-0001",
              eventId: 101,
              platformUserId: 900001,
              side: "buy",
              outcomeIndex: 0,
              outcomePos: 0,
              amount: "100.00",
              shares: "192.3077",
              price: "0.52",
              status: "filled",
              feeRate: "0.002",
              feeAmount: "0.20",
              createdAt: "2026-05-20T07:30:00Z"
            },
            meta: {}
          }
        },
        {
          slug: "trade-list",
          label: "/trade/list",
          method: "POST",
          path: "/trade/list",
          auth: "token",
          title: "获取交易列表",
          description: "按应用、事件或用户账号筛选交易列表，并返回分页信息。",
          requestFields: [
            { name: "appId", type: "int64", required: "否", description: "应用ID" },
            { name: "eventId", type: "int", required: "否", description: "事件ID筛选" },
            { name: "account", type: "string", required: "否", description: "用户账号筛选" },
            { name: "limit", type: "int", required: "否", description: "每页数量（默认20）" },
            { name: "offset", type: "int", required: "否", description: "偏移量" }
          ],
          responseFields: [
            { name: "orders", type: "[]OrderModel", description: "订单列表（结构同 trade/order 返回值）" },
            { name: "total", type: "int64", description: "总记录数" },
            { name: "limit", type: "int", description: "每页数量" },
            { name: "offset", type: "int", description: "当前偏移量" }
          ],
          requestExample: { appId: 10001, eventId: 101, account: "demo_user_001", limit: 20, offset: 0 },
          responseExample: {
            json: {
              orders: [
                {
                  orderId: "ord-buy-20260520-0001",
                  eventId: 101,
                  platformUserId: 900001,
                  side: "buy",
                  outcomeIndex: 0,
                  outcomePos: 0,
                  amount: "100.00",
                  shares: "192.3077",
                  price: "0.52",
                  status: "filled",
                  feeRate: "0.002",
                  feeAmount: "0.20",
                  createdAt: "2026-05-20T07:30:00Z"
                }
              ],
              total: 1,
              limit: 20,
              offset: 0
            },
            meta: {}
          }
        }
      ]
    },
    {
      title: "LIMIT ORDER（限价单）",
      items: [
        {
          slug: "limit-order-place",
          label: "/limitOrder/place",
          method: "POST",
          path: "/limitOrder/place",
          auth: "token",
          title: "下限价单",
          description: "提交指定价格和份额的限价单。价格范围为 0 到 1。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置（0=Yes, 1=No）" },
            { name: "side", type: "string", required: "是", description: "方向（buy / sell）" },
            { name: "price", type: "float64", required: "是", description: "限价价格（0~1 之间）" },
            { name: "quantity", type: "float64", required: "是", description: "下单份额" }
          ],
          responseFields: [
            { name: "orderId", type: "string", description: "限价单ID" },
            { name: "status", type: "string", description: "状态（open/partial/filled）" },
            { name: "filledQuantity", type: "float64", description: "已成交数量" },
            { name: "remainingQuantity", type: "float64", description: "剩余数量" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "avgFillPrice", type: "float64", description: "平均成交价" },
            { name: "fills", type: "int", description: "成交笔数" },
            { name: "crossFilled", type: "float64", description: "交叉撮合成交数量" }
          ],
          requestExample: { eventId: 101, outcomeIndex: 0, outcomePos: 0, side: "buy", price: 0.51, quantity: 100 },
          responseExample: {
            json: {
              orderId: "lo-20260520-0001",
              status: "open",
              filledQuantity: 0,
              remainingQuantity: 100,
              totalCost: 51,
              avgFillPrice: 0,
              fills: 0,
              crossFilled: 0
            },
            meta: {}
          }
        },
        {
          slug: "limit-order-cancel",
          label: "/limitOrder/cancel",
          method: "POST",
          path: "/limitOrder/cancel",
          auth: "token",
          title: "取消限价单",
          description: "根据限价单ID取消未完全成交的限价单。",
          requestFields: [{ name: "orderId", type: "string", required: "是", description: "限价单ID" }],
          responseFields: [
            { name: "orderId", type: "string", description: "限价单ID" },
            { name: "cancelled", type: "bool", description: "是否取消成功" }
          ],
          requestExample: { orderId: "lo-20260520-0001" },
          responseExample: { json: { orderId: "lo-20260520-0001", cancelled: true }, meta: {} }
        },
        {
          slug: "limit-order-list",
          label: "/limitOrder/list",
          method: "POST",
          path: "/limitOrder/list",
          auth: "token",
          title: "查询我的限价单列表",
          description: "查询当前登录用户的限价单列表，可按状态筛选。",
          requestFields: [
            { name: "statusFilter", type: "[]string", required: "否", description: "状态筛选（如 [\"open\",\"partial\"]）" }
          ],
          responseFields: [
            { name: "id", type: "int64", description: "记录ID" },
            { name: "orderId", type: "string", description: "限价单ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "side", type: "string", description: "方向（buy/sell）" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "price", type: "float64", description: "限价价格" },
            { name: "quantity", type: "float64", description: "下单数量" },
            { name: "filledQuantity", type: "float64", description: "已成交数量" },
            { name: "remainingQuantity", type: "float64", description: "剩余数量" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "status", type: "string", description: "状态（open/partial/filled/cancelled）" },
            { name: "timeInForce", type: "string", description: "有效期类型" },
            { name: "createdAt", type: "time", description: "创建时间" }
          ],
          requestExample: { statusFilter: ["open", "partial"] },
          responseExample: {
            json: [
              {
                id: 1,
                orderId: "lo-20260520-0001",
                eventId: 101,
                side: "buy",
                outcomeIndex: 0,
                outcomePos: 0,
                price: 0.51,
                quantity: 100,
                filledQuantity: 0,
                remainingQuantity: 100,
                totalCost: 51,
                status: "open",
                timeInForce: "GTC",
                createdAt: "2026-05-20T07:35:00Z"
              }
            ],
            meta: {}
          }
        }
      ]
    },
    {
      title: "POSITION（持仓）",
      items: [
        {
          slug: "position-list",
          label: "/position/list",
          method: "POST",
          path: "/position/list",
          auth: "token",
          title: "查询我的当前持仓",
          description: "查询当前登录用户的当前持仓。接口通过 Token 获取用户身份，请求体无需传参。",
          requestFields: [],
          responseFields: [
            { name: "id", type: "int64", description: "持仓记录ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "shares", type: "float64", description: "持有份额" },
            { name: "avgPrice", type: "float64", description: "平均买入价" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "realizedPnl", type: "float64", description: "已实现盈亏" }
          ],
          requestExample: {},
          responseExample: {
            json: [
              {
                id: 1,
                eventId: 101,
                outcomeIndex: 0,
                outcomePos: 0,
                shares: 192.3077,
                avgPrice: 0.52,
                totalCost: 100,
                realizedPnl: 12.5
              }
            ],
            meta: {}
          }
        }
      ]
    },
    {
      title: "PRICE HISTORY（价格历史）",
      items: [
        {
          slug: "price-history-get",
          label: "/priceHistory/get",
          method: "POST",
          path: "/priceHistory/get",
          auth: "token",
          title: "获取价格历史K线数据",
          description: "获取指定事件、结果和方向的价格历史 K 线数据。",
          requestFields: [
            { name: "eventId", type: "string", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置" },
            { name: "interval", type: "string", required: "否", description: "时间间隔（1m / 5m / 1h / 1d）" },
            { name: "limit", type: "int", required: "否", description: "数据点数量（默认100）" }
          ],
          responseFields: [
            { name: "eventId", type: "string", description: "事件ID" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "prices", type: "[]PriceHistoryModel", description: "价格历史数组" }
          ],
          requestExample: { eventId: "101", outcomeIndex: 0, outcomePos: 0, interval: "1m", limit: 100 },
          responseExample: {
            json: {
              eventId: "101",
              outcomeIndex: 0,
              outcomePos: 0,
              prices: [
                { timestamp: 1716200000000, open: 0.51, high: 0.53, low: 0.5, close: 0.52, volume: 1200 }
              ]
            },
            meta: {}
          }
        }
      ]
    }
  ],
  errorExample: {
    json: {
      error: "错误描述信息"
    }
  }
};
