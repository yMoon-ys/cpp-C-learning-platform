/**
 * C++学习平台 - 交互脚本
 * 功能：待办事项、进度更新、AI代码分析模拟
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 初始化待办事项功能
    initTodoList();
    
    // 2. 初始化课程卡片交互
    initCourseCards();
    
    // 3. 初始化其他动态效果
    initDynamicEffects();
    
    console.log('C++学习平台交互已加载！');
});

/**
 * 待办事项列表功能
 */
function initTodoList() {
    const checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        // 从本地存储恢复状态
        const savedState = localStorage.getItem(`todo_${checkbox.id}`);
        if (savedState === 'checked') {
            checkbox.checked = true;
            // 为已完成的项添加视觉样式
            const label = checkbox.nextElementSibling;
            label.style.textDecoration = 'line-through';
            label.style.color = 'var(--color-text-secondary)';
        }
        
        // 添加点击事件
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = 'var(--color-text-secondary)';
                // 保存状态到本地存储
                localStorage.setItem(`todo_${this.id}`, 'checked');
                
                // 显示一个简单的完成动画
                showCompletionToast('✅ 任务完成！');
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '';
                localStorage.removeItem(`todo_${this.id}`);
            }
        });
    });
}

/**
 * 课程卡片交互功能
 */
function initCourseCards() {
    const courseCards = document.querySelectorAll('.course-card:not(.card-upcoming)');
    
    courseCards.forEach(card => {
        // 点击卡片任意位置（除了按钮）可以查看详情
        card.addEventListener('click', function(event) {
            // 如果点击的是按钮，不触发卡片详情查看
            if (event.target.tagName === 'BUTTON' || 
                event.target.tagName === 'A' || 
                event.target.closest('.card-actions')) {
                return;
            }
            
            // 这里可以添加查看课程详情的逻辑
            const courseTitle = this.querySelector('.card-title').textContent;
            console.log(`查看课程详情: ${courseTitle}`);
            // 在实际项目中，这里可以跳转到课程详情页或打开模态框
        });
        
        // 悬停效果增强（已通过CSS实现，这里可以添加额外逻辑）
    });
}

/**
 * 初始化动态效果
 */
function initDynamicEffects() {
    // 模拟进度条加载动画
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = bar.style.width;
        bar.style.width = '0%';
        
        // 使用setTimeout模拟进度加载动画
        setTimeout(() => {
            bar.style.width = currentWidth;
        }, 300);
    });
    
    // 为“继续学习”按钮添加点击效果
    const continueButtons = document.querySelectorAll('.btn-small, .btn-primary');
    continueButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 添加点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * AI代码分析功能
 */
function analyzeCode() {
    const codeInput = document.querySelector('.code-input');
    const aiOutput = document.getElementById('aiOutput');
    
    if (!codeInput || !aiOutput) return;
    
    const code = codeInput.value.trim();
    
    if (!code) {
        showAIOutput(aiOutput, '❌ 请输入一些C++代码进行分析。', 'error');
        return;
    }
    
    // 显示加载状态
    showAIOutput(aiOutput, '🔄 AI正在分析你的代码，请稍候...', 'loading');
    
    // 模拟网络请求延迟
    setTimeout(() => {
        // 这里是模拟的AI分析逻辑
        const analysisResult = simulateAIAnalysis(code);
        showAIOutput(aiOutput, analysisResult, 'success');
        
        // 添加到分析历史（模拟）
        addToAnalysisHistory(code, analysisResult);
    }, 1500);
}

/**
 * 模拟AI分析函数
 */
function simulateAIAnalysis(code) {
    let result = '## ✅ 代码分析完成\n\n';
    
    // 简单的代码检查逻辑（模拟）
    if (code.includes('include')) {
        result += '**✅ 头文件包含：** 检测到标准头文件包含。\n\n';
    }
    
    if (code.includes('main()')) {
        result += '**✅ 主函数：** main函数结构正确。\n\n';
    } else {
        result += '**⚠️ 注意：** 未检测到main函数，程序可能无法直接运行。\n\n';
    }
    
    if (code.includes('cout') || code.includes('printf')) {
        result += '**✅ 输出语句：** 包含输出语句，便于调试。\n\n';
    }
    
    // 检查常见问题
    if (code.includes('using namespace std;')) {
        result += '**💡 建议：** 对于小型项目可以使用`using namespace std;`，但在大型项目中建议显式使用`std::`前缀。\n\n';
    }
    
    if (code.includes('endl') && code.includes('\\n')) {
        result += '**💡 性能提示：** 在需要频繁输出的场景中，使用`"\\n"`比`endl`性能更好，因为`endl`会立即刷新输出缓冲区。\n\n';
    }
    
    // 检查内存管理
    if (code.includes('new ') && !code.includes('delete ')) {
        result += '**⚠️ 内存警告：** 检测到`new`操作符，但未找到对应的`delete`，可能存在内存泄漏风险。\n\n';
    }
    
    result += '**🎯 下一步学习建议：**\n';
    result += '1. 尝试为你的程序添加函数\n';
    result += '2. 学习使用数组或向量存储数据\n';
    result += '3. 了解指针的基本概念和应用\n';
    
    return result;
}

/**
 * 显示AI分析结果
 */
function showAIOutput(outputElement, content, type) {
    // 根据类型设置不同的样式
    let className = 'ai-output-message';
    if (type === 'loading') className += ' output-loading';
    if (type === 'error') className += ' output-error';
    if (type === 'success') className += ' output-success';
    
    outputElement.innerHTML = `<div class="${className}">${content.replace(/\n/g, '<br>')}</div>`;
    
    // 添加结果区域的样式
    const style = document.createElement('style');
    style.textContent = `
        .ai-output-message { padding: 12px; border-radius: 8px; }
        .output-loading { background-color: #e6f7ff; border-left: 4px solid #1890ff; }
        .output-error { background-color: #fff2f0; border-left: 4px solid #ff4d4f; }
        .output-success { background-color: #f6ffed; border-left: 4px solid #52c41a; }
    `;
    document.head.appendChild(style);
}

/**
 * 模拟添加到分析历史
 */
function addToAnalysisHistory(code, result) {
    // 这里可以实际实现历史记录功能
    console.log('分析记录已保存（模拟）');
    
    // 在实际项目中，可以将记录保存到localStorage或发送到服务器
    const history = JSON.parse(localStorage.getItem('codeAnalysisHistory') || '[]');
    history.unshift({
        code: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
        result: result.substring(0, 200) + (result.length > 200 ? '...' : ''),
        timestamp: new Date().toISOString()
    });
    
    // 只保留最近的10条记录
    if (history.length > 10) history.length = 10;
    
    localStorage.setItem('codeAnalysisHistory', JSON.stringify(history));
}

/**
 * 显示完成提示
 */
function showCompletionToast(message) {
    // 创建一个简单的提示元素
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #52c41a;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s, fadeOut 0.3s 2.7s;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 将analyzeCode函数暴露给全局，以便HTML中的onclick属性调用
window.analyzeCode = analyzeCode;
