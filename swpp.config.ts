import { defineConfig, defineCrossEnv } from 'swpp-backends';
 
defineConfig({
    compilationEnv: {
        // 此项是必须配置的项目，swpp 必须知道您的域名才能区分哪些资源是外部资源。
        // 部分前端实现可能会帮您自动填写该项目，具体是否必须手动填写请见前端实现的文档。
        DOMAIN_HOST: new URL('https://blog.sinzmise.top'),
        SERVICE_WORKER: 'swpp'
    }
})

defineCrossEnv({
    CACHE_NAME: 'CetaHouseCache'
})