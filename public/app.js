angular.module("chat", [])
    .service("socketService", function() {
        var socket = io()
        this.getSocket = () => socket;
    })
    .controller("chatCtrl", function($scope, socketService) {
        const socket = socketService.getSocket();
        $scope.users = []
        $scope.messages = []

        socket.on("initialData", function(data) {
           $scope.users = data.users
           $scope.messages = data.messages
        })
        socket.on("newUser", function(data) {
            $scope.users.push(data)
            $scope.$apply()
        })

        socket.on("newMessage", function(data) {
           $scope.messages.push(data)
           $scope.$apply()
        })

        $scope.createUsername = function(name) {
           $scope.username = name
           socket.emit("newUser", name)
        }
        $scope.sendMessage = function(message) {
            socket.emit("newMessage", {message, username: $scope.username})
        }
        
    })