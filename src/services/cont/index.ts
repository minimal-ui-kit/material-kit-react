import {
  Timestamp,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { fx } from 'src/configs';
import { Collection } from 'src/constants';
import { ApiRoute } from 'src/constants/fxns';
import { colRef, docRef } from 'src/utils';
import { Contribution, ContributionResponse, ContributionStatus } from './contribute.dto';

export default class ContributionService {
  private static ref = colRef(Collection.Contributions);

  static async getByUserId(id: string, count = 15) {
    const q = query(
      this.ref,
      where('donor.id', '==', id),
      limit(count),
      orderBy('createdAt', 'desc')
    );
    const docs = await getDocs(q);
    const data: Contribution[] = [];
    docs.forEach((doc) => {
      data.push(doc.data() as Contribution);
    });
    return data;
  }

  static async listenLatest(cb: (val: Contribution[]) => void, id?: string, count = 15) {
    const q = query(
      this.ref,
      id ? where('donor.id', '==', id) : where('status', '==', ContributionStatus.Success),
      orderBy('createdAt', 'desc'),
      limit(count)
    );

    return onSnapshot(q, ({ docs }) => {
      const data: Contribution[] = docs.map((doc) => doc.data() as Contribution);
      cb(data);
    });
  }

  static async get(id: string): Promise<Contribution> {
    const ref = docRef(id, Collection.Contributions);
    const docRes = await getDoc(ref);
    return docRes.data() as Contribution;
  }

  static async getAllLatest() {
    const q = query(this.ref, limit(15));
    const docs = await getDocs(q);
    const data: Contribution[] = [];
    docs.forEach((doc) => {
      data.push(doc.data() as Contribution);
    });
    return data;
  }

  static async getList(data?: { page: number; count: number }) {
    const res = await fx.call<
      typeof data,
      {
        data: ContributionResponse[];
        metadata: { page: number; next: boolean; prev: boolean; pages: number; rows: number };
      }
    >(ApiRoute.GetContributions, data);
    return {
      metadata: res.metadata,
      data: res.data.map(({ createdAt, completedAt, ...item }) => ({
        ...item,
        createdAt: new Timestamp(createdAt._seconds, createdAt._nanoseconds),
        completedAt: completedAt
          ? new Timestamp(completedAt._seconds, completedAt._nanoseconds)
          : completedAt,
      })) as Contribution[],
    };
  }
}
