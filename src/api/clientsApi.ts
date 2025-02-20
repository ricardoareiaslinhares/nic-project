import axios from "axios";
import {SERVER_URL} from "../../mockEnv"
import Client from "../entities/client";

const api = axios.create({
    baseURL:`${SERVER_URL}/clients/`,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getClients = async () : Promise<Client[]> => {
    try {
        const response = await api.get<Client[]>("")
        return response.data
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}

export const getClientById = async (id: number): Promise<Client> => {
    try {
       const response = await api.get<Client>(`${id}`) 
       return response.data
    } catch (error) {
        console.error(`Error fetching client with Id ${id}:`, error);
        throw error;
    }
}

export const createClient = async (clientData:Client): Promise<Client> => {
    try {
        const response = await api.post<Client>("", clientData)
        return response.data
    } catch (error) {
        console.error("Error creating client:", error);
        throw error;
    }
}

export const updateClient = async (id: number, clientData:Partial<Client>) : Promise<Client> => {
    try {
       const response = await api.put<Client>(`${id}`, clientData)
       return response.data 
    } catch (error) {
        console.error(`Error updating client with Id ${id}:`, error);
        throw error;
    }
}

export const deleteClient = async (id:number) : Promise<number|undefined> => {
    try {
        await api.delete(`${id}`)
        return Number(id)
    } catch (error) {
        console.error(`Error deleting client with Id ${id}:`, error);
        throw error;
    }
}