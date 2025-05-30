import { defineConfig } from "vitepress";
import { createRssFile } from "./theme/utils/generateRSS.mjs";
import { withPwa } from "@vite-pwa/vitepress";
import {
  getAllPosts,
  getAllType,
  getAllCategories,
  getAllArchives,
} from "./theme/utils/getPostData.mjs";
import { jumpRedirect } from "./theme/utils/commonTools.mjs";
import { getThemeConfig } from "./init.mjs";
import markdownConfig from "./theme/utils/markdownConfig.mjs";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from "path";

// 获取全局数据
const postData = await getAllPosts();

// 获取主题配置
const themeConfig = await getThemeConfig();

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    title: themeConfig.siteMeta.title,
    description: themeConfig.siteMeta.description,
    lang: themeConfig.siteMeta.lang,
    // 简洁的 URL
    cleanUrls: true,
    // 最后更新时间戳
    lastUpdated: true,
    // 主题
    appearance: "dark",
    // sitemap
    sitemap: {
      hostname: themeConfig.siteMeta.site,
    },
    // 主题配置
    themeConfig: {
      ...themeConfig,
      // 必要数据
      postData: postData,
      tagsData: getAllType(postData),
      categoriesData: getAllCategories(postData),
      archivesData: getAllArchives(postData),
      lastUpdated: {
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium'
        }
      },
    },
    // markdown
    markdown: {
      math: true,
      lineNumbers: true,
      toc: { level: [1, 2, 3] },
      image: {
        lazyLoading: true,
      },
      config: (md) => markdownConfig(md, themeConfig),
    },
    // 构建排除
    srcExclude: ["**/README.md", "**/TODO.md"],
    // transformHead
    transformPageData: async (pageData) => {
      // canonical URL
      const canonicalUrl = `${themeConfig.siteMeta.site}/${pageData.relativePath}`
        .replace(/index\.md$/, "")
        .replace(/\.md$/, "");
      pageData.frontmatter.head ??= [];
      pageData.frontmatter.head.push(...themeConfig.inject.header,["link", { rel: "canonical", href: canonicalUrl }]);
    },
    // transformHtml
    transformHtml: (html) => {
      return jumpRedirect(html, themeConfig);
    },
    // buildEnd
    buildEnd: async (config) => {
      await createRssFile(config, themeConfig);
    },
    // vite
    vite: {
      plugins: [
        AutoImport({
          imports: ["vue", "vitepress"],
          dts: ".vitepress/auto-imports.d.ts",
        }),
        Components({
          dirs: [".vitepress/theme/components", ".vitepress/theme/views"],
          extensions: ["vue", "md"],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: ".vitepress/components.d.ts",
        }),
      ],
      resolve: {
        // 配置路径别名
        alias: {
          // eslint-disable-next-line no-undef
          "@": path.resolve(__dirname, "./theme"),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ["legacy-js-api"],
          },
        },
      },
      // 服务器
      server: {
        port: 9877,
      },
      // 构建
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      },
    },
    // PWA
    pwa: {
      registerType: "autoUpdate",
      selfDestroying: true,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // 资源缓存
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
            handler: "CacheFirst",
            options: {
              cacheName: "file-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /^https:\/\/cdn2\.codesign\.qq\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "iconfont-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 2,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/jsd\.cdn\.sinzmise\.top\/.*/i, // 匹配需要缓存的 jsdelivr 图片
            handler: "NetworkFirst", // 网络优先策略
            options: {
              cacheName: "jsdelivr-images-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
        ],
        // 缓存文件
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}"],
        // 排除路径
        navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/rss.xml$/, /^\/robots.txt$/, /^\/atom.xml$/, /^\/redirect.html$/, /^\/redirect$/, /^\/friend.json$/],
      },
      manifest: {
        name: themeConfig.siteMeta.title,
        short_name: themeConfig.siteMeta.title,
        description: themeConfig.siteMeta.description,
        display: "standalone",
        start_url: "/",
        scope: "/",
        theme_color: "#ccf6f4",
        background_color: "#ccf6f4",
        icons: [
          {
            "src": "/images/siteicon/windows11/SmallTile.scale-100.png",
            "sizes": "71x71"
          },
          {
            "src": "/images/siteicon/windows11/SmallTile.scale-125.png",
            "sizes": "89x89"
          },
          {
            "src": "/images/siteicon/windows11/SmallTile.scale-150.png",
            "sizes": "107x107"
          },
          {
            "src": "/images/siteicon/windows11/SmallTile.scale-200.png",
            "sizes": "142x142"
          },
          {
            "src": "/images/siteicon/windows11/SmallTile.scale-400.png",
            "sizes": "284x284"
          },
          {
            "src": "/images/siteicon/windows11/Square150x150Logo.scale-100.png",
            "sizes": "150x150"
          },
          {
            "src": "/images/siteicon/windows11/Square150x150Logo.scale-125.png",
            "sizes": "188x188"
          },
          {
            "src": "/images/siteicon/windows11/Square150x150Logo.scale-150.png",
            "sizes": "225x225"
          },
          {
            "src": "/images/siteicon/windows11/Square150x150Logo.scale-200.png",
            "sizes": "300x300"
          },
          {
            "src": "/images/siteicon/windows11/Square150x150Logo.scale-400.png",
            "sizes": "600x600"
          },
          {
            "src": "/images/siteicon/windows11/Wide310x150Logo.scale-100.png",
            "sizes": "310x150"
          },
          {
            "src": "/images/siteicon/windows11/Wide310x150Logo.scale-125.png",
            "sizes": "388x188"
          },
          {
            "src": "/images/siteicon/windows11/Wide310x150Logo.scale-150.png",
            "sizes": "465x225"
          },
          {
            "src": "/images/siteicon/windows11/Wide310x150Logo.scale-200.png",
            "sizes": "620x300"
          },
          {
            "src": "/images/siteicon/windows11/Wide310x150Logo.scale-400.png",
            "sizes": "1240x600"
          },
          {
            "src": "/images/siteicon/windows11/LargeTile.scale-100.png",
            "sizes": "310x310"
          },
          {
            "src": "/images/siteicon/windows11/LargeTile.scale-125.png",
            "sizes": "388x388"
          },
          {
            "src": "/images/siteicon/windows11/LargeTile.scale-150.png",
            "sizes": "465x465"
          },
          {
            "src": "/images/siteicon/windows11/LargeTile.scale-200.png",
            "sizes": "620x620"
          },
          {
            "src": "/images/siteicon/windows11/LargeTile.scale-400.png",
            "sizes": "1240x1240"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.scale-100.png",
            "sizes": "44x44"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.scale-125.png",
            "sizes": "55x55"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.scale-150.png",
            "sizes": "66x66"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.scale-200.png",
            "sizes": "88x88"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.scale-400.png",
            "sizes": "176x176"
          },
          {
            "src": "/images/siteicon/windows11/StoreLogo.scale-100.png",
            "sizes": "50x50"
          },
          {
            "src": "/images/siteicon/windows11/StoreLogo.scale-125.png",
            "sizes": "63x63"
          },
          {
            "src": "/images/siteicon/windows11/StoreLogo.scale-150.png",
            "sizes": "75x75"
          },
          {
            "src": "/images/siteicon/windows11/StoreLogo.scale-200.png",
            "sizes": "100x100"
          },
          {
            "src": "/images/siteicon/windows11/StoreLogo.scale-400.png",
            "sizes": "200x200"
          },
          {
            "src": "/images/siteicon/windows11/SplashScreen.scale-100.png",
            "sizes": "620x300"
          },
          {
            "src": "/images/siteicon/windows11/SplashScreen.scale-125.png",
            "sizes": "775x375"
          },
          {
            "src": "/images/siteicon/windows11/SplashScreen.scale-150.png",
            "sizes": "930x450"
          },
          {
            "src": "/images/siteicon/windows11/SplashScreen.scale-200.png",
            "sizes": "1240x600"
          },
          {
            "src": "/images/siteicon/windows11/SplashScreen.scale-400.png",
            "sizes": "2480x1200"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-16.png",
            "sizes": "16x16"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-20.png",
            "sizes": "20x20"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-24.png",
            "sizes": "24x24"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-30.png",
            "sizes": "30x30"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-32.png",
            "sizes": "32x32"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-36.png",
            "sizes": "36x36"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-40.png",
            "sizes": "40x40"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-44.png",
            "sizes": "44x44"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-48.png",
            "sizes": "48x48"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-60.png",
            "sizes": "60x60"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-64.png",
            "sizes": "64x64"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-72.png",
            "sizes": "72x72"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-80.png",
            "sizes": "80x80"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-96.png",
            "sizes": "96x96"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.targetsize-256.png",
            "sizes": "256x256"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
            "sizes": "16x16"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
            "sizes": "20x20"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
            "sizes": "24x24"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
            "sizes": "30x30"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
            "sizes": "32x32"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
            "sizes": "36x36"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
            "sizes": "40x40"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
            "sizes": "44x44"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
            "sizes": "48x48"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
            "sizes": "60x60"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
            "sizes": "64x64"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
            "sizes": "72x72"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
            "sizes": "80x80"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
            "sizes": "96x96"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
            "sizes": "256x256"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
            "sizes": "16x16"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
            "sizes": "20x20"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
            "sizes": "24x24"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
            "sizes": "30x30"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
            "sizes": "32x32"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
            "sizes": "36x36"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
            "sizes": "40x40"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
            "sizes": "44x44"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
            "sizes": "48x48"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
            "sizes": "60x60"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
            "sizes": "64x64"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
            "sizes": "72x72"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
            "sizes": "80x80"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
            "sizes": "96x96"
          },
          {
            "src": "/images/siteicon/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
            "sizes": "256x256"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-512-512.png",
            "sizes": "512x512"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-192-192.png",
            "sizes": "192x192"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-144-144.png",
            "sizes": "144x144"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-96-96.png",
            "sizes": "96x96"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-72-72.png",
            "sizes": "72x72"
          },
          {
            "src": "/images/siteicon/android/android-launchericon-48-48.png",
            "sizes": "48x48"
          },
          {
            "src": "/images/siteicon/ios/16.png",
            "sizes": "16x16"
          },
          {
            "src": "/images/siteicon/ios/20.png",
            "sizes": "20x20"
          },
          {
            "src": "/images/siteicon/ios/29.png",
            "sizes": "29x29"
          },
          {
            "src": "/images/siteicon/ios/32.png",
            "sizes": "32x32"
          },
          {
            "src": "/images/siteicon/ios/40.png",
            "sizes": "40x40"
          },
          {
            "src": "/images/siteicon/ios/50.png",
            "sizes": "50x50"
          },
          {
            "src": "/images/siteicon/ios/57.png",
            "sizes": "57x57"
          },
          {
            "src": "/images/siteicon/ios/58.png",
            "sizes": "58x58"
          },
          {
            "src": "/images/siteicon/ios/60.png",
            "sizes": "60x60"
          },
          {
            "src": "/images/siteicon/ios/64.png",
            "sizes": "64x64"
          },
          {
            "src": "/images/siteicon/ios/72.png",
            "sizes": "72x72"
          },
          {
            "src": "/images/siteicon/ios/76.png",
            "sizes": "76x76"
          },
          {
            "src": "/images/siteicon/ios/80.png",
            "sizes": "80x80"
          },
          {
            "src": "/images/siteicon/ios/87.png",
            "sizes": "87x87"
          },
          {
            "src": "/images/siteicon/ios/100.png",
            "sizes": "100x100"
          },
          {
            "src": "/images/siteicon/ios/114.png",
            "sizes": "114x114"
          },
          {
            "src": "/images/siteicon/ios/120.png",
            "sizes": "120x120"
          },
          {
            "src": "/images/siteicon/ios/128.png",
            "sizes": "128x128"
          },
          {
            "src": "/images/siteicon/ios/144.png",
            "sizes": "144x144"
          },
          {
            "src": "/images/siteicon/ios/152.png",
            "sizes": "152x152"
          },
          {
            "src": "/images/siteicon/ios/167.png",
            "sizes": "167x167"
          },
          {
            "src": "/images/siteicon/ios/180.png",
            "sizes": "180x180"
          },
          {
            "src": "/images/siteicon/ios/192.png",
            "sizes": "192x192"
          },
          {
            "src": "/images/siteicon/ios/256.png",
            "sizes": "256x256"
          },
          {
            "src": "/images/siteicon/ios/512.png",
            "sizes": "512x512"
          },
          {
            "src": "/images/siteicon/ios/1024.png",
            "sizes": "1024x1024"
          }
        ],
      },
    },
  }),
);
