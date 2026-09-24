import React, { useState } from 'react';
import { 
  Search, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  QrCode, 
  FileText, 
  Clock, 
  Award,
  Hash,
  Share2,
  Printer
} from 'lucide-react';
import { StudentCertificate } from '../types';

interface LedgerLookupViewProps {
  students: StudentCertificate[];
  initialSearch?: string;
}

export const LedgerLookupView: React.FC<LedgerLookupViewProps> = ({ 
  students, 
  initialSearch = '' 
}) => {
  const [query, setQuery] = useState(initialSearch || '64XDDN-8801');
  const [selectedResult, setSelectedResult] = useState<StudentCertificate | null>(
    students[0] || null
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      const found = students.find(s => 
        s.studentId.toLowerCase().includes(query.toLowerCase()) ||
        s.serialNumber.toLowerCase().includes(query.toLowerCase()) ||
        s.idNumber.includes(query) ||
        s.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedResult(found || null);
      setIsVerifying(false);
    }, 400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="pt-1">
        <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>ON-CHAIN VERIFIER · EDUCHAIN PUBLIC REGISTRY LEDGER</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Sổ cái Công khai & Cổng Tra cứu Xác thực
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">
          Bất kỳ cá nhân hoặc doanh nghiệp nào cũng có thể kiểm chứng tính toàn vẹn và nguồn gốc hợp pháp của văn bằng trực tiếp trên blockchain.
        </p>
      </div>

      {/* Main Search Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          <label className="text-sm font-bold text-slate-800 block">
            Nhập Mã số sinh viên (MSSV), Số hiệu bằng hoặc Số CCCD:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="VD: 64XDDN-8801, UC-2026-08801, 001202014892..."
                className="w-full h-11 pl-10 pr-4 text-[13px] font-mono bg-slate-50 focus:bg-white border border-slate-300 focus:border-blue-600 rounded-lg focus:outline-none transition-all uppercase"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] rounded-lg shadow-sm transition-all shrink-0 cursor-pointer"
            >
              {isVerifying ? 'Đang đối soát...' : 'Kiểm tra On-Chain'}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-400">
            <span>Gợi ý mẫu:</span>
            <button onClick={() => { setQuery('64XDDN-8801'); }} className="text-blue-600 hover:underline font-mono">
              64XDDN-8801
            </button>
            <button onClick={() => { setQuery('64XDDN-8802'); }} className="text-blue-600 hover:underline font-mono">
              64XDDN-8802
            </button>
            <button onClick={() => { setQuery('UC-2025-000148'); }} className="text-rose-600 hover:underline font-mono">
              UC-2025-000148 (Thu hồi)
            </button>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {selectedResult && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 animate-in fade-in">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                selectedResult.onChainStatus === 'revoked' ? 'bg-rose-600' : 'bg-emerald-600'
              }`}>
                {selectedResult.onChainStatus === 'revoked' ? (
                  <FileText className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedResult.fullName}
                  </h3>
                  {selectedResult.onChainStatus === 'revoked' ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      VĂN BẰNG ĐÃ THU HỒI
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      HỢP LỆ VÀ BẤT BIẾN ON-CHAIN
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-slate-500 font-mono mt-0.5">
                  MSSV: {selectedResult.studentId} · CCCD: {selectedResult.idNumber} · Số hiệu: {selectedResult.serialNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In xác nhận</span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(window.location.href)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ link</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[13px]">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Trường đào tạo</span>
              <span className="font-bold text-slate-900 block mt-1">ĐH Xây Dựng Hà Nội</span>
              <span className="text-[11px] text-slate-500">{selectedResult.department}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Văn bằng & Ngành</span>
              <span className="font-bold text-blue-700 block mt-1">{selectedResult.degreeType}</span>
              <span className="text-[11px] text-slate-500 truncate block">{selectedResult.major}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Xếp loại & GPA</span>
              <span className="font-bold text-emerald-700 block mt-1">{selectedResult.classification}</span>
              <span className="text-[11px] text-slate-500 font-mono">Điểm tích lũy: {selectedResult.gpa}/4.0</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quyết định cấp bằng</span>
              <span className="font-bold text-slate-900 block mt-1">{selectedResult.decisionNumber}</span>
              <span className="text-[11px] text-slate-500 font-mono">Ngày cấp: {selectedResult.issueDate}</span>
            </div>
          </div>

          {/* Cryptographic Proof Terminal Plate */}
          <div className="rounded-xl bg-slate-900 text-slate-200 p-5 font-mono text-[12px] space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">Bằng Chứng Mật Mã Học (Cryptographic Proof)</span>
              </div>
              <span className="text-emerald-400 text-[11px]">Consensus Verified ✓</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">SHA-256 Certificate Hash (Lá dữ liệu Merkle):</span>
                <span className="text-cyan-300 font-bold break-all">{selectedResult.sha256Hash}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Issuer Smart Contract (HUCE Registry):</span>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 break-all">0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1F8</span>
                  <button
                    onClick={() => copyToClipboard('0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1F8')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 block">Mạng Blockchain:</span>
                  <span className="text-white font-semibold">Sepolia Ethereum</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Block Height:</span>
                  <span className="text-white font-semibold">#19,842,390</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tiêu chuẩn Token:</span>
                  <span className="text-emerald-400 font-semibold">ERC-721 Soulbound (SBT)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
