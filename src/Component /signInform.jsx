import React from "react";
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import Logo from'../Asset/Gaana1.png'




function SignInForm({setIsLogin, setToken}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = {email, password, appType : "music"}
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'f104bi07c490',
                    'accept': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const datas = await response.json();
            if (datas.status === "fail") {
                alert("Wrong email or password");
            }
            else {
                setIsLogin(true)
                setToken(datas.token)
                navigate('/')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        // <div className="bg-[url('https://d3dyfaf3iutrxo.cloudfront.net/general/upload/65dd66ed06d1460aaf70cd440700c909.png')] bg-cover bg-center h-screen w-screen">
            <>
                <form onSubmit={handleSignIn} className="drop-shadow-sm w-[400px] flex flex-col px-4 py-2 mt-5 max-md:px-5 max-md:max-w-full">
                    <img src={Logo} alt="Gaana Logo" className="h-12 flex justify-center mx-auto " />
                    <h1 className="text-white text-2xl text-center mt-10">Listen to Gaana Non-Stop</h1>
                    <h2 className="text-2xl text-red-600 text-center mt-5">Log In</h2>
                    <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-red-500  flex flex-col justify-center px-1.5 py-1.5 mt-1.5 bg-black bg-opacity-0"
                    />
                    <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-red-500 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
                    />
                    <button
                    type="submit"
                    className="flex flex-col px-1.5 py-1 mt-9 text-lg text-white whitespace-nowrap max-md:max-w-full justify-center items-center bg-red-600 rounded-lg border border-red-500 border-solid"
                    >
                    Log In
                    </button>
                </form>
                <div className="text-white text-center mt-4">
                    Already have an account? <Link to="/SignUp" className="text-red-600 underline">Create one <i className="fa-solid fa-caret-right" style={{ color: 'red' }}></i></Link>
                </div>
            </>
  );
}

export default SignInForm;