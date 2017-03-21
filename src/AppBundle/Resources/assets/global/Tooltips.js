RegExp.escape = function(str) {
  return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
};
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(RegExp.escape(search), 'gi'), replacement);
};
String.prototype.ucwords = function() {
  return (this + '')
    .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
      return $1.toUpperCase();
    });
};
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

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
        var message = this.content;
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
      var $ttCont = $(this),
      HTML = $ttCont.html();
      $.each(tooltips, function()
      {
        var re = new RegExp(RegExp.escape(this.key), 'gi');
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