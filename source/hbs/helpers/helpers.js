import hbs from 'handlebars';

module.exports = {

  navLink: (text, url, name) => {
    const safeText = hbs.Utils.escapeExpression(text);
    const safeUrl = hbs.Utils.escapeExpression(url);
    const safeName = hbs.Utils.escapeExpression(name);

    const output = `<li><a href="${safeUrl}" name="${safeName}">${safeText}</a></li>`;

    return new hbs.SafeString(output);
  },

};
