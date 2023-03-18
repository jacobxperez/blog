const sidebar = () => {
    const getAside = document.getElementById('aside');
    const getContent = document.getElementById('content');

    if (meta.layout === null) {
        const followLinks = `
        <ul data-display="small-none">
            <li>
                <p><strong>Follow Me</strong></p>
            </li>
            <li><a href="https://github.com/jacobxperez">Github</a></li>
            <li><a href="https://www.linkedin.com/in/jacobperez915/">Linkedin</a></li>
            <li><a href="https://twitter.com/jacobperez915">Twitter</a></li>
            <li><a href="https://www.instagram.com/volovaanmix/">Instagram</a></li>
        </ul>
    
        <ul data-display="small" data-box="border">
            <li>
                <a data-anchor data-flex data-toggle>
                    <strong data-item="grow">Follow Me</strong>
                    <span data-icon="&#xe043;"></span>
                </a>
    
                <ul data-dropbox>
                    <li><a href="https://github.com/jacobxperez" data-anchor>Github</a></li>
                    <li><a href="https://www.linkedin.com/in/jacobperez915/" data-anchor>Linkedin</a></li>
                    <li><a href="https://twitter.com/jacobperez915" data-anchor>Twitter</a></li>
                    <li><a href="https://www.instagram.com/volovaanmix/" data-anchor>Instagram</a></li>
                </ul>
            </li>
        </ul>`;

        getAside.insertAdjacentHTML('beforeend', followLinks);
    }

    if (meta.layout === 'post') {
        const getHeadings = getContent.querySelectorAll(
            'h1, h2, h3, h4, h5, h6'
        );
        const contentsMenu = `
                <ul id='listMenu' data-display="small-none">
                    <li>
                        <p><strong>Contents</strong></p>
                    </li>
                </ul>
    
                <ul data-display="small" data-box="border">
                    <li>
                        <a data-anchor data-flex data-toggle>
                            <strong data-item="grow">Contents</strong>
                            <span data-icon="&#xe043;"></span>
                        </a>
    
                        <ul id='listMenuDropdown' data-dropbox>
                        </ul>
                    </li>
                </ul>`;

        getAside.insertAdjacentHTML('beforeend', contentsMenu);

        for (let i = 0; i < getHeadings.length; i++) {
            const heading = getHeadings[i];
            heading.setAttribute('id', `${i}`);
            const headingText = heading.innerText;

            const links = `<li><a href="#${i}">${headingText}</a></li>`;
            const getListMenu = document.getElementById('listMenu');
            getListMenu.insertAdjacentHTML('beforeend', links);

            const dropdownLinks = `<li><a href="#${i}" data-anchor>${headingText}</a></li>`;
            const getListMenuDropdown =
                document.getElementById('listMenuDropdown');
            getListMenuDropdown.insertAdjacentHTML('beforeend', dropdownLinks);
        }
    }
};

export {sidebar};