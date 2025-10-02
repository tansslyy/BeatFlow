import axios, { AxiosResponse } from "axios";

export const fetchGenres = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>("http://localhost:8000/api/genres");
        if (response.status === 200 && response.data && response){
            return response.data
        }
    }
    catch(error:any) {
        console.log(error)
    }
    return [];
}