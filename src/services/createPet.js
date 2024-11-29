import { api } from "@/lib/apiWrapper";

export async function (pet){

    const res = api.post("pets", {
        body: {
            
        }
    })

}