// import { useState } from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="w-full  bg-white text-black border border-[#add7ee]" >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex h-18 items-center justify-between">

//           {/* Logo */}
//           <Link to="/">
//             <h1 className="text-2xl font-insta text-gray-800">
//               SecurePass
//             </h1>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center font-bold font-inter gap-6">
//             <a
//               href="#"
//               className="px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-900/90 hover:text-white hover:shadow-md"
//             >
//               Home
//             </a>

//             <a
//               href="#"
//               className="px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-900/90 hover:text-white hover:shadow-md"
//             >
//               About
//             </a>

//             <a
//               href="#"
//               className="px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-900/90 hover:text-white hover:shadow-md"
//             >
//               Features
//             </a>

//             {/* Login Button */}
//             <Link to="/login">
//               <button className="group  relative h-12 w-20 overflow-hidden rounded-xl bg-blue-700 px-4 text-[16px] font-medium text-white transition-all duration-300">
//                 <div className="z-14 flex flex-col transition-transform duration-700 ease-in-out group-hover:-translate-y-[40px]">
//                   <span className="leading-10 mt-1 text-center">Login</span>
//                   <span className="leading-10 mt-1 text-center">Login</span>
//                 </div>
//               </button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="bg-white px-4 pb-4 md:hidden">
//           <a href="#" className="block py-2 hover:text-amber-400">
//             Home
//           </a>
//           <a href="#" className="block py-2 hover:text-amber-400">
//             About
//           </a>
//           <a href="#" className="block py-2 hover:text-amber-400">
//             Features
//           </a>

//           <Link to="/login">
//             <button className="mt-2 w-full rounded bg-amber-400 py-2 text-black">
//               Login
//             </button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth(); // 👈 token check

  return (
    <nav className="w-full bg-white text-black border border-[#add7ee]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-18 items-center justify-between">

          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl font-insta text-gray-800">
              SecurePass
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center font-bold font-inter gap-6">
            <a className="px-4 py-1.5 rounded-full hover:bg-gray-900/90 hover:text-white">
              Home
            </a>

            <a className="px-4 py-1.5 rounded-full hover:bg-gray-900/90 hover:text-white">
              About
            </a>

            <a className="px-4 py-1.5 rounded-full hover:bg-gray-900/90 hover:text-white">
              Features
            </a>

            {/* 🔥 CONDITIONAL BUTTON */}
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="group relative h-12 w-24 overflow-hidden rounded-xl bg-blue-700 px-4 text-white">
                  <div className="flex flex-col transition-transform duration-700 group-hover:-translate-y-[40px]">
                    <span className="leading-10 mt-1 text-center">Login</span>
                    <span className="leading-10 mt-1 text-center">Login</span>
                  </div>
                </button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button className="group relative h-12 w-28 overflow-hidden rounded-xl bg-emerald-600 px-4 text-white">
                  <div className="flex flex-col transition-transform duration-700 group-hover:-translate-y-[40px]">
                    <span className="leading-10 mt-1 text-center">Dashboard</span>
                    <span className="leading-10 mt-1 text-center">Dashboard</span>
                  </div>
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-2xl md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white px-4 pb-4 md:hidden">
          <a className="block py-2">Home</a>
          <a className="block py-2">About</a>
          <a className="block py-2">Features</a>

          {!isAuthenticated ? (
            <Link to="/login">
              <button className="mt-2 w-full rounded bg-blue-600 py-2 text-white">
                Login
              </button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <button className="mt-2 w-full rounded bg-emerald-600 py-2 text-white">
                Dashboard
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
