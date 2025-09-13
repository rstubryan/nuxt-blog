<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import { Frame, PieChart } from "lucide-vue-next";
import NavProjects from "@/components/organisms/sidebar/nav-menus.vue";
import NavUser from "@/components/organisms/sidebar/nav-user.vue";
import TeamSwitcher from "@/components/organisms/sidebar/team-switcher.vue";
import { useCookie } from "nuxt/app";
import type { UserProps } from "@/composables/services/auth/type";

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

const userCookie = useCookie<UserProps & { avatar?: string }>("user");

let name = "User";
let email = "user@example.com";
let avatar = "https://github.com/shadcn.png";

if (userCookie.value && typeof userCookie.value === "object") {
  name = userCookie.value.name ?? name;
  email = userCookie.value.email ?? email;
  avatar = userCookie.value.avatar ?? avatar;
}

const data = {
  user: { name, email, avatar },
  teams: [
    {
      name: "Acme Inc",
      logo: Frame,
      plan: "Enterprise",
    },
  ],
  menus: [
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
      <NavProjects :menus="data.menus" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
