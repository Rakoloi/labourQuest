import { db } from "@/config";
import { doc, setDoc } from "firebase/firestore";
import * as Crypto from "expo-crypto";

interface jobResults {
    results: boolean,
    message: string,
    
}

const PostJob = async(email: string, jobTitle: string, location: string, phone: string, pay: string, payType: string, jobDescription: string): Promise<jobResults> => {
    
    try{
        const jobId = Crypto.randomUUID();
        await setDoc(doc(db, "Users", email, "JobsCreated", jobId), {
            JobTitle: jobTitle,
            JobDescription: jobDescription,
            Location: location,
            PhoneNumber: phone,
            Pay: pay,
            PayType: payType,
            DateCreated: new Date(),
        })

        return {results: true, message: "job created", }
    }catch(err: any){
        console.log(err);
        return {results: false, message: "unable to create a job", }
    }
}

export default PostJob;