import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth/AuthProvider";

import MainLayout from "./layouts/mainLayout";

import HomeView from "./views/home";
import PetsView from "./views/pets";
import LoginPage from "./views/login";
import SignUpPage from "./views/signUp";
import OTPPage from "./views/otp";
import PetDetail from "./views/pet";
import { PetsViewAdmin } from "./components/PetsViewAdmin/PetsViewAdmin";
import UserEditarPage from "./views/user/editar";

const PrivateRoute = () => {
    const { token, loading } = useAuth();
    if (loading) return "";
    if (!token) return <Navigate to="/login" />;
    return <Outlet />
}

const GuestOnlyRoute = () => {
    const { token, loading } = useAuth();
    if (loading) return "";
    if (token) return <Navigate to="/" />;
    return <Outlet />
}

const AdminRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return "";
    if (!user || !user.isAdmin) {
        return <Navigate to="/login" state={{ message: "Você precisa ser um administrador para acessar esta página." }} />;
    }
    return <Outlet />;
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/pets" element={<PetsView />} />
            <Route path="/pets/:id" element={<PetDetail />} />

            <Route element={<GuestOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registrar" element={<SignUpPage />} />
                <Route path="/otp" element={<OTPPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="user/edit" element={<UserEditarPage />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="/admin/pets/" element={<PetsViewAdmin />} />
            </Route>
        </Route>
    )
)