//firebase imports:
import { db } from "@/config";
import { doc, getDoc, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";

interface jobResults{
    result: boolean,
    message: string
}

// export interface Job {
//     title: string;
//     description: string;
//     pay: string;
//     category: string;
//     year: number;
//     docId: string;
// }

const Accept = async(docId: string, email: string, jobOwner: string): Promise<jobResults>  => {
    try{
        const sourceRef = doc(db, "Users", jobOwner, "JobsCreated", docId);

        //Read the file data:
        const snapshot = await getDoc(sourceRef);
        if(!snapshot.exists()){
            return {result: false, message: "job not found..."}
            //throw new Error("Job does not exist");
        }
        const jobData = snapshot.data();

        const destinationRef = doc(db, "Users", email, "JobsAccepted", docId);

        //copy from jobs created to jobs accepted:
        await setDoc(destinationRef, {...jobData, AcceptedDate: serverTimestamp()})

        //delete a document from jobs created:
        await deleteDoc(sourceRef);
        return {result: true, message: "job accepted!"}
    }catch(error: any){
        console.log(error);
        return {result: false, message: "error occured..."}
    }   
}

export default Accept;