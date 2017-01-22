
var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var APIkey = 'AIzaSyBSDFze2FT44H1_A0_Havt8SXbHVTwe6CY'

function getDataFromAPI(searchTerm, callback) {    
    var query = {
      part: 'snippet',
      key: APIkey,
      q: searchTerm
    }
    $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {
    var results = '';
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
          //var elem = '<p class="card">' + image + '</p>'; 

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