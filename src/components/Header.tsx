import React, { useState } from 'react';
import { 
  Search, 
  Wallet, 
  Bell, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Download,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { StudentCertificate } from '../types';

interface HeaderProps {
  onSearchSelect?: (student: StudentCertificate) => void;
  students: StudentCertificate[];
  onOpenFigmaModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearchSelect, 
  students,
  onOpenFigmaModal 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const searchResults = searchQuery.trim() === '' ? [] : students.filter(s => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.idNumber.includes(searchQuery) ||
    s.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyWallet = () => {
    navigator.clipboard.writeText('0x72A4b91f0c2a4e8d7c10b2a3c4d5e6f7a85C91');
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 fixed top-0 left-[260px] right-0 z-20 px-8 flex items-center justify-between gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Search Input Zone */}
      <div className="relative flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
            placeholder="Tra cứu nhanh sinh viên, CCCD, mã số bằng (VD: 64XDDN, UC-2026)..."
            className="w-full h-10 pl-10 pr-4 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Live Search Popup */}
        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-12 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Kết quả tìm kiếm ({searchResults.length})</span>
              <span>Bảo chứng Merkle Tree</span>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {searchResults.map((std) => (
                <div
                  key={std.id}
                  onClick={() => {
                    if (onSearchSelect) onSearchSelect(std);
                    setSearchQuery('');
                  }}
                  className="p-3 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px] text-slate-900">{std.fullName}</span>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 text-[10px] font-mono rounded">
                        {std.studentId}
                      </span>
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">
                      {std.degreeType} · {std.major} · Xếp loại {std.classification}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 block">
                      {std.serialNumber}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium mt-1 inline-flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Khớp SHA-256
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls Zone */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Figma Design System Button (Addresses user's specific request) */}
        <button
          onClick={onOpenFigmaModal}
          type="button"
          className="h-9 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
          title="Chuyển sang Figma & xem bộ Design Tokens"
        >
          {/* Custom Figma-style icon */}
          <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform"></span>
          <span className="whitespace-nowrap font-medium">Xuất sang Figma</span>
        </button>

        {/* Network Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-900">Sepolia Testnet</span>
          <span className="text-slate-400 font-mono text-[11px]">#19,842,390</span>
        </div>

        {/* Admin Wallet Chip */}
        <button
          onClick={copyWallet}
          type="button"
          className="hidden xl:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 px-3 py-1.5 rounded-lg text-[12px] font-mono text-slate-700 transition-colors"
          title="Bấm để sao chép địa chỉ ví quản trị"
        >
          <Wallet className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium">0x72A4...5C91</span>
          <span className="text-slate-400 text-[11px]">(1.84 ETH)</span>
          {copiedHash && (
            <span className="text-[10px] text-emerald-600 font-sans font-bold">Đã chép!</span>
          )}
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Thông báo hệ thống"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[13px] font-bold text-slate-900 leading-tight">
              TS. Lê Hoàng Nam
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              Trưởng phòng Đào tạo
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-cyan-500 text-white flex items-center justify-center font-bold text-[13px] shadow-sm select-none">
            LN
          </div>
        </div>
      </div>
    </header>
  );
};
