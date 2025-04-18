<script setup lang="ts">
import { useFrontmatter } from "valaxy";
import { usePrevNext } from "valaxy";
import { useThemeConfig } from "../../composables";
import { formatTimestamp } from '../../utils'
import { useScriptTag } from '@vueuse/core'
useScriptTag('/js/tab.js')

const themeConfig = useThemeConfig();
const [prev, next] = usePrevNext();
const frontmatter = useFrontmatter();
const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("zh-CN", options);
};

</script>

<template>
  <div class="card">
    <div class="card-image" v-if="frontmatter.cover">
      <figure class="h-80 relative">
        <img
          class="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
          :src="frontmatter.cover"
          alt="Post cover image"
        />
      </figure>
    </div>
    <div class="card-content">
      <p class="text-2xl mb-2 p-name">{{ frontmatter.title }}</p>
      <p class="text-base">
        <time class="dt-published" :datetime="formatTimestamp(frontmatter.date as Date)">{{ formatDate(frontmatter.date as Date) }} &#x2022;</time>
        <a class="p-category">{{ Array.isArray(frontmatter.categories) ? frontmatter.categories.flat().join(', ') : frontmatter.categories ?? "未分类" }}</a>
      </p>
      <br />
      <div class="content break-words">
        <TimeWarning />
        <div class="e-content">
          <slot />
        </div>
      </div>
    </div>
    <Copyright />
  </div>
  <div class="my-4">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="text-left">
        <RouterLink
          class="button is-ghost"
          v-if="prev"
          :to="prev.path || ''"
          :title="prev.title"
        >
          <span class="icon i-ic-baseline-arrow-back truncate"></span>
          <span class="truncate max-w-40">{{ prev.title }}</span>
        </RouterLink>
      </div>
      <div class="text-right">
        <RouterLink class="button is-ghost" v-if="next" :to="next.path || ''">
          <span class="truncate max-w-40">{{ next.title }}</span>
          <span class="icon i-ic-baseline-arrow-forward"></span>
        </RouterLink>
      </div>
    </div>
  </div>
  <Donate class="mb-4" />
  <Comment />
  <div class="card" v-if="themeConfig.webmention.enable">
    <div class="card-content">
      <ClientOnly>
        <Webmention />
        <SendWebmention />
      </ClientOnly>
    </div>
  </div>
</template>
