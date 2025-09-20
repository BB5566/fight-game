// 遊戲常數定義
const MAX_HP = 100;      // 最大生命值
const HIT_DAMAGE = 20;   // 基本傷害值
const GRAVITY = 0.65;     // 重力加速度
const JUMP_POWER = 16;   // 跳躍力度
const GROUND_Y = 50;     // 地面位置
const MOVE_SPEED = 6.5;  // 移動速度
const AIR_CONTROL = 0.7; // 空中移動控制
const CHARACTER_WIDTH = 100;  // 角色寬度（原120，調整為100）
const CHARACTER_HEIGHT = 140; // 角色高度（原150，調整為140）
const MIN_DISTANCE = 80;    // 最小距離
const PUSH_FORCE = 3;      // 推開力度
const VERTICAL_PASS_HEIGHT = 100; // 垂直通過高度
const HADOUKEN_SIZE = 40;     // 波動拳寬高（原50，調整為40）
const EXPLOSION_SIZE = 64;    // 爆炸寬高（原80，調整為64）

// 按鍵狀態
const keyState = {
    a: false,
    d: false,
    w: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false
};

// 遊戲狀態
const gameState = {
    kenHP: MAX_HP,
    ryuHP: MAX_HP,
    gameOver: false,
    kenCooldown: false,
    ryuCooldown: false,    kenJumping: false,
    ryuJumping: false,
    kenJumpKeyHeld: false,  // 追踪Ken的跳躍鍵是否按住
    ryuJumpKeyHeld: false,  // 追踪Ryu的跳躍鍵是否按住
    kenVelocityY: 0,
    ryuVelocityY: 0,
    kenPosY: GROUND_Y,
    ryuPosY: GROUND_Y
};

// DOM 元素
const elements = {
    gameContainer: document.getElementById('gameContainer'),
    tutorialMask: document.getElementById('tutorial-mask'),
    tutorialCloseBtn: document.getElementById('tutorial-close-btn'),
    gameoverMask: document.getElementById('gameover'),
    ken: document.getElementById('ken'),
    ryu: document.getElementById('ryu'),
    kenHpBar: document.getElementById('ken-hp'),
    ryuHpBar: document.getElementById('ryu-hp'),
    kenEnergyBar: document.getElementById('ken-energy'),
    ryuEnergyBar: document.getElementById('ryu-energy')
};

// 圖片路徑
const IMAGES = {
    KEN_STAND: 'ken-stand.png',
    KEN_ATTACK: 'ken-hadouken.png',
    KEN_HIT: 'ken-hit.png',
    RYU_STAND: 'ryu-stand.png',
    RYU_ATTACK: 'ryu-hadouken.png',
    RYU_HIT: 'ryu-hit.png',
    HADOUKEN: 'hadouken.png'
};

// ====== 工具函數 ======
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

// ====== 初始化與重設 ======
function initGame() {
    // Ken 左側，Ryu 右側
    elements.ken.style.left = '100px';
    elements.ken.style.right = '';
    elements.ken.style.bottom = GROUND_Y + 'px';
    elements.ken.style.backgroundImage = `url('${IMAGES.KEN_STAND}')`;
    elements.ryu.style.left = '';
    elements.ryu.style.right = '100px';
    elements.ryu.style.bottom = GROUND_Y + 'px';
    elements.ryu.style.backgroundImage = `url('${IMAGES.RYU_STAND}')`;
    updateHpBars();
}

function restartGame() {
    gameState.kenHP = MAX_HP;
    gameState.ryuHP = MAX_HP;
    gameState.gameOver = false;
    gameState.kenCooldown = false;
    gameState.ryuCooldown = false;
    gameState.kenJumping = false;
    gameState.ryuJumping = false;
    gameState.kenJumpKeyHeld = false;
    gameState.ryuJumpKeyHeld = false;
    gameState.kenVelocityY = 0;
    gameState.ryuVelocityY = 0;
    gameState.kenPosY = GROUND_Y;
    gameState.ryuPosY = GROUND_Y;
    elements.gameoverMask.style.display = 'none';
    document.querySelectorAll('.hadouken, .explosion, .shockwave').forEach(e => e.remove());
    elements.ken.style.backgroundImage = `url('${IMAGES.KEN_STAND}')`;
    elements.ryu.style.backgroundImage = `url('${IMAGES.RYU_STAND}')`;
    elements.ken.style.left = '100px';
    elements.ken.style.right = '';
    elements.ken.style.bottom = GROUND_Y + 'px';
    elements.ryu.style.right = '100px';
    elements.ryu.style.left = '';
    elements.ryu.style.bottom = GROUND_Y + 'px';
    updateHpBars();
}

