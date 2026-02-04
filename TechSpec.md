# 二手车检测系统 - 技术规划文档

## 1. 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **UI组件库**: shadcn/ui
- **状态管理**: React Context + useReducer
- **路由**: React Router v6
- **图表**: ECharts + recharts
- **地图**: 模拟地图组件 (高德地图API集成预留)
- **动画**: Framer Motion

## 2. 组件清单

### shadcn/ui 内置组件
| 组件 | 用途 |
|-----|------|
| Button | 所有按钮 |
| Card | 卡片容器 |
| Input | 表单输入 |
| Label | 表单标签 |
| Select | 下拉选择 |
| Dialog | 弹窗/模态框 |
| Table | 数据表格 |
| Badge | 状态标签 |
| Tabs | 标签页切换 |
| Accordion | 折叠面板 |
| Avatar | 用户头像 |
| Checkbox | 复选框 |
| RadioGroup | 单选组 |
| Textarea | 多行文本 |
| DatePicker | 日期选择 |
| Popover | 浮层 |
| Tooltip | 提示 |
| Separator | 分割线 |
| Skeleton | 加载骨架 |
| Progress | 进度条 |
| ScrollArea | 滚动区域 |
| Sheet | 侧边抽屉 |
| Toast | 消息提示 |

### 自定义组件
| 组件 | 用途 | 复杂度 |
|-----|------|--------|
| Sidebar | 后台侧边栏导航 | 中 |
| Header | 顶部导航栏 | 低 |
| StatCard | 数据统计卡片 | 低 |
| StatusBadge | 状态标签 | 低 |
| WorkOrderTable | 工单表格 | 中 |
| InspectionStepper | 检测步骤条 | 中 |
| VehicleDiagram | 车辆平面图标记 | 高 |
| PhotoUploader | 拍照上传组件 | 中 |
| OCRScanner | OCR识别模拟 | 中 |
| ReportPreview | 报告预览 | 高 |
| AuditPanel | 审核双栏面板 | 高 |
| MapView | 地图视图 | 中 |
| CountUp | 数字递增动画 | 低 |

## 3. 动画实现方案

| 动画 | 库 | 实现方式 | 复杂度 |
|-----|---|---------|--------|
| 页面加载淡入 | Framer Motion | motion.div + initial/animate | 低 |
| 列表交错动画 | Framer Motion | staggerChildren | 低 |
| 数字递增 | 自定义Hook | useCountUp + requestAnimationFrame | 低 |
| 卡片Hover | Tailwind + Framer | whileHover + transition | 低 |
| 模态框弹窗 | Framer Motion | AnimatePresence + scale/opacity | 中 |
| 步骤切换 | Framer Motion | AnimatePresence + slide | 中 |
| 表格行Hover | Tailwind CSS | hover:bg-gray-50 transition | 低 |
| 状态标签变色 | Tailwind CSS | transition-colors duration-200 | 低 |
| 图片查看器 | Framer Motion | layoutId + shared layout | 高 |
| 车辆图标记 | Framer Motion | scale + opacity on select | 中 |

## 4. 项目结构

```
/mnt/okcomputer/output/app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 组件
│   │   ├── layout/          # 布局组件 (Sidebar, Header)
│   │   ├── common/          # 通用组件 (StatCard, StatusBadge)
│   │   ├── inspection/      # 检测相关组件
│   │   ├── audit/           # 审核相关组件
│   │   └── report/          # 报告相关组件
│   ├── pages/
│   │   ├── Login.tsx        # 登录页
│   │   ├── Dashboard.tsx    # 仪表盘
│   │   ├── WorkOrders/      # 工单管理
│   │   ├── Inspection/      # 检测流程
│   │   ├── Audit/           # 审核系统
│   │   ├── Reports/         # 报告管理
│   │   └── Settings/        # 系统设置
│   ├── hooks/
│   │   ├── useCountUp.ts    # 数字递增
│   │   ├── useLocalStorage.ts
│   │   └── useInspection.ts # 检测流程状态
│   ├── context/
│   │   ├── AuthContext.tsx  # 认证状态
│   │   └── WorkOrderContext.tsx # 工单状态
│   ├── types/
│   │   └── index.ts         # TypeScript类型定义
│   ├── data/
│   │   └── mock.ts          # 模拟数据
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── images/              # 静态图片
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 5. 路由设计

```
/                    -> 登录页
/dashboard           -> 仪表盘 (默认)
/work-orders         -> 工单列表
/work-orders/:id     -> 工单详情
/inspection/:id      -> 检测流程
/audit               -> 审核队列
/audit/:id           -> 审核详情
/reports             -> 报告列表
/reports/:id         -> 报告详情
/settings            -> 系统设置
```

## 6. 状态管理

### AuthContext
- user: 当前用户信息
- role: 用户角色
- isAuthenticated: 登录状态
- login/logout: 登录登出方法

### WorkOrderContext
- workOrders: 工单列表
- currentOrder: 当前工单
- filters: 筛选条件
- pagination: 分页信息
- CRUD操作方法

### InspectionContext
- currentStep: 当前检测步骤
- inspectionData: 检测数据
- photos: 照片列表
- saveProgress: 保存进度
- submitInspection: 提交检测

## 7. 模拟数据

### 工单数据
- 20+条模拟工单
- 覆盖所有状态
- 包含完整车辆信息

### 检测师数据
- 10+名检测师
- 包含位置、评分、任务数

### 检测项模板
- 200+项检测点
- 7大分类
- 标准化数据结构

## 8. 性能优化

- 组件懒加载 (React.lazy)
- 图片懒加载
- 虚拟列表 (长表格)
- 状态局部化
- 避免不必要重渲染

## 9. 开发计划

### Phase 1: 基础架构
1. 初始化项目
2. 配置路由
3. 搭建布局组件
4. 设置状态管理

### Phase 2: 核心功能
1. 登录页
2. 仪表盘
3. 工单管理
4. 检测流程

### Phase 3: 高级功能
1. 审核系统
2. 报告生成
3. 地图集成
4. 数据可视化

### Phase 4: 优化完善
1. 动画效果
2. 响应式适配
3. 性能优化
4. 测试修复
