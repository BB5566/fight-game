// 專案資料庫
const projectDatabase = {
  關於我: {
    type: "about",
    title: "關於我 | About Me",
    name: "您的姓名",
    position: "前端工程師 | Frontend Developer",
    description: "熱愛創造優質使用者體驗的前端工程師，專精於現代網頁技術與互動設計。",
    skills: ["Vue.js", "React", "TypeScript", "Node.js", "GSAP", "Three.js", "Figma"],
    contact: {
      email: "your.email@example.com",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    resume: "/path/to/your/resume.pdf"
  },
  "AI 藝術生成器": {
    type: "project",
    title: "AI 藝術生成器",
    subtitle: "人工智能驅動的創意工具",
    challenge: "現有的 AI 藝術工具往往介面複雜，缺乏直觀的創作流程，使用者需要深入學習技術細節才能產生理想的作品。",
    solution: "設計了簡化的拖拉式介面，讓使用者透過視覺化控制項調整參數，並加入風格預設和即時預覽功能，讓創作過程更加直觀有趣。",
    highlights: [
      "即時預覽與參數調整",
      "50+ 藝術風格預設",
      "批次生成與匯出功能",
      "社群分享機制"
    ],
    techStack: ["Vue.js", "Python", "Stable Diffusion", "WebSocket", "Canvas API"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/username/ai-art-generator",
    images: ["/project1-1.jpg", "/project1-2.jpg"]
  },
  電商轉換優化: {
    type: "project",
    title: "電商轉換優化專案",
    subtitle: "提升75%購物車轉換率",
    challenge: "客戶的電商網站轉換率偏低，購物車放棄率高達75%，且使用者在結帳流程中經常中途離開。",
    solution: "重新設計結帳流程為三步驟，加入進度指示器和自動儲存功能，並優化行動裝置體驗。導入A/B測試持續優化介面。",
    highlights: [
      "轉換率提升 45%",
      "購物車放棄率降至 35%",
      "行動裝置體驗優化",
      "A/B測試驅動的持續改進"
    ],
    techStack: ["React", "Next.js", "Stripe API", "Google Analytics", "Figma"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/username/ecommerce-optimization",
    images: ["/project2-1.jpg", "/project2-2.jpg"]
  },
  互動體驗實驗室: {
    type: "project",
    title: "JavaScript 互動實驗室",
    subtitle: "創意技術展示平台",
    challenge: "展示 JavaScript 的創意可能性，創造既有教育意義又具娛樂性的互動體驗。",
    solution: "開發了一系列互動實驗，包括粒子系統、物理模擬、音訊視覺化等，每個實驗都包含詳細說明和可調參數。",
    highlights: [
      "15+ 互動實驗項目",
      "實時物理引擎",
      "音訊視覺化效果",
      "教育導向的程式碼展示"
    ],
    techStack: ["Vanilla JavaScript", "WebGL", "Three.js", "Web Audio API", "Canvas"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/username/js-interactive-experiments",
    images: ["/project3-1.jpg", "/project3-2.jpg"]
  },
  數據視覺化平台: {
    type: "project",
    title: "企業數據視覺化平台",
    subtitle: "讓數據說故事",
    challenge: "企業需要將複雜的數據轉化為易懂的視覺化圖表，支援多種數據源和即時更新。",
    solution: "建立了可擴展的視覺化平台，支援多種圖表類型、即時數據串流，以及自定義儀表板功能。",
    highlights: [
      "支援 10+ 種圖表類型",
      "即時數據更新",
      "拖拉式儀表板編輯",
      "多數據源整合"
    ],
    techStack: ["Vue.js", "D3.js", "Node.js", "MongoDB", "Socket.io"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/username/data-visualization",
    images: ["/project4-1.jpg", "/project4-2.jpg"]
  }
};

// 當前顯示的專案
let currentProject = null;
let isShowingProject = false;

// 載入專案的函數
function loadProject(projectKey) {
  const project = projectDatabase[projectKey];

  if (project) {
    console.log(`載入專案: ${projectKey}`);

    // 先播放載入動畫
    gsap.to(".screen-content", {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        // 更新當前專案資料
        currentProject = project;
        isShowingProject = true;

        // 更新畫面
        updateDisplay();

        // 播放專案內容進場動畫
        gsap.fromTo(
          ".project-mode",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );

        // 恢復螢幕透明度
        gsap.to(".screen-content", {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
        });
      },
    });
  }
}

// 退出卡帶的函數
function ejectCassette() {
  // 播放退出動畫
  gsap.to(".project-mode", {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      // 切換狀態
      isShowingProject = false;
      currentProject = null;

      // 更新畫面
      updateDisplay();

      // 播放待機模式進場動畫
      gsap.fromTo(
        ".standby-mode",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    },
  });
}

// 更新畫面顯示
function updateDisplay() {
  const standbyMode = document.getElementById('standby-mode');
  const projectMode = document.getElementById('project-mode');
  const projectDisplay = document.getElementById('project-display');

  if (isShowingProject && currentProject) {
    standbyMode.style.display = 'none';
    projectMode.style.display = 'flex';
    
    if (currentProject.type === 'about') {
      projectDisplay.innerHTML = createAboutDisplay(currentProject);
    } else {
      projectDisplay.innerHTML = createProjectDisplay(currentProject);
    }
  } else {
    standbyMode.style.display = 'flex';
    projectMode.style.display = 'none';
  }
}

// 創建個人資訊顯示
function createAboutDisplay(about) {
  const skillsHtml = about.skills.map(skill => 
    `<span class="skill-tag">${skill}</span>`
  ).join('');

  return `
    <div class="about-container">
      <div class="about-header">
        <h1 class="name">${about.name}</h1>
        <h2 class="position">${about.position}</h2>
        <p class="description">${about.description}</p>
      </div>

      <div class="about-content">
        <div class="skills-section">
          <h3>技能專長</h3>
          <div class="skills-grid">
            ${skillsHtml}
          </div>
        </div>

        <div class="contact-section">
          <h3>聯絡方式</h3>
          <div class="contact-links">
            <a href="mailto:${about.contact.email}" class="contact-link">
              📧 ${about.contact.email}
            </a>
            <a href="${about.contact.github}" target="_blank" class="contact-link">
              🔗 GitHub
            </a>
            <a href="${about.contact.linkedin}" target="_blank" class="contact-link">
              💼 LinkedIn
            </a>
          </div>
        </div>

        <div class="resume-section">
          <a href="${about.resume}" download class="resume-button">
            📄 下載履歷
          </a>
        </div>
      </div>
    </div>
  `;
}

// 創建專案顯示
function createProjectDisplay(project) {
  const highlightsHtml = project.highlights ? 
    `<div class="highlights-section">
      <h4>✨ 專案亮點</h4>
      <ul class="highlights-list">
        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
      </ul>
    </div>` : '';

  const techStackHtml = project.techStack.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');

  const linksHtml = `
    <div class="project-links">
      ${project.demoLink ? `
        <a href="${project.demoLink}" class="project-link demo-link" target="_blank" rel="noopener noreferrer">
          🚀 查看 Demo
        </a>
      ` : ''}
      ${project.githubLink ? `
        <a href="${project.githubLink}" class="project-link github-link" target="_blank" rel="noopener noreferrer">
          📱 GitHub
        </a>
      ` : ''}
    </div>
  `;

  return `
    <div class="project-display">
      <div class="project-content">
        <div class="project-header">
          <h3>${project.title}</h3>
          ${project.subtitle ? `<p class="subtitle">${project.subtitle}</p>` : ''}
        </div>
        
        <div class="content-body">
          <div class="challenge-section">
            <h4>🎯 核心挑戰</h4>
            <p>${project.challenge}</p>
          </div>
          
          <div class="solution-section">
            <h4>💡 解決方案</h4>
            <p>${project.solution}</p>
          </div>
          
          ${highlightsHtml}
        </div>
        
        <div class="project-footer">
          <div class="tech-stack">
            ${techStackHtml}
          </div>
          
          ${linksHtml}
        </div>
      </div>
    </div>
  `;
}

// 頁面載入後的初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log("頁面已載入");

  // 進場動畫
  gsap.from(".crt-container", {
    duration: 1.2,
    opacity: 0,
    y: 50,
    scale: 0.95,
    ease: "power4.out",
    delay: 0.2,
  });
  
  gsap.from(".control-panel", {
    duration: 1.2,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    delay: 0.5,
  });

  // 初始化顯示
  updateDisplay();
});
