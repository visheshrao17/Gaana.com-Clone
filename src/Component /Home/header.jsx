import { useNavigate } from "react-router-dom";
import Logo from "../../Asset/Gaana1.png"

function Header({ isLogin, setIsLogin }){
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin')
    }
    return(
        <nav className="flex justify-between items-center w-full h-10 bg-slate-900 px-6 py-3 shadow-md border-b-1">
            <div className="flex items-center">
                <img src={Logo} alt="Brand Logo" className="h-8" />
            </div>
            <button
                onClick={handleSignIn}
                className="text-white bg-rgb(0,0,0)"
            >
                {isLogin ? 'Log Out' : 'Log In'}
            </button>
        </nav>

    )
}

export default Header