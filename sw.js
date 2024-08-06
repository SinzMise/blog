// noinspection JSIgnoredPromiseFromCall

(() => {
    /** 缓存库名称 */
    const CACHE_NAME = 'StoriHouseCache'
    /** 控制信息存储地址（必须以`/`结尾） */
    const CTRL_PATH = 'https://id.v3/'

    const ejectDomain = 'blog.sinzmise.top'
    const ejectMirror = ['https://registry.npmmirror.com/sinzmise-cetastories/latest', 'https://registry.npmjs.org/sinzmise-cetastories/latest', 'https://mirrors.cloud.tencent.com/npm/sinzmise-cetastories/latest', 'https://registry.npmmirror.com/sinzmise-cetastories/latest']


    /**
     * 读取本地版本号
     * @return {Promise<BrowserVersion|undefined>}
     */
    const readVersion = () => caches.match(CTRL_PATH).then(response => response?.json())
    /**
     * 写入版本号
     * @param version {BrowserVersion}
     * @return {Promise<void>}
     */
    const writeVersion = version => caches.open(CACHE_NAME)
        .then(cache => cache.put(CTRL_PATH, new Response(JSON.stringify(version))))

    self.addEventListener('install', () => {
        self.skipWaiting()
        const escape = 0
        if (escape) {
            readVersion().then(async oldVersion => {
                // noinspection JSIncompatibleTypesComparison
                if (oldVersion && oldVersion.escape !== escape) {
                    const list = await caches.open(CACHE_NAME)
                        .then(cache => cache.keys())
                        .then(keys => keys?.map(it => it.url))
                    await caches.delete(CACHE_NAME)
                    const info = await updateJson()
                    info.type = 'escape'
                    info.list = list
                    // noinspection JSUnresolvedReference
                    const clientList = await clients.matchAll()
                    clientList.forEach(client => client.postMessage(info))
                }
            })
        }
    })

    // sw 激活后立即对所有页面生效，而非等待刷新
    // noinspection JSUnresolvedReference
    self.addEventListener('activate', event => event.waitUntil(clients.claim()))

    /**
     * 基础 fetch
     * @param request {Request|string}
     * @param banCache {boolean} 是否禁用缓存
     * @param cors {boolean} 是否启用 cors
     * @param optional {RequestInit?} 额外的配置项
     * @return {Promise<Response>}
     */
    const baseFetcher = (request, banCache, cors, optional) => {
        if (!optional) optional = {}
        optional.cache = banCache ? 'no-store' : 'default'
        if (cors) {
            optional.mode = 'cors'
            optional.credentials = 'same-origin'
        }
        return fetch(request, optional)
    }

    /**
     * 添加 cors 配置请求指定资源
     * @param request {Request}
     * @param optional {RequestInit?} 额外的配置项
     * @return {Promise<Response>}
     */
    const fetchWithCache = (request, optional) =>
        baseFetcher(request, false, isCors(request), optional)

    // noinspection JSUnusedLocalSymbols
    /**
     * 添加 cors 配置请求指定资源
     * @param request {Request}
     * @param banCache {boolean} 是否禁用 HTTP 缓存
     * @param optional {RequestInit?} 额外的配置项
     * @return {Promise<Response>}
     */
    const fetchWithCors = (request, banCache, optional) =>
        baseFetcher(request, banCache, true, optional)

    /**
     * 判断指定 url 击中了哪一种缓存，都没有击中则返回 null
     * @param url {URL}
     */
    const findCache = url => {
        if (url.hostname === 'localhost') return
        for (let key in cacheRules) {
            const value = cacheRules[key]
            if (value.match(url)) return value
        }
    }

    // noinspection JSFileReferences
    let skipRequest = request => request.url.startsWith('https://i0.hdslb.com')
let cacheRules = {
simple: {
clean: true,
search: false,
match: url => {
            const allowedHost = ejectDomain;
            const allowedPaths = ["/404.html", "/css/index.css"];
            return url.host === allowedHost && allowedPaths.includes(url.pathname);
        }}
,
cdn: {
clean: true,
match: url =>
            [
                "unpkg.com",
                "cdn.cbd.int",
                "lf26-cdn-tos.bytecdntp.com",
                "lf6-cdn-tos.bytecdntp.com",
                "lf3-cdn-tos.bytecdntp.com",
                "lf9-cdn-tos.bytecdntp.com",
                "npm.onmicrosoft.cn",
                "cdn.staticfile.org",
                "npm.elemecdn.com",
            ].includes(url.host) && url.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/)}
}

let getSpareUrls = srcUrl => {
    if (srcUrl.startsWith("https://npm.elemecdn.com")) {
        return {
            timeout: 3000,
            list: [srcUrl, `https://cdn.cbd.int/${new URL(srcUrl).pathname}`],
        };
    }
}
let selfdb = () => {
    self.db = { //全局定义db,只要read和write,看不懂可以略过
        read: (key, config) => {
            if (!config) { config = { type: "text" } }
            return new Promise((resolve, reject) => {
                caches.open(CACHE_NAME).then(cache => {
                    cache.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                        if (!res) resolve(null)
                        res.text().then(text => resolve(text))
                    }).catch(() => {
                        resolve(null)
                    })
                })
            })
        },
        write: (key, value) => {
            return new Promise((resolve, reject) => {
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value));
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        }
    }
}
let lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(res)
                    }
                })
        })
    }))
}
let fullpath = (path) => {
    path = path.split('?')[0].split('#')[0]
    if (path.match(/\/$/)) {
        path += 'index'
    }
    if (!path.match(/\.[a-zA-Z]+$/)) {
        path += '.html'
    }
    return path
}
let generate_blog_urls = () => {
    const npmmirror = [
        `https://jsd.cdn.storisinz.site/npm/${packagename}@${blogversion}`,
        `https://npm.elemecdn.com/${packagename}@${blogversion}`,
        `https://cdn1.tianli0.top/npm/${packagename}@${blogversion}`,
        `https://cdn.afdelivr.top/npm/${packagename}@${blogversion}`,
        `https://registry.npmmirror.com/${packagename}/${blogversion}/files`
    ]
    for (var i in npmmirror) {
        npmmirror[i] += path
    }
    return npmmirror
}
let get_newest_version = async (ejectMirror) => {
    return lfetch(ejectMirror, ejectMirror[0])
        .then(res => res.json())
        .then(res.version)
}
let set_newest_version = async (ejectMirror) => {
    return lfetch(ejectMirror, ejectMirror[0])
        .then(res => res.json()) //JSON Parse
        .then(async res => {
            await db.write('blog_version', res.version) //写入
            return;
        })
}
let set_newest_time = () => {
    setInterval(async() => {
        await set_newest_version(mirror) //定时更新,一分钟一次
    }, 60*1000);

    setTimeout(async() => {
        await set_newest_version(mirror)//打开五秒后更新,避免堵塞
    },5000)
    function getFileType(fileName) {
        suffix=fileName.split('.')[fileName.split('.').length-1]
        if(suffix=="html"||suffix=="htm") {
            return 'text/html';
        }
        if(suffix=="js") {
            return 'text/javascript';
        }
        if(suffix=="css") {
            return 'text/css';
        }
        if(suffix=="jpg"||suffix=="jpeg") {
            return 'image/jpeg';
        }
        if(suffix=="ico") {
            return 'image/x-icon';
        }
        if(suffix=="png") {
            return 'image/png';
        }
        return 'text/plain';
    }
}
let handle = async(req)=> {
    const urlStr = req.url
    const urlObj = new URL(urlStr);
    const urlPath = urlObj.pathname;
    const domain = urlObj.hostname;
    //从这里开始
    lxs=[]
    if(domain === "blog.sinzmise.top"){//这里写你需要拦截的域名
        var l=lfetch(generate_blog_urls('sinzmise-cetastories',await db.read('blog_version') || 'latest',fullpath(urlPath)))
        return l
            .then(res=>res.arrayBuffer())
            .then(buffer=>new Response(buffer,{headers:{"Content-Type":`${getFileType(fullpath(urlPath).split("/")[fullpath(urlPath).split("/").length-1].split("\\")[fullpath(urlPath).split("/")[fullpath(urlPath).split("/").length-1].split("\\").length-1])};charset=utf-8`}}));//重新定义header
    }
    else{
        return fetch(req);
    }
}
let isCors = () => false
let isMemoryQueue = () => false
const fetchFile = (request, banCache, urls = null) => {
        if (!urls) {
            urls = getSpareUrls(request.url)
            if (!urls) return fetchWithCors(request, banCache)
        }
        const list = urls.list
        const controllers = new Array(list.length)
        // noinspection JSCheckFunctionSignatures
        const startFetch = index => fetchWithCors(
                new Request(list[index], request),
                banCache,
                {signal: (controllers[index] = new AbortController()).signal}
            ).then(response => checkResponse(response) ? {r: response, i: index} : Promise.reject())
        return new Promise((resolve, reject) => {
            let flag = true
            const startAll = () => {
                flag = false
                Promise.any([
                    first,
                    ...Array.from({
                        length: list.length - 1
                    }, (_, index) => index + 1).map(index => startFetch(index))
                ]).then(res => {
                    for (let i = 0; i !== list.length; ++i) {
                        if (i !== res.i)
                            controllers[i].abort()
                    }
                    resolve(res.r)
                }).catch(() => reject(`请求 ${request.url} 失败`))
            }
            const id = setTimeout(startAll, urls.timeout)
            const first = startFetch(0)
                .then(res => {
                    if (flag) {
                        clearTimeout(id)
                        resolve(res.r)
                    }
                }).catch(() => {
                    if (flag) {
                        clearTimeout(id)
                        startAll()
                    }
                    return Promise.reject()
                })
        })
    }

    // 检查请求是否成功
    // noinspection JSUnusedLocalSymbols
    const checkResponse = response => response.ok || [301, 302, 307, 308].includes(response.status)

    /**
     * 删除指定缓存
     * @param list 要删除的缓存列表
     * @return {Promise<string[]>} 删除的缓存的URL列表
     */
    const deleteCache = list => caches.open(CACHE_NAME).then(cache => cache.keys()
        .then(keys => Promise.all(
            keys.map(async it => {
                const url = it.url
                if (url !== CTRL_PATH && list.match(url)) {
                    // [debug delete]
                    // noinspection ES6MissingAwait,JSCheckFunctionSignatures
                    cache.delete(it)
                    return url
                }
                return null
            })
        )).then(list => list.filter(it => it))
    )

    /**
     * 缓存列表
     * @type {Map<string, function(any)[]>}
     */
    const cacheMap = new Map()

    self.addEventListener('fetch', event => {
        let request = event.request
        let url = new URL(request.url)
        // [blockRequest call]
        if (request.method !== 'GET' || !request.url.startsWith('http')) return
        // [modifyRequest call]
        if (skipRequest(request)) return;
        let cacheKey = url.hostname + url.pathname + url.search
        let cache
        if (isMemoryQueue(request)) {
            cache = cacheMap.get(cacheKey)
            if (cache) {
                return event.respondWith(
                    new Promise((resolve, reject) => {
                        cacheMap.get(cacheKey).push(arg => arg.body ? resolve(arg) : reject(arg))
                    })
                )
            }
            cacheMap.set(cacheKey, cache = [])
        }
        /** 处理拉取 */
        const handleFetch = promise => {
            event.respondWith(
                cache ? promise.then(response => {
                    for (let item of cache) {
                        item(response.clone())
                    }
                }).catch(err => {
                    for (let item of cache) {
                        item(err)
                    }
                }).then(() => {
                    cacheMap.delete(cacheKey)
                    return promise
                }) : promise
            )
        }
        const cacheRule = findCache(url)
        if (cacheRule) {
            let key = `https://${url.host}${url.pathname}`
            if (key.endsWith('/index.html')) key = key.substring(0, key.length - 10)
            if (cacheRule.search) key += url.search
            handleFetch(
                caches.match(key).then(
                    cache => cache ?? fetchFile(request, true)
                        .then(response => {
                            if (checkResponse(response)) {
                                const clone = response.clone()
                                caches.open(CACHE_NAME).then(it => it.put(key, clone))
                                // [debug put]
                            }
                            return response
                        })
                )
            )
        } else {
            const urls = getSpareUrls(request.url)
            if (urls) handleFetch(fetchFile(request, false, urls))
            // [modifyRequest else-if]
            else handleFetch(fetchWithCache(request).catch(err => new Response(err, {status: 499})))
        }
    })

    self.addEventListener('message', event => {
        // [debug message]
        if (event.data === 'update')
            updateJson().then(info => {
                info.type = 'update'
                event.source.postMessage(info)
            })
    })

    /**
     * 根据JSON删除缓存
     * @returns {Promise<UpdateInfo>}
     */
    const updateJson = async () => {
        /**
         * 解析elements，并把结果输出到list中
         * @return boolean 是否刷新全站缓存
         */
        const parseChange = (list, elements, ver) => {
            for (let element of elements) {
                const {version, change} = element
                if (version === ver) return false
                if (change) {
                    for (let it of change)
                        list.push(new CacheChangeExpression(it))
                }
            }
            // 跨版本幅度过大，直接清理全站
            return true
        }
        /**
         * 解析字符串
         * @return {Promise<{
         *     list?: VersionList,
         *     new: BrowserVersion,
         *     old: BrowserVersion
         * }>}
         */
        const parseJson = json => readVersion().then(oldVersion => {
            const {info, global} = json
            /** @type {BrowserVersion} */
            const newVersion = {global, local: info[0].version, escape: oldVersion?.escape ?? 0}
            // 新用户和刚进行过逃逸操作的用户不进行更新操作
            if (!oldVersion) {
                // noinspection JSValidateTypes
                newVersion.escape = 0
                writeVersion(newVersion)
                return {new: newVersion, old: oldVersion}
            }
            let list = new VersionList()
            let refresh = parseChange(list, info, oldVersion.local)
            writeVersion(newVersion)
            // [debug escape]
            // 如果需要清理全站
            if (refresh) {
                if (global !== oldVersion.global) list.force = true
                else list.refresh = true
            }
            return {list, new: newVersion, old: oldVersion}
        })
        const response = await fetchFile(new Request('/update.json'), false)
        if (!checkResponse(response))
            throw `加载 update.json 时遇到异常，状态码：${response.status}`
        const json = await response.json()
        const result = await parseJson(json)
        if (result.list) {
            const list = await deleteCache(result.list)
            result.list = list?.length ? list : null
        }
        // noinspection JSValidateTypes
        return result
    }

    /**
     * 版本列表
     * @constructor
     */
    function VersionList() {

        const list = []

        /**
         * 推送一个表达式
         * @param element {CacheChangeExpression} 要推送的表达式
         */
        this.push = element => {
            list.push(element)
        }

        /**
         * 判断指定 URL 是否和某一条规则匹配
         * @param url {string} URL
         * @return {boolean}
         */
        this.match = url => {
            if (this.force) return true
            // noinspection JSValidateTypes
            url = new URL(url)
            if (this.refresh) {
                // noinspection JSCheckFunctionSignatures
                return findCache(url).clean
            }
            else {
                for (let it of list) {
                    if (it.match(url)) return true
                }
            }
            return false
        }

    }

    // noinspection SpellCheckingInspection
    /**
     * 缓存更新匹配规则表达式
     * @param json 格式{"flag": ..., "value": ...}
     * @see https://kmar.top/posts/bcfe8408/#23bb4130
     * @constructor
     */
    function CacheChangeExpression(json) {
        /**
         * 遍历所有value
         * @param action {function(string): boolean} 接受value并返回bool的函数
         * @return {boolean} 如果value只有一个则返回`action(value)`，否则返回所有运算的或运算（带短路）
         */
        const forEachValues = action => {
            const value = json.value
            if (Array.isArray(value)) {
                for (let it of value) {
                    if (action(it)) return true
                }
                return false
            } else return action(value)
        }
        const getMatch = () => {
            switch (json['flag']) {
                case 'html':
                    return url => url.pathname.match(/(\/|\.html)$/)
                case 'end':
                    return url => forEachValues(value => url.href.endsWith(value))
                case 'begin':
                    return url => forEachValues(value => url.pathname.startsWith(value))
                case 'str':
                    return url => forEachValues(value => url.href.includes(value))
                case 'reg':
                    // noinspection JSCheckFunctionSignatures
                    return url => forEachValues(value => url.href.match(new RegExp(value, 'i')))
                default: throw `未知表达式：${JSON.stringify(json)}`
            }
        }
        this.match = getMatch()
    }
})()