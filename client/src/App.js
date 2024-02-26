// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPresenter from './presenter/LoginPresenter';
// import RegisterPresenter from './presenter/RegisterPresenter';
// import ApplicationPresenter from './presenter/ApplicationPresenter';
// import ApplicationsListPresenter from './presenter/ApplicationsListPresenter';
// import Dashboard from './view/Dashboard';
// import NotAuthorized from './view/NotAuthorized';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout';

// function App() {

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Navigate replace to="/login" />} />
//           <Route path="/login" element={
//             <Layout showHeader={false}>
//               <LoginPresenter />
//             </Layout>
//           } />
//           <Route path="/register" element={
//             <Layout showHeader={false}>
//               <RegisterPresenter />
//             </Layout>
//           } />
//           <Route path="/dashboard" element={
//             <Layout showHeader={true}>
//               <ProtectedRoute><Dashboard /></ProtectedRoute>
//             </Layout>
//           } />
//           <Route path="/apply" element={
//             <Layout showHeader={true}>
//               <ProtectedRoute><ApplicationPresenter /></ProtectedRoute>
//             </Layout>
//           } />
//           <Route path="/applications" element={
//             <Layout showHeader={true}>
//               <ProtectedRoute allowedRoles={[1]}>
//                 <ApplicationsListPresenter />
//               </ProtectedRoute>
//             </Layout>
//           } />
//           <Route path="/not-authorized" element={
//             <Layout showHeader={true}>
//               <NotAuthorized />
//             </Layout>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import {useEffect} from 'react';

function App() {
  const makeAPICall = async () => {
    try {
      const response = await fetch('https://myapp-backend-ys93.onrender.com', {mode: 'cors'});
      const data = await response.json();
      console.log({data});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);
  return (
    <div className="App">
      <h1>Called server on other domain</h1>
    </div>
  );
}

export default App;