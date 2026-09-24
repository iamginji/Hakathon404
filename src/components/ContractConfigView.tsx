import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Key, 
  Lock, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Layers,
  Settings,
  Database,
  Radio
} from 'lucide-react';

export const ContractConfigView: React.FC = () => {
  const [network, setNetwork] = useState<'sepolia' | 'mainnet' | 'consortium'>('sepolia');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="pt-1">
        <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>SMART CONTRACT & CRYPTOGRAPHIC HARDWARE INTEGRATION</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Cấu hình Smart Contract & Cloud HSM
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">
          Thiết lập tham số mạng sổ cái, địa chỉ hợp đồng thông minh phát hành và chứng chỉ phần cứng bảo mật FIPS 140-2.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Contract Parameters (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-[16px] font-bold text-slate-900">
              Thông Số Hợp Đồng Thông Minh (Core Contract)
            </h2>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              v2.6.4 Soulbound
            </span>
          </div>

          <div className="space-y-4 text-[13px]">
            <div>
              <label className="text-slate-500 font-medium block mb-1">Mạng kết nối hoạt động:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setNetwork('sepolia')}
                  className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
                    network === 'sepolia'
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Sepolia Testnet</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">ChainID: 11155111</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNetwork('mainnet')}
                  className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
                    network === 'mainnet'
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>EduChain L2</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">ChainID: 42161</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNetwork('consortium')}
                  className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
                    network === 'consortium'
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Liên Minh ĐH VN</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">ChainID: 8899</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 font-mono text-[12px]">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-sans text-xs block mb-1">
                  Địa chỉ Smart Contract Cấp Bằng (Issuer Registry):
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1F8</span>
                  <button
                    onClick={() => copy('0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1F8', 'sc')}
                    className="text-slate-400 hover:text-slate-700 p-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-sans text-xs block mb-1">
                  Địa chỉ Ví Ký Quản Trị Viện (Admin Vault):
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">0x72A4b91f0c2a4e8d7c10b2a3c4d5e6f7a85C91</span>
                  <button
                    onClick={() => copy('0x72A4b91f0c2a4e8d7c10b2a3c4d5e6f7a85C91', 'adm')}
                    className="text-slate-400 hover:text-slate-700 p-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ABI Methods Reference */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Hàm thực thi trên Smart Contract:
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-2 rounded bg-slate-900 text-slate-200 flex justify-between">
                  <span className="text-emerald-400">mintBatch(bytes32 merkleRoot, uint256 count)</span>
                  <span className="text-slate-400">Dual-PKI Required</span>
                </div>
                <div className="p-2 rounded bg-slate-900 text-slate-200 flex justify-between">
                  <span className="text-rose-400">revokeCertificate(string id, bytes32 reasonHash)</span>
                  <span className="text-slate-400">Multi-Sig Required</span>
                </div>
                <div className="p-2 rounded bg-slate-900 text-slate-200 flex justify-between">
                  <span className="text-blue-300">verifyCredential(string id, bytes32[] proof)</span>
                  <span className="text-slate-400">Public View (Gas Free)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cloud HSM Integration (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-[16px] font-bold text-slate-900">
              Module Bảo Mật Phần Cứng Cloud HSM
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              FIPS 140-2 Level 3
            </span>
          </div>

          <div className="space-y-3 text-[13px]">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">Nhà cung cấp CA:</span>
                <span className="font-bold text-slate-900">Viettel-CA / VNPT-CA HSM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">Thuật toán ký:</span>
                <span className="font-mono font-bold text-blue-700">Ed25519 & RSA-4096</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">Chứng thư số:</span>
                <span className="font-mono text-slate-700">SHA256withRSA (Hiệu lực: 2028)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">Trạng thái kết nối:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng ký duyệt
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200 text-blue-900 text-xs leading-relaxed space-y-1">
              <strong>Nguyên tắc bảo vệ Khóa riêng (Private Key):</strong>
              <p className="text-slate-600">
                Khóa ký của Hiệu trưởng và Trưởng phòng Đào tạo không bao giờ rời khỏi thiết bị bảo mật phần cứng. Mọi thao tác ký được thực hiện bên trong môi trường tamper-proof đạt chuẩn quốc tế.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
