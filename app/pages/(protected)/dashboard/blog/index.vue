<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "nuxt/app";
import TableBlog from "@/components/molecules/table/table-blog.vue";
import ModalBlog from "@/components/molecules/modal/modal-blog.vue";

useHead({ title: "Blog CMS" });

const showModal = ref(false);
const tableKey = ref(0);

function refreshTable() {
  tableKey.value++;
}
</script>

<template>
  <NuxtLayout name="protected">
    <div>
      <ModalBlog v-model:open="showModal" @refresh="refreshTable" />
    </div>
    <div>
      <TableBlog :key="tableKey" />
    </div>
  </NuxtLayout>
</template>
