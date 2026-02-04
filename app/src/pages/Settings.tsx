import { 
  Settings, 
  Bell, 
  Shield, 
  Database,
  Users,
  FileText,
  ChevronRight,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">系统设置</h1>
        <p className="text-slate-500 mt-1">配置系统参数和权限</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general">通用设置</TabsTrigger>
          <TabsTrigger value="inspection">检测配置</TabsTrigger>
          <TabsTrigger value="notification">消息通知</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                基础信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>公司名称</Label>
                  <Input defaultValue="车易检科技有限公司" />
                </div>
                <div className="space-y-2">
                  <Label>联系电话</Label>
                  <Input defaultValue="400-888-8888" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>公司地址</Label>
                <Input defaultValue="北京市朝阳区建国路88号SOHO现代城" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Database className="w-5 h-5 mr-2" />
                数据备份
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动备份</p>
                  <p className="text-sm text-slate-500">每天凌晨2点自动备份数据</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">备份保留时间</p>
                  <p className="text-sm text-slate-500">保留最近30天的备份</p>
                </div>
                <Input className="w-24" defaultValue="30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                检测项配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">重大事故排查</p>
                  <p className="text-sm text-slate-500">ABC柱、纵梁等结构件检查</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">水泡排查</p>
                  <p className="text-sm text-slate-500">水渍、锈蚀、霉斑检查</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">火烧排查</p>
                  <p className="text-sm text-slate-500">熏黑、熔痕、更换痕迹检查</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">OBD诊断</p>
                  <p className="text-sm text-slate-500">故障码读取和数据流分析</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">评分标准</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-emerald-600">A</p>
                  <p className="text-sm text-slate-600">90-100分</p>
                  <p className="text-xs text-slate-500">优秀</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">B</p>
                  <p className="text-sm text-slate-600">80-89分</p>
                  <p className="text-xs text-slate-500">良好</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600">C</p>
                  <p className="text-sm text-slate-600">70-79分</p>
                  <p className="text-xs text-slate-500">一般</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">D</p>
                  <p className="text-sm text-slate-600">&lt;70分</p>
                  <p className="text-xs text-slate-500">较差</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                消息推送
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">新工单提醒</p>
                  <p className="text-sm text-slate-500">有新工单创建时通知调度员</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">检测完成提醒</p>
                  <p className="text-sm text-slate-500">检测师提交报告后通知审核员</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">审核结果通知</p>
                  <p className="text-sm text-slate-500">审核完成后通知相关人员</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">短信通知客户</p>
                  <p className="text-sm text-slate-500">检测进度更新时短信通知客户</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                安全设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">登录验证</p>
                  <p className="text-sm text-slate-500">登录时需要短信验证码</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">异地登录提醒</p>
                  <p className="text-sm text-slate-500">检测到异地登录时发送提醒</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">密码强度要求</p>
                  <p className="text-sm text-slate-500">要求密码包含字母、数字和特殊字符</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">定期更换密码</p>
                  <p className="text-sm text-slate-500">每90天强制更换密码</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                权限管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['管理员', '调度员', '审核员', '检测师', '客服'].map((role) => (
                  <div 
                    key={role}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="font-medium">{role}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>
    </div>
  );
}
