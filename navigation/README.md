# 漫行 City Guide

一个面向杭州城市漫游的响应式单页应用课程项目，提供首页、分类首页、内容详情、周边、打车、行程、发现、个人中心、个人设置和后台管理共 10 个视图。

作者：孙绍词（学号：24001010806）

## 技术架构

- HTML5：页面语义结构与 SPA 视图容器。
- CSS3：响应式布局、动画、地图示意和组件样式。
- 原生 JavaScript：视图切换、筛选、收藏、行程选择、搜索和快捷键。
- 本地 mock API：`data/places.json`、`data/stories.json`、`data/trips.json`、`data/dashboard.json`，由 `fetch()` 加载。
- 本地静态资源：图片位于 `img/`；无第三方运行时依赖。

## 安装与运行

无需安装依赖。由于浏览器禁止 `file://` 页面直接 `fetch()` 本地 JSON，请通过本地 HTTP 静态服务器运行：

1. 在 VS Code 中打开本项目目录。
2. 使用 Live Server 打开 `index.html`；或在项目目录运行 `python -m http.server 8000`。
3. 浏览器访问 `http://localhost:8000`。

## 目录结构

```text
navigation/
├── data/                 # 本地 mock 数据接口
├── img/                  # 本地图片资源
├── app.js                # 页面逻辑与接口消费
├── index.html            # 首页及 SPA 视图
├── style.css             # 响应式样式
└── README.md
```

## 数据接口

所有接口均为同源静态 JSON，通过 `fetch()` 读取，适合课程演示；后台统计、地点与行程数据并未连接真实数据库或线上服务。

## 发布与提交记录

课程要求的 GitHub/Gitee Public 仓库和完整提交历史需要由项目所有者在代码托管平台创建并推送，本地页面代码无法代替完成。建议按功能分阶段提交页面结构、交互、数据接口和文档，确保提交记录真实反映开发过程。
