<script setup lang="ts">
import { ref } from 'vue'
import Form from '../components/Form.vue'
import { useAuthStore } from '../stores/authStore';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Field } from '../components/Form.vue'
import type { HttpError } from './Signin.vue';

const router = useRouter();
const toast = useToast();
const accountFields = ref([
  {
    label: 'Nom du compte',
    name: 'name',
    value: '',
    type: 'text'
  },
  {
    label: 'Montant souhaité',
    name: 'amount',
    value: '',
    type: 'number'
  },
  {
    label: 'Seuil de découvert',
    name: 'overdraft',
    value: '',
    type: 'number'
  },
])
const authStore = useAuthStore();

const handleFormSubmit = async (data: Field[]) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3030/api/v1/accounts`, data, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    router.push('/myAccounts')
    if (response.data.response) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
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
    <h1 class="title">Je créer mon nouveau compte</h1>
    <Form :fields="accountFields" @submitForm="handleFormSubmit" titleBtn="Créer un nouveau compte"></Form>
  </main>
</template>

<style scoped>
.title {
  text-align: center;
}
</style>