// ====== 角色碰撞檢查 ======
function checkCharacterCollision(kenX, kenY, ryuX, ryuY) {
    const kenLeft = kenX;
    const kenRight = kenX + CHARACTER_WIDTH;
    const kenTop = kenY + CHARACTER_HEIGHT;
    const kenBottom = kenY;
    const ryuLeft = ryuX;
    const ryuRight = ryuX + CHARACTER_WIDTH;
    const ryuTop = ryuY + CHARACTER_HEIGHT;
    const ryuBottom = ryuY;
    const horizontalOverlap = kenLeft < ryuRight && kenRight > ryuLeft;
    const verticalOverlap = kenBottom < ryuTop && kenTop > ryuBottom;
    return horizontalOverlap && verticalOverlap;
}

// ====== 角色位置與朝向更新 ======
function updateCharacterPositions() {
    // Ken 用 left，Ryu 用 right，並確保不會超出邊界
    let kenLeft = parseInt(elements.ken.style.left) || 100;
    let ryuRight = parseInt(elements.ryu.style.right) || 100;
    let ryuLeft = 976 - ryuRight - CHARACTER_WIDTH;
    // 移動暫存
    let newKenLeft = kenLeft;
    let newRyuLeft = ryuLeft;
    // Ken 移動
    const kenSpeed = MOVE_SPEED * (gameState.kenJumping ? AIR_CONTROL : 1);
    if (keyState.a) newKenLeft = clamp(kenLeft - kenSpeed, 0, 976 - CHARACTER_WIDTH);
    if (keyState.d) newKenLeft = clamp(kenLeft + kenSpeed, 0, 976 - CHARACTER_WIDTH);
    // Ryu 移動
    const ryuSpeed = MOVE_SPEED * (gameState.ryuJumping ? AIR_CONTROL : 1);
    if (keyState.ArrowLeft) newRyuLeft = clamp(ryuLeft - ryuSpeed, 0, 976 - CHARACTER_WIDTH);
    if (keyState.ArrowRight) newRyuLeft = clamp(ryuLeft + ryuSpeed, 0, 976 - CHARACTER_WIDTH);
    // 角色不能重疊，維持最小距離，但允許從上方跳過
    const kenOnGround = gameState.kenPosY === GROUND_Y;
    const ryuOnGround = gameState.ryuPosY === GROUND_Y;
    if (kenOnGround && ryuOnGround && Math.abs(newKenLeft - newRyuLeft) < CHARACTER_WIDTH) {
        if (newKenLeft < newRyuLeft) {
            newKenLeft = newRyuLeft - CHARACTER_WIDTH;
            newKenLeft = clamp(newKenLeft, 0, 976 - CHARACTER_WIDTH);
        } else {
            newRyuLeft = newKenLeft - CHARACTER_WIDTH;
            newRyuLeft = clamp(newRyuLeft, 0, 976 - CHARACTER_WIDTH);
        }
    }
    // 更新位置
    elements.ken.style.left = newKenLeft + 'px';
    elements.ken.style.right = '';
    elements.ryu.style.left = '';
    elements.ryu.style.right = (976 - newRyuLeft - CHARACTER_WIDTH) + 'px';
    // 朝向
    const kenCenter = newKenLeft + CHARACTER_WIDTH / 2;
    const ryuCenter = newRyuLeft + CHARACTER_WIDTH / 2;
    elements.ken.style.transform = kenCenter < ryuCenter ? 'scaleX(1)' : 'scaleX(-1)';
    elements.ryu.style.transform = kenCenter < ryuCenter ? 'scaleX(-1)' : 'scaleX(1)';
    // Ken 跳躍
    if (gameState.kenJumping || gameState.kenPosY > GROUND_Y) {
        gameState.kenVelocityY -= GRAVITY;
        gameState.kenPosY += gameState.kenVelocityY;
        if (gameState.kenPosY <= GROUND_Y) {
            gameState.kenPosY = GROUND_Y;
            gameState.kenVelocityY = 0;
            gameState.kenJumping = false;
        }
        elements.ken.style.bottom = gameState.kenPosY + 'px';
    }
    // Ryu 跳躍
    if (gameState.ryuJumping || gameState.ryuPosY > GROUND_Y) {
        gameState.ryuVelocityY -= GRAVITY;
        gameState.ryuPosY += gameState.ryuVelocityY;
        if (gameState.ryuPosY <= GROUND_Y) {
            gameState.ryuPosY = GROUND_Y;
            gameState.ryuVelocityY = 0;
            gameState.ryuJumping = false;
        }
        elements.ryu.style.bottom = gameState.ryuPosY + 'px';
    }
}

