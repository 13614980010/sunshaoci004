# Swiper 任务一 / 二 / 三 · 提示词与 AI 对话记录

- 作者：孙绍词
- 建立时间：2026-11-08
- 使用模型：DeepSeek-V4.1-Flash
- 在线页面（可直接查看成果）：https://13614980010.github.io/sunshaoci004/1/swiper-task.html
- 记录页（网页版）：https://13614980010.github.io/sunshaoci004/1/swiper-task-ai-log.html
- 仓库源码：[1/swiper-task.html](https://github.com/13614980010/sunshaoci004/blob/main/1/swiper-task.html)（演示四 `#wySw4`）
- 验证截图：[task1-round1.png](./verify/task1-round1.png)、[task1-cube.png](./verify/task1-cube.png)、[task2-creative.png](./verify/task2-creative.png)

---

## 任务一 · 提示词工程师：让 AI 听懂需求

不写代码，写提示词。第 1 轮使用自然语言描述，第 2 轮改为“参数名 + 取值”，通过对比展示提示词迭代过程。

### 两轮对比总览

| 对比项 | 第 1 轮：自然语言描述 | 第 2 轮：参数名 + 取值 |
|---|---|---|
| 无缝循环 | 未写 `loop`，实测 `false` | `loop: true`，通过 |
| 3.2 秒自动翻页 | `autoplay: true`，默认 3000ms | `delay: 3200`，通过 |
| 手动操作后不停 | 未设置，拖动后停止 | `disableOnInteraction: false`，通过 |
| 圆点可点击 | 缺少 `clickable`，点击无反应 | `clickable: true`，通过 |
| 初始 cube 效果 | `effect: 'cube'`，通过 | `effect: 'cube'`，通过 |
| 动画时长 | 未写 `speed`，默认 300ms | `speed: 800`，通过 |
| 最终结论 | 部分通过 | 四项需求全部通过 |

### 第 1 轮：自然语言描述（部分通过）

**提示词：**

> 帮我写一段 Swiper 初始化代码，目标是 `#wySw4` 这个轮播：要能循环、能自动翻页、下面有圆点可以点，一开始就显示成立方体的效果。

**验证截图：**

![第 1 轮效果图：cube 能渲染，但其他配置有遗漏](./verify/task1-round1.png)

**AI 回答：**

```js
new Swiper('#wySw4', {
  effect: 'cube',
  autoplay: true,
  pagination: { el: '#wyPag4' },
});
```

**页面实测：** `effect=cube`、`loop=false`、`speed=300`、`delay=3000`、`clickable=false`；手动拖动后自动播放停止。

**一句话结论：** 只有 cube 和自动翻页生效，其余需求未完整实现。

### 第 2 轮：参数名 + 取值（全部通过）

**提示词：**

> 按下面 4 条硬性需求重写，每条都必须能在代码里找到对应参数，不要省略：
> ① 无缝循环 —— `loop: true`；
> ② 每 3.2 秒自动翻页，并且用户手动滑动之后自动播放要继续 —— `autoplay: { delay: 3200, disableOnInteraction: false }`；
> ③ 圆点分页器指向 `#wyPag4` 且能点击跳转 —— `pagination: { el: '#wyPag4', clickable: true }`；
> ④ 初始效果为立方体 —— `effect: 'cube'`。
> 额外：切换动画时长 800 毫秒。

**验证截图：**

![第 2 轮效果图：参数全部命中](./verify/task1-cube.png)

**AI 回答（最终采用）：**

```js
new Swiper('#wySw4', {
  loop: true,
  speed: 800,
  effect: 'cube',
  autoplay: {
    delay: 3200,
    disableOnInteraction: false,
  },
  pagination: {
    el: '#wyPag4',
    clickable: true,
  },
});
```

**页面实测：** `effect=cube`、`loop=true`、`speed=800`、`delay=3200`、`disableOnInteraction=false`、`clickable=true`。

**一句话结论：** 四项需求全部通过，cube 正常、无缝循环、3.2 秒自动翻页、拖动后继续、圆点可点击。

验证方法：分别把两轮代码粘进页面，刷新后通过 F12 读取实例参数并操作轮播、截图；验证完成后，成果页初始效果恢复为任务四要求的 `slide`。

### 答辩抽问

- **第一版提示词漏掉了哪个需求？** 漏了“每 3.2 秒”的明确时长和“手动操作后自动播放不停止”；循环和圆点可点击虽然提到了，但没有写明参数，AI 的回答也漏掉了 `loop` 和 `clickable`。
- **第二轮怎么“说清楚”的？** 把四项需求逐条编号，每条都给出准确的参数名和取值，并额外指定 `speed: 800`，让 AI 没有省略或自由发挥的空间。
- **AI 第一次给的代码错在哪？** `autoplay: true` 只能使用默认 3000ms，且手动操作后会停止；同时缺少 `loop: true`、`delay: 3200`、`disableOnInteraction: false`、`clickable: true` 和 `speed: 800`。

---

## 任务二 · creative 仿写：课堂没讲，AI 教你

### 提示词 1

> Swiper 的 effect 除了 slide / fade / cube / coverflow / flip / cards，还有没有别的？官方 demo 里有 `257-effect-creative.html`，它是怎么配置的？

### AI 回答 1

有第 7 种：`effect: 'creative'`（自定义变换）。它必须配合 `creativeEffect.prev / next` 使用，`prev` 描述"上一张"在当前帧的位置，`next` 描述"下一张"的位置，每项可用 `translate`（`[x, y, z]`，x 可为百分比字符串）、`rotate`（`[rx, ry, rz]` 角度）、`scale`、`opacity`、`shadow`、`origin`。

### 提示词 2（追问）

> 那 `prev` 和 `next` 的 transform 具体各控制什么？当前正在看的那张受不受影响？

### AI 回答 2

`prev` 控制已经翻过去、位于左侧的那张；`next` 控制还没进来、位于右侧的那张；当前 slide 本身始终是 identity（不位移、不旋转），所以三张的变换是分开配置的。

### 最终实现（[swiper-task.html](https://13614980010.github.io/sunshaoci004/1/swiper-task.html) 中 `ssc_fxOptions` 的 creative 分支）

```js
if (ssc_effect === 'creative') {
  ssc_opt.creativeEffect = {
    prev: {
      shadow: true,
      translate: ['-55%', 0, -320],
      rotate: [0, 0, -8],
      scale: 0.8,
    },
    next: {
      shadow: true,
      translate: ['60%', 0, -200],
      rotate: [0, 0, 8],
      scale: 1.1,
    },
  };
}
```

- `prev`：缩小到 0.8、向左移 55%、绕 Z 轴转 -8°、退到 -320px 景深 → "上一张缩小左移并带角度"。
- `next`：放大到 1.1、从右侧 60% 位置、转 8° 进场 → "下一张放大右移进场"。
- 两个都开了 `shadow`，卡片有投影，像电影选片墙。

验证截图：[verify/task2-creative.png](./verify/task2-creative.png)（点「creative 电影墙」按钮后，左侧上一张明显缩小并倾斜，当前张居中）。

### 答辩准备

- **transform 里的百分号是相对谁的？** 相对 **slide 自身尺寸**：`translate` 的第一个值（X）按 slide 自身宽度算，第二个值（Y）按自身高度算；Z 轴用 px，表示景深。不是相对容器宽度。
- **改一个数值让卡片转 20 度？** 把 `prev.rotate` 的第三个值（绕 Z 轴）从 `-8` 改成 `-20`，上一张就倾斜 20°。

---

## 任务三 · 综合创作 + 技术答辩

两项提交物：① 为光影展添加第六件展品"爱达·魔都号"；② 再挑一个课堂没讲过的 Swiper 超纲能力加上去。答辩四连问围绕这两项展开。

### ① 第六件展品：爱达·魔都号（完整 AI 对话）

图片由 AI 生成（横版 16:9）。

**提示词（展品图片生成）**：

> 生成一张 16:9 的写实照片：首艘国产大型邮轮爱达·魔都号停靠在上海邮轮港，白色船体配蓝红装饰带，船头有大面积艺术彩绘，蓝天白云、阳光充足，广角、电影感摄影。

**AI 回答（生成的图片 URL）**：

```
https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image
?prompt=large luxury cruise ship docked at Shanghai terminal,
white hull with blue and red decorative stripes,
art painting on the bow, clear blue sky, sunny day,
wide angle, cinematic photography, ultra detailed
&image_size=landscape_16_9
```

slide 结构与原有 5 张完全一致（`img` + `.wy-cap` 标题/说明），插入位置在演示四最后一张之后。标题"爱达·魔都号"、说明"首艘国产大型邮轮 · 2024 年 1 月商业首航"。

验证：图片加载成功，1368×768（16:9），与前 5 张统一规格。

### ② 超纲能力三连：keyboard 键盘 + mousewheel 滚轮 + 双击缩放（完整 AI 对话）

先让 AI 列出课堂没讲过的 4 种超纲能力并分析兼容性，再做选择。最后三项全部落地：keyboard 与 mousewheel 放进任务四的公共配置，双击缩放单独加在任务三的 `#wySw3`（纯 slide，没有 3D 变换矩阵，不会和 zoom 的 transform 打架）。

**提示词（选超纲能力）**：

> Swiper 课堂只讲了 6 种 effect。keyboard / mousewheel / zoom / parallax 这 4 种超纲能力分别怎么配置？如果和 creative effect（自定义 3D 变换）同时启用会不会冲突？帮我推荐一种实现成本最低、演示效果最直接的。

**AI 回答（关键内容摘录）**：

```
四种能力对比：
┌─────────────┬────────────────────┬──────────────────────────────┐
│ 能力        │ 配置方式           │ 与 creative 兼容性          │
├─────────────┼────────────────────┼──────────────────────────────┤
│ keyboard    │ { enabled:true,    │ ✅ 无冲突，只监听方向键 ← → │
│             │  onlyInViewport:true}│                             │
├─────────────┼────────────────────┼──────────────────────────────┤
│ mousewheel  │ { enabled:true,    │ ⚠️ 会劫持页面滚动事件        │
│             │  threshold:30}     │ 与浏览器滚动条冲突          │
├─────────────┼────────────────────┼──────────────────────────────┤
│ zoom        │ { maxRatio:2.5 }   │ ❌ 与 3D 变换矩阵冲突        │
│             │                    │ 放大时 creative 会失真       │
├─────────────┼────────────────────┼──────────────────────────────┤
│ parallax    │ { enabled:true }   │ ⚠️ 需要给每个子元素加        │
│             │                    │ data-swiper-parallax 属性   │
└─────────────┴────────────────────┴──────────────────────────────┘
推荐 keyboard：只在轮播获焦后响应 ← / →，
不影响页面其他区域，与 creative 完全兼容。
```

结论：keyboard 与 mousewheel 跟 creative 不冲突，可以直接写进 `ssc_fxOptions` 公共配置；zoom 和 creative 的 3D 矩阵会互相干扰，所以只加在没有 3D 变换的任务三 `#wySw3` 上。

### 能力一：keyboard 键盘 ← / →

```js
keyboard: {
  enabled: true,        // 开启方向键控制
  onlyInViewport: true, // 只在轮播进入可视区域时响应，不劫持全局方向键
},
```

实测：点一下任务四轮播 → 聚焦成功 → 按 `→` 键 → Swiper 的 `realIndex` 递增，翻页正常；页面其他位置按方向键不影响。

### 能力二：mousewheel 鼠标滚轮

**提示词**：

> 同一个轮播再加上滚轮翻页：鼠标在轮播上滚动一格就翻一张，竖向滚轮也要能翻；滚到第一张或最后一张时，页面要能继续正常上下滚动，别把整页锁死。

**AI 回答（关键内容摘录）**：

```
mousewheel: {
  enabled: true,        // 必须显式开启，默认是 false
  forceToAxis: true,    // 竖向滚轮也强制换算成横向翻页
  releaseOnEdges: true, // 翻到首/尾后释放滚轮事件，页面恢复滚动
  sensitivity: 1,       // 灵敏度，数值越大越容易触发
}
两个坑：
① 不加 forceToAxis，竖向滚轮在横向轮播上没有反应；
② 不加 releaseOnEdges，滚到边缘后页面被“卡住”，只能横向拖走。
```

**最终代码（加入 `ssc_fxOptions` 公共配置）**：

```js
mousewheel: {
  forceToAxis: true,
  releaseOnEdges: true,
  sensitivity: 1,
},
```

实测：页面向下滚动到轮播位置 → 在轮播上滚动一格 → `realIndex` 从 1 变为 2，横向翻页成功；继续滚到第 1 张后，页面恢复正常滚动。

### 能力三：zoom 双击放大

**提示词**：

> 给任务三的 #wySw3 图片加双击缩放：双击图片放大到 3 倍，再双击还原；图片要包在 .swiper-zoom-container 里。放大期间不能被每 2.6 秒的自动翻页打断。

**AI 回答（关键内容摘录）**：

```
第一次给的写法：zoom: { toggle: true }
问题：双击确实触发了 Swiper 的 doubleTap 事件，
但 autoplay 每 2.6 秒翻一次页，翻页时 zoom 被重置，
scale 一直是 1，看起来就是“双击没反应”。

改法：关掉内置 toggle，自己监听 dblclick 手动切换
- 放大：wySw3.zoom.in()  +  wySw3.autoplay.stop()
- 还原：wySw3.zoom.out() +  wySw3.autoplay.start()
- 用一个 ssc_zoomed 布尔量记录当前是放大还是还原
```

**最终代码（HTML 容器 + JS 双击切换）**：

```html
<div class="swiper-slide">
  <div class="swiper-zoom-container">
    <img src="swiper-imgs/tiangong_1.jpg" alt="天宫空间站">
  </div>
  <div class="wy-cap"><h3>天宫空间站</h3><p>巡天遥看一千河</p></div>
</div>
```

```js
zoom: { maxRatio: 3 },

var ssc_zoomed = false;
document.querySelector('#wySw3').addEventListener('dblclick', function () {
  if (ssc_zoomed) {
    wySw3.zoom.out();
    wySw3.autoplay.start();
    ssc_zoomed = false;
  } else {
    wySw3.zoom.in();
    wySw3.autoplay.stop();
    ssc_zoomed = true;
  }
});
```

实测：双击图片 → `swiper.zoom.scale` 从 1 变为 3（放大 3 倍），`autoplay.running` 变为 false；再双击 → scale 回到 1，自动播放恢复。控制台 0 报错。

### 答辩四连问（全部围绕任务三）

1. **这段代码什么意思？**
   任务三的 `#wySw3` 初始化里同时挂了三个超纲模块：`keyboard` 只监听 `←` / `→` 方向键；`mousewheel` 把滚轮滚动换算成横向翻页；`zoom` 负责图片缩放，再配合 `dblclick` 手动切换放大 / 还原。任务四的 `ssc_fxOptions` 工厂里也带了 keyboard 与 mousewheel，7 个效果按钮重建实例时这两项能力不会丢。

2. **AI 第一次给的哪里不对、你改了什么？**
   三处：① keyboard 只给了 `enabled: true`，漏了 `onlyInViewport: true`，页面任何位置按方向键都会翻页；② mousewheel 给的 `threshold: 30` 在 Swiper 11 里不存在，真正管灵敏度的是 `sensitivity`，而且漏了 `forceToAxis` / `releaseOnEdges` —— 竖向滚轮没反应、滚到边缘页面被锁死；③ zoom 用内置 `toggle: true` 双击没反应，因为自动播放每 2.6 秒翻页时会把缩放重置。最后改成监听 `dblclick` 手动 `zoom.in()` / `zoom.out()`，放大时 `autoplay.stop()`，还原时 `autoplay.start()`。

3. **新参数的作用？**
   `keyboard.enabled` —— 开启方向键控制，`onlyInViewport` —— 只在轮播进入可视区域时响应；`mousewheel.forceToAxis` —— 竖向滚动也强制转成横向翻页，`releaseOnEdges` —— 到第一张 / 最后一张后释放滚轮事件、页面恢复滚动，`sensitivity` —— 控制触发灵敏度；`zoom.maxRatio` —— 限制最大放大 3 倍，且图片必须放在 `.swiper-zoom-container` 容器里，zoom 只认这个容器内的 `img`；`autoplay.stop()` / `start()` —— 配合双击，保证放大期间不被自动翻页打断。

4. **现场把 delay 改成指定值并解释预期变化。**
   例如把任务三的 `autoplay.delay` 从 `2600` 改成 `1000`：每张只停留 1 秒，翻页节奏快 2.6 倍；`disableOnInteraction: false` 不变，所以手动拖一下松开后仍按 1 秒继续翻。另外 delay 越小，双击缩放的窗口越短，所以放大时用 `autoplay.stop()` 把它暂停掉。

---

## 验证清单

| 项目 | 结果 |
|---|---|
| 控制台报错 | 0 |
| 演示四 slide 数量 | 6（含爱达·魔都号） |
| 效果按钮数量 | 7（含 creative） |
| creative 切换 | prev `-55%/0/-320`、next `60%/0/-200` 生效 |
| 键盘控制 | 演示三轮播聚焦后按 `→` 翻到下一张 |
| 滚轮翻页 | 演示三轮播上滚动一格 `realIndex` 1 → 2 |
| 双击缩放 | `zoom.scale` 1 ↔ 3，放大时 autoplay 暂停 |
| 第六张图 | 加载成功，1368×768（16:9） |
