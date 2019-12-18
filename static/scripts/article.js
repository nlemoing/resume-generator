(() => {

    let completed = false;
    let target = document.body.scrollHeight * 0.9; // 90% of page
    document.addEventListener('scroll', () => {
        if (completed || window.scrollY < target) {
            return;
        }
        completed = true;
        const article = window.location.pathname;
        fetch(`/analytics/articleCompleted${article}`);
    });

})();