

//
import font from './assets/scss/common/_font.scss';
import styles from './assets/scss/main.scss';

import moment from 'moment';

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');

var loader = document.getElementsByClassName("loader-model")[0];

loader.style.display = "block";

window.onload = function() {
        loader.style.display = "none";
};

// Animation text
var prefix = 'Yo, Im Deri and I Love <br>';
var skills = [
    'JavaScript',
    'the sun',
    'HTML & CSS',
    'Node.js',
    'Design',
    'Living life'
].map(function (s) { return s + "."; });
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
    }
    else {
        $.step = step;
        if ($.prefixP < prefix.length) {
            if ($.prefixP >= 0) {
                $.solid += prefix[$.prefixP];
            }
            $.prefixP++;
        }
        else {
            if ($.direction === 'forward') {
                if ($.skillP < skill.length) {
                    $.solid += skill[$.skillP];
                    $.skillP++;
                }
                else {
                    if ($.delay) {
                        $.delay--;
                    }
                    else {
                        $.direction = 'backward';
                        $.delay = delay;
                    }
                }
            }
            else {
                if ($.skillP > 0) {
                    $.solid = $.solid.slice(0, -1);
                    $.skillP--;
                }
                else {
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

var Doggo ={

    load: function(url, callback){

        var xhr;

       if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
       else {
           var versions = ["MSXML2.XmlHttp.5.0",
                           "MSXML2.XmlHttp.4.0",
                           "MSXML2.XmlHttp.3.0",
                           "MSXML2.XmlHttp.2.0",
                           "Microsoft.XmlHttp"];

            for(var i = 0, len = versions.length; i < len; i++) {
               try {
                   xhr = new ActiveXObject(versions[i]);

                   break;
               }
               catch(e){}
            } // end for
       }


       xhr.onreadystatechange = ensureReadiness;

       function ensureReadiness() {
           if(xhr.readyState < 4) {
               return;
           }

           if(xhr.status !== 200) {
               return;
           }

           // all is well
           if(xhr.readyState === 4) {
               callback(xhr);
           }
       }

       xhr.open('GET', url, true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.setRequestHeader("Authorization","Client-ID 08cbf6378b57d52");
       xhr.send('');

    },
    getDoggoGallery: function(){

        var doggoUrl = "https://api.imgur.com/3/gallery/search?q=" + "{Doggo}";

        var whichDoggo= Math.floor(Math.random()*(60+1));

        Doggo.load(doggoUrl, function(xhr){

            var response = JSON.parse(xhr.response);

            var id = response.data[whichDoggo].id;

            Doggo.getDoggo(id);
        });

    },
    getDoggo:function(ID){

            var doggoUrl = "https://api.imgur.com/3/gallery/" + ID;

            Doggo.load(doggoUrl, function(xhr){

                var response = JSON.parse(xhr.response);
                console.log(response);

                var imgUrl = response.data.images[0].link;
                var imageHolder =  document.getElementsByClassName("doggo")[0];
                imageHolder.setAttribute("src", imgUrl);
            });
    }


};
Doggo.getDoggoGallery();
