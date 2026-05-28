# StuRegSys - 学生学籍管理系统

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/xuemuluo/xuebiyesji?style=for-the-badge\&logo=github)](https://github.com/xuemuluo/xuebiyesji) [![GitHub Forks](https://img.shields.io/github/forks/xuemuluo/xuebiyesji?style=for-the-badge\&logo=github)](https://github.com/xuemuluo/xuebiyesji) [![GitHub Last Commit](https://img.shields.io/github/last-commit/xuemuluo/xuebiyesji?style=for-the-badge\&logo=github)](https://github.com/xuemuluo/xuebiyesji) [![Vue.js](https://img.shields.io/badge/Vue.js-3.4.0-42b883?style=for-the-badge\&logo=vuedotjs)](https://vuejs.org/) [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-6DB33F?style=for-the-badge\&logo=springboot)](https://spring.io/projects/spring-boot) [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge\&logo=mysql)](https://www.mysql.com/)

**一个现代化的学生学籍管理系统，采用前后端分离架构**

## 项目简介

StuRegSys（Student Registration System）是一个现代化的学生学籍管理系统，采用前后端分离架构，支持多终端浏览器访问，无需本地安装。

## 功能特性


### 核心功能

- **学生信息管理**：支持学生基本信息的增删改查、批量导入导出以及信息变更记录追踪
- **学籍变动管理**：支持转入转出、休学复学、毕业等变动类型的申请与审核流程
- **班级信息管理**：包括班级维护、班主任分配和学生人数统计
- **成绩管理**：支持成绩录入、统计分析以及按学生查询所有成绩记录
- **考勤管理**：提供考勤记录录入、状态管理和统计分析功能
- **消息管理**：实现消息收发、未读提醒和已读标记
- **用户权限管理**：基于 RBAC 模型，支持多角色权限控制和密码管理
- **操作日志审计**：记录所有关键操作，支持日志查询和安全追溯
- **数据统计分析**：提供学生统计、变动统计、成绩统计和考勤统计等多维度数据分析

## 快速开始

### 本地开发

如需本地开发，请确保已安装以下环境：

- Node.js 16.0+
- Java 17.0+
- MySQL 8.0+
- Maven 3.6+

#### 数据库初始化

```bash
mysql -u root -p < data.sql
```

#### 后端启动

```bash
cd backend && mvn spring-boot:run
```

后端服务将在 <http://localhost:8081> 启动

#### 前端启动

```bash
cd frontend && npm install && npm run serve
```

前端服务将在 <http://localhost:8080> 启动

### 默认账号

系统初始化后提供以下默认账号（建议首次登录后修改密码）：

| 邮箱              | 密码     | 角色    |
| --------------- | ------ | ----- |
| <xueluo@qq.com> | 123456 | 系统管理员 |
| <wensy@qq.com>  | 123456 | 教务管理员 |
| <shensa@qq.com> | 123456 | 班主任   |
| <yangst@qq.com> | 123456 | 任课教师  |
| <lirn@qq.com>   | 123456 | 家长    |

## 数据库设计

系统主要数据表及其功能说明：

| 表名                 | 说明                      |
| ------------------ | ----------------------- |
| users              | 用户表 - 存储系统用户基本信息和认证信息   |
| students           | 学生信息表 - 存储学生基本信息和学籍信息   |
| classes            | 班级信息表 - 存储班级基本信息和班主任信息  |
| student\_changes   | 学籍变动表 - 记录学生学籍变动申请和审核信息 |
| info\_change\_logs | 信息变更记录表 - 记录学生信息变更历史    |
| operation\_logs    | 操作日志表 - 记录系统关键操作日志      |
| grades             | 成绩表 - 存储学生各科成绩信息        |
| attendance         | 考勤表 - 存储学生考勤记录          |
| messages           | 消息表 - 存储系统内部消息          |

