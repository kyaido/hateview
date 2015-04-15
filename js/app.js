var $ = require('jquery');
var Vue = require('vue');
var moment = require('moment');




var vm = new Vue({
  el: '.js-app',
  
  data: {
    num:      0,
    count:    20,
    user:     'kyaido',
    bookmark: []
  },
  
  events: {
    'hook:created': 'search'
  },
  
  filters: {
    formatDate: function (v) {
      return moment(v, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('YYYY/MM/DD');
    }
  },
  
  methods: {
    search: function(e) {
      document.querySelector('.more > button').classList.add('loading');
      var self = this;
      var base = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://b.hatena.ne.jp/';
      var url  = base + self.user + '/rss?of=' + (self.num * self.count) + '&num=-1';
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        cache: false
      })
      .done(function(data){
        setTimeout(function() {
          var item = data.responseData.feed.entries;
          var len  = item.length;
          for(var i = 0; i < len; i++) {
            self.bookmark.push(item[i]);
          }
          self.num++;
          document.querySelector('.more > button').classList.remove('loading');
        }, 1000);
      });
    }
  }

});