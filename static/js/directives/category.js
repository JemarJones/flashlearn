app.directive('category', function(){
	return {
		restrict: 'E',
		scope: {
			info: '=',
			catClicked: '='
		},
		templateUrl: './js/directives/category.html',
		link: function(scope, element, attrs){
			element.find('.cat').on('click',function(){
				var mySubCat = $(this).next('.subcat');
				var thisCat = $(this);
				if (!scope.catClicked){
					$('.cat').fadeOut(600,function(){
						$('#container').css({"text-align":"center"});
						thisCat.fadeIn(600);
						mySubCat.slideDown(600);
					});
				}else{
					mySubCat.slideUp(600);
					thisCat.fadeOut(600, function(){
						$('#container').css({"text-align":"left"});
						$('.cat').fadeIn(600);
					});
				}
				scope.catClicked = !scope.catClicked;
			});
		}
	};
});