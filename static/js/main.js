$(document).ready(function(){
	$('body').on('click', '.catlink', function(){
		localStorage.currCat = JSON.stringify($(this).attr("data-catID"));
	});
});