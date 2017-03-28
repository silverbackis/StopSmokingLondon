var Facts = (function($){
  var $lis = $(".fact-carousel-indicators li"),
  maxPanels = $lis.length,
  showingIndex = 0;

  function initFacts()
  {
    
    $lis.on("click", function(){
      showIndex($(this).attr("data-show-index"));
    });

    $(".fact-carousel-indicators").show();
    $(".fact-panel")
    .on("click", function(e){
      showIndex(showingIndex+1);
    })
    .hide().eq(showingIndex).show();


  }
  function showIndex(newIndex)
  {
    $(".fact-panel").eq(showingIndex).hide();
    $(".fact-carousel-indicators li.active").removeClass("active");

    if(newIndex > maxPanels-1)
    {
      newIndex = 0;
    }
    showingIndex = newIndex;
    $(".fact-panel").eq(showingIndex).show();
    $lis.eq(showingIndex).addClass("active");
  }
  var public = {};
  initFacts();
  return public;
})(jQuery);