// ====== 跳躍 ======
function jump(character) {
    const isKen = character === 'ken';
    if ((isKen && !gameState.kenJumping) || (!isKen && !gameState.ryuJumping)) {
        if (isKen) {
            gameState.kenJumping = true;
            gameState.kenVelocityY = JUMP_POWER;
            gameState.kenPosY += 1;
        } else {
            gameState.ryuJumping = true;
            gameState.ryuVelocityY = JUMP_POWER;
            gameState.ryuPosY += 1;
        }
    }
}

// ====== 血條更新 ======
function updateHpBars() {
    elements.kenHpBar.style.width = `${Math.max(0, gameState.kenHP)}%`;
    elements.ryuHpBar.style.width = `${Math.max(0, gameState.ryuHP)}%`;
}

// ====== 爆炸效果 ======
function createExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.width = EXPLOSION_SIZE + 'px';
    explosion.style.height = EXPLOSION_SIZE + 'px';
    explosion.style.left = (x - EXPLOSION_SIZE / 2) + 'px';
    explosion.style.bottom = y + 'px';
    elements.gameContainer.appendChild(explosion);
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.width = (EXPLOSION_SIZE * 1.5) + 'px';
    shockwave.style.height = (EXPLOSION_SIZE * 1.5) + 'px';
    shockwave.style.left = (x - EXPLOSION_SIZE * 0.75) + 'px';
    shockwave.style.bottom = (y - EXPLOSION_SIZE * 0.25) + 'px';
    elements.gameContainer.appendChild(shockwave);
    setTimeout(() => {
        explosion.remove();
        shockwave.remove();
    }, 500);
}

// ====== 波動拳發射 ======
function fireHadouken(character) {
    const isKen = character === 'ken';
    const player = isKen ? elements.ken : elements.ryu;
    const transform = window.getComputedStyle(player).transform;
    const isFacingLeft = transform.includes('matrix(-1');
    let startX;
    if (isKen) {
        const kenX = parseInt(elements.ken.style.left) || 100;
        startX = isFacingLeft ? kenX - 30 : kenX + 80;
    } else {
        const ryuX = 976 - (parseInt(elements.ryu.style.right) || 100) - CHARACTER_WIDTH;
        startX = isFacingLeft ? ryuX - 30 : ryuX + 80;
    }
    const hadouken = document.createElement('div');
    hadouken.className = 'hadouken';
    hadouken.style.width = HADOUKEN_SIZE + 'px';
    hadouken.style.height = HADOUKEN_SIZE + 'px';
    hadouken.dataset.direction = isFacingLeft ? 'left' : 'right';
    hadouken.dataset.owner = character;
    elements.gameContainer.appendChild(hadouken);
    hadouken.style.left = startX + 'px';
    hadouken.style.bottom = (isKen ? gameState.kenPosY : gameState.ryuPosY) + 50 + 'px';
    hadouken.style.transform = isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)';
    const moveDirection = isFacingLeft ? -1 : 1;
    if (isKen) {
        gameState.kenCooldown = true;
        player.style.backgroundImage = `url('${IMAGES.KEN_ATTACK}')`;
        setTimeout(() => {
            gameState.kenCooldown = false;
            if (!gameState.gameOver) player.style.backgroundImage = `url('${IMAGES.KEN_STAND}')`;
        }, 1000);
    } else {
        gameState.ryuCooldown = true;
        player.style.backgroundImage = `url('${IMAGES.RYU_ATTACK}')`;
        setTimeout(() => {
            gameState.ryuCooldown = false;
            if (!gameState.gameOver) player.style.backgroundImage = `url('${IMAGES.RYU_STAND}')`;
        }, 1000);
    }
    let currentPos = startX;
    const speed = 10 * moveDirection;
    const moveInterval = setInterval(() => {
        currentPos += speed;
        hadouken.style.left = currentPos + 'px';
        const otherHadoukens = Array.from(document.querySelectorAll('.hadouken')).filter(h => h !== hadouken);
        const hadoukenRect = hadouken.getBoundingClientRect();
        let hasCollision = false;
        for (const other of otherHadoukens) {
            const otherRect = other.getBoundingClientRect();
            const thisPos = (hadoukenRect.left + hadoukenRect.right) / 2;
            const otherPos = (otherRect.left + otherRect.right) / 2;
            const distance = Math.abs(thisPos - otherPos);
            const thisIsMovingLeft = hadouken.style.transform.includes('scaleX(-1)');
            const otherIsMovingLeft = other.style.transform.includes('scaleX(-1)');
            const oppositeDirections = thisIsMovingLeft !== otherIsMovingLeft;
            if (distance < 40) {
                if (oppositeDirections) {
                    clearInterval(moveInterval);
                    const collisionX = Math.round((currentPos + parseInt(other.style.left)) / 2);
                    const collisionY = Math.round((parseInt(hadouken.style.bottom) + parseInt(other.style.bottom)) / 2);
                    hadouken.style.transition = 'all 0.1s';
                    other.style.transition = 'all 0.1s';
                    hadouken.style.transform += ' scale(1.5)';
                    hadouken.style.opacity = '0.8';
                    other.style.transform += ' scale(1.5)';
                    other.style.opacity = '0.8';
                    setTimeout(() => {
                        createExplosion(collisionX, collisionY);
                        hadouken.remove();
                        other.remove();
                    }, 100);
                    hasCollision = true;
                    break;
                }
            }
        }
        if (!hasCollision) {
            const opponent = isKen ? elements.ryu : elements.ken;
            const opponentRect = opponent.getBoundingClientRect();
            const opponentWidth = 60;
            const opponentCenter = (opponentRect.left + opponentRect.right) / 2;
            const opponentY = isKen ? gameState.ryuPosY : gameState.kenPosY;
            const hadoukenY = parseInt(hadouken.style.bottom);
            const hadoukenCenter = (hadoukenRect.left + hadoukenRect.right) / 2;
            const horizontalDistance = Math.abs(hadoukenCenter - opponentCenter);
            const verticalDistance = Math.abs(hadoukenY - opponentY);
            const hitboxHeight = 60;
            if (horizontalDistance < (opponentWidth + 25) && verticalDistance < hitboxHeight) {
                clearInterval(moveInterval);
                createExplosion(currentPos, parseInt(hadouken.style.bottom));
                hadouken.remove();
                if (isKen) {
                    gameState.ryuHP -= HIT_DAMAGE;
                    opponent.style.backgroundImage = `url('${IMAGES.RYU_HIT}')`;
                    setTimeout(() => {
                        if (!gameState.gameOver) opponent.style.backgroundImage = `url('${IMAGES.RYU_STAND}')`;
                    }, 500);
                } else {
                    gameState.kenHP -= HIT_DAMAGE;
                    opponent.style.backgroundImage = `url('${IMAGES.KEN_HIT}')`;
                    setTimeout(() => {
                        if (!gameState.gameOver) opponent.style.backgroundImage = `url('${IMAGES.KEN_STAND}')`;
                    }, 500);
                }
                updateHpBars();
                if (gameState.kenHP <= 0 || gameState.ryuHP <= 0) {
                    showGameOver(gameState.kenHP <= 0 ? 'Ryu' : 'Ken');
                }
            }
        }
        if (currentPos < 0 || currentPos > 976) {
            clearInterval(moveInterval);
            hadouken.remove();
        }
    }, 16);
}

