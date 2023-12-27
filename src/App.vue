<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="brand">MA BANQUE</div>
      <div class="nav-links">
        <RouterLink to="/myAccounts">Mes comptes</RouterLink>
        <RouterLink to="/createAccount">Créer un compte</RouterLink>
        <RouterLink to="/signup">Inscription</RouterLink>
        <RouterLink to="/signin">Connexion</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView class="main-content" />
</template>

<style scoped>
.navbar {
  position: fixed;
  display: flex;
  justify-content: space-around;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 70px;
  background-color: rgb(77, 153, 153);
  line-height: 70px;
  text-align: center;
}

.brand {
  font-size: 20px;
}

a {
  margin: 10px;
  background-color: rgb(235, 235, 235);
  padding: 10px;
  border-radius: 10px;

}

a:hover {
  background-color: rgb(80, 184, 184);
}
</style>
