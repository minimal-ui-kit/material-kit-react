import { Timestamp } from "firebase/firestore";

export enum ContributionStatus {
  Pending = "PENDING",
  Failed = "FAILED",
  Success = "COMPLETED",
}

export interface Contribution {
  id: string;
  months: string[];
  amount: string;
  status: ContributionStatus;
  trxRef: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp | null;
  completedAt: Timestamp | null;
  donor: {
    name: string;
    id: string;
  };
}

export interface CreateContributionParams {
  amount: string;
  months: string[];
  donor: Contribution["donor"];
}
