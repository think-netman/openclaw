# 🎮 数字猜猜乐 - Number Guess Game

一个简单有趣的网页猜数字游戏，使用纯 HTML、CSS 和 JavaScript 开发。

![游戏截图](https://img.shields.io/badge/游戏-猜数字-blue)
![技术栈](https://img.shields.io/badge/技术-HTML5/CSS3/JS-green)
![部署](https://img.shields.io/badge/部署-Vercel-purple)
![开源](https://img.shields.io/badge/开源-MIT-orange)

## 🎯 游戏介绍

数字猜猜乐是一个经典的猜数字游戏，玩家需要在1-100之间猜出系统随机生成的数字。游戏包含分数系统、历史记录和动态难度调整。

### ✨ 功能特点
- 🎯 **猜数字游戏**：经典1-100猜数字
- 📊 **分数系统**：每次猜测扣分，猜中获得奖励
- 📝 **历史记录**：实时显示猜测历史和结果
- 🎮 **动态难度**：根据表现调整游戏难度
- 💡 **智能提示**：消耗分数获取有用提示
- 📱 **响应式设计**：适配手机、平板和电脑
- 🎨 **美观UI**：现代化设计，流畅动画

## 🚀 快速开始

### 在线游玩
直接访问部署在 Vercel 上的游戏：
👉 **[点击这里开始游戏](你的游戏链接)**

### 本地运行
1. 克隆仓库：
```bash
git clone https://github.com/你的用户名/number-guess-game.git
cd number-guess-game
```

2. 直接打开 `index.html` 文件，或使用本地服务器：
```bash
# 使用 Python 简单服务器
python3 -m http.server 8000
# 然后在浏览器访问 http://localhost:8000
```

## 🎮 游戏玩法

### 基本规则
1. 系统随机生成1-100之间的数字
2. 玩家输入猜测的数字
3. 系统提示"太高"或"太低"
4. 用最少的次数猜中数字
5. 初始有10次机会，用完游戏结束

### 分数系统
- **起始分数**：100分
- **每次猜测**：-2分
- **使用提示**：-5分
- **猜中奖励**：剩余机会 × 10分

### 难度等级
- **新手**：10次机会
- **高手**：8次机会
- **大师**：6次机会

游戏会根据你的表现自动调整难度！

## 🛠️ 技术栈

| 技术 | 用途 | 说明 |
|------|------|------|
| **HTML5** | 页面结构 | 语义化标签，现代HTML |
| **CSS3** | 样式设计 | Flexbox/Grid布局，CSS变量，动画 |
| **JavaScript** | 游戏逻辑 | ES6+，面向对象编程 |
| **Font Awesome** | 图标库 | 丰富的图标资源 |
| **Google Fonts** | 字体服务 | Poppins和Roboto Mono字体 |

## 📁 项目结构

```
number-guess-game/
├── index.html          # 主页面
├── style.css           # 样式文件
├── game.js             # 游戏逻辑
├── README.md           # 项目文档
└── .gitignore          # Git忽略文件
```

## 🔧 开发指南

### 自定义游戏
1. **修改数字范围**：在 `game.js` 中修改 `minRange` 和 `maxRange`
2. **调整分数规则**：修改 `startNewGame()` 中的初始分数和扣分规则
3. **更改UI主题**：在 `style.css` 的 `:root` 中修改CSS变量
4. **添加新功能**：在 `NumberGuessGame` 类中添加新方法

### 扩展功能建议
- [ ] 添加多人对战模式
- [ ] 实现排行榜系统
- [ ] 添加音效和背景音乐
- [ ] 支持自定义主题
- [ ] 添加成就系统

## 📦 部署指南

### 部署到 Vercel
1. 将代码推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 导入 GitHub 仓库
4. 自动部署完成！

### 部署到其他平台
- **Netlify**：类似 Vercel 的部署流程
- **GitHub Pages**：免费静态网站托管
- **自定义服务器**：任何支持静态文件的Web服务器

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 游戏由 **OpenClaw AI 助手** 开发
- 图标来自 [Font Awesome](https://fontawesome.com)
- 字体来自 [Google Fonts](https://fonts.google.com)
- 部署支持 [Vercel](https://vercel.com)

## 📞 联系

如有问题或建议，请：
- 在 GitHub 提交 Issue
- 通过游戏页面的反馈功能联系

---

**祝您游戏愉快！** 🎮

*最后更新：2024年*