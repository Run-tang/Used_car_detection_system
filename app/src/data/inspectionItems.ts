// 检测项目配置 - 按照用户提供的详细清单

export interface InspectionCategory {
  id: string;
  name: string;
  icon: string;
  items: InspectionItem[];
}

export interface InspectionItem {
  id: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'number' | 'photo' | 'checkbox' | 'radio';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  description?: string;
}

// 1. 证件手续
export const documentItems: InspectionItem[] = [
  { id: 'doc_1', name: '行驶证正副证及背面图片', type: 'photo', required: true },
  { id: 'doc_2', name: 'VIN码', type: 'text', required: true, placeholder: '请输入17位VIN码' },
  { id: 'doc_3', name: '车牌号', type: 'text', required: true, placeholder: '如：京A12345' },
  { id: 'doc_4', name: '所有人', type: 'radio', options: ['公户', '私户'], required: true },
  { id: 'doc_5', name: '使用性质', type: 'select', options: ['非营运', '营运', '营转非', '租赁营运', '租赁非营运', '货运', '出租转非', '预约出租客运', '预约出租转非', '教练车'], required: true },
  { id: 'doc_6', name: '发动机号', type: 'text', required: true },
  { id: 'doc_7', name: '注册日期', type: 'date', required: true },
  { id: 'doc_8', name: '座位数', type: 'number', required: true },
  { id: 'doc_9', name: '年检到期日', type: 'date', required: true },
  { id: 'doc_10', name: '车辆库存地', type: 'text', required: true },
  { id: 'doc_11', name: '登记证第一至第四页照片', type: 'photo', required: true },
  { id: 'doc_12', name: '证件车身颜色', type: 'text', required: true },
  { id: 'doc_13', name: '燃油类型', type: 'select', options: ['汽油', '柴油', '油电混合', '纯电动', '油气混合', '油改气'], required: true },
  { id: 'doc_14', name: '出厂日期', type: 'date', required: true },
  { id: 'doc_15', name: '是否一手车', type: 'radio', options: ['是', '否'], required: true },
  { id: 'doc_16', name: '原始发票', type: 'radio', options: ['有', '无'], required: true },
  { id: 'doc_17', name: '交强险保单', type: 'photo', required: false },
  { id: 'doc_18', name: '交强险', type: 'radio', options: ['有', '无'], required: true },
  { id: 'doc_19', name: '交强险到期日', type: 'date', required: false },
  { id: 'doc_20', name: '同所有人一致', type: 'radio', options: ['是', '否'], required: true },
  { id: 'doc_21', name: '保单类型', type: 'select', options: ['纸质保单', '电子保单'], required: false },
  { id: 'doc_22', name: '商业险', type: 'photo', required: false },
  { id: 'doc_23', name: '车船税', type: 'photo', required: false },
  { id: 'doc_24', name: '其他证件', type: 'photo', required: false },
];

// 2. 车型信息
export const vehicleInfoItems: InspectionItem[] = [
  { id: 'info_1', name: '车型车系', type: 'text', required: true },
  { id: 'info_2', name: '排量', type: 'text', required: true, placeholder: '如：2.0T' },
  { id: 'info_3', name: '外观颜色', type: 'text', required: true },
  { id: 'info_4', name: '内饰颜色', type: 'text', required: true },
  { id: 'info_5', name: '钥匙数量', type: 'number', required: true },
  { id: 'info_6', name: '排放标准', type: 'select', options: ['国三', '国四', '国五', '国六', '国六B'], required: true },
];

