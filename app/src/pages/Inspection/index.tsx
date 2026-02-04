import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, CheckCircle, 
  ChevronRight, ChevronLeft, Save, Send, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { inspectionCategories } from '@/data/inspectionItems';
import type { InspectionItem } from '@/data/inspectionItems';
import { cn } from '@/lib/utils';

export default function Inspection() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  const [inspectionData, setInspectionData] = useState<Record<string, any>>({});

  const currentCategory = inspectionCategories[currentCategoryIndex];
  const progress = ((currentCategoryIndex + 1) / inspectionCategories.length) * 100;

  const goNext = () => {
    if (currentCategoryIndex < inspectionCategories.length - 1) {
      if (!completedCategories.includes(currentCategory.id)) {
        setCompletedCategories([...completedCategories, currentCategory.id]);
      }
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateInspectionData = (itemId: string, value: any) => {
    setInspectionData({
      ...inspectionData,
      [itemId]: value
    });
  };

  const isCategoryCompleted = (categoryId: string) => completedCategories.includes(categoryId);

  const renderInspectionItem = (item: InspectionItem) => {
    const value = inspectionData[item.id];

    switch (item.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor={item.id}>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={item.id}
              value={value || ''}
              onChange={(e) => updateInspectionData(item.id, e.target.value)}
              placeholder={item.placeholder}
              className="max-w-md"
            />
          </div>
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={item.id}>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={item.id}
              type="number"
              value={value || ''}
              onChange={(e) => updateInspectionData(item.id, e.target.value)}
              placeholder={item.placeholder}
              className="max-w-md"
            />
          </div>
        );

      case 'date':
        return (
          <div className="space-y-2">
            <Label htmlFor={item.id}>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={item.id}
              type="date"
              value={value || ''}
              onChange={(e) => updateInspectionData(item.id, e.target.value)}
              className="max-w-md"
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Label>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value || ''} onValueChange={(v) => updateInspectionData(item.id, v)}>
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder={`请选择${item.name}`} />
              </SelectTrigger>
              <SelectContent>
                {item.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            <Label>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <RadioGroup
              value={value || ''}
              onValueChange={(v) => updateInspectionData(item.id, v)}
              className="flex flex-wrap gap-4"
            >
              {item.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${item.id}-${option}`} />
                  <Label htmlFor={`${item.id}-${option}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            <Label>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex flex-wrap gap-4">
              {item.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${item.id}-${option}`}
                    checked={(value || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = value || [];
                      if (checked) {
                        updateInspectionData(item.id, [...currentValues, option]);
                      } else {
                        updateInspectionData(item.id, currentValues.filter((v: string) => v !== option));
                      }
                    }}
                  />
                  <Label htmlFor={`${item.id}-${option}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-2">
            <Label>
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {item.description && (
              <p className="text-sm text-slate-500">{item.description}</p>
            )}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">点击或拖拽上传照片</p>
              <p className="text-xs text-slate-400 mt-1">支持 JPG、PNG 格式</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">现场检测</h1>
          <p className="text-slate-500 mt-1">工单：WO20240129001 | 大众帕萨特</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </Button>
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
            检测中
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">检测进度</span>
            <span className="text-sm font-medium text-slate-900">
              {currentCategoryIndex + 1} / {inspectionCategories.length} 项
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 mt-2">
            当前：{currentCategory.name}（共 {currentCategory.items.length} 项检测点）
          </p>
        </CardContent>
      </Card>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {inspectionCategories.map((cat, index) => {
            const isActive = index === currentCategoryIndex;
            const isCompleted = isCategoryCompleted(cat.id);
            
            return (
              <button
                key={cat.id}
                onClick={() => goToCategory(index)}
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive && 'bg-blue-600 text-white shadow-lg',
                  !isActive && isCompleted && 'bg-emerald-100 text-emerald-700',
                  !isActive && !isCompleted && 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs mr-1.5">
                    {index + 1}
                  </span>
                )}
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  {currentCategory.name}
                  <Badge className="ml-3 bg-slate-100 text-slate-600">
                    {currentCategory.items.length} 项
                  </Badge>
                </CardTitle>
                <span className="text-sm text-slate-500">
                  第 {currentCategoryIndex + 1} / {inspectionCategories.length} 项
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {currentCategory.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      'p-4 rounded-lg',
                      index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    )}
                  >
                    {renderInspectionItem(item)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentCategoryIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          上一项
        </Button>
        
        {currentCategoryIndex < inspectionCategories.length - 1 ? (
          <Button onClick={goNext} className="bg-blue-600 hover:bg-blue-700">
            下一项
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="w-4 h-4 mr-2" />
            提交检测
          </Button>
        )}
      </div>
    </div>
  );
}
