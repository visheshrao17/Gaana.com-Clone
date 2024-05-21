
import SignInForm from "./signInform"



function SignIn({setIsLogin, setToken}) {

    
    return (
        <div className="bg-black min-h-screen flex flex-col p-20 justify-center items-center">
            <div className="flex flex-col items-center justify-center bg-black h-full bg-[url('https://d3dyfaf3iutrxo.cloudfront.net/general/upload/65dd66ed06d1460aaf70cd440700c909.png')] bg-cover bg-center w-[700px]">
                        <SignInForm setIsLogin={setIsLogin} setToken={setToken}/>

            
              
            </div>
            
        </div>
        
    );
}

export default SignIn;