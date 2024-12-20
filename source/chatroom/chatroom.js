  const chatroom = {
    userAvatarMap: new Map(),
    avatarIndex: 0,
  
    init: function (config) {
        if (!config || typeof config !== 'object') {
            console.error('Chatroom configuration is missing or invalid.');
            return;
        }
  
        const containerId = config.chatroomName;
        const jsonFilePath = config.jsonFilePath;
        const myAvatar = config.MyAvatar;
  
        if (!containerId || !jsonFilePath || !myAvatar) {
            console.error('Chatroom name (containerId), JSON file path, and MyAvatar must be provided.');
            return;
        }
  
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Chat container with id "${containerId}" not found.`);
            return;
        }
  
        this.loadChatData(jsonFilePath)
            .then((chatData) => {
                const chatContent = this.generateChatContent(chatData, myAvatar, config.hideAvatar);
                container.innerHTML = this.generateChatBoxHTML(chatContent, config.title || '群聊的聊天记录');
            })
            .catch((err) => {
                console.error('Error loading chat data:', err);
            });
    },
  
    loadChatData: function (filePath) {
        return fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load chat data from ${filePath}`);
                }
                return response.json();
            });
    },
  
    generateChatBoxHTML: function (content, title) {
        const titleHtml = `<div class="chatBoxTitle"><i class="fa fa-chevron-left"></i><span class="chatTitleText">${title}</span><div class="chatBoxIcons"><i class="fa fa-group"></i><i class="fa fa-dedent"></i></div></div>`;
        return `<div class="chatContainer">${titleHtml}<div class="chatBox">${content}</div></div>`;
    },
  
    generateChatContent: function (chatData, myAvatar, hideAvatar) {
        let content = '';
        const sysProcessed = new Set(); // 用于标记已经渲染过的 sys
  
        chatData.forEach((chatItem) => {
            if (chatItem.name && chatItem.name.toLowerCase() === 'sys') {
                // 如果是 sys 类型的记录，先渲染通知
                content += this.generateSystemNotification(chatItem);
  
                // 将对应的 sys 记录标记为已经处理过，避免重复渲染
                sysProcessed.add(chatItem.content); // 使用 content 或其他唯一标识作为标记
            } else if (!sysProcessed.has(chatItem.content)) {
                // 非 sys 类型的记录，如果没有被标记为处理过，才渲染
                content += this.generateChatItem(chatItem, myAvatar, hideAvatar);
            }
        });
  
        return content;
    },
  
    generateChatItem: function (chatItem, myAvatar, hideAvatar) {
        let name = chatItem.name ? chatItem.name.trim() : '未知';
        let content = chatItem.content ? chatItem.content.trim() : '无内容';
        let avatar = chatItem.avatar || null;
  
        const isMe = name.toLowerCase() === 'me';
        const chatName = isMe ? '我' : name;
        const chatClass = isMe ? 'me' : '';
  
        let avatarUrl;
        if (isMe) {
            avatarUrl = myAvatar;
        } else if (avatar && avatar.startsWith('http')) {
            avatarUrl = avatar;
        } else if (avatar && !isNaN(Number(avatar))) {
            avatarUrl = `https://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=100`;
        } else {
            avatarUrl = this.assignAvatar(name);
        }
  
        const avatarHTML = hideAvatar
            ? ''
            : `<img class="chatAvatar no-lightbox" src="${avatarUrl}" onerror="this.src='https://via.placeholder.com/100';">`;
  
        content = this.parseContent(content);
  
        return `
            <div class="chatItem ${chatClass}">
                ${avatarHTML}
                <div class="chatContentWrapper">
                    <b class="chatName">${chatName}</b>
                    <div class="chatContent">${content}</div>
                </div>
            </div>
        `;
    },
  
    generateSystemNotification: function (chatItem) {
        let content = chatItem.content ? chatItem.content.trim() : '无内容';
        content = this.parseContent(content);
  
        return `
            <div class="systemNotification">
                <div class="systemContent">${content}</div>
            </div>
        `;
    },
  
    parseContent: function (content) {
        const imagePattern = /\[:image::(https?:\/\/[^\s]+?)::\]/g;
        const chatPattern = /\[:chat:\(([^)]+)\)::([^\s]+?)::\]/g;
        const linkPattern = /\[:a::(https?:\/\/[^\s]+?)::\]/g;
        const callPattern = /\[:call::@([^:]+?)::\]/g;
        const repPattern = /\[:rep:\[([^\]]+)\]:(.*?)::\]/g;
  
        content = content.replace(imagePattern, (match, p1) => {
            return `<img class="chatMedia" src="${p1}" alt="Image" />`;
        });
  
        content = content.replace(chatPattern, (match, title, jsonFilePath) => {
            const encodedTitle = encodeURIComponent(title);
            const encodedJsonFilePath = encodeURIComponent(jsonFilePath);
            const chatLink = `http://localhost:4000/Chatroom/?jsonFilePath=${encodedJsonFilePath}&title=${encodedTitle}`;
            return `
                <div class="chatQuoteCard">
                    <div class="chatQuoteTetle">
                        <i class="fa fa-database"></i>
                        <span>转发的聊天记录</span>
                    </div>
                    <a class="chatMessage" onclick="openChatWindow('${chatLink}')">转发自：${title}</a>
                </div>
            `;
        });
  
        content = content.replace(linkPattern, (match, p1) => {
            return `<a href="${p1}" class="chatLink" target="_blank">${p1}</a>`;
        });
  
        content = content.replace(callPattern, (match, username) => {
            return `<span class="chatCall">@${username}</span>`;
        });
  
        content = content.replace(repPattern, (match, username, quotedContent) => {
            return `
                <div class="chatQuote">
                    <div class="quoteUser">
                        <i class="fa fa-share-square-o"></i>
                        <span>${username}</span>
                    </div>
                    <span class="quotedMessage">${quotedContent}</span>
                </div>
            `;
        });
  
        return content;
    },
  
    assignAvatar: function (name) {
        const avatars = [
            'https://i.p-i.vip/30/20240920-66ed9a608c2cf.png',
            'https://i.p-i.vip/30/20240920-66ed9b0655cba.png',
            'https://i.p-i.vip/30/20240920-66ed9b18a56ee.png',
            'https://i.p-i.vip/30/20240920-66ed9b2c199bf.png',
            'https://i.p-i.vip/30/20240920-66ed9b3350ed1.png',
            'https://i.p-i.vip/30/20240920-66ed9b5181630.png',
        ];
  
        if (!this.userAvatarMap.has(name)) {
            this.userAvatarMap.set(name, avatars[this.avatarIndex % avatars.length]);
            this.avatarIndex++;
        }
        return this.userAvatarMap.get(name);
    },
  };
  
  if (typeof chatroom.init === 'object') {
    document.addEventListener('DOMContentLoaded', function () {
        chatroom.init(chatroom.init);
    });
  }
  