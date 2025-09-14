<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ref, watch } from "vue";
import { useBlogMutation } from "@/composables/services/blog/mutation";
import type { BlogProps } from "@/composables/services/blog/type";

const props = defineProps<{
  open: boolean;
  blog: BlogProps | null;
}>();
const emit = defineEmits(["update:open", "deleted"]);

const dialogOpen = ref(props.open);
watch(
  () => props.open,
  (val) => (dialogOpen.value = val),
);
watch(dialogOpen, (val) => emit("update:open", val));

const { deleteBlog } = useBlogMutation();
const loading = ref(false);

async function handleDelete() {
  if (!props.blog) return;
  loading.value = true;
  const res = await deleteBlog(props.blog.id);
  loading.value = false;
  if (res.success) {
    dialogOpen.value = false;
    emit("deleted");
  }
}
</script>

<template>
  <AlertDialog v-model:open="dialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Blog</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete <b>{{ props.blog?.title }}</b
          >? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="loading">Cancel</AlertDialogCancel>
        <AlertDialogAction :disabled="loading" @click="handleDelete">
          <span v-if="!loading">Delete</span>
          <span v-else>Deleting...</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
