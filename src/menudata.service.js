(function() {
	'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService)
	.constant('API_BASE_PATH', 'https://davids-restaurant.herokuapp.com');

	MenuDataService.$inject = ['$http', 'API_BASE_PATH'];
	function MenuDataService($http, API_BASE_PATH) {
		var service = this;
		var allCategoriesPromise;
		var getItemsForCategoryPromise = {};

		service.getAllCategories = function() {
			if (!allCategoriesPromise) {
				console.log('Cached categories not found.  Fetching now...');
				allCategoriesPromise = $http({
					method: 'GET',
					url: API_BASE_PATH + '/categories.json'
				}).then(function (result) {
					return result.data;
				});
			} else {
				console.log('Using cached categories.');
			}
			return allCategoriesPromise;
		};

		service.getItemsForCategory = function (categoryShortName) {
			if (!getItemsForCategoryPromise[categoryShortName]) {
				console.log('Cached items not found for ' + categoryShortName + '. Fetching now...');
				getItemsForCategoryPromise[categoryShortName] = $http({
					method: 'GET',
					url: API_BASE_PATH + '/menu_items.json',
					params: {
						category: categoryShortName
					}
				}).then(function (result) {
					return result.data.menu_items;
				});
			} else {
				console.log('Using cached items for ' + categoryShortName);
			}
			return getItemsForCategoryPromise[categoryShortName];
		};
	return service;
	}
})();