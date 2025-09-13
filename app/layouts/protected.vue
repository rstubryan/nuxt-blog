<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
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

const isVerifying = ref(true);

onMounted(() => {
  isVerifying.value = false;
});

const route = useRoute();

const breadcrumbSegments = computed(() => {
  return route.path
    .split("/")
    .filter((seg) => seg && seg !== "dashboard" && seg !== "(protected)");
});

const dashboardBase = "/dashboard";
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
                <BreadcrumbItem>
                  <NuxtLink :to="dashboardBase"> Dashboard </NuxtLink>
                </BreadcrumbItem>
                <template v-for="(seg, idx) in breadcrumbSegments" :key="seg">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem v-if="idx < breadcrumbSegments.length - 1">
                    <NuxtLink
                      :to="`${dashboardBase}/${breadcrumbSegments.slice(0, idx + 1).join('/')}`"
                    >
                      {{ seg.charAt(0).toUpperCase() + seg.slice(1) }}
                    </NuxtLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem v-else>
                    <BreadcrumbPage>
                      {{ seg.charAt(0).toUpperCase() + seg.slice(1) }}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </template>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </template>
</template>
