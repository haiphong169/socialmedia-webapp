import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import NavBar from './components/NavBar';
import jwtDecode from 'jwt-decode';
import Welcome from './pages/Welcome';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/type';
import { logOutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

// const token = localStorage.FBIdToken;
// if (token) {
//   console.log(token);
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     console.log('expired');
//     store.dispatch(logOutUser());
//     window.location.href = '/login';
//   } else {
//     console.log('not expired');
//     store.dispatch({ type: SET_AUTHENTICATED });
//     axios.defaults.headers.common['Authorization'] = token;
//     store.dispatch(getUserData());
//   }
// }

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/user/:username/post/:postId" element={<User />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
