import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Signin from './components/SignIn';
import PrivateComponent from './components/PrivateComponent';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>Home</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

