// 用户角色
export type UserRole = 'admin' | 'dispatcher' | 'auditor' | 'inspector' | 'customer_service';

// 用户
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone: string;
  email?: string;
}

// 工单状态
export type WorkOrderStatus =
  | 'created'
  | 'pending_dispatch'
  | 'dispatched'
  | 'in_progress'
  | 'under_review'
  | 'completed'
  | 'rejected'
  | 'cancelled';

// 车辆信息
export interface Vehicle {
  id: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  color?: string;
  plateNumber?: string;
  mileage?: number;
  registrationDate?: string;
  emissionStandard?: string;
}

// 车辆保管人信息
export interface VehicleCustodian {
  name: string;
  phone?: string; // 可选，保留联系方式以便联系
}

// 车辆档案 (Created from 'One Car, One Archive' logic)
export interface VehicleArchive {
  id: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  color?: string;
  plateNumber?: string;
  mileage: number;
  reportIds: string[]; // List of report IDs associated with this car
  lastInspectionDate?: string;
  status: 'in_stock' | 'sold' | 'unknown';
  createdAt: string;
  updatedAt: string;
}

// 检测师
export interface Inspector {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  rating?: number; // Deprecated
  currentTasks: number; // Pending tasks
  completedTasks: number; // New: Accumulated completed
  avgInspectionTime: number; // New: Average minutes per inspection
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  city: string;
  status: 'active' | 'disabled';
}

// 工单
export interface WorkOrder {
  id: string;
  orderNo: string;
  vehicle: Vehicle;
  custodian: VehicleCustodian; // 替换 Customer
  inspector?: Inspector; // 依然保留可选，以防万一，但业务逻辑上创建时必须有
  status: WorkOrderStatus;
  appointmentTime: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  archiveId?: string; // Associated Vehicle Archive ID
}

// 检测步骤
export type InspectionStepType =
  | 'checkin'
  | 'basic_info'
  | 'exterior'
  | 'engine'
  | 'interior'
  | 'chassis'
  | 'road_test'
  | 'obd'
  | 'submit';

// 损伤类型
export type DamageType = 'scratch' | 'dent' | 'paint' | 'metal' | 'replaced' | 'none';

// 漆面状态
export type PaintStatus = 'original' | 'paint' | 'metal' | 'replaced';

// 外观部位
export interface ExteriorPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  paintStatus: PaintStatus;
  paintThickness?: number;
  damageType?: DamageType;
  damageDescription?: string;
  photos: string[];
}

// 检测项
export interface InspectionItem {
  id: string;
  category: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'not_checked';
  inspectorComment?: string;
  auditorComment?: string;
  photos?: string[];
}

// 检测报告
export interface InspectionReport {
  id: string;
  workOrderId: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  tags: string[];
  summary: string;
  defects: DefectItem[];
  inspectionItems: InspectionItem[];
  photos: {
    exterior: string[];
    interior: string[];
    engine: string[];
    chassis: string[];
    obd: string[];
  };
  createdAt: string;
  auditorId?: string;
  auditorName?: string;
}

// 缺陷项
export interface DefectItem {
  id: string;
  category: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
  photos: string[];
  location?: string;
}

// 审核记录
export interface AuditRecord {
  id: string;
  workOrderId: string;
  auditorId: string;
  auditorName: string;
  action: 'approve' | 'reject';
  reason?: string;
  createdAt: string;
}

// 统计数据
export interface DashboardStats {
  todayPending: number;
  pendingAudit: number;
  monthlyCompleted: number;
  onlineInspectors: number;
  todayTrend: number;
  auditTrend: number;
  monthlyTrend: number;
  inspectorTrend: number;
}

// 图表数据
export interface ChartData {
  date: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
}

// 模板管理相关
export interface TemplateItem {
  id: string;
  name: string;
  type: 'photo' | 'input' | 'select' | 'boolean' | 'multi_select' | 'date';
  options?: string[];
  required: boolean;
  description?: string;
  photoCount?: number; // For photo type
}

export interface TemplateCategory {
  id: string;
  name: string;
  items: TemplateItem[];
}

export interface InspectionTemplate {
  id: string;
  name: string;
  vehicleType: 'fuel' | 'electric';
  status: 'active' | 'inactive';
  categories: TemplateCategory[];
  updatedAt: string;
  description?: string;
}
