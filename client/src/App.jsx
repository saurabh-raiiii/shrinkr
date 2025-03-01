import { ToastContainer} from 'react-toastify';
import {Routes, Route} from "react-router-dom";
import Home from "./Home.jsx";

function App() {

    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
