import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
//import { Star } from "react-iconly";
import { Link } from 'react-router-dom';

export default function PetCard({
  id,
  nome,
  especie,
  dataNasc,
  tamanho,
  personalidade,
  imagem,
  onAdopt,
}) {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
        <CardHeader>
          <img className="h-36 w-full object-cover" src={imagem} alt={nome} />
        </CardHeader>
        <CardContent>
          <h1 className="text-md font-bold text-gray-800">{nome}</h1>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Espécie: {especie}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Data Nasc: {dataNasc}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Tamanho: {tamanho}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Personalidade:
            <span className="italic">{personalidade}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <div className="flex gap-3 w-full flex-wrap justify-center sm:justify-start">
          </div>

          <Link
            className="mt-3 inline-flex h-10 px-4 py-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-primary-400 border-2 border-primary-600 hover:bg-gray-100 w-full"
            to={`/pets/${id}`}
          >
            Saiba Mais
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
