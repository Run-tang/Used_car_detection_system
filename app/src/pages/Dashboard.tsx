import { motion } from 'framer-motion';
import {
  ClipboardList,
  FileCheck,
  CheckCircle,
  Users,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  dashboardStats,
  workOrders,
  inspectionTrendData,
  vehicleConditionData
} from '@/data/mock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

const pieColors = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B'];

export default function Dashboard() {
  // 获取最近的工单
  const recentOrders = workOrders.slice(0, 5);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">仪表盘</h1>
          <p className="text-slate-500 mt-1">欢迎回来，今日检测任务概览</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/work-orders/new">
            <Plus className="w-4 h-4 mr-2" />
            创建工单
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="今日待检工单"
          value={dashboardStats.todayPending}
          trend={dashboardStats.todayTrend}
          icon={ClipboardList}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
        <StatCard
          title="待审核报告"
          value={dashboardStats.pendingAudit}
          trend={dashboardStats.auditTrend}
          icon={FileCheck}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title="本月完成检测"
          value={dashboardStats.monthlyCompleted}
          trend={dashboardStats.monthlyTrend}
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
        <StatCard
          title="检测师在线"
          value={dashboardStats.onlineInspectors}
          trend={dashboardStats.inspectorTrend}
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inspection Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">近7日检测趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inspectionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="date"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Condition Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">本月车况分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleConditionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {vehicleConditionData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {vehicleConditionData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: pieColors[index] }}
                  />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Work Orders */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">最近工单</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/work-orders" className="text-blue-600">
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">工单号</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">车辆信息</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">客户</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">检测师</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">预约时间</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <Link
                          to={`/work-orders/${order.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {order.orderNo}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900">{order.vehicle.brand} {order.vehicle.model}</p>
                          <p className="text-xs text-slate-500">{order.vehicle.plateNumber}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-slate-900">{order.custodian.name}</p>
                          <p className="text-xs text-slate-500">{order.custodian.phone}</p>
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
                            <span className="text-slate-700">{order.inspector.name}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.appointmentTime}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
