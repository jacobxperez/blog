/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
const meta = {
    layout: null,
    title: null,
    subtitle: null,
    author: null,
    date: {
        published: null,
        revised: null,
    },
    getTitle() {
        return (this.title = document.title);
    },
    getAuthor() {
        return (this.author =
            document.head.querySelector('[name="author"]').content);
    },
};
