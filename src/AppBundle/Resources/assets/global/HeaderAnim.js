var HeaderAnim = (function($){
  var $FeatureImage = $(".jumbotron-feature-image"),
  isHome = $(".welcome").length > 0;

  function InteractiveMobile()
  {
    var Constraints = {
      x: 20,
      y: 25
    },
    Boundaries = {
      x: null,
      y: null
    };
    // setup gyro events
    var RoundGyro = function(num)
    {
      return Math.round(num*10)/10;
    };

    var HeaderGyro = function(evt)
    {
      var y = RoundGyro(evt.originalEvent ? evt.originalEvent.beta : evt.beta);
      var x = RoundGyro(evt.originalEvent ? evt.originalEvent.gamma : evt.gamma);

      // Refresh X boundaries
      if(Boundaries.x === null)
      {
        Boundaries.x = {
          min: x-Constraints.x,
          max: x+Constraints.x
        };
      }
      else
      {
        if(x < Boundaries.x.min)
        {
          Boundaries.x = {
            min: x,
            max: x+(Constraints.x*2)
          };
        }else if(x > Boundaries.x.max)
        {
          Boundaries.x = {
            min: x-(Constraints.x*2),
            max: x
          };
        }
      }

      // Refresh y boundaries
      if(Boundaries.y === null)
      {
        Boundaries.y = {
          min: y-Constraints.y,
          max: y+Constraints.y
        };
      }
      else
      {
        if(y < Boundaries.y.min)
        {
          Boundaries.y = {
            min: y,
            max: y+(Constraints.y*2)
          };
        }else if(y > Boundaries.y.max)
        {
          Boundaries.y = {
            min: y-(Constraints.y*2),
            max: y
          };
        }
      }


      TweenLite.set($FeatureImage[0], {
        y: ((y - Boundaries.y.min - Constraints.y)/3)*-1,
        x: ((x - Boundaries.x.min - Constraints.x)/2)*-1
      });
    };

    var xExtra = Math.round(Constraints.x/2)+1;
    $FeatureImage.css({
      bottom: Math.round((Constraints.y/3))-1,
      padding: '0 '+ xExtra + 'px',
      left: (xExtra) + 'px'
    });
    $(window).on("deviceorientation", HeaderGyro);
  }

  function InteractiveDesktop(init)
  {
    if(!isMobile.any)
    {
      var HeaderScroll = function(){
        var st = $("body").scrollTop(),
        newOpac = init ? 1 : 1-(st/300);
        TweenLite.set($FeatureImage[0], {y: st*0.35});
        if(isHome)
        {
          newOpac = 1-(st/300);
          TweenLite.set(".welcome", {
            y: st*0.18, 
            opacity: newOpac
          });

          TweenLite.set(".facts-header", {
            //y: st*0.05, 
            scale: 1+(st*0.0005),
            opacity: Math.min(1, newOpac+0.3)
          });
        }
        else
        {
          newOpac = 1-(st/300);
          TweenLite.set(".jumbotron-outer .h2-outer", {
            y: st*0.18, 
            opacity: newOpac
          });
        }
      };
      $(window).on("scroll", HeaderScroll);
      HeaderScroll();
    }
  }

  // Setup main text intro animation
  var introAnim;
  if(isHome)
  {
    
    //Intro for home
    introAnim = new TimelineLite({paused: true, onComplete: InteractiveDesktop, onStart: function(){
      $(".welcome, #factsHeaderOuter").css({opacity: 1});
    }})
      .to($FeatureImage[0], 0.6, {opacity: 1})
      .from($(".welcome .small")[0], 0.6, {opacity: 0, y: -20}, "+=0.6")
      .from($(".welcome .large")[0], 0.6, {opacity: 0, y: -15}, "-=0.4")
      .from(".facts-header", 0.6, {opacity: 0, y: -15}, "-=0.4");
  }
  else
  {
    
    // Intro for other pages
    introAnim = new TimelineLite({paused: true, onComplete: InteractiveDesktop, onStart: function(){
      $("#animHeader").css({opacity: 1});
    }})
      .to($FeatureImage[0], 0.6, {opacity: 1})
      .from($(".jumbotron-outer .h2-outer")[0], 0.6, {opacity: 0, y: -20}, "+=0.6");
  }

  // Get the large image, wait for load then play the text intro animation
  var BackgroundImage = $FeatureImage.css("background-image").slice(4, -1).replace(/"/g, "");
  $('<img/>').attr('src', BackgroundImage).on("load", function() {
    introAnim.play();
  });
  
  // Setup page interactive animation for mobile - tilt
  if(isMobile.any){
    InteractiveMobile();
  }
  else
  {
    InteractiveDesktop(true);
  }
  
  
  return {};
})(jQuery);