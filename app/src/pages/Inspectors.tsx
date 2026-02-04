import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Space,
  Card,
  Avatar,
  Tag,
  Typography,
  Dropdown,
  message,
  Row,
  Col,
  Statistic,
  Form,
  Switch
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  StopOutlined
} from '@ant-design/icons';
import { inspectors as initialInspectors } from '@/data/mock';
import type { Inspector } from '@/types';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

export default function InspectorsManagement() {
  const navigate = useNavigate();
  const [inspectors, setInspectors] = useState<Inspector[]>(initialInspectors);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInspector, setCurrentInspector] = useState<Partial<Inspector>>({});
  const [form] = Form.useForm();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Derived filters
  const uniqueCities = Array.from(new Set(inspectors.map(i => i.city || '未知城市')));

  const filteredInspectors = inspectors.filter(i => {
    const matchesSearch =
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.phone.includes(searchQuery);
    const matchesCity = cityFilter === 'all' || (i.city || '未知城市') === cityFilter;
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;

    return matchesSearch && matchesCity && matchesStatus;
  }).map(i => ({ ...i, key: i.id }));

  // Stats
  const stats = useMemo(() => {
    const total = inspectors.length;
    const active = inspectors.filter(i => i.status === 'active').length;
    const totalCompleted = inspectors.reduce((acc, curr) => acc + (curr.completedTasks || 0), 0);
    const avgTime = inspectors.length
      ? Math.round(inspectors.reduce((acc, curr) => acc + (curr.avgInspectionTime || 0), 0) / inspectors.length)
      : 0;

    return { total, active, totalCompleted, avgTime };
  }, [inspectors]);

  // Handlers
  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentInspector({});
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record: Inspector) => {
    setModalMode('edit');
    setCurrentInspector(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string, checked: boolean) => {
    setInspectors(prev => prev.map(i =>
      i.id === id ? { ...i, status: checked ? 'active' : 'disabled' } : i
    ));
    message.success(checked ? '账户已启用' : '账户已停用');
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (modalMode === 'add') {
        const newInspector: Inspector = {
          id: `i${Date.now()}`,
          currentTasks: 0,
          completedTasks: 0,
          avgInspectionTime: 0,
          status: 'active',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.name}`,
          ...values
        };
        setInspectors([...inspectors, newInspector]);
        message.success('添加成功');
      } else {
        setInspectors(inspectors.map(i =>
          i.id === currentInspector.id ? { ...i, ...values } as Inspector : i
        ));
        message.success('修改成功');
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这位检测师吗？此操作无法撤销。',
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: () => {
        setInspectors(prev => prev.filter(i => i.id !== id));
        message.success('已删除');
      }
    });
  };

  const columns: ColumnsType<Inspector> = [
    {
      title: '检测师信息',
      key: 'info',
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} size={40} />
          <div>
            <div className="font-medium text-base">{record.name}</div>
            <div className="text-xs text-slate-500">{record.phone}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '所在城市',
      dataIndex: 'city',
      key: 'city',
      width: 150,
      render: (text) => (
        <Space className="text-slate-600">
          <EnvironmentOutlined />
          <span>{text || '未知城市'}</span>
        </Space>
      )
    },
    {
      title: '账户状态',
      key: 'status',
      width: 150,
      render: (_, record) => (
        <Space>
          <Switch
            checked={record.status === 'active'}
            onChange={(checked) => handleToggleStatus(record.id, checked)}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        </Space>
      )
    },
    {
      title: '待检测任务',
      dataIndex: 'currentTasks',
      key: 'currentTasks',
      sorter: (a, b) => a.currentTasks - b.currentTasks,
      render: (val, record) => (
        <Button
          type="link"
          size="small"
          disabled={val === 0}
          onClick={() => navigate(`/work-orders?inspectorId=${record.id}&status=pending`)}
        >
          {val} 单
        </Button>
      )
    },
    {
      title: '累计已检',
      dataIndex: 'completedTasks',
      key: 'completedTasks',
      sorter: (a, b) => (a.completedTasks || 0) - (b.completedTasks || 0),
      render: (val) => <Text>{val || 0} 单</Text>
    },
    {
      title: '平均耗时',
      dataIndex: 'avgInspectionTime',
      key: 'avgInspectionTime',
      sorter: (a, b) => (a.avgInspectionTime || 0) - (b.avgInspectionTime || 0),
      render: (val) => <Text type="secondary">{val || 0} 分钟</Text>
    },
    {
      title: '操作',
      key: 'action',
      align: 'right',
      render: (_, record) => {
        const items = [
          {
            key: 'edit',
            label: '编辑',
            icon: <EditOutlined />,
            onClick: () => handleOpenEdit(record),
          },
          {
            key: 'delete',
            label: '删除',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => handleDelete(record.id),
          },
        ];
        return (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 bg-slate-50 min-h-screen"
    >
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} style={{ margin: 0 }}>检测师管理</Title>
          <Text type="secondary">管理检测师账户状态及工作绩效</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAdd}>
          添加检测师
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="账户启用"
              value={stats.active}
              suffix={`/ ${stats.total}`}
              prefix={<CheckCircleOutlined className="text-emerald-500" />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="累计已检总量"
              value={stats.totalCompleted}
              prefix={<CheckCircleOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="平均检测耗时"
              value={stats.avgTime}
              suffix="分钟"
              prefix={<ClockCircleOutlined className="text-amber-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card variant="borderless" className="shadow-sm">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">搜索</Text>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索姓名、手机号..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">城市</Text>
            <Select
              style={{ width: '100%' }}
              value={cityFilter}
              onChange={setCityFilter}
            >
              <Option value="all">全部城市</Option>
              {uniqueCities.map(c => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Text strong className="block mb-2 text-xs text-slate-500 uppercase">状态</Text>
            <Select
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">全部状态</Option>
              <Option value="active">启用中</Option>
              <Option value="disabled">已停用</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Card variant="borderless" className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredInspectors}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={modalMode === 'add' ? '添加检测师' : '编辑检测师'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="city" label="所属城市">
            <Input placeholder="请输入城市" />
          </Form.Item>
          {modalMode === 'add' && (
            <Form.Item name="initialPassword" label="初始密码">
              <Input.Password placeholder="请输入初始密码" />
            </Form.Item>
          )}
          <Form.Item name="status" label="账户状态" initialValue="active">
            <Select>
              <Option value="active">启用</Option>
              <Option value="disabled">停用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </motion.div>
  );
}
