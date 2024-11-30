import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PetsFilters } from "../PetsFilters/PetsFilters";
import { PetsResume } from "../PetsResume/PetsResume";
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { PlusCircle, PencilIcon, Trash2, Ellipsis } from "lucide-react";
import { PetFormDialog } from "../PetFormDialog/PetFormDialog";
import { capitalize } from "@/utils/capitalize";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { getFormattedPetStatus } from "@/utils/getFormattedPetStatus";
import { fetchPets } from "@/services/fetchPets";
import { sendPetToAPI } from "@/services/sendPetToAPI";
import { updatePet } from "@/services/updatePet";

export function PetsViewAdmin() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  let species = JSON.parse(searchParams.get("species"));
  let sizes = JSON.parse(searchParams.get("sizes"));
  let status = JSON.parse(searchParams.get("status"));

  const { data: pets } = useQuery({
    queryKey: ["pets", id, name, species, sizes, status],
    queryFn: () => fetchPets({ id, name, species, sizes, status }),
  });

  async function createPet(data) {
    try {
      await sendPetToAPI(data);
      alert("Pet cadastrado com sucesso");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar pet");
    }
  }

  async function editPet(data) {
    try {
      await updatePet(data);
      alert("Pet editado com sucesso");
    } catch (err) {
      console.error(err);
      alert("Erro ao editar pet");
    }
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-10 flex flex-col">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Pets</h1>
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <div className="space-y-4">
      <PetsFilters />
      <div className="border rounded-lg p-2 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pets &&
              pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.id}</TableCell>
                  <TableCell>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex justify-center items-center">
                      <img
                        src={pet.foto}
                        alt={`foto de ${pet.nome}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{pet.nome}</TableCell>
                  <TableCell>{capitalize(pet.especie)}</TableCell>
                  <TableCell>{getFormattedDate(pet.dataNascimento)}</TableCell>
                  <TableCell>{getFormattedPetStatus(pet.status)}</TableCell>
                  <TableCell>{capitalize(pet.tamanho)}</TableCell>
                  <TableCell className="flex space-x-2">
                    <PetFormDialog
                      description="Edite as informações do pet no sistema. Clique em salvar quando tiver finalizado."
                      title="Editar pet"
                      onSubmit={editPet}
                      initialValues={{
                        id: pet.id,
                        name: pet.nome,
                        specie: pet.especie,
                        birthDate: getFormattedDate(pet.dataNascimento),
                        size: capitalize(pet.tamanho),
                        description: pet.descricao,
                        status: getFormattedPetStatus(pet.status),
                        personalities: pet.personalidade?.map((x) => ({
                          value: x,
                        })),
                      }}
                    >
                      <Button type="button" variant="ghost">
                        <PencilIcon className="w-4" />
                      </Button>
                    </PetFormDialog>
                    <Button variant="ghost">
                      <Trash2 className="w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>

    <div className="space-y-4">
      <PetsResume />
      <PetFormDialog
        description="Crie um novo pet no sistema. Clique em salvar quando tiver finalizado."
        title="Cadastrar pet"
        onSubmit={createPet}
        initialValues={{
          id: "",
          name: "",
          specie: "",
          birthDate: "",
          description: "",
          personalities: [],
          status: "Livre",
        }}
      >
        <Button type="button" className="bg-primary-500 hover:bg-primary-400 w-full sm:w-auto">
          <PlusCircle /> Cadastrar Pet
        </Button>
      </PetFormDialog>
    </div>
  </div>
</div>
  );
}
