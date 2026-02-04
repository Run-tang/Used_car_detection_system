# 车易检 - 二手车检测系统 (Vehicle Inspection System)

![Dashboard Preview](https://img.shields.io/badge/Status-Development-orange)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20AntD-blue)

## 项目简介 (Overview)

**车易检** 是一款专为二手车检测业务打造的管理系统。它覆盖了从工单创建、自动/手动派单、现场检测到在线审核、最终生成专业报告的全流程。系统支持“一车一档”管理逻辑，确保每一辆待检车辆的完整历史记录可追溯，并提供精细化的检测师管理与绩效统计。

## 核心功能 (Core Features)

### 1. 工单管理 (Work Order Management)
- **智能创建**：支持通过库存车辆档案快速创建工单，自动带出车辆信息及保管人。
- **派单分发**：支持将工单指派给特定的检测师，涵盖“待处理”、“进行中”、“待审核”等全生命周期管理。

### 2. 检测师管理 (Inspector Management)
- **状态追踪**：实时管理检测师账户状态（启用/禁用）。
- **绩效量化**：展示待检测任务、累计已检总量及平均检测耗时等核心 KPI。
- **任务联动**：点击待检任务数可直接跳转并过滤该检测师名下的待处理工单。

### 3. 检测报告 (Inspection Reports)
- **动态模板**：根据车辆动力类型（燃油/新能源）动态加载不同检测模板。
- **全页预览**：提供全页沉浸式报告详情，重点展示评分等级、异常缺陷项及分类详细检测点。
- **一车一档**：支持将报告与车辆档案关联，构建完整的车辆生命周期足迹。

### 4. 模板配置 (Inspection Templates)
- **灵活定制**：支持自定义检测大类与具体检查项。
- **业务规则限制**：确保同一种车型（燃油/新能源）同时仅有一个活跃模板。

## 技术栈 (Tech Stack)

- **框架**: [React 18](https://reactjs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **类型系统**: [TypeScript](https://www.typescriptlang.org/)
- **UI 组件库**: [Ant Design](https://ant.design/)
- **样式处理**: [Tailwind CSS](https://tailwindcss.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **图标**: [Lucide React](https://lucide.dev/) & [Ant Design Icons](https://icons.ant.design/)

## 快速上手 (Quick Start)

### 1. 环境依赖 (Prerequisites)
- [Node.js](https://nodejs.org/) (建议 v18+)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)

### 2. 安装 (Installation)
克隆仓库并安装依赖：
```bash
git clone https://github.com/Run-tang/Used_car_detection_system.git
cd Used_car_detection_system/app
npm install
```

### 3. 运行 (Development)
启动本地开发服务器：
```bash
npm run dev
```
运行后，可以在浏览器中通过提示的本地 URL (通常是 `http://localhost:5173`) 访问系统。

### 4. 构建 (Build)
生成生产环境版本：
```bash
npm run build
```

## 开发者说明 (Developer Notes)
本项目采用模块化开发，业务代码位于 `src/pages`，数据模拟逻辑位于 `src/data/mock.ts`。UI 相关的通用组件已封装于 `@/components/ui` 目录下。

---
*注：本项目目前为演示版本，数据通过 Mock 数据模拟生成。*
