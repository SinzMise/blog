---
title: 友人帐
date: 2020-12-01 22:19:45
type: link
top_img: false
aside: false
---
# 通过qexo添加的
{% raw %}

<div id="qexo-friends"></div>
<link rel="stylesheet" href="https://jsd.cdn.storisinz.site/npm/qexo-static@1.6.0/hexo/friends.css"/>

<script data-pjax src="https://jsd.cdn.storisinz.site/npm/qexo-static@1.6.0/hexo/friends.js"></script>
<script data-pjax>loadQexoFriends("qexo-friends", "https://houtai.hexo.sinzmise.top")</script>

<link rel="stylesheet" href="/css/apursuer-hexo-friend-links.css"/>

{% endraw %}
# 待君归（大佬）
```yaml
      # 已经永久停止更新
      - name: 陈鑫磊的博客
        link: https://www.cxl2020mc.top
        avatar: https://public.img.cxl2020mc.top/avatar.png
        descr: 这个人太懒了啥也没写......
        siteshot: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://www.cxl2020mc.top
      # 未添加本站链接
      - name: 沧海网络
        link: https://www.halloworlds.cn
        avatar: https://www.halloworlds.cn/wp-content/uploads/2022/01/1640496399484.png
        descr: 冲天香阵透长安，满城尽带黄金甲
        siteshot: https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://www.halloworlds.cn
      # 未添加本站链接，新友链页面没法添加
      - name: 醉里博客
        link: https://202271.xyz
        avatar: https://202271.xyz/images/uploads/android-chrome-192x192.png
        descr: 小豪的个人博客
        siteshot: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://202271.xyz
```
# 失去同步！（小伙伴）
```yaml
      #（无法访问，疑似域名被卖掉）
      - name: HeiYing
        link: https://blog.black-ying.online
        avatar: https://blog.black-ying.online/img/avatar.jpg
        descr: 游龙当归海，海不迎我自来也。
        siteshot: https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://blog.black-ying.online
      #（疑似停止更新）
    # 未添加本站链接
      - name: YYDS Space
        link: https://www.yyds.space
        avatar: https://www.yyds.space/public/images/author.jpg
        descr: A space for sharing technology.
        siteshot: https://www.yyds.space/public/images/siteshot.jpg
```
（既然“小伙伴们”的友情链接超过10条，那么是时候该提一下添加要求了）
# 本站添加友链要求
1. 站点可以在中国大陆区域正常访问且内容符合中国大陆法律法规
2. 站点友情链接含本站链接
3. 站点类型为**博客**（除我主动申请的链接之外）
   {% tabs 友链添加方式 %}
<!-- tab General -->
| 名称      | 值 |
| ----------- | ----------- |
|站点名称|汐塔魔法屋|
|站点地址|https://blog.sinzmise.top/|
|站点描述|种下一颗有故事的种子，让它带着魔法和奇迹生根发芽|
|站点图像|https://blog.sinzmise.top/images/icon.png|
|站点页面|https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://blog.sinzmise.top/|
|站点关键词|王九弦SZ·Ninty,汐塔魔法屋,个人网站,个人博客|
|站点配色|#e66744或#ef9140|
|rss链接|https://blog.sinzmise.top/atom.xml|
<!-- endtab -->
<!-- tab Butterfly(anzhiyu) & MengD -->
```yml
- name: 汐塔魔法屋
  link: https://blog.sinzmise.top/
  avatar: https://blog.sinzmise.top/images/icon.png
  descr: 种下一颗有故事的种子，让它带着魔法和奇迹生根发芽
  siteshot: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://blog.sinzmise.top/
  theme_color: "#e66744"
```
<!-- endtab -->
<!-- tab Volantis -->
```yml
- name: 汐塔魔法屋
  link: https://blog.sinzmise.top/
  avatar: https://blog.sinzmise.top/images/icon.png
  description: 种下一颗有故事的种子，让它带着魔法和奇迹生根发芽
  keywords: 王九弦SZ·Ninty,汐塔魔法屋,个人网站,个人博客
  screenshot: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://blog.sinzmise.top/
```
<!-- endtab -->
<!-- tab Yun -->
```json
{
    "url": "https://blog.sinzmise.top/",
    "avatar": "https://blog.sinzmise.top/images/icon.png",
    "name": "王九弦SZ·Ninty",
    "color": "#e66744", //或者 #ef9140
    "blog": "汐塔魔法屋", 
    "desc": "种下一颗有故事的种子，让它带着魔法和奇迹生根发芽"
}
```
<!-- endtab -->
<!-- tab fluid -->
```yml
- {
  name: '汐塔魔法屋',
  intro: '种下一颗有故事的种子，让它带着魔法和奇迹生根发芽',
  link: 'https://blog.sinzmise.top/',
  avatar: 'https://blog.sinzmise.top/images/icon.png'
}
```
<!-- endtab -->
<!-- tab Html -->
```html
<a href="https://blog.sinzmise.top/"><img src="https://blog.sinzmise.top/images/icon.png" alt="avatar">汐塔魔法屋</a>
```
<!-- endtab -->
<!-- tab jade -->
```pug
a(href='https://blog.sinzmise.top/')
  img(src='https://blog.sinzmise.top/images/icon.png', alt='avatar') 汐塔魔法屋
```
或者
```pug
a(href='https://blog.sinzmise.top/' rel="external nofollow") 汐塔魔法屋
```
<!-- endtab -->
{% endtabs %}
# 评论区申请（速度较慢）
<div class="addBtns"><button class="addBtn btn-beautify block orange larger" onclick="leonus.linkCom()"><i class="fa-solid fa-circle-plus"></i>&nbsp;快速申请 (默认样式)</button> <button class="addBtn btn-beautify block orange larger" onclick="leonus.linkCom(&quot;bf&quot;)"><i class="fa-solid fa-circle-plus"></i>&nbsp;快速申请 (Butterfly)</button></div>
<script src="/js/kslink.js"></script>

