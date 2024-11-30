import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/auth/AuthProvider";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { MdAdminPanelSettings } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";  // Para verificar o tamanho da tela
import BurgerMenu from "./BurgerMenu"; // Importando o BurgerMenu

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Verificando se está em modo mobile

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const isAdmin = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.isAdmin;
    } catch (err) {
      console.error("Erro ao decodificar o token:", err);
      return false;
    }
  };

  return (
    <header className="bg-primary-600 border-b-2 border-primary-900 flex flex-wrap items-center justify-between p-4 md:p-6">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/">
          <img src="https://i.imgur.com/VBOOjTq.png" alt="Logo" className="w-28 sm:w-36" />
        </Link>

        {/* Exibe o BurgerMenu apenas em telas pequenas (mobile) */}
        {isMobile && <BurgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      </div>

      {/* Menu de navegação */}
      <nav className={`${isMenuOpen || !isMobile ? "block" : "hidden"} w-full md:w-auto md:flex items-center mt-4 md:mt-0`}>
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
            <Link to="/">Início</Link>
          </Button>
          <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
            <Link to="/pets">Pets</Link>
          </Button>

          {/* Exibindo botões de login e registro caso o usuário não esteja autenticado */}
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
            <>
              {/* Botão de logout e opções de administração para usuários autenticados */}
              <Button className="bg-primary-400 w-full md:w-auto" onClick={handleLinkClick}>
                <Link to="#" onClick={user.logout}>
                  Logout
                </Link>
              </Button>

              {isAdmin() && (
                <Popover className="relative w-full md:w-auto">
                  {({ open }) => (
                    <>
                      <Popover.Button className="bg-primary-400 w-full md:w-auto flex items-center space-x-2">
                        <Button className="bg-primary-400 w-full md:w-auto">Administração</Button>
                      </Popover.Button>
                      <Transition
                        enter="transition duration-300 ease-out"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition duration-200 ease-in"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                      >
                        <Popover.Panel
                          className={`absolute right-0 mt-2 w-48 bg-primary-700 text-white rounded-lg shadow-lg z-20 p-4 flex flex-col space-y-2 ${open ? "block" : "hidden"}`}
                        >
                          <Link
                            to="/admin/pets"
                            onClick={handleLinkClick}
                            className="flex items-center space-x-2 hover:text-primary-300"
                          >
                            <MdAdminPanelSettings />
                            <span>Painel de pets</span>
                          </Link>
                          <Link
                            to="/admin/adocoes"
                            onClick={handleLinkClick}
                            className="flex items-center space-x-2 hover:text-primary-300"
                          >
                            <MdAdminPanelSettings />
                            <span>Painel de adoções</span>
                          </Link>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
