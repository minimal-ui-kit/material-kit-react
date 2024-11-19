import { getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { fx } from 'src/configs';
import { Collection } from 'src/constants/factory';
import { ApiRoute } from 'src/constants/fxns';
import { docRef } from 'src/utils';
import { User, UserUpdateBody } from './user.dto';

export default class UserService {
  static async get(id: string): Promise<User> {
    const ref = docRef(id, Collection.Users);
    const docRes = await getDoc(ref);
    return docRes.data() as User;
  }

  static async me() {
    return fx.call<{}, User>(ApiRoute.GetUser, {});
  }

  static async create(data: User) {
    const ref = docRef(data.id, Collection.Users);
    await setDoc(ref, data);
    return data;
  }

  static async update(id: string, data: UserUpdateBody) {
    const ref = docRef(id, Collection.Users);
    await updateDoc(ref, data);
  }
}
