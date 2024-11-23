import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "./layouts/mainLayout";

import HomeView from "./views/home";
import PetsView from "./views/pets";
import Login from "./layouts/loginLayout";
import Cadastro from "./layouts/signUpLayout";
import OTP from "./layouts/otpLayout";
import PetDetail from "./layouts/petLayout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomeView />}/>
            <Route path="/pets" element={<PetsView />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Cadastro />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/pets/:id" element={<PetDetail />} />
        </Route>
    )
)