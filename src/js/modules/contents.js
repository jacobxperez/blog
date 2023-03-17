const contents = () => {
    const getContent = document.getElementById('content');
    const getHeadings = getContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    for (let i = 0; i < getHeadings.length; i++) {
        const heading = getHeadings[i];
        heading.setAttribute('id', i);

        const contentsMenu = `
            <ul data-display="small-none">
                <li>
                    <p><strong>Contents</strong></p>
                </li>
                <li><a></a></li>
            </ul>

            <ul data-display="small" data-box="border">
                <li>
                    <a data-anchor data-flex data-toggle>
                        <strong data-item="grow">Contents</strong>
                        <span data-icon="&#xe043;"></span>
                    </a>

                    <ul data-dropbox>
                        <li><a href="https://github.com/jacobxperez" data-anchor></a></li>
                    </ul>
                </li>
            </ul>`;
    }

    console.log(getHeadings);
};

export {contents};
