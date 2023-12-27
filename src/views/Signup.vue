<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import Form from '../components/Form.vue'
import { useAuthStore } from '../stores/authStore';
import type { Field } from '../components/Form.vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import type { HttpError } from './Signin.vue';

const router = useRouter();
const toast = useToast()
const userFields = ref([
  {
    label: 'Prénom',
    name: 'firstname',
    value: '',
    type: 'text'
  },
  {
    label: 'Nom',
    name: 'lastname',
    value: '',
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    value: '',
    type: 'email'
  },
  {
    label: 'Password',
    name: 'password',
    value: '',
    type: 'password'
  }
])
const authStore = useAuthStore();

const handleFormSubmit = async (data: Field[]) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3030/api/v1/users/register`, data)
    authStore.setToken(response.data.token)
    if (response.data.auth) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
    router.push('/myAccounts')
  } catch (err) {
    const httpError = err as HttpError;
    if (httpError.response && httpError.response.data && httpError.response.data.message) {
      console.error('There was an error!', httpError);
      toast.error(httpError.response.data.message);
    } else {
      console.error('Une erreur inattendue s\'est produite', httpError);
      toast.error('Une erreur inattendue s\'est produite.');
    }
  }
}
</script>
<template>
  <main>
    <h1 class="title">Je m'inscris</h1>
    <Form :fields="userFields" @submitForm="handleFormSubmit" titleBtn="Inscription"></Form>
  </main>
</template>

<style scoped>
.title {
  text-align: center;
}
</style>
