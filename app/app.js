
import font from './assets/scss/common/_font.scss';
import styles from './assets/scss/main.scss';

var isLoading = false;


var loader = document.getElementsByClassName("loader-model")[0];
loader.style.display = "block";

function fadeIn(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

function triggerSlowLoad(message) {
    if (isLoading) {
        var loadingMessage = loader.getElementsByClassName("loading-message")[0];
        loadingMessage.style.opacity = "0";
        loadingMessage.innerHTML = message;
        fadeIn(loadingMessage);
    } else {
        return;
    }
}
isLoading = true;

setTimeout(function() {
    triggerSlowLoad("hmmmmmmm, Still Loading");
}, 8000);
setTimeout(function() {
    triggerSlowLoad("You have potato Internet...");
}, 14000);

window.onload = function() {

    setTimeout(function() {
      loader.style.display = "none";
        isLoading = false;
    }, 4000);
};

// Set a timer that shows a message after 6 seconds if the page is still loading




// Animation text
var prefix = 'Yo, Im Deri and I Love <br>';
var skills = [
    'JavaScript',
    'the sun',
    'HTML & CSS',
    'Node.js',
    'Design',
    'Living life'
].map(function(s) {
    return s + ".";
});
var delay = 2;
var step = 1;
var tail = 5;
var timeout = 75;
var p = document.getElementsByClassName('i-am')[0];
var colors = [
    "rgb(110,64,170)",
    "rgb(150,61,179)",
    "rgb(191,60,175)",
    "rgb(228,65,157)",
    "rgb(254,75,131)",
    "rgb(255,94,99)",
    "rgb(255,120,71)",
    "rgb(251,150,51)",
    "rgb(226,183,47)",
    "rgb(198,214,60)",
    "rgb(175,240,91)",
    "rgb(127,246,88)",
    "rgb(82,246,103)",
    "rgb(48,239,130)",
    "rgb(29,223,163)",
    "rgb(26,199,194)",
    "rgb(35,171,216)",
    "rgb(54,140,225)",
    "rgb(76,110,219)",
    "rgb(96,84,200)",
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomChar() {
    return String.fromCharCode(Math.random() * (127 - 33) + 33);
}

function getRandomColoredString(n) {
    var result = '';
    for (var i = 0; i < n; i++) {
        result += "<span style=\"color:" + getRandomColor() + "\">" + getRandomChar() + "</span>";
    }
    return result;
}
/** Global State */
var $ = {
    solid: '',
    prefixP: -tail,
    skillI: 0,
    skillP: 0,
    direction: 'forward',
    delay: delay,
    step: step
};

function render() {
    var skill = skills[$.skillI];
    if ($.step) {
        $.step--;
    } else {
        $.step = step;
        if ($.prefixP < prefix.length) {
            if ($.prefixP >= 0) {
                $.solid += prefix[$.prefixP];
            }
            $.prefixP++;
        } else {
            if ($.direction === 'forward') {
                if ($.skillP < skill.length) {
                    $.solid += skill[$.skillP];
                    $.skillP++;
                } else {
                    if ($.delay) {
                        $.delay--;
                    } else {
                        $.direction = 'backward';
                        $.delay = delay;
                    }
                }
            } else {
                if ($.skillP > 0) {
                    $.solid = $.solid.slice(0, -1);
                    $.skillP--;
                } else {
                    $.skillI = ($.skillI + 1) % skills.length;
                    $.direction = 'forward';
                }
            }
        }
    }
    p.innerHTML = $.solid + getRandomColoredString($.prefixP < prefix.length ?
        Math.min(tail, tail + $.prefixP) :
        Math.min(tail, skill.length - $.skillP));
    setTimeout(render, timeout);
}
if(!jQuery('header').hasClass('reg-header')){
  setTimeout(render, 500);
}
var Doggo = {

    load: function(url, callback) {

        var xhr;

        if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);

                    break;
                } catch (e) {}
            } // end for
        }


        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if (xhr.readyState < 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            // all is well
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        }

        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", "Client-ID 08cbf6378b57d52");
        xhr.send('');

    },
    getDoggoGallery: function() {

        var doggoUrl = "https://api.imgur.com/3/gallery/search?q=" + "{Doggo}";

        var whichDoggo = Math.floor(Math.random() * (60 + 1));

        Doggo.load(doggoUrl, function(xhr) {

            var response = JSON.parse(xhr.response);

            if (response === null || response === undefined) {
                componentTwo = document.getElementsByClassName("component-two");
                componentTwo.style.display = "none";
                return;
            }
            var id = response.data[whichDoggo].id;

            Doggo.getDoggo(id);
        });

    },
    getDoggo: function(ID) {

        var doggoUrl = "https://api.imgur.com/3/gallery/" + ID;

        Doggo.load(doggoUrl, function(xhr) {

            let response = JSON.parse(xhr.response);

            if (response === null || response === undefined) {
                componentTwo.style.display = "none";
                return;
            }
            if (response.data.images[0].link === null || response.data.images[0].link === undefined) {
                componentTwo.style.display = "none";
                return;
            }
            var imgUrl = response.data.images[0].link;

            var imageMask = document.getElementsByClassName("doggo")[0];
            var imageHolder = document.getElementsByClassName("image-holder")[0];
            var backgroundURL = "background-image:url('" + imgUrl + "')";
            imageMask.setAttribute("src", imgUrl);
            imageHolder.setAttribute("style", backgroundURL);
        });
    }


};

