import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Tabs,
  Input,
  Select,
  DatePicker,
  Tag,
  Modal,
  Space,
  Card,
  Typography,
  Descriptions,
  Badge,
  Result,
  message,
  Timeline,
  Image,
  Checkbox,
  Divider,
  Row,
  Col
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  CarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { inspectors, workOrders } from '@/data/mock';
import StatusBadge from '@/components/common/StatusBadge'; // We might need to replace this or keep it if it's generic. 
// Actually, let's just implement status badge logic inline with AntD Tag/Badge for consistency.

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function Audit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // List View State
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectorFilter, setInspectorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Dialog State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [linkArchive, setLinkArchive] = useState(true);

  // Current Order for Detail View
  const [currentOrder, setCurrentOrder] = useState<typeof workOrders[0] | null>(null);

  useEffect(() => {
    if (id) {
      const found = workOrders.find(o => o.id === id);
      setCurrentOrder(found || null);
    } else {
      setCurrentOrder(null);
    }
  }, [id]);

  // Actions
  const handleApprove = () => {
    if (linkArchive) {
      message.success('审核通过，已生成正式报告并关联车辆档案');
    } else {
      message.success('审核通过，已生成正式报告');
    }
    setApproveModalOpen(false);
    navigate('/audit');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      message.error('请输入驳回原因');
      return;
    }
    message.warning('已驳回该工单');
    setRejectModalOpen(false);
    setRejectReason('');
    navigate('/audit');
  };

  // --- List View Components ---

  const columns = [
    {
      title: '工单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '车辆信息',
      key: 'vehicle',
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium">{record.vehicle.brand} {record.vehicle.model}</div>
          <div className="text-xs text-slate-500">
            {record.vehicle.plateNumber} | {record.vehicle.vin.slice(-6)}
          </div>
        </div>
      ),
    },
    {
      title: '检测师',
      key: 'inspector',
      render: (_: any, record: any) => (
        <Space>
          <UserOutlined style={{ color: '#94a3b8' }} />
          <span>{record.inspector?.name || '-'}</span>
        </Space>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => (
        <Space className="text-slate-500">
          <CalendarOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, record: any) => {
        // Simple mapping
        const statusMap: Record<string, any> = {
          pending: { color: 'gold', text: '待支付' },
          assigned: { color: 'blue', text: '已分配' },
          inspecting: { color: 'cyan', text: '检测中' },
          under_review: { color: 'orange', text: '待审核' }, // Key status for Audit
          completed: { color: 'green', text: '已完成' },
          rejected: { color: 'red', text: '已驳回' },
          cancelled: { color: 'default', text: '已取消' }
        };
        const s = statusMap[record.status] || { color: 'default', text: record.status };
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/audit/${record.id}`)}
          >
            详情
          </Button>
          {activeTab === 'pending' && (
            <>
              <Button
                type="text"
                size="small"
                danger
                onClick={(e) => { e.stopPropagation(); setCurrentOrder(record); setRejectModalOpen(true); }}
              >
                驳回
              </Button>
              <Button
                type="text"
                size="small"
                className="text-emerald-600 hover:text-emerald-700"
                onClick={(e) => { e.stopPropagation(); setCurrentOrder(record); setApproveModalOpen(true); }}
              >
                通过
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const filterOrders = (statusType: 'pending' | 'completed') => {
    return workOrders.filter(order => {
      const isPending = order.status === 'under_review';
      const isCompleted = order.status === 'completed' || order.status === 'rejected';
      const statusMatch = statusType === 'pending' ? isPending : isCompleted;
      if (!statusMatch) return false;

      const searchLower = searchQuery.toLowerCase();
      // ... existing logic ...
      const matchesSearch =
        order.orderNo.toLowerCase().includes(searchLower) ||
        order.vehicle.vin.toLowerCase().includes(searchLower) ||
        order.vehicle.plateNumber?.toLowerCase().includes(searchLower);

      const matchesInspector = inspectorFilter === 'all' || order.inspector?.id === inspectorFilter;
      const matchesDate = !dateFilter || order.updatedAt.startsWith(dateFilter);

      return matchesSearch && matchesInspector && matchesDate;
    }).map(o => ({ ...o, key: o.id }));
  };

  // --- DETAIL VIEW ---
  if (id && currentOrder) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/audit')}>返回列表</Button>
        </div>

        <Row gutter={24}>
          <Col span={16}>
            {/* Main Content: Vehicle Info & Inspection Items */}
            <Card title="车辆详情" className="mb-6 shadow-sm">
              <Descriptions bordered>
                <Descriptions.Item label="品牌型号">{currentOrder.vehicle.brand} {currentOrder.vehicle.model}</Descriptions.Item>
                <Descriptions.Item label="VIN码">{currentOrder.vehicle.vin}</Descriptions.Item>
                <Descriptions.Item label="车牌号">{currentOrder.vehicle.plateNumber}</Descriptions.Item>
                <Descriptions.Item label="提交时间">{currentOrder.updatedAt}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="检测照片 (24)" className="mb-6 shadow-sm">
              <Image.PreviewGroup>
                <Space size="middle" wrap>
                  <Image width={100} src="https://images.unsplash.com/photo-1549666242-aa8a76057a62" />
                  <Image width={100} src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d" />
                  <Image width={100} src="https://images.unsplash.com/photo-1503376763036-066120622c74" />
                </Space>
              </Image.PreviewGroup>
            </Card>

            <Card title="检测结果摘要" className="shadow-sm">
              <Timeline
                items={[
                  { color: 'green', children: '外观检测完成 - 无重大事故痕迹' },
                  { color: 'green', children: '发动机舱检测完成 - 工况正常' },
                  { color: 'red', children: '底盘检测 - 发现轻微渗油' },
                  { color: 'green', children: '内饰检测完成' },
                ]}
              />
            </Card>
          </Col>
          <Col span={8}>
            {/* Sidebar: Inspector Info & Actions */}
            <Card title="检测师信息" className="mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <UserOutlined className="text-2xl mr-3 bg-slate-100 p-2 rounded-full" />
                <div>
                  <div className="font-bold">{currentOrder.inspector?.name}</div>
                  <div className="text-gray-500">高级检测师</div>
                </div>
              </div>
              <Button block icon={<PhoneOutlined />} disabled>联系检测师</Button>
            </Card>

            <Card title="审核操作" className="shadow-sm">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  block
                  className="bg-emerald-600 hover:bg-emerald-500"
                  onClick={() => setApproveModalOpen(true)}
                >
                  通过审核
                </Button>
                <Button danger block onClick={() => setRejectModalOpen(true)}>
                  驳回修改
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Re-use Dialogs */}
        <Modal
          title={<Space className="text-red-600"><ExclamationCircleOutlined /> 驳回检测</Space>}
          open={rejectModalOpen}
          onCancel={() => setRejectModalOpen(false)}
          onOk={handleReject}
          okText="确认驳回"
          cancelText="取消"
          okButtonProps={{ danger: true }}
        >
          <Paragraph type="secondary">请填写驳回原因，检测师将收到通知并补充资料。</Paragraph>
          <TextArea
            rows={4}
            placeholder="例如：底盘照片模糊，看不清油底壳..."
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
          />
        </Modal>

        <Modal
          title={<Space className="text-emerald-600"><CheckCircleOutlined /> 通过审核</Space>}
          open={approveModalOpen}
          onCancel={() => setApproveModalOpen(false)}
          onOk={handleApprove}
          okText="确认通过"
          cancelText="取消"
          okButtonProps={{ className: 'bg-emerald-600' }}
        >
          <Paragraph>确认通过该检测报告吗？通过后将生成正式报告。</Paragraph>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <Checkbox checked={linkArchive} onChange={e => setLinkArchive(e.target.checked)}>
              同时关联车辆档案
            </Checkbox>
            <div className="text-xs text-slate-500 mt-1 ml-6">* 勾选后，该次检测记录将自动归档至车辆历史档案中</div>
          </div>
        </Modal>

      </motion.div>
    );
  } else if (id && !currentOrder) {
    // 404 Case
    return (
      <Result
        status="404"
        title="404"
        subTitle="未找到该工单信息"
        extra={<Button type="primary" onClick={() => navigate('/audit')}>返回列表</Button>}
      />
    );
  }

  // --- LIST VIEW ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 bg-slate-50 min-h-screen"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title level={2} style={{ margin: 0 }}>审核中心</Title>
          <Text type="secondary">复核检测数据，确保报告质量</Text>
        </div>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">搜索</Text>
            <Input
              prefix={<SearchOutlined />}
              placeholder="工单号/VIN/车牌..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} md={6}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">检测师</Text>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={setInspectorFilter}
              value={inspectorFilter}
            >
              <Option value="all">全部检测师</Option>
              {inspectors.map(i => (
                <Option key={i.id} value={i.id}>{i.name}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">提交日期</Text>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(_, dateString) => setDateFilter(typeof dateString === 'string' ? dateString : '')}
            />
          </Col>
        </Row>
      </Card>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="large"
          tabBarStyle={{ marginBottom: 0, backgroundColor: '#f8fafc', padding: '8px 8px 0 8px' }}
        >
          <TabPane tab={<span>待审核 <Badge count={filterOrders('pending').length} offset={[10, -2]} color="#f59e0b" /></span>} key="pending">
            <Table
              columns={columns}
              dataSource={filterOrders('pending')}
              pagination={{ pageSize: 10 }}
              style={{ margin: 0 }}
            />
          </TabPane>
          <TabPane tab="已审核" key="completed">
            <Table
              columns={columns}
              dataSource={filterOrders('completed')}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </div>

      {/* Re-use Dialogs if user clicks quick action from List */}
      <Modal
        title={<Space className="text-red-600"><ExclamationCircleOutlined /> 驳回检测</Space>}
        open={rejectModalOpen}
        onCancel={() => setRejectModalOpen(false)}
        onOk={handleReject}
        okText="确认驳回"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        destroyOnClose
      >
        <Paragraph type="secondary">请填写驳回原因，检测师将收到通知并补充资料。</Paragraph>
        <TextArea
          rows={4}
          placeholder="例如：底盘照片模糊，看不清油底壳..."
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
        />
      </Modal>

      <Modal
        title={<Space className="text-emerald-600"><CheckCircleOutlined /> 通过审核</Space>}
        open={approveModalOpen}
        onCancel={() => setApproveModalOpen(false)}
        onOk={handleApprove}
        okText="确认通过"
        cancelText="取消"
        okButtonProps={{ className: 'bg-emerald-600' }}
        destroyOnClose
      >
        <Paragraph>确认通过该检测报告吗？通过后将生成正式报告。</Paragraph>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <Checkbox checked={linkArchive} onChange={e => setLinkArchive(e.target.checked)}>
            同时关联车辆档案
          </Checkbox>
        </div>
      </Modal>

    </motion.div>
  );
}

// Helper icons
import { PhoneOutlined } from '@ant-design/icons';
