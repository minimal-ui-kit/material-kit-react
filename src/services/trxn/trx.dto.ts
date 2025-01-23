import type { Timestamp } from 'firebase/firestore';

export enum TrxStatus {
  Initiated = 'INITIATED',
  Pending = 'PENDING',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export interface InitTransactionPayload {
  email: string;
  amount: string;
}

export interface Trxn {
  id: string;
  status: TrxStatus;
  initiateAt: Timestamp;
  completeAt: Timestamp | null;
  modifiedAt: Timestamp | null;
  trxRef: string;
  trxCode: string;
  trxUrl: string;
  amount: string;
  initiator: {
    name: string;
    id: string;
    email: string;
  };
}