if (document.getElementsByClassName('component-two') > 0) {
    Doggo.getDoggoGallery();
}

function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}


const pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

const elements = document.querySelectorAll(".nav-list li a");


elements.forEach(function(elem, index) {

    console.log(elem.href);
    if(elem.href == "#"){
      console.log("calling");
      elem.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
      });
    }
    if (elem.href.substr(elem.href.lastIndexOf("/") + 1) == pgurl || elem.href == ''){
        elem.classList.add("active");
        let parent = elem.closest('li');

        if(closest(parent,'li') ){
          var outter = closest(parent,'li');
          var anchor = outter.querySelector('a');
          anchor.classList.add("active");
        }


    }

})


var anchors = document.querySelectorAll('a');

anchors.forEach(function(elem, index){

  elem.addEventListener('click', function(event){
    if(this.href == "#"){
      console.log("yep");
      return
    }
  });
});



function mapPointsToImage(points, element, source){
    points.map(function(point, index){
        // create ugly but fast html element with values
        let flip= "";
        let active = "";
        let show = "";

        if(point.xAxis > 55){
            flip = "flip-side";
        }

        if(point.active){
          active = "opacity:1;"
          show = "active" ;

        }

        let mapItem =
                        "<a class='location "+ show +"' href='#' data-attr='"+ source  +"-point-" + index + "' data-x='"+ point.xAxis + "%' data-y='"+ point.yAxis +"%' style='left: " + point.xAxis + "%; top:" + point.yAxis + "%;' ></a> " +
                        "<div class='info-block col-lg-4 col-md-4 " + flip + "' data-attr='"+ source + "-point-" +  index + "' style=' "+ active +"' > "+
                        " <div class='close-btn'><i class='close rounded'></i></div> <div class='text-area'> <h4> " + point.title + " </h4> <p class='p-14 bold text-brand-primary'>" + point.message + "</p></div></div>";
                        element.querySelector('.image-holder').innerHTML += mapItem;
    });

    document.querySelectorAll('.component-map-banner .info-block').forEach(function(elem, index) {
        //jquery reference to this
        let that = elem;
        //get the individual data selector used to match the point and the block
        let dataInfo = elem.getAttribute('data-attr');
        //use the data to get the matching anchor
        let selector = ".component-map-banner a.location[data-attr='" + dataInfo + "']";
        //jquery reference the selector
        let anchor = document.querySelector(selector);
        //get the x and y cordinates of the anchor
        let topPos = anchor.getAttribute('data-y');
        let leftPos = anchor.getAttribute('data-x');
        //place the div on the screen
        that.style.left = leftPos;
        that.style.top= topPos ;


        // click event for locations
        anchor.addEventListener('click', function(event) {

            //prevent default event triggers and stop propagation
            event.preventDefault();
            event.stopPropagation();
            // hide all info blocks that might be open
            document.querySelectorAll('.component-map-banner .info-block').forEach(function(elem) {
                elem.style.opacity = "0";
                that.classList.remove('active');
            });
            document.querySelectorAll('.component-map-banner a.location').forEach(function(elem) {
                // remove all active location points
                elem.classList.remove('active');

            });
            //make this location point active
            this.classList.add('active');
            //add active to info block
            that.classList.add('active');
            // show the correct info block
            elem.style.opacity = "1";
        });
        document.querySelectorAll('.close-btn').forEach(function(elem) {

                elem.addEventListener('click', function() {
                //jquery reference this
                let closeBtn = this;
                //hide the info block
                closeBtn.parentNode.style.opacity = "0";
                ///make the location points inactive
                document.querySelectorAll('.component-map-banner a.location').forEach(function(elem) {
                    // remove all active location points
                    elem.classList.remove('active');
                    //remove info block event
                    that.classList.remove('active');
                });
            });
        });
    });

    // add click event for button close

}

