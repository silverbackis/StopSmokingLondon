var Tooltips = (function($){
  var $tooltipText = $(".ttt"),
  tooltips,
  $modal = $("#tooltip"),
  loadedTips = false;
  var replaceWithLink = function ($1)
  {
    return "<a href=\"#\" class=\"tooltip-link\">" + $1 + "</a>";
  };

  function showTooltip(tooltipKey)
  {
    var tooltipKeyCheck = tooltipKey.toLowerCase();
    $.each(tooltips, function()
    {
      if(this.key.toLowerCase() === tooltipKeyCheck)
      {
        var message = this.content.linkify({
          className: '',
          attributes: {
            target: '_blank'
          }
        });
        $(".modal-title", $modal).html(tooltipKey.ucfirst());
        $(".modal-body", $modal).html(message);
        $modal.modal('show');
        return false;
      }
    });
  }

  function addLinks()
  {
    if( !loadedTips )
    {
      $tooltipText = $(".ttt");
      loadTips();
      return;
    }
    $tooltipText.each(function(){
      var $ttCont = $(this);
      $(".tooltip-link", $ttCont).contents().unwrap();
      HTML = $ttCont.html();
      $.each(tooltips, function()
      {
        var restr = RegExp.escape(this.key);
        //console.log(restr);
        var re = new RegExp(restr, 'gi');
        HTML = HTML.replace(re, replaceWithLink);
      });
      $ttCont.html(HTML);
    });
    $(".tooltip-link").on("click", function(e){
      e.preventDefault();
      showTooltip($(this).text());
    });
  }

  function loadTips()
  {
    if( !loadedTips && $tooltipText.length > 0 )
    {
      loadedTips = true;
      $.ajax({
        url: '/tooltips.json',
        success: function(ttdata)
        {
          tooltips = ttdata;
          addLinks();
        },
        error: function()
        {
          loadedTips = false;
        }
      });
    }
  }
  loadTips();
  return {
    refresh: addLinks
  };
})(jQuery);