// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import '../App.css';
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Clock from "./Clock";
// import Backendapi from "../Backendapi";
// import Success from "./Success";
// import SuperUserDashboard from "../SuperUser/SuperUserDashboard";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [objectId, setObjectId] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [date, setDate] = useState("");
//   const [userType, setUserType] = useState("normal"); // Added userType state
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval = setInterval(() => {
//       setDate(new Date().toLocaleString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   function handleSubmit(event) {
//     event.preventDefault();
//     const data = {
//       email: email,
//       password: password,
//       objectId: objectId,
//       isSuperUser: userType === "super" // Set isSuperUser based on userType
//     };

//     // axios call
//     localStorage.setItem("email", email);
//     localStorage.setItem("objectId", objectId);

//     axios
//       .post(`${Backendapi.REACT_APP_BACKEND_API_URL}/user/login`, data)
//       .then((res) => {
//         toast.success("Login Success 😊", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//         });
//         console.log(res);
//         localStorage.setItem("token", JSON.stringify(res.data.token));
//         localStorage.setItem('objectId', JSON.stringify(res.data.user['_id']));

//         // Check if the user is a superuser
//         if (res.data.user.isSuperUser) {
//           // Redirect to the superuser dashboard
//           navigate("/dashboard");
//         } else {
//           // Redirect to the normal user dashboard
//           navigate("/Calendar");
//         }
//       })
//       .catch((err) => {
//         toast.error("Login Failed: Invalid credentials 😫");
//         console.log(err);
//       });
//   }

//   function toggleShowPassword() {
//     setShowPassword(!showPassword);
//   }

//   return (
//     <div>
//       {/* <Clock /> */}
//       <div className="sl-screen flex" >
//         <Navbar />
//       </div>
//       <div className="w-screen h-[90vh] flex  justify-center  items-center login-page" >
//         <div className="blur-container">
//           <form onSubmit={(e) => handleSubmit(e)} className="d-flex-col w-[100%] space-y-4 align-item-center  ">
//             <h1 className="text-center text-xl"> 🆂🅸🅶🅽🅸🅽</h1>
//             <div className="d-flex justify-content-between">
//               <label className="text-xl ">𝐄𝐦𝐚𝐢𝐥</label>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="text"
//                 required="Please enter Your Email"
//                 placeholder="Enter Your Email"
//                 className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
//               />
//             </div>
//             <div className="flex">
//               <label className="text-xl ">𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝 </label>
//               <div className="relative">
//                 <input
//                   onChange={(e) => setPassword(e.target.value)}
//                   type={showPassword ? "text" : "password"}
//                   required="Please enter Your Password"
//                   placeholder="Enter Your Password"
//                   className="border border-zinc-400 outline-none px-6 py-2 text-black"
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleShowPassword}
//                   className="absolute top-1/2 right-2 transform -translate-y-1/2"
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <EyeIcon className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             {/* SuperUser and Normar User Dropdown */}
//             {/* <div className="flex">
//               <label className="text-xl ">𝐔𝐬𝐞𝐫 𝐓𝐲𝐩𝐞</label>
//               <select
//                 value={userType}
//                 onChange={(e) => setUserType(e.target.value)}
//                 className="border border-zinc-400 outline-none px-6 py-2 text-black"
//               >
//                 <option value="normal">Normal User</option>
//                 <option value="super">Super User</option>
//               </select>
//             </div> */}
//             <div className="w-[100%]" style={{ textAlign: "center" }}>
//               <button type="submit" className="bg-blue-300 rounded-lg">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../App.css';
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clock from "./Clock";
import Backendapi from "../Backendapi";
import Success from "./Success";
import SuperUserDashboard from "../SuperUser/SuperUserDashboard";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [objectId, setObjectId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let interval = setInterval(() => {
            setDate(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Function to set the superuser email dynamically
    const setSuperUserEmail = (email) => {
        Backendapi.REACT_APP_SuperUser_EMAIL = email;
    };

   
    

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
            objectId: objectId,
        };

        localStorage.setItem("email", email);
        // localStorage.setItem("objectId", objectId);
        // const token = localStorage.getItem("token"); // Get the token from localStorage
        // console.log(token)
        axios
            .post(`${Backendapi.REACT_APP_BACKEND_API_URL}/user/login`, data)
            .then((res) => {

                toast.success("Login Success 😊", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });

                console.log(res);
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("username", JSON.stringify(res.data.user.username));
                localStorage.setItem('objectId', JSON.stringify(res.data.user['_id']));
                localStorage.setItem('isSuperUser', JSON.stringify(res.data.user.isSuperUser));

                console.log(res.data.user.username)

                if (res.data.user.isSuperUser) {
                    // Set the superuser email dynamically
                    setSuperUserEmail(res.data.user.email);
                    console.log(res.data.user.email)
                    navigate("/DispalyEvents");
                } else {
                    navigate("/Calendar");
                }
            })
            .catch((err) => {
                toast.error("Login Failed: Invalid credentials 😫");
                console.log(err);
            });
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        // <div>
        //     <div className="sl-screen flex" >
        //         <Navbar />
        //     </div>
        //     <div className="w-screen h-[90vh] flex  justify-center  items-center login-page" >
        //         <div className="blur-container">
        //             <form onSubmit={(e) => handleSubmit(e)} className="d-flex-col w-[100%] space-y-4 align-item-center  ">
        //                 <h1 className="text-center text-xl"> 🆂🅸🅶🅽🅸🅽</h1>
        //                 <div className="d-flex justify-content-between">
        //                     <label className="text-xl ">𝐄𝐦𝐚𝐢𝐥</label>
        //                     <input
        //                         onChange={(e) => setEmail(e.target.value)}
        //                         type="text"
        //                         required="Please enter Your Email"
        //                         placeholder="Enter Your Email"
        //                         className=" border border-zinc-400 outline-none  px-6 py-1 text-black "
        //                     />
        //                 </div>
        //                 <div className="flex">
        //                     <label className="text-xl ">𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝 </label>
        //                     <div className="relative">
        //                         <input
        //                             onChange={(e) => setPassword(e.target.value)}
        //                             type={showPassword ? "text" : "password"}
        //                             required="Please enter Your Password"
        //                             placeholder="Enter Your Password"
        //                             className="border border-zinc-400 outline-none px-6 py-1 text-black"
        //                         />
        //                         <button
        //                             type="button"
        //                             onClick={toggleShowPassword}
        //                             className="absolute top-1/2 right-2 transform -translate-y-1/2"
        //                         >
        //                             {showPassword ? (
        //                                 <EyeOffIcon className="h-5 w-5 text-gray-400" />
        //                             ) : (
        //                                 <EyeIcon className="h-5 w-5 text-gray-400" />
        //                             )}
        //                         </button>
        //                     </div>
        //                 </div>
        //                 <div className="w-[100%]" style={{ textAlign: "center" }}>
        //                     <button type="submit" className="bg-blue-300 rounded-lg">
        //                         Login
        //                     </button>
        //                 </div>
        //                 <div className="text-center">
        //                     <p>
        //                         𝕯𝖔𝖓'𝖙 𝖍𝖆𝖛𝖊 𝖆𝖓 𝖆𝖈𝖈𝖔𝖚𝖓𝖙?{" "}
        //                         <Link to="/register" className="text-Darkblue">
        //                             Register
        //                         </Link>
        //                     </p>
        //                 </div>


        //             </form>


        //         </div>
        //     </div>
        // </div>

        <div>
            <div className="sl-screen flex" >
                <Navbar />
            </div>
            <div className="w-screen h-[90vh] flex  justify-center  items-center login-page" >
                <div className="blur-container">
                    <form onSubmit={(e) => handleSubmit(e)} className="d-flex-col w-[100%] space-y-4 align-item-center  ">
                        <h1 className="text-center text-xl">LOGIN</h1>
                        <div className="d-flex justify-content-between">
                            <label className="text-xl ">𝐄𝐦𝐚𝐢𝐥</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                required="Please enter Your Email"
                                placeholder="Enter Your Email"
                                className=" border border-zinc-400 outline-none  px-6 py-1 text-black "
                            />
                        </div>
                        <div className="flex">
                            <label className="text-xl">𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝</label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    required="Please enter Your Password"
                                    placeholder="Enter Your Password"
                                    className="border border-zinc-400 outline-none px-6 py-1 text-black"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center rounded-full bg-transparent "
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="w-[100%]" style={{ textAlign: "center" }}>
                            <button type="submit" className="bg-blue-300 rounded-lg">
                                Login
                            </button>
                        </div>
                        <div className="text-center">
                            <p>
                                𝕯𝖔𝖓'𝖙 𝖍𝖆𝖛𝖊 𝖆𝖓 𝖆𝖈𝖈𝖔𝖚𝖓𝖙?{" "}
                                <Link to="/register" className="text-Darkblue">
                                    Register
                                </Link>
                            </p>
                        </div>


                    </form>


                </div>
            </div>
        </div>
    );
}

export default Login;












