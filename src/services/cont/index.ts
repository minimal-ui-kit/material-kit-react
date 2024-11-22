import { getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { Collection } from "src/constants";
import { colRef, docRef } from "src/utils";
import { Contribution, ContributionStatus } from "./contribute.dto";

export default class ContributionService {
    static async getByUserId(id:string,count=12){
        console.log('ID:>>',id)
        const ref = colRef(Collection.Contributions);
        const q = query(ref,where('donor.id','==',id), limit(count))
        const docs = await getDocs(q)
        const data:Contribution[] = []
        docs.forEach(doc=>{
            data.push(doc.data() as Contribution)
        })
        return data
    }

    static async get(id: string): Promise<Contribution> {
        const ref = docRef(id, Collection.Contributions);
        const docRes = await getDoc(ref);
        return docRes.data() as Contribution;
    }

    static async getAllLatest(){
        const ref = colRef(Collection.Contributions);
        const q = query(ref, limit(12))
        const docs = await getDocs(q)
        const data:Contribution[] = []
        docs.forEach(doc=>{
            data.push(doc.data() as Contribution)
        })
        return data
    }

}