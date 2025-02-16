<script setup lang="ts">
  import VueDraggableNext from "vuedraggable";
  import { dndQuestions } from '@/api/dndQuestions';
  import { computed, ref } from 'vue';
  import { ArrowLeft, ArrowRight, RefreshCcw, MessageCircleQuestion } from "lucide-vue-next";

  const questions = ref(dndQuestions)
  const currentQuestionIndex = ref(0);
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
      resetQuestion();
    }
  };

  const previousQuestion = () => {
    if(currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
      resetQuestion();
    }
  }

  const resetQuestion = () => {
  const droppedAnswers = currentQuestion.value.slots.flatMap(slot => slot.answer);

  currentQuestion.value.slots.forEach(slot => (slot.answer = []));

  currentQuestion.value.answers.push(...droppedAnswers);
};
</script>

<template>
  <div class="bg-purple-50 px-2 pt-6 flex flex-col justify-between gap-8 min-h-screen">
    <div>
      <header class="flex justify-between items-center mb-8">
      <router-link to="/" class="border border-gray-300  px-2 py-2 rounded-2xl w-fit text-purple-800"><ArrowLeft /></router-link>
      <h2 class="text-xl font-semibold">Course Preview</h2>
      <button @click="resetQuestion" class="border border-gray-300 text-purple-800 px-2 py-2  rounded-2xl"><MessageCircleQuestion /></button>
    </header>
    <div class="px-6">
      <h2 class="mb-2">Question: {{ currentQuestionIndex + 1 }}</h2>
      <div class="flex gap-1">
        <button v-for="(question, index) in questions" 
          @click="currentQuestionIndex = index"
          :class="{
            'bg-purple-700': index <= currentQuestionIndex, 
            'bg-gray-300': index > currentQuestionIndex 
          }" 
          class="h-2 w-6 rounded"></button>
      </div>
    </div>
    <div class="flex items-center mb-8">
      <button v-if="currentQuestionIndex > 0" @click="previousQuestion" class="flex text-sm gap-2"><ArrowLeft/> Previous</button>
      <h3 class=" text-base text-gray-800 text-center flex-1">{{ currentQuestion.question }}</h3>
    </div>
    </div>
    <div class="h-fit flex justify-center flex-wrap max-w-[700px] mx-auto gap-4">
      <div 
        v-for="slot in currentQuestion.slots"
        :key="slot.id"
        :class="{
          'bg-green-50 border border-green-500 text-gray-500': slot.answer.length > 0 && slot.answer[0] === slot.correctAnswer,
          'bg-red-100 border border-red-500 text-gray-500': slot.answer.length > 0 && slot.answer[0] !== slot.correctAnswer,
          'border border-dashed border-2 border-purple-400 bg-purple-100 text-gray-500' : slot.answer.length === 0
        }"
        class="w-[170px] sm:w-[200px] h-[100px] text-center flex justify-center items-center py-4 px-2 rounded-xl"
        >
          <div :class="{'flex justify-center items-center gap-4': slot.answer.length > 0}">
            <span :class="{'hidden': slot.answer.length > 0}" class="text-sm">{{ slot.text }}</span>
            <VueDraggableNext 
              v-model="slot.answer" 
              group="answers" itemKey="id" 
              class="w-full h-full flex items-center justify-center"
              :disabled="slot.answer.length > 0"
            >
              <template #item="{ element }">
                <span>{{ element }}</span>
              </template>
            </VueDraggableNext>
            <div :class="{'hidden': slot.answer.length === 0}">
              <span :class="{
              'hidden': slot.answer.length > 0 && slot.answer[0] !== slot.correctAnswer
              }">✅</span>
              <span :class="{
              'hidden': slot.answer.length > 0 && slot.answer[0] === slot.correctAnswer
              }">❌</span>
            </div>
          </div>
      </div>
    </div>
    

    <div class="bg-white rounded-3xl py-4 px-6">
      <h3 class=" text-base text-gray-800 text-center mb-6">{{ currentQuestion.question }}</h3>
      <VueDraggableNext 
        v-model="currentQuestion.answers" 
        group="answers" 
        itemKey="id" 
        class="flex flex-wrap justify-center gap-2 mt-2 max-w-[600px] mx-auto"
        ghost-class="dragging"
      >
        <template #item="{ element }">
          <span class="p-2 bg-gray-800 text-white rounded-xl p-8 border border-transparent cursor-pointer shadow-md ">{{ element }}</span>
        </template>
      </VueDraggableNext>    

      <div class="mt-6 flex gap-4 justify-between">
        <button @click="resetQuestion" class="border border-gray-300 text-gray-500 px-4 py-2 rounded-2xl"><RefreshCcw /></button>
        <button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion" class="bg-purple-800 text-white  py-4 w-full rounded-xl flex gap-4 justify-center items-end text-lg">
          Continue
          <ArrowRight/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dragging{
    border: 2px solid rgb(172, 172, 172);
    border-style: dashed;
    background-color: rgb(233, 233, 233);
    color: rgb(172, 172, 172);
  }
</style>
