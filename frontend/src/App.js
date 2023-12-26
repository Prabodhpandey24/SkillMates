import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Signin from './components/SignIn';
import PrivateComponent from './components/PrivateComponent';
import Home from './components/Home';
import CourseDetail from './components/coursedetails/coursedetail';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/coursedetail/:courseId" element={<CourseDetail />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;

