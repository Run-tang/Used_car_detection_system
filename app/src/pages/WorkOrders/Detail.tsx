import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Car,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Edit,
  UserCheck,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/common/StatusBadge';
import { workOrders } from '@/data/mock';

export default function WorkOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = workOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">工单不存在</p>
            <Button asChild className="mt-4">
              <Link to="/work-orders">返回工单列表</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link to="/work-orders">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{order.orderNo}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-slate-500 mt-1">创建于 {order.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            编辑
          </Button>
          {!order.inspector && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserCheck className="w-4 h-4 mr-2" />
              指派检测师
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Car className="w-5 h-5 mr-2 text-blue-600" />
              车辆信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">品牌型号</p>
              <p className="font-medium">{order.vehicle.brand} {order.vehicle.model}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">VIN码</p>
              <p className="font-medium">{order.vehicle.vin}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">车牌号</p>
              <p className="font-medium">{order.vehicle.plateNumber || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">表显里程</p>
              <p className="font-medium">{order.vehicle.mileage?.toLocaleString() || '-'} km</p>
            </div>
          </CardContent>
        </Card>

        {/* Custodian Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              车辆保管人
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">保管人姓名</p>
              <p className="font-medium">{order.custodian.name}</p>
            </div>
            {order.custodian.phone && (
              <div>
                <p className="text-sm text-slate-500">联系电话</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-slate-400" />
                  {order.custodian.phone}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-slate-500">检测地址</p>
              <p className="font-medium flex items-start">
                <MapPin className="w-4 h-4 mr-1 text-slate-400 mt-0.5" />
                {order.location.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">预约时间</p>
              <p className="font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                {order.appointmentTime}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Inspector Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
              检测师信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.inspector ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <img
                    src={order.inspector.avatar}
                    alt={order.inspector.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{order.inspector.name}</p>
                    <p className="text-sm text-slate-500">{order.inspector.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">评分</span>
                  <span className="font-medium">{order.inspector.rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">当前任务</span>
                  <span className="font-medium">{order.inspector.currentTasks}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">暂未指派检测师</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm">
                  立即指派
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">工单进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-6">
              <div className="relative flex items-start">
                <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="ml-12">
                  <p className="font-medium">工单创建</p>
                  <p className="text-sm text-slate-500">{order.createdAt}</p>
                </div>
              </div>

              {order.inspector && (
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-12">
                    <p className="font-medium">指派检测师</p>
                    <p className="text-sm text-slate-500">{order.inspector.name}</p>
                  </div>
                </div>
              )}

              {order.status === 'in_progress' && (
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-12">
                    <p className="font-medium">检测进行中</p>
                    <p className="text-sm text-slate-500">检测师正在现场检测</p>
                  </div>
                </div>
              )}

              {order.status === 'under_review' && (
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-12">
                    <p className="font-medium">提交审核</p>
                    <p className="text-sm text-slate-500">等待审核员复核</p>
                  </div>
                </div>
              )}

              {order.status === 'completed' && (
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-12">
                    <p className="font-medium">检测完成</p>
                    <p className="text-sm text-slate-500">{order.completedAt}</p>
                  </div>
                </div>
              )}

              {order.status === 'rejected' && (
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-12">
                    <p className="font-medium">审核驳回</p>
                    <p className="text-sm text-slate-500">需要补充检测资料</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              备注
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{order.notes}</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
