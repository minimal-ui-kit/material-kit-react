import { doc } from 'firebase/firestore';
import { db } from 'src/configs';
import { Collection } from 'src/constants/factory';

export function docRef(id: string, collection: Collection) {
  return doc(db, collection, id);
}
