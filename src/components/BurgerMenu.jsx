import { Popover, Transition } from "@headlessui/react";
import { CiMenuBurger } from "react-icons/ci";
import { FiLogOut, FiUser, FiEdit, FiSearch } from "react-icons/fi";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdPets, MdAdminPanelSettings } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function BurgerMenu() {
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

  const isLoggedIn = !!localStorage.getItem("authToken");

  const categories = [];

  if (isLoggedIn) {
    categories.push(
      {
        label: "Eu",
        links: [
          { linkTo: "/pets", label: "Buscar pets", icon: <MdPets /> },
          { linkTo: "/user/edit", label: "Editar perfil", icon: <FiEdit /> },
        ],
      },
      {
        links: [
          {
            linkTo: "",
            label: "Logout",
            icon: <FiLogOut />,
            action: () => {
              localStorage.removeItem("authToken");
              window.location.reload();
            },
          },
        ],
      }
    );

    if (isAdmin()) {
      categories.push({
        label: "Administração",
        links: [
          { linkTo: "/admin/pets", label: "Painel de pets", icon: <MdAdminPanelSettings /> },
          { linkTo: "/admin/adocoes", label: "Painel de adoções", icon: <MdAdminPanelSettings /> },
        ],
      });
    }
  } else {
    categories.push({
      label: "Acesso rápido",
      links: [
        { linkTo: "/login", label: "Login", icon: <AiOutlineLogin /> },
        { linkTo: "/register", label: "Registrar", icon: <AiOutlineUserAdd /> },
      ],
    });
  }

  return (
    <Popover className="relative">
      {({ open }) => {
        if (open) {
          isAdmin();
        }
        return (
          <>
            <Popover.Button as={Button} className="bg-primary-400 focus:outline-none">
              <CiMenuBurger
                className={`transition-transform duration-200 ${
                  open ? "rotate-90" : "rotate-0"
                }`}
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
                  <div
                    key={index}
                    className="bg-primary-400 rounded-md p-4 flex flex-col space-y-2"
                  >
                    {category.label && <p className="font-bold mb-2">{category.label}</p>}
                    {category.links.map((link, index) => (
                      <Link
                        key={index}
                        to={link.linkTo}
                        onClick={link.action}
                        className="flex items-center space-x-2 text-text-900 underline hover:text-text-500"
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </Popover.Panel>
            </Transition>

            <Popover.Overlay className="fixed inset-0 bg-black/25" />
          </>
        );
      }}
    </Popover>
  );
}
