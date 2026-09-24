import React, { useState } from 'react';
import { PlusCircle, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { BatchItem } from '../types';

interface NewBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBatchCreated: (batch: BatchItem) => void;
}

export const NewBatchModal: React.FC<NewBatchModalProps> = ({ isOpen, onClose, onBatchCreated }) => {
  const [name, setName] = useState('Đợt tốt nghiệp K65 - Đợt 1/2026');
  const [department, setDepartment] = useState('Khoa Công nghệ Thông tin & ATTT');
  const [program, setProgram] = useState('Hệ chính quy 4 năm');
  const [decisionNumber, setDecisionNumber] = useState('QĐ 188/QĐ-ĐHXDHN');
  const [decisionDate, setDecisionDate] = useState('2026-06-15');
  const [totalStudents, setTotalStudents] = useState(320);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: BatchItem = {
      id: `batch-${Date.now()}`,
      code: `BATCH-2026-K65-0${Math.floor(Math.random() * 9) + 1}`,
      name,
      department,
      program,
      decisionNumber,
      decisionDate: new Date(decisionDate).toLocaleDateString('vi-VN'),
      totalStudents: Number(totalStudents),
      validStudents: Number(totalStudents),
      status: 'awaiting_signing',
      createdDate: new Date().toLocaleDateString('vi-VN'),
      merkleRoot: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    onBatchCreated(newBatch);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Khởi Tạo Đợt Cấp Bằng Tốt Nghiệp Mới
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tên đợt cấp tốt nghiệp:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 text-[13px] bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Khoa / Đơn vị:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-9 px-2 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Khoa Công nghệ Thông tin & ATTT">Khoa Công nghệ Thông tin</option>
                <option value="Khoa Xây dựng Dân dụng & CN">Khoa Xây dựng Dân dụng</option>
                <option value="Khoa Kinh tế & QL Xây dựng">Khoa Kinh tế & QL</option>
                <option value="Viện Đào tạo Quốc tế">Viện Đào tạo Quốc tế</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Hệ đào tạo:</label>
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full h-9 px-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Số Quyết định:</label>
              <input
                type="text"
                required
                value={decisionNumber}
                onChange={(e) => setDecisionNumber(e.target.value)}
                className="w-full h-9 px-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Số lượng SV:</label>
              <input
                type="number"
                required
                min={1}
                value={totalStudents}
                onChange={(e) => setTotalStudents(Number(e.target.value))}
                className="w-full h-9 px-3 text-[12px] font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Ngày ký quyết định:</label>
            <input
              type="date"
              required
              value={decisionDate}
              onChange={(e) => setDecisionDate(e.target.value)}
              className="w-full h-9 px-3 text-[12px] bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm shadow-blue-500/20"
            >
              Tạo đợt & Chuyển bước
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
