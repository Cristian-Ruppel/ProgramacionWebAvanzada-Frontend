<script setup lang="ts">
import { ref } from 'vue';
import { getTodo } from '@/api/todos';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoData = ref<Todo | null>(null); 
const todoId = ref(1); 
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchTodo = async () => {
  isLoading.value = true;
  error.value = null;
  todoData.value = null;
  
  try {
    const data = await getTodo(todoId.value);
    todoData.value = data;
    
  } catch (err: any) {
    error.value = 'Error al cargar los datos: ' + err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="about">
    <h1>Página de "Acerca de" (Prueba de API)</h1>
    <p>Presiona el botón para llamar a la API de JSONPlaceholder.</p>
    
    <div class="control-panel">
      <label>ID del "Todo": </label>
      <input type="number" v-model="todoId" min="1" />
      <button @click="fetchTodo">Llamar a getTodo({{ todoId }})</button>
    </div>

    <div v-if="isLoading" class="loading">Cargando...</div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="todoData" class="results">
      <h3>Datos recibidos:</h3>
      <pre>{{ todoData }}</pre>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
  text-align: center;
}
.control-panel {
  margin-top: 20px;
}
input {
  margin-right: 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
.loading {
  margin-top: 20px;
  color: blue;
}
.error {
  margin-top: 20px;
  color: red;
}
.results {
  margin-top: 20px;
  padding: 15px;
  background-color: #2e2e2e; 
  border-radius: 8px;
  text-align: left;
  display: inline-block;
  min-width: 300px;
  max-width: 600px;
}
pre {
  color: #f4f4f4;
  white-space: pre-wrap; 
  word-wrap: break-word;
}
</style>