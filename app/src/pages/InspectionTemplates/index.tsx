import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Layout,
    Menu,
    Table,
    Button,
    Tag,
    Empty,
    Typography,
    Card,
    Modal,
    Form,
    Input,
    Select,
    Switch,
    InputNumber,
    message,
    Popconfirm,
    Row,
    Col,
    Badge,
    Tooltip
} from 'antd';
import {
    AppstoreOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    LeftOutlined,
    CheckCircleOutlined,
    StopOutlined
} from '@ant-design/icons';
import { inspectionTemplates as initialTemplates } from '@/data/templateData';
import type { TemplateCategory, TemplateItem, InspectionTemplate } from '@/types';
import dayjs from 'dayjs';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// --- Template Editor Component (The previous massive component) ---
interface TemplateEditorProps {
    template: InspectionTemplate;
    onBack: () => void;
    onSave: (updatedTemplate: InspectionTemplate) => void;
}

function TemplateEditor({ template, onBack, onSave }: TemplateEditorProps) {
    const [activeCategoryId, setActiveCategoryId] = useState<string>(template.categories[0]?.id || '');
    const [categories, setCategories] = useState<TemplateCategory[]>(template.categories);
    const [editingItem, setEditingItem] = useState<TemplateItem | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const activeCategory = categories.find(c => c.id === activeCategoryId);

    // Sync categories if template changes (though normally we remount)
    useEffect(() => {
        setCategories(template.categories);
        if (template.categories.length > 0 && !template.categories.find(c => c.id === activeCategoryId)) {
            setActiveCategoryId(template.categories[0].id);
        }
    }, [template]);

    const handleAddItem = () => {
        setEditingItem(null);
        form.resetFields();
        form.setFieldsValue({ required: true, type: 'photo' });
        setIsModalVisible(true);
    };

    const handleEditItem = (item: TemplateItem) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalVisible(true);
    };

    const handleDeleteItem = (itemId: string) => {
        setCategories(prev => prev.map(c => {
            if (c.id === activeCategoryId) {
                return { ...c, items: c.items.filter(i => i.id !== itemId) };
            }
            return c;
        }));
        message.success('检测项已删除');
    };

    const handleSaveItem = () => {
        form.validateFields().then(values => {
            const newItem: TemplateItem = {
                id: editingItem ? editingItem.id : `new-${Date.now()}`,
                ...values
            };

            setCategories(prev => prev.map(c => {
                if (c.id === activeCategoryId) {
                    if (editingItem) {
                        return { ...c, items: c.items.map(i => i.id === editingItem.id ? newItem : i) };
                    } else {
                        return { ...c, items: [...c.items, newItem] };
                    }
                }
                return c;
            }));

            setIsModalVisible(false);
            message.success(editingItem ? '修改成功' : '添加成功');
        });
    };

    const handleSaveTemplate = () => {
        const updated = { ...template, categories: categories, updatedAt: dayjs().format('YYYY-MM-DD HH:mm') };
        onSave(updated);
    };

    const columns = [
        {
            title: '检测项名称',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            render: (type: string) => {
                const map: Record<string, any> = {
                    photo: { color: 'blue', text: '拍照' },
                    input: { color: 'green', text: '文本输入' },
                    select: { color: 'orange', text: '单选' },
                    boolean: { color: 'purple', text: '是否项' },
                    multi_select: { color: 'cyan', text: '多选' },
                    date: { color: 'magenta', text: '日期' },
                };
                const t = map[type] || { color: 'default', text: type };
                return <Tag color={t.color}>{t.text}</Tag>;
            }
        },
        {
            title: '必填',
            dataIndex: 'required',
            key: 'required',
            width: '10%',
            render: (req: boolean) => (req ? <Tag color="red">是</Tag> : <Tag color="default">否</Tag>),
        },
        {
            title: '详细配置',
            key: 'config',
            render: (_: any, record: TemplateItem) => (
                <div className="flex flex-col gap-0">
                    {record.type === 'select' && record.options && (
                        <Text type="secondary" className="text-xs">选项: {record.options.join(', ')}</Text>
                    )}
                    {record.type === 'photo' && record.photoCount && (
                        <Text type="secondary" className="text-xs">照片数量: {record.photoCount}张</Text>
                    )}
                    {record.description && (
                        <Text type="secondary" className="text-xs">{record.description}</Text>
                    )}
                </div>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_: any, record: TemplateItem) => (
                <div className="flex gap-2">
                    <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEditItem(record)}>
                        编辑
                    </Button>
                    <Popconfirm title="确定删除吗?" onConfirm={() => handleDeleteItem(record.id)}>
                        <Button type="text" danger size="small" icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-4">
                    <Button icon={<LeftOutlined />} onClick={onBack}>返回列表</Button>
                    <div>
                        <Title level={4} style={{ margin: 0 }}>{template.name}</Title>
                        <div className="flex gap-2 text-xs text-slate-500 mt-1">
                            <Tag color={template.vehicleType === 'electric' ? 'green' : 'blue'}>
                                {template.vehicleType === 'electric' ? '新能源' : '燃油车'}
                            </Tag>
                            <span>配置详情</span>
                        </div>
                    </div>
                </div>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveTemplate}>保存模板变更</Button>
            </div>

            <Layout className="flex-1 bg-white overflow-hidden">
                <Sider width={240} theme="light" className="border-r border-slate-200 overflow-y-auto">
                    <Menu
                        mode="inline"
                        selectedKeys={[activeCategoryId]}
                        onClick={({ key }) => setActiveCategoryId(key)}
                        style={{ borderRight: 0 }}
                        items={categories.map(c => ({
                            key: c.id,
                            icon: <AppstoreOutlined />,
                            label: <span className="font-medium">{c.name}</span>
                        }))}
                    />
                </Sider>
                <Content className="p-6 bg-slate-50 overflow-y-auto">
                    {activeCategory ? (
                        <Card
                            title={
                                <div className="flex justify-between items-center">
                                    <span>{activeCategory.name} ({activeCategory.items.length})</span>
                                    <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddItem}>添加检测项</Button>
                                </div>
                            }
                            variant="borderless"
                            className="shadow-sm min-h-full"
                        >
                            <Table
                                columns={columns}
                                dataSource={activeCategory.items}
                                rowKey="id"
                                pagination={false}
                            />
                        </Card>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <Empty description="请选择左侧分类" />
                        </div>
                    )}
                </Content>
            </Layout>

            {/* Reuse Modal logic */}
            <Modal
                title={editingItem ? '编辑检测项' : '添加检测项'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSaveItem}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="检测项名称" rules={[{ required: true }]}>
                        <Input placeholder="输入项目名称" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="type" label="录入类型" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="photo">拍照</Option>
                                    <Option value="input">文本输入</Option>
                                    <Option value="boolean">是/否选项</Option>
                                    <Option value="select">单选下拉</Option>
                                    <Option value="date">日期选择</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="required" label="必填项" valuePropName="checked">
                                <Switch checkedChildren="必填" unCheckedChildren="选填" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prev, current) => prev.type !== current.type}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('type') === 'photo' ? (
                                <Form.Item name="photoCount" label="照片数量限制">
                                    <InputNumber min={1} max={9} style={{ width: '100%' }} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prev, current) => prev.type !== current.type}
                    >
                        {({ getFieldValue }) =>
                            ['select', 'multi_select'].includes(getFieldValue('type')) ? (
                                <Form.Item name="options" label="选项配置 (用逗号分隔自动转换)" tooltip="输入如: 公户,私户">
                                    <Select mode="tags" placeholder="输入选项并回车" tokenSeparators={[',', '，']} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item name="description" label="备注说明">
                        <Input.TextArea rows={2} placeholder="给检测师的操作提示..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

// --- Main Page Component ---

export default function InspectionTemplates() {
    const [templates, setTemplates] = useState<InspectionTemplate[]>(initialTemplates);
    const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');
    const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);

    const handleEditTemplateContent = (template: InspectionTemplate) => {
        setCurrentTemplateId(template.id);
        setViewMode('edit');
    };

    const handleSaveTemplateContent = (updatedTemplate: InspectionTemplate) => {
        setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
        message.success('模板内容已保存');
    };

    const handleDeleteTemplate = (id: string) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
        message.success('模板已删除');
    };

    const handleStatusChange = (checked: boolean, template: InspectionTemplate) => {
        if (!checked) {
            // Turning off is always allowed
            setTemplates(prev => prev.map(t => t.id === template.id ? { ...t, status: 'inactive' } : t));
            return;
        }

        // Turning on: Enforce "One active template per vehicle type"
        // Find other active templates of same vehicleType
        setTemplates(prev => prev.map(t => {
            if (t.id === template.id) {
                return { ...t, status: 'active' };
            }
            if (t.vehicleType === template.vehicleType && t.status === 'active') {
                return { ...t, status: 'inactive' }; // Turn off others of same type
            }
            return t;
        }));
        message.success(`已启用 "${template.name}"`);
    };

    // List Columns
    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: InspectionTemplate) => (
                <div>
                    <div className="font-medium text-base">{text}</div>
                    {record.description && <div className="text-xs text-slate-500">{record.description}</div>}
                </div>
            )
        },
        {
            title: '适应车型',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            width: 120,
            render: (type: string) => (
                type === 'electric'
                    ? <Tag color="green">新能源</Tag>
                    : <Tag color="blue">燃油车</Tag>
            )
        },
        {
            title: '状态',
            key: 'status',
            width: 150,
            render: (_: any, record: InspectionTemplate) => (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={record.status === 'active'}
                        onChange={(checked) => handleStatusChange(checked, record)}
                    />
                    <span className={`text-sm ${record.status === 'active' ? 'text-green-600' : 'text-slate-400'}`}>
                        {record.status === 'active' ? '启用中' : '已停用'}
                    </span>
                </div>
            )
        },
        {
            title: '最后更新',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 180,
            render: (text: string) => <Text type="secondary">{text}</Text>
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_: any, record: InspectionTemplate) => (
                <div className="flex gap-3">
                    <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEditTemplateContent(record)}>
                        配置详情
                    </Button>
                    <Popconfirm
                        title="确定删除此模板?"
                        description="删除后不可恢复"
                        onConfirm={() => handleDeleteTemplate(record.id)}
                        okText="删除"
                        cancelText="取消"
                        disabled={record.status === 'active'}
                    >
                        <Button
                            type="text"
                            danger
                            size="small"
                            disabled={record.status === 'active'}
                            title={record.status === 'active' ? "启用状态下不可删除" : "删除"}
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    if (viewMode === 'edit' && currentTemplateId) {
        const template = templates.find(t => t.id === currentTemplateId);
        if (template) {
            return (
                <motion.div
                    key="editor"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full bg-white"
                >
                    <TemplateEditor
                        template={template}
                        onBack={() => setViewMode('list')}
                        onSave={handleSaveTemplateContent}
                    />
                </motion.div>
            );
        }
    }

    return (
        <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 h-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={3} className="m-0">检测模板管理</Title>
                    <Text type="secondary">管理不同车型的检测标准，配置检测项细节</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">新建模板</Button>
            </div>

            <Card variant="borderless" className="shadow-sm flex-1 overflow-auto">
                <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-2">
                    <div className="mt-0.5 text-blue-500"><CheckCircleOutlined /></div>
                    <div className="text-sm text-blue-700">
                        <span className="font-bold">启用规则说明：</span>
                        同一种车型（燃油车/新能源）在同一时间下，系统仅允许启用一个检测模板。启用新模板时，该车型下其他已启用的模板将自动关闭。
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={templates}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </motion.div>
    );
}
