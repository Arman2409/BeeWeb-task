import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Provider} from "react-redux";

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import MainPage from './components/MainPage/MainPage';
import store from './store/store';
import UserPage from './components/UserPage/UserPage';
import NotFound from "./components/NotFound/NotFound";

function App() {
 
  return (
    <Router>
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signUp" element={<SignUp />}/>
            <Route path="/signIn" element={<SignIn />}/>
            <Route path="/userPage/*" element={<UserPage />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Provider>
    </Router>
  );
}

export default App;
