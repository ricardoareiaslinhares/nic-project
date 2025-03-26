import { Note } from "../../types/entities/note";
import { DirectusWrapper } from "../../types/types";
import { api } from "../config";

const route = "items/notes";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get<DirectusWrapper<Note[]>>(route, {
      params: {
        fields: "status,id,date_created,date_updated,client,note",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getNotesByClientId = async (clientId: number): Promise<Note[]> => {
  try {
    const response = await api.get<DirectusWrapper<Note[]>>(route, {
      params: {
        filter: { client: { _eq: clientId } },
        fields: "status,id,date_created,date_updated,client,note",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (noteData: Note): Promise<Note> => {
  try {
    const response = await api.post<Note>(route, noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (
  id: number,
  noteData: Partial<Note>
): Promise<Note> => {
  try {
    const response = await api.patch<Note>(`${route}/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error(`Error updating note with Id ${id}:`, error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<number | undefined> => {
  try {
    await api.delete(`${route}/${id}`);
    return Number(id);
  } catch (error) {
    console.error(`Error deleting note with Id ${id}:`, error);
    throw error;
  }
};
