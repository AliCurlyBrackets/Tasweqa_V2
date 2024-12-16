jQuery(document).ready(function(){
    if(jQuery('.Analysis_Data').length) {
        var a = 0;
        jQuery(window).scroll(function() {
            var $top = jQuery('.Counter').offset().top - window.innerHeight;
            if (a == 0 && jQuery(window).scrollTop() > $top) {
                jQuery('.Counter').each(function () {
                    var $this = jQuery(this),
                        countTo =$this.attr('data-number');
                    jQuery({countNum: $this.text()}).animate({countNum: countTo},
                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text("+" + Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text("+" + this.countNum);
                            }
                        });
                });
                a = 1;
            }
 });
}
});

$(function() {
    var $clientslider = $('#clientlogo');
    var clients = $clientslider.children().length;
    var clientwidth = (clients * 220); 
    $clientslider.css('width', clientwidth);
    var rotating = true;
    var clientspeed = 1800;
    var seeclients = setInterval(rotateClients, clientspeed);
    $(document).on({
      mouseenter: function() {
        rotating = false;
      },
      mouseleave: function() {
        rotating = true;
      }
    }, '#ourclients');
    function rotateClients() {
      if (rotating != false) {
        var $first = $('#clientlogo li:first');
        $first.animate({
          'margin-left': '-220px'
        }, 2000, function() {
          $first.remove().css({
            'margin-left': '0px'
          });
          $('#clientlogo li:last').after($first);
        });
      }
    }
  });


    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each( function(index){
        menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }      
            },

            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

