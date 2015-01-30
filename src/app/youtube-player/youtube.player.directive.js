(function() {
    'use strict';

    angular
        .module('youtube.player')
        .directive('youtubePlayer', youtubePlayer);
    
        /* @ngInject */
        function youtubePlayer ($rootScope, $window) {
            // Usage:
            //  <div youtube-player video-id="vm.video.id" height="vm.height" width="vm.width"></div>
            // Creates:
            //
            var directive = {
                link: link,
                controller: controller,
                restrict: 'A',
                replace: true,
                scope: {
                	videoId: '=',
                	height: '=',
                	width: '=',
                    isPlaylist: '=',
                    index: '='
                }
            };
            var player;

            return directive;

    		function controller ($scope, youtubePlayerApi) {
    			$scope.apiReady = youtubePlayerApi.isReady;

    			$scope.$watch('apiReady()', function(newReady, oldReady){
    				if (newReady !== oldReady && !youtubePlayerApi.created) {
    					youtubePlayerApi.created = true;
    					$scope.create();
    				}
    			});
    		}

            function link(scope, element, attrs) {
            	scope.$watch('videoId', function (newVideoId) {
                    if (player) {
	            		playMedia(newVideoId);
            		}
            	});

                scope.$watch('height', function(newHeight, oldHeight){
                    if (player && newHeight !== oldHeight) {
                        player.setSize(scope.width, scope.height);
                    }
                });
            	scope.create = createPlayer;

                function playMedia(id) {
                    var type = scope.isPlaylist;
                    if (type === 'video') {
                        player.loadVideoById(id);
                        player.playVideo();
                    } else if (type === 'playlist') {
                        player.loadPlaylist({
                            listType: 'playlist',
                            list: id,
                            index: 0,
                            suggestedQuality: 'hd720'
                        });
                    }
                }

            	function createPlayer () {
	                // var playerVars = angular.copy(scope.playerVars);
	                // playerVars.start = playerVars.start || scope.urlStartTime;
	                player = new YT.Player(attrs.id, {
	                    height: scope.height,
	                    width: scope.width,
	                    videoId: scope.videoId,
	                    // playerVars: playerVars,
	                    events: {
	                        onReady: onPlayerReady,
	                        onStateChange: onPlayerStateChange
	                    }
	                });

                    
	                player.id = attrs.id;
	                return player;
	            }

                function onPlayerStateChange (event) {
                    // var state = stateNames[event.data];
                    // if (typeof state !== 'undefined') {
                        // applyBroadcast(eventPrefix + state, scope.player, event);
                    // }
                    // scope.$apply(function () {
                    //     scope.player.currentState = state;
                    // });
                }

                function onPlayerReady (event) {
                    // applyBroadcast(eventPrefix + 'ready', scope.player, event);
                }
            }
        }
})();