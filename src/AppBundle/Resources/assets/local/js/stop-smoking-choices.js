var $selectedTab;
function positionArrow()
{
  if($selectedTab)
  {
    var $parent = $selectedTab.parent(),
    pindx = $parent.index(),
    pPadd = $parent.css("padding-left").replace("px","")/1,
    newLeft = pindx*33.33;
    $("#selectedArrow").css({
      left: newLeft+"%",
      marginLeft: ($selectedTab.outerWidth()/2)-($("#selectedArrow").width()/2)+(pindx*pPadd)
    });
  }
}

$(function(){
  $('.nav-item .btn-cta').on('show.bs.tab', function (e) {
    //e.target // newly activated tab
    //e.relatedTarget // previous active tab
    
    if(typeof e.relatedTarget == 'undefined')
    {
      //no tab previous showing, hide the captions, show the arrow
      $(".arrow-row").css({display: 'flex'});
      $(".chance-percent-row").hide();
    }
    $selectedTab = $(this);
    positionArrow();  

    // Only scroll down - scroll to the header
    var pageHeaderTop = $(".page-header-1").offset().top-20,
    bodyTop = $("body").scrollTop(),
    maxSecs = 1;
    if(bodyTop<pageHeaderTop)
    {
      var diff = pageHeaderTop-bodyTop,
      dur = Math.max(0.5, (diff/pageHeaderTop)*maxSecs);
      TweenLite.to("body", dur, {scrollTo: pageHeaderTop, ease:Power1.easeInOut});  
    }
    
  });
  $(window).on("resize orientationchange", positionArrow);

  $(".card-outline-success").each(function(){
    $(this).clone().appendTo($(this).parent());
  });
  
  switch(window.location.hash)
  {
    case "#stop_smoking_advisor":
      $('.nav-item .btn-cta').eq(0).trigger("click");
    break;
    case "#stop_smoking_medicines":
      $('.nav-item .btn-cta').eq(1).trigger("click");
    break;
    case "#stop_smoking_alone":
      $('.nav-item .btn-cta').eq(2).trigger("click");
    break;
  }
});