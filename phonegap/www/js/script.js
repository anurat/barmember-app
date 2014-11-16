
	$(document).bind("mobileinit", function() {
			  $.support.touchOverflow = true;
			  $.support.cors = true;
			   $.mobile.defaultTransition = 'none';
			  $.mobile.touchOverflowEnabled = true;
			  $.mobile.toolbar.prototype.options.addBackBtn = true;
			  $.mobile.allowCrossDomainPages = true;
			  $.mobile.page.prototype.options.domCache = true;
			  
		
	});

	
	nav = '<div data-role="panel" id="navpanel" class="header-menu" data-display="reveal"  data-dismissible="false"  data-position="left" data-dismissible="false" data-position-fixed="true"  >'+
			 '<div data-role="controlgroup" data-corners="false">'+
			 '<ul>'+
			'<li><a  href="./customer_page.html" rel="external" >สมาชิก</a></li>'+
			 '<li><a  href="./message_page.html"  rel="external">ข้อความ</a></li>'+
			 '<li><a  href="./package_paget.html" rel="external" >เมมเบอร์</a></li>'+
			 '<li><a  href="./drink_deposite_page.html" rel="external" >ฝากเหล้า</a></li>'+
			 '<ul>'+
			 '</div>'+
		     '</div>';
			 
	$(document).one('pagebeforecreate', function () {
		$.mobile.pageContainer.prepend(nav);
		$("#navpanel").panel().enhanceWithin();
		
	
	});
	 var Global_restuarant = "1";
	 var Global_url = "connectiv.ddns.net:8080";
	 var Global_customer_id ;
	//$( "#navPanel" ).panel( "open" , optionsHash );
	  /*
	   var width = $(window).width();
	  
  if(width > 768){
		 alert(width);
        $("#navpanel").panel("open"); /* nav-panel is the id of the panel div
  }
  */
  
var jqmReady = $.Deferred();
var pgReady = $.Deferred();
var app = {
//Callback for when the app is ready
callback: null,
// Application Constructor
initialize: function(callback) {
this.callback = callback;
var browser = document.URL.match(/^https?:/);
if(browser) {
console.log("Is web.");
//In case of web we ignore PG but resolve the Deferred Object to trigger initialization
pgReady.resolve();
}
else {
console.log("Is not web.");
this.bindEvents();
}
},
bindEvents: function() {
document.addEventListener('deviceready', this.onDeviceReady, false);
},
onDeviceReady: function() {
// The scope of 'this' is the event, hence we need to use app.
app.receivedEvent('deviceready');
},
receivedEvent: function(event) {
switch(event) {
case 'deviceready':
pgReady.resolve();
break;
}
}
};

/**
* General initialization.
*/
$.when(jqmReady, pgReady).then(function() {
//Initialization code here
if(app.callback) {
app.callback();
}
console.log("Frameworks ready.");
});