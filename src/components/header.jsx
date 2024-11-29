import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/auth/AuthProvider';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuth();

  return (
    <header className="bg-primary-600 border-b-2 border-primary-900 flex flex-wrap items-center justify-between py-4 px-8 md:px-16">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/">
          <img src="src/assets/logo.svg" alt="Logo" className="w-36" />
        </Link>
        <button
        >
          <BurgerMenu isOpen={isMenuOpen} />
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } w-full md:w-auto md:flex items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
      >
        <div className="space-x-2">
          <Button className="bg-primary-400 w-full md:w-auto">
            <Link to="/">Início</Link>
          </Button>
          <Button className="bg-primary-400 w-full md:w-auto">
            <Link to="/pets">Pets</Link>
          </Button>
        </div>

        {!user.token ? (
          <div className="space-x-2">
            <Button className="bg-primary-400 w-full md:w-auto">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button className="bg-primary-400 w-full md:w-auto">
              <Link to="/registrar">Registrar</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Button className="bg-primary-400 w-full md:w-auto">
              <Link to="#" onClick={user.logout}>
                Logout
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
