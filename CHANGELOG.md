# STUREGSYS 更新日志

## [v1.7] - 2026-05-24

### GitNexus 代码智能分析

### 概述

安装 GitNexus（Graph RAG + LadybugDB）代码智能分析工具，对整个 LeafSMS 项目进行深度代码图谱分析，生成完整的依赖关系图、社区聚类、影响分析和 API 路由全景。

### 修改内容

#### 工具安装

1. **GitNexus 安装**
   - 全局安装 `@xuansang2770/gitnexus` npm 包
   - 因原项目路径含中文字符导致数据库创建失败，将项目复制到 `C:\temp\LeafSMS` 并初始化 git 仓库

2. **分析结果**
   - 代码节点: 3,059
   - 依赖关系: 5,827
   - 社区聚类: 189
   - 数据流: 266

3. **关键发现**
   - 后端 36 个类 + 17 个接口，标准三层架构（Controller → Service → Mapper）
   - 前端 37 个 API 路由集中定义在 api.js，是所有页面的数据枢纽
   - 5 种角色权限体系（管理员/教师/班主任/教务/家长），各有独立 Layout
   - AuthController 下游影响 7 个组件，修改风险 MEDIUM
   - Entity 聚类内聚度最高（0.8+），数据模型设计合理

## [v1.6] - 2026-05-15

### 比熊小狗自定义滚动条

### 概述

将页面默认滚动条替换为可爱的比熊小狗（Bichon Frise）造型，滚动时小狗会跟着上下移动，并显示当前区域的提示气泡。

### 修改内容

#### LoginPage.vue

1. **SVG 比熊小狗图标**
   - 使用内联 SVG 绘制精致比熊小狗：白色圆球身体、头部、下垂耳朵、眼睛（含高光）、鼻子、微笑嘴巴、摇摆尾巴、小爪子、头顶毛发
   - 尾巴使用 SVG `<animateTransform>` 实现持续摇摆动画
   - 添加 `drop-shadow` 阴影增加立体感

2. **窄轨道滚动条**
   - 原生滚动条宽度从 52px 缩小到 8px
   - 滚动条滑块改为暖色 `#e0d4c4`，hover 时加深
   - 小狗浮在轨道旁边（右侧 6px），不遮挡页面内容

3. **滚动位置追踪**
   - `updateBichonPosition()` 根据滚动比例计算小狗位置
   - 滚动时显示区域提示气泡（🏠首页、🔐登录、✨介绍、📖关于、📬联系）
   - 1.5秒后自动隐藏提示

## [v1.5] - 2026-05-15

### 导航栏平滑滚动 + 活跃状态指示

### 概述

将页面顶部导航栏的点击交互行为从页面锚点跳转修改为平滑滚动过渡效果，并添加滚动位置追踪，在导航栏高亮当前所在区域。

### 修改内容

#### LoginPage.vue

1. **导航栏点击行为改为平滑滚动**
   - 所有 `href="#xxx"` 锚点链接改为 `@click.prevent="scrollToSection('xxx')"`
   - 新增 `scrollToSection()` 方法，使用 `window.scrollTo({ behavior: 'smooth' })` 实现平滑滚动
   - 滚动目标位置精确计算，减去导航栏高度偏移，确保目标区域完全显示在视口内

2. **滚动位置追踪（IntersectionObserver）**
   - 新增 `activeSection` 响应式变量追踪当前所在区域
   - 使用 IntersectionObserver 监听各 section 的可见性
   - rootMargin 设置为 `-40% 0px -55% 0px`，精确匹配视口中间区域

3. **导航栏活跃状态指示**
   - 当前区域对应的导航项添加 `.active` 类
   - 使用 `::after` 伪元素实现底部下划线动画
   - 下划线从 0 宽度过渡到 100% 宽度，动画时长 0.3s

4. **统一滚动方法**
   - `scrollToLogin` 和 `scrollToFeatures` 均复用 `scrollToSection()`
   - 所有滚动行为保持一致的偏移计算逻辑

## [v1.4] - 2026-05-15

### 删除原首页 IndexLayout.vue，功能全部合并至 LoginPage.vue

### 概述

将原首页（IndexLayout.vue）的所有功能迁移到当前登录页面（LoginPage.vue），删除冗余的 IndexLayout.vue 组件和 /home 路由，实现单页面承载全部首页功能。

---

## 修改文件清单

### 1. `frontend/src/views/LoginPage.vue`

**改动类型：** 修改

**改动内容：**

