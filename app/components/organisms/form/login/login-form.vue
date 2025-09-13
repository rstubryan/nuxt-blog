<script setup lang="ts">
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formSchema } from "./zod-login";
import { useLoginMutation } from "@/composables/services/auth/mutation";

const { login } = useLoginMutation();

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  await login(values);
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="m@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              Please enter your email address.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="******"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              Your password must be at least 6 characters long.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">Login</Button>
      </form>
    </CardContent>
  </Card>
</template>
