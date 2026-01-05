//firebase imports
import { signInWithEmailAndPassword } from "firebase/auth"
import {auth, db} from "../../config";
import { doc, getDoc } from "firebase/firestore";

interface signInResults {
    results: boolean,
    message: string
}

const SignIn = async(email: string, password: string): Promise<signInResults> => {

    //verify if the email is correct:
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const docRef = doc(db, "Admins", email);
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
    //return;
}

export default SignIn;