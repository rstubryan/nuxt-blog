<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ref, watch } from "vue";
import { useBlogQuery } from "@/composables/services/blog/query";
import type { BlogProps } from "@/composables/services/blog/type";

const posts = ref<BlogProps[]>([]);
const loading = ref(true);
const perPage = 10;
const total = ref(0);
const lastPage = ref(1);

const { fetchPosts } = useBlogQuery();

async function loadPosts(page: number) {
  loading.value = true;
  try {
    const data = await fetchPosts({ page, per_page: perPage });
    posts.value = data.content?.data || [];
    total.value = data.content?.total || 0;
    lastPage.value = data.content?.last_page || 1;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <Table>
      <TableCaption>A list of your blog posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[80px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead class="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="loading">
          <TableCell colspan="5" class="text-center">Loading...</TableCell>
        </TableRow>
        <TableRow v-else-if="posts.length === 0">
          <TableCell colspan="5" class="text-center">No data</TableCell>
        </TableRow>
        <TableRow v-else v-for="post in posts" :key="post.id">
          <TableCell class="font-medium">{{ post.id }}</TableCell>
          <TableCell>{{ post.title }}</TableCell>
          <TableCell>{{ post.author }}</TableCell>
          <TableCell>{{ post.category_id }}</TableCell>
          <TableCell class="text-right">{{ post.created_at }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      :items-per-page="perPage"
      :total="total"
      :default-page="1"
      v-slot="{ page }"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationEllipsis v-if="lastPage > 5" :index="4" />
        <PaginationNext />
      </PaginationContent>
      <span v-if="page" style="display: none">
        {{
          watch(
            () => page,
            (val) => loadPosts(val),
            { immediate: true },
          )
        }}
      </span>
    </Pagination>
  </div>
</template>
