import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Signin from './components/SignIn';
import Home from './components/Home';
import Courses from './components/courses/courses';
// import store from './store'
import Teacher from './components/teacher/Teacher';
import EduDash_Login from './components/teacher/Edudashlogin';
import Edudashboard from './components/teacher/Edudashboard'
import PrivateComponent from './components/PrivateComponent';
import PrivateEdu from './components/teacher/PrivateEdu';
import Liveclass from './components/live/Liveclass';
import Booking from './components/live/Booking';
import Admindashboard from './components/admin/Admindashboard';

// Admin panal
import SchoolForm from './components/admin/SchoolForm';
import Dashboard from './components/admin/Dashboard';
import Analyticshool from './components/admin/Analytics';
import Settingschool from './components/admin/Setting';

function App() {

  return (

    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/courses/:path" element={<Courses />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/liveclass/:path" element={<Liveclass />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schoolform" element={<SchoolForm />} />
          <Route path="/analyticschool" element={<Analyticshool />} />
          <Route path="/settingschool" element={<Settingschool />} />

          <Route path="/edudashlogin" element={<PrivateComponent />} >
            <Route index element={<EduDash_Login />} />
          </Route>
          <Route path="/edudashboard" element={<PrivateEdu />} >
            <Route index element={<Edudashboard />} />
          </Route>

        </Routes>
      </Router>
    </div>
    // <Provider store={store}></Provider>

  );
}

export default App;

