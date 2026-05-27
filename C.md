# STUREGSYS 版本迭代记录

## v2.0 (2026-05-27)

### 版本主题：后端Java包名全面重命名

### 更改原因

将后端所有Java包名从 `com.leafsms` 统一替换为 `com.sturegsys`，与前端项目名称保持一致，完成整个项目从 LeafSMS 到 StuRegSys 的全面重命名。

### 更改方式

1. 创建新目录 `backend/src/main/java/com/sturegsys/`，复制所有子目录和文件
2. 使用PowerShell批量替换53个Java文件中的 `com.leafsms` 为 `com.sturegsys`
3. 将 `LeafSmsApplication.java` 重命名为 `StuRegSysApplication.java`，更新类名
4. 删除旧目录 `backend/src/main/java/com/leafsms/`
5. 更新 `pom.xml` 中的 groupId、artifactId、name、description、finalName
6. 更新 `application.yml` 中的 spring.application.name 和 JWT secret
7. 更新 `application-prod.yml` 中的数据库URL、连接池名称、类型别名包
8. 更新 `application-dev.yml` 中的数据库URL
9. 更新 `Dockerfile` 中的 JAR 文件名

### 更改内容

#### 1. Java包目录重构
- 创建 `backend/src/main/java/com/sturegsys/` 及所有子目录
- 复制53个Java文件到新目录
- 删除旧目录 `backend/src/main/java/com/leafsms/`

#### 2. Java文件更新（53个文件）
- 所有 `package com.leafsms` → `package com.sturegsys`
- 所有 `import com.leafsms` → `import com.sturegsys`

#### 3. 应用主类重命名
- 文件：`LeafSmsApplication.java` → `StuRegSysApplication.java`
- 类名：`LeafSmsApplication` → `StuRegSysApplication`

#### 4. pom.xml 更新
- `<groupId>com.leafsms</groupId>` → `<groupId>com.sturegsys</groupId>`
- `<artifactId>leaf-sms-backend</artifactId>` → `<artifactId>stu-reg-sys-backend</artifactId>`
- `<name>leaf-sms-backend</name>` → `<name>stu-reg-sys-backend</name>`
- `<finalName>leaf-sms-backend</finalName>` → `<finalName>stu-reg-sys-backend</finalName>`

#### 5. 配置文件更新
- `application.yml`：spring.application.name、JWT secret
- `application-prod.yml`：数据库URL、连接池名称、类型别名包
- `application-dev.yml`：数据库URL
- `Dockerfile`：JAR 文件名

### 验证结果
- ✅ 新目录包含所有53个Java文件
- ✅ 所有包名和导入语句已更新
- ✅ 旧目录已完全删除
- ✅ 无残留的 `com.leafsms` 引用

---

## v1.8 (2026-05-27)

### 版本主题：项目名称统一与联系方式汇总

### 更改原因

将所有文档中的项目名称从 Leaf SMS/LEAF-SMS/LeafSMS 统一更新为 StuRegSys/STUREGSYS，并创建联系方式汇总文档。

### 更改方式

1. 更新 README.md：标题、简介、GitHub badge URLs、Docker 配置全部替换为新名称
2. 更新 API_DOCUMENTATION.md：标题和正文中的项目名称替换
3. 更新 需求分析.md：标题、项目名称、系统定位、系统边界图中的名称替换
4. 更新 CHANGELOG.md：所有项目名称变体替换为新名称
5. 更新 C.md：所有项目名称变体替换为新名称
6. 新增 联系方式汇总.md：汇总邮箱、GitHub、开发者、项目信息

### 更改内容

#### 1. README.md - 修改
- 标题 `Leaf SMS` → `StuRegSys`
- 项目简介 `Leaf SMS (Student Management System)` → `StuRegSys (Student Registration System)`
- GitHub badge URLs `YangShengzhou03/LeafSMS` → `xuemuluo/xuebiyesji`
- Docker 网络/容器名/镜像全部更新为 sturegsys 系列
- 数据库名 `leaf_sms` → `sturegsys`

