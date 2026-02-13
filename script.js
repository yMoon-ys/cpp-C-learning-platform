// ===== 登录处理 =====
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 简单模拟登录验证
    if (username && password) {
        // 保存登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        // 跳转到仪表盘
        window.location.href = 'dashboard.html';
    } else {
        alert('请输入用户名和密码');
    }
    return false;
}

// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 检查登录状态（dashboard页需要登录）
    if (window.location.pathname.includes('dashboard.html')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'index.html';
            return;
        }
        
        // 显示用户名
        const username = localStorage.getItem('username') || '张三';
        document.querySelectorAll('.welcome-text h1, .user-name').forEach(el => {
            if (el) {
                if (el.classList.contains('user-name')) {
                    el.textContent = username;
                } else {
                    el.textContent = `下午好，${username}`;
                }
            }
        });
        
        // 模拟连续学习天数
        const daysCount = document.querySelector('.days-count');
        if (daysCount) {
            const days = Math.floor(Math.random() * 30) + 5; // 5-35天随机
            daysCount.innerHTML = `${days}<span>天</span>`;
        }
    }

    // 2. 导航栏交互（6个模块切换）
    initNavigation();
    
    // 3. 待办事项交互
    initTodoList();
    
    // 4. 课程卡片交互
    initCourseCards();
});

// ===== 导航切换功能（核心）=====
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('contentArea');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active状态
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加当前active
            this.classList.add('active');
            
            // 获取要跳转的页面
            const page = this.dataset.page;
            
            // 实际项目中：跳转到不同html页面
            // 这里模拟6个模块的切换效果
            if (page === 'dashboard') {
                // 已经是仪表盘，不跳转
                return;
            } else {
                // 跳转到对应页面（实际项目需要创建这些html文件）
                window.location.href = `${page}.html`;
            }
            
            // 如果你想要单页切换效果（不跳转），使用下面的代码：
            /*
            if (page === 'courses') {
                contentArea.innerHTML = '<div class="content-module"><h2>📚 课程中心</h2><p>课程列表加载中...</p></div>';
            } else if (page === 'practice') {
                contentArea.innerHTML = '<div class="content-module"><h2>✏️ 在线练习</h2><p>选择题、填空题、编程题...</p></div>';
            } else if (page === 'sandbox') {
                contentArea.innerHTML = '<div class="content-module"><h2>🛠️ 自由调试</h2><p>C++代码在线运行环境</p><textarea style="width:100%;height:200px;margin-top:20px;padding:15px;font-family:monospace;">#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}</textarea><button style="margin-top:20px;padding:10px 20px;background:#4a1e6b;color:white;border:none;border-radius:6px;">运行代码</button></div>';
            } else if (page === 'ai') {
                contentArea.innerHTML = '<div class="content-module"><h2>🤖 AI编程助手</h2><p>智能代码分析、错误诊断、学习建议</p><div style="margin-top:20px;padding:30px;background:#f5f5f5;border-radius:12px;text-align:center;">AI助手功能开发中...</div></div>';
            } else if (page === 'discussion') {
                contentArea.innerHTML = '<div class="content-module"><h2>💬 讨论区</h2><p>与同学一起交流C++学习问题</p><div style="margin-top:20px;padding:30px;background:#f5f5f5;border-radius:12px;text-align:center;">讨论区即将开放</div></div>';
            } else if (page === 'settings') {
                contentArea.innerHTML = '<div class="content-module"><h2>⚙️ 设置</h2><p>账号设置、学习偏好、通知设置</p><div style="margin-top:20px;padding:30px;background:#f5f5f5;border-radius:12px;">个人设置页面</div></div>';
            }
            */
        });
    });
}

// ===== 待办事项功能 =====
function initTodoList() {
    const checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        // 恢复已保存的状态
        const savedState = localStorage.getItem(`todo_${checkbox.id}`);
        if (savedState === 'checked') {
            checkbox.checked = true;
            const label = checkbox.nextElementSibling;
            if (label) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#999';
            }
        }
        
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#999';
                localStorage.setItem(`todo_${this.id}`, 'checked');
                showToast('✅ 任务完成，继续加油！');
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '';
                localStorage.removeItem(`todo_${this.id}`);
            }
        });
    });
}

// ===== 课程卡片交互 =====
function initCourseCards() {
    const courseBtns = document.querySelectorAll('.course-card .btn-small');
    courseBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            showToast(`📚 进入课程：${courseName}`);
            // 实际项目中跳转到课程详情页
            // window.location.href = `courses/${courseName}.html`;
        });
    });
}

// ===== 提示消息 =====
function showToast(message) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新toast
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4a1e6b;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
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
    
    // 3秒后移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// ===== 退出登录 =====
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// 全局函数
window.handleLogin = handleLogin;
window.logout = logout;
