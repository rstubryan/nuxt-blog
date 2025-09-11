<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBlogQuery } from "@/composables/services/blog/query";
import type { BlogProps } from "@/composables/services/blog/type";

const { fetchPosts } = useBlogQuery();
const blogPosts = ref<BlogProps[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(true);

const loadPosts = async (page = 1) => {
  isLoading.value = true;
  try {
    const result = await fetchPosts({ page });
    const response = typeof result === "function" ? await result() : result;

    if (response?.status === "success") {
      blogPosts.value = response.content.data;
      currentPage.value = response.content.current_page;
      totalPages.value = response.content.last_page;
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    loadPosts(page);
  }
};

onMounted(() => {
  loadPosts();
});
</script>

<template>
  <div>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="post in blogPosts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
      <div class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </template>
  </div>
</template>
