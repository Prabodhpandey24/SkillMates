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
        </Routes>
      </Router>
    </div>
    // <Provider store={store}></Provider>
    
  );
}

export default App;

