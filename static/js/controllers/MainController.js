app.controller('MainController',['$scope','catagories', function($scope, catagories){
	catagories.success(function(data){
		for (var cat in data){
			if (data.hasOwnProperty(cat)){
				data[cat].rows = [[]];
				for (var i = 0; i < data[cat].subs.length; i++) {
					var row = data[cat].rows[data[cat].rows.length - 1];
					if (row.length < 2){
						row[row.length] = data[cat].subs[i];
					}else{
						data[cat].rows[data[cat].rows.length] = [data[cat].subs[i]];
					}
				}
				delete data[cat].subs;
			}
		}
		$scope.catagories = data;
		$scope.catClicked = false;
	});
}]);