if (document.getElementsByClassName('component-map-banner')) {

    const mapPoints = {
        home: [{
                active: true,
                title: "title",
                xAxis: "80",
                yAxis: "80",
                message: "I grew up a screw up, got introdued to the game - got an ounce. I blew up. Fat stacks overnight, young brother biggie smalls gonna be the next Frank White."
            },
            {
                title: "title",
                xAxis: "95.5",
                yAxis: "6",
                message: "Point message"
            },
            {
                title: "title",
                xAxis: "21",
                yAxis: "9",
                message: "Point message"
            },
            {
                title: "title",
                xAxis: "20",
                yAxis: "40",
                message: "Point message"
            },
            {
                title: "title",
                xAxis: "20",
                yAxis: "20",
                message: "Point message"
            },
            {
                title: "title",
                xAxis: "90",
                yAxis: "90",
                message: "Point message"
            }
        ],
        creditUnion: [{

                title: "The Calculator",
                xAxis: "23",
                yAxis: "8",
                message: "The loan calculator is used to calculate loans using the PMT formula, which calculates a value from a loan amount, reoccuring payments, and a constant interest rate. The calculator can be completely configured in the backend of the site with icons, titles, subtitles, APR, loan term max and min, loan amount max and min, and sucess messages "
            },
            {
                title: "Parallax",
                xAxis: "6",
                yAxis: "30",
                message: "The Credit Union framework uses parallax on the majority of its images."
            },
            {
                title: "Component based",
                xAxis: "6",
                yAxis: "50.5",
                message: "Everything is built as a component, meaning it is reusable in the backend of the sites. All you need to do is simply pick a component, and fill in the relevent information such as text, icons, and button links. "
            },
            {
                title: "Clean, balanced, layout.",
                xAxis: "6",
                yAxis: "68.5",
                message: "The layout for the credit unions are clear and concise. A professional apearance with a bit of style, it is clean and understated."
            },
        ],
        dpdLocator: [
            {
                active: true,
                title: "List View and Map view",
                xAxis: "95.5",
                yAxis: "6",
                message: "The locator has both a list view and a map view. The list view enables a more detailed breakdown of the close locations, while the map view enables a broader search."
            },
            {
                title: "Filtering",
                xAxis: "21",
                yAxis: "8",
                message: "DPD needed to be able to filter their locations by a number of criteria. Opening times, opening days, location types, location accessability and services, "
            },
            {
                title: "Location detailing",
                xAxis: "48",
                yAxis: "69",
                message: "All locations come with information layouts that can be used within search and filter terms"
            },
            {
                title: "location Markers",
                xAxis: "26.5",
                yAxis: "21.5",
                message: "Customisable locations markers change depending on the location type."
            }
        ],
        merlynLocator: [{
                title: "Clusters",
                xAxis: "56",
                yAxis: "35.5",
                message: "When there are more than one location in the viewable area, locations cluster together using the Marker Clusterer API"
            },
            {
                title: "Clean muted layout",
                xAxis: "20",
                yAxis: "6.5",
                message: "The Meryln locator needed a new layout. The muted colors pallete was modern, yet classy, further afirming the brands identity as a high end retailer. "
            },
            {
                title: "Current location point",
                xAxis: "69",
                yAxis: "80",
                message: "The current location point is customised to follow the color scheme of the Merlyn locator"
            },
            {
                title: "Location Changing",
                xAxis: "20",
                yAxis: "23",
                message: "The Merlyn locator automatically detects your GPS location after confirmimng with your browser, but this locators filters worked based off distance. Therefore we needed a way to override the GPS location. This was done with a street address search from google and resetting the location with the new user defined co-ord's."
            },

        ],
        digitalHub: [
            {
                active: true,
                title: "feature video",
                xAxis: "5",
                yAxis: "5",
                message: "The Digital Hub has a skilled, engaged userbase so keeping up with the latest web trends was important. The header uses a background video to set the tone of a productive, innovitave website."
            },
            {
                title: "Parallax",
                xAxis: "16",
                yAxis: "18",
                message: "The Digital Hub website uses parallax. When scrolling, the elements of the page scroll along with it. "
            },
            {
                title: "Masonary Grid",
                xAxis: "6.5",
                yAxis: "47",
                message: "A bespoke masonary grid, the grid allows for different categories to be displayed depending on a series of different criteria all defined by the Digital Hub in their backend. It allows them to feature jobs, news, events, and social media posts."
            },
            {
                title: "Members area",
                xAxis: "92",
                yAxis: "1.5",
                message: "The members area is what I was responsible for developing. Only acessable by members of the digital hub community, so unfortunatly can't be shown to you but trust me it was nice :)."
            },
        ],
        wellman: [
            // {
            //     active: true,
            //     title: "feature video",
            //     xAxis: "5",
            //     yAxis: "5",
            //     message: "The Digital Hub has a skilled, engaged userbase so keeping up with the latest web trends was important. The header uses a background video to set the tone of a productive, innovitave website."
            // },
            
        ]
    };


    //loop page for elements
    document.querySelectorAll('.component-map-banner').forEach(function(elem,index){

        //get mapping data from section
        var source = elem.getAttribute('map-data');

        // get object and pass to map function
        mapPointsToImage(mapPoints[source], elem, source);

    });

}


