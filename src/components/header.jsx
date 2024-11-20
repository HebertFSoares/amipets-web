import { Link } from "react-router-dom";
import Button from "./button";

export default function Header() {
    return (
        <div className="bg-primary border-b-2 border-primary-900 flex flex-row justify-between py-4 px-16">
            <div>
                Logo
            </div>
            <div className="space-x-2">
                <Button>
                    <Link to="/">Início</Link>
                </Button>
                <Button>
                    <Link to="/pets">Pets</Link>
                </Button>
            </div>
            <div>
                <Link to="/login">Entrar</Link>
                <Link to="/registrar">Registrar</Link>
            </div>
        </div>
    )   
}