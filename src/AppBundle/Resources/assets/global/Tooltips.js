RegExp.escape = function(str) {
  return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
};
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(RegExp.escape(search), 'gi'), replacement);
};
function ucwords (str) {
  return (str + '')
    .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
      return $1.toUpperCase();
    });
}

var Tooltips = (function($){
  var $tooltipText = $(".ttt"),
  tooltips,
  $ttLink = $("<a />", {
    class: 'tooltip-link',
    href: '#'
  }),
  $modal = $("#tooltip");
  function showTooltip(tooltipKey)
  {
    var tooltipKeyCheck = tooltipKey.toLowerCase();
    $.each(tooltips, function()
    {
      if(this.key.toLowerCase() === tooltipKeyCheck)
      {
        var message = this.content;
        $(".modal-title", $modal).html(ucwords(tooltipKey));
        $(".modal-body", $modal).html(message);
        $modal.modal('show');
        return false;
      }
    });
  }

  function addLinks()
  {
    $tooltipText.each(function(){
      var $ttCont = $(this),
      HTML = $ttCont.html(),
      newHTML = HTML;
      $.each(tooltips, function()
      {
        var re = new RegExp(RegExp.escape(this.key), 'gi');
        while((result = re.exec(HTML)) !== null)
        {
          newHTML = newHTML.replace(result[0], "<a href=\"#\" class=\"tooltip-link\">" + result[0] + "</a>");
        }
      });
      $ttCont.html(newHTML);
    });
    $(".tooltip-link").on("click", function(e){
      e.preventDefault();
      showTooltip($(this).text());
    });
  }

  $.ajax({
    url: '/tooltips.json',
    success: function(ttdata)
    {
      tooltips = ttdata;
      addLinks();
    }
  });

  return {
    refresh: addLinks
  };
})(jQuery);