# Independent Scroll Layout Design

## Goal

让文档站的 sidebar 与 content 独立滚动；content 向下滚动后隐藏完整 topbar，并在 content 区域顶部显示较窄的浮窗，保留当前顶部导航能力。

## Confirmed Approach

采用固定视口壳层：

- `body` 不再作为主滚动容器，避免 content 滚动影响 sidebar。
- `.layout` 使用 `height: calc(100vh - topbar)`，内部两列独立滚动。
- `.sidebar` 保持自己的 `overflow: auto`。
- `.content-panel` 作为内容滚动容器，并承载窄版 sticky 浮窗。
- `app.js` 监听 `.content-panel` 滚动，超过阈值后给 `body` 添加状态 class，隐藏完整 topbar 并显示窄浮窗。

## Files

- `docs/index.html`: 增加 content 内部窄浮窗结构。
- `docs/styles.css`: 调整布局高度、独立滚动、topbar 隐藏和浮窗样式。
- `docs/app.js`: 增加 content 滚动状态同步，并在切换页面时重置滚动状态。

## Notes

- 不改数据文件和页面内容。
- 不改变 tab 的现有事件绑定，窄浮窗内按钮沿用 `.tab-button` 与 `data-view`。
- 移动端保留单列布局，sidebar 仍为独立滚动区域。
