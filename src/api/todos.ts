// src/api/todos.ts

import apiClient from './index';
import type { AxiosResponse } from 'axios';

export const getTodo = async (id: number) => {
  try {
    const response: AxiosResponse<any> = await apiClient.get(`/todos/${id}`);
    
    return response.data;

  } catch (error) {
    console.error('Error al llamar a getTodo:', error);
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
    const response: AxiosResponse<any> = await apiClient.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error al llamar a getAllTodos:', error);
    throw error;
  }
};