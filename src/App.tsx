
import UserForm from './components/UserForm';

import {  Navigate, Route, Routes } from 'react-router-dom';
import SecondPage from './components/SecondPage';

const App = () => {
  const userDetails = localStorage.getItem('userDetails');

  return (

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second-page"
          element={userDetails ? <SecondPage /> : <Navigate to="/" replace />}
        />
      </Routes>

  );
};

export default App;
