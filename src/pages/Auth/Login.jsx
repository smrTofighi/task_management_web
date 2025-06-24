import AuthLayout from "../../components/layouts/AuthLayout";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/AuthService";
import AuthTile from "./components/AuthTile";
import AuthButton from "./components/AuthButton";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //? Handle Login From Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
        setError("Please enter a valid email address");
        return;
    }
    if(!password){
        setError("Please enter a password");
        return;
    }
    setError('');

    //* Login API Call
    authService.login(email,password).then((res)=>{
      const {token,role}= res
      if(token){
        localStorage.setItem('token', token);
        updateUser(res);
        //! Redirect based on role
        if (role === "admin"){
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    })

    
  };

  return (
    <AuthLayout>
      <div className="w-full h-3/4 md:h-full flex flex-col justify-start lg:justify-center items-start">
      <AuthTile title={'Welcome Back'} desc={'Please enter your details to login'} />
        <form onSubmit={handleLogin} className="w-[95%]">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="example@email.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <AuthButton title={'LOGIN'} desc={'Don\'t have an account?'} route={'/signup'} routeTitle={'Sign Up'} />
        </form>
      </div>
    </AuthLayout>
  );
};
