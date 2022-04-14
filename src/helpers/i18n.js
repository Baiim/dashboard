const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'id',
  otherLanguages: ['en'],
  keySeparator: false
});
