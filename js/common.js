// ----------------------------------------------------------------------------
// init
// ----------------------------------------------------------------------------
$(function () {
  
  // feed
  var num  = 0;
  var user = 'kyaido';
  var url  = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://b.hatena.ne.jp/' + user + '/rss?of=' + num + '&num=-1';
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp'
  })
  .done(function(data) {
    var dom   = '';
    var item  = data.responseData.feed.entries;
    var len   = item.length;
    
    for(var i = 0; i < len; i++) {
      var title  = item[i].title;
      var url    = item[i].link;
      var date   = moment(item[i].publishedDate, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('YYYY/MM/DD');
      var tags   = item[i].categories;
      var tagsL  = tags.length;
      var tagDom = '';
      
      for (var j = 0; j < tagsL; j++) {
        tagDom += '<li class="items__tag"><a href="#">' + tags[j] + '</a></li>';
      }
      
      dom += '<div class="items__item">' +
               '<div class="items__inner">' +
                 '<h2 class="items__title"><a href="' + url + '" target="_blank">' + title + '</a></h2>' +
                 '<ul class="items__tags">' + tagDom + '</ul>' +
                 '<div class="items__date">' + date + '</div>' +
                 '<div class="items__url"><a href="' + url + '" target="_blank">' + url + '</a></div>' +
               '</div>' +
             '</div>';
      
    }
    $('.items').html($.parseHTML(dom));
  })
  .fail(function(data) {
    console.log('ajax error');
  });
  
});