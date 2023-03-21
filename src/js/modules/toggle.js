const toggle = () => {
    const getToggle = document.querySelectorAll('[data-toggle]');

    // toggles attribute
    getToggle.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            toggle.hasAttribute('data-state', 'active')
                ? toggle.removeAttribute('data-state')
                : toggle.setAttribute('data-state', 'active');
            e.stopPropagation();
        });
    });

    document.addEventListener('click', (e) => {
        // remove active state
        getToggle.forEach((i) => {
            if (
                (e.target !== i && i.matches('[data-toggle~="pop"]')) ||
                i.matches('[data-toggle~="tooltip"]')
            ) {
                i.removeAttribute('data-state');
            }
        });
    });
};

export {toggle};
