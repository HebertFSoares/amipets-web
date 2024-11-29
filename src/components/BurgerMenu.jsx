import { useAuth } from "@/hooks/auth/AuthProvider";
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function BurgerMenu() {
  const categories = [
    {
      label: "Eu",
      links: [
        {linkTo: "/user/", label: "Minhas adoções"},
        {linkTo: "/user/", label: "Meus pets favoritos"},
        {linkTo: "/pets", label: "Buscar pets"},
        {linkTo: "/user/edit", label: "Editar perfil"}
      ]
    },
    {
      label: "Administração",
      links: [
        {linkTo: "/admin/", label: "Painel de administração"},
        {linkTo: "/admin/", label: "Painel de pets"},
        {linkTo: "/admin/", label: "Painel de adoções"},
        {linkTo: "/admin/", label: "Painel de adotantes"}
      ]
    },
    {
      links: [
        {linkTo: "#", label: "Logout"}
      ]
    }
  ]
  const user = useAuth();

  return (
    <Popover className="relative group">
      <PopoverButton>
        <Button className="bg-primary-400">
          <CiMenuBurger className="transition duration-200 ease-in group-data-[open]:rotate-90" transition/>
        </Button>
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 bg-black/25 transition duration-100 data-[closed]:opacity-0" transition/>
      <PopoverPanel anchor="bottom" className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-lg transition duration-200 ease-out data-[closed]:-translate-y-4 data-[closed]:opacity-0" transition>
        {categories.map((category, index) => (
          <div key={index} className="bg-primary-400 rounded-md p-4 flex flex-col text-right">
            <div className="flex flex-row align-middle space-x-2">
              <div className="flex-auto bg-black h-0.5 self-center"></div>
              {category.label && 
                <p className="font-bold">{category.label}</p>
              }
            </div>
              {category.links.map((link, index) => (
                <Link key={index} to={link.linkTo} className="text-text-900 underline hover:text-text-500" onClick={link.label === "Logout" ? user.logout : null }>{link.label}</Link>
              ))}
          </div>
        ))}
      </PopoverPanel>
    </Popover>
  )
}

function Category({ children }) {
  return (
    <div className="bg-primary-400 rounded-md p-4 flex flex-col text-right text-text-900 underline">
      {children}
    </div>
  )
}