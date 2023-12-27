<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '../stores/authStore';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import Popup from '../components/Popup.vue'
import OperationCard from '../components/OperationCard.vue'
import Form from '../components/Form.vue'
import Button from '../components/Button.vue'
import Title from '../components/Title.vue'
import type { FormFields } from '../components/Form.vue';
import type { HttpError } from './Signin.vue';
import type { Account } from './MyAccountsView.vue';

const authStore = useAuthStore()
const toast = useToast();
const route = useRoute();
const account = ref<Account>()
const showPopup = ref(false);
const action = ref(route.query.action);
const depositFields = ref([
  {
    label: 'Montant',
    name: 'amount',
    value: '',
    type: 'number'
  },
])
const transferFields = ref([
  {
    label: 'Montant',
    name: 'amount',
    value: '',
    type: 'number'
  },
  {
    label: 'Compte bénéficiaire',
    name: 'receivingAccount',
    value: '',
    type: 'dropdown',
    options: []
  },
])

const accountId = Array.isArray(route.params.accountId) ? route.params.accountId[0] : route.params.accountId;

onMounted(async () => {
  if (action.value && action.value != '') {
    showPopup.value = true
  }
  getAllAccounts()
});

watch(() => route.query.action, (newAction, oldAction) => {
  if (newAction) {
    action.value = newAction
    showPopup.value = true
  }
});

const getAllAccounts = async () => {
  try {
    const reponse = await axios.get(`http://127.0.0.1:3030/api/v1/accounts`, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    transferFields.value[1].options = reponse.data.accounts
      .filter((item: Account) => item._id !== accountId)
      .map((item: Account) => (
        { label: item.name, value: item._id }
      ));
    account.value = reponse.data.accounts.find((item: Account) => item._id === accountId)
  } catch (erreur) {
    console.error("Error:", erreur);
  }
}

const submitDeposit = async (data: FormFields) => {
  try {
    const response = await axios.patch(`http://127.0.0.1:3030/api/v1/accounts/${accountId}/deposit`, data, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    getAllAccounts()
    showPopup.value = false
    router.push(`/myAccount/${accountId}`)
    toast.success(response.data.message);
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

const submitWithdraw = async (data: FormFields) => {
  try {
    const response = await axios.patch(`http://127.0.0.1:3030/api/v1/accounts/${accountId}/withdraw`, data, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    getAllAccounts()
    showPopup.value = false
    router.push(`/myAccount/${accountId}`)
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

const submitTransfer = async (data: FormFields) => {
  try {
    const response = await axios.patch(`http://127.0.0.1:3030/api/v1/accounts/${accountId}/transfer`, data, {
      headers: {
        'Authorization': authStore.token,
        'Content-Type': 'application/json',
      }
    })
    getAllAccounts()
    showPopup.value = false
    router.push(`/myAccount/${accountId}`)
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

const actionWithAccount = (id: string, action: string) => {
  router.push({ path: `/myAccount/${id}`, query: { action: action } });
}

</script>

<template>
  <div class="account">
    <div class="account__action">
      <Button title="Déposer" styleBtn="small" type="button" @onclick="actionWithAccount(accountId, 'deposit')"></Button>
      <Button title="Retirer" styleBtn="small" type="button" @onclick="actionWithAccount(accountId, 'withdraw')"></Button>
      <Button title="Transférer" styleBtn="small" type="button"
        @onclick="actionWithAccount(accountId, 'transfer')"></Button>
    </div>
    <Title :title="account?.name" typeAmount="Solde de votre compte" :amount="account?.amount"></Title>
    <div class="account__operations">
      <OperationCard v-for="(operation, index) in account?.operations.reverse()" :key="index" :operation="operation"
        :accountId="account?._id"></OperationCard>
    </div>

    <Popup v-model:isVisible="showPopup">
      <div>
        <h1 v-if="action === 'deposit'" class="popup__title">Déposer sur mon compte</h1>
        <h1 v-else-if="action === 'withdraw'" class="popup__title">Retirer de mon compte</h1>
        <h1 v-else-if="action === 'transfer'" class="popup__title">Transférer vers un autre compte</h1>
        <b>{{ account?.name }} </b>
        <p>N° {{ account?._id }}</p>
        <Form v-if="action === 'deposit'" :fields="depositFields" @submitForm="submitDeposit"
          titleBtn="Déposer ce montant">
        </Form>
        <Form v-else-if="action === 'withdraw'" :fields="depositFields" @submitForm="submitWithdraw"
          titleBtn="Retirer ce montant"></Form>
        <Form v-else-if="action === 'transfer'" :fields="transferFields" @submitForm="submitTransfer"
          titleBtn="Transférer ce montant"></Form>
      </div>
    </Popup>
  </div>
</template>

<style>
.account {
  margin: 0px 100px;
}

.account__operations {
  margin-top: 200px;
}

.account__action {
  background-color: rgb(255, 255, 255, 0.948);
  width: 50%;
  padding: 10px;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 230px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>
