import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import MainPage from "./components/Layouts/MainPage";
import LoginPage from "./components/Layouts/LoginPage";
import RegisterPage from "./components/Layouts/RegisterPage";
import {UserContextProvider} from "./components/UserContext";
import CreatePost from "./components/CreatePost";
import FullPostPage from "./components/FullPostPage";
import EditPost from "./components/EditPost";

function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path='/' element={<Layout/> }>
                  <Route index element={<MainPage/>}/>
                  <Route path='/login' element={<LoginPage/>}/>
                  <Route path='/register' element={<RegisterPage/>}/>
                  <Route path='/create' element={<CreatePost/>}/>
                  <Route path='/post/:id' element={<FullPostPage/>}/>
                  <Route path='/edit/:id' element={<EditPost/>}/>
              </Route>
          </Routes>
      </UserContextProvider>


  );
}

export default App;
