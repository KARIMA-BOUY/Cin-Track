const ApiUrl = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";

export async function Movies() {

    try {
        const res = await fetch(ApiUrl);

        if (!res.ok) {
            throw new Error("Erreur API");
        }

        const data = await res.json();

        return data;

    } catch (error) {

        console.log(error.message);

        return [];
    }
}