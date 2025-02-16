<script setup lang="ts">
  import { ref, computed } from "vue";
  import { questions } from "@/api/questions";
  import type Question from "@/types/Question";
  import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-vue-next";

  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref<string | null>(null);
  const isCorrect = ref<boolean | null>(null);
  const isAnswered = ref(false);
  const score = ref(0);

  const currentQuestion = computed<Question>(() => questions[currentQuestionIndex.value]);
  const answerBaseStyles = computed(() => 'flex justify-between border rounded-md border-gray-300 p-6 text-gray-900 cursor-pointer hover:bg-gray-50');

  const optionsLetter = ['A', 'B', 'C', 'D'];

  const selectAnswer = (option: string) => {
    if (isAnswered.value) return;

    selectedAnswer.value = option;
    isCorrect.value = option === currentQuestion.value.correctAnswer;
    isAnswered.value = true;

    if (isCorrect.value) score.value += 3;

    setTimeout(() => {
      if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++;
        resetState();
      } else {
        alert(`Quiz Completed! Your score: ${score.value} / ${questions.length}`);
      }
    }, 2000);

    const resetState = () => {
      selectedAnswer.value = null;
      isCorrect.value = null;
      isAnswered.value = false;
    };
  };

  const getOptionClasses = (option: string) => ({
    'bg-green-50 border-green-300 hover:bg-green-50': isAnswered.value && option === currentQuestion.value.correctAnswer,
    'bg-red-100 !border-red-300 hover:bg-red-100': isAnswered.value && option === selectedAnswer.value && !isCorrect.value,
    'cursor-not-allowed': isAnswered.value,
  });

</script>

<template>
  <div class="p-4">
    <router-link to="/" class="w-8 h-8 mb-6 flex justify-center items-center rounded-full bg-purple-50 text-purple-700">
      <ArrowLeft :size="18" />
    </router-link>
    <div class="flex justify-between bg-purple-800 text-white rounded-md p-6 mb-6">
      <p  class="font-semibold">Goal: 30 points</p>
      <p>Current Points: {{ score }} </p>
    </div>

    <h3 class="font-semibold mb-2">Question {{ currentQuestionIndex + 1 }}</h3>
    
    <p class="text-gray-700">{{ currentQuestion.question }}</p>

    <ul class="grid gap-3 mt-8">
      <li
        v-for="(option, index) in currentQuestion.options"
        :key="option"
        @click="selectAnswer(option)"
        class="`answerBaseStyles`"
        :class="getOptionClasses(option),answerBaseStyles"
      >
        <div class="flex gap-4">
          <span class="font-semibold">{{ optionsLetter[index] }}</span>
          <span>{{ option }}</span>
        </div>
        <span v-if="isAnswered && option === currentQuestion.correctAnswer" class="text-green-700"><CheckCircle/></span>
        <span v-else-if="isAnswered && option === selectedAnswer" class="text-red-700"><AlertCircle/></span>
      </li>
    </ul>
    <div v-if="isAnswered" :class="{ 'bg-green-50  text-green-700': isCorrect , 'border border-red-300 !text-red-500 bg-red-100': !isCorrect }"  class="flex gap-2 p-8 rounded-md mt-4">
      <div>
        <span v-if="isCorrect" class="text-green-700"><CheckCircle/></span>
        <span v-else class="text-red-700"><AlertCircle/></span>
      </div>
      {{ isCorrect ? "Correct!" : "Wrong! The correct answer was: " + currentQuestion.correctAnswer }}
    </div>
  </div>
</template>
