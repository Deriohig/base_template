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
}, 6000);
setTimeout(function() {
    triggerSlowLoad("You have potato Internet...");
}, 12000);

window.onload = function() {
    loader.style.display = "none";
    isLoading = false;

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
setTimeout(render, 500);

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

const pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

const elements = document.querySelectorAll(".nav-list li a");


elements.forEach(function(elem, index) {
    if (elem.href.substr(elem.href.lastIndexOf("/") + 1) == pgurl || elem.href == ''){
        elem.classList.add("active");
    }
})


function mapPointsToImage(points, element){
    points.map(function(point, index){
        // create ugly but fast html element with values
        let flip= "";

        if(point.xAxis > 55){
            flip = "flip-side";
        }

        let mapItem =
                        "<a class='location' href='#' data-attr='location-point-" + index + "' data-x='"+ point.xAxis + "%' data-y='"+ point.yAxis +"%' style='left: " + point.xAxis + "%; top:" + point.yAxis + "%' ></a> " +
                        "<div class='info-block col-lg-4 col-md-4 " + flip + "' data-attr='location-point-" +  index + "' > "+
                        " <div class='close-btn'><i class='fa fa-close'></i></div> <div class='text-area'> <h4> " + point.title + " </h4> <p class='p-14 bold text-brand-primary'>" + point.message + "</p></div></div>";
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
                title: "title",
                xAxis: "80",
                yAxis: "80",
                message: "I grew up a screw up, got introdued to the game - got an ounce. I blew up. Fat stacks overnight, young brother biggie smalls gonna be the next Frank White."
            },
            {
                title: "title",
                xAxis: "50",
                yAxis: "50",
                message: "Point message"
            },
            {
                title: "title",
                xAxis: "10",
                yAxis: "10",
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
            },
        ]
    };


    //loop page for elements
    document.querySelectorAll('.component-map-banner').forEach(function(elem,index){

        //get mapping data from section
        var source = elem.getAttribute('map-data');

        // get object and pass to map function
        mapPointsToImage(mapPoints[source], elem);

    });

}


function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

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

jQuery(window).on('resize', function(){
    var windowHeight        = jQuery(window).height(),
        footerHeight        = jQuery('footer').height(),
        heightDocument      = (windowHeight) + (jQuery('.content').height()) + (jQuery('footer').height()) - 20;


    jQuery('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });


    jQuery('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

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


    jQuery('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    jQuery('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        jQuery('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });

        jQuery('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});



// loop through the info block element
