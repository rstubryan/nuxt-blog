<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlogForm from "@/components/organisms/form/blog/blog-form.vue";

const props = defineProps({
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["update:open", "refresh"]);

const dialogOpen = ref(props.open);

watch(
  () => props.open,
  (val) => {
    dialogOpen.value = val;
  },
);
watch(dialogOpen, (val) => {
  emit("update:open", val);
});

function handleSuccess() {
  dialogOpen.value = false;
  emit("refresh");
}
</script>
<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="outline">Add Blog</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Blog</DialogTitle>
        <DialogDescription>
          Fill the form to add a new blog post.
        </DialogDescription>
      </DialogHeader>
      <BlogForm @success="handleSuccess" />
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
