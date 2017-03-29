!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/Windows Phone/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");if("undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

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