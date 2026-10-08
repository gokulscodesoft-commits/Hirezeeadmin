// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { SlLogout } from "react-icons/sl";

// function Sidebar() {
//   const navigate = useNavigate();

//   const handleLogout = (e) => {
//     e.preventDefault();

//     toast.success("Logged out successfully!", {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//     // Delay navigation to allow toast to show
//     setTimeout(() => {
//       // clear session/localStorage if needed
//       navigate("/"); 
//     }, 1000);
//   };

//   return (
//     <aside className="sidebar">
//       <nav>
//         {/* ...other sidebar links */}
//         <ul>
//           <li>
//             <a href="/" onClick={handleLogout} className="nav-link">
//               <SlLogout className="icon" /> Logout
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }
