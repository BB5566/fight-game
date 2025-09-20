# 復古未來主義作品集 - HTML版本

這是一個使用純HTML、CSS、JavaScript打造的復古未來主義「數據卡帶讀取機」作品集網站。

## 檔案結構

```
portfolio/
├── portfolio.html    # 主要HTML檔案
├── styles.css        # 樣式檔案
├── script.js         # JavaScript邏輯
├── src/assets/       # CRT圖片資源 (需要從Vue專案複製過來)
│   ├── crt_01.png
│   ├── crt_02.png
│   ├── crt_03.png
│   ├── crt_04.png
│   ├── crt_06.png
│   ├── crt_07.png
│   ├── crt_08.png
│   └── crt_09.png
└── README_HTML.md    # 說明文件
```

## 功能特點

### 🎨 **視覺設計**
- 復古CRT螢幕外觀
- 掃描線動畫效果
- 霓虹色彩配色方案
- 響應式設計支援各種裝置

### 🎛️ **互動功能**
- 5個數據卡帶 (1個個人資訊 + 4個專案)
- 平滑的載入/退出動畫
- Hover效果與過渡動畫
- EJECT按鈕退出功能

### 📱 **響應式支援**
- 桌面版：4:3 比例
- 平板版：3:4 比例  
- 手機版：3:5 比例

## 使用方式

1. **複製CRT圖片資源**
   ```bash
   cp -r src/assets/ ./
   ```

2. **開啟HTML檔案**
   - 直接用瀏覽器開啟 `portfolio.html`
   - 或使用 Live Server 擴充功能

3. **自訂內容**
   - 編輯 `script.js` 中的 `projectDatabase` 更新專案資訊
   - 修改 `styles.css` 調整視覺樣式
   - 更新 `portfolio.html` 的標題和meta資訊

## 技術特點

### **純前端技術**
- HTML5 語義化標籤
- CSS3 動畫與Grid/Flexbox
- 原生JavaScript ES6+
- GSAP動畫庫

### **優化功能**
- 無需建置工具
- 快速載入
- SEO友善
- 易於部署

## 部署建議

### **靜態網站託管**
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### **自訂網域**
1. 購買網域
2. 設定DNS指向
3. 啟用HTTPS

## 客製化指南

### **更新個人資訊**
```javascript
// 在 script.js 中修改
關於我: {
  name: "您的姓名",
  position: "您的職位",
  description: "您的簡介",
  skills: ["技能1", "技能2", "技能3"],
  contact: {
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  }
}
```

### **新增專案**
```javascript
// 在 projectDatabase 中新增
"新專案名稱": {
  type: "project",
  title: "專案標題",
  subtitle: "專案副標題",
  challenge: "要解決的問題",
  solution: "解決方案",
  highlights: ["亮點1", "亮點2"],
  techStack: ["技術1", "技術2"],
  demoLink: "https://demo-url.com",
  githubLink: "https://github.com/project-repo"
}
```

### **調整顏色主題**
```css
/* 在 styles.css 的 :root 中修改 */
:root {
  --color-accent-primary: #43e6f4;  /* 主要強調色 */
  --color-accent-secondary: #ff6b6b; /* 次要強調色 */
  --color-background: #0f0f23;       /* 背景色 */
}
```

## 瀏覽器支援

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 效能優化

- CSS動畫使用transform和opacity
- 圖片採用適當格式和大小
- JavaScript使用事件委派
- GSAP提供硬體加速動畫

## 授權

此專案採用 MIT 授權，您可以自由使用、修改和分發。

---

**提示**: 記得將您的實際聯絡資訊、專案連結和履歷檔案路徑更新到程式碼中！
