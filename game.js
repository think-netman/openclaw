// 数字猜猜乐 - 游戏逻辑
class NumberGuessGame {
    constructor() {
        this.secretNumber = 0;
        this.score = 100;
        this.attempts = 0;
        this.maxAttempts = 10;
        this.remainingAttempts = this.maxAttempts;
        this.gameHistory = [];
        this.gameActive = false;
        this.minRange = 1;
        this.maxRange = 100;
        
        // 初始化DOM元素
        this.initElements();
        // 初始化事件监听
        this.initEventListeners();
        // 开始新游戏
        this.startNewGame();
    }
    
    initElements() {
        // 分数和状态显示
        this.scoreElement = document.getElementById('score');
        this.attemptsElement = document.getElementById('attempts');
        this.remainingElement = document.getElementById('remaining');
        this.hintElement = document.getElementById('hint');
        
        // 输入和控制
        this.guessInput = document.getElementById('guessInput');
        this.guessBtn = document.getElementById('guessBtn');
        this.hintBtn = document.getElementById('hintBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.rulesBtn = document.getElementById('rulesBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        // 历史记录
        this.historyList = document.getElementById('historyList');
        
        // 模态框
        this.rulesModal = document.getElementById('rulesModal');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.gameResultTitle = document.getElementById('gameResultTitle');
        this.resultStats = document.getElementById('resultStats');
        
        // 关闭按钮
        this.closeButtons = document.querySelectorAll('.close-modal');
    }
    
    initEventListeners() {
        // 猜测按钮
        this.guessBtn.addEventListener('click', () => this.makeGuess());
        
        // 回车键猜测
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
        
        // 提示按钮
        this.hintBtn.addEventListener('click', () => this.giveHint());
        
        // 重新开始按钮
        this.restartBtn.addEventListener('click', () => this.startNewGame());
        
        // 游戏规则按钮
        this.rulesBtn.addEventListener('click', () => this.showRules());
        
        // 再玩一次按钮
        this.playAgainBtn.addEventListener('click', () => {
            this.gameOverModal.style.display = 'none';
            this.startNewGame();
        });
        
        // 关闭模态框
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.rulesModal.style.display = 'none';
                this.gameOverModal.style.display = 'none';
            });
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === this.rulesModal) this.rulesModal.style.display = 'none';
            if (e.target === this.gameOverModal) this.gameOverModal.style.display = 'none';
        });
    }
    
    startNewGame() {
        // 生成随机数字
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        
        // 重置游戏状态
        this.score = 100;
        this.attempts = 0;
        this.remainingAttempts = this.maxAttempts;
        this.gameHistory = [];
        this.gameActive = true;
        
        // 更新UI
        this.updateUI();
        this.clearHistory();
        this.updateHint('游戏开始！猜一个1-100之间的数字');
        
        // 聚焦输入框
        this.guessInput.value = '';
        this.guessInput.focus();
        
        console.log('新游戏开始，神秘数字:', this.secretNumber); // 调试用
    }
    
    makeGuess() {
        if (!this.gameActive) return;
        
        const guess = parseInt(this.guessInput.value);
        
        // 验证输入
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.updateHint('请输入1-100之间的有效数字！', 'error');
            this.guessInput.focus();
            return;
        }
        
        // 扣分
        this.score = Math.max(0, this.score - 2);
        this.attempts++;
        this.remainingAttempts--;
        
        // 检查猜测结果
        let result, cssClass;
        if (guess === this.secretNumber) {
            // 猜中了！
            result = '🎉 恭喜！猜中了！';
            cssClass = 'correct';
            this.gameWon();
        } else if (guess > this.secretNumber) {
            result = '📈 太高了！';
            cssClass = 'high';
            this.updateHint(`数字比 ${guess} 小`);
        } else {
            result = '📉 太低了！';
            cssClass = 'low';
            this.updateHint(`数字比 ${guess} 大`);
        }
        
        // 添加到历史记录
        this.addToHistory(guess, result, cssClass);
        
        // 检查游戏是否结束
        if (this.remainingAttempts <= 0 && guess !== this.secretNumber) {
            this.gameLost();
        }
        
        // 更新UI
        this.updateUI();
        
        // 清空输入框并聚焦
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    giveHint() {
        if (!this.gameActive || this.score < 5) {
            this.updateHint('分数不足，无法使用提示！', 'error');
            return;
        }
        
        // 扣分
        this.score -= 5;
        
        // 根据游戏进度给出不同提示
        let hint;
        if (this.attempts === 0) {
            hint = `提示：数字在 ${Math.max(1, this.secretNumber - 20)} 到 ${Math.min(100, this.secretNumber + 20)} 之间`;
        } else {
            const lastGuess = this.gameHistory[this.gameHistory.length - 1];
            if (lastGuess.guess > this.secretNumber) {
                hint = `提示：数字小于 ${lastGuess.guess}`;
            } else {
                hint = `提示：数字大于 ${lastGuess.guess}`;
            }
        }
        
        this.updateHint(hint);
        this.updateUI();
    }
    
    gameWon() {
        this.gameActive = false;
        
        // 计算奖励分数
        const bonus = this.remainingAttempts * 10;
        this.score += bonus;
        
        // 更新难度
        this.adjustDifficulty('win');
        
        // 显示胜利模态框
        this.showGameOver(true, bonus);
    }
    
    gameLost() {
        this.gameActive = false;
        
        // 更新难度
        this.adjustDifficulty('lose');
        
        // 显示失败模态框
        this.showGameOver(false);
    }
    
    adjustDifficulty(result) {
        if (result === 'win') {
            // 赢了就增加难度
            if (this.maxAttempts > 6) {
                this.maxAttempts -= 2;
                this.updateHint('恭喜！难度提升了！下次只有 ' + this.maxAttempts + ' 次机会');
            }
        } else {
            // 输了就降低难度
            if (this.maxAttempts < 10) {
                this.maxAttempts += 2;
                this.updateHint('别灰心！难度降低了，下次有 ' + this.maxAttempts + ' 次机会');
            }
        }
    }
    
    showGameOver(isWin, bonus = 0) {
        this.gameResultTitle.innerHTML = isWin ? 
            '<i class="fas fa-trophy"></i> 恭喜你赢了！' : 
            '<i class="fas fa-heart-broken"></i> 游戏结束';
        
        let statsHTML = `
            <h3>${isWin ? '🎊 胜利！' : '💔 很遗憾'}</h3>
            <p>神秘数字是: <strong>${this.secretNumber}</strong></p>
            <p>猜测次数: <strong>${this.attempts}</strong></p>
            <p>最终分数: <strong>${this.score}</strong></p>
        `;
        
        if (isWin) {
            statsHTML += `<p>奖励分数: <strong>+${bonus}</strong></p>`;
            statsHTML += `<p>剩余机会: <strong>${this.remainingAttempts}</strong></p>`;
        }
        
        // 添加评价
        let rating;
        if (isWin) {
            if (this.attempts <= 5) rating = '🌟 天才玩家！';
            else if (this.attempts <= 8) rating = '👍 优秀表现！';
            else rating = '😊 不错哦！';
        } else {
            rating = '💪 下次加油！';
        }
        
        statsHTML += `<p style="margin-top: 1rem; color: var(--primary-color); font-weight: bold;">${rating}</p>`;
        
        this.resultStats.innerHTML = statsHTML;
        this.gameOverModal.style.display = 'flex';
    }
    
    showRules() {
        this.rulesModal.style.display = 'flex';
    }
    
    addToHistory(guess, result, cssClass) {
        const historyItem = {
            guess,
            result,
            cssClass,
            attempt: this.attempts
        };
        
        this.gameHistory.push(historyItem);
        
        // 更新历史记录显示
        const historyElement = document.createElement('div');
        historyElement.className = `history-item ${cssClass}`;
        historyElement.innerHTML = `
            <div>
                <span class="guess-number">#${this.attempts}: ${guess}</span>
            </div>
            <div class="guess-result">
                ${result}
            </div>
        `;
        
        // 移除空状态提示
        const emptyHistory = this.historyList.querySelector('.empty-history');
        if (emptyHistory) {
            emptyHistory.remove();
        }
        
        // 添加到列表顶部
        this.historyList.insertBefore(historyElement, this.historyList.firstChild);
        
        // 限制历史记录数量
        if (this.historyList.children.length > 10) {
            this.historyList.removeChild(this.historyList.lastChild);
        }
    }
    
    clearHistory() {
        this.historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-clock"></i>
                <p>还没有猜测记录，开始游戏吧！</p>
            </div>
        `;
    }
    
    updateHint(message, type = 'info') {
        this.hintElement.textContent = message;
        
        // 根据类型添加动画效果
        this.hintElement.parentElement.style.animation = 'none';
        setTimeout(() => {
            this.hintElement.parentElement.style.animation = 'pulse 2s infinite';
            
            // 根据类型改变颜色
            if (type === 'error') {
                this.hintElement.parentElement.style.background = 'linear-gradient(to right, #fee2e2, #fecaca)';
                this.hintElement.parentElement.style.borderLeftColor = 'var(--danger-color)';
            } else {
                this.hintElement.parentElement.style.background = 'linear-gradient(to right, #fef3c7, #fde68a)';
                this.hintElement.parentElement.style.borderLeftColor = 'var(--warning-color)';
            }
        }, 10);
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.attemptsElement.textContent = this.attempts;
        this.remainingElement.textContent = this.remainingAttempts;
        
        // 根据剩余机会改变颜色
        if (this.remainingAttempts <= 3) {
            this.remainingElement.style.color = 'var(--danger-color)';
        } else if (this.remainingAttempts <= 5) {
            this.remainingElement.style.color = 'var(--warning-color)';
        } else {
            this.remainingElement.style.color = 'var(--success-color)';
        }
        
        // 根据分数改变颜色
        if (this.score <= 30) {
            this.scoreElement.style.color = 'var(--danger-color)';
        } else if (this.score <= 60) {
            this.scoreElement.style.color = 'var(--warning-color)';
        } else {
            this.scoreElement.style.color = 'var(--success-color)';
        }
        
        // 更新按钮状态
        this.hintBtn.disabled = !this.gameActive || this.score < 5;
        this.guessBtn.disabled = !this.gameActive;
        this.guessInput.disabled = !this.gameActive;
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new NumberGuessGame();
    
    // 添加一些初始动画
    setTimeout(() => {
        document.querySelector('.container').style.transform = 'scale(1)';
    }, 100);
    
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            if (e.ctrlKey) game.startNewGame();
        }
        if (e.key === 'h' || e.key === 'H') {
            if (e.ctrlKey) game.giveHint();
        }
        if (e.key === 'Escape') {
            game.rulesModal.style.display = 'none';
            game.gameOverModal.style.display = 'none';
        }
    });
    
    // 添加控制台欢迎信息
    console.log('%c🎮 数字猜猜乐游戏已加载！', 'color: #4361ee; font-size: 16px; font-weight: bold;');
    console.log('%c快捷键:', 'color: #3a0ca3; font-weight: bold;');
    console.log('%cCtrl+R: 重新开始游戏', 'color: #4cc9f0;');
    console.log('%cCtrl+H: 获取提示', 'color: #4cc9f0;');
    console.log('%cESC: 关闭弹窗', 'color: #4cc9f0;');
});