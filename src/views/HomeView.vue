<script setup lang="ts">

</script>

<template>
  <main class="flex justify-center items-center text-center border border-red-300 h-screen bg-purple-50">
    <div>
      <h2 class="text-3xl text-purple-700 font-semibold mb-6">LearnlyApp</h2>
      <p class="text-gray-700 text-lg mb-4">Please select a quiz type</p>
      <div class="flex justify-center gap-4">
        <router-link to="/standard-quiz">
          <button class="bg-purple-700 hover:bg-purple-800 text-white py-3 px-8 rounded-2xl transition-all duration-200 ease-in">
            Standard
          </button>
        </router-link>
        <router-link to="/dnd-quiz">
          <button class="border border-purple-700 hover:border-purple-900 text-purple-700 hover:text-purple-900 py-3 px-8 rounded-2xl transition-all duration-200 ease-in">
            Drag and drop
          </button>
        </router-link>
        
        
      </div>
    </div>
  </main>
</template>
