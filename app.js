
var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var APIkey = 'AIzaSyCZWAlyr7bWjvsE9Is8QZNZxJhsRIhmjgo'

function getDataFromAPI(searchTerm, callback) {    
    var query = {
      part: 'snippet',
      type: 'video',
      key: APIkey,
      q: searchTerm
    }
    $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {
    var resultElement = '';
    
    if(data) {
        data.items.forEach(function(item) {
          var searchItemLink = 'https://www.youtube.com/watch?v=' + item.id.videoId;
          var imageLink = item.snippet.thumbnails.medium.url
          var image = '<span class="images">' + 
                        '<a href="' + searchItemLink + '" target="_blank">' +
                          '<img class="card-img-top" src="'+ imageLink +'" />' +
                          '</a>' +
                        '</span>';

          resultElement += image;
        });
    } else {
        resultElement += '<p>No result</p>';
    }

    $('.js-search-results').html(resultElement);
    
}

function connectSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromAPI(query, displayYouTubeSearchData);
  });
}

$(function() {
  connectSubmit();
});