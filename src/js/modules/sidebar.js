const sidebar = () => {
    const getAside = document.getElementById('aside');
    const getContent = document.getElementById('content');

    if (template.type === '') {
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

    if (template.type === 'post') {
        // gets all the headings of the post
        const getHeadings = getContent.querySelectorAll(
            'h1, h2, h3, h4, h5, h6'
        );

        const contents = `
                <ul id='contents' data-display="small-none">
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
    
                        <ul id='contentsDropdown' data-dropbox>
                        </ul>
                    </li>
                </ul>`;

        // insert contents into aside
        getAside.insertAdjacentHTML('beforeend', contents);

        // generates sidebar navigation with post headings
        getHeadings.forEach((heading, i) => {
            heading.setAttribute('id', `${i}`);
            const headingInnerText = heading.innerText;

            // generates navigation for large and medium screens
            const links = `<li><a href="#${i}">${headingInnerText}</a></li>`;
            const getContents = document.getElementById('contents');
            getContents.insertAdjacentHTML('beforeend', links);

            // generates navigation for small screens
            const dropdownLinks = `<li><a href="#${i}" data-anchor>${headingInnerText}</a></li>`;
            const getContentsDropdown =
                document.getElementById('contentsDropdown');
            getContentsDropdown.insertAdjacentHTML('beforeend', dropdownLinks);
        });
    }
};

export {sidebar};
