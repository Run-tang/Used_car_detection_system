import type { WorkOrder, Inspector, User, InspectionReport, DashboardStats, ChartData, PieChartData, InspectionItem, WorkOrderStatus, VehicleArchive } from '@/types';

// 当前登录用户
export const currentUser: User = {
  id: '1',
  name: '张管理员',
  role: 'admin',
  phone: '13800138000',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
};

// 检测师列表
export const inspectors: Inspector[] = [
  {
    id: 'i1',
    name: '李检测师',
    phone: '13800138001',
    currentTasks: 2,
    completedTasks: 43,
    avgInspectionTime: 45,
    status: 'active',
    city: '北京',
    location: { lat: 39.9042, lng: 116.4074 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i1',
  },
  {
    id: 'i2',
    name: '王检测师',
    phone: '13800138002',
    currentTasks: 1,
    completedTasks: 58,
    avgInspectionTime: 52,
    status: 'active',
    city: '北京',
    location: { lat: 39.9142, lng: 116.4174 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i2',
  },
  {
    id: 'i3',
    name: '赵检测师',
    phone: '13800138003',
    currentTasks: 3,
    completedTasks: 62,
    avgInspectionTime: 48,
    status: 'active',
    city: '上海',
    location: { lat: 39.8942, lng: 116.3974 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i3',
  },
  {
    id: 'i4',
    name: '刘检测师',
    phone: '13800138004',
    currentTasks: 0,
    completedTasks: 35,
    avgInspectionTime: 60,
    status: 'active',
    city: '广州',
    location: { lat: 39.9242, lng: 116.4274 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i4',
  },
  {
    id: 'i5',
    name: '陈检测师',
    phone: '13800138005',
    currentTasks: 1,
    completedTasks: 12,
    avgInspectionTime: 55,
    status: 'disabled',
    city: '深圳',
    location: { lat: 39.8842, lng: 116.3874 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i5',
  },
];

// 库存车辆列表 (For MVP Select)
export const inventoryVehicles = [
  {
    id: 'inv1',
    vin: 'LHGCR1620H8000008',
    brand: '本田',
    model: '雅阁 2022款 260TURBO 幻夜·尊贵版',
    plateNumber: '京A88888',
    custodian: { name: '张库管', phone: '13800000001' }
  },
  {
    id: 'inv2',
    vin: 'LSVAG2180E2100009',
    brand: '大众',
    model: '迈腾 2023款 330TSI 领先型',
    plateNumber: '京A66666',
    custodian: { name: '李库管', phone: '13800000002' }
  },
  {
    id: 'inv3',
    vin: 'LVGBE40K78G000010',
    brand: '宝马',
    model: '3系 2023款 325Li M运动套装',
    plateNumber: '京A99999',
    custodian: { name: '王库管', phone: '13800000003' }
  }
];

// 工单列表
// Helper to generate mock Work Orders
const generateWorkOrders = (count: number): WorkOrder[] => {
  const brands = ['大众', '丰田', '本田', '宝马', '奥迪', '奔驰', '特斯', '比亚迪', '长安', '吉利'];
  const models: Record<string, string[]> = {
    '大众': ['迈腾', '帕萨特', '途观L', '高尔夫'],
    '丰田': ['凯美瑞', '卡罗拉', '汉兰达', 'RAV4'],
    '本田': ['雅阁', '思域', 'CR-V'],
    '宝马': ['3系', '5系', 'X3', 'X5'],
    '奥迪': ['A4L', 'A6L', 'Q5L'],
    '奔驰': ['C级', 'E级', 'GLC'],
    '特斯拉': ['Model 3', 'Model Y'],
    '比亚迪': ['汉', '唐', '秦PLUS'],
    '长安': ['CS75 PLUS', '逸动'],
    '吉利': ['星越L', '帝豪'],
  };
  const colors = ['白色', '黑色', '银色', '灰色', '红色', '蓝色'];
  const statuses: WorkOrderStatus[] = ['created', 'pending_dispatch', 'dispatched', 'in_progress', 'under_review', 'completed', 'rejected', 'cancelled'];

  return Array.from({ length: count }).map((_, i) => {
    const id = `wo${i + 1}`;
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const brandModels = models[brand] || ['未知车型'];
    const model = brandModels[Math.floor(Math.random() * brandModels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isCompleted = status === 'completed' || status === 'rejected';
    const year = 2015 + Math.floor(Math.random() * 9); // 2015-2023

    return {
      id,
      orderNo: `WO2024${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}${String(i + 1).padStart(4, '0')}`,
      vehicle: {
        id: `v${i + 1}`,
        vin: `VIN${Math.random().toString(36).substring(2, 10).toUpperCase()}${String(i).padStart(6, '0')}`,
        brand,
        model: `${model} ${year}款`,
        year,
        color: colors[Math.floor(Math.random() * colors.length)],
        plateNumber: `京${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
        mileage: Math.floor(Math.random() * 100000) + 1000,
      },
      custodian: {
        name: `客户${i + 1}`,
        phone: `138${String(Math.random()).substring(2, 10)}`,
      },
      inspector: inspectors[Math.floor(Math.random() * inspectors.length)],
      status,
      appointmentTime: '2024-01-30 14:00',
      createdAt: '2024-01-20 10:00',
      updatedAt: '2024-01-29 18:00',
      completedAt: isCompleted ? '2024-01-29 18:00' : undefined,
      location: {
        lat: 39.9042 + (Math.random() - 0.5) * 0.1,
        lng: 116.4074 + (Math.random() - 0.5) * 0.1,
        address: '北京市某检测地点',
      },
      // Randomly assign archiveId to some completed orders to simulate "Linked" state for about 30% of completed ones
      archiveId: (isCompleted && Math.random() > 0.7) ? `va${i}` : undefined
    };
  });
};

// Generate 100 mock orders
export const workOrders: WorkOrder[] = generateWorkOrders(100);

// 仪表盘统计数据
export const dashboardStats: DashboardStats = {
  todayPending: 28,
  pendingAudit: 15,
  monthlyCompleted: 342,
  onlineInspectors: 18,
  todayTrend: 12,
  auditTrend: -5,
  monthlyTrend: 23,
  inspectorTrend: 3,
};

// 检测趋势数据
export const inspectionTrendData: ChartData[] = [
  { date: '01-23', value: 42 },
  { date: '01-24', value: 38 },
  { date: '01-25', value: 45 },
  { date: '01-26', value: 50 },
  { date: '01-27', value: 48 },
  { date: '01-28', value: 55 },
  { date: '01-29', value: 28 },
];

// 车况分布数据
export const vehicleConditionData: PieChartData[] = [
  { name: '正常车', value: 285 },
  { name: '轻微瑕疵', value: 42 },
  { name: '事故车', value: 12 },
  { name: '泡水车', value: 3 },
];

export const vehicleArchives: VehicleArchive[] = [
  {
    id: 'va1',
    vin: 'LFV3A23G6J3*****1',
    brand: '奥迪',
    model: 'A4L',
    year: 2020,
    color: '白色',
    plateNumber: '京A88888',
    mileage: 38000,
    reportIds: ['wo1'],
    status: 'in_stock',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20'
  },
  {
    id: 'va2',
    vin: 'BMWX52021*****9',
    brand: '宝马',
    model: 'X5',
    year: 2021,
    color: '黑色',
    plateNumber: '沪B12345',
    mileage: 12000,
    reportIds: [],
    status: 'sold',
    createdAt: '2023-12-01',
    updatedAt: '2024-01-05'
  }
];

// 检测项模板
export const inspectionItemTemplates: InspectionItem[] = [
  // 重大事故排查
  { id: 'acc1', category: '重大事故排查', name: 'A柱检查', status: 'pass' },
  { id: 'acc2', category: '重大事故排查', name: 'B柱检查', status: 'pass' },
  { id: 'acc3', category: '重大事故排查', name: 'C柱检查', status: 'pass' },
  { id: 'acc4', category: '重大事故排查', name: '前纵梁检查', status: 'pass' },
  { id: 'acc5', category: '重大事故排查', name: '后纵梁检查', status: 'pass' },
  { id: 'acc6', category: '重大事故排查', name: '防火墙检查', status: 'pass' },
  { id: 'acc7', category: '重大事故排查', name: '后备箱围板检查', status: 'pass' },
  { id: 'acc8', category: '重大事故排查', name: '车顶检查', status: 'pass' },
  { id: 'acc9', category: '重大事故排查', name: '气囊检查', status: 'pass' },
  { id: 'acc10', category: '重大事故排查', name: '安全带检查', status: 'pass' },

  // 水泡排查
  { id: 'flood1', category: '水泡排查', name: '座椅滑轨锈蚀', status: 'pass' },
  { id: 'flood2', category: '水泡排查', name: '地胶霉斑', status: 'pass' },
  { id: 'flood3', category: '水泡排查', name: '点烟器座锈蚀', status: 'pass' },
  { id: 'flood4', category: '水泡排查', name: '保险丝盒检查', status: 'pass' },
  { id: 'flood5', category: '水泡排查', name: '转向柱锈蚀', status: 'pass' },
  { id: 'flood6', category: '水泡排查', name: '安全带水渍', status: 'pass' },

  // 火烧排查
  { id: 'fire1', category: '火烧排查', name: '发动机舱熏黑', status: 'pass' },
  { id: 'fire2', category: '火烧排查', name: '线束熔痕', status: 'pass' },
  { id: 'fire3', category: '火烧排查', name: '内饰焦痕', status: 'pass' },
  { id: 'fire4', category: '火烧排查', name: '排气管更换', status: 'pass' },

  // 发动机舱
  { id: 'eng1', category: '发动机舱', name: '机油余量/状态', status: 'pass' },
  { id: 'eng2', category: '发动机舱', name: '防冻液冰点/颜色', status: 'pass' },
  { id: 'eng3', category: '发动机舱', name: '刹车油含水量', status: 'pass' },
  { id: 'eng4', category: '发动机舱', name: '助力油检查', status: 'pass' },
  { id: 'eng5', category: '发动机舱', name: '气门室盖漏油', status: 'pass' },
  { id: 'eng6', category: '发动机舱', name: '正时侧盖检查', status: 'pass' },
  { id: 'eng7', category: '发动机舱', name: '进气歧管拆卸', status: 'pass' },
  { id: 'eng8', category: '发动机舱', name: '排气歧管拆卸', status: 'pass' },
  { id: 'eng9', category: '发动机舱', name: '发电机工况', status: 'pass' },
  { id: 'eng10', category: '发动机舱', name: '压缩机工况', status: 'pass' },

  // 内饰与电器
  { id: 'int1', category: '内饰与电器', name: '方向盘磨损', status: 'pass' },
  { id: 'int2', category: '内饰与电器', name: '主驾座椅磨损', status: 'pass' },
  { id: 'int3', category: '内饰与电器', name: '档把磨损', status: 'pass' },
  { id: 'int4', category: '内饰与电器', name: '踏板磨损', status: 'pass' },
  { id: 'int5', category: '内饰与电器', name: '空调制冷', status: 'pass' },
  { id: 'int6', category: '内饰与电器', name: '空调制热', status: 'pass' },
  { id: 'int7', category: '内饰与电器', name: '车窗升降', status: 'pass' },
  { id: 'int8', category: '内饰与电器', name: '天窗功能', status: 'pass' },
  { id: 'int9', category: '内饰与电器', name: '音响系统', status: 'pass' },
  { id: 'int10', category: '内饰与电器', name: '倒车影像', status: 'pass' },
  { id: 'int11', category: '内饰与电器', name: '安全气囊生产日期', status: 'pass' },
  { id: 'int12', category: '内饰与电器', name: '安全带锁止功能', status: 'pass' },

  // 底盘检测
  { id: 'ch1', category: '底盘检测', name: '减震器漏油', status: 'pass' },
  { id: 'ch2', category: '底盘检测', name: '前下摆臂胶套', status: 'pass' },
  { id: 'ch3', category: '底盘检测', name: '后下摆臂胶套', status: 'pass' },
  { id: 'ch4', category: '底盘检测', name: '半轴防尘套', status: 'pass' },
  { id: 'ch5', category: '底盘检测', name: '差速器漏油', status: 'pass' },
  { id: 'ch6', category: '底盘检测', name: '发动机油底壳', status: 'pass' },
  { id: 'ch7', category: '底盘检测', name: '变速箱油底壳', status: 'pass' },
  { id: 'ch8', category: '底盘检测', name: '机脚垫老化', status: 'pass' },

  // 动态路试
  { id: 'road1', category: '动态路试', name: '起步抖动', status: 'pass' },
  { id: 'road2', category: '动态路试', name: '换挡顿挫', status: 'pass' },
  { id: 'road3', category: '动态路试', name: '方向跑偏', status: 'pass' },
  { id: 'road4', category: '动态路试', name: '底盘异响', status: 'pass' },
  { id: 'road5', category: '动态路试', name: 'ABS制动测试', status: 'pass' },

  // OBD诊断
  { id: 'obd1', category: 'OBD诊断', name: '当前故障码', status: 'pass' },
  { id: 'obd2', category: 'OBD诊断', name: '历史故障码', status: 'pass' },
  { id: 'obd3', category: 'OBD诊断', name: '变速箱里程', status: 'pass' },
];

// 检测报告示例
export const sampleReport: InspectionReport = {
  id: 'r1',
  workOrderId: 'wo5',
  score: 92,
  grade: 'A',
  tags: ['无事故', '原版原漆', '内饰新'],
  summary: '该车整体车况良好，无重大事故、水泡、火烧痕迹。外观原版原漆，内饰磨损轻微，发动机舱整洁无渗漏，底盘状态正常。建议购买。',
  defects: [
    {
      id: 'd1',
      category: '外观',
      description: '左前翼子板轻微划痕，长度约3cm',
      severity: 'minor',
      photos: [],
      location: '左前翼子板',
    },
    {
      id: 'd2',
      category: '内饰',
      description: '主驾座椅轻微磨损',
      severity: 'minor',
      photos: [],
      location: '主驾座椅',
    },
  ],
  inspectionItems: inspectionItemTemplates,
  photos: {
    exterior: [],
    interior: [],
    engine: [],
    chassis: [],
    obd: [],
  },
  createdAt: '2024-01-28 18:00',
  auditorId: 'a1',
  auditorName: '张审核员',
};

// 获取工单状态文本
export const getStatusText = (status: WorkOrderStatus): string => {
  const statusMap: Record<WorkOrderStatus, string> = {
    created: '已创建',
    pending_dispatch: '待派单',
    dispatched: '已派单',
    in_progress: '进行中',
    under_review: '待审核',
    completed: '已完成',
    rejected: '已驳回',
    cancelled: '已取消',
  };
  return statusMap[status];
};

// 获取状态颜色
export const getStatusColor = (status: WorkOrderStatus): string => {
  const colorMap: Record<WorkOrderStatus, string> = {
    created: 'bg-gray-100 text-gray-700',
    pending_dispatch: 'bg-amber-100 text-amber-700',
    dispatched: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-cyan-100 text-cyan-700',
    under_review: 'bg-purple-100 text-purple-700',
    completed: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
    cancelled: 'bg-slate-100 text-slate-700',
  };
  return colorMap[status];
};
