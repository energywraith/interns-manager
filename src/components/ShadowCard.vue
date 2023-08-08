<script setup lang="ts"></script>

<template>
  <div class="shadow-card"><slot /></div>
</template>

<style scoped>
.shadow-card {
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  border-radius: 6px;
  background: #fff;
}
</style>
