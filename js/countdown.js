

(function ( $ ) {

 	"use strict";
 
    $.fn.countdownTimer = function( options ) {
 
 
        // This is the easiest way to have default options.
        var settings = $.extend({
        	endTime: new Date()
        }, options );
        
        var $this = $(this);
		
		var $seconds = $this.find(".time.seconds");
		var $minutes = $this.find(".time.minutes");
		var $hours = $this.find(".time.hours");
		var $days = $this.find(".time.days");
		
		var seconds = 0;
		var minutes = 0;
		var days = 0;
		var hours = 0;
				    
		var switchCountdownValue = function ($obj, val) {
			// Add leading zero
			var s = val+"";
		    while (s.length < 2) s = "0" + s;

			if(Modernizr.cssanimations) {
				// Fade out previous
				var prev = $obj.find(".value").addClass("fadeOutDown").addClass("animated");
				
				// Add next value
				var next = $("<div class='value'>" + s + "</div>");
				$obj.prepend(next);
				// Fade in next value
				next.addClass("fadeInDown").addClass("animated");
				// Remove from DOM on animation end
				// Fix for Safari (if window is not active, then webkitAnimationEnd doesn't fire, so delete it on timeout)
				var to = setTimeout(function(){ prev.remove() }, 200);
				prev.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					prev.remove();
					clearTimeout(to);
				});
				
			} else {
				// Remove previous value
				var prev = $obj.find(".value").remove();
				// Add next value
				var next = $("<div class='value'>" + s + "</div>");
				$obj.prepend(next);
			}
		}
		
		var timerId = countdown(settings.endTime,
			function(ts) {
				if(seconds != ts.seconds) {
					switchCountdownValue($seconds, ts.seconds);
					seconds = ts.seconds;
				}
				if(minutes != ts.minutes) {
					switchCountdownValue($minutes, ts.minutes);
					minutes = ts.minutes;
				}
				if(hours != ts.hours) {
					switchCountdownValue($hours, ts.hours);
					hours = ts.hours;
				}

				if(days != ts.days) {
					switchCountdownValue($days, ts.days);
					days = ts.days;
				}
		    },
		    countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);


		return this;
 
    };
 
}( jQuery ));


