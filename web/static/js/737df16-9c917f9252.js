var Tweets = (function($){
  function loadTweets()
  {
    $.ajax({
      url: '/tweets.json',
      success: function(tweetsHTML)
      {
        $("#carouselContainer").html(tweetsHTML);
        initTweets();
      }
    });
  }

  function initTweets()
  {
    var showingIndex = 0;
    $(".news-carousel-indicators li").on("click", function(){
      $(".news-panel").eq(showingIndex).hide();
      $(".news-carousel-indicators li.active").removeClass("active");
      showingIndex = $(this).attr("data-show-index");
      $(".news-panel").eq(showingIndex).show();
      $(this).addClass("active");
    });

    $(".news-carousel-indicators").show();
    $(".news-panel").hide().eq(showingIndex).show();
  }
  var public = {};
  loadTweets();
  return public;
})(jQuery);

$(function(){
  
});