// script.js 内容示例：为所有课程卡片添加点击交互
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 为所有课程卡片添加点击事件
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // 防止点击卡片内的按钮时也触发卡片事件
            if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
                return;
            }
            // 切换“已学”标记的视觉状态
            this.classList.toggle('completed');
            
            // 这里可以添加实际的学习记录逻辑，比如发送请求到后端
            console.log('卡片状态已切换');
        });
    });

    // 2. 模拟侧边栏“今日计划”的待办事项点击完成
    const todoItems = document.querySelectorAll('.todo-list li');
    todoItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.textDecoration = 'line-through';
            this.style.opacity = '0.6';
        });
    });

});
