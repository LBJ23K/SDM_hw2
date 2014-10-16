function indexCtrl($scope, $http) {
	$scope.issue = [];
	$scope.issue_close = [];
	$scope.issue_content = "";
	$scope.author = "";
	$scope.comment_content = [];
	$scope.closed = 0;
	$scope.init = function() {
		$http({
			method: 'GET',
			url: '/api/issue',

		}).
		success(function(data) {
			$scope.author = data[0].username;
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				data[i].fromNow = moment(data[i].createAt).startOf('minute').fromNow();
				data[i].createAt = moment(data[i].createAt).format("YYYY/MM/D H:mm:ss ");
				// if (data[i].close == 1) $scope.issue_close.push(data[i]);
				// else $scope.issue.push(data[i]);
			}
			$scope.issue = data;
			// console.log(data);
		}).
		error(function(data) {
			console.log('error');

		});
	}
	$scope.post = function() {
		// var content = $scope.newsfeed_content;
		var content = {};
		var date = new Date();
		content.content = $scope.issue_content;
		content.modifyAt = date;
		// content.fromNow = moment(date).startOf('minute').fromNow();
		$http({
			method: "POST",
			url: "/api/issue",
			data: {
				content: content
			},
		}).
		success(function(data) {
			if (data == 'success') {
				content.fromNow = moment(date).startOf('minute').fromNow();
				content.createAt = moment(date).format("YYYY/MM/D H:mm:ss ")
				content.username = $scope.author;
				$scope.issue.unshift(content);
				$scope.issue_content = "";
			} else {
				console.log('post error');
			}
		}).
		error(function(data) {
			console.log('post error');
		})
	}
	$scope.comment = function(index) {
		var comment_item = {};
		var date = new Date();
		comment_item.author = $scope.issue[index].author;
		comment_item.issue_id = $scope.issue[index].id;
		comment_item.content = $scope.comment_content[index];
		comment_item.modifyAt = date;


		$http({
			method: "POST",
			url: "/api/issue/comment",
			data: {
				comment: comment_item
			},
		}).
		success(function(data) {
			if (data == 'success') {
				$scope.issue[index].comment.push(comment_item);
				$scope.comment_content[index] = "";
			} else {
				console.log('post error');
			}
		}).
		error(function(data) {
			console.log('post error');
		})
	}
	$scope.closeIssue = function(index) {

		$http({
			method: 'PUT',
			url: '/api/issue/' + $scope.issue[index].id,
		}).
		success(function(data) {
			$scope.issue_close.unshift($scope.issue[index]);
			$scope.issue.splice(index, 0);
		}).
		error(function(data) {
			console.log('error');

		});

	}
}
indexCtrl.$inject = ['$scope', '$http'];