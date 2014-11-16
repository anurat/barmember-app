var header = $('[data-role=header]').outerHeight();
var panel = $('.ui-panel').height();
var panelheight = panel - header;
$('.ui-panel').css({
    'top': header,
    'min-height': panelheight
});

$(function(){ 
	
	$('.img-logo').click(function() {
	
	
	
	});
	/*
	$('.header-icon').click(function() {
		var html = "<div data-role='controlgroup' data-corners='false'>"+
						"<a href='#' data-role='button'>Business</a>"+
					    "<a href='#' data-role='button'>Numbers</a>"+
						"<a href='#' data-role='button'>Money</a>"+
						"<a href='#' data-role='button'>People</a>"+
					   "</div>";
					   
		if(!$('.header-menu').is(':visible')) {
		
			
			/*
			var html = "<div class='clear-block'></div>"+
					   "<div class='header-menu' >"+
					   "	<ul>"+
					   "	  <li><a href='#'>สมาชิก</a></li>"+
					   "	  <li><a href='#'>ข้อความ</a></li>"+
					   "	  <li><a href='#'>กลุ่มสินค้า</a></li>"+
					   "	  <li><a href='#'>รายการสินค้า</a></li>"+
					   "	  <li><a href='#'>เมมเบอร์</a></li>"+
					   "	</ul>"+
					   "</div>";
			$(html).insertBefore(".ui-content");
			//
		}
		else{
			$('.header-menu').hide();
		}
	});
	*/
});
var pictureSource;   
var destinationType; 

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() 
{
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}


function onPhotoURISuccess(imageURI) 
{

    console.log("IMG URI "+imageURI);
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
	
}

function onPhotoDataSuccess(imageURI) 
{ 
    var imgProfile = document.getElementById('imgProfile');
    imgProfile.src = imageURI;
    if(sessionStorage.isprofileimage==1)
    {
        getLocation();
    }
    movePic(imageURI);
}

function onFail(message) 
{
    alert('Failed because: ' + message);
}

function movePic(file)
{ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

function resolveOnSuccess(entry)
{ 
    var d = new Date();
    var n = d.getTime();
    var newFileName = n + ".jpg";
    var myFolderApp = "MyAppFolder";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) 
    {      
        fileSys.root.getDirectory( myFolderApp,
                {create:true, exclusive: false},
                function(directory) 
                {
                    entry.moveTo(directory, newFileName,  successMove, resOnError);
                },
        resOnError);
    },
    resOnError);
	
}

function successMove(entry) 
{
    sessionStorage.setItem('imagepath', entry.fullPath);
	alert(entry.fullPath);
}

function resOnError(error) 
{
    alert(error.code);
}

function capturePhotoEdit() 
{
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

function getPhoto(source) 
{

    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,  destinationType: destinationType.FILE_URI,sourceType: source });
}

function onFail(message) 
{
    alert('Failed because: ' + message);
}


