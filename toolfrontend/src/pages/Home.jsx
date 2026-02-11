
// import React from "react";
// import { featuresData } from "../data/Featuresdata.jsx";

// export const Home = () => {
//   return (
//     <div className="relative z-10 text-gray-800 ">

//       {/* HERO SECTION */}
//       <section
//         className="
//           min-h-screen
//           px-6
//           bg-gradient-to-br
//           from-[#afb2b7]
//           via-[#e2e6ec]
//           to-[#a1bee7]
//         "
//       >
//         {/* HERO */}
//         {/* <div className="min-h-[90vh] flex flex-col justify-center items-center text-center">
//           <h1
//             className="
//               text-4xl md:text-6xl font-extrabold mb-4
//               bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600
//               bg-clip-text text-transparent
//               animate-fadeUp
//             "
//           >
//             SecurePass
//           </h1>

//           <p
//             className="
//               text-gray-600 max-w-2xl mb-8 text-lg
//               animate-fadeUp delay-200
//             "
//           >
//             Generate strong passwords, analyze hashes, simulate cracking,
//             and manage credentials securely — all in one powerful toolkit.
//           </p>

//           <button
//             className="
//               px-8 py-3 rounded-full font-semibold text-white
//               bg-gradient-to-r from-blue-600 to-cyan-500
//               hover:scale-105 hover:shadow-lg transition-all duration-300
//               animate-fadeUp delay-400
//             "
//           >
//             Get Started
//           </button>
//         </div> */}

//         {/* CYBER SECURITY BANNER */}
// <div
//   className="
//     py-24 px-6 min-h-[90vh]
    
//   "
// >
//   <div
//     className="
//       max-w-7xl mx-auto
//       grid grid-cols-1 md:grid-cols-2
//       gap-12 items-center
//     "
//   >
//     {/* LEFT CONTENT */}
//     <div className="space-y-6">
//       <h2 className="text-4xl md:text-5xl font-extrabold text-black">
//         Protect Your
//         <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//           Cyber Security
//         </span>
//       </h2>

//       <p className="text-black max-w-lg">
//         Keep your systems secure by generating strong passwords,
//         understanding vulnerabilities, and staying protected against
//         modern cyber threats.
//       </p>

//       <ul className="space-y-3 text-black text-sm">
//         <li>• Keep your software up to date</li>
//         <li>• Use strong and unique passwords</li>
//         <li>• Monitor suspicious network activity</li>
//       </ul>

    
//     </div>

//     {/* RIGHT IMAGE */}
//     <div className="flex justify-center">
//       <img
//         src="/iimage.png"  // replace with your image path
//         alt="Cyber Security Illustration"
//         className="max-w-md  drop-shadow-2xl"
//       />
//     </div>
//   </div>
// </div>


//         {/* FEATURES */}
//         <div className="pb-20">
//           <h2 className="text-3xl font-bold text-center mb-10">
//             Security Tools We Provide
//           </h2>

//           <div className="overflow-hidden w-full">
//             <div className="marquee gap-6">
//               {[...featuresData, ...featuresData].map((item, index) => (
//                 <div
//                   key={index}
//                   className="
//                     w-[420px] h-[220px]
//                     bg-white/80 backdrop-blur
//                     rounded-xl p-5
//                     shadow-md hover:shadow-lg
//                     transition-all duration-300
//                     flex flex-col space-y-1
//                     hover:-translate-y-1
//                   "
//                 >
                  
//                  <div className="flex gap-2">
//                   <div
//                     className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color}
//                   flex items-center justify-center text-white`}>
//                     <item.icon className="w-6 h-6" />

//                  </div>
                  
 
//                   <h3 className="text-base font-semibold mt-2">
//                     {item.title}
//                   </h3>

//                  </div>
//                   <p className="text-gray-600 text-md mt-2 line-clamp-4">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* WHY SECTION */}
//       <section className="py-24 px-6 bg-gradient-to-br from-[rgb(236,242,245)] to-[#dae9f4]">
//         <h2
//           className="text-3xl md:text-4xl font-bold text-center mb-10
//           animate-fadeUp"
//         >
//           Why Choose SecurePass?
//         </h2>

//         <div
//           className="max-w-4xl mx-auto text-center text-gray-600 space-y-5
//           animate-fadeUp delay-200"
//         >
//           <p>
//             Weak passwords are the biggest security risk today.
//             SecurePass helps you understand, generate, and manage
//             credentials safely and efficiently.
//           </p>
//           <p>
//             Designed for students, developers, and security learners,
//             SecurePass turns complex security concepts into practical tools.
//           </p>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-soft-blue py-8 text-center text-gray-500 text-sm border-t">
//         © 2026 SecurePass. All rights reserved.
//       </footer>

      

//     </div>
//   );
// };

import React from "react";
import { featuresData } from "../data/Featuresdata.jsx";

export const Home = () => {
  return (
    <div className="relative z-10 text-gray-800">

      {/* HERO SECTION */}
      <section
        className="
          min-h-[calc(100vh-80px)]
          px-6
          bg-[#E7E6E1]
          flex items-center
        "
      >
        <div
          className="
            max-w-7xl mx-auto w-full
            grid grid-cols-1 lg:grid-cols-2
            gap-16 items-center
          "
        >
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-black">
              
              <span className="block text-blue-600 animate-fadeUp">
                SecurePass
              </span>
            </h1>

            <p className="text-gray-800 max-w-xl text-lg animate-fadeUp duration-150">
              Keep your digital life safe by managing passwords securely, detecting 
              compromised credentials, and monitoring threats in real time
               — all from one powerful platform
            </p>

            <ul className="space-y-3 text-gray-800 text-sm">
              <li>• Generate strong and unique passwords</li>
              <li>• Detect compromised passwords using real-world leaks</li>
              <li>• Securely store and manage your credentials</li>
              <li>• Analyze network activity for suspicious behavior</li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/homepage.png"  // replace with your image path
              alt="Cyber Security Illustration"
              className="w-full animate-fadeUp  max-w-xl object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br
          from-[#afb2b7]
          via-[#e2e6ec]
          to-[#a1bee7]">
        <h2 className="text-3xl font-bold text-center mb-12">
          Security Tools We Provide
        </h2>

        <div className="overflow-hidden w-full">
          <div className="marquee gap-6">
            {[...featuresData, ...featuresData].map((item, index) => (
              <div
                key={index}
                className="
                  w-[420px] h-[220px]
                  bg-white/80 backdrop-blur
                  rounded-xl p-5
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  flex flex-col
                  hover:-translate-y-1
                "
              >
                <div className="flex gap-3 items-start">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color}
                    flex items-center justify-center text-white flex-shrink-0`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-semibold mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-md mt-3 line-clamp-4">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-[rgb(236,242,245)] to-[#dae9f4]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose SecurePass?
        </h2>

        <div className="max-w-4xl mx-auto text-center text-gray-600 space-y-5">
          <p>
            Weak passwords are the biggest security risk today.
            SecurePass helps you understand, generate, and manage
            credentials safely and efficiently.
          </p>
          <p>
            Designed for students, developers, and security learners,
            SecurePass turns complex security concepts into practical tools.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-soft-blue py-8 text-center text-gray-500 text-sm border-t">
        © 2026 SecurePass. All rights reserved.
      </footer>
    </div>
  );
};
