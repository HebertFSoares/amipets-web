import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/auth/AuthProvider";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuth();

  return (
    <div className="bg-primary-600 border-b-2 border-primary-900 flex flex-row justify-between items-center py-4 px-16">
      <div>
        <Link to="/">
          <img src="src/assets/logo.svg" alt="" className="w-36" />
        </Link>
      </div>
      <div className="space-x-2">
        <Button className="bg-primary-400">
          <Link to="/">Início</Link>
        </Button>
        <Button className="bg-primary-400">
          <Link to="/pets">Pets</Link>
        </Button>
      </div>
      {!user.token &&
        <div className="flex space-x-2">
          <Button className="bg-primary-400">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button className="bg-primary-400">
            <Link to="/registrar">Registrar</Link>
          </Button>
        </div>
      }
      {user.token &&
        <div className="flex space-x-2">
          <BurgerMenu />
          <Button className="bg-primary-400">
            {/* TODO: Trocar pelo hamburguer e fazer o modal com todas as opções e afins */}
            <Link to="#" onClick={user.logout}>Logout</Link>
          </Button>
        </div>
      }
    </div>
  );
}