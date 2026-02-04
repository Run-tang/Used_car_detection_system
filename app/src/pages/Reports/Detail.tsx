import { useMemo } from 'react';
import {
    Typography,
    Tag,
    Card,
    Row,
    Col,
    Tabs,
    Image,
    Space,
    Button,
    message
} from 'antd';
import {
    AlertTriangle,
    Download,
    Printer,
} from 'lucide-react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { InspectionReport, InspectionItem, TemplateCategory } from '@/types';
import { inspectionTemplates } from '@/data/templateData';

const { Title, Text, Paragraph } = Typography;

interface ReportDetailProps {
    report: InspectionReport;
    onBack?: () => void;
    onPrint?: () => void;
    onDownload?: () => void;
}

export default function ReportDetail({ report, onBack, onPrint, onDownload }: ReportDetailProps) {
    // 1. Identify Vehicle Type & Template
    const template = useMemo(() => {
        // Mock logic: default to the first active template
        return inspectionTemplates.find(t => t.status === 'active') || inspectionTemplates[0];
    }, []);

    // 2. Group Inspection Items by Category ID for fast lookup
    const itemMap = useMemo(() => {
        const map = new Map<string, InspectionItem>();
        report.inspectionItems.forEach(item => {
            map.set(item.name, item);
            map.set(item.id, item);
        });
        return map;
    }, [report.inspectionItems]);

    // Renderers
    const renderStatus = (status: string) => {
        switch (status) {
            case 'pass': return <Tag color="success" icon={<CheckCircleOutlined />}>正常</Tag>;
            case 'fail': return <Tag color="error" icon={<CloseCircleOutlined />}>异常</Tag>;
            case 'warning': return <Tag color="warning" icon={<WarningOutlined />}>关注</Tag>;
            default: return <Tag>未检</Tag>;
        }
    };

    const renderCategoryContent = (category: TemplateCategory) => {
        return (
            <div className="space-y-4">
                {category.items.map((templateItem) => {
                    // Find result
                    const result = itemMap.get(templateItem.name) || itemMap.get(templateItem.id);
                    const status = result?.status || 'not_checked';

                    return (
                        <div key={templateItem.id} className="flex items-start justify-between p-3 bg-white border border-slate-100 rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Text strong>{templateItem.name}</Text>
                                    {templateItem.required && <span className="text-red-400 text-xs">*</span>}
                                </div>
                                {templateItem.description && <Text type="secondary" className="text-xs block mb-1">{templateItem.description}</Text>}

                                {/* Detailed Comment if any */}
                                {(result?.inspectorComment || result?.auditorComment) && (
                                    <div className="mt-2 text-xs bg-slate-50 p-2 rounded">
                                        {result.inspectorComment && <div className="text-slate-600"><span className="font-bold">检测师:</span> {result.inspectorComment}</div>}
                                        {result.auditorComment && <div className="text-blue-600"><span className="font-bold">审核员:</span> {result.auditorComment}</div>}
                                    </div>
                                )}

                                {/* Photos */}
                                {result?.photos && result.photos.length > 0 && (
                                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                                        <Image.PreviewGroup>
                                            {result.photos.map((url, i) => (
                                                <Image key={i} src={url} width={60} height={60} className="object-cover rounded" />
                                            ))}
                                        </Image.PreviewGroup>
                                    </div>
                                )}
                            </div>
                            <div className="ml-4">
                                {renderStatus(status)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-slate-50 min-h-full">
            {/* Header Section */}
            <div className="bg-white p-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <Title level={3} style={{ margin: 0 }}>
                            {template.vehicleType === 'electric' ? '新能源' : '机动车'}检测报告
                        </Title>
                        <Text type="secondary">报告编号: {report.workOrderId.toUpperCase()}</Text>
                    </div>
                    <div className="flex gap-2">
                        {onPrint && <Button icon={<Printer size={16} />} onClick={onPrint}>打印</Button>}
                        {onDownload && <Button type="primary" icon={<Download size={16} />} onClick={onDownload}>导出PDF</Button>}
                        {onBack && <Button onClick={onBack}>关闭</Button>}
                    </div>
                </div>

                <Row gutter={24} className="items-center">
                    <Col xs={24} md={8}>
                        <Card bordered={false} className="bg-blue-50">
                            <div className="text-center">
                                <div className="text-blue-600 text-sm mb-1 font-medium">综合评分</div>
                                <div className="text-5xl font-bold text-blue-700 mb-2">{report.score}</div>
                                <Tag color="blue" className="px-3 py-0.5 text-base border-blue-200">{report.grade}级车况</Tag>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={16}>
                        <div className="flex flex-col h-full justify-center">
                            <div className="mb-2">
                                <Text strong className="text-lg">检测总结</Text>
                            </div>
                            <Paragraph className="text-slate-600 mb-0" ellipsis={{ rows: 3, expandable: true }}>
                                {report.summary || '暂无详细总结'}
                            </Paragraph>
                            <div className="mt-4 flex gap-2">
                                {report.tags.map(tag => <Tag key={tag} color="geekblue">{tag}</Tag>)}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                {/* Defects Section */}
                {report.defects.length > 0 && (
                    <Card
                        title={<Space><AlertTriangle size={18} className="text-orange-500" /> <span className="text-orange-600">异常缺陷项 ({report.defects.length})</span></Space>}
                        className="mb-6 border-orange-200 shadow-sm"
                        headStyle={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa' }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {report.defects.map(defect => (
                                <div key={defect.id} className="flex p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <Text strong className="text-slate-800">{defect.description}</Text>
                                            <Tag color="orange">{defect.category}</Tag>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            位置: {defect.location || '未知'} | 严重程度: {
                                                defect.severity === 'severe' ? <span className="text-red-500 font-bold">严重</span> :
                                                    defect.severity === 'moderate' ? <span className="text-orange-500">中度</span> : '轻微'
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Detailed Items */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                    <Tabs
                        tabPosition="left"
                        size="large"
                        className="report-tabs min-h-[600px]"
                        items={template.categories.map(category => ({
                            key: category.id,
                            label: (
                                <span className="flex items-center justify-between w-full min-w-[120px]">
                                    {category.name.split('、')[1] || category.name}
                                </span>
                            ),
                            children: (
                                <div className="px-6 py-4 h-full overflow-y-auto">
                                    <Title level={4} className="mb-4">{category.name}</Title>
                                    {renderCategoryContent(category)}
                                </div>
                            )
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}
