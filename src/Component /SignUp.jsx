import SignUpForm from './SignUpForm';


function SignUp({setToken}) {
    return (
        <div className="bg-black min-h-screen flex flex-col p-20 justify-center items-center">
            <section className="flex flex-col items-center justify-center bg-black h-full bg-[url('https://d3dyfaf3iutrxo.cloudfront.net/general/upload/65dd66ed06d1460aaf70cd440700c909.png')] bg-cover bg-center w-[700px]">
                    <SignUpForm setToken={setToken}/>
           
            </section>
        
        </div>
    );
}

export default SignUp