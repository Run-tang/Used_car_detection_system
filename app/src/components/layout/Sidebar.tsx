import { NavLink } from 'react-router-dom';
import {
  ClipboardList,
  FileCheck,
  FileText,
  Users,
  LogOut,
  Car,
  LayoutList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mock';
// interface NavItem removed
// navItems removed

export default function Sidebar() {
  // location and filteredNavItems removed

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">车易检</h1>
          <p className="text-xs text-slate-400">二手车检测系统</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {/* Inspection Management Group */}
        <div className="mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          检测管理
        </div>
        <ul className="space-y-1 mb-6">
          <li>
            <NavLink
              to="/work-orders"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <ClipboardList className="w-5 h-5 mr-3" />
              检测工单管理
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/audit"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <FileCheck className="w-5 h-5 mr-3" />
              检测结果审核
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <FileText className="w-5 h-5 mr-3" />
              检测报告管理
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inspection-templates"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <LayoutList className="w-5 h-5 mr-3" />
              检测模板管理
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inspectors"
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Users className="w-5 h-5 mr-3" />
              检测师管理
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full bg-slate-700"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400 truncate">
              {currentUser.role === 'admin' && '管理员'}
              {currentUser.role === 'dispatcher' && '调度员'}
              {currentUser.role === 'auditor' && '审核员'}
              {currentUser.role === 'inspector' && '检测师'}
              {currentUser.role === 'customer_service' && '客服'}
            </p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </button>
      </div>
    </aside>
  );
}