- 导航栏新增已登录用户下拉菜单（头像 + 用户名 + 进入后台/退出登录）
- 导航栏"登录"链接根据登录状态动态显示为"进入后台"
- 新增功能特性卡片区域（学生信息管理、班级管理、学籍变动管理）
- 新增页脚区域（产品功能、帮助支持、法律信息、ICP备案号）
- 新增 `isAuthenticated`、`displayName`、`userAvatar` 计算属性
- 新增 `features` 数据（3个功能卡片）
- 新增 `handleUserCommand` 方法（退出登录/进入后台）
- 新增 `scrollToFeatures` 方法
- `scrollToLogin` 方法增加已登录状态判断，直接跳转角色后台
- 新增 Element Plus 图标导入（User、UserFilled、School、Document）
- 新增功能特性区域和页脚的 CSS 样式及移动端响应式适配

### 2. `frontend/src/components/IndexLayout.vue`

**改动类型：** 删除

**改动内容：** 整个文件已删除，功能已迁移至 LoginPage.vue

### 3. `frontend/src/route/index.js`

**改动类型：** 修改

**改动内容：** 删除 `/home` 路由（原指向 IndexLayout.vue）

---

## 迁移功能对照表

| 原首页功能 | 迁移位置 |
|-----------|---------|
| 登录/注册按钮 | 已有（LoginPage.vue 翻转面板） |
| 已登录用户头像下拉 | 导航栏右侧 |
| 进入后台 | 导航栏"登录"链接 + 下拉菜单 |
| 退出登录 | 导航栏用户下拉菜单 |
| 功能特性卡片（3个） | 联系区域下方新增 |
| 页脚（ICP备案等） | 功能特性区域下方新增 |

---

## [v1.3] - 2026-05-17

### 前端路由路径统一：'/login' → '/'

### 概述

将所有前端路由引用从 '/login' 统一更新为 '/'，使登录页面作为根路径访问。仅修改前端路由跳转路径，不涉及后端 API 路径（如 '/api/auth/login' 保持不变）。

---

## 修改文件清单

### 1. `frontend/src/components/AcademicLayout.vue`

**改动类型：** 修改（1处）

**改动内容：**
- 退出登录后跳转路径：`router.push('/login')` → `router.push('/')`

### 2. `frontend/src/components/AdminLayout.vue`

**改动类型：** 修改（1处）

**改动内容：**
- 退出登录后跳转路径：`router.push('/login')` → `router.push('/')`

### 3. `frontend/src/components/HeadTeacherLayout.vue`

**改动类型：** 修改（1处）

**改动内容：**
- 退出登录后跳转路径：`router.push('/login')` → `router.push('/')`

### 4. `frontend/src/components/IndexLayout.vue`

**改动类型：** 修改（3处）

**改动内容：**
- 登录按钮跳转：`router.push('/login')` → `router.push('/')`
- 注册按钮跳转：`router.push('/login?mode=register')` → `router.push('/?mode=register')`
- 未认证用户跳转：`router.push('/login')` → `router.push('/')`

### 5. `frontend/src/components/ParentLayout.vue`

**改动类型：** 修改（1处）

**改动内容：**
- 退出登录后跳转路径：`router.push('/login')` → `router.push('/')`

### 6. `frontend/src/components/TeacherLayout.vue`

**改动类型：** 修改（1处）

**改动内容：**
- 退出登录后跳转路径：`router.push('/login')` → `router.push('/')`

### 7. `frontend/src/utils/Server.js`

**改动类型：** 修改（4处）

**改动内容：**
- 响应拦截器登录页判断：`router.currentRoute.value.path === '/login'` → `router.currentRoute.value.path === '/'`
- 错误拦截器登录页判断：`router.currentRoute.value.path === '/login'` → `router.currentRoute.value.path === '/'`
- Token过期重定向条件：`currentPath !== '/login' && !currentPath.includes('/login')` → `currentPath !== '/'`
- Token过期重定向目标：`router.replace('/login')` → `router.replace('/')`

---

## 注意事项

- 所有 `/api/auth/login` 后端 API 路径保持不变，仅修改前端路由路径
- 共修改 7 个文件，12 处代码变更

---

## [v1.2] - 2026-05-15

### 登录页面改版 - Personnal-Web 视觉风格移植

### 概述