## Qexo申请（速度较快）
<article class="message is-info">
    <div class="message-header">
        通过Qexo申请友链
    </div>
    <div class="message-body">
        <div class="form-ask-friend">
            <div class="field">
                <label class="label">站点名字</label>
                <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="你的站点名字" id="friend-name" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-signature"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">站点链接</label>
            <div class="control has-icons-left">
                <input class="input" type="url" placeholder="你的站点链接" id="friend-link" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-link"></i>
                </span>
            </div>
            <p class="help ">请确保该网站可访问！</p>
            </div>
            <div class="field">
                <label class="label">站点图标</label>
                <div class="control has-icons-left">
                    <input class="input" type="url" placeholder="你的站点图标" id="friend-icon" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-image"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label class="label">站点简介</label>
                <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="你的站点简介" id="friend-des" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-info"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" id="friend-check"/> 我不会提交无意义的信息，并且已经遵守以上规则。
                    </label>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-info" type="submit" onclick="askFriend(event)">提交</button>
                </div>
            </div>
        </div>
    </div>
</article>
<script data-pjax src="https://recaptcha.net/recaptcha/api.js?render=6LcrLZwqAAAAAE2vd7a-W_5tNO5jsCI-GXf0ONo8"></script>
<script data-pjax>
function TestUrl(url) {
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    if(objExp.test(url) != true){
        return false;
    }
    return true;
}
function askFriend (event) {
    let check = $("#friend-check").is(":checked");
    let name = $("#friend-name").val();
    let url = $("#friend-link").val();
    let image = $("#friend-icon").val();
    let des = $("#friend-des").val();
    if(!check){
        alert("Please check \"I am not submitting nonsense information\"");
        return;
    }
    if(!(name&&url&&image&&des)){
        alert("The information is incomplete! ");
        return;
    }
    if (!(TestUrl(url))){
        alert("URL format error! Need to include HTTP protocol header! ");
        return;
    }
    if (!(TestUrl(image))){
        alert("The format of the slice URL is wrong! It needs to contain the HTTP protocol header! ");
        return;
    }
    event.target.classList.add('is-loading');
    grecaptcha.ready(function() {
          grecaptcha.execute('6LcrLZwqAAAAAE2vd7a-W_5tNO5jsCI-GXf0ONo8', {action: 'submit'}).then(function(token) {
              $.ajax({
                type: 'get',
                cache: false,
                url: url,
                dataType: "jsonp",
                async: false,
                processData: false,
                //timeout:10000, 
                complete: function (data) {
                    if(data.status==200){
                    $.ajax({
                        type: 'POST',
                        dataType: "json",
                        data: {
                            "name": name,
                            "url": url,
                            "image": image,
                            "description": des,
                            "verify": token,
                        },
                        url: 'https://houtai.hexo.sinzmise.top/pub/ask_friend/',
                        success: function (data) {
                            alert(data.msg);
                        }
                    });}
                    else{
                        alert("The URL cannot be reached!");
                    }
                    event.target.classList.remove('is-loading');
                }
          });
        });
    });
}
</script>

