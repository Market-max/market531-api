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
          label: "用户登录/注册",
          method: "POST",
          path: "/user/login",
          auth: "user",
          title: "用户登录/注册",
          description: "用户登录/注册。若账号不存在，系统会自动创建账号并返回登录凭证。",
          requestFields: [
            { name: "appId", type: "int64", required: "是", description: "应用ID" },
            { name: "account", type: "string", required: "是", description: "用户账号" },
            { name: "password", type: "string", required: "是", description: "密码" },
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
            json: {
              appId: 10001,
              account: "demo_user_001",
              password: "demo_password_001",
              name: "Demo User"
            }
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
          label: "查询钱包余额",
          method: "POST",
          path: "/wallet/balance",
          auth: "token",
          title: "查询钱包余额",
          description: "查询钱包余额。接口通过 Token 获取用户身份，请求体无需传参。",
          requestFields: [],
          responseFields: [
            { name: "wallet", type: "decimal", description: "钱包总额" },
            { name: "balance", type: "decimal", description: "可用余额" },
            { name: "frozenAmount", type: "decimal", description: "冻结金额" },
            { name: "totalPnl", type: "decimal", description: "累计盈亏" }
          ],
          requestExample: { json: {} },
          responseExample: {
            json: { wallet: "1012.50", balance: "1000.00", frozenAmount: "12.50", totalPnl: "35.80" },
            meta: {}
          }
        },
        {
          slug: "wallet-deposit",
          label: "钱包充值",
          method: "POST",
          path: "/wallet/deposit",
          auth: "token",
          title: "钱包充值",
          description: "钱包充值。referenceId 为外部流水号，用于保证充值请求幂等。",
          requestFields: [
            { name: "amount", type: "float64", required: "是", description: "充值金额" },
            { name: "referenceId", type: "string", required: "是", description: "外部流水号（幂等键）" }
          ],
          responseFields: [
            { name: "account", type: "string", description: "用户账号" },
            { name: "userId", type: "int64", description: "用户ID" },
            { name: "amount", type: "float64", description: "充值金额" },
            { name: "balance", type: "decimal", description: "充值后余额" },
            { name: "wallet", type: "decimal", description: "钱包总额" },
            { name: "order", type: "string", description: "订单号" },
            { name: "status", type: "int", description: "状态码" }
          ],
          requestExample: {
            json: {
              amount: 100,
              referenceId: "dep-20260520-0001"
            }
          },
          responseExample: {
            json: {
              account: "demo_user_001",
              userId: 900001,
              amount: 100,
              balance: "1100.00",
              wallet: "1100.00",
              order: "wallet-dep-20260520-0001",
              status: 1
            },
            meta: {}
          }
        },
        {
          slug: "wallet-withdraw",
          label: "钱包提现",
          method: "POST",
          path: "/wallet/withdraw",
          auth: "token",
          title: "钱包提现",
          description: "钱包提现。referenceId 为外部流水号，用于保证提现请求幂等。",
          requestFields: [
            { name: "amount", type: "float64", required: "是", description: "提现金额" },
            { name: "referenceId", type: "string", required: "是", description: "外部流水号（幂等键）" }
          ],
          responseFields: [
            { name: "account", type: "string", description: "用户账号" },
            { name: "userId", type: "int64", description: "用户ID" },
            { name: "amount", type: "float64", description: "提现金额" },
            { name: "balance", type: "decimal", description: "提现后余额" },
            { name: "wallet", type: "decimal", description: "钱包总额" },
            { name: "order", type: "string", description: "订单号" },
            { name: "status", type: "int", description: "状态码" }
          ],
          requestExample: {
            json: {
              amount: 50,
              referenceId: "wd-20260520-0001"
            }
          },
          responseExample: {
            json: {
              account: "demo_user_001",
              userId: 900001,
              amount: 50,
              balance: "1050.00",
              wallet: "1050.00",
              order: "wallet-wd-20260520-0001",
              status: 1
            },
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
          label: "获取事件列表",
          method: "POST",
          path: "/event/list",
          auth: "token",
          title: "获取事件列表",
          description: "获取已发布的事件列表。",
          requestFields: [
            { name: "status", type: "string", required: "否", description: "状态筛选（默认 published）" },
            { name: "category", type: "string", required: "否", description: "分类筛选（默认 all）" },
            { name: "order", type: "string", required: "否", description: "排序方法：volume24（热门）/ volume（总量），默认按创建时间倒序" },
            { name: "tag", type: "string", required: "否", description: "标签筛选" },
            { name: "period", type: "string", required: "否", description: "时间范围：today / weekly / all（默认 all）" },
            { name: "search", type: "string", required: "否", description: "标题搜索关键词" },
            { name: "excludes", type: "[]string", required: "否", description: "排除的分类列表" },
            { name: "limit", type: "int", required: "否", description: "每页数量（默认20）" },
            { name: "offset", type: "int", required: "否", description: "偏移量（默认0）" }
          ],
          responseFields: [
            { name: "id", type: "int", description: "事件ID" },
            { name: "title", type: "map[string]string", description: "标题（多语言）" },
            { name: "description", type: "map[string]string", description: "描述（多语言）" },
            { name: "category", type: "string", description: "分类" },
            { name: "imageUrl", type: "string", description: "封面图URL" },
            { name: "newsRef", type: "map[string]string", description: "新闻引用" },
            { name: "initialPrice", type: "float64", description: "初始价格" },
            { name: "endDate", type: "time", description: "截止日期" },
            { name: "status", type: "string", description: "状态（published/settled/paused）" },
            { name: "settledOutcome", type: "string", description: "结算结果" },
            { name: "eventType", type: "string", description: "事件类型" },
            { name: "tags", type: "string", description: "标签（JSON）" },
            { name: "initialPrices", type: "[]float64", description: "各结果初始价格" },
            { name: "isLive", type: "bool", description: "是否正在进行" },
            { name: "roundDurationSeconds", type: "int", description: "回合时长（秒）" },
            { name: "currentRound", type: "int", description: "当前回合数" },
            { name: "roundStartTime", type: "int64", description: "回合开始时间（毫秒）" },
            { name: "seriesId", type: "string", description: "系列ID" },
            { name: "todayVolume", type: "decimal", description: "今日交易量" },
            { name: "liquidity", type: "float64", description: "流动性" },
            { name: "commentCount", type: "int", description: "评论数" },
            { name: "isFeatured", type: "bool", description: "是否推荐" },
            { name: "featuredOrder", type: "int", description: "推荐排序" },
            { name: "displayMode", type: "string", description: "展示模式" },
            { name: "slug", type: "string", description: "URL友好标识" },
            { name: "groupId", type: "string", description: "分组ID" },
            { name: "isDelisted", type: "bool", description: "是否下架" },
            { name: "settlementMeta", type: "object", description: "结算元数据" },
            { name: "depthLevel", type: "string", description: "深度级别" },
            { name: "createdAt", type: "time", description: "创建时间" },
            { name: "updatedAt", type: "time", description: "更新时间" },
            { name: "outcomes", type: "[]object", description: "结果选项列表" },
            { name: "baseAsset", type: "string", description: "基础资产（加密货币符号）" },
            { name: "seriesTitle", type: "map[string]string", description: "系列标题" },
            { name: "isAutoRotatingSeries", type: "bool", description: "是否自动循环系列" },
            { name: "seriesSchedule", type: "object", description: "系列调度信息" },
            { name: "lmsrPrices", type: "[][]float64", description: "LMSR 价格矩阵" },
            { name: "lmsrB", type: "[]float64", description: "LMSR B 参数" },
            { name: "lmsrQ", type: "[][]float64", description: "LMSR Q 参数" },
            { name: "totalVolume", type: "float64", description: "总交易量" },
            { name: "totalBets", type: "int64", description: "总下注数" },
            { name: "pageMode", type: "int64", description: "页面模式" },
            { name: "type", type: "int64", description: "事件主类型" },
            { name: "subType", type: "int64", description: "事件子类型" },
            { name: "uniType", type: "int64", description: "事件统一类型" },
            { name: "cryptoPrice", type: "map[int64]float64", description: "加密货币历史价格（key=时间戳ms, value=价格）" }
          ],
          requestExample: {
            json: {
              status: "published",
              category: "crypto",
              order: "volume24",
              tag: "btc",
              period: "today",
              search: "BTC",
              excludes: ["sports"],
              limit: 20,
              offset: 0
            }
          },
          responseExample: {
            json: [
              {
                id: 101,
                title: { zh: "BTC 今日是否上涨？", en: "Will BTC close higher today?" },
                description: { zh: "基于指定结算时间的 BTC 价格判断结果。" },
                category: "crypto",
                imageUrl: "https://example.com/btc.png",
                newsRef: { zh: "https://example.com/news" },
                initialPrice: 0.5,
                endDate: "2026-06-08T16:00:00Z",
                status: "published",
                settledOutcome: "",
                eventType: "binary",
                tags: "[\"btc\"]",
                initialPrices: [0.5, 0.5],
                isLive: true,
                roundDurationSeconds: 86400,
                currentRound: 12,
                roundStartTime: 1780886400000,
                seriesId: "btc-daily",
                todayVolume: "15000.00",
                liquidity: 8000,
                commentCount: 23,
                isFeatured: true,
                featuredOrder: 1,
                displayMode: "standard",
                slug: "btc-up-today",
                groupId: "crypto",
                isDelisted: false,
                settlementMeta: {},
                depthLevel: "standard",
                createdAt: "2026-06-08T08:00:00Z",
                updatedAt: "2026-06-08T08:30:00Z",
                outcomes: [{ index: 0, label: { zh: "是", en: "Yes" } }],
                baseAsset: "BTC",
                seriesTitle: { zh: "BTC 每日行情" },
                isAutoRotatingSeries: true,
                seriesSchedule: {},
                lmsrPrices: [[0.52, 0.48]],
                lmsrB: [1200],
                lmsrQ: [[240, 220]],
                totalVolume: 125000,
                totalBets: 560,
                pageMode: 1,
                type: 1,
                subType: 10,
                uniType: 110,
                cryptoPrice: { "1780886400000": 68000.5 }
              }
            ],
            meta: { limit: 20, offset: 0 }
          }
        },
        {
          slug: "event-get",
          label: "根据事件ID获取事件详情",
          method: "GET",
          path: "/event/get",
          auth: "token",
          title: "根据事件ID获取事件详情",
          description: "根据事件ID获取单个事件详情（含结果选项、系列信息等）。",
          requestFields: [{ name: "eventId", type: "int", required: "是", description: "事件ID" }],
          responseFields: [{ name: "返回结构", type: "object", description: "直接返回事件对象，结构同 /event/list 中单个事件对象；不包含 event 包装字段" }],
          requestExample: { json: { eventId: 101 } },
          responseExample: {
            json: {
              id: 101,
              title: { zh: "BTC 今日是否上涨？" },
              outcomes: [{ index: 0, label: { zh: "是" } }],
              seriesId: "btc-daily"
            },
            meta: {}
          }
        },
        {
          slug: "event-children",
          label: "获取子事件列表",
          method: "POST",
          path: "/event/children",
          auth: "token",
          title: "获取子事件列表",
          description: "获取同一组（totalId）下的所有已发布子事件列表。",
          requestFields: [{ name: "eventId", type: "int", required: "是", description: "事件ID（用于查找其所属组）" }],
          responseFields: [{ name: "返回结构", type: "[]object", description: "直接返回事件对象数组，每个元素结构同 /event/list 中单个事件对象；不包含 events 包装字段" }],
          requestExample: { json: { eventId: 101 } },
          responseExample: {
            json: [
              { id: 101, title: { zh: "BTC 第一回合" }, groupId: "btc-daily" },
              { id: 102, title: { zh: "BTC 第二回合" }, groupId: "btc-daily" }
            ],
            meta: {}
          }
        },
        {
          slug: "event-slug",
          label: "根据 slug 获取事件详情",
          method: "GET",
          path: "/event/slug",
          auth: "token",
          title: "根据 slug 获取事件详情",
          description: "根据 slug 获取事件详情。",
          requestFields: [{ name: "slug", type: "string", required: "是", description: "事件的 URL 友好标识" }],
          responseFields: [{ name: "返回结构", type: "object", description: "直接返回事件对象，结构同 /event/list 中单个事件对象；不包含 event 包装字段" }],
          requestExample: { json: { slug: "btc-up-today" } },
          responseExample: {
            json: { id: 101, slug: "btc-up-today", title: { zh: "BTC 今日是否上涨？" } },
            meta: {}
          }
        },
        {
          slug: "event-detail",
          label: "获取事件详情",
          method: "POST",
          path: "/event/detail",
          auth: "token",
          title: "获取事件详情",
          description: "获取事件详情（含盘口状态、结果选项、价格等）。",
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
            { name: "outcomeStats[].outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomeStats[].outcomePos", type: "int", description: "结果位置" },
            { name: "outcomeStats[].volume", type: "float64", description: "交易量" },
            { name: "outcomeStats[].tradeCount", type: "int64", description: "交易次数" },
            { name: "orderBook", type: "object", description: "订单簿快照" },
            { name: "engine", type: "string", description: "引擎类型（\"clob\"）" }
          ],
          requestExample: { json: { eventId: 101 } },
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
          label: "市价买入",
          method: "POST",
          path: "/trade/buy",
          auth: "token",
          title: "市价买入",
          description: "市价买入。",
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
          requestExample: { json: { eventId: 101, outcomeIndex: 0, outcomePos: 0, amount: 100 } },
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
          label: "市价卖出",
          method: "POST",
          path: "/trade/sell",
          auth: "token",
          title: "市价卖出",
          description: "市价卖出。",
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
          requestExample: { json: { eventId: 101, outcomeIndex: 0, outcomePos: 0, shares: 50 } },
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
          slug: "trade-order-book",
          label: "获取订单簿",
          method: "POST",
          path: "/trade/orderBook",
          auth: "token",
          title: "获取订单簿",
          description: "获取指定结果选项的订单簿快照。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置（0=Yes, 1=No）" },
            { name: "depth", type: "int", required: "否", description: "深度档位数量（默认10）" }
          ],
          responseFields: [
            { name: "bids", type: "[]OrderBookLevel", description: "买单列表" },
            { name: "asks", type: "[]OrderBookLevel", description: "卖单列表" },
            { name: "midPrice", type: "float64", description: "中间价" },
            { name: "spread", type: "float64", description: "买卖价差" },
            { name: "lastTradePrice", type: "float64", description: "最近成交价" }
          ],
          requestExample: { json: { eventId: 101, outcomeIndex: 0, outcomePos: 0, depth: 10 } },
          responseExample: {
            json: {
              bids: [{ price: 0.51, quantity: 100 }],
              asks: [{ price: 0.53, quantity: 80 }],
              midPrice: 0.52,
              spread: 0.02,
              lastTradePrice: 0.52
            },
            meta: {}
          }
        },
        {
          slug: "trade-order",
          label: "查询单笔订单详情",
          method: "POST",
          path: "/trade/order",
          auth: "token",
          title: "查询单笔订单详情",
          description: "查询单笔订单详情。",
          requestFields: [{ name: "orderId", type: "string", required: "是", description: "订单ID" }],
          responseFields: [
            { name: "id", type: "int64", description: "记录ID" },
            { name: "orderId", type: "string", description: "订单ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "title", type: "map[string]string", description: "事件标题（多语言）" },
            { name: "label", type: "map[string]string", description: "选项名称（多语言）" },
            { name: "sel", type: "map[string]string", description: "选项值（多语言）" },
            { name: "ImageUrl", type: "string", description: "封面图URL" },
            { name: "side", type: "string", description: "方向（buy/sell）" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "price", type: "float64", description: "成交价格" },
            { name: "quantity", type: "float64", description: "成交数量" },
            { name: "filledQuantity", type: "float64", description: "已成交数量" },
            { name: "remainingQuantity", type: "float64", description: "剩余数量" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "status", type: "string", description: "状态（filled）" },
            { name: "createdAt", type: "time", description: "创建时间" }
          ],
          requestExample: { json: { orderId: "ord-buy-20260520-0001" } },
          responseExample: {
            json: {
              id: 1,
              orderId: "ord-buy-20260520-0001",
              eventId: 101,
              title: { zh: "BTC 今日是否上涨？" },
              label: { zh: "是" },
              sel: { zh: "Yes" },
              ImageUrl: "https://example.com/btc.png",
              side: "buy",
              outcomeIndex: 0,
              outcomePos: 0,
              price: 0.52,
              quantity: 192.3077,
              filledQuantity: 192.3077,
              remainingQuantity: 0,
              totalCost: 100,
              status: "filled",
              createdAt: "2026-05-20T07:30:00Z"
            },
            meta: {}
          }
        },
        {
          slug: "trade-list",
          label: "获取我的交易列表",
          method: "POST",
          path: "/trade/list",
          auth: "token",
          title: "获取我的交易列表",
          description: "获取我的交易列表。",
          requestFields: [
            { name: "limit", type: "int", required: "否", description: "每页数量（默认50）" },
            { name: "offset", type: "int", required: "否", description: "偏移量（默认0）" }
          ],
          responseFields: [
            { name: "返回结构", type: "[]OrderModel", description: "直接返回数组，每个元素结构同 /trade/order 返回值" }
          ],
          requestExample: { json: { limit: 50, offset: 0 } },
          responseExample: {
            json: [
              {
                id: 1,
                orderId: "ord-buy-20260520-0001",
                eventId: 101,
                title: { zh: "BTC 今日是否上涨？" },
                side: "buy",
                outcomeIndex: 0,
                outcomePos: 0,
                price: 0.52,
                quantity: 192.3077,
                filledQuantity: 192.3077,
                remainingQuantity: 0,
                totalCost: 100,
                status: "filled",
                createdAt: "2026-05-20T07:30:00Z"
              }
            ],
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
          label: "下限价单",
          method: "POST",
          path: "/limitOrder/place",
          auth: "token",
          title: "下限价单",
          description: "下限价单。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "是", description: "结果索引" },
            { name: "outcomePos", type: "int", required: "是", description: "结果位置（0=Yes, 1=No）" },
            { name: "side", type: "string", required: "是", description: "方向（buy / sell）" },
            { name: "price", type: "float64", required: "是", description: "限价价格（0~1 之间）" },
            { name: "quantity", type: "float64", required: "是", description: "下单份额；线上原有说明：side=buy 时最小下单份额是5" },
            { name: "expires", type: "int", required: "否", description: "过期时间（秒），0 或不传表示永不过期" }
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
          requestExample: {
            json: { eventId: 101, outcomeIndex: 0, outcomePos: 0, side: "buy", price: 0.51, quantity: 100, expires: 0 }
          },
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
          label: "取消限价单",
          method: "POST",
          path: "/limitOrder/cancel",
          auth: "token",
          title: "取消限价单",
          description: "取消限价单。",
          requestFields: [{ name: "orderId", type: "string", required: "是", description: "限价单ID" }],
          responseFields: [
            { name: "orderId", type: "string", description: "限价单ID" },
            { name: "cancelled", type: "bool", description: "是否取消成功" }
          ],
          requestExample: { json: { orderId: "lo-20260520-0001" } },
          responseExample: { json: { orderId: "lo-20260520-0001", cancelled: true }, meta: {} }
        },
        {
          slug: "limit-order-cancel-batch",
          label: "批量取消限价单",
          method: "POST",
          path: "/limitOrder/cancelBatch",
          auth: "token",
          title: "批量取消限价单",
          description: "批量取消限价单。支持按订单ID列表取消，或按事件/方向等条件批量取消。",
          requestFields: [
            { name: "orderIds", type: "[]string", required: "否", description: "限价单ID列表（优先级最高，传此字段则忽略其他条件）" },
            { name: "eventId", type: "int", required: "否", description: "事件ID（当 orderIds 为空时按条件筛选）" },
            { name: "outcomeIndex", type: "int", required: "否", description: "结果索引（配合 eventId 使用）" },
            { name: "side", type: "string", required: "否", description: "方向筛选（buy / sell，配合 eventId 使用）" }
          ],
          responseFields: [{ name: "orderIds", type: "[]string", description: "成功取消的限价单ID列表" }],
          requestExample: {
            json: { orderIds: ["lo-20260520-0001", "lo-20260520-0002"], eventId: 101, outcomeIndex: 0, side: "buy" }
          },
          responseExample: { json: { orderIds: ["lo-20260520-0001", "lo-20260520-0002"] }, meta: {} }
        },
        {
          slug: "limit-order-list",
          label: "查询我的限价单列表",
          method: "POST",
          path: "/limitOrder/list",
          auth: "token",
          title: "查询我的限价单列表",
          description: "查询我的限价单列表。",
          requestFields: [
            { name: "limit", type: "int", required: "否", description: "每页数量（默认50）" },
            { name: "offset", type: "int", required: "否", description: "偏移量（默认0）" },
            { name: "statusFilter", type: "[]string", required: "否", description: "状态筛选（如 [\"open\",\"partial\"]）" }
          ],
          responseFields: [
            { name: "id", type: "int64", description: "记录ID" },
            { name: "orderId", type: "string", description: "限价单ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "title", type: "map[string]string", description: "事件标题（多语言）" },
            { name: "label", type: "map[string]string", description: "选项名称（多语言）" },
            { name: "sel", type: "map[string]string", description: "选项值（多语言）" },
            { name: "imageUrl", type: "string", description: "封面图URL" },
            { name: "side", type: "string", description: "方向（buy/sell）" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "price", type: "float64", description: "限价价格" },
            { name: "quantity", type: "float64", description: "下单数量" },
            { name: "filledQuantity", type: "float64", description: "已成交数量" },
            { name: "remainingQuantity", type: "float64", description: "剩余数量" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "status", type: "string", description: "状态（open/partial/filled/cancelled/expired）" },
            { name: "timeInForce", type: "string", description: "有效期类型" },
            { name: "expiresAt", type: "time", description: "过期时间（可为 null）" },
            { name: "createdAt", type: "time", description: "创建时间" }
          ],
          requestExample: { json: { limit: 50, offset: 0, statusFilter: ["open", "partial"] } },
          responseExample: {
            json: [
              {
                id: 1,
                orderId: "lo-20260520-0001",
                eventId: 101,
                title: { zh: "BTC 今日是否上涨？" },
                label: { zh: "是" },
                sel: { zh: "Yes" },
                imageUrl: "https://example.com/btc.png",
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
                expiresAt: null,
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
          label: "查询我的当前持仓",
          method: "POST",
          path: "/position/list",
          auth: "token",
          title: "查询我的当前持仓",
          description: "查询我的当前持仓。接口通过 Token 获取用户身份，请求体无需传参。",
          requestFields: [],
          responseFields: [
            { name: "id", type: "int64", description: "持仓记录ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "title", type: "map[string]string", description: "事件标题（多语言）" },
            { name: "label", type: "map[string]string", description: "选项名称（多语言）" },
            { name: "sel", type: "map[string]string", description: "选项值（多语言）" },
            { name: "ImageUrl", type: "string", description: "封面图URL" },
            { name: "shares", type: "float64", description: "持有份额" },
            { name: "avgPrice", type: "float64", description: "平均买入价" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "realizedPnl", type: "float64", description: "已实现盈亏" }
          ],
          requestExample: { json: {} },
          responseExample: {
            json: [
              {
                id: 1,
                eventId: 101,
                outcomeIndex: 0,
                outcomePos: 0,
                title: { zh: "BTC 今日是否上涨？" },
                label: { zh: "是" },
                sel: { zh: "Yes" },
                ImageUrl: "https://example.com/btc.png",
                shares: 192.3077,
                avgPrice: 0.52,
                totalCost: 100,
                realizedPnl: 12.5
              }
            ],
            meta: {}
          }
        },
        {
          slug: "position-fills",
          label: "查询持仓成交明细",
          method: "POST",
          path: "/position/fills",
          auth: "token",
          title: "查询持仓成交明细",
          description: "查询我的持仓成交明细。",
          requestFields: [
            { name: "eventId", type: "int", required: "否", description: "事件ID筛选" },
            { name: "limit", type: "int", required: "否", description: "每页数量（默认50）" },
            { name: "offset", type: "int", required: "否", description: "偏移量（默认0）" }
          ],
          responseFields: [
            { name: "id", type: "int64", description: "记录ID" },
            { name: "orderId", type: "string", description: "订单ID" },
            { name: "eventId", type: "int", description: "事件ID" },
            { name: "title", type: "map[string]string", description: "事件标题（多语言）" },
            { name: "label", type: "map[string]string", description: "选项名称（多语言）" },
            { name: "sel", type: "map[string]string", description: "选项值（多语言）" },
            { name: "ImageUrl", type: "string", description: "封面图URL" },
            { name: "side", type: "string", description: "方向（buy/sell）" },
            { name: "outcomeIndex", type: "int", description: "结果索引" },
            { name: "outcomePos", type: "int", description: "结果位置" },
            { name: "price", type: "float64", description: "成交价格" },
            { name: "quantity", type: "float64", description: "成交数量" },
            { name: "totalCost", type: "float64", description: "总成本" },
            { name: "reason", type: "string", description: "成交原因" },
            { name: "createdAt", type: "time", description: "创建时间" }
          ],
          requestExample: { json: { eventId: 101, limit: 50, offset: 0 } },
          responseExample: {
            json: [
              {
                id: 1,
                orderId: "ord-buy-20260520-0001",
                eventId: 101,
                title: { zh: "BTC 今日是否上涨？" },
                label: { zh: "是" },
                sel: { zh: "Yes" },
                ImageUrl: "https://example.com/btc.png",
                side: "buy",
                outcomeIndex: 0,
                outcomePos: 0,
                price: 0.52,
                quantity: 192.3077,
                totalCost: 100,
                reason: "market_buy",
                createdAt: "2026-05-20T07:30:00Z"
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
          label: "获取价格历史数据",
          method: "POST",
          path: "/priceHistory/get",
          auth: "token",
          title: "获取价格历史数据",
          description: "获取价格历史数据。",
          requestFields: [
            { name: "eventId", type: "int", required: "是", description: "事件ID" },
            { name: "outcomeIndex", type: "int", required: "否", description: "结果索引（不传则返回所有结果的价格）" },
            { name: "limit", type: "int", required: "否", description: "数据点数量（默认100）" }
          ],
          responseFields: [
            { name: "返回结构", type: "[]PriceHistoryModel", description: "PriceHistoryModel 数组，按时间倒序排列" }
          ],
          requestExample: { json: { eventId: 101, outcomeIndex: 0, limit: 100 } },
          responseExample: {
            json: [
              { timestamp: 1716200000000, open: 0.51, high: 0.53, low: 0.5, close: 0.52, volume: 1200 }
            ],
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