// ====== 遊戲結束畫面 ======
function showGameOver(winner) {
    gameState.gameOver = true;
    let winnerText = winner ? `<div class="winner-text">勝者：${winner}</div>` : '';
    elements.gameoverMask.innerHTML = `
        <div class="gameover-mask">
            <div class="gameover-text">GAME OVER</div>
            ${winnerText}
            <button class="restart-btn" id="restart-btn">重玩</button>
        </div>
    `;
    elements.gameoverMask.style.display = '';
    document.getElementById('restart-btn').onclick = restartGame;
}

// ====== 遊戲主循環與事件 ======
function gameLoop() {
    if (!gameState.gameOver) {
        updateCharacterPositions();
    }
    requestAnimationFrame(gameLoop);
}

elements.tutorialCloseBtn.addEventListener('click', () => {
    elements.tutorialMask.style.display = 'none';
    initGame();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    gameLoop(performance.now());
});

function handleKeyDown(event) {
    if (gameState.gameOver) return;
    if (event.key in keyState) {
        keyState[event.key] = true;
        event.preventDefault();
    }
    switch(event.key) {
        case 'w':
            if (!gameState.kenJumpKeyHeld) {
                gameState.kenJumpKeyHeld = true;
                jump('ken');
            }
            break;
        case 'ArrowUp':
            if (!gameState.ryuJumpKeyHeld) {
                gameState.ryuJumpKeyHeld = true;
                jump('ryu');
            }
            break;
        case 'f':
            if (!gameState.kenCooldown) {
                fireHadouken('ken');
            }
            break;
        case 'Enter':
            if (!gameState.ryuCooldown) {
                fireHadouken('ryu');
            }
            break;
    }
}

function handleKeyUp(event) {
    if (event.key in keyState) {
        keyState[event.key] = false;
        event.preventDefault();
    }
    switch(event.key) {
        case 'w':
            gameState.kenJumpKeyHeld = false;
            break;
        case 'ArrowUp':
            gameState.ryuJumpKeyHeld = false;
            break;
    }
}
