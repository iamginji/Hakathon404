import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  Layers, 
  FileDown, 
  PlusCircle, 
  ShieldCheck, 
  Search, 
  Filter, 
  Sparkles,
  ArrowRight,
  Eye,
  Hash
} from 'lucide-react';
import { BatchItem } from '../types';

interface BatchesViewProps {
  batches: BatchItem[];
  onNavigateToSigning: (batchId: string) => void;
  onOpenNewBatchModal: () => void;
}

export const BatchesView: React.FC<BatchesViewProps> = ({
  batches,
  onNavigateToSigning,
  onOpenNewBatchModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('ALL');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const filteredBatches = batches.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.decisionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDepartment === 'ALL' || b.department.includes(filterDepartment);
    return matchSearch && matchDept;
  });

  const handleSimulateUpload = () => {
    setUploadStatus('validating');
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span>HUCE DDMS · QUY CHUẨN QUYẾT ĐỊNH TỐT NGHIỆP 2026</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Quản lý Đợt cấp & Nhập liệu Hồ sơ
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Tiếp nhận, kiểm tra tính toàn vẹn và tính toán Merkle Root trước khi phát hành lên Smart Contract.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              const csvContent = "Mã SV,Họ và tên,Ngày sinh,Giới tính,Ngành đào tạo,Xếp loại,GPA,Số hiệu bằng,Số vào sổ,Số QĐ tốt nghiệp\n64XDDN-8801,Nguyễn Minh Anh,15/08/2002,Nam,Kỹ thuật Xây dựng,Giỏi,3.62,UC-2026-08801,2026/HUCE/08801,QĐ 142/QĐ-ĐHXDHN\n64XDDN-8802,Trần Thảo Linh,02/11/2002,Nữ,Kỹ thuật Xây dựng,Xuất sắc,3.85,UC-2026-08802,2026/HUCE/08802,QĐ 142/QĐ-ĐHXDHN";
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'UniChain_Graduates_v2.6.csv';
              a.click();
            }}
            className="h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all"
          >
            <FileDown className="w-4 h-4 text-emerald-600" />
            <span>Tải mẫu Excel/CSV chuẩn Bộ GD&ĐT</span>
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

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tổng hồ sơ năm 2026
            </span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileSpreadsheet className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">1,960</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +18.4%
            </span>
          </div>
          <span className="text-[12px] text-slate-500 mt-1 block">So với niên khóa 2025</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Trạng thái xác thực
            </span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">1,250</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Hợp lệ
            </span>
          </div>
          <span className="text-[12px] text-slate-500 mt-1 block">0 hồ sơ thiếu trường thông tin</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Đối soát sổ gốc
            </span>
            <span className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">0</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Trùng lặp
            </span>
          </div>
          <span className="text-[12px] text-slate-500 mt-1 block">Kiểm tra tự động 8 trường khóa</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ROOT MERKLE SẴN SÀNG
            </span>
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Hash className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-blue-700 font-mono">SHA-256</span>
          </div>
          <span className="text-[11px] font-mono text-slate-600 mt-1 block bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate">
            0x4f88...a9b3 (Pre-hashed)
          </span>
        </div>
      </div>

      {/* Drag & Drop Ingestion Zone (Matching Image 5) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-[17px] font-bold text-slate-900">
              Khu vực Nhập Dữ Liệu & Mã Hóa Tự Động
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Quy chuẩn BGD&ĐT TT21/2019</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">UTF-8 / CRLF</span>
          </div>
        </div>

        <p className="text-[13px] text-slate-500 mb-5">
          Hệ thống tự động đối chiếu Số hiệu văn bằng, Số vào sổ với cơ sở dữ liệu gốc và tự động băm Merkle Tree SHA-256 on-chain.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 hover:bg-blue-50/40 rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-[16px] font-bold text-slate-900">
            Kéo thả tệp CSV / XLSX danh sách tốt nghiệp vào đây
          </h3>
          <p className="text-[12px] text-slate-500 mt-1 max-w-lg">
            Các trường dữ liệu bắt buộc: Mã SV, Họ tên, Ngày sinh, Ngành đào tạo, Số hiệu bằng, Số vào sổ, Xếp loại, Số Quyết định.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleSimulateUpload}
              className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] shadow-sm transition-all"
            >
              {uploadStatus === 'validating' ? 'Đang băm Merkle Tree...' : 'Chọn tệp tin từ máy tính'}
            </button>

            <button
              type="button"
              onClick={handleSimulateUpload}
              className="h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-blue-700 font-semibold text-[13px] transition-all"
            >
              Nạp mẫu nhanh: <strong>UniChain_Graduates_v2.6.xlsx</strong>
            </button>
          </div>

          {uploadStatus === 'success' && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đã kiểm tra 485 bản ghi! Không có lỗi trùng lặp. Đã sẵn sàng ký số HSM.</span>
            </div>
          )}
        </div>

        {/* Validation Checkpoints Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[12px] font-bold text-slate-900 block">1,250 sinh viên hợp lệ</span>
              <span className="text-[11px] text-slate-500">Đầy đủ CCCD & Quyết định cấp bằng</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[12px] font-bold text-slate-900 block">0 trùng lặp mã bằng</span>
              <span className="text-[11px] text-slate-500">Số hiệu duy nhất trên toàn hệ thống</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="text-[12px] font-bold text-slate-900 block">Mã băm SHA-256 đã sẵn sàng</span>
              <span className="text-[11px] text-slate-500">Khởi tạo Merkle Root thành công</span>
            </div>
          </div>
        </div>
      </div>

      {/* Batch List Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-bold text-slate-900">Danh Sách Đợt Cấp Bằng</h2>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {filteredBatches.length} Đợt hoạt động
            </span>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên đợt, số QĐ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white w-48 transition-all"
              />
            </div>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="h-9 px-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả khoa / viện</option>
              <option value="Công nghệ Thông tin">Khoa CNTT</option>
              <option value="Quốc tế">Viện Quốc tế</option>
              <option value="Kinh tế">Khoa Kinh tế</option>
              <option value="Xây dựng">Khoa Xây dựng</option>
            </select>
          </div>
        </div>

        {/* Table of Batches */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-3 px-4">Tên đợt cấp</th>
                <th className="py-3 px-4">Quyết định tốt nghiệp</th>
                <th className="py-3 px-4 text-center">Số lượng SV</th>
                <th className="py-3 px-4">Khoa / Đơn vị phụ trách</th>
                <th className="py-3 px-4">Ngày tạo</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác nghiệp vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBatches.map((batch) => {
                const isReady = batch.status === 'awaiting_signing';
                const isMinted = batch.status === 'minted_onchain';

                return (
                  <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 block">{batch.name}</span>
                        <span className="font-mono text-[11px] text-slate-400 block mt-0.5">
                          BATCH-ID: {batch.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-slate-800 block">{batch.decisionNumber}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Ký ngày: {batch.decisionDate}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-bold text-slate-900 text-[14px]">
                        {batch.totalStudents}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Hồ sơ cử nhân</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block">{batch.department}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{batch.program}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[12px] font-mono">
                      {batch.createdDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isReady ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Chờ Ký số
                        </span>
                      ) : isMinted ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Đã mint Blockchain
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                          Chờ duyệt hồ sơ
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {isReady ? (
                          <button
                            type="button"
                            onClick={() => onNavigateToSigning(batch.id)}
                            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[12px] flex items-center gap-1 shadow-sm transition-all"
                          >
                            <span>Chuyển ký số</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigateToSigning(batch.id)}
                            className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[12px] flex items-center gap-1 transition-all"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Đối soát hồ sơ</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="pt-4 flex items-center justify-between text-[12px] text-slate-500">
          <span>Hiển thị 1 đến {filteredBatches.length} trên tổng số {batches.length} đợt cấp</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed">Trước</button>
            <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
};
