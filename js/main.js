/* RAMs <https://github.com/jacobxperez/rams>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {

    // check to see if it is local host
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        // set url to local host
        var baseURL = window.location.origin;
    } else {
        // set url to live
        var baseURL = window.location.origin + '/blog';
    }


    // Template Class
    class Template {
        constructor(templateURL, templateId, selectorIndex) {
            // get template url
            this._templateURL = baseURL + templateURL;
            // template id
            this._templateId = templateId;
            // selector for setting the clone template on index.html
            this._selectorIndex = selectorIndex;
        }

        get templateURL() {
            return this._templateURL;
        }

        get templateId() {
            return this._templateId;
        }

        get selectorIndex() {
            return this._selectorIndex;
        }

        fetchTemplate(_templateURL, _templateId, _selectorIndex) {
            fetch(`${_templateURL}`)
                .then((response) => {
                    // when the template is loaded
                    return response.text();
                })
                .then((html) => {
                    // initialize the dom parser
                    let parser = new DOMParser();
                    // get the footer from index.html
                    let getSelector = document.querySelector(_selectorIndex);

                    // get the template from templates folder and parseit
                    let doc = parser.parseFromString(html, 'text/html');
                    let template = doc.getElementById(_templateId);
                    // clone template footer
                    let clone = template.content.cloneNode(true);

                    // append the template on index.html 
                    getSelector.appendChild(clone);
                })
                .catch((err) => {
                    console.log('Error: faild to catch template', err);
                })
                .finally(() => {
                    // if is footer template start functions
                    if (_templateId === 'footerTemplate') {
                        dropDown();
                        smoothScroll();
                    }
                })
        }
    };


    // create nav template from class
    const NavTemplate = new Template();
    NavTemplate.fetchTemplate('/templates/nav.html', 'navTemplate', '[data-navbar="top"]');

    // create footer template from class
    const FooterTemplate = new Template();
    FooterTemplate.fetchTemplate('/templates/footer.html', 'footerTemplate', '[data-section="footer"]');


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

                }

                e.stopPropagation();
            })
        };

        // toggle class active on tooltip
        for (let i = 0; i < getToolTip.length; i++) {
            getToolTip[i].addEventListener("click", function (e) {

                if (this.hasAttribute('data-state', 'active') === false) {

                    this.setAttribute('data-state', 'active');

                } else if (this.hasAttribute('data-state', 'active') === true) {

                    this.removeAttribute('data-state');

                }

                e.stopPropagation();
            })
        };

        // Close dropdown on document click
        document.addEventListener("click", function (e) {
            for (let i = 0; i < getPop.length; i++) {
                if (e.target !== getPop[i]) {

                    getPop[i].removeAttribute('data-state');

                }
            }

            for (let i = 0; i < getToolTip.length; i++) {
                if (e.target !== getToolTip[i]) {

                    getToolTip[i].removeAttribute('data-state');

                }
            }
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
                })

            })
        }
    };
    // end Smooth Scroll

});
