document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.querySelector('.text-container');

    // 检查容器是否有文字内容
    if (textContainer && textContainer.textContent.trim() !== '') {
        // 有文字时添加 .has-content 类
        textContainer.classList.add('has-content');
    } else {
        // 没有文字时移除 .has-content 类
        textContainer.classList.remove('has-content');
    }
});
