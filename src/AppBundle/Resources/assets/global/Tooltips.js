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

(function(){
  function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
          if (oldonload) {
              oldonload();
          }
          func();
      };
    }
  }

  $(function () {
    //call plugin function after DOM ready
    addLoadEvent(function(){
      outdatedBrowser({
        lowerThan: 'flex'
      });
    });

    //https://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#internet-explorer-10-in-windows-phone-8
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style');
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      );
      document.head.appendChild(msViewportStyle);
    }

    //https://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#android-stock-browser
    var nua = navigator.userAgent;
    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('select.form-control').removeClass('form-control').css('width', '100%');
    }
  });
})();