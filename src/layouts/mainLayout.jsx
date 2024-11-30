import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Container from "../components/container";
//import Footer from "../components/footer";

export default function MainLayout() {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
