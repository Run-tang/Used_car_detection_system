import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Tag,
  Modal,
  Space,
  Card,
  message,
  Typography,
  Row,
  Col,
  List,
  Divider,
} from 'antd';
import {
  SearchOutlined,
  LinkOutlined,
  DisconnectOutlined,
  DeleteOutlined,
  ExportOutlined,
  CarOutlined,
  ReloadOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { workOrders, vehicleArchives, sampleReport } from '@/data/mock';
import type { ColumnsType } from 'antd/es/table';
import type { WorkOrder, VehicleArchive } from '@/types';
import ReportDetail from './Detail';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Reports() {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [linkFilter, setLinkFilter] = useState('all');
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);
  const [loading, setLoading] = useState(false);

  // Selection State
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Simulation of "Unlinked" reports.
  const [unlinkedReports, setUnlinkedReports] = useState<string[]>([]);

  // Link Modal State
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [currentLinkReport, setCurrentLinkReport] = useState<WorkOrder | null>(null);
  const [archiveSearchQuery, setArchiveSearchQuery] = useState('');
  const [matchedArchives, setMatchedArchives] = useState<VehicleArchive[]>([]);

  useEffect(() => {
    // Initial mock logic setup
    setUnlinkedReports(workOrders.slice(0, 5).map(o => o.id)); // Pretend first 5 are unlinked
  }, []);

  // --- Handlers ---

  // Open Link Modal
  const openLinkModal = (report: WorkOrder) => {
    setCurrentLinkReport(report);
    setArchiveSearchQuery(report.vehicle.vin);
    handleArchiveSearch(report.vehicle.vin);
    setLinkModalVisible(true);
  };

  const handleArchiveSearch = (query: string) => {
    const q = query.toLowerCase();
    const results = vehicleArchives.filter(a =>
      a.vin.toLowerCase().includes(q) ||
      a.plateNumber?.toLowerCase().includes(q) ||
      a.brand.toLowerCase().includes(q)
    );
    setMatchedArchives(results);
  };

  const confirmLink = (archive: VehicleArchive) => {
    message.success(`成功关联到车辆档案：${archive.plateNumber || archive.id}`);
    if (currentLinkReport) {
      setUnlinkedReports(prev => prev.filter(id => id !== currentLinkReport.id));
    }
    setLinkModalVisible(false);
  };

  const createNewArchive = () => {
    if (!currentLinkReport) return;
    message.loading({ content: '正在创建新档案...', key: 'create' });
    setTimeout(() => {
      message.success({ content: '新档案创建成功并已自动关联！', key: 'create' });
      setUnlinkedReports(prev => prev.filter(id => id !== currentLinkReport!.id));
      setLinkModalVisible(false);
    }, 1000);
  };

  const toggleLink = (record: WorkOrder, isLinked: boolean) => {
    if (!isLinked) {
      openLinkModal(record);
    } else {
      Modal.confirm({
        title: '确认解除关联',
        content: <Text>确定要解除该报告与车辆档案的关联吗？<br /><Text type="secondary">解除后该报告将不再显示在车辆历史记录中。</Text></Text>,
        okText: '确认解除',
        okButtonProps: { danger: true },
        cancelText: '取消',
        onOk: () => {
          setUnlinkedReports(prev => [...prev, record.id]);
          message.success('已解除关联');
        }
      });
    }
  };

  // Batch Actions
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('列表已刷新');
    }, 600);
  };

  const handleBatchExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先勾选需要到处的数据');
      return;
    }
    const hide = message.loading('正在导出数据...', 0);
    setTimeout(() => {
      hide();
      message.success(`成功导出 ${selectedRowKeys.length} 条数据`);
      setSelectedRowKeys([]); // clear selection
    }, 1500);
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除确认',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个报告吗？此操作不可恢复。`,
      okText: '确定删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功');
        setSelectedRowKeys([]);
      }
    });
  };

  // Filter Logic
  const filteredData = workOrders
    .filter(order => { // Show 'completed' or all? Usually reports page shows completed. But mock has varied status. Let's filter for relevant ones.
      return order.status === 'completed' || order.status === 'dispatched' || order.status === 'under_review';
      // In reality, only completed/approved orders might have "Reports". 
      // But for mock data variation, let's include more status or just all.
      // Let's filter by "Has Report" logic, assume all in this list are reportable.
    })
    .filter(order => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        order.orderNo.toLowerCase().includes(searchLower) ||
        order.vehicle.vin.toLowerCase().includes(searchLower) ||
        order.vehicle.plateNumber?.toLowerCase().includes(searchLower);

      const isLinked = !unlinkedReports.includes(order.id);
      const matchesLink =
        linkFilter === 'all' ||
        (linkFilter === 'linked' && isLinked) ||
        (linkFilter === 'unlinked' && !isLinked);

      return matchesSearch && matchesLink;
    })
    .map(order => ({
      ...order,
      key: order.id,
      isLinked: !unlinkedReports.includes(order.id)
    }));

  const columns: ColumnsType<typeof filteredData[0]> = [
    {
      title: '报告编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 180,
      render: (text) => <Text strong copyable>{text}</Text>,
    },
    {
      title: '生成时间',
      dataIndex: 'completedAt',
      key: 'completedAt',
      width: 160,
      render: (text, record) => text || record.updatedAt,
    },
    {
      title: '关联工单',
      key: 'workOrder',
      width: 120,
      render: (_, record) => (
        <a onClick={() => navigate(`/work-orders/${record.id}`)}>
          查看工单
        </a>
      ),
    },
    {
      title: '车辆信息',
      key: 'vehicle',
      render: (_, record) => (
        <div>
          <Space>
            <Text strong>{record.vehicle.brand} {record.vehicle.model}</Text>
            {record.vehicle.plateNumber && <Tag>{record.vehicle.plateNumber}</Tag>}
          </Space>
          <div className="text-xs text-slate-500 font-mono mt-1">
            VIN: {record.vehicle.vin}
          </div>
        </div>
      ),
    },
    {
      title: '评分',
      key: 'score',
      width: 100,
      render: () => (
        <Space>
          <Text strong className="text-lg">92</Text>
          <Tag color="green">A级</Tag>
        </Space>
      ),
    },
    {
      title: '关联状态',
      key: 'linkStatus',
      width: 120,
      render: (_, record) => (
        record.isLinked ? (
          <Tag icon={<LinkOutlined />} color="blue">已关联</Tag>
        ) : (
          <Tag icon={<DisconnectOutlined />} color="default">未关联</Tag>
        )
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'right',
      width: 180,
      fixed: 'right', // Freeze action column
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <a onClick={() => navigate(`/reports/${record.id}`)}>预览</a>
          <a
            onClick={() => toggleLink(record, record.isLinked)}
            style={{ color: !record.isLinked ? '#1677ff' : '#ff4d4f' }}
          >
            {record.isLinked ? "解绑" : "关联"}
          </a>
        </Space>
      ),
    },
  ];

  // --- Render ---

  if (id) {
    // Mock: Always use sampleReport but override with ID for demo
    const detailReport: any = { ...sampleReport, id: id, workOrderId: id };
    // In real app: fetchReport(id)

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="h-full bg-slate-50 -m-6" // Negative margin to fill content area if parent has padding
      >
        <ReportDetail
          report={detailReport}
          onBack={() => navigate('/reports')}
          onPrint={() => message.info('打印功能开发中')}
          onDownload={() => message.success('PDF导出中...')}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-4 bg-slate-50 min-h-full"
    >
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} style={{ margin: 0 }}>检测报告</Title>
          <Text type="secondary">查看和管理检测报告数据</Text>
        </div>
      </div>

      {/* Filter Area */}
      <Card bordered={false} className="shadow-sm">
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <label className="text-slate-500 text-xs mb-1 block">关键词搜索</label>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="报告号 / VIN / 车牌"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <label className="text-slate-500 text-xs mb-1 block">关联状态</label>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={setLinkFilter}
              value={linkFilter}
            >
              <Option value="all">全部</Option>
              <Option value="linked">已关联</Option>
              <Option value="unlinked">未关联</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <label className="text-slate-500 text-xs mb-1 block">生成日期</label>
            <RangePicker style={{ width: '100%' }} onChange={(dates) => setDateRange(dates)} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="flex items-end">
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleRefresh}>查询</Button>
              <Button icon={<ReloadOutlined />} onClick={() => { setSearchQuery(''); setLinkFilter('all'); setDateRange(null); handleRefresh(); }}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Table Card */}
      <Card
        bordered={false}
        className="shadow-sm"
        bodyStyle={{ padding: '0 24px 24px 24px' }}
      >
        {/* Action Bar */}
        <div className="flex justify-between items-center py-4">
          <Space>
            {selectedRowKeys.length > 0 && (
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm border border-blue-100">
                已选择 <span className="font-bold">{selectedRowKeys.length}</span> 项
              </div>
            )}
          </Space>
          <Space>
            {selectedRowKeys.length > 0 && (
              <Button danger icon={<DeleteOutlined />} onClick={handleBatchDelete}>批量删除</Button>
            )}
            <Button icon={<ExportOutlined />} onClick={handleBatchExport}>导出列表</Button>
          </Space>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            total: filteredData.length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Link Archive Modal */}
      <Modal
        title={
          <div className='flex items-center gap-2'>
            <CarOutlined className='text-blue-600' />
            <span>关联车辆档案</span>
          </div>
        }
        open={linkModalVisible}
        onCancel={() => setLinkModalVisible(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-6 pt-4">
          {currentLinkReport && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <Text type="secondary" className="block mb-1 text-xs uppercase">当前检测车辆</Text>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{currentLinkReport.vehicle.brand} {currentLinkReport.vehicle.model}</div>
                  <div className="text-slate-500 font-mono">{currentLinkReport.vehicle.vin}</div>
                </div>
                {currentLinkReport.vehicle.plateNumber && <Tag>{currentLinkReport.vehicle.plateNumber}</Tag>}
              </div>
            </div>
          )}

          <div>
            <Text strong className="block mb-2">搜索库存档案</Text>
            <Input.Search
              placeholder="输入VIN或车牌号搜索"
              enterButton
              value={archiveSearchQuery}
              onChange={e => {
                setArchiveSearchQuery(e.target.value);
                handleArchiveSearch(e.target.value);
              }}
              onSearch={handleArchiveSearch}
            />
          </div>

          <List
            header={<Text type="secondary" className="text-xs">匹配结果 ({matchedArchives.length})</Text>}
            bordered
            dataSource={matchedArchives}
            locale={{ emptyText: '未找到匹配的车辆档案' }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" size="small" onClick={() => confirmLink(item)}>关联</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<CarOutlined />}
                  title={`${item.brand} ${item.model}`}
                  description={
                    <Space split="|">
                      <Text code>{item.plateNumber || '无牌'}</Text>
                      <span className='text-xs'>{item.vin}</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />

          <Divider plain>或</Divider>

          <Button block type="dashed" icon={<PlusCircleOutlined />} size="large" onClick={createNewArchive}>
            创建新车辆档案并关联
          </Button>
        </div>
      </Modal>

      {/* Old Preview Modal Removed */}

    </motion.div>
  );
}
