import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  FileCheck2, 
  FileX2, 
  Database, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { NavTab } from '../types';
import { Logo } from './Logo';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingSignCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, pendingSignCount }) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Tổng quan & Chỉ số',
      icon: LayoutDashboard,
    },
    {
      id: 'batches',
      label: 'Đợt cấp & Nhập liệu',
      icon: FileSpreadsheet,
    },
    {
      id: 'signing',
      label: 'Ký số & On-chain',
      icon: FileCheck2,
      badge: pendingSignCount,
    },
    {
      id: 'revocations',
      label: 'Quản lý thu hồi',
      icon: FileX2,
    },
    {
      id: 'ledger',
      label: 'Sổ cái & Tra cứu',
      icon: Database,
    },
    {
      id: 'contract',
      label: 'Cấu hình Smart Contract',
      icon: Cpu,
    },
  ];

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none fixed left-0 top-0 z-30 shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
      {/* Top Brand Section */}
      <div className="flex flex-col">
        <div className="h-16 px-5 flex items-center border-b border-slate-100 bg-white">
          <Logo size={34} />
        </div>

        {/* Navigation Category Label */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Phân hệ Nghiệp vụ
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                type="button"
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all text-left group whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-[11px] font-bold rounded-full tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Institution Info Card at Bottom */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Cơ sở Đào tạo
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified
          </span>
        </div>

        <div className="text-[13px] font-bold text-slate-900 leading-tight">
          Trường ĐH Xây Dựng Hà Nội
        </div>

        <div className="space-y-1 pt-1 border-t border-slate-200/60 text-[11px] font-mono">
          <div className="flex items-center justify-between text-slate-500">
            <span>Mã định danh:</span>
            <span className="font-semibold text-slate-800">HUCE-VN</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Contract:</span>
            <span className="font-semibold text-blue-700 truncate max-w-[100px]" title="0x98A13c8f8d9a2eC24">
              0x98A1...eC24
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
