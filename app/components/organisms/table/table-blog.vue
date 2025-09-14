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
import { Trash2 } from "lucide-vue-next";
import ModalDeleteBlog from "@/components/organisms/modal/blog/modal-delete-blog.vue";

const posts = ref<BlogProps[]>([]);
const loading = ref(true);
const perPage = 10;
const total = ref(0);
const lastPage = ref(1);

const showDeleteModal = ref(false);
const selectedBlog = ref<BlogProps | null>(null);

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

function openDeleteModal(blog: BlogProps) {
  selectedBlog.value = blog;
  showDeleteModal.value = true;
}

function handleDeleted() {
  showDeleteModal.value = false;
  // reload current page
  const currentPage =
    document.querySelector("[data-pagination-current]")?.textContent || 1;
  loadPosts(Number(currentPage));
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
          <TableHead class="text-center w-[60px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="loading">
          <TableCell colspan="6" class="text-center">Loading...</TableCell>
        </TableRow>
        <TableRow v-else-if="posts.length === 0">
          <TableCell colspan="6" class="text-center">No data</TableCell>
        </TableRow>
        <TableRow v-else v-for="post in posts" :key="post.id">
          <TableCell class="font-medium">{{ post.id }}</TableCell>
          <TableCell>{{ post.title }}</TableCell>
          <TableCell>{{ post.author }}</TableCell>
          <TableCell>{{ post.category_id }}</TableCell>
          <TableCell class="text-right">{{ post.created_at }}</TableCell>
          <TableCell class="text-center">
            <button
              class="text-red-500 hover:bg-red-100 rounded p-1"
              @click="openDeleteModal(post)"
              title="Delete"
            >
              <Trash2 :size="18" />
            </button>
          </TableCell>
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
            :data-pagination-current="item.value === page ? 'true' : undefined"
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

    <ModalDeleteBlog
      v-if="selectedBlog"
      v-model:open="showDeleteModal"
      :blog="selectedBlog"
      @deleted="handleDeleted"
    />
  </div>
</template>