<style>
    .status-tag {
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 3px 8px;
        border-radius: 12px 0px 12px 0px;
        font-size: 12px;
        color: white;
        font-weight: bold;
        transition: font-size 0.3s ease-out, width 0.3s ease-out, opacity 0.3s ease-out;
    }
    .flink-list-item:hover .status-tag {
        font-size: 0px;
        opacity: 0;
    }
    /* 固态颜色 */
    .status-tag-green {
        background-color: #005E00; /* 绿色 */
    }
    .status-tag-light-yellow {
        background-color: #FED101; /* 浅黄色 */
    }
    .status-tag-dark-yellow {
        background-color: #F0B606; /* 深黄色 */
    }
    .status-tag-red {
        background-color: #B90000; /* 红色 */
    }
</style>
<script>
function addStatusTagsWithCache(jsonUrl) {
    const cacheKey = "statusTagsData";
    const cacheExpirationTime = 30 * 60 * 1000; // 半小时
    function applyStatusTags(data) {
        const linkStatus = data.link_status;
        document.querySelectorAll('.site-card').forEach(card => { // 一定要注意这里的类名，小心匹配不上
            if (!card.href) return;
            const link = card.href.replace(/\/$/, '');
            const statusTag = document.createElement('div');
            statusTag.classList.add('status-tag');
            let matched = false;
            // 查找链接状态
            const status = linkStatus.find(item => item.link.replace(/\/$/, '') === link);
            if (status) {
                let latencyText = '未知';
                let className = 'status-tag-red'; // 默认红色
                if (status.latency === -1) {
                    latencyText = '未知';
                } else {
                    latencyText = status.latency.toFixed(2) + ' s';
                    if (status.latency <= 2) {
                        className = 'status-tag-green';
                    } else if (status.latency <= 5) {
                        className = 'status-tag-light-yellow';
                    } else if (status.latency <= 10) {
                        className = 'status-tag-dark-yellow';
                    }
                }
                statusTag.textContent = latencyText;
                statusTag.classList.add(className);
                matched = true;
            }
            if (matched) {
                card.style.position = 'relative';
                card.appendChild(statusTag);
            }
        });
        document.querySelectorAll('.flink-list-item').forEach(card => { // 一定要注意这里的类名，小心匹配不上
            if (!card.href) return;
            const link = card.href.replace(/\/$/, '');
            const statusTag = document.createElement('div');
            statusTag.classList.add('status-tag');
            let matched = false;
            // 查找链接状态
            const status = linkStatus.find(item => item.link.replace(/\/$/, '') === link);
            if (status) {
                let latencyText = '未知';
                let className = 'status-tag-red'; // 默认红色
                if (status.latency === -1) {
                    latencyText = '未知';
                } else {
                    latencyText = status.latency.toFixed(2) + ' s';
                    if (status.latency <= 2) {
                        className = 'status-tag-green';
                    } else if (status.latency <= 5) {
                        className = 'status-tag-light-yellow';
                    } else if (status.latency <= 10) {
                        className = 'status-tag-dark-yellow';
                    }
                }
                statusTag.textContent = latencyText;
                statusTag.classList.add(className);
                matched = true;
            }
            if (matched) {
                card.style.position = 'relative';
                card.appendChild(statusTag);
            }
        });
        document.querySelectorAll('.flink-list-card').forEach(card => { // 一定要注意这里的类名，小心匹配不上
            if (!card.href) return;
            const link = card.href.replace(/\/$/, '');
            const statusTag = document.createElement('div');
            statusTag.classList.add('status-tag');
            let matched = false;
            // 查找链接状态
            const status = linkStatus.find(item => item.link.replace(/\/$/, '') === link);
            if (status) {
                let latencyText = '未知';
                let className = 'status-tag-red'; // 默认红色
                if (status.latency === -1) {
                    latencyText = '未知';
                } else {
                    latencyText = status.latency.toFixed(2) + ' s';
                    if (status.latency <= 2) {
                        className = 'status-tag-green';
                    } else if (status.latency <= 5) {
                        className = 'status-tag-light-yellow';
                    } else if (status.latency <= 10) {
                        className = 'status-tag-dark-yellow';
                    }
                }
                statusTag.textContent = latencyText;
                statusTag.classList.add(className);
                matched = true;
            }
            if (matched) {
                card.style.position = 'relative';
                card.appendChild(statusTag);
            }
        });
    }
    function fetchDataAndUpdateUI() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                applyStatusTags(data);
                const cacheData = {
                    data: data,
                    timestamp: Date.now()
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            })
            .catch(error => console.error('Error fetching test-flink result.json:', error));
    }
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpirationTime) {
            applyStatusTags(data);
            return;
        }
    }
    fetchDataAndUpdateUI();
}
setTimeout(() => {
    addStatusTagsWithCache('https://cl.blog.sinzmise.top/result.json');
}, 0);
</script>