function scrollFooter(scrollY, heightFooter)
{

  if(!jQuery('header').hasClass('reg-header')){
    if(scrollY >= heightFooter)
    {
        jQuery('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        jQuery('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
  }
}

jQuery(window).on('resize', function(){
    var windowHeight        = jQuery(window).height(),
        footerHeight        = jQuery('footer').height(),
        heightDocument      = (windowHeight) + (jQuery('.content').height()) + (jQuery('footer').height()) - 20;


    jQuery('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    if(!jQuery('header').hasClass('reg-header')){
      jQuery('header').css({
          'height' : windowHeight + 'px',
          'line-height' : windowHeight + 'px'
      });
    }

    jQuery('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });
});

jQuery(document).ready(function(){
    var windowHeight        = jQuery(window).height(),
        footerHeight        = jQuery('footer').height(),
        heightDocument      = (windowHeight) + (jQuery('.content').height()) + (jQuery('footer').height()) - 20;


    jQuery('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });


    if(!jQuery('header').hasClass('reg-header')){
      jQuery('header').css({
          'height' : windowHeight + 'px',
          'line-height' : windowHeight + 'px'
      });
    }

    jQuery('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
      if(!jQuery('header').hasClass('reg-header')){
      window.onscroll = function(){
          var scroll = window.scrollY;

          jQuery('#scroll-animate-main').css({
              'top' : '-' + scroll + 'px'
          });

          if(!jQuery('header').hasClass('reg-header')){
          jQuery('header').css({
              'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
          });
          }


          scrollFooter(scroll, footerHeight);
      }
    }
});

function equalHeight(container)
{
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [],
        $el,
        topPosition = 0;

    jQuery(container).each(function()
    {
        $el = jQuery(this);
        jQuery($el).height('auto');
        topPosition = $el.position().top;
        var currentDiv = 0;

        if (currentRowStart !== topPosition)
        {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++)
            {
                rowDivs[currentDiv].height(currentTallest);
            }

            rowDivs.length = 0; // empty the array
            currentRowStart = topPosition;
            currentTallest = $el.height();
            rowDivs.push($el);
        }

        else
        {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }

        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++)
        {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}


equalHeight('.row-equal-watch .col-equal');

 jQuery(window).resize(function()
 {
     equalHeight('.row-equal-watch .col-equal');
 });



// Color checker


function checkForMatchingColors(element, colorType, changeToColor, firstColor){
    function convertHex(hex,opacity){
      hex = hex.replace('#','');
      r = parseInt(hex.substring(0,2), 16);
      g = parseInt(hex.substring(2,4), 16);
      b = parseInt(hex.substring(4,6), 16);

      result = 'rgb('+r+', ' +g+', '+b+')';

      return result;
    }
    var element = document.querySelector(element);
    var initialColor = convertHex(firstColor);
    var color = convertHex(changeToColor);
    var elementColor =  window.getComputedStyle(element).getPropertyValue(colorType);
    var rect = element.getBoundingClientRect();
    var backgroundElement = document.elementFromPoint((rect.left - 1), (rect.top - 1) );
    var bgElemColor = window.getComputedStyle(backgroundElement).getPropertyValue("background-color");
    if(bgElemColor == "rgba(0, 0, 0, 0)"){
      var bgElemColor = window.getComputedStyle(backgroundElement).getPropertyValue("color");
    }

    if(bgElemColor == elementColor){
     if(elementColor == color){
       console.log("to white");
       element.style.color = initialColor;
     }else{
       console.log("to orange");
       element.style.color = color;
     }
    }
}

// window.onscroll = function(){
//    console.log('lvpokd');
//    checkForMatchingColors('.track-colors', "color", "" , "#ffffff");
//  }

jQuery(document).ready(function(){
	jQuery('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){

    jQuery('nav').fadeToggle();
		jQuery(this).toggleClass('open');
    jQuery('header');
    if(!jQuery('header').hasClass('reg-header')){
      if(jQuery('header').hasClass('initialised')){
        jQuery('body').css('overflow', 'auto');
        jQuery('header').css('zIndex', "-1");
        jQuery('header').removeClass('initialised');
      }else{
        jQuery('body').css('overflow', 'auto');
        jQuery('body').css('overflow', 'hidden');
        jQuery('header').css('zIndex', "2");
        jQuery('header').addClass('initialised');
      }
    }
	});
});




// loop through the info block element
