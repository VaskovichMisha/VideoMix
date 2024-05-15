import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'
import router from "../router/index.js";
import store from "@/store";

// const BASE_URL = process.env.VUE_APP_API_URL
const BASE_URL = 'https://stage5.halk.ai'

async function blockCatch(error: AxiosError) {
    const response: AxiosResponse<any> | undefined = error.response;

    if (response) {
        console.error(response.data.user_message);
        store.commit('notifications/ERROR_CHANGE', response.data.user_message)
    }

    if (response && response.status === 401) {
        console.error('Unauthorized');
    }
}

export async function postAsync(url: string, data: unknown, isFile: any) {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
        }
    }

    isFile ? config.headers['Content-Type'] = "multipart/form-data" : config.headers['Content-Type'] = "application/json"

    try {
        console.log(BASE_URL + url)
        let response = await axios.post(BASE_URL + url, data, config)

        if (response.status === 200 || response.status === 201 || response.status === 204) {
            return response.data
        }

    } catch (error) {
        blockCatch(error as AxiosError<unknown, any>)
    }

    return undefined
}


export async function getAsync(url: string, queryParams: any) {
    const config: { headers: Record<string, string>, params?: any } = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    }

    if (queryParams) {
        config.params = queryParams
    }

    try {
        let response = await axios.get(BASE_URL + url, config)
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
    } catch (error) {
        blockCatch(error as AxiosError)
    }
}

export async function deleteAsync(url: string) {
    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }

    try {
        let response = await axios.delete(BASE_URL + url, config)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        blockCatch(error as AxiosError)
    }
}

export async function putAsync(url: string, data: unknown) {

    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }

    try {
        let response = await axios.put(BASE_URL + url, data, config)

        if (response.status === 200 || response.status === 201 || response.status === 204) {
            return response.data
        }

    } catch (error) {
        blockCatch(error as AxiosError)
    }

    return undefined
}