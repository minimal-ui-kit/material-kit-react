import type { Collection } from 'src/constants/factory';

import { doc, collection } from 'firebase/firestore';

import { db } from 'src/configs';

export function docRef(id: string, col: Collection) {
  return doc(db, col, id);
}

export function colRef(col:Collection){
  return collection(db,col)
}
