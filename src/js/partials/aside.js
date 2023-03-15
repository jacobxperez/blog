import {Template} from '../modules/template';

const aside = `
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

export {aside};
