import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/auth/AuthProvider";
import { useState, useEffect } from "react";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-primary-600 border-b-2 border-primary-900 flex flex-wrap items-center justify-between p-4 md:p-6">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/">
          <img src="src/assets/logo.svg" alt="Logo" className="w-28 sm:w-36" />
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <BurgerMenu isOpen={isMenuOpen} />
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex items-center mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
            <Link to="/">Início</Link>
          </Button>
          <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
            <Link to="/pets">Pets</Link>
          </Button>

          {!user.token ? (
            <>
              <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
                <Link to="/registrar">Registrar</Link>
              </Button>
            </>
          ) : (
            <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
              <Link to="#" onClick={user.logout}>
                Logout
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
