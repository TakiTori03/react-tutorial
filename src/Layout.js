import {

    Route,
    Routes
} from "react-router-dom";

import App from './App';
import Admin from './components/Admin/Admin';
import Listquiz from './components/User/ListQuiz';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import Register from "./components/Auth/Register";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Questions from "./components/Admin/Content/Question/Questions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
const NotFound = () => {
    return (
        <div className="alert alert-danger container mt-5">
            404  NOT FOUND !!!
        </div>
    )
}
const Layout = () => {
    return (
        <>

            <Routes>

                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<Listquiz />} />
                </Route >
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </>
    )
}

export default Layout;