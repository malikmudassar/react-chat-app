import { auth, provider} from "../firebase-config";
import { signInWithPopup } from  "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();
export const Auth = (props) => {
    const { setIsAuth }  = props;
    const signInwithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
            console.log(result);
        }
        catch(err){
            console.error(err);
        }
    }
    return <div className="auth">
        <p>Sign in with Google.</p>
        <button onClick={signInwithGoogle}>SignIn</button>
    </div>
}