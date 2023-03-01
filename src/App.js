import {createContext, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from "./Components";
import {
    Products,
    AllUser,
    Login,
    Register,
    Add,
    AddProduct,
    AddUser,
    AllProducts
} from "./Pages"
const tokens = localStorage.getItem("token")

export const MyContext = createContext()

function App() {

    const [token, setToken] = useState(tokens ? tokens : null)
    const [edited, setEdited] = useState(false);
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     if (token) {
    //         fetch(process.env.REACT_APP_BECKEND + "/auth/check", {
    //             method: 'POST',
    //             headers: {
    //                 token: token
    //             }
    //         }).then(res => res.json()).then(data => {
    //             if (!data.msg) {
    //                 localStorage.removeItem("token")
    //                 console.log("error");
    //             }
    //             console.log(data);
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }, [token])

    return (

        <>
            <MyContext.Provider value={
                {
                    edited,
                    setEdited,
                    show,
                    setShow,
                    token,
                    setToken
                }
            }>
                <Navbar/>

                <Routes>

                    <Route path='/'
                        element={<AllProducts/>}></Route>
                    <Route path="/auth"
                        element={<AllUser/>}>
                            <Route index element={<Login/>}/>
                            <Route path="/auth/login" element={<Login/>}/>
                            <Route path="/auth/register" element={<Register/>}/>
                        </Route>

                    {
                    !token ? <Route path='/auth'
                        element={<AllUser/>}></Route> : 
                        <Route>

                            <Route path='/auth'
                                element={
                                    <Navigate
                                    to='/'
                                    replace/>
                                }/>
                                
                            <Route path="/my_products" element={<Products/>}></Route>

                            <Route path='/add'
                                element={<Add/>}>
                                <Route path="/add/addUser"
                                element={<AddUser/>}/>
                                <Route path="/add/addProduct"
                                element={<AddProduct/>}/>
                                <Route index
                                element={<AddProduct/>}/>
                            </Route>
                    </Route>
                } </Routes>
            </MyContext.Provider>
        </>

    );
}

export default App;