#### 2. API_DOCUMENTATION.md - 修改
- 标题和正文 `Leaf SMS` → `StuRegSys`

#### 3. 需求分析.md - 修改
- 标题 `Leaf SMS` → `StuRegSys`
- 项目名称 `Leaf SMS (Student Management System)` → `StuRegSys (Student Registration System)`
- 系统定位和系统边界图中的 `Leaf SMS` → `StuRegSys`

#### 4. CHANGELOG.md - 修改
- 所有 `LEAF-SMS`/`LeafSMS`/`Leaf SMS` → `STUREGSYS`/`StuRegSys`

#### 5. C.md - 修改
- 所有 `LEAF-SMS`/`LeafSMS`/`Leaf SMS` → `STUREGSYS`/`StuRegSys`

#### 6. 联系方式汇总.md - 新增
- 汇总项目所有联系方式信息

---

## v1.7 (2026-05-24)

### 版本主题：GitNexus 代码智能分析

### 更改原因

用户希望使用 GitNexus（Graph RAG + LadybugDB）对整个项目进行代码图谱分析，了解项目架构、模块依赖和影响范围。

### 更改方式

1. 全局安装 `@xuansang2770/gitnexus` npm 包
2. 因原项目路径含中文字符（学生管理系统、雪落暮），GitNexus 数据库无法创建，将项目复制到 `C:\temp\StuRegSys` 并执行 `git init` + `git add` + `git commit`
3. 执行 `gitnexus analyze` 生成代码图谱
4. 使用 `gitnexus cypher` 执行多个 Cypher 查询获取详细数据
5. 使用 `gitnexus context` 和 `gitnexus impact` 进行上下文和影响分析

### 更改内容

#### GitNexus 分析 - 新增

**更改原因：** 深度分析项目代码结构和依赖关系

**更改方式：**
- 分析统计：3,059 nodes | 5,827 edges | 189 clusters | 266 flows
- 后端类扫描：36 个 Class + 17 个 Interface（Controller/Service/Entity/Mapper/Config/Utils）
- 前端函数扫描：80+ 个 Function（Layout 组件/页面组件/工具函数/API 路由）
- API 路由扫描：37 个 Route（auth/dashboard/students/classes/changes/users/logs/grades/attendance/messages）
- 社区聚类分析：189 个社区，最高内聚度 1.0（Service 类），Entity 类内聚度 0.8+
- 影响分析：AuthController 下游影响 7 个组件（风险 MEDIUM），StudentService 下游影响 1 个（风险 LOW）
- 依赖关系：所有前端页面通过 api.js 集中访问后端 API

## v1.6 (2026-05-15)

### 版本主题：比熊小狗自定义滚动条

### 更改原因

默认滚动条样式单调乏味，用户希望将滚动条改为可爱的比熊小狗造型，增加页面趣味性和个性化。

### 更改方式

1. 使用内联 SVG 绘制精致比熊小狗（替代纯CSS方块），包含身体、头部、耳朵、眼睛高光、鼻子、嘴巴、摇摆尾巴、爪子、头顶毛发
2. 滚动条轨道缩窄为 8px，小狗浮在轨道旁边，不遮挡导航栏
3. JS 监听滚动事件，根据滚动比例计算小狗位置
4. 滚动时显示区域提示气泡，1.5秒后自动隐藏

### 更改内容

#### LoginPage.vue - 修改
- 模板：纯CSS div替换为内联SVG比熊小狗图标
- 模板：新增 `.bichon-track` 窄轨道
- JS：`updateBichonPosition()` 适配新尺寸（36x36）
- CSS：滚动条宽度 52px → 8px，滑块可见且可hover
- CSS：删除全部纯CSS比熊样式（约150行），替换为SVG+精简样式

## v1.5 (2026-05-15)

### 版本主题：导航栏平滑滚动 + 活跃状态指示

### 更改原因

原导航栏使用 `href="#xxx"` 锚点跳转，会导致页面瞬间跳转而非平滑过渡，用户体验不佳。需要改为平滑滚动效果，同时添加当前位置指示。

### 更改方式

