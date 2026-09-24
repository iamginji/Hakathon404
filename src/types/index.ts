export type NavTab = 
  | 'dashboard'
  | 'batches'
  | 'signing'
  | 'revocations'
  | 'ledger'
  | 'contract';

export interface BatchItem {
  id: string;
  code: string;
  name: string;
  department: string;
  program: string;
  decisionNumber: string;
  decisionDate: string;
  totalStudents: number;
  validStudents: number;
  status: 'draft' | 'pending_review' | 'awaiting_signing' | 'minted_onchain';
  createdDate: string;
  merkleRoot: string;
  txHash?: string;
  blockNumber?: number;
}

export interface StudentCertificate {
  id: string;
  studentId: string; // MSSV: 64XDDN-8801
  fullName: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  idNumber: string; // CCCD
  degreeType: 'BẰNG KỸ SƯ' | 'BẰNG CỬ NHÂN' | 'BẰNG THẠC SĨ' | 'BẰNG TIẾN SĨ';
  major: string;
  department: string;
  gpa: number;
  classification: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình';
  serialNumber: string; // Số hiệu bằng: UC-2026-08801
  registryBookNumber: string; // Số vào sổ: 2026/HUCE/08801
  issueDate: string;
  decisionNumber: string;
  batchId: string;
  sha256Hash: string;
  onChainStatus: 'ready_to_mint' | 'minted' | 'revoked';
  txHash?: string;
}

export interface EnterpriseVerification {
  id: string;
  enterpriseName: string;
  enterpriseUnit: string;
  avatarText: string;
  studentId: string;
  studentName: string;
  degreeName: string;
  hash: string;
  channel: 'API Gateway' | 'Quét mã QR' | 'Tra Cứu Web Portal';
  timestamp: string;
  status: 'valid' | 'revoked' | 'unverified';
}

export interface RevocationRecord {
  id: string;
  serialNumber: string;
  studentName: string;
  studentId: string;
  major: string;
  decisionNumber: string;
  revocationDate: string;
  reason: string;
  txHash: string;
  status: 'revoked_onchain' | 'reissued';
  signedBy: string;
  signerAddress: string;
  documentFile: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: 'REVOKE_CERT' | 'REPLACE_REISSUE' | 'INITIATE_PROPOSAL' | 'SIGN_BATCH_HSM' | 'MINT_TOKEN';
  targetCertificate: string;
  ipAddress: string;
  device: string;
  signerAddress: string;
  cryptoSignature: string;
}
