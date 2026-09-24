import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  CheckCircle2, 
  Layers, 
  Palette, 
  Type, 
  Maximize2, 
  FileCode, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { FIGMA_DESIGN_TOKENS } from '../data/mockData';

interface FigmaExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FigmaExportModal: React.FC<FigmaExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'guide' | 'preview'>('tokens');

  if (!isOpen) return null;

  const tokensJson = JSON.stringify(FIGMA_DESIGN_TOKENS, null, 2);

  const cssVariables = `/* UniChain Design System - Exported for Figma & Web */
:root {
  /* Brand Colors (Derived from Isometric Cap Logo) */
  --color-primary: #1D4ED8;
  --color-primary-dark: #1E3A8A;
  --color-primary-light: #3B82F6;
  --color-accent-cyan: #00D2FF;
  --color-accent-sky: #0284C7;
  --color-accent-teal: #06B6D4;

  /* Surfaces & Neutrals */
  --color-bg-canvas: #F8FAFC;
  --color-bg-surface: #FFFFFF;
  --color-bg-subtle: #F1F5F9;
  --color-border-subtle: #E2E8F0;
  --color-border-strong: #CBD5E1;

  /* Typography */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Be Vietnam Pro', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Layout Spacing */
  --sidebar-width: 260px;
  --header-height: 64px;
  --max-content-width: 1560px;
  --card-padding: 24px;
  --radius-default: 8px;
  --radius-card: 12px;
}`;

  const downloadTokensFile = () => {
    const blob = new Blob([tokensJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unichain_figma_tokens.json';
    a.click();
  };

  const copyTokens = () => {
    navigator.clipboard.writeText(tokensJson);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(cssVariables);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              {/* Figma Symbol */}
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Xuất Giao Diện & Bộ Design Tokens Sang Figma
              </h3>
              <p className="text-[12px] text-slate-500">
                Thống nhất màu sắc thương hiệu, font chữ và quy chuẩn khung khóa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'tokens' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Figma Tokens (JSON & CSS)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'html' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tải HTML Trực Tiếp
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bảng Màu & Kiểu Chữ Logo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hướng Dẫn Plugin
          </button>
        </div>

        {/* Tab 1: Tokens Export */}
        {activeTab === 'tokens' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            <p className="text-xs text-slate-600 leading-relaxed">
              Bạn có thể tải tệp <strong>unichain_figma_tokens.json</strong> để nhập trực tiếp vào Figma qua plugin <strong>Tokens Studio</strong> hoặc tính năng <strong>Figma Variables</strong>.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadTokensFile}
                className="flex-1 h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải file unichain_figma_tokens.json</span>
              </button>

              <button
                type="button"
                onClick={copyTokens}
                className="px-4 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all"
              >
                {copiedTokens ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTokens ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
              </button>

              <button
                type="button"
                onClick={copyCSS}
                className="px-4 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all"
              >
                {copiedCSS ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <FileCode className="w-3.5 h-3.5" />}
                <span>{copiedCSS ? 'Đã sao chép!' : 'Sao chép CSS'}</span>
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-200 max-h-56 overflow-y-auto">
              <pre>{tokensJson}</pre>
            </div>
          </div>
        )}

        {/* Tab: HTML Direct Export */}
        {activeTab === 'html' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs text-slate-600">
            <p className="leading-relaxed">
              Dưới đây là toàn bộ mã nguồn <strong>HTML & CSS độc lập</strong> của giao diện (đã nhúng sẵn Tailwind CSS, Font tiếng Việt và Logo vector). Bạn có thể tải file hoặc copy trực tiếp mã HTML này:
            </p>

            <div className="flex gap-2">
              <a
                href="/export-to-figma.html"
                download="unichain-dashboard.html"
                className="flex-1 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải file unichain-dashboard.html</span>
              </a>

              <a
                href="/export-to-figma.html"
                target="_blank"
                rel="noreferrer"
                className="px-4 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở xem trang HTML thuần</span>
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Cách dùng file HTML với Figma:</span>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Cách 1: Mở file HTML trên trình duyệt Google Chrome → Dùng extension <em>html.to.design</em> hoặc <em>Figma to code</em> để lưu sang Figma.</li>
                <li>Cách 2: Kéo thả file <code>unichain-dashboard.html</code> vào các công cụ chuyển đổi online như <em>html2figma</em> hoặc <em>builder.io</em>.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Visual Palette derived from Logo */}
        {activeTab === 'preview' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs">
            <div>
              <span className="font-bold text-slate-800 block mb-2">1. Bảng màu thương hiệu (Theo Logo Cap + Nodes):</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="h-8 rounded bg-[#1D4ED8]"></div>
                  <span className="font-bold block text-slate-900">Royal Cobalt</span>
                  <span className="font-mono text-slate-400 text-[10px]">#1D4ED8 (Primary)</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="h-8 rounded bg-[#00D2FF]"></div>
                  <span className="font-bold block text-slate-900">Electric Cyan</span>
                  <span className="font-mono text-slate-400 text-[10px]">#00D2FF (Accent)</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="h-8 rounded bg-[#1E3A8A]"></div>
                  <span className="font-bold block text-slate-900">Deep Navy</span>
                  <span className="font-mono text-slate-400 text-[10px]">#1E3A8A (Dark)</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="h-8 rounded bg-[#0284C7]"></div>
                  <span className="font-bold block text-slate-900">Sky Blue</span>
                  <span className="font-mono text-slate-400 text-[10px]">#0284C7 (Links)</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-2">2. Quy chuẩn Font chữ & Độ dày (Typography Hierarchy):</span>
              <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="font-bold text-slate-900 text-sm font-sans">
                    Plus Jakarta Sans (Tiêu đề, Heading, Đợt cấp)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Weight 700, 800</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="text-slate-800 font-sans">
                    Be Vietnam Pro (Nội dung tiếng Việt, nhãn, dữ liệu)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Weight 400, 500, 600</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono font-semibold text-blue-700">
                    JetBrains Mono (Mã hash, Merkle root, số hiệu bằng)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Tabular Figures</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-2">3. Khóa khung & Bố cục (Layout Lock):</span>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-slate-600">
                <div className="p-2 bg-slate-100 rounded">Sidebar: <strong>260px Fixed</strong></div>
                <div className="p-2 bg-slate-100 rounded">Header: <strong>64px Fixed</strong></div>
                <div className="p-2 bg-slate-100 rounded">Max Width: <strong>1560px Locked</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs text-slate-600">
            {/* Step 1 Highlighted Card */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                  Sao chép URL ứng dụng đang chạy
                </span>
                <span className="text-[11px] text-blue-700 font-semibold bg-white px-2 py-0.5 rounded border border-blue-200">
                  Khuyên dùng
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Plugin Figma sẽ dùng link này để clone toàn bộ thiết kế, mã màu, font chữ và hình ảnh sang các Frame Figma:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 h-9 px-3 bg-white border border-slate-200 rounded-lg font-mono text-[11px] text-slate-800 select-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Đã sao chép URL ứng dụng!");
                  }}
                  className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Chép Link</span>
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                Mở Figma và chạy Plugin "html.to.design"
              </span>
              <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                <li>Mở file thiết kế mới trong phần mềm Figma (hoặc trên web <code>figma.com</code>).</li>
                <li>Nhấn phím tắt <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + /</kbd> (trên Windows) hoặc <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Cmd + /</kbd> (trên Mac).</li>
                <li>Gõ chữ: <strong>html.to.design</strong> và nhấn Enter để mở plugin (plugin này miễn phí hoàn toàn).</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                Dán URL & Nhấn "Import"
              </span>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Trong cửa sổ plugin hiện lên, dán URL bạn vừa chép ở Bước 1.</li>
                <li>Mục <strong>Viewports</strong>: Chọn <strong>Desktop (1440px)</strong>.</li>
                <li>Nhấn nút <strong>Import</strong> màu tím của plugin.</li>
                <li><strong>Xong!</strong> Toàn bộ giao diện Dashboard, các Card, Bảng biểu, Logo và Nút bấm sẽ được chuyển thành các Frame Figma có sẵn Auto Layout để bạn thoải mái chỉnh sửa.</li>
              </ol>
            </div>

            {/* Extra copy SVG logo */}
            <div className="p-3.5 rounded-lg border border-indigo-200 bg-indigo-50/50 flex items-center justify-between">
              <div>
                <strong className="text-indigo-900 block text-xs">Mẹo: Muốn lấy riêng Logo Vector sang Figma?</strong>
                <span className="text-slate-500 text-[11px]">Logo mũ cử nhân và node blockchain đã sẵn sàng ở định dạng SVG chuẩn.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const svgEl = document.querySelector('svg');
                  if (svgEl) {
                    navigator.clipboard.writeText(svgEl.outerHTML);
                    alert("Đã sao chép mã SVG Logo! Bạn chỉ cần vào Figma và bấm Ctrl + V (Cmd + V) để dán ra.");
                  }
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-md shadow-xs transition-all shrink-0"
              >
                Sao chép Logo Vector
              </button>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            UniChain Academic Trust Ledger · Design System Specification
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
