var $ = require('jquery');
var Vue = require('vue');
var moment = require('moment');

var vm = new Vue({
  el: '.js-app',
  data: {
    num: 0,
    count: 20,
    user: 'kyaido',
    bookmark: []
  },
  events: {
    'hook:created': 'search'
  },
  methods: {
    search: function() {
      var self   = this;
      var base   = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://b.hatena.ne.jp/';
      var url    = base + self.user + '/rss?of=' + (self.num * self.count) + '&num=-1';
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        cache: false
      }).done(function(data){
        var item = data.responseData.feed.entries;
        var len  = item.length;
        for(var i = 0; i < len; i++) {
          item[i].publishedDate = moment(item[i].publishedDate, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('YYYY/MM/DD');
          self.bookmark.push(item[i]);
        }
        self.num++;
      })
      .fail(function(data) {
        console.log('ajax error');
      });
    }
  }
});