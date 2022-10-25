import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Provider} from "react-redux";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/signIn" element={<SignIn />}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
