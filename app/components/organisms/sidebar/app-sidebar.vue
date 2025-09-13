<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import { Frame, PieChart } from "lucide-vue-next";
import NavProjects from "@/components/organisms/sidebar/nav-projects.vue";
import NavUser from "@/components/organisms/sidebar/nav-user.vue";
import TeamSwitcher from "@/components/organisms/sidebar/team-switcher.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Frame,
      plan: "Enterprise",
    },
  ],
  projects: [
    {
      name: "Blog",
      url: "/dashboard/blog",
      icon: Frame,
    },
    {
      name: "Categories",
      url: "/dashboard/categories",
      icon: PieChart,
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
