<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue'
import type { Account } from '@/views/MyAccountsView.vue';

const router = useRouter()
const props = defineProps<{ account: Account }>();
const account = ref(props.account);
const actionWithAccount = (id: string, action: string) => {
    router.push({ path: `/myAccount/${id}`, query: { action: action } });
}
const pushThisAccount = (id: string) => {
    router.push(`/myAccount/${id}`)
}
</script>

<template>
    <div class="card" @click="pushThisAccount(account._id)">
        <div class="card__info">
            <p class="name">{{ account.name }}</p>
            <p><b>Solde actuel: </b>{{ account.amount }} €</p>
            <p><b>Seuil de découvert: </b>-{{ account.overdraft }} €</p>
            <p><b>Créé le: </b>{{ account.created_at.slice(0, 10) }}</p>
        </div>
        <div class="card__amount">
            <h1 :class="['amount', account.amount < 0 ? 'negatif' : 'positif']">{{ account.amount }} €</h1>
        </div>
        <div class="card__action">
            <Button title="Déposer" styleBtn="small" type="button"
                @onclick="actionWithAccount(account._id, 'deposit')"></Button>
            <Button title="Retirer" styleBtn="small" type="button"
                @onclick="actionWithAccount(account._id, 'withdraw')"></Button>
            <Button title="Transférer" styleBtn="small" type="button"
                @onclick="actionWithAccount(account._id, 'transfer')"></Button>
        </div>
    </div>
</template>

<style scoped>
.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
}

.card:hover {
    background-color: rgb(225, 242, 242);
}

.card__info {
    width: 30%;
}

.card__amount {
    width: 30%;
    display: flex;
    flex-direction: column;
}

.amount {
    font-size: 40px;
    text-align: center;
    margin: auto;

    text-decoration: underline;
}

.negatif {
    color: red;
}

.positif {
    color: rgb(77, 153, 153);
}

.card__action {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
}

button {
    margin: 5px;
}

.name {
    font-weight: 500;
    font-size: 20px;
}
</style>
