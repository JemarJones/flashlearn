app.factory('catagories',['$http', function($http){
	return $http.get('./catagories')
		.success(function(data){
			return data;
		})
		.error(function(err){
			return err;
		});
}]);