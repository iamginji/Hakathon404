import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  KeyRound, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Lock, 
  Send, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';
import { BatchItem, StudentCertificate } from '../types';

interface SigningViewProps {
  batches: BatchItem[];
  selectedBatchId?: string;
  students: StudentCertificate[];
  onBatchMinted: (batchId: string) => void;
}

export const SigningView: React.FC<SigningViewProps> = ({
  batches,
  selectedBatchId,
  students,
  onBatchMinted,
}) => {
  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [studentSearch, setStudentSearch] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [hsmPin, setHsmPin] = useState('889922');
  const [showSignModal, setShowSignModal] = useState(false);
  const [signingStep, setSigningStep] = useState<'idle' | 'auth_hsm' | 'generating_proofs' | 'broadcasting' | 'completed'>('idle');
  const [txReceipt, setTxReceipt] = useState<string | null>(null);

  const batchStudents = students.filter(s => s.batchId === activeBatch.id || s.batchId === 'batch-01');
  const displayedStudents = batchStudents.filter(s => 
    s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.serialNumber.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const currentStudent = displayedStudents[selectedStudentIndex] || batchStudents[0] || students[0];

  const handleExecuteSigning = () => {
    setSigningStep('auth_hsm');
    setTimeout(() => {
      setSigningStep('generating_proofs');
      setTimeout(() => {
        setSigningStep('broadcasting');
        setTimeout(() => {
          setSigningStep('completed');
          const mockTx = '0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1f8';
          setTxReceipt(mockTx);
          onBatchMinted(activeBatch.id);
        }, 1500);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>PHÂN HỆ BẢO CHỨNG MẬT MÃ HỌC · DUAL-SIGN PKI · FIPS 140-2 LEVEL 3</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Ký số Điện tử & Phát hành Lên Sổ Blockchain
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Hệ thống ký duyệt song trùng số HSM/PKI và mint văn bằng trực tiếp lên Smart Contract Sepolia.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
          <span>Sepolia Node #4</span>
          <span className="text-slate-300">·</span>
          <span>Block #6819204</span>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-600 font-bold">Est. Gas: ~0.042 ETH</span>
        </div>
      </div>

      {/* Signing Metadata & Dual-PKI Authorization Bento Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Batch Specifications (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Đợt xét tốt nghiệp chỉ định
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {activeBatch.name}
              </h2>
              <p className="text-[12px] text-slate-500 mt-0.5">{activeBatch.department}</p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[12px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              {activeBatch.totalStudents} Tân Kỹ sư
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 block">Mã Merkle Root Hash</span>
              <span className="font-mono text-[12px] font-bold text-blue-700 block truncate mt-1">
                {activeBatch.merkleRoot}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {activeBatch.totalStudents} lá dữ liệu · SHA-256 binary tree
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 block">Smart Contract Đích</span>
              <span className="font-mono text-[12px] font-bold text-slate-800 block truncate mt-1">
                0x93b4f9...1F82
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                UniChainDegreeV2.sol (ERC-721 Soulbound)
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-slate-700">Ví quản trị viên phát hành:</span>
              <span className="font-mono font-bold text-blue-800">0x72A4...5C91 (Số dư: 1.840 ETH)</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đủ hạn mức Gas
            </span>
          </div>
        </div>

        {/* Right: Dual-Sign PKI Progress Plate (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-[15px] text-slate-900">Ký số Pháp lý Đa cấp (Dual-PKI)</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                1 / 2 Hoàn tất
              </span>
            </div>

            <p className="text-[12px] text-slate-500 mb-4">
              Ghi vĩnh viễn Merkle Root vào Smart Contract. Dữ liệu bất biến sau khi kích hoạt.
            </p>

            <div className="space-y-3">
              {/* Level 1: Dean */}
              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                      Cấp 1: Trưởng phòng Đào tạo
                    </span>
                    <span className="text-[11px] text-slate-500">
                      TS. Lê Hoàng Nam · Viettel-CA USB Token
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  HỢP LỆ
                </span>
              </div>

              {/* Level 2: Principal Cloud HSM */}
              <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                      Cấp 2: Hiệu trưởng Nhà trường
                    </span>
                    <span className="text-[11px] text-slate-500">
                      PGS.TS. Hoàng Tùng · Cloud HSM FIPS 140-2 L3
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  CHỜ KÝ DUYỆT
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Chứng thư số hợp chuẩn NĐ 130/2018</span>
            <span className="font-mono text-emerald-700 font-semibold">Verified Root CA</span>
          </div>
        </div>
      </div>

      {/* Workspace: Certificate Preview Plate & Recipient Checklist */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Certificate Preview Plate (7 Cols) */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15px] text-slate-900">
                Bản Thể Hiện Chứng Nhận Tốt Nghiệp Điện Tử
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                ({selectedStudentIndex + 1} / {displayedStudents.length})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={selectedStudentIndex === 0}
                onClick={() => setSelectedStudentIndex(prev => Math.max(0, prev - 1))}
                className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Bằng trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={selectedStudentIndex === displayedStudents.length - 1}
                onClick={() => setSelectedStudentIndex(prev => Math.min(displayedStudents.length - 1, prev + 1))}
                className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Bằng tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 ml-1"
                title="Tải bản in PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-Fidelity Official Vietnamese Diploma Plate (Matching Image 7) */}
          <div className="border-2 border-slate-200 bg-[#FCFDFE] p-8 rounded-xl shadow-inner relative overflow-hidden text-center space-y-4">
            {/* Background Seal Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-96 h-96 text-slate-900" />
            </div>

            {/* Institution Banner */}
            <div className="border-b border-slate-200 pb-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                CƠ SỞ ĐÀO TẠO CẤP VĂN BẰNG
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                TRƯỜNG ĐẠI HỌC XÂY DỰNG HÀ NỘI
              </h2>
              <p className="text-[12px] text-slate-600 font-medium">
                {currentStudent.department}
              </p>
            </div>

            {/* Credential Title */}
            <div className="py-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
                CHỨNG NHẬN CẤP VĂN BẰNG CHÍNH QUY
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-wider font-sans mt-1">
                {currentStudent.degreeType}
              </h3>
              <p className="text-[12px] font-mono font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                DIPLOMA OF ENGINEERING
              </p>
            </div>

            {/* Recipient Full Name */}
            <div className="py-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                CÔNG NHẬN TÂN KỸ SƯ
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-wide uppercase mt-1">
                {currentStudent.fullName}
              </div>
            </div>

            {/* Degree Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-200/80 text-left text-[12px]">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ngành học</span>
                <span className="font-semibold text-slate-800 block truncate" title={currentStudent.major}>
                  {currentStudent.major}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Xếp loại</span>
                <span className="font-bold text-emerald-700 block">
                  {currentStudent.classification} ({currentStudent.gpa}/4.0)
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Số hiệu bằng</span>
                <span className="font-mono font-bold text-slate-900 block truncate">
                  {currentStudent.serialNumber}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Số vào sổ</span>
                <span className="font-mono font-medium text-slate-700 block truncate">
                  {currentStudent.registryBookNumber}
                </span>
              </div>
            </div>

            {/* Footer QR & Signature Verification Zone */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div>
                <span className="text-[11px] text-slate-500 block">
                  Ngày cấp bằng: <strong className="text-slate-800">{currentStudent.issueDate}</strong>
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Quyết định tốt nghiệp: <strong className="text-slate-800">{currentStudent.decisionNumber}</strong>
                </span>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    Trạng thái: Sẵn sàng phát hành On-Chain
                  </span>
                </div>
              </div>

              {/* Cryptographic QR Block */}
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shrink-0">
                <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center rounded">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  <span className="font-bold text-slate-900 block">Mã QR Tra Cứu</span>
                  <span className="block mt-0.5">ON-CHAIN VERIFIED</span>
                  <span className="text-blue-600 block mt-0.5 font-bold">W3C Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Checklist & Fast Signing Controller (5 Cols) */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-[15px] text-slate-900">
                  Danh Sách Sinh Viên Nhận Bằng
                </h3>
                <p className="text-[12px] text-slate-500 mt-0.5">
                  Kiểm định mã băm & chữ ký số đơn
                </p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {batchStudents.length} hồ sơ hợp chuẩn
              </span>
            </div>

            {/* Quick Filter Search */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm MSSV, tên tân cử nhân..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Scrollable Student List */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg">
              {displayedStudents.map((std, idx) => {
                const isSelected = std.id === currentStudent.id;
                return (
                  <div
                    key={std.id}
                    onClick={() => setSelectedStudentIndex(idx)}
                    className={`p-3 cursor-pointer transition-colors flex items-center justify-between gap-3 text-[12px] ${
                      isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">{std.fullName}</span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                          {std.studentId}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate max-w-[200px]">
                        Hash: {std.sha256Hash}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        std.classification === 'Xuất sắc' ? 'bg-purple-50 text-purple-700' :
                        std.classification === 'Giỏi' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {std.classification}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                        Khớp Merkle
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[12px] space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span>Giao thức phát hành:</span>
                <span className="font-mono font-bold text-slate-800">UniChain BatchMint v2.4</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Tổng số bằng cấp:</span>
                <span className="font-mono font-bold text-blue-700">{activeBatch.totalStudents} NFT Soulbound</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Mạng xác thực:</span>
                <span className="font-mono font-bold text-emerald-700">Sepolia Ethereum Testnet</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSignModal(true)}
              className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Ký số & Phát hành On-Chain ({activeBatch.totalStudents} Văn bằng)</span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Bảo chứng bởi Tiêu chuẩn Văn bằng Quốc gia & EVM Consensus
            </p>
          </div>
        </div>
      </div>

      {/* Cloud HSM Sign Modal */}
      {showSignModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg text-slate-900">
                  Xác Thực Ký Số Cloud HSM Ban Giám Hiệu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSignModal(false);
                  setSigningStep('idle');
                }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {signingStep === 'idle' && (
              <div className="space-y-4">
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Bạn đang chuẩn bị ký số và phát hành <strong>{activeBatch.totalStudents} văn bằng</strong> thuộc đợt tốt nghiệp <strong>{activeBatch.name}</strong> lên mạng Blockchain.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Người ký lệnh:</span>
                    <span className="font-bold text-slate-900">PGS.TS Hoàng Tùng (Hiệu trưởng)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã thiết bị HSM:</span>
                    <span className="text-blue-700 font-bold">HSM-THALES-L3-#88910</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Merkle Root:</span>
                    <span className="truncate max-w-[200px] text-slate-800">{activeBatch.merkleRoot}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nhập mã PIN Bảo Mật HSM / OTP xác thực:
                  </label>
                  <input
                    type="password"
                    value={hsmPin}
                    onChange={(e) => setHsmPin(e.target.value)}
                    placeholder="Nhập 6 số PIN..."
                    className="w-full h-10 px-3 border border-slate-300 focus:border-blue-600 rounded-lg font-mono text-center tracking-widest text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Mã xác thực cấp bởi Viettel-CA Cloud HSM Server
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSignModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[13px] font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteSigning}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Xác nhận & Phát hành On-Chain</span>
                  </button>
                </div>
              </div>
            )}

            {signingStep !== 'idle' && signingStep !== 'completed' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900">
                    {signingStep === 'auth_hsm' && 'Đang xác thực chữ ký Cloud HSM FIPS 140-2...'}
                    {signingStep === 'generating_proofs' && 'Đang khởi tạo các nhánh Merkle Proof cá thể hóa...'}
                    {signingStep === 'broadcasting' && 'Đang phát sóng giao dịch lên Smart Contract Sepolia...'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Vui lòng không đóng cửa sổ trong khi ghi sổ cái blockchain
                  </p>
                </div>
              </div>
            )}

            {signingStep === 'completed' && (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xl text-slate-900">
                    Phát Hành On-Chain Thành Công!
                  </h4>
                  <p className="text-xs text-slate-600">
                    {activeBatch.totalStudents} văn bằng đã được đúc thành công thành ERC-721 Soulbound Token.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-left font-mono text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Transaction Hash:</span>
                    <span className="text-blue-700 font-bold">{txReceipt}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Block Height:</span>
                    <span className="text-slate-800 font-bold">#19,842,402</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Gas Sử dụng:</span>
                    <span className="text-slate-800">0.0385 ETH</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignModal(false);
                      setSigningStep('idle');
                    }}
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
                  >
                    Hoàn tất & Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