1. 将所有 `href="#xxx"` 改为 `@click.prevent="scrollToSection('xxx')"` 方法调用
2. 新增 `scrollToSection()` 方法，使用 `window.scrollTo({ behavior: 'smooth' })` 并减去导航栏高度偏移
3. 新增 IntersectionObserver 追踪当前可见区域，更新 `activeSection` 状态
4. 导航项添加 `.active` 类和 `::after` 伪元素下划线动画

### 更改内容

#### LoginPage.vue - 修改
- 导航栏 `<a>` 标签：`href="#home"` → `@click.prevent="scrollToSection('home')"`
- 新增 `scrollToSection()` 方法：精确偏移 + 平滑滚动
- 新增 `activeSection` ref：追踪当前区域
- 新增 IntersectionObserver：监听各 section 可见性
- 新增 CSS `.nav a::after` 和 `.nav a.active::after`：下划线动画

## v1.4 (2026-05-15)

### 版本主题：删除原首页 IndexLayout.vue，功能合并至 LoginPage.vue

### 更改内容

#### 1. LoginPage.vue - 修改

**更改原因：** 将原首页所有功能迁移到登录页面，消除冗余组件

**更改方式：**
- 导航栏新增已登录用户下拉菜单（头像+用户名+进入后台/退出登录）
- 导航栏"登录"链接根据登录状态动态显示为"进入后台"
- 新增功能特性卡片区域（学生信息管理、班级管理、学籍变动管理）
- 新增页脚区域（产品功能、帮助支持、法律信息、ICP备案号）
- 新增 isAuthenticated、displayName、userAvatar 计算属性
- 新增 features 数据和 handleUserCommand、scrollToFeatures 方法
- scrollToLogin 方法增加已登录状态判断
- 新增 Element Plus 图标导入（User、UserFilled、School、Document）
- 新增功能特性区域和页脚的 CSS 样式及移动端响应式适配

#### 2. IndexLayout.vue - 删除

**更改原因：** 功能已全部迁移至 LoginPage.vue，组件冗余

**更改方式：** 删除整个文件

#### 3. route/index.js - 修改

**更改原因：** 移除已删除组件的路由

**更改方式：** 删除 /home 路由（原指向 IndexLayout.vue）

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
- 移植标题遮罩切换效果（鼠标悬停时 "STUREGSYS" ↔ "学生学籍管理系统" 径向渐变切换）
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

- 登录页标题从 `'登录 - StuRegSys'` 改为 `'STUREGSYS - 学生学籍管理系统'`
- 修复目录大小写问题：`@/views/admin/` → `@/views/Admin/`（14处）
- 修复目录大小写问题：`@/views/teacher/` → `@/views/Teacher/`（8处）

#### 3. CHANGELOG.md - 新增

**更改原因：** 记录版本迭代和更改内容

**更改方式：** 创建更新日志文件，记录 v1.2 所有更改

#### 4. C.md - 新增

**更改原因：** 记录版本迭代信息

**更改方式：** 创建版本迭代记录文件

---

## v2.1 (2026-05-27)

### 版本主题：Bug修复与页面清理

### 更改原因

修复数据库配置损坏和表结构缺失问题，清理联系我们页面中的原作者信息。

### 更改方式

1. 恢复 `application-dev.yml` 中被意外替换的数据库URL
2. 为 `students` 表添加 `current_address` 列
3. 删除 `ContactUsPage.vue` 中的QQ群和Gitee链接

### 更改内容

#### 1. application-dev.yml 数据库配置修复
- 原因：数据库URL被意外替换为bichon.png文件路径，Spring Boot启动失败
- 恢复：`url: jdbc:mysql://localhost:3306/leaf_sms?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai`

#### 2. students表添加current_address列
- 原因：Student实体类有current_address字段但数据库表缺少该列
- 执行：`ALTER TABLE students ADD COLUMN current_address VARCHAR(255) DEFAULT NULL`

#### 3. 联系我们页面清理
- 保留：电子邮件 `Y3023209684@outlook.com`
- 删除：QQ群链接、Gitee开源项目链接
