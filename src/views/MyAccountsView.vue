<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/authStore';
import Card from '../components/Card.vue'
import Title from '../components/Title.vue'
import axios from 'axios';

export interface Operation {
  type: string
  status: string
  amount: number
  user: string
  sendingAccount: Account
  receivingAccount: Account
  created_at: string;
}

export interface Account {
  _id: string
  name: string
  amount: number
  overdraft: number
  user: string
  operations: Operation[]
  created_at: string;
}
const accounts = ref<Account[]>([])
const sumAccount = ref<number>(0)
const authStore = useAuthStore()
onMounted(async () => {
  try {
    const reponse = await axios.get(`http://127.0.0.1:3030/api/v1/accounts`, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    accounts.value = reponse.data.accounts;
    reponse.data.accounts.forEach((account: Account) => {
      sumAccount.value = sumAccount.value + account.amount
    });
  } catch (erreur) {
    console.error("Error:", erreur);
  }
});

</script>

<template>
  <div class="accounts">
    <Title title="Mes comptes" typeAmount="Solde total de vos comptes" :amount="sumAccount"></Title>
    <div class="accounts__card">
      <Card v-for="(account, index) in accounts" :key="index" :account="account"></Card>
    </div>
  </div>
</template>

<style>
.accounts {
  margin: 0px 100px;
}
.accounts__card{
  margin-top: 200px;
}
</style>
