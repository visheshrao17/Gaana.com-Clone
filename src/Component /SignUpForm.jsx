import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from'../Asset/Gaana1.png'


function SignUpForm({setToken}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, name, appType : "music" };
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'f104bi07c490',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                const datas = await response.json();
                if (datas.status === "fail") {
                    alert("email already exists.")
                }
                else {
                    setToken(datas.token)
                    navigate('/signin')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    return (
        <form className="drop-shadow-sm	 flex flex-col px-9 py-10 mt-6 max-md:px-5 max-md:max-w-full justify-center item-center"
            onSubmit={handleSubmit} >
                <img src={Logo} alt="Gaana Logo" className="h-12 flex justify-center mx-auto " />
                <h1 className="text-white text-2xl text-center mt-10">Listen to Gaana Non-Stop</h1>
                <h5 className="text-2xl text-red-500 max-md:max-w-full">Create Your Account</h5>

            <input
                id="name"
                type="name"
                placeholder="Name"
                value={name}
                className="border border-red-500 flex mt-5 flex-col justify-center px-1.5 py-1.5 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full text-white "
                onChange={(e) => setName(e.target.value)}
            />
            <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-red-500 flex mt-5 flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full text-white "
            />

           
            <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-red-500  mt-5 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full "
            />

            <button
                type="submit"
                className="flex flex-col px-1.5 py-1 mt-9 text-lg text-white whitespace-nowrap max-md:max-w-full justify-center items-center bg-red-600 rounded-lg border border-red-500 border-solid"
            >
                Sign Up
            </button>
            
            <p className="text-white mt-5">
                Already have an account? <Link to="/signin" className="text-red-500 underline"> Log In <i class="fa-solid fa-caret-right" style={{ color: 'blue' }}></i> </Link>
            </p>
            
        </form>
    );
}

export default SignUpForm
