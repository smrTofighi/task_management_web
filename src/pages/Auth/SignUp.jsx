import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/Helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/UploadImages";
import authService from "../../services/AuthService";
import AuthTile from "./components/AuthTile";
import AuthButton from "./components/AuthButton";
export const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    //* SignUp API Call
    try {
      // upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);

        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      authService
        .signup(fullName, email, profileImageUrl, password, adminInviteToken)
        .then((res) => {
          const { token, role } = res;
          if (token) {
            localStorage.setItem("token", token);
            updateUser(res);
            // Redirect based on role
            if (role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/user/dashboard");
            }
          }
        });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.log(error);

        setError("Something went wrong, Please try again");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <AuthTile title="Create an Account" desc="Join us today by entering your details below." />
        <form onSubmit={handleSignUp} className="w-[95%]">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder={"Enter your full name"}
              type={"text"}
            ></Input>
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
            />{" "}
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <AuthButton title="SIGN UP" desc="Already have an account?" route="/login" routeTitle="LogIn" />

        </form>
      </div>
    </AuthLayout>
  );
};
