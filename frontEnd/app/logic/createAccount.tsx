//firebase imports
import {auth, db} from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"

interface createResults{
    results: boolean,
    message: string
}

const CreateAccount = async(name: string, surname: string, email: string, phoneNumber: string, password: string, location: string, availability: string ): Promise<createResults> => {
    //check for email format

    try{
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "Users", email), {
            Email: email,
            Name: name,
            Surname: surname,
            AccountStatus: "Active",
            Phone: phoneNumber,
            Location: location,
            Availability: availability,
        });
        //handle profile picture
        
        return {results: true, message: ""};
    }catch(err: any){
        console.log(err.message);
        return {results: false, message: ""}
    }
}

export default CreateAccount;