import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  UserCheck, 
  Star,
  Clock,
  Car,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { workOrders, inspectors } from '@/data/mock';

export default function Dispatch() {
  const [selectedInspector, setSelectedInspector] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // 待派单的工单
  const pendingOrders = workOrders.filter(o => o.status === 'pending_dispatch');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">智能派单</h1>
          <p className="text-slate-500 mt-1">根据地理位置智能分配检测师</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              派单地图
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300">
                {/* Grid lines */}
                <svg className="w-full h-full opacity-30">
                  {[...Array(10)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#94A3B8" strokeWidth="1" />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line key={`v-${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#94A3B8" strokeWidth="1" />
                  ))}
                </svg>
                
                {/* Vehicle markers */}
                {pendingOrders.map((order, index) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      selectedOrder === order.id ? 'scale-125 z-10' : ''
                    }`}
                    style={{
                      left: `${30 + index * 15}%`,
                      top: `${40 + (index % 2) * 20}%`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-red-500">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs">
                      {order.vehicle.brand}
                    </div>
                  </button>
                ))}
                
                {/* Inspector markers */}
                {inspectors.map((inspector, index) => (
                  <button
                    key={inspector.id}
                    onClick={() => setSelectedInspector(inspector.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      selectedInspector === inspector.id ? 'scale-125 z-10' : ''
                    }`}
                    style={{
                      left: `${25 + index * 12}%`,
                      top: `${30 + (index % 3) * 15}%`,
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      inspector.status === 'online' ? 'bg-emerald-500' : 
                      inspector.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                    }`}>
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-0.5 rounded shadow text-xs">
                      {inspector.name}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-xs font-medium text-slate-700 mb-2">图例</div>
                <div className="space-y-1.5">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    待检车辆
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                    在线检测师
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                    忙碌中
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inspector List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">检测师列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {inspectors.map((inspector) => (
                <button
                  key={inspector.id}
                  onClick={() => setSelectedInspector(inspector.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedInspector === inspector.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img 
                        src={inspector.avatar} 
                        alt={inspector.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-sm">{inspector.name}</p>
                        <div className="flex items-center text-xs text-slate-500 mt-0.5">
                          <Star className="w-3 h-3 text-amber-500 mr-1" />
                          {inspector.rating}
                          <span className="mx-1">·</span>
                          <Clock className="w-3 h-3 mr-1" />
                          2.5km
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        inspector.status === 'online' ? 'bg-emerald-100 text-emerald-700' :
                        inspector.status === 'busy' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }
                    >
                      {inspector.status === 'online' ? '在线' :
                       inspector.status === 'busy' ? '忙碌' : '离线'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>当前任务: {inspector.currentTasks}</span>
                    <span>本月完成: {Math.floor(Math.random() * 50 + 20)}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              disabled={!selectedInspector || !selectedOrder}
            >
              <Send className="w-4 h-4 mr-2" />
              确认派单
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">待派单工单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedOrder === order.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{order.orderNo}</span>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">待派单</Badge>
                </div>
                <p className="text-sm text-slate-700 mb-1">
                  {order.vehicle.brand} {order.vehicle.model}
                </p>
                <div className="flex items-center text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {order.location.address}
                </div>
                <div className="flex items-center text-xs text-slate-500 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  预约: {order.appointmentTime}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
