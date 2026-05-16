# LEAF-SMS 版本迭代记录

## v1.3 (2026-05-17)

### 版本主题：前端路由路径统一 - '/login' → '/'

### 更改内容

#### 1. AcademicLayout.vue - 修改

**更改原因：** 统一前端路由路径，登录页作为根路径 '/' 访问

**更改方式：** 退出登录跳转 `router.push('/login')` → `router.push('/')`

#### 2. AdminLayout.vue - 修改

**更改原因：** 统一前端路由路径

**更改方式：** 退出登录跳转 `router.push('/login')` → `router.push('/')`

#### 3. HeadTeacherLayout.vue - 修改

**更改原因：** 统一前端路由路径

**更改方式：** 退出登录跳转 `router.push('/login')` → `router.push('/')`

#### 4. IndexLayout.vue - 修改（3处）

**更改原因：** 统一前端路由路径

**更改方式：**
- 登录按钮跳转 `router.push('/login')` → `router.push('/')`
- 注册按钮跳转 `router.push('/login?mode=register')` → `router.push('/?mode=register')`
- 未认证跳转 `router.push('/login')` → `router.push('/')`

#### 5. ParentLayout.vue - 修改

**更改原因：** 统一前端路由路径

**更改方式：** 退出登录跳转 `router.push('/login')` → `router.push('/')`

#### 6. TeacherLayout.vue - 修改

**更改原因：** 统一前端路由路径

**更改方式：** 退出登录跳转 `router.push('/login')` → `router.push('/')`

#### 7. Server.js - 修改（4处）

**更改原因：** 统一前端路由路径判断和重定向

**更改方式：**
- 响应拦截器登录页判断 `path === '/login'` → `path === '/'`
- 错误拦截器登录页判断 `path === '/login'` → `path === '/'`
- Token过期重定向条件 `currentPath !== '/login' && !currentPath.includes('/login')` → `currentPath !== '/'`
- Token过期重定向目标 `router.replace('/login')` → `router.replace('/')`

#### 8. route/index.js - 修改（3处）

**更改原因：** 将登录页设为根路径，原首页移至 /home

**更改方式：**
- 路由路径 `/login` → `/`，组件为 LoginPage.vue
- 路由路径 `/` → `/home`，组件为 IndexLayout.vue
- 路由守卫中 `next('/login')` → `next('/')`（2处）
- 已登录用户访问根路径时自动跳转角色页面

#### 注意

- 后端 API 路径 `/api/auth/login` 未修改，仅修改前端路由路径

## v1.2 (2026-05-15)

### 版本主题：登录页面改版 - Personnal-Web 视觉风格移植

### 更改内容

#### 1. LoginPage.vue - 完全重写

**更改原因：** 将 Personnal-Web 个人主页的极简黑白视觉风格集成到登录页面，提升视觉体验

**更改方式：**

- 移植自定义光标效果（`mix-blend-mode: difference` 白色圆形光标跟随鼠标）
- 移植标题遮罩切换效果（鼠标悬停时 "LEAF-SMS" ↔ "学生学籍管理系统" 径向渐变切换）
- 移植翻转卡片动画（登录/关于/联系三个面板 `clip-path` 翻转）
- 移植擦除光线效果（翻转时白色光线从左到右扫过）
- 新增毛玻璃导航栏（`backdrop-filter: blur(12px)`）
- 新增视图切换动画（登录/注册/忘记密码 `fadeInUp` 过渡）
- 适配暗色背景下 Element Plus 组件样式
- 页面加载 800ms 后自动翻转登录面板
- 联系区域添加 GitHub 仓库链接（Personnal-Web + @BOATCHUANGU）
- 保留全部原有功能（登录/注册/忘记密码/表单验证/角色路由/记住密码）

#### 2. route/index.js - 修改

**更改原因：** 匹配新设计标题 + 修复构建错误

**更改方式：**

- 登录页标题从 `'登录 - Leaf SMS'` 改为 `'LEAF-SMS - 学生学籍管理系统'`
- 修复目录大小写问题：`@/views/admin/` → `@/views/Admin/`（14处）
- 修复目录大小写问题：`@/views/teacher/` → `@/views/Teacher/`（8处）

#### 3. CHANGELOG.md - 新增

**更改原因：** 记录版本迭代和更改内容

**更改方式：** 创建更新日志文件，记录 v1.2 所有更改

#### 4. C.md - 新增

**更改原因：** 记录版本迭代信息

**更改方式：** 创建版本迭代记录文件
