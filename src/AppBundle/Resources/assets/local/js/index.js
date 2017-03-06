$(function(){
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
});