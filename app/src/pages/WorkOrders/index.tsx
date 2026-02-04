import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  UserCheck,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/common/StatusBadge';
import { workOrders, inspectors, inventoryVehicles } from '@/data/mock';
import type { WorkOrderStatus } from '@/types';
import { Link, useSearchParams } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const statusOptions: { value: WorkOrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: '全部状态' },
  { value: 'created', label: '已创建' },
  { value: 'pending_dispatch', label: '待派单' },
  { value: 'dispatched', label: '已派单' },
  { value: 'in_progress', label: '进行中' },
  { value: 'under_review', label: '待审核' },
  { value: 'completed', label: '已完成' },
  { value: 'rejected', label: '已驳回' },
  { value: 'cancelled', label: '已取消' },
];

export default function WorkOrders() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | 'all'>('all');
  const [inspectorFilter, setInspectorFilter] = useState<string>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    vin: '',
    plateNumber: '',
    brand: '',
    model: '',
    custodianName: '',
    custodianPhone: '',
    inspectorId: '',
    location: '',
  });

  // Initialize filters from URL params
  useEffect(() => {
    const statusParam = searchParams.get('status');
    const inspectorParam = searchParams.get('inspectorId');

    if (statusParam && statusOptions.some(opt => opt.value === statusParam)) {
      setStatusFilter(statusParam as WorkOrderStatus);
    }
    if (inspectorParam) {
      setInspectorFilter(inspectorParam);
    }
  }, [searchParams]);

  // Update URL params when filters change
  const handleStatusChange = (val: WorkOrderStatus | 'all') => {
    setStatusFilter(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === 'all') newParams.delete('status');
    else newParams.set('status', val);
    setSearchParams(newParams);
  };

  const handleInspectorChange = (val: string) => {
    setInspectorFilter(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === 'all') newParams.delete('inspectorId');
    else newParams.set('inspectorId', val);
    setSearchParams(newParams);
  };

  // Filter Logic
  const filteredOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.custodian.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesInspector = inspectorFilter === 'all' || (order.inspector?.id === inspectorFilter);

    return matchesSearch && matchesStatus && matchesInspector;
  });

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(o => o !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">工单管理</h1>
          <p className="text-slate-500 mt-1">管理所有检测工单，进行派单和跟踪</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              创建工单
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>创建新工单</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">从库存中选择 (模拟)</label>
                <Select
                  onValueChange={(value) => {
                    const vehicle = inventoryVehicles.find(v => v.id === value);
                    if (vehicle) {
                      setFormData({
                        ...formData,
                        vin: vehicle.vin,
                        plateNumber: vehicle.plateNumber,
                        brand: vehicle.brand,
                        model: vehicle.model,
                        custodianName: vehicle.custodian.name,
                        custodianPhone: vehicle.custodian.phone,
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="点击选择库存车辆..." />
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryVehicles.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.plateNumber} - {v.brand} {v.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Other inputs remain same - reduced for brevity if using write_to_file on partial update, but I'll write full content to ensure correctness */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">VIN码</label>
                  <Input
                    placeholder="请输入17位车架号"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">车牌号</label>
                  <Input
                    placeholder="如：京A12345"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">品牌</label>
                  <Select
                    value={formData.brand}
                    onValueChange={(value) => setFormData({ ...formData, brand: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择品牌" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="大众">大众</SelectItem>
                      <SelectItem value="丰田">丰田</SelectItem>
                      <SelectItem value="本田">本田</SelectItem>
                      <SelectItem value="奥迪">奥迪</SelectItem>
                      <SelectItem value="宝马">宝马</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">车型</label>
                  <Input
                    placeholder="请输入车型"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">车辆保管人</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="请输入保管人姓名"
                    className="pl-10"
                    value={formData.custodianName}
                    onChange={(e) => setFormData({ ...formData, custodianName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">指派检测师 <span className="text-red-500">*</span></label>
                <Select
                  value={formData.inspectorId}
                  onValueChange={(value) => setFormData({ ...formData, inspectorId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择检测师" />
                  </SelectTrigger>
                  <SelectContent>
                    {inspectors.map((inspector) => (
                      <SelectItem key={inspector.id} value={inspector.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{inspector.name}</span>
                          <span className="text-slate-400 text-xs">
                            ({inspector.status === 'active' ? '在线' : '离线'}) - {inspector.city}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">检测地点</label>
                <Input
                  placeholder="请输入车辆所在位置"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">预约时间</label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">备注</label>
                <Input placeholder="可选填" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">取消</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">创建并派单</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="搜索工单号、VIN、车牌号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={(v) => handleStatusChange(v as WorkOrderStatus | 'all')}>
          <SelectTrigger className="w-36 h-9">
            <Filter className="w-3.5 h-3.5 mr-2 text-slate-500" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Inspector Filter */}
        <Select value={inspectorFilter} onValueChange={handleInspectorChange}>
          <SelectTrigger className="w-36 h-9">
            <User className="w-3.5 h-3.5 mr-2 text-slate-500" />
            <SelectValue placeholder="检测师" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有检测师</SelectItem>
            {inspectors.map((i) => (
              <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(statusFilter !== 'all' || inspectorFilter !== 'all' || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              handleStatusChange('all');
              handleInspectorChange('all');
            }}
            className="text-slate-500 hover:text-slate-700 h-9"
          >
            重置
          </Button>
        )}
      </motion.div>

      {/* Batch Actions */}
      {selectedOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <span className="text-sm text-blue-700">
            已选择 {selectedOrders.length} 个工单
          </span>
          <Button variant="outline" size="sm">批量派单</Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">批量取消</Button>
        </motion.div>
      )}

      {/* Work Orders Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-slate-300"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">工单号</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">车辆信息</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">保管人</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">检测师</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">状态</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">预约时间</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleSelect(order.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/work-orders/${order.id}`}
                          className="text-blue-600 hover:underline font-medium text-sm"
                        >
                          {order.orderNo}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{order.vehicle.brand} {order.vehicle.model}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-500">{order.vehicle.plateNumber}</span>
                            <span className="text-xs text-slate-400">|</span>
                            <span className="text-xs text-slate-500">{order.vehicle.vin.slice(-6)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-slate-900 text-sm">{order.custodian.name}</p>
                          {order.custodian.phone && (
                            <p className="text-xs text-slate-500">{order.custodian.phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {order.inspector ? (
                          <div className="flex items-center">
                            <img
                              src={order.inspector.avatar}
                              alt={order.inspector.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span className="text-slate-700 text-sm">{order.inspector.name}</span>
                          </div>
                        ) : (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                            待指派
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-slate-600 text-sm">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {order.appointmentTime}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/work-orders/${order.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                查看详情
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑
                            </DropdownMenuItem>
                            {!order.inspector && (
                              <DropdownMenuItem>
                                <UserCheck className="w-4 h-4 mr-2" />
                                指派检测师
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="w-4 h-4 mr-2" />
                              取消工单
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500">未找到匹配的工单</p>
                {(statusFilter !== 'all' || inspectorFilter !== 'all' || searchQuery) && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery('');
                      handleStatusChange('all');
                      handleInspectorChange('all');
                    }}
                  >
                    清除筛选条件
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