// 3. 车身主图 - 14张固定位置
export const mainPhotoItems: InspectionItem[] = [
  { id: 'photo_1', name: '左前45度', type: 'photo', required: true, description: '车身左前方45度角拍摄' },
  { id: 'photo_2', name: '左前门板', type: 'photo', required: true },
  { id: 'photo_3', name: '前排座椅', type: 'photo', required: true },
  { id: 'photo_4', name: '车钥匙', type: 'photo', required: true },
  { id: 'photo_5', name: '仪表盘', type: 'photo', required: true },
  { id: 'photo_6', name: '后排全景', type: 'photo', required: true },
  { id: 'photo_7', name: '完整中控台全景', type: 'photo', required: true },
  { id: 'photo_8', name: '后备箱', type: 'photo', required: true },
  { id: 'photo_9', name: '右后45度', type: 'photo', required: true, description: '车身右后方45度角拍摄' },
  { id: 'photo_10', name: '车辆底盘', type: 'photo', required: true },
  { id: 'photo_11', name: '铭牌', type: 'photo', required: true },
  { id: 'photo_12', name: '车架号', type: 'photo', required: true },
  { id: 'photo_13', name: '发动机舱', type: 'photo', required: true },
  { id: 'photo_14', name: '车辆前底盘', type: 'photo', required: true },
];

// 4. 机电检查 - 5个区域
export const mechanicalItems: InspectionItem[] = [
  { id: 'mech_area', name: '检查区域', type: 'checkbox', options: ['左前区域', '左后区域', '车尾区域', '右后区域', '右前区域'], required: true },
  { id: 'mech_status', name: '整体状况', type: 'select', options: ['正常', '轻微异常', '严重异常'], required: true },
  { id: 'mech_desc', name: '详细描述', type: 'text', required: false, placeholder: '如有异常请详细描述' },
  { id: 'mech_photos', name: '机电检查照片', type: 'photo', required: true },
];

