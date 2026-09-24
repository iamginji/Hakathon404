import React, { useState } from 'react';
import { 
  Award, 
  FileSignature, 
  Building2, 
  AlertOctagon, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowUpRight, 
  FileDown, 
  PlusCircle, 
  KeyRound, 
  Database,
  Radio
} from 'lucide-react';
import { BatchItem, EnterpriseVerification } from '../types';

interface DashboardViewProps {
  batches: BatchItem[];
  verifications: EnterpriseVerification[];
  onNavigateToSigning: (batchId?: string) => void;
  onNavigateToBatches: () => void;
  onNavigateToLedger: () => void;
  onOpenNewBatchModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  batches,
  verifications,
  onNavigateToSigning,
  onNavigateToBatches,
  onNavigateToLedger,
  onOpenNewBatchModal,
}) => {
  const [copiedContract, setCopiedContract] = useState(false);
  const [chartViewMode, setChartViewMode] = useState<'year' | 'quarter' | 'cohort'>('year');

  const copyContract = () => {
    navigator.clipboard.writeText('0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1F8');
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const pendingBatches = batches.filter(b => b.status === 'awaiting_signing');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Status Strip */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pt-1 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-700 text-[12px] font-bold uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>CỔNG QUẢN TRỊ HỌC VỤ & BLOCKCHAIN REGISTRY</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-[11px] normal-case">
              Chuẩn Nghị định 130/2018/NĐ-CP
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tổng quan Cấp phát Văn bằng & Chứng chỉ
          </h1>
          <p className="text-[13px] text-slate-600 flex items-center gap-2">
            <span>Niên giám học vụ: <strong className="text-slate-800">Học kỳ II — Năm học 2025-2026</strong></span>
            <span className="text-slate-300">·</span>
            <span>Cập nhật tự động theo thời gian thực</span>
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNavigateToLedger}
            className="h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all"
          >
            <Database className="w-4 h-4 text-slate-500" />
            <span>Tra cứu On-chain</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<BaoCaoBoGDDT Nam="2026">\n  <DonVi>Đại học Xây dựng Hà Nội</DonVi>\n  <TongCap>14820</TongCap>\n  <MerkleRoot>0x8f2a...41e8</MerkleRoot>\n</BaoCaoBoGDDT>`;
              const blob = new Blob([xmlContent], { type: 'application/xml' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'BaoCao_BoGDDT_HUCE_2026.xml';
              a.click();
            }}
            className="h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all"
          >
            <FileDown className="w-4 h-4 text-blue-600" />
            <span>Xuất Báo cáo Bộ GD&ĐT (.XML)</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewBatchModal}
            className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] flex items-center gap-2 shadow-sm shadow-blue-500/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Tạo đợt cấp mới</span>
          </button>
        </div>
      </div>

      {/* Network Health & Contract Realtime Strip */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-wrap text-[13px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-900">Node Synced Block:</span>
            <span className="font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
              #19,842,390
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-medium text-slate-500">Gas Fee:</span>
            <span className="font-mono font-bold text-slate-900">14 Gwei (Fast)</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-500">Issuer Contract:</span>
            <span className="font-mono font-bold text-blue-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              0x93b4...1F82
            </span>
            <button
              onClick={copyContract}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Sao chép địa chỉ smart contract"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            {copiedContract && (
              <span className="text-[11px] text-emerald-600 font-semibold font-mono">Đã sao chép</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md text-[12px] font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>HSM Cloud Key Management Active</span>
        </div>
      </div>

      {/* 4 Core Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Card 1: Total Issued */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Tổng văn bằng đã phát hành on-chain
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  14,820
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <TrendingUp className="w-3 h-3" /> +12%
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-1">So với cùng kỳ năm học trước</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span className="text-blue-700 font-semibold">ERC-721 Tokenized</span>
            <span className="text-emerald-600 font-semibold">100% Đạt chuẩn</span>
          </div>
        </div>

        {/* Card 2: Pending Signatures */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Hồ sơ đang chờ ký số & mint
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-blue-900 tracking-tight font-mono">
                  485
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Cần xử lý
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-1">Từ 2 đợt tốt nghiệp tháng 06/2026</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 group-hover:scale-105 transition-transform">
              <FileSignature className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
            <span className="text-amber-800 font-semibold">Chờ duyệt HSM</span>
            <button 
              onClick={() => onNavigateToSigning()}
              className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
            >
              Xem chi tiết →
            </button>
          </div>
        </div>

        {/* Card 3: Verifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Lượt tra cứu & xác thực
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  68,240
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <TrendingUp className="w-3 h-3" /> +28.4%
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-1">Từ các doanh nghiệp & tổ chức</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span className="text-emerald-700 font-semibold">Tỷ lệ hợp lệ 99.4%</span>
            <span className="text-slate-500 font-mono">API: 42k req</span>
          </div>
        </div>

        {/* Card 4: Revocations */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Văn bằng đã thu hồi / chỉnh sửa
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-rose-600 tracking-tight font-mono">
                  18
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  0.12%
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-1">Được ghi nhận log bất biến on-chain</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
            <span className="text-slate-600 font-semibold">Kháng nghị hoàn tất</span>
            <span className="text-rose-600 font-semibold font-mono">Revoke Event Logged</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Progress Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Tiến độ Cấp bằng qua các Niên khóa (2023 – 2026)
              </h2>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Thống kê theo 4 khoa trọng điểm qua từng năm học
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
              <button
                type="button"
                onClick={() => setChartViewMode('year')}
                className={`px-3 py-1 rounded text-[12px] font-bold transition-all ${
                  chartViewMode === 'year'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Theo Năm
              </button>
              <button
                type="button"
                onClick={() => setChartViewMode('quarter')}
                className={`px-3 py-1 rounded text-[12px] font-bold transition-all ${
                  chartViewMode === 'quarter'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Theo Quý
              </button>
              <button
                type="button"
                onClick={() => setChartViewMode('cohort')}
                className={`px-3 py-1 rounded text-[12px] font-bold transition-all ${
                  chartViewMode === 'cohort'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Theo Đợt
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                +15.2% Tăng trưởng tổng thể
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-600"></span> CNTT
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-sky-500"></span> Kinh tế
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-cyan-400"></span> Ngoại ngữ
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-200"></span> Kỹ thuật
                </span>
              </div>
            </div>

            {/* High-Contrast Interactive Visual SVG Bar Graph */}
            <div className="w-full h-60 pt-4">
              <svg className="w-full h-full" viewBox="0 0 720 220" fill="none">
                {/* Horizontal Guide lines */}
                <line x1="40" y1="20" x2="700" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="70" x2="700" y2="70" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="120" x2="700" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="170" x2="700" y2="170" stroke="#E2E8F0" strokeWidth="1" />

                {/* Y-axis Labels */}
                <text x="30" y="24" textAnchor="end" fontSize="11" fill="#94A3B8" fontFamily="JetBrains Mono">8k</text>
                <text x="30" y="74" textAnchor="end" fontSize="11" fill="#94A3B8" fontFamily="JetBrains Mono">6k</text>
                <text x="30" y="124" textAnchor="end" fontSize="11" fill="#94A3B8" fontFamily="JetBrains Mono">4k</text>
                <text x="30" y="174" textAnchor="end" fontSize="11" fill="#94A3B8" fontFamily="JetBrains Mono">0</text>

                {/* Column 1: CNTT */}
                <g className="cursor-pointer group">
                  <rect x="100" y="45" width="60" height="125" rx="4" fill="#2563EB" />
                  <text x="130" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E40AF" fontFamily="JetBrains Mono">6,224</text>
                  <text x="130" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">CNTT</text>
                  <text x="130" y="208" textAnchor="middle" fontSize="10" fill="#64748B">42.0%</text>
                </g>

                {/* Column 2: Kinh tế */}
                <g className="cursor-pointer group">
                  <rect x="260" y="75" width="60" height="95" rx="4" fill="#0284C7" />
                  <text x="290" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1" fontFamily="JetBrains Mono">4,446</text>
                  <text x="290" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">Kinh tế</text>
                  <text x="290" y="208" textAnchor="middle" fontSize="10" fill="#64748B">30.0%</text>
                </g>

                {/* Column 3: Ngoại ngữ */}
                <g className="cursor-pointer group">
                  <rect x="420" y="115" width="60" height="55" rx="4" fill="#06B6D4" />
                  <text x="450" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0891B2" fontFamily="JetBrains Mono">2,371</text>
                  <text x="450" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">Ngoại ngữ</text>
                  <text x="450" y="208" textAnchor="middle" fontSize="10" fill="#64748B">16.0%</text>
                </g>

                {/* Column 4: Kỹ thuật */}
                <g className="cursor-pointer group">
                  <rect x="580" y="130" width="60" height="40" rx="4" fill="#93C5FD" />
                  <text x="610" y="123" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563EB" fontFamily="JetBrains Mono">1,779</text>
                  <text x="610" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">Kỹ thuật</text>
                  <text x="610" y="208" textAnchor="middle" fontSize="10" fill="#64748B">12.0%</text>
                </g>
              </svg>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span className="font-medium">Tổng cộng phân bổ: <strong>14,820</strong> văn bằng</span>
              <span className="text-blue-600 font-medium">Bảo chứng bằng Merkle Hash</span>
            </div>
          </div>
        </div>

        {/* Credential Breakdown Donut & Structure (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[17px] font-bold text-slate-900">Cơ cấu Loại Văn bằng</h2>
                <p className="text-[12px] text-slate-500 mt-0.5">Phân bổ hệ đào tạo trong niên khóa 2026</p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                100% On-chain
              </span>
            </div>

            {/* Donut Graphic Visual */}
            <div className="flex items-center justify-center my-6 relative">
              <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F1F5F9" strokeWidth="12" />
                {/* Bằng Cử nhân: 48% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#1D4ED8"
                  strokeWidth="12"
                  strokeDasharray="114.6 238.7"
                  strokeDashoffset="0"
                />
                {/* Bằng Kỹ sư: 42% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#0284C7"
                  strokeWidth="12"
                  strokeDasharray="100.2 238.7"
                  strokeDashoffset="-114.6"
                />
                {/* Thạc sĩ: 8% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#06B6D4"
                  strokeWidth="12"
                  strokeDasharray="19.1 238.7"
                  strokeDashoffset="-214.8"
                />
                {/* Tiến sĩ: 2% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="12"
                  strokeDasharray="4.8 238.7"
                  strokeDashoffset="-233.9"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">14.8k</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng cấp</span>
              </div>
            </div>

            {/* Metrics Legend List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
                  <span className="text-slate-800 font-semibold">Bằng Cử nhân</span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  48% <span className="text-slate-400 font-normal">(7,113)</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                  <span className="text-slate-800 font-semibold">Bằng Kỹ sư</span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  42% <span className="text-slate-400 font-normal">(6,224)</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                  <span className="text-slate-800 font-semibold">Thạc sĩ chuyên ngành</span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  8% <span className="text-slate-400 font-normal">(1,185)</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-800 font-semibold">Tiến sĩ nghiên cứu</span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  2% <span className="text-slate-400 font-normal">(298)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Chuẩn Metadata W3C Verifiable Credentials</span>
            <span className="font-mono">NFT Format: ERC-5484</span>
          </div>
        </div>
      </div>

      {/* Operational Focus: Batches Pending Signature & Enterprise Verification Stream */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Batches Awaiting Principal Signature (5 Cols) */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <h2 className="text-[17px] font-bold text-slate-900">Đợt Cấp Chờ Hiệu Trưởng Ký Duyệt</h2>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                2 Đợt ưu tiên
              </span>
            </div>

            <p className="text-[13px] text-slate-500 mb-4">
              Các đợt cấp đã hoàn tất kiểm tra chéo học vụ, chờ kích hoạt chữ ký số Cloud HSM của Ban Giám hiệu để ghi sổ on-chain.
            </p>

            <div className="space-y-3">
              {pendingBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 transition-all flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-slate-900">{batch.name}</span>
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-200 text-slate-700 rounded">
                          {batch.code}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-500 mt-0.5">{batch.department}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-800 rounded-md shrink-0">
                      {batch.totalStudents} Bằng
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[12px]">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Đã kiểm tra chéo: Hôm nay 09:15</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateToSigning(batch.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[12px] flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Xem & Ký ngay</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Ký số xác thực bởi USB Token / Cloud HSM
            </span>
            <button
              onClick={onNavigateToBatches}
              className="text-blue-600 font-semibold hover:underline"
            >
              Quản lý tất cả đợt →
            </button>
          </div>
        </div>

        {/* Right: Realtime Enterprise Verification Feed (7 Cols) */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <div>
                  <h2 className="text-[17px] font-bold text-slate-900">
                    Lượt Xác Minh Gần Nhất từ Doanh Nghiệp Đối Tác
                  </h2>
                  <p className="text-[12px] text-slate-500 mt-0.5">
                    Hệ thống xác thực tính toàn vẹn văn bằng tự động qua cổng API Webhook
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-500 animate-pulse" /> Real-time Webhook
              </span>
            </div>

            {/* High-Density Verification Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3.5">Tổ chức tra cứu</th>
                    <th className="py-2.5 px-3.5">Sinh viên / Mã bằng</th>
                    <th className="py-2.5 px-3.5">Thời gian</th>
                    <th className="py-2.5 px-3.5">Trạng thái</th>
                    <th className="py-2.5 px-3.5 text-right">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {verifications.map((ver) => (
                    <tr key={ver.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 font-extrabold text-[11px] flex items-center justify-center shrink-0 border border-blue-200">
                            {ver.avatarText}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">
                              {ver.enterpriseName}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[150px]">
                              {ver.enterpriseUnit}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5">
                        <div>
                          <span className="font-semibold text-slate-900 block">
                            {ver.studentName} <span className="font-mono text-slate-500 text-[11px]">({ver.studentId})</span>
                          </span>
                          <span className="font-mono text-[11px] text-blue-600 block mt-0.5">
                            Hash: {ver.hash}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 text-[12px]">
                        {ver.timestamp}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Hợp lệ
                        </span>
                      </td>

                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={onNavigateToLedger}
                          className="text-blue-600 hover:text-blue-800 text-[12px] font-semibold hover:underline"
                        >
                          Xem chứng chỉ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
            <span>Tất cả dữ liệu tra cứu được ghi nhận tự động vào Audit Log</span>
            <button
              onClick={onNavigateToLedger}
              className="text-blue-600 font-semibold hover:underline"
            >
              Xem toàn bộ lịch sử tra cứu →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Compliance & Technological Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0 border border-blue-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[14px] text-slate-900">Chuẩn Dữ Liệu W3C Verifiable Credentials</h3>
            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
              Tương thích định dạng W3C VC 2.0 và OpenCerts, hỗ trợ xác minh tức thì trên toàn cầu không cần trung gian.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 border border-indigo-100">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[14px] text-slate-900">Bảo Mật Cấp Viện Cloud HSM FIPS 140-2</h3>
            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
              Khóa riêng của Cơ sở Đào tạo được lưu trữ an toàn trong module phần cứng bảo mật chuyên dụng, ngăn ngừa giả mạo.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-lg shrink-0 border border-cyan-100">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[14px] text-slate-900">Đồng Bộ CSDL Bộ Giáo Dục & Đào Tạo</h3>
            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
              Sổ cái cấp bằng tự động cập nhật và đối soát định kỳ với Hệ thống thông tin Quản lý Văn bằng Quốc gia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
