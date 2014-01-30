
$(function	()	{

	$('aside').addClass('skin-1');
	$('#top-nav').addClass('skin-1');
	
    //scroll to top of the page
	$("#scroll-to-top").click(function()	{
		$("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	});
});

$(window).load(function() {
	
	// Fade out the overlay div
	$('#overlay').fadeOut(800);
	
	$('body').removeAttr('class');
	$('body').removeAttr('style');

	//Enable animation
	$('#wrapper').removeAttr('class');
});

$(window).scroll(function(){
		
	 var position = $(window).scrollTop();
	
	 //Display a scroll to top button
	 if(position >= 200)	{
		$('#scroll-to-top').attr('style','bottom:8px;');	
	 }
	 else	{
		$('#scroll-to-top').removeAttr('style');
	 }
});
