import type { Timestamp } from 'firebase/firestore';

export enum ContributionStatus {
  Pending = 'PENDING',
  Failed = 'FAILED',
  Success = 'COMPLETED',
}

export interface Contribution {
  id: string;
  months: string[];
  amount: string;
  status: ContributionStatus;
  trxRef: string;
  trxCode: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp | null;
  completedAt: Timestamp | null;
  donor: {
    name: string;
    id: string;
  };
}

export interface ContributionResponse
  extends Omit<Contribution, 'createdAt' | 'modifiedAt' | 'completedAt'> {
  createdAt: { _seconds: number; _nanoseconds: number };
  modifiedAt: { _seconds: number; _nanoseconds: number } | null;
  completedAt: { _seconds: number; _nanoseconds: number } | null;
}

export interface CreateContributionParams {
  amount: string;
  months: string[];
  donor: Contribution['donor'];
}
