angular.module('app', []).controller('demo',
		[ '$scope', '$http', function(scope, http) {
			console.log('inside controller:demo');
			scope.get = function() {
				http({
					method : 'GET',
					url : './getList',
					headers : {
						username : 'raghava',
						password : 'raghava'
					},
					timeout : 200
				}).then(function(response) {
					console.log(response);
				});
			};
		} ]);