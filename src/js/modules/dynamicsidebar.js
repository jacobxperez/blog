const dynamicSidebar = () => {
    if (meta.layout === 'post') {
        const getContent = document.getElementById('content');
        const getHeadings = getContent.querySelectorAll(
            'h1, h2, h3, h4, h5, h6'
        );
        const getAside = document.getElementById('aside');

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
            const dropdownLinks = `<li><a href="#${i}" data-anchor>${headingText}</a></li>`;
            const getListMenu = document.getElementById('listMenu');
            getListMenu.insertAdjacentHTML('beforeend', links);
            const getListMenuDropdown =
                document.getElementById('listMenuDropdown');
            getListMenuDropdown.insertAdjacentHTML('beforeend', dropdownLinks);
        }
    }
};

export {dynamicSidebar};
