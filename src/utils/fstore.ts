import { doc, collection } from 'firebase/firestore';
import { db } from 'src/configs';
import { Collection } from 'src/constants/factory';

export function docRef(id: string, col: Collection) {
  return doc(db, col, id);
}

export function colRef(col:Collection){
  return collection(db,col)
}
