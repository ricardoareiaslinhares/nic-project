import axios from "axios";
import { SERVER_URL } from "../../mockEnv";
import Note from "../entities/note";

const api = axios.create({
  baseURL: `${SERVER_URL}/sessionNotes/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get<Note[]>("");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getNotesByClientId = async (id: number): Promise<Note[]> => {
  try {
    const response = await api.get<Note[]>(`?clientId=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
};

export const getNoteById = async (id: number): Promise<Note> => {
  try {
    const response = await api.get<Note>(`${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
};


export const createNote = async (noteData: Note): Promise<Note> => {
  try {
    const response = await api.post<Note>("", noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (id: number, noteData: Partial<Note>): Promise<Note> => {
  try {
    const response = await api.put<Note>(`${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error(`Error updating note with Id ${id}:`, error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<number | undefined> => {
  try {
    await api.delete(`${id}`);
    return Number(id);
  } catch (error) {
    console.error(`Error deleting note with Id ${id}:`, error);
    throw error;
  }
};