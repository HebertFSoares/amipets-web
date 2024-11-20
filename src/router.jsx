import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "./layouts/mainLayout";

import HomeView from "./views/home";
import PetsView from "./views/pets";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomeView />}/>
            <Route path="/pets" element={<PetsView />}/>
        </Route>
    )
)