# Swiper 任务一 / 二 / 三 · 提示词与 AI 对话记录

- 作者：孙绍词
- 建立时间：2026-11-08
- 使用模型：DeepSeek-V4.1-Flash
- 对应页面：[swiper-task.html](./swiper-task.html)（演示四 `#wySw4`）
- 验证截图：[task1-cube.png](./verify/task1-cube.png)、[task2-creative.png](./verify/task2-creative.png)

---

## 任务一 · 提示词工程师：让 AI 听懂需求

### 第 1 轮提示词

> 帮我写一段 Swiper 初始化代码，目标是 `#wySw4` 这个轮播：要能循环、能自动翻页、下面有圆点可以点，一开始就显示成立方体的效果。

### 第 1 轮 AI 回答

```js
new Swiper('#wySw4', {
  effect: 'cube',
  autoplay: true,
  pagination: { el: '#wyPag4' },
});
```

### 第 1 轮的问题（验证后逐条确认）

| 需求 | 第 1 轮代码 | 问题 |
|---|---|---|
| 无缝循环 | 没有 `loop` | 翻到最后一张就停住，回不到第一张 |
| 3.2 秒自动翻页 | `autoplay: true` | 只能用默认 3000 ms，改不了 3.2 秒 |
| 手动操作后不停 | 没有 `disableOnInteraction: false` | 用户拖一下，自动播放被永久暂停 |
| 圆点可点击 | `pagination` 缺 `clickable` | 圆点只能看，点了没反应 |

另外 `speed` 也没写，切换动画时长不受控制。

### 第 2 轮提示词（把需求拆成"参数名 + 取值"）

> 按下面 4 条硬性需求重写，每条都必须能在代码里找到对应参数，不要省略：
> ① 无缝循环 —— `loop: true`；
> ② 每 3.2 秒自动翻页，并且用户手动滑动之后自动播放要继续 —— `autoplay: { delay: 3200, disableOnInteraction: false }`；
> ③ 圆点分页器指向 `#wyPag4` 且能点击跳转 —— `pagination: { el: '#wyPag4', clickable: true }`；
> ④ 初始效果为立方体 —— `effect: 'cube'`。
> 额外：切换动画时长 800 毫秒。

### 第 2 轮 AI 回答（最终采用版本）

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

### 验证方式与结论

把第 2 轮代码粘进页面（临时把初始 effect 设为 `cube`）→ 刷新 → F12 读取实例参数 → 截图。

- 参数实测：`effect="cube"`、`loop=true`、`delay=3200`、`disableOnInteraction=false`、`pagination.el="#wyPag4"`、`clickable=true` —— 全部命中。
- 截图：[verify/task1-cube.png](./verify/task1-cube.png)
- 一句话结论：cube 立方体正常渲染、圆点可点、3.2 秒自动翻、拖完继续翻，四项需求全部通过；验证完成后页面初始效果仍按要求保留为 `slide`（任务四的基础分要求）。

### 答辩准备

- **第一版提示词漏掉了哪个需求？** 漏了"手动操作后自动播放不能停"，只写了 `autoplay: true`；另外 `loop`、`clickable` 也没写。
- **第二轮怎么"说清楚"的？** 不再用"要能自动翻页"这种自然语言，而是把每条需求直接翻译成参数名和取值，AI 没有可以自由发挥的空间。
- **AI 第一次给的代码错在哪？** `autoplay` 用布尔值，无法控制延时，也不能保留手动操作后的继续播放；同时缺 `loop`、`clickable`、`speed`。

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

### 最终实现（[swiper-task.html](./swiper-task.html) 中 `ssc_fxOptions` 的 creative 分支）

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

### 1）第六件展品：爱达·魔都号

图片用 AI 生成（横版 16:9，实际输出 1368×768）：

> 生成一张 16:9 的写实照片：首艘国产大型邮轮爱达·魔都号停靠在上海邮轮港，白色船体配蓝红装饰带，船头有大面积艺术彩绘，蓝天白云、阳光充足，广角、电影感摄影。

slide 结构与原有 5 张完全一致（`img` + `.wy-cap` 标题/说明），插入位置在演示四最后一张之后。

### 2）超纲能力：keyboard 键盘控制

```js
keyboard: {
  enabled: true,
  onlyInViewport: true,
},
```

选它的理由：`mousewheel` 会劫持页面滚动，`zoom` 与 creative 3D 变换容易冲突，`parallax` 需要给每个子元素加 `data-swiper-parallax` 属性；`keyboard` 只响应 ← / →，不影响页面其他交互，实现成本最低、演示效果最直接。

实测：点一下轮播后按 `→`，`realIndex` 由 2 变为 3。

### 答辩四连问

1. **这段代码什么意思？**
   `ssc_fxOptions(effect)` 是一个配置工厂：返回 loop / speed / effect / autoplay / pagination / keyboard 的公共配置；如果 effect 是 `creative`，再追加 `creativeEffect` 描述前后两张的 3D 变换。这样按钮切换时不用复制两份配置。
2. **AI 第一次给的哪里不对、你改了什么？**
   第一次只给了 `effect: 'creative'`，没有给 `creativeEffect` —— 切换后画面完全不动，等于没切换。补上 `prev` / `next` 之后才有电影墙效果。
3. **新参数的作用？**
   `keyboard.enabled` 开启键盘支持；`keyboard.onlyInViewport` 保证只有轮播在视口内时才响应方向键，避免页面其他区域也被劫持。`creativeEffect` 里的 `translate` 第三个值是景深（Z 轴），`scale` 控制缩放，`shadow` 给卡片加投影。
4. **现场把 delay 改成指定值并解释预期变化。**
   例：`delay` 从 `3200` 改成 `1000` → 每张只停留 1 秒就翻页，翻页节奏变快 3.2 倍；`disableOnInteraction: false` 不变，所以手动拖完仍会继续按 1 秒翻。

---

## 验证清单

| 项目 | 结果 |
|---|---|
| 控制台报错 | 0 |
| 演示四 slide 数量 | 6（含爱达·魔都号） |
| 效果按钮数量 | 7（含 creative） |
| creative 切换 | prev `-55%/0/-320`、next `60%/0/-200` 生效 |
| 键盘控制 | 按 → 后 realIndex 2 → 3 |
| 第六张图 | 加载成功，1368×768（16:9） |
