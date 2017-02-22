

//
import font from './assets/scss/common/_font.scss';
import styles from './assets/scss/main.scss';

import moment from 'moment';

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');

console.log(window.innerWidth);





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
