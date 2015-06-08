'use strict';

var app = require('koa')(),
    router = require('koa-router')(),
    utils = require('./utils'),
    data = {
      hu: utils.formatCountryList(require('./resources/countries-hu')),
      en: utils.formatCountryList(require('./resources/countries-en'))
    },
    locale = utils.getLocale(data);

router
  .get('/countries', function *(next) {
    this.body = data[locale(this.query)];

    yield next;
  })
  .get('/countries/:id', function *(next) {
    let countries = data[locale(this.query)];

    this.body = countries.filter(function(country) {
      return country.id === this.params.id;
    }.bind(this));

    yield next;
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3005);
