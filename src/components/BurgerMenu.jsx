import { useAuth } from '@/hooks/auth/AuthProvider';
import { Popover, Transition } from '@headlessui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function BurgerMenu() {
  const categories = [
    {
      label: 'Eu',
      links: [
        { linkTo: '/user/', label: 'Minhas adoções' },
        { linkTo: '/user/favorites', label: 'Meus pets favoritos' },
        { linkTo: '/pets', label: 'Buscar pets' },
        { linkTo: '/user/edit', label: 'Editar perfil' },
      ],
    },
    {
      label: 'Administração',
      links: [
        { linkTo: '/admin/', label: 'Painel de administração' },
        { linkTo: '/admin/pets', label: 'Painel de pets' },
        { linkTo: '/admin/adocoes', label: 'Painel de adoções' },
        { linkTo: '/admin/adotantes', label: 'Painel de adotantes' },
      ],
    },
    {
      links: [{ linkTo: '#', label: 'Logout' }],
    },
  ];
  const user = useAuth();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button as={Button} className="bg-primary-400 focus:outline-none">
            <CiMenuBurger
              className={`transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
            />
          </Popover.Button>

          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Popover.Panel className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-20 p-4 flex flex-col space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="bg-primary-400 rounded-md p-4 flex flex-col text-right">
                  {category.label && <p className="font-bold mb-2">{category.label}</p>}
                  {category.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.linkTo}
                      onClick={link.label === 'Logout' ? user.logout : undefined}
                      className="text-text-900 underline hover:text-text-500"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </Popover.Panel>
          </Transition>

          <Popover.Overlay className="fixed inset-0 bg-black/25" />
        </>
      )}
    </Popover>
  );
}

function Category({ children }) {
  return (
    <div className="bg-primary-400 rounded-md p-4 flex flex-col text-right text-text-900 underline">
      {children}
    </div>
  );
}
