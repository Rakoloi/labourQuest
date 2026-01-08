//firebase import 
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../config";
import { doc, getDoc } from "firebase/firestore";

export type AuthResult = {
  results: boolean;
  message: string;
};

const UserAuth = async(email: string, password: string): Promise<AuthResult> => {
    //check email format:
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log(docSnap.data().AccountStatus);
            if(docSnap.data().AccountStatus != "Active"){
                //setError("your account is not active, contact the administrator");
                return {results: false, message: "your account is not active, contact the administrator"}
            }
            else{
                //route.push('/dashboard');
                return {results: true, message: "logged in"}
            }
        }else{
                    //console.log("document does not exist");
            //setError("user account does not exist");
            return {results: false, message: "user account does not exist"}
        }
    }catch{
        return {results: false, message: "failed to log in, please try again"}
    }
}

export default UserAuth;