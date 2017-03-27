var Facts = (function($){
  function initFacts()
  {
    var showingIndex = 0;
    $(".fact-carousel-indicators li").on("click", function(){
      $(".fact-panel").eq(showingIndex).hide();
      $(".fact-carousel-indicators li.active").removeClass("active");
      showingIndex = $(this).attr("data-show-index");
      $(".fact-panel").eq(showingIndex).show();
      $(this).addClass("active");
    });

    $(".fact-carousel-indicators").show();
    $(".fact-panel").hide().eq(showingIndex).show();
  }
  var public = {};
  initFacts();
  return public;
})(jQuery);