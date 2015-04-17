var $ = require('jquery');
var Vue = require('vue');
var moment = require('moment');




var vm = new Vue({
  el: '.js-app',
  
  data: {
    num:      0,
    count:    20,
    user:     'kyaido',
    position: 0,
    bookmark: []
  },
  
  ready: function() {
    var self = this;
    document.onscroll = function(e){
      self.position = document.documentElement.scrollTop || document.body.scrollTop;
      
      var height = $(window).height();
      var scrollTop = $(window).scrollTop();
      var documentHeight = $(document).height();
      if (documentHeight === height + scrollTop) {
        self.search();
      }
      
    };
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
      var self = this;
      var btn  = document.querySelector('.more > button');
      var base = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://b.hatena.ne.jp/';
      var url  = base + self.user + '/rss?of=' + (self.num * self.count) + '&num=-1';
      btn.classList.add('loading');
      
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
          btn.classList.remove('loading');
        }, 1000);
      });
      
    }
  }

});