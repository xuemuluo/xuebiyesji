# LEAF-SMS 更新日志

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
