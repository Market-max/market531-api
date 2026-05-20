const state = {
  pages: [],
  activeSlug: null,
  lastGuideSlug: null,
  view: "guide",
  scalarMounted: false
};

const nav = document.querySelector("#nav");
const content = document.querySelector("#content");
const apiReference = document.querySelector("#api-reference");
const search = document.querySelector("#search");
const tabButtons = document.querySelectorAll(".tab-button");
const MARKET_VIEW_SLUG = "zuo-shi-api";
const marketData = window.MARKET_API_DATA;

async function loadSiteData() {
  const response = await fetch("./site-data.json");
  if (!response.ok) {
    throw new Error("无法加载 site-data.json，请先运行 npm run fetch。");
  }

  const data = await response.json();
  state.pages = data.pages || [];
  const hashSlug = getHashParts().view;
  state.activeSlug = hashSlug || state.pages[0]?.slug || null;
  state.lastGuideSlug =
    state.activeSlug && state.activeSlug !== MARKET_VIEW_SLUG
      ? state.activeSlug
      : state.pages[0]?.slug || null;
}

function getHashParts(hash = location.hash) {
  const raw = hash.replace(/^#\/?/, "");
  const [pathPart, anchor] = raw.split("#");
  const [view, item] = pathPart.split("/");
  return { view, item, anchor };
}

function updateRouteHash(hash, historyMode = "push") {
  if (location.hash === hash) {
    return;
  }

  if (historyMode === "replace") {
    history.replaceState(null, "", hash);
    return;
  }

  if (historyMode === "push") {
    history.pushState(null, "", hash);
  }
}

function getMarketItems() {
  return marketData.groups.flatMap((group) => group.items);
}

function getDefaultMarketSlug() {
  return marketData.groups[0]?.items[0]?.slug || null;
}

function findMarketEndpoint(slug) {
  return getMarketItems().find((item) => item.slug === slug) || getMarketItems()[0] || null;
}

function groupPages(pages) {
  return pages.reduce((groups, page) => {
    const group = page.group || "其他";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(page);
    return groups;
  }, new Map());
}

function renderNav() {
  if (state.view === "market") {
    renderMarketNav();
    return;
  }

  const query = search.value.trim().toLowerCase();
  const filtered = state.pages.filter((page) => {
    const haystack = `${page.title} ${page.group} ${page.slug}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  nav.innerHTML = "";
  for (const [group, pages] of groupPages(filtered)) {
    const title = document.createElement("div");
    title.className = "nav-group-title";
    title.textContent = group;
    nav.append(title);

    for (const page of pages) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-item${page.slug === state.activeSlug ? " active" : ""}`;
      button.textContent = page.title;
      button.addEventListener("click", () => openPage(page.slug));
      nav.append(button);
    }
  }
}

function renderMarketNav(activeAnchor = null) {
  nav.innerHTML = "";
  for (const group of marketData.groups) {
    const title = document.createElement("div");
    title.className = "nav-group-title market-nav-group-title";
    title.textContent = group.title;
    nav.append(title);

    for (const item of group.items) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-item market-nav-item${item.slug === activeAnchor ? " active" : ""}`;
      button.textContent = item.label;
      button.addEventListener("click", () => openMarketPage(item.slug));
      nav.append(button);
    }
  }
}

async function openPage(slug, anchor = null, options = {}) {
  if (slug === MARKET_VIEW_SLUG) {
    return openMarketPage(null, options);
  }

  const { historyMode = "push" } = options;
  state.view = "guide";
  state.activeSlug = slug;
  state.lastGuideSlug = slug;
  updateRouteHash(anchor ? `#/${slug}#${anchor}` : `#/${slug}`, historyMode);
  updateTabs();
  renderNav();

  const page = state.pages.find((item) => item.slug === slug);
  if (!page) {
    content.innerHTML = "<h1>未找到页面</h1>";
    return;
  }

  const response = await fetch(page.file);
  const markdown = response.ok ? await response.text() : `# ${page.title}\n\n页面内容加载失败。`;
  content.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
  scrollToContentAnchor(anchor);
}

function scrollToContentAnchor(anchor) {
  if (!anchor) {
    content.scrollTo?.({ top: 0 });
    return;
  }

  document.getElementById(anchor)?.scrollIntoView({ block: "start" });
}

function routeContentLink(event) {
  const link = event.target.closest?.("a[href]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href") ?? "";
  if (!href.startsWith("#/")) {
    return;
  }

  event.preventDefault();
  const { view, item, anchor } = getHashParts(href);
  if (view === MARKET_VIEW_SLUG) {
    void openMarketPage(item);
    return;
  }
  void openPage(view, anchor);
}

function fieldTable(fields, withRequired = false) {
  if (!fields.length) {
    return "无。";
  }

  const headers = withRequired ? "| 字段 | 类型 | 必填 | 说明 |\n|------|------|------|------|" : "| 字段 | 类型 | 说明 |\n|------|------|------|";
  const rows = fields.map((field) =>
    withRequired
      ? `| ${field.name} | ${field.type} | ${field.required} | ${field.description} |`
      : `| ${field.name} | ${field.type} | ${field.description} |`
  );

  return [headers, ...rows].join("\n");
}

function jsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function renderMarketEndpoint(endpoint) {
  const auth = marketData.auth[endpoint.auth];
  const authHeaders = auth.headers.map((header) => `| ${header.name} | ${header.description} |`).join("\n");
  const authMarkdown = `## 认证\n\n${auth.icon} **${auth.name}**：${auth.description}\n\n| Header | 说明 |\n|--------|------|\n${authHeaders}`;

  return [
    `# ${endpoint.title}`,
    "",
    `**接口：** \`${endpoint.method} ${marketData.basePath}${endpoint.path}\``,
    "",
    endpoint.description,
    "",
    "## 基础信息",
    "",
    `| 项 | 值 |\n|----|----|\n| 基础路径 | \`${marketData.basePath}\` |\n| 请求格式 | \`${marketData.requestFormat}\` |\n| 响应格式 | \`${marketData.responseFormat}\` |`,
    "",
    authMarkdown,
    "",
    "## 请求参数",
    "",
    fieldTable(endpoint.requestFields, true),
    "",
    "## 请求示例",
    "",
    jsonBlock(endpoint.requestExample),
    "",
    "## 返回值",
    "",
    fieldTable(endpoint.responseFields),
    "",
    "## 响应示例",
    "",
    jsonBlock(endpoint.responseExample),
    "",
    "## 错误响应",
    "",
    jsonBlock(marketData.errorExample)
  ].join("\n");
}

async function openMarketPage(slug = null, options = {}) {
  const { historyMode = "push" } = options;
  state.view = "market";
  const endpointSlug = slug || getHashParts().item || getDefaultMarketSlug();
  const endpoint = findMarketEndpoint(endpointSlug);
  state.activeSlug = MARKET_VIEW_SLUG;
  updateRouteHash(`#/${MARKET_VIEW_SLUG}/${endpoint.slug}`, historyMode);
  updateTabs();
  renderMarketNav(endpoint.slug);

  const markdown = renderMarketEndpoint(endpoint);
  content.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
  content.scrollTo({ top: 0 });
}

function openCurrentRoute(options = {}) {
  const hashParts = getHashParts();
  if (hashParts.view === MARKET_VIEW_SLUG) {
    return openMarketPage(hashParts.item, options);
  }

  const slug = hashParts.view || state.pages[0]?.slug;
  return openPage(slug, hashParts.anchor, options);
}

function openApiReference() {
  state.view = "api";
  updateTabs();

  if (!state.scalarMounted) {
    Scalar.createApiReference("#api-reference", {
      url: "./openapi.yaml",
      theme: "default",
      layout: "modern"
    });
    state.scalarMounted = true;
  }
}

function updateTabs() {
  const isApi = state.view === "api";
  document.body.classList.toggle("api-mode", isApi);
  document.body.classList.toggle("market-mode", state.view === "market");
  content.classList.toggle("hidden", isApi);
  apiReference.classList.toggle("hidden", !isApi);
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.view === "api") {
      openApiReference();
    } else if (button.dataset.view === "market") {
      openMarketPage();
    } else {
      openPage(state.lastGuideSlug || state.pages[0]?.slug);
    }
  });
});

content.addEventListener("click", routeContentLink);
search.addEventListener("input", renderNav);
window.addEventListener("popstate", () => {
  void openCurrentRoute({ historyMode: "none" });
});

loadSiteData()
  .then(() => {
    renderNav();
    return openCurrentRoute({ historyMode: "replace" });
  })
  .catch((error) => {
    content.innerHTML = `<h1>初始化失败</h1><p>${error.message}</p>`;
  });
