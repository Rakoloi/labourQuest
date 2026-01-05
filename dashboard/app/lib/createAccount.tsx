//firebase imports
import {auth, db} from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface CreateUserResult {
  success: boolean;
  message: string;
}

const CreateUserAccount = async(name: string, surname: string, email: string, password: string ): Promise<CreateUserResult> => {
    //check email format && password strength requirements:

    try{
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "Admins", email), {
            Name: name,
            Surname: surname,
            AccountStatus: "Inactive"
        });

        return {success: true, message: ""};

    }catch(err:any){
        console.log(err.message);
        return {success: false, message: ""}
    }

}

export default CreateUserAccount;