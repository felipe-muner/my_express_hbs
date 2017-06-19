const moment = require('moment')

function hbsHelpers(hbs) {
  console.log('FOI ENTREI NA PASTA NOVA');
  console.log(moment().format());
  console.log(new Date());
  console.log(moment().format('YYYY-MM-DD HH:mm:ss:SSS'));
  console.log(moment().toISOString());
  console.log(moment());
  return hbs.create({
    defaultLayout:'layout',
    helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
      dizNome: function() {
        console.log('reading it');
        //console.log(this);
        var dt = moment().format('YYYY-MM-DD hh:mm:ss:SSS')
        console.log(dt);
        return dt
      }
    }
  });
}

module.exports = hbsHelpers;
