<script setup lang="ts">
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blogFormSchema } from "./zod-blog";
import { useBlogMutation } from "@/composables/services/blog/mutation";

const emit = defineEmits(["success", "fail"]);
const { createBlog } = useBlogMutation();

const form = useForm({
  validationSchema: blogFormSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  const result = await createBlog(values);
  if (result.success) {
    emit("success");
  } else {
    emit("fail");
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Blog title" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Content</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Blog content"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="author">
      <FormItem>
        <FormLabel>Author</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Author name"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="category_id">
      <FormItem>
        <FormLabel>Category ID</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Category ID"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Save</Button>
  </form>
</template>
