import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="bg-primary-600 border-b-2 border-primary-900 flex flex-row justify-between items-center py-4 px-16">
      <div>
        <img src="src/assets/logo.svg" alt="" className="w-36" />
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
        <Button className="bg-primary-400">
          <Link to="/login">Entrar</Link>
        </Button>
      </div>
    </div>
  );
}
