// import { Navbar } from './components/Navbar.jsx'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import { Home } from './pages/Home.jsx'
// import { Login } from './pages/Login.jsx'
// import { Dashboard } from './pages/Dashboard.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx'
// import PassGenerator from './pages/PassGenerator.jsx'
// import Hash_gen from './pages/Hash_gen.jsx'
// import MouseTrailCanvas from './components/MouseTrailCanvas.jsx'
// import CrackPage from './pages/CrackPage.jsx'
// function App() {


//   const location = useLocation();
//   const hideNavbarRoutes = ['/login','/dashboard'];

//   return (

    
//     <div className="">


//       {/* <MouseTrailCanvas /> */}
//         <div className='relative z-10'>
//          {location.pathname === "/" && <Navbar />}
//       {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

//       <Routes>
         
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />

//        <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
              
//             </PrivateRoute>
//           }
//         />
       
//         <Route
//           path="/password-generator"
//           element={
//             <PrivateRoute>
//               <PassGenerator />
              
//             </PrivateRoute>
//           }
//         />


//         <Route
//           path="/hash-generator"
//           element={
//             <PrivateRoute>
//               <Hash_gen />
              
//             </PrivateRoute>
//           }
//         />

//          <Route
//           path="/crack-page"
//           element={
//             <PrivateRoute>
//               <CrackPage />
              
//             </PrivateRoute>
//           }
//         />
//       </Routes>

//          </div>
//     </div>
//   );
// }

// export default App;
import { Navbar } from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import PassGenerator from "./pages/PassGenerator.jsx";
import Hash_gen from "./pages/Hash_gen.jsx";
import CrackPage from "./pages/CrackPage.jsx";
import  PassManager  from "./pages/PassManager.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import  PacketAnalyzer  from "./pages/PacketAnalyzer.jsx";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/password-generator" element={<PassGenerator />} />
          <Route path="/hash-generator" element={<Hash_gen />} />
          <Route path="/crack-page" element={<CrackPage />} />
          <Route path="/pass-manager" element={<PassManager />} />
          <Route path="/packet-analyzer" element={<PacketAnalyzer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