/*
 countdown.js v2.3.4 http://countdownjs.org
 Copyright (c)2006-2012 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var module,countdown=function(r){function v(a,b){var c=a.getTime();a.setUTCMonth(a.getUTCMonth()+b);return Math.round((a.getTime()-c)/864E5)}function t(a){var b=a.getTime(),c=new Date(b);c.setUTCMonth(a.getUTCMonth()+1);return Math.round((c.getTime()-b)/864E5)}function f(a,b){return a+" "+(1===a?p[b]:q[b])}function n(){}function l(a,b,c,g,x,d){0<=a[c]&&(b+=a[c],delete a[c]);b/=x;if(1>=b+1)return 0;if(0<=a[g]){a[g]=+(a[g]+b).toFixed(d);switch(g){case "seconds":if(60!==a.seconds||isNaN(a.minutes))break;
a.minutes++;a.seconds=0;case "minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++;a.minutes=0;case "hours":if(24!==a.hours||isNaN(a.days))break;a.days++;a.hours=0;case "days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++;a.days=0;case "weeks":if(a.weeks!==t(a.refMonth)/7||isNaN(a.months))break;a.months++;a.weeks=0;case "months":if(12!==a.months||isNaN(a.years))break;a.years++;a.months=0;case "years":if(10!==a.years||isNaN(a.decades))break;a.decades++;a.years=0;case "decades":if(10!==a.decades||
isNaN(a.centuries))break;a.centuries++;a.decades=0;case "centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++;a.centuries=0}return 0}return b}function w(a,b,c,g,d,k){a.start=b;a.end=c;a.units=g;a.value=c.getTime()-b.getTime();if(0>a.value){var f=c;c=b;b=f}a.refMonth=new Date(b.getFullYear(),b.getMonth(),15);try{a.millennia=0;a.centuries=0;a.decades=0;a.years=c.getUTCFullYear()-b.getUTCFullYear();a.months=c.getUTCMonth()-b.getUTCMonth();a.weeks=0;a.days=c.getUTCDate()-b.getUTCDate();
a.hours=c.getUTCHours()-b.getUTCHours();a.minutes=c.getUTCMinutes()-b.getUTCMinutes();a.seconds=c.getUTCSeconds()-b.getUTCSeconds();a.milliseconds=c.getUTCMilliseconds()-b.getUTCMilliseconds();var h;0>a.milliseconds?(h=s(-a.milliseconds/1E3),a.seconds-=h,a.milliseconds+=1E3*h):1E3<=a.milliseconds&&(a.seconds+=m(a.milliseconds/1E3),a.milliseconds%=1E3);0>a.seconds?(h=s(-a.seconds/60),a.minutes-=h,a.seconds+=60*h):60<=a.seconds&&(a.minutes+=m(a.seconds/60),a.seconds%=60);0>a.minutes?(h=s(-a.minutes/
60),a.hours-=h,a.minutes+=60*h):60<=a.minutes&&(a.hours+=m(a.minutes/60),a.minutes%=60);0>a.hours?(h=s(-a.hours/24),a.days-=h,a.hours+=24*h):24<=a.hours&&(a.days+=m(a.hours/24),a.hours%=24);for(;0>a.days;)a.months--,a.days+=v(a.refMonth,1);7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7);0>a.months?(h=s(-a.months/12),a.years-=h,a.months+=12*h):12<=a.months&&(a.years+=m(a.months/12),a.months%=12);10<=a.years&&(a.decades+=m(a.years/10),a.years%=10,10<=a.decades&&(a.centuries+=m(a.decades/10),a.decades%=
10,10<=a.centuries&&(a.millennia+=m(a.centuries/10),a.centuries%=10)));b=0;!(g&1024)||b>=d?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&b++;!(g&512)||b>=d?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&b++;!(g&256)||b>=d?(a.years+=10*a.decades,delete a.decades):a.decades&&b++;!(g&128)||b>=d?(a.months+=12*a.years,delete a.years):a.years&&b++;!(g&64)||b>=d?(a.months&&(a.days+=v(a.refMonth,a.months)),delete a.months,7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7)):a.months&&
b++;!(g&32)||b>=d?(a.days+=7*a.weeks,delete a.weeks):a.weeks&&b++;!(g&16)||b>=d?(a.hours+=24*a.days,delete a.days):a.days&&b++;!(g&8)||b>=d?(a.minutes+=60*a.hours,delete a.hours):a.hours&&b++;!(g&4)||b>=d?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&b++;!(g&2)||b>=d?(a.milliseconds+=1E3*a.seconds,delete a.seconds):a.seconds&&b++;if(!(g&1)||b>=d){var e=l(a,0,"milliseconds","seconds",1E3,k);if(e&&(e=l(a,e,"seconds","minutes",60,k))&&(e=l(a,e,"minutes","hours",60,k))&&(e=l(a,e,"hours","days",
24,k))&&(e=l(a,e,"days","weeks",7,k))&&(e=l(a,e,"weeks","months",t(a.refMonth)/7,k))){g=e;var n,p=a.refMonth,q=p.getTime(),r=new Date(q);r.setUTCFullYear(p.getUTCFullYear()+1);n=Math.round((r.getTime()-q)/864E5);if(e=l(a,g,"months","years",n/t(a.refMonth),k))if(e=l(a,e,"years","decades",10,k))if(e=l(a,e,"decades","centuries",10,k))if(e=l(a,e,"centuries","millennia",10,k))throw Error("Fractional unit overflow");}}}finally{delete a.refMonth}return a}function d(a,b,c,d,f){var k;c=+c||222;d=0<d?d:NaN;
f=0<f?20>f?Math.round(f):20:0;"function"===typeof a?(k=a,a=null):a instanceof Date||(a=null!==a&&isFinite(a)?new Date(a):null);"function"===typeof b?(k=b,b=null):b instanceof Date||(b=null!==b&&isFinite(b)?new Date(b):null);if(!a&&!b)return new n;if(!k)return w(new n,a||new Date,b||new Date,c,d,f);var l=c&1?1E3/30:c&2?1E3:c&4?6E4:c&8?36E5:c&16?864E5:6048E5,h,e=function(){k(w(new n,a||new Date,b||new Date,c,d,f),h)};e();return h=setInterval(e,l)}var s=Math.ceil,m=Math.floor,p,q,u;n.prototype.toString=
function(){var a=u(this),b=a.length;if(!b)return"";1<b&&(a[b-1]="and "+a[b-1]);return a.join(", ")};n.prototype.toHTML=function(a){a=a||"span";var b=u(this),c=b.length;if(!c)return"";for(var d=0;d<c;d++)b[d]="\x3c"+a+"\x3e"+b[d]+"\x3c/"+a+"\x3e";--c&&(b[c]="and "+b[c]);return b.join(", ")};u=function(a){var b=[],c=a.millennia;c&&b.push(f(c,10));(c=a.centuries)&&b.push(f(c,9));(c=a.decades)&&b.push(f(c,8));(c=a.years)&&b.push(f(c,7));(c=a.months)&&b.push(f(c,6));(c=a.weeks)&&b.push(f(c,5));(c=a.days)&&
b.push(f(c,4));(c=a.hours)&&b.push(f(c,3));(c=a.minutes)&&b.push(f(c,2));(c=a.seconds)&&b.push(f(c,1));(c=a.milliseconds)&&b.push(f(c,0));return b};d.MILLISECONDS=1;d.SECONDS=2;d.MINUTES=4;d.HOURS=8;d.DAYS=16;d.WEEKS=32;d.MONTHS=64;d.YEARS=128;d.DECADES=256;d.CENTURIES=512;d.MILLENNIA=1024;d.DEFAULTS=222;d.ALL=2047;d.setLabels=function(a,b){a=a||[];a.split&&(a=a.split("|"));b=b||[];b.split&&(b=b.split("|"));for(var c=0;10>=c;c++)p[c]=a[c]||p[c],q[c]=b[c]||q[c]};(d.resetLabels=function(){p="millisecond second minute hour day week month year decade century millennium".split(" ");
q="milliseconds seconds minutes hours days weeks months years decades centuries millennia".split(" ")})();r&&r.exports?r.exports=d:"function"===typeof window.define&&window.define.amd&&window.define("countdown",[],function(){return d});return d}(module);