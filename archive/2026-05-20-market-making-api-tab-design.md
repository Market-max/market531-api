# 做市 API 页签设计

## 目标

在现有 Mini.Game 静态文档站顶部新增“做市”页签，并使用根目录 `api_module_a.md` 作为做市 API 说明文档内容。

## 设计

本次变更不调整现有抓取脚本，也不重新生成 Mini.Game 既有页面。做市文档作为一个手工维护页面加入 `docs/pages/zuo-shi-api.md`，并在 `docs/site-data.json` 中增加独立分组“做市”，让左侧目录、搜索和页面加载逻辑继续复用现有结构。

顶部新增 `data-view="market"` 的页签。前端点击该页签时打开固定 slug `zuo-shi-api`，并保持文档视图模式，因此不会影响 Scalar API Reference 的挂载逻辑。

## 文件

- 修改：`docs/index.html`，新增顶部“做市”页签。
- 修改：`docs/app.js`，新增做市页签打开固定页面的分支。
- 修改：`docs/site-data.json`，新增做市页面索引并更新 `pageCount`。
- 新增：`docs/pages/zuo-shi-api.md`，复制 `api_module_a.md` 内容作为站内文档。

## 验证

- 运行 `node --check docs/app.js` 检查前端脚本语法。
- 运行 `npm test` 确认现有 Node 测试未回归。
- 运行简单数据校验，确认 `site-data.json` 中存在 `zuo-shi-api` 且 `pageCount` 与页面数量一致。

## 限制

当前目录不是 Git 仓库，无法创建 worktree 或提交设计文档。
