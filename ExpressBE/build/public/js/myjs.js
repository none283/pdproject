var server_database_data;
var index_company_now;

function myFunction(index, maxindex) {
    var string = 'data-position="' + index + '"';
    index_company_now = index;
    for (let i = 1; i <= maxindex; i++) {
      if(i != index)
      {
        var othervalue = 'data-position="' + i + '"';

        var element = document.querySelector('[' + othervalue + ']');        
        element.style.display = "none";
      }
      else
      {
        var element = document.querySelector('[' + string + ']');
        element.style.display = "flex";
      }
    }
}

function closeAll(maxindex) {
  for (let i = 1; i <= maxindex; i++) {
    var othervalue = 'data-position="' + i + '"';

    var element = document.querySelector('[' + othervalue + ']');        
    element.style.display = "none";
  }
}

function FindSelect(index) {
  if(index == 1)
  {
    var element = document.getElementById('companynameinput');
    element.style.display = "flex";

    var element = document.getElementById('indusnameinput');
    element.style.display = "none";
    element.value = "";
  }
  else if(index == 2)
  {
    var element = document.getElementById('companynameinput');
    element.style.display = "none";
    element.value = "";

    var element = document.getElementById('indusnameinput');        
    element.style.display = "flex";
  }
}

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

function onLoadFunc() {
    for (let i = 1; i < 147; i++) {
        var idname = "menudropdown -index -" + i;
        var element = document.getElementById(idname);

        var string = 'data-position="' + i + '"';
        var liname = document.querySelector('[' + string + ']');

        if(liname != null)
        {
          let text = liname.id;
          let resultfirst = text.replace(/-/g, " ");
          let result = resultfirst.replace(/0/g, "");
  
          lastres = capitalizeTheFirstLetterOfEachWord(result);
          element.innerHTML = lastres;
        }
    }
}

window.onload = function() {
    setTimeout(() => {
      onLoadFunc();
    }, "1000")
};

$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});