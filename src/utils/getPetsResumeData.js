export function getPetsResumeData(pets) {

    if (!pets) {
        return;
    }

    const resume = {
        livres: 0,
        emAnalise: 0,
        adotados: 0
    }

    pets.reduce((acc, x) => {
        console.log(resume);
        const status = x.status;

        const mapStatus = {
            "0": "livres",
            "1": "emAnalise",
            "2": "adotados"
        }
        console.log(resume[mapStatus[status]]);
        resume[mapStatus[status]] += 1;
        return resume;
    }, resume, pets[0], 0)

    console.log(resume);
    return resume;
}