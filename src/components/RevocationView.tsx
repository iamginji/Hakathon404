import React, { useState } from 'react';
import { 
  FileX2, 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  Copy, 
  Eye, 
  History, 
  Radio, 
  Plus, 
  BookOpen, 
  ShieldCheck,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { RevocationRecord, AuditLog } from '../types';

interface RevocationViewProps {
  revocations: RevocationRecord[];
  auditLogs: AuditLog[];
  onAddRevocation: (revocation: RevocationRecord, log: AuditLog) => void;
}

export const RevocationView: React.FC<RevocationViewProps> = ({
  revocations,
  auditLogs,
  onAddRevocation,
}) => {
  const [lookupQuery, setLookupQuery] = useState('UC-2025-000148');
  const [queriedStudent, setQueriedStudent] = useState({
    serialNumber: 'UC-2025-000148',
    fullName: 'Lê Thu Trang',
    studentId: '20210452',
    major: 'Ngành Kỹ thuật Cơ khí',
    cohort: 'Khóa 2021 - 2025',
    department: 'Khoa Cơ khí Xây dựng',
    ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    status: 'active'
  });

  const [decisionNo, setDecisionNo] = useState('QĐ 45/QĐ-ĐHXDHN');
  const [decisionDate, setDecisionDate] = useState('2026-01-03');
  const [reasonCategory, setReasonCategory] = useState('Vi phạm quy chế thi tốt nghiệp');
  const [reasonDetail, setReasonDetail] = useState('Sử dụng chứng chỉ ngoại ngữ không hợp lệ theo kết luận thanh tra học vụ số 18/KL-TTr.');
  const [fileName, setFileName] = useState('QD_ThuHoi_45_Signed.pdf');
  const [isRevoking, setIsRevoking] = useState(false);
  const [revocationSuccess, setRevocationSuccess] = useState(false);
  const [inspectedRecord, setInspectedRecord] = useState<RevocationRecord | null>(null);

  const handleQuery = () => {
    if (lookupQuery.trim() === '') return;
    setQueriedStudent({
      serialNumber: lookupQuery.toUpperCase(),
      fullName: 'Lê Thu Trang',
      studentId: '20210452',
      major: 'Ngành Kỹ thuật Cơ khí',
      cohort: 'Khóa 2021 - 2025',
      department: 'Khoa Cơ khí Xây dựng',
      ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      status: 'active'
    });
  };

  const handleExecuteRevocation = () => {
    setIsRevoking(true);
    setTimeout(() => {
      const newRev: RevocationRecord = {
        id: `rev-${Date.now()}`,
        serialNumber: queriedStudent.serialNumber,
        studentName: queriedStudent.fullName,
        studentId: queriedStudent.studentId,
        major: queriedStudent.major,
        decisionNumber: decisionNo,
        revocationDate: new Date().toLocaleDateString('vi-VN'),
        reason: `${reasonCategory} (${reasonDetail})`,
        txHash: '0xab1248ef348912c98d7e6f5a4b3c2d1e0f9a8b7c',
        status: 'revoked_onchain',
        signedBy: 'GS.TS Nguyễn Hoàng Long (Phó Hiệu trưởng Ủy quyền Ban Đào tạo)',
        signerAddress: '0x71C...43b7',
        documentFile: fileName,
      };

      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        actor: 'GS.TS Nguyễn Hoàng Long',
        actorRole: 'Phó Hiệu trưởng (Ủy quyền Ban Đào tạo)',
        action: 'REVOKE_CERT',
        targetCertificate: queriedStudent.serialNumber,
        ipAddress: '113.161.72.45',
        device: 'Văn phòng Ban ĐH - MacOS/Chrome',
        signerAddress: '0x71C...43b7',
        cryptoSignature: '0x5e8f99a83aa412e8c9d0b',
      };

      onAddRevocation(newRev, newLog);
      setIsRevoking(false);
      setRevocationSuccess(true);
      setTimeout(() => setRevocationSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span>REVOCATION MANAGER · EDUCHAIN ACADEMIC TRUST NETWORK</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Quản lý Thu hồi & Hủy bỏ Hiệu lực Văn bằng
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Xử lý các trường hợp văn bằng bị thu hồi theo quy định pháp luật hoặc phát hiện sai lệch, đồng bộ trực tiếp trạng thái sang Smart Contract.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              window.open('https://moet.gov.vn', '_blank');
            }}
            className="h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Xem quy chế Bộ GD&ĐT</span>
          </button>
        </div>
      </div>

      {/* Legal & On-Chain Immutable Notice Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 border border-blue-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-900">
              Lưu ý quy trình pháp lý & On-chain Immutable
            </h4>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Mọi quyết định thu hồi được băm mật mã và ghi nhận vĩnh viễn trên sổ cái chuỗi khối kèm số Quyết định hành chính và chữ ký số Multi-Sig của Ban Giám hiệu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg shrink-0">
          <span>Chuẩn W3C Verifiable Credentials</span>
        </div>
      </div>

      {/* Main 3-Step Wizard: Fixing all overlapping text & broken icon fonts from user's screenshot */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-[17px] font-bold text-slate-900">
              Quy Trình Thu Hồi & Hủy Hiệu Lực Văn Bằng (3 Bước)
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Bảo mật mã hóa đa chữ ký
          </span>
        </div>

        {/* 3 Step Cards in Locked Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* STEP 1: Search & Select Diploma */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-[14px] text-slate-900">Tìm kiếm & Chọn văn bằng</h3>
                  <p className="text-[11px] text-slate-500">Truy vấn siêu dữ liệu smart contract</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Mã SV / Số hiệu bằng
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupQuery}
                      onChange={(e) => setLookupQuery(e.target.value)}
                      placeholder="VD: UC-2025-000148..."
                      className="flex-1 h-9 px-3 text-[13px] font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleQuery}
                      className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-lg transition-colors shrink-0"
                    >
                      Truy vấn
                    </button>
                  </div>
                </div>

                {/* Student Info Card (Carefully spaced to prevent any text overlapping) */}
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2 text-[12px]">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Người được cấp</span>
                      <span className="font-bold text-slate-900 text-[13px]">{queriedStudent.fullName}</span>
                      <span className="text-[11px] text-slate-500 font-mono block">MSSV: {queriedStudent.studentId}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Đang hiệu lực
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 block">Chuyên ngành:</span>
                      <span className="font-semibold text-slate-800 block truncate">{queriedStudent.major}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Khóa tốt nghiệp:</span>
                      <span className="font-semibold text-slate-800 block">{queriedStudent.cohort}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Đã định danh hồ sơ lưu trữ IPFS & Merkle Root</span>
            </div>
          </div>

          {/* STEP 2: Legal Grounds & Reasons */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-[14px] text-slate-900">Nhập căn cứ pháp lý</h3>
                  <p className="text-[11px] text-slate-500">Thiết lập hồ sơ quyết định hành chính</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Số QĐ Thu hồi
                    </label>
                    <input
                      type="text"
                      value={decisionNo}
                      onChange={(e) => setDecisionNo(e.target.value)}
                      className="w-full h-9 px-3 text-[12px] bg-white border border-slate-200 rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Ngày ban hành
                    </label>
                    <input
                      type="date"
                      value={decisionDate}
                      onChange={(e) => setDecisionDate(e.target.value)}
                      className="w-full h-9 px-2 text-[12px] bg-white border border-slate-200 rounded-lg font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Lý do thu hồi / hủy bỏ
                  </label>
                  <select
                    value={reasonCategory}
                    onChange={(e) => setReasonCategory(e.target.value)}
                    className="w-full h-9 px-3 text-[12px] bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                  >
                    <option value="Vi phạm quy chế thi tốt nghiệp">Vi phạm quy chế thi tốt nghiệp</option>
                    <option value="Gian lận chứng chỉ ngoại ngữ / điều kiện đầu ra">Gian lận chứng chỉ ngoại ngữ / chuẩn đầu ra</option>
                    <option value="Sai sót chính tả họ tên để cấp đổi bằng mới">Sai sót chính tả họ tên (Cấp đổi bằng mới)</option>
                    <option value="Hủy quyết định công nhận tốt nghiệp theo kết luận thanh tra">Hủy theo kết luận thanh tra học vụ</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Văn bản đính kèm có dấu đỏ (PDF)
                  </label>
                  <div className="p-2.5 rounded-lg border border-dashed border-blue-300 bg-white flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700 truncate">
                      <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                      <span className="font-medium truncate">{fileName}</span>
                    </div>
                    <span className="font-mono text-slate-400 text-[10px] shrink-0">SHA: 0x8a9f...4f1e</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Hồ sơ đã được kiểm duyệt bởi Ban Giám hiệu</span>
            </div>
          </div>

          {/* STEP 3: Smart Contract Calling & Broadcast */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-[14px] text-slate-900">Xác nhận Ký số On-chain</h3>
                  <p className="text-[11px] text-slate-500">Gọi hàm hợp đồng thông minh Smart Contract</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {/* Solidity invocation specs */}
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1 overflow-x-auto">
                  <div className="text-emerald-400 font-semibold">
                    function revokeCertificate(string credentialId, bytes32 reasonHash)
                  </div>
                  <div className="text-slate-400 text-[10px] mt-1">
                    Contract: 0x89205A3A3b2A...4039
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    Network: EduChain Mainnet (ChainID: 42161)
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[12px] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Cảnh báo bất biến:</strong> Thao tác này làm mất hoàn toàn giá trị xác thực công khai của văn bằng và không thể đảo ngược trên mạng phân tán.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <button
                type="button"
                disabled={isRevoking}
                onClick={handleExecuteRevocation}
                className="w-full h-10 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isRevoking ? 'Đang gửi giao dịch On-Chain...' : 'Ký & Phát Lệnh Thu Hồi On-chain'}</span>
              </button>
            </div>
          </div>
        </div>

        {revocationSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13px] flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Đã ghi nhận giao dịch thu hồi on-chain thành công!</strong>
              <p className="text-[12px] text-emerald-700 mt-0.5">
                Văn bằng {queriedStudent.serialNumber} đã được chuyển trạng thái "REVOKED" trên Smart Contract và đồng bộ vào Audit Log.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Table: Danh mục văn bằng đã thu hồi & hủy hiệu lực */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-bold text-slate-900">
              Danh Mục Văn Bằng Đã Thu Hồi & Hủy Hiệu Lực
            </h2>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {revocations.length} Hồ sơ lưu
            </span>
          </div>
          <span className="text-[12px] text-slate-500">
            Cơ sở dữ liệu các chứng chỉ học thuật đã cập nhật trạng thái mất hiệu lực trên Smart Contract
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-3 px-4">Số hiệu bằng</th>
                <th className="py-3 px-4">Người được cấp</th>
                <th className="py-3 px-4">Ngành học</th>
                <th className="py-3 px-4">Số QĐ Thu hồi</th>
                <th className="py-3 px-4">Ngày thu hồi</th>
                <th className="py-3 px-4">Lý do xử lý</th>
                <th className="py-3 px-4">Tx Hash Blockchain</th>
                <th className="py-3 px-4">Trạng thái On-chain</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {revocations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {item.serialNumber}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{item.studentName}</span>
                    <span className="font-mono text-[11px] text-slate-400 block">SV: {item.studentId}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {item.major}
                  </td>

                  <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.decisionNumber}
                  </td>

                  <td className="py-3 px-4 font-mono text-[12px] text-slate-500 whitespace-nowrap">
                    {item.revocationDate}
                  </td>

                  <td className="py-3 px-4 text-[12px] text-rose-700 font-medium max-w-xs truncate" title={item.reason}>
                    {item.reason}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-blue-600 whitespace-nowrap">
                    <a
                      href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>{item.txHash}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    {item.status === 'revoked_onchain' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        ĐÃ THU HỒI TRÊN CHAIN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        ĐÃ CẤP ĐỔI MỚI
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setInspectedRecord(item)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Xem chi tiết quyết định"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex items-center justify-between text-[12px] text-slate-500">
          <span>Hiển thị {revocations.length} trong tổng số {revocations.length} kết quả</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-400">Trước</button>
            <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-400">Sau</button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">
              Nhật Ký Audit Log Quản Trị & Ký Lệnh
            </h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Theo dõi thời gian thực mọi hoạt động can thiệp hiệu lực văn bằng với thông tin ví Multi-Sig và IP xác thực.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" /> Node WebSocket: Active
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-2.5 px-3.5">Thời gian</th>
                <th className="py-2.5 px-3.5">Người thực hiện (Quản trị viên)</th>
                <th className="py-2.5 px-3.5">Hành động</th>
                <th className="py-2.5 px-3.5">Văn bằng can thiệp</th>
                <th className="py-2.5 px-3.5">Địa chỉ IP & Thiết bị</th>
                <th className="py-2.5 px-3.5">Địa chỉ ví ký lệnh</th>
                <th className="py-2.5 px-3.5">Chữ ký mật mã</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3.5 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-2.5 px-3.5 font-sans">
                    <span className="font-bold text-slate-900 block">{log.actor}</span>
                    <span className="text-[11px] text-slate-400 block">{log.actorRole}</span>
                  </td>

                  <td className="py-2.5 px-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action === 'REVOKE_CERT' ? 'bg-rose-100 text-rose-800' :
                      log.action === 'REPLACE_REISSUE' ? 'bg-amber-100 text-amber-800' :
                      log.action === 'SIGN_BATCH_HSM' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>

                  <td className="py-2.5 px-3.5 font-bold text-blue-700 whitespace-nowrap">
                    {log.targetCertificate}
                  </td>

                  <td className="py-2.5 px-3.5 font-sans">
                    <span className="font-mono text-slate-800 block text-[11px]">{log.ipAddress}</span>
                    <span className="text-slate-400 text-[10px] block">{log.device}</span>
                  </td>

                  <td className="py-2.5 px-3.5 text-blue-600 whitespace-nowrap">
                    {log.signerAddress}
                  </td>

                  <td className="py-2.5 px-3.5 text-slate-500 whitespace-nowrap">
                    {log.cryptoSignature}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Inspect Modal */}
      {inspectedRecord && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Chi Tiết Hồ Sơ Thu Hồi Văn Bằng
              </h3>
              <button
                type="button"
                onClick={() => setInspectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Số hiệu bằng:</span>
                <span className="font-mono font-bold text-blue-700">{inspectedRecord.serialNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Sinh viên:</span>
                <span className="font-bold text-slate-900">{inspectedRecord.studentName} ({inspectedRecord.studentId})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Ngành học:</span>
                <span className="font-semibold text-slate-800">{inspectedRecord.major}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Số Quyết định:</span>
                <span className="font-semibold text-slate-800">{inspectedRecord.decisionNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Ngày thu hồi:</span>
                <span className="font-mono text-slate-800">{inspectedRecord.revocationDate}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Lý do thu hồi:</span>
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[12px] font-medium leading-relaxed">
                  {inspectedRecord.reason}
                </div>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100 font-mono text-[11px]">
                <span className="text-slate-500">Tx Hash:</span>
                <span className="text-blue-700 font-bold">{inspectedRecord.txHash}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedRecord(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
