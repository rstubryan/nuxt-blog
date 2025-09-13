<script setup lang="ts">
import { useHead } from "nuxt/app";
import { ref, onMounted } from "vue";
import { Loader2 } from "lucide-vue-next";

import AppSidebar from "@/components/organisms/sidebar/app-sidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

useHead({
  title: "Dashboard",
});

const isVerifying = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVerifying.value = false;
  }, 500);
});
</script>

<template>
  <template v-if="isVerifying">
    <div class="flex h-screen w-full items-center justify-center">
      <Loader2 class="animate-spin h-8 w-8 text-gray-500" />
    </div>
  </template>
  <template v-else>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator
              orientation="vertical"
              class="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl" />
            <div class="bg-muted/50 aspect-video rounded-xl" />
            <div class="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div
            class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </template>
</template>
