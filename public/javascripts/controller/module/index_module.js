angular.module('index_ejs_module', [])
	.directive('active', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					$('.skel-layers-ignoreHref.active').removeClass('active');
					$(element).addClass("active");
				})
			}
		}
	})
	.directive('tooltip', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('mouseover', function() {
					$(element).tooltip('show');
				})
			}
		}
	})
	.directive('closefilter', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					$('.filter.active').removeClass('active');
					$(element).addClass('active');
					if (scope.closed == 1) scope.closed = 0;
					else scope.closed = 1;
					scope.$apply();
				})
			}
		}
	})