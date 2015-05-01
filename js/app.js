var $ = require('jquery');
var Vue = require('vue');
var moment = require('moment');
var _ = require('underscore');


var vm = new Vue({
  el: '.js-app',
  
  data: {
    num:        0,
    count:      20,
    user:       'kyaido',
    onLoading:  false,
    bookmark:   [],
    searchMode: false
  },
  
  events: {
    'hook:created': 'search',
    'hook:ready':   'scroll'
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
      var loadingClass = 'is-loading';
      btn.classList.add(loadingClass);
      
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
          btn.classList.remove(loadingClass);
          self.onLoading = false;
        }, 1000);
      });
      
    },
    scroll: function(e) {
      var self = this;
      
      function autopager() {
        var height = window.innerHeight; // $(window).height()
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // $(window).scrollTop()
        var documentHeight = document.documentElement.offsetHeight; // $(document).height()
        var buffer = 100;
        
        if (documentHeight - buffer < height + scrollTop) {
          if (self.onLoading) {
            return;
          }
          self.search();
          self.onLoading = true;
        }
      }
      
      var debounced = _.debounce(autopager, 100);
      document.addEventListener('scroll', debounced);
    },
    changeSearchMode: function() {
      this.searchMode = !this.searchMode;
      this.focusSearchField();
    },
    focusSearchField: function() {
      if(this.searchMode) {
        setTimeout(function() {
          // delay css transition time
          document.querySelectorAll('.overlay__field')[0].focus();
        }, 200);
      }
    },
    deleteBookmark: function() {
      this.num = 0;
      this.bookmark = [];
    },
    userSearch: function() {
      this.deleteBookmark();
      this.search();
      this.changeSearchMode();
    }
  }

});