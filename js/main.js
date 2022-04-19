/* RAMs <https://github.com/jacobxperez/rams>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {

    // check to see if it is local host
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        // set url to local host
        var baseUrl = window.location.origin;
    } else {
        // set url to live
        var baseUrl = window.location.origin + '/blog';
    }


    // Nav Template
    (() => {
        // set nav template url
        const navUrl = baseUrl + '/templates/nav.html';

        fetch(`${navUrl}`)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // initialize the dom parser
                let parser = new DOMParser();
                // get the footer from index.html
                let getFooter = document.querySelector('[data-navbar="top"]');

                // get the template from templates folder and parseit
                let doc = parser.parseFromString(html, 'text/html');
                let template = doc.getElementById('navTemplate');
                // clone template footer
                let clone = template.content.cloneNode(true);

                // append the template on index.html 
                getFooter.appendChild(clone);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // start functions after nav load
                dropDown();
                smoothScroll();
            });
    })();


    // Footer Template
    (() => {
        // set footer template url
        const footerUrl = baseUrl + '/templates/footer.html';

        fetch(`${footerUrl}`)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // initialize the dom parser
                let parser = new DOMParser();
                // get the footer from index.html
                let getFooter = document.querySelector('[data-section="footer"]');

                // get the template from templates folder and parseit
                let doc = parser.parseFromString(html, 'text/html');
                let template = doc.getElementById('footerTemplate');
                // clone template footer
                let clone = template.content.cloneNode(true);

                // append the template on index.html 
                getFooter.appendChild(clone);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
    })();


    // Dropdown function 
    const dropDown = () => {
        const getToggle = document.querySelectorAll('[data-toggle]');
        const getPop = document.querySelectorAll('[data-toggle="pop"]');
        const getToolTip = document.querySelectorAll('[data-tooltip]');

        // toggle class active
        for (let i = 0; i < getToggle.length; i++) {
            getToggle[i].addEventListener("click", function (e) {

                if (this.hasAttribute('data-state', 'active') === false) {

                    this.setAttribute('data-state', 'active');

                } else if (this.hasAttribute('data-state', 'active') === true) {

                    this.removeAttribute('data-state');

                };

                e.stopPropagation();
            });
        };

        // toggle class active on tooltip
        for (let i = 0; i < getToolTip.length; i++) {
            getToolTip[i].addEventListener("click", function (e) {

                if (this.hasAttribute('data-state', 'active') === false) {

                    this.setAttribute('data-state', 'active');

                } else if (this.hasAttribute('data-state', 'active') === true) {

                    this.removeAttribute('data-state');

                };

                e.stopPropagation();
            });
        };

        // Close dropdown on document click
        document.addEventListener("click", function (e) {
            for (let i = 0; i < getPop.length; i++) {
                if (e.target !== getPop[i]) {

                    getPop[i].removeAttribute('data-state');

                };
            }

            for (let i = 0; i < getToolTip.length; i++) {
                if (e.target !== getToolTip[i]) {

                    getToolTip[i].removeAttribute('data-state');

                };
            };
        });
    };
    // end Dropdwon


    // Smooth Scroll
    const smoothScroll = () => {
        const intLinks = document.querySelectorAll("a[href^='#']");

        for (let i = 0; i < intLinks.length; i++) {
            intLinks[i].addEventListener("click", function (e) {

                e.preventDefault();

                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth"
                });

            });
        };
    }
    // end Smooth Scroll

});
