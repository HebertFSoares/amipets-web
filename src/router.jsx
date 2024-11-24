import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "./layouts/mainLayout";

import HomeView from "./views/home";
import PetsView from "./views/pets";
import LoginPage from "./views/login";
import SignUpPage from "./views/signUp";
import OTPPage from "./views/otp";
import PetDetail from "./views/pet";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomeView />}/>
            <Route path="/pets" element={<PetsView />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<SignUpPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/pets/:id" element={<PetDetail />} />
        </Route>
    )
)