将 [Personnal-Web](https://github.com/BOATCHUANGU/Personnal-Web) 个人主页的极简黑白视觉风格完整移植到 LEAF-SMS 学生学籍管理系统的登录页面，同时保留所有原有功能。

---

## 修改文件清单

### 1. `frontend/src/views/LoginPage.vue`

**改动类型：** 完全重写

**改动内容：**

#### 新增视觉效果

| 效果 | 说明 |
|------|------|
| 自定义光标 | `mix-blend-mode: difference` 白色圆形光标跟随鼠标移动 |
| 标题遮罩切换 | 鼠标悬停时 "LEAF-SMS" ↔ "学生学籍管理系统" 径向渐变遮罩切换 |
| 翻转卡片动画 | 登录/关于/联系三个面板，鼠标悬停触发 `clip-path` 翻转动画 |
| 擦除光线效果 | 翻转时白色光线从左到右扫过的动画 |
| 毛玻璃导航栏 | `backdrop-filter: blur(12px)` 顶栏，悬停时自动隐藏自定义光标 |
| 视图切换动画 | 登录/注册/忘记密码切换时的 `fadeInUp` 过渡动画 |

#### 页面结构

```
┌─────────────────────────────────┐
│  LEAF-SMS    首页 关于 登录 联系  │  ← 毛玻璃导航栏
├─────────────────────────────────┤
│                                 │
│     学生学籍管理系统              │  ← eyebrow
│     LEAF-SMS / 学生学籍管理系统   │  ← 标题遮罩切换区
│     专业的学生学籍管理解决方案     │  ← subcopy
│                                 │
├─────────────────────────────────┤
│  登录 (正面)                     │  ← 翻转前
│  ┌─────────────────────────────┐│
│  │ 登录/注册/重置密码 表单       ││  ← 翻转后（暗色背景）
│  │ 邮箱 / 密码 / 记住密码       ││
│  │ 登录按钮                     ││
│  │ 没有账号？忘记密码？          ││
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  关于 (正面)                     │
│  系统介绍文字 (翻转后)            │
├─────────────────────────────────┤
│  联系 (正面)                     │
│  GitHub 仓库链接 (翻转后)         │
└─────────────────────────────────┘
```

#### 保留的原有功能

- 登录表单（邮箱 + 密码 + 记住密码）
- 注册表单（邮箱 + 密码 + 密码强度检测 + 用户协议勾选）
- 忘记密码表单（管理员邮箱 + 验证码 + 新密码）
- Element Plus 表单验证规则
- API 调用逻辑（store.login / store.register / store.resetPassword）
- 角色路由跳转（ADMIN / ACADEMIC / HEADTEACHER / TEACHER / PARENT）
- 记住密码自动填充
- 支持 `/login?mode=register` URL 参数跳转注册

#### 交互细节

- 页面加载 800ms 后自动翻转登录面板展示表单
- 鼠标悬停导航栏和表单区域时自动隐藏自定义光标，方便操作
- 暗色背景下的 Element Plus 组件样式全面适配（输入框、复选框、按钮等）
- 完整的移动端响应式适配（720px 断点）

---

### 2. `frontend/src/route/index.js`

**改动类型：** 修改

**改动内容：**

1. **更新登录页标题**
   - 旧：`'登录 - Leaf SMS'`
   - 新：`'LEAF-SMS - 学生学籍管理系统'`

2. **修复目录大小写问题（22处）**
   - `@/views/admin/` → `@/views/Admin/`（14处）
   - `@/views/teacher/` → `@/views/Teacher/`（8处）
   - 修复 `CaseSensitivePathsPlugin` 构建报错

---

## 技术实现细节

### 自定义光标

```css
.cursor-capture {
  width: 168px;
  height: 168px;
  background: #fff;
  mix-blend-mode: difference;
  transform: translate3d(var(--cursor-x), var(--cursor-y), 0) translate(-50%, -50%);
}
```

通过 CSS 变量 `--cursor-x` / `--cursor-y` 实时跟踪鼠标位置，`mix-blend-mode: difference` 实现光标与背景的颜色反转效果。

### 标题遮罩切换

```css
.title-layer--en {
  mask-image: radial-gradient(circle 84px at var(--mask-x) var(--mask-y),
    transparent 0 83px, #000 84px);
}
.title-layer--cn {
  mask-image: radial-gradient(circle 84px at var(--mask-x) var(--mask-y),
    #000 0 83px, transparent 84px);
}
```

鼠标在标题区域移动时，84px 半径的圆形区域内显示中文标题，区域外显示英文标题。

### 翻转卡片动画

```css
.flip-card-back {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.5s cubic-bezier(0.1, 0.9, 0.20, 1);
}
.flip-panel.flipped .flip-card-back {
  clip-path: inset(0 0% 0 0);
}
```

使用 `clip-path` 从右到左展开，配合 `cubic-bezier` 缓动曲线实现流畅的翻转效果。

---

## 参考来源

- 视觉效果来源：[Personnal-Web](https://github.com/BOATCHUANGU/Personnal-Web)
- 原系统项目：LEAF-SMS 学生学籍管理系统
