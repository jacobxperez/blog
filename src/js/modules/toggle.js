const toggle = () => {
    document.addEventListener(
        'click',
        (e) => {
            if (
                e.target.matches('[data-toggle]') &&
                !e.target.hasAttribute('data-state', 'active')
            ) {
                e.target.setAttribute('data-state', 'active')
                e.stopPropagation()
            } else if (
                e.target.matches('[data-toggle]') &&
                e.target.hasAttribute('data-state', 'active')
            ) {
                e.target.removeAttribute('data-state')
                e.stopPropagation()
            }

            if (
                e.target.parentNode.matches('[data-toggle]') &&
                !e.target.parentNode.hasAttribute('data-state', 'active')
            ) {
                e.target.parentNode.setAttribute('data-state', 'active')
                e.stopPropagation()
            } else if (
                e.target.parentNode.matches('[data-toggle]') &&
                e.target.parentNode.hasAttribute('data-state', 'active')
            ) {
                e.target.parentNode.removeAttribute('data-state')
                e.stopPropagation()
            }
        },
        true
    )
}

export {toggle}
