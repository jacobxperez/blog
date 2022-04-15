const source = document.getElementById('greet').innerHTML;

const template = Handlebars.compile(source);

const context = {
  greeting: 'Hello World!'
}

const compiledHtml = template(context);

const fill = document.getElementById('hello');

fill.innerHTML = compiledHtml;
