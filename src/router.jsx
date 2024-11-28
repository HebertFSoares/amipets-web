import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth/AuthProvider";

import MainLayout from "./layouts/mainLayout";

import HomeView from "./views/home";
import PetsView from "./views/pets";
import LoginPage from "./views/login";
import SignUpPage from "./views/signUp";
import OTPPage from "./views/otp";
import PetDetail from "./views/pet";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/login" />;
    return <Outlet />
}

const GuestOnlyRoute = () => {
    const user = useAuth();
    if (user.token) return <Navigate to="/" />;
    return <Outlet />
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomeView />}/>
            <Route path="/pets" element={<PetsView />}/>
            <Route path="/pets/:id" element={<PetDetail />} />
            
            <Route element={<GuestOnlyRoute/>}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registrar" element={<SignUpPage />} />
                <Route path="/otp" element={<OTPPage />} />
            </Route>
        </Route>
    )
)