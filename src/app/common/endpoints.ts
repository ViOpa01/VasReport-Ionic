import { environment } from "../../environments/environment.prod";

const  BASE_URL = environment.production ? "" : "https://vas.itexapp.com/api/v1/";
const auth = `${BASE_URL}/auth`;

export const Endpoint = {
    AUTH: {
        login: `${auth}/login`,
        logout: `${auth}/logout`,
    }
}