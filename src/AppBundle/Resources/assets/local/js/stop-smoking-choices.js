var $selectedTab;
function positionArrow()
{
  if($selectedTab)
  {
    var $parent = $selectedTab.parent(),
    newLeft = $parent.index()*33.33;
    $("#selectedArrow").css({
      left: newLeft+"%",
      marginLeft: ($selectedTab.outerWidth()/2)-($("#selectedArrow").width()/2)
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
  });
  $(window).on("resize orientationchange", positionArrow);

  $(".card-outline-success").each(function(){
    $(this).clone().appendTo($(this).parent());
  });
});