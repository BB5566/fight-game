# 網頁版雙人對戰遊戲

## 遊戲簡介
這是一款使用網頁技術實作的雙人對戰格鬥小遊戲。玩家可以分別操作經典角色 Ken 與 Ryu 進行對戰。遊戲畫面加入了復古的 CRT 螢幕掃描線特效，並具備血量系統、移動、跳躍與發射波動拳等機制，當其中一方血量歸零時即分出勝負。

## 操作按鍵
本遊戲支援單機雙人遊玩，兩名玩家可共用同一個鍵盤進行操作：

### 玩家一：Ken（左側角色）
* **向左 / 向右移動**：`A` / `D`
* **跳躍**：`W`
* **發射波動拳**：`F`

### 玩家二：Ryu（右側角色）
* **向左 / 向右移動**：`←` / `→` (左右方向鍵)
* **跳躍**：`↑` (上方向鍵)
* **發射波動拳**：`Enter` (確認鍵)

## 怎麼在本機開啟
由於遊戲中使用了圖片資源，如果直接雙擊開啟 HTML 檔案，可能會受到瀏覽器的 CORS 安全限制影響而無法正常顯示。建議使用本地伺服器來執行：

1. **使用 VS Code**：
   在 VS Code 中安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充套件，右鍵點擊 `index.html`，選擇「Open with Live Server」。
2. **使用 Python**：
   打開終端機 (Terminal)，切換至遊戲所在目錄，執行以下指令，然後在瀏覽器輸入 `http://localhost:8000`：
   ```bash
   python -m http.server 8000
   ```
3. **使用 Node.js**：
   若有安裝 Node.js，可在終端機執行以下指令：
   ```bash
   npx http-server
   ```

## 使用的技術
* **HTML5**：建構遊戲 UI 介面、血量條與畫面結構。
* **CSS3**：負責畫面排版、角色圖片呈現、特效濾鏡，以及實作 CRT 螢幕的掃描線動畫。
* **Vanilla JavaScript (原生 JS)**：負責遊戲核心邏輯，包含按鍵狀態追蹤、角色移動與物理運算（重力）、碰撞偵測、攻擊判定，並透過 `requestAnimationFrame` 驅動遊戲主循環 (Game Loop)。
