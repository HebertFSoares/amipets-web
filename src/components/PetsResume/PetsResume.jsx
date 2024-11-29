import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export function PetsResume() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    let species = JSON.parse(searchParams.get('species'));
    let sizes = JSON.parse(searchParams.get('sizes'));
    let status = JSON.parse(searchParams.get('status'));

    const queryClient = useQueryClient();

    const petsCached = queryClient.getQueryData(['pets', id, name, species, sizes, status]);

    return (
        <div className={`flex flex-col shadow-center-sm px-8 py-7 basis-60`}  >
            <h2 className="font-rubik font-bold text-lg mb-5 text-zinc-800">Resumo</h2>
            <div className="flex justify-between items-center mb-2">
                <span className="font-rubik text-sm font-medium">Livres</span>
                <span className="font-rubik text-sm font-medium text-lilac"></span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="font-rubik text-sm font-medium">Adotados</span>
                <span className="font-rubik text-sm font-medium text-orange"></span>
            </div>
            <div className=" border-b border-b-[#EAEAEA] mb-4"></div>
            <div className="flex justify-between">
                <span className="font-rubik text-sm font-bold">Em análise</span>
                <span className="font-rubik text-sm font-medium text-sky-500"></span>
            </div>
        </div>
    );
}