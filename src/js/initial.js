/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
const meta = {
    layout: false,
    title: false,
    subtitle: false,
    author: false,
    date: {
        publish: false,
        revised: false,
    },
    getTitle() {
        return (this.title = document.title);
    },
    getAuthor() {
        return (this.author =
            document.head.querySelector('[name="author"]').content);
    },
};
