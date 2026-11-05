# AGENTS.md

个人中文课程作业归档，高级网页设计课程（学生：孙绍词）。手写静态 HTML/CSS/JS：不使用包管理器、构建工具、测试、lint、CI 或开发服务器。每个页面可直接在浏览器中打开；不使用模块/fetch/打包器。

**文档语言约定**：本文件所有说明与检查条目统一使用简体中文；文件路径、HTML、CSS、JS 标识符保留英文。后续在本项目中生成的文档、检查清单均遵守此约定。

## 硬性约定（来自 `ssc_prompt.md`）

- `ssc_prompt.md` 为只追加的提示词日志。执行每条新用户提示词之前，先追加一条记录（时间、使用的模型、提示词内容）；不得覆盖已有记录。
- 新增的 CSS 类名、id、JS 变量/函数一律加 `ssc_` 前缀；CSS 变量使用 `--ssc_*`。较早的练习/起始文件早于本规则——不做批量重命名，但在新增或修改的代码中遵守前缀。
- 每个新页面必须在 `index.html` 的 课堂目录 中注册一张新卡片，链接为 `./页面文件名.html`。`iconfont-*.html` 页面与 `form.html` 均需包含返回 `./index.html` 的链接。
- **新建 HTML 文件必须添加注释**，尤其是 JS 部分需为函数注明主要功能实现。注释内容包括：作者[孙绍词]、建立时间、使用模型、功能名称以及简介（示例见下方"新文件注释规范"）。
- `index.html` 仅使用内联 CSS，不引用 CDN，并须在 本页任务 区块中保留原始提示词文本。其"已收录 N 个页面"计数为手动维护且已过期——新增页面时一并更新。
- 页面文案为中文；较新的页面使用 `lang="zh-CN"`。

### 新文件注释规范

新建 HTML 文件时，在文件头部（`<!DOCTYPE html>` 之后）添加注释块，JS 函数上方添加函数注释。格式示例：

```html
<!DOCTYPE html>
<!--
  作者：孙绍词
  建立时间：2026-11-02
  使用模型：GLM-5.3-Flash
  功能名称：移动端固定底导航（字体图标方式）
  功能简介：iconfont 字体图标实现 4 项均分宽度的 fixed 底导航，
            含数字徽章与红点装饰、选中态切换，返回 index.html
-->
<html lang="zh-CN">
```

```javascript
/**
 * 作者：孙绍词
 * 建立时间：2026-11-02
 * 使用模型：GLM-5.3-Flash
 * 函数名称：ssc_onTab
 * 功能简介：底导航点击事件处理——阻止默认跳转，移除全部选中态，
 *           为当前点击项添加 ssc_active 高亮类
 */
var ssc_onTab = function (ssc_event) { ... };
```

## 布局与资源

- 根目录存放练习页面及配套 CSS（如 `stack.html`/`stack.css`）；`index.html` 为目录页。
- `starter/` 为当前的成绩分析 JS 作业：`starter-level1-0806-s.html`、`starter-level2-0806-s.html`，以及必需的 `starter/data.js`；注释中引用的 `target.html` 未包含在内。
- 根目录的 `starter-level1.html` 是过时副本：doctype 前有多余字符 `m`、为较旧版本，且加载的 `data.js` 只存在于 `starter/` 中。请在 `starter/` 内的副本上修改。
- 第三方资源均为本地：`cdn/fontawesome/`（字体图标）、`cdn/lucide/`（SVG 图标）、`font_5238940_d3fxv615wg4/`（iconfont 包）、`img/`。不得替换为远程 CDN。已知例外：`svg.html` 加载 `at.alicdn.com`。
- `style.css` 与 `self.css` 内容重复；其余页面使用同名 CSS。不要假设存在全局共享样式表。
- `frontend-design/SKILL.md` 存放 iconfont 页面所用的本地视觉设计指南；涉及视觉设计时先阅读。

## 验证与文件系统

- 无测试/lint/构建命令。验证方式：在浏览器中打开被修改的页面并检查控制台；`dataTyp.html` 与 `js_obj_fun.html` 为仅在控制台输出的 JS 演示。
- 文件修改请使用编辑器工具。PowerShell 5.1 的 `Set-Content`/`Out-File` 默认编码会损坏这些 UTF-8 文件中的中文文本。
- 该目录当前不是 git 仓库（无 `.git`），尽管 `ssc_prompt.md` 提到过 Gitee；不要默认存在 git 远端或自动推送。