// 5. 车头
export const frontItems: InspectionItem[] = [
  { id: 'front_1', name: '前风挡', type: 'select', options: ['正常', '轻微划痕', '严重划痕', '裂纹', '更换'], required: true },
  { id: 'front_2', name: '发动机舱盖外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'front_3', name: '发动机舱盖内侧', type: 'select', options: ['正常', '轻微变形', '严重变形', '更换'], required: true },
  { id: 'front_4', name: '右前大灯', type: 'select', options: ['正常', '划痕', '裂纹', '更换'], required: true },
  { id: 'front_5', name: '右前雾灯', type: 'select', options: ['正常', '损坏', '更换'], required: true },
  { id: 'front_6', name: '前保险杠', type: 'select', options: ['原漆', '喷漆', '更换'], required: true },
  { id: 'front_7', name: '中网', type: 'select', options: ['正常', '划痕', '更换'], required: true },
  { id: 'front_8', name: '左前大灯', type: 'select', options: ['正常', '划痕', '裂纹', '更换'], required: true },
  { id: 'front_9', name: '左前雾灯', type: 'select', options: ['正常', '损坏', '更换'], required: true },
  { id: 'front_10', name: '前底盘', type: 'select', options: ['正常', '轻微剐蹭', '严重剐蹭', '变形'], required: true },
];

// 6. 发动机舱
export const engineItems: InspectionItem[] = [
  { id: 'eng_1', name: '水箱框架', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_2', name: '前防撞梁', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_3', name: '右前纵梁', type: 'select', options: ['正常', '轻微变形', '严重变形', '切割'], required: true },
  { id: 'eng_4', name: '右前翼子板骨架', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_5', name: '右前减震器支座', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_6', name: '左前纵梁', type: 'select', options: ['正常', '轻微变形', '严重变形', '切割'], required: true },
  { id: 'eng_7', name: '左前翼子板骨架', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_8', name: '左前减震器支座', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'eng_9', name: '防火墙隔热棉', type: 'select', options: ['正常', '破损', '更换'], required: true },
  { id: 'eng_10', name: '防火墙', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'eng_11', name: '发动机变速箱及附件', type: 'select', options: ['正常', '渗油', '漏油', '拆卸'], required: true },
  { id: 'eng_12', name: '发动机主线束', type: 'select', options: ['正常', '老化', '更换'], required: true },
  { id: 'eng_13', name: '机舱内保险盒', type: 'select', options: ['正常', '进水', '更换'], required: true },
  { id: 'eng_14', name: '车架号', type: 'select', options: ['清晰', '模糊', '凿改'], required: true },
  { id: 'eng_15', name: '电池检查', type: 'select', options: ['正常', '老化', '需更换'], required: true },
  { id: 'eng_16', name: '皮带检查', type: 'select', options: ['正常', '老化', '裂纹', '需更换'], required: true },
  { id: 'eng_17', name: '机油液检查', type: 'select', options: ['正常', '不足', '乳化', '变质'], required: true },
  { id: 'eng_18', name: '防冻液检查', type: 'select', options: ['正常', '不足', '变色', '需更换'], required: true },
  { id: 'eng_19', name: '刹车油检查', type: 'select', options: ['正常', '不足', '变色', '需更换'], required: true },
  { id: 'eng_20', name: '助力油检查', type: 'select', options: ['正常', '不足', '漏油', '需更换'], required: true },
];

// 7. 右前车身
export const rightFrontBodyItems: InspectionItem[] = [
  { id: 'rf_body_1', name: '右前翼子板外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'rf_body_2', name: '右前翼子板内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rf_body_3', name: '右前轮内罩', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rf_body_4', name: '右前轮胎', type: 'select', options: ['正常', '磨损', '老化', '需更换'], required: true },
  { id: 'rf_body_5', name: '右前轮毂', type: 'select', options: ['正常', '划痕', '变形', '更换'], required: true },
  { id: 'rf_body_6', name: '右前减震器', type: 'select', options: ['正常', '渗油', '漏油', '需更换'], required: true },
  { id: 'rf_body_7', name: '右后视镜', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
  { id: 'rf_body_8', name: '右前门玻璃', type: 'select', options: ['正常', '划痕', '更换'], required: true },
  { id: 'rf_body_9', name: '右前门外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'rf_body_10', name: '右前门内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rf_body_11', name: '右前门内饰（含胶条）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rf_body_12', name: '右前车门裙边饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'rf_body_13', name: '右前车门裙边外侧', type: 'select', options: ['正常', '划痕', '变形', '修复'], required: true },
  { id: 'rf_body_14', name: '右前车门裙边内侧', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'rf_body_15', name: '右A柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'rf_body_16', name: '右A柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rf_body_17', name: '右前车顶', type: 'select', options: ['原漆', '喷漆', '钣金'], required: true },
  { id: 'rf_body_18', name: '天窗玻璃', type: 'select', options: ['正常', '划痕', '裂纹', '更换'], required: true },
  { id: 'rf_body_19', name: '右B柱内侧（前部）', type: 'select', options: ['正常', '变形', '修复'], required: true },
];

// 8. 右前内饰
export const rightFrontInteriorItems: InspectionItem[] = [
  { id: 'rf_int_1', name: '副驾驶座安全带', type: 'select', options: ['正常', '磨损', '更换'], required: true },
  { id: 'rf_int_2', name: '副驾驶座椅区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rf_int_3', name: '右前座椅滑轨', type: 'select', options: ['正常', '锈蚀', '卡滞'], required: true },
  { id: 'rf_int_4', name: '右前地毯（含周边饰条、饰板）', type: 'select', options: ['正常', '污渍', '水渍', '更换'], required: true },
  { id: 'rf_int_5', name: '副驾驶仪表台', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'rf_int_6', name: '右A柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'rf_int_7', name: '右前顶棚（含遮阳板）', type: 'select', options: ['正常', '污渍', '破损', '更换'], required: true },
  { id: 'rf_int_8', name: '内后视镜', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
];

// 9. 右后车身
export const rightRearBodyItems: InspectionItem[] = [
  { id: 'rr_body_1', name: '右后门玻璃', type: 'select', options: ['正常', '划痕', '更换'], required: true },
  { id: 'rr_body_2', name: '右后门外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'rr_body_3', name: '右后门内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rr_body_4', name: '右后门内饰（含胶条）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rr_body_5', name: '右B柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'rr_body_6', name: '右B柱内侧（后部）', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rr_body_7', name: '右后车顶', type: 'select', options: ['原漆', '喷漆', '钣金'], required: true },
  { id: 'rr_body_8', name: '右C柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'rr_body_9', name: '右C柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rr_body_10', name: '右后车门裙边饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'rr_body_11', name: '右后车门裙边外侧', type: 'select', options: ['正常', '划痕', '变形', '修复'], required: true },
  { id: 'rr_body_12', name: '右后车门裙边内侧', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'rr_body_13', name: '右侧车厢底板及纵梁', type: 'select', options: ['正常', '变形', '锈蚀', '修复'], required: true },
  { id: 'rr_body_14', name: '右侧底边', type: 'select', options: ['正常', '划痕', '变形', '锈蚀'], required: true },
  { id: 'rr_body_15', name: '右后翼子板外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'rr_body_16', name: '右后轮内衬罩', type: 'select', options: ['正常', '破损', '更换'], required: true },
  { id: 'rr_body_17', name: '右后轮胎', type: 'select', options: ['正常', '磨损', '老化', '需更换'], required: true },
  { id: 'rr_body_18', name: '右后轮毂', type: 'select', options: ['正常', '划痕', '变形', '更换'], required: true },
  { id: 'rr_body_19', name: '右后减震器', type: 'select', options: ['正常', '渗油', '漏油', '需更换'], required: true },
];

// 10. 右后内饰
export const rightRearInteriorItems: InspectionItem[] = [
  { id: 'rr_int_1', name: '右后安全带', type: 'select', options: ['正常', '磨损', '更换'], required: true },
  { id: 'rr_int_2', name: '右后座椅区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rr_int_3', name: '后排扶手区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rr_int_4', name: '右后座椅滑轨', type: 'select', options: ['正常', '锈蚀', '卡滞'], required: true },
  { id: 'rr_int_5', name: '后排点烟器座', type: 'select', options: ['正常', '损坏', '更换'], required: true },
  { id: 'rr_int_6', name: '右后地毯（含周边饰条、饰板）', type: 'select', options: ['正常', '污渍', '水渍', '更换'], required: true },
  { id: 'rr_int_7', name: '第三排座椅安全带', type: 'select', options: ['正常', '磨损', '更换'], required: false },
  { id: 'rr_int_8', name: '第三排座椅', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: false },
  { id: 'rr_int_9', name: '第三排座椅滑轨', type: 'select', options: ['正常', '锈蚀', '卡滞'], required: false },
  { id: 'rr_int_10', name: '右B柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'rr_int_11', name: '右后顶棚', type: 'select', options: ['正常', '污渍', '破损', '更换'], required: true },
  { id: 'rr_int_12', name: '右C柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
];

// 11. 车尾
export const rearItems: InspectionItem[] = [
  { id: 'rear_1', name: '后风挡', type: 'select', options: ['正常', '划痕', '裂纹', '更换'], required: true },
  { id: 'rear_2', name: '后备箱盖外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'rear_3', name: '后备箱盖内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'rear_4', name: '后备箱内饰板（含胶条）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'rear_5', name: '右后尾灯', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
  { id: 'rear_6', name: '左后尾灯', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
  { id: 'rear_7', name: '后保险杠', type: 'select', options: ['原漆', '喷漆', '更换'], required: true },
  { id: 'rear_8', name: '后防撞梁', type: 'select', options: ['正常', '变形', '更换'], required: true },
  { id: 'rear_9', name: '右后纵梁', type: 'select', options: ['正常', '轻微变形', '严重变形', '切割'], required: true },
  { id: 'rear_10', name: '左后纵梁', type: 'select', options: ['正常', '轻微变形', '严重变形', '切割'], required: true },
  { id: 'rear_11', name: '后底盘', type: 'select', options: ['正常', '轻微剐蹭', '严重剐蹭', '变形'], required: true },
];

// 12. 后备箱内部
export const trunkItems: InspectionItem[] = [
  { id: 'trunk_1', name: '后部导水槽', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'trunk_2', name: '后窗台板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'trunk_3', name: '右D柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'trunk_4', name: '右D柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_5', name: '右D柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'trunk_6', name: '右后翼子板导水槽', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'trunk_7', name: '后备箱内饰（含密封胶条、地毯、周边饰条、饰板）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'trunk_8', name: '右后翼子板内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_9', name: '右后翼子板骨架', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_10', name: '后围板', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_11', name: '备胎（含轮胎、轮毂）', type: 'select', options: ['正常', '磨损', '无备胎'], required: true },
  { id: 'trunk_12', name: '千斤顶', type: 'select', options: ['有', '无'], required: true },
  { id: 'trunk_13', name: '轮胎扳手', type: 'select', options: ['有', '无'], required: true },
  { id: 'trunk_14', name: '三角警示牌', type: 'select', options: ['有', '无'], required: true },
  { id: 'trunk_15', name: '拖车钩', type: 'select', options: ['有', '无'], required: true },
  { id: 'trunk_16', name: '防盗螺丝', type: 'select', options: ['有', '无'], required: true },
  { id: 'trunk_17', name: '急救包', type: 'select', options: ['有', '无'], required: false },
  { id: 'trunk_18', name: '后备箱止震板', type: 'select', options: ['正常', '破损', '更换'], required: true },
  { id: 'trunk_19', name: '后备箱底板', type: 'select', options: ['正常', '变形', '锈蚀'], required: true },
  { id: 'trunk_20', name: '左后翼子板导水槽', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'trunk_21', name: '左后翼子板内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_22', name: '左后翼子板骨架', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_23', name: '左D柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'trunk_24', name: '左D柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'trunk_25', name: '左D柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
];

// 13. 左后车身
export const leftRearBodyItems: InspectionItem[] = [
  { id: 'lr_body_1', name: '左后翼子板外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'lr_body_2', name: '左后轮内衬罩', type: 'select', options: ['正常', '破损', '更换'], required: true },
  { id: 'lr_body_3', name: '左后轮胎', type: 'select', options: ['正常', '磨损', '老化', '需更换'], required: true },
  { id: 'lr_body_4', name: '左后轮毂', type: 'select', options: ['正常', '划痕', '变形', '更换'], required: true },
  { id: 'lr_body_5', name: '左后减震器', type: 'select', options: ['正常', '渗油', '漏油', '需更换'], required: true },
  { id: 'lr_body_6', name: '左后门玻璃', type: 'select', options: ['正常', '划痕', '更换'], required: true },
  { id: 'lr_body_7', name: '左后门外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'lr_body_8', name: '左后门内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lr_body_9', name: '左后门内饰板（含胶体）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lr_body_10', name: '左后车门裙边饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lr_body_11', name: '左后车门裙边外侧', type: 'select', options: ['正常', '划痕', '变形', '修复'], required: true },
  { id: 'lr_body_12', name: '左后车门裙边内侧', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'lr_body_13', name: '左侧车厢底板及纵梁', type: 'select', options: ['正常', '变形', '锈蚀', '修复'], required: true },
  { id: 'lr_body_14', name: '左侧底边', type: 'select', options: ['正常', '划痕', '变形', '锈蚀'], required: true },
  { id: 'lr_body_15', name: '左C柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'lr_body_16', name: '左C柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lr_body_17', name: '左后车顶', type: 'select', options: ['原漆', '喷漆', '钣金'], required: true },
  { id: 'lr_body_18', name: '左后B柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'lr_body_19', name: '左B柱内侧（后部）', type: 'select', options: ['正常', '变形', '修复'], required: true },
];

// 14. 左后内饰
export const leftRearInteriorItems: InspectionItem[] = [
  { id: 'lr_int_1', name: '左后安全带', type: 'select', options: ['正常', '磨损', '更换'], required: true },
  { id: 'lr_int_2', name: '左后座椅区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lr_int_3', name: '左后座椅滑轨', type: 'select', options: ['正常', '锈蚀', '卡滞'], required: true },
  { id: 'lr_int_4', name: '左后地毯（含周边饰条、饰板）', type: 'select', options: ['正常', '污渍', '水渍', '更换'], required: true },
  { id: 'lr_int_5', name: '后排中控', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lr_int_6', name: '左B柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lr_int_7', name: '左后顶棚', type: 'select', options: ['正常', '污渍', '破损', '更换'], required: true },
  { id: 'lr_int_8', name: '左C柱内饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lr_int_9', name: '后置物板', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
];

// 15. 左前车身
export const leftFrontBodyItems: InspectionItem[] = [
  { id: 'lf_body_1', name: '左前翼子板外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'lf_body_2', name: '左前翼子板内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lf_body_3', name: '左前轮内罩', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lf_body_4', name: '左前轮胎', type: 'select', options: ['正常', '磨损', '老化', '需更换'], required: true },
  { id: 'lf_body_5', name: '左前轮毂', type: 'select', options: ['正常', '划痕', '变形', '更换'], required: true },
  { id: 'lf_body_6', name: '左前减震器', type: 'select', options: ['正常', '渗油', '漏油', '需更换'], required: true },
  { id: 'lf_body_7', name: '左后视镜', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
  { id: 'lf_body_8', name: '左前门玻璃', type: 'select', options: ['正常', '划痕', '更换'], required: true },
  { id: 'lf_body_9', name: '左前门外侧', type: 'select', options: ['原漆', '喷漆', '钣金', '更换'], required: true },
  { id: 'lf_body_10', name: '左前门内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lf_body_11', name: '左前门内饰（含胶条）', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lf_body_12', name: '左前车门裙边饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lf_body_13', name: '左前车门裙边外侧', type: 'select', options: ['正常', '划痕', '变形', '修复'], required: true },
  { id: 'lf_body_14', name: '左前车门裙边内侧', type: 'select', options: ['正常', '锈蚀', '变形'], required: true },
  { id: 'lf_body_15', name: '左A柱外侧', type: 'select', options: ['正常', '喷漆', '钣金', '切割'], required: true },
  { id: 'lf_body_16', name: '左A柱内侧', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lf_body_17', name: '左前车顶', type: 'select', options: ['原漆', '喷漆', '钣金'], required: true },
  { id: 'lf_body_18', name: '车顶骨架', type: 'select', options: ['正常', '变形', '修复'], required: true },
  { id: 'lf_body_19', name: '左B柱内侧（前部）', type: 'select', options: ['正常', '变形', '修复'], required: true },
];

// 16. 左前内饰
export const leftFrontInteriorItems: InspectionItem[] = [
  { id: 'lf_int_1', name: '主驾驶安全带', type: 'select', options: ['正常', '磨损', '更换'], required: true },
  { id: 'lf_int_2', name: '主驾驶座椅区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lf_int_3', name: '左前座椅滑轨', type: 'select', options: ['正常', '锈蚀', '卡滞'], required: true },
  { id: 'lf_int_4', name: '左前地毯（含周边饰条、饰板）', type: 'select', options: ['正常', '污渍', '水渍', '更换'], required: true },
  { id: 'lf_int_5', name: '转向柱', type: 'select', options: ['正常', '锈蚀', '变形', '更换'], required: true },
  { id: 'lf_int_6', name: '踏板', type: 'select', options: ['正常', '磨损', '更换'], required: true },
  { id: 'lf_int_7', name: '前排点烟器座', type: 'select', options: ['正常', '损坏', '更换'], required: true },
  { id: 'lf_int_8', name: '驾驶室内保险盒', type: 'select', options: ['正常', '进水', '更换'], required: true },
  { id: 'lf_int_9', name: '方向盘', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lf_int_10', name: '仪表盘', type: 'select', options: ['正常', '划痕', '损坏', '更换'], required: true },
  { id: 'lf_int_11', name: '主驾驶仪表台', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lf_int_12', name: '中控区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lf_int_13', name: '中央扶手区域', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
  { id: 'lf_int_14', name: '左A柱饰板', type: 'select', options: ['正常', '划痕', '破损', '更换'], required: true },
  { id: 'lf_int_15', name: '左前顶棚（含遮阳板）', type: 'select', options: ['正常', '污渍', '破损', '更换'], required: true },
  { id: 'lf_int_16', name: '天窗饰板', type: 'select', options: ['正常', '磨损', '破损', '更换'], required: true },
];

// 17. 火烧涉水检查
export const fireFloodItems: InspectionItem[] = [
  { id: 'fire_1', name: '火烧检查', type: 'select', options: ['无火烧痕迹', '疑似火烧', '确认火烧'], required: true },
  { id: 'fire_2', name: '火烧检查说明', type: 'text', required: false, placeholder: '如有火烧痕迹请详细描述' },
  { id: 'flood_1', name: '涉水检查', type: 'select', options: ['无涉水痕迹', '轻微涉水', '严重涉水'], required: true },
  { id: 'flood_2', name: '涉水检查说明', type: 'text', required: false, placeholder: '如有涉水痕迹请详细描述' },
  { id: 'fire_flood_photos', name: '火烧涉水检查照片', type: 'photo', required: true },
];

// 18. 工况视频拍摄
export const videoItems: InspectionItem[] = [
  { id: 'video_1', name: '整车外观视频', type: 'photo', required: true, description: '拍摄整车外观360度视频' },
  { id: 'video_2', name: '尾气工况视频', type: 'photo', required: true, description: '拍摄尾气排放情况' },
  { id: 'video_3', name: '发动机工况视频', type: 'photo', required: true, description: '拍摄发动机运转情况' },
];

// 所有检测类别
export const inspectionCategories = [
  { id: 'document', name: '证件手续', items: documentItems },
  { id: 'vehicleInfo', name: '车型信息', items: vehicleInfoItems },
  { id: 'mainPhoto', name: '车身主图', items: mainPhotoItems },
  { id: 'mechanical', name: '机电检查', items: mechanicalItems },
  { id: 'front', name: '车头', items: frontItems },
  { id: 'engine', name: '发动机舱', items: engineItems },
  { id: 'rightFrontBody', name: '右前车身', items: rightFrontBodyItems },
  { id: 'rightFrontInterior', name: '右前内饰', items: rightFrontInteriorItems },
  { id: 'rightRearBody', name: '右后车身', items: rightRearBodyItems },
  { id: 'rightRearInterior', name: '右后内饰', items: rightRearInteriorItems },
  { id: 'rear', name: '车尾', items: rearItems },
  { id: 'trunk', name: '后备箱内部', items: trunkItems },
  { id: 'leftRearBody', name: '左后车身', items: leftRearBodyItems },
  { id: 'leftRearInterior', name: '左后内饰', items: leftRearInteriorItems },
  { id: 'leftFrontBody', name: '左前车身', items: leftFrontBodyItems },
  { id: 'leftFrontInterior', name: '左前内饰', items: leftFrontInteriorItems },
  { id: 'fireFlood', name: '火烧涉水检查', items: fireFloodItems },
  { id: 'video', name: '工况视频拍摄', items: videoItems },
];

export const totalInspectionItems = inspectionCategories.reduce(
  (sum, cat) => sum + cat.items.length, 
  0
);
