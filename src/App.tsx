/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, BatchItem, StudentCertificate, RevocationRecord, AuditLog } from './types';
import { 
  INITIAL_BATCHES, 
  INITIAL_STUDENTS, 
  INITIAL_VERIFICATIONS, 
  INITIAL_REVOCATIONS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { BatchesView } from './components/BatchesView';
import { SigningView } from './components/SigningView';
import { RevocationView } from './components/RevocationView';
import { LedgerLookupView } from './components/LedgerLookupView';
import { ContractConfigView } from './components/ContractConfigView';
import { FigmaExportModal } from './components/FigmaExportModal';
import { NewBatchModal } from './components/NewBatchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<StudentCertificate[]>(INITIAL_STUDENTS);
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [revocations, setRevocations] = useState<RevocationRecord[]>(INITIAL_REVOCATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [selectedBatchId, setSelectedBatchId] = useState<string>('batch-01');
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);
  const [ledgerInitialSearch, setLedgerInitialSearch] = useState('');

  const pendingBatchesCount = batches.filter(b => b.status === 'awaiting_signing').length;

  const handleNavigateToSigning = (batchId?: string) => {
    if (batchId) {
      setSelectedBatchId(batchId);
    }
    setActiveTab('signing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBatchMinted = (batchId: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          status: 'minted_onchain',
          blockNumber: 19842402,
          txHash: '0x93b4f92d8e7a1b0c9f8e7d6c5b4a39281726a1f8',
        };
      }
      return b;
    }));

    // Add audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actor: 'PGS.TS Hoàng Tùng',
      actorRole: 'Hiệu trưởng Nhà trường',
      action: 'SIGN_BATCH_HSM',
      targetCertificate: `BATCH ${batchId} (485 BẰNG)`,
      ipAddress: '113.160.10.88',
      device: 'Cloud HSM FIPS 140-2 Level 3',
      signerAddress: '0x93b4...1F82',
      cryptoSignature: '0x7fc48a9b0123cde456',
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleAddRevocation = (rev: RevocationRecord, log: AuditLog) => {
    setRevocations(prev => [rev, ...prev]);
    setAuditLogs(prev => [log, ...prev]);
    setStudents(prev => prev.map(s => {
      if (s.serialNumber === rev.serialNumber || s.studentId === rev.studentId) {
        return { ...s, onChainStatus: 'revoked' };
      }
      return s;
    }));
  };

  const handleNewBatchCreated = (batch: BatchItem) => {
    setBatches(prev => [batch, ...prev]);
  };

  const handleSearchSelectStudent = (std: StudentCertificate) => {
    setLedgerInitialSearch(std.studentId);
    setActiveTab('ledger');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* 1. Persistent Locked Navigation Sidebar (260px) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingSignCount={pendingBatchesCount}
      />

      {/* 2. Fixed Top Header (h-16) */}
      <Header
        students={students}
        onSearchSelect={handleSearchSelectStudent}
        onOpenFigmaModal={() => setIsFigmaModalOpen(true)}
      />

      {/* 3. Main Locked Workspace (No shifting or jumping) */}
      <main className="pl-[260px] pt-16 min-h-screen flex-1 flex flex-col">
        <div className="w-full max-w-[1560px] mx-auto px-8 py-6 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              batches={batches}
              verifications={verifications}
              onNavigateToSigning={handleNavigateToSigning}
              onNavigateToBatches={() => setActiveTab('batches')}
              onNavigateToLedger={() => setActiveTab('ledger')}
              onOpenNewBatchModal={() => setIsNewBatchModalOpen(true)}
            />
          )}

          {activeTab === 'batches' && (
            <BatchesView
              batches={batches}
              onNavigateToSigning={handleNavigateToSigning}
              onOpenNewBatchModal={() => setIsNewBatchModalOpen(true)}
            />
          )}

          {activeTab === 'signing' && (
            <SigningView
              batches={batches}
              selectedBatchId={selectedBatchId}
              students={students}
              onBatchMinted={handleBatchMinted}
            />
          )}

          {activeTab === 'revocations' && (
            <RevocationView
              revocations={revocations}
              auditLogs={auditLogs}
              onAddRevocation={handleAddRevocation}
            />
          )}

          {activeTab === 'ledger' && (
            <LedgerLookupView
              students={students}
              initialSearch={ledgerInitialSearch}
            />
          )}

          {activeTab === 'contract' && (
            <ContractConfigView />
          )}
        </div>

        {/* Global Quiet Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">UniChain Sovereign Identity</span>
            <span>·</span>
            <span>Hệ thống Cấp phát & Quản trị Văn bằng Đại học Phân tán © 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Chuẩn W3C Verifiable Credentials 2.0</span>
            <span>·</span>
            <span>Consensus: Proof of Authority (PoA)</span>
            <span>·</span>
            <button
              onClick={() => setIsFigmaModalOpen(true)}
              className="text-blue-600 hover:underline font-semibold"
            >
              Figma Tokens Studio Spec
            </button>
          </div>
        </footer>
      </main>

      {/* Global Modals */}
      <FigmaExportModal
        isOpen={isFigmaModalOpen}
        onClose={() => setIsFigmaModalOpen(false)}
      />

      <NewBatchModal
        isOpen={isNewBatchModalOpen}
        onClose={() => setIsNewBatchModalOpen(false)}
        onBatchCreated={handleNewBatchCreated}
      />
    </div>
  );
}
