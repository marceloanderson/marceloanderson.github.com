"use strict";function generalViewModel(){var a=this;a.userName=ko.observable(""),a.resultUsersData=ko.observable(),a.chosenReposData=ko.observable(),a.chosenUserData=ko.observable(),a.repoItemsData=ko.observableArray([]),ko.computed(function(){""!=a.userName()&&a.goToSearch(a.userName())}),a.goToSearch=function(e){a.chosenReposData(null),a.chosenUserData(null),a.repoItemsData([]);var o=e,s=$("#username");$.ajax({url:"https://api.github.com/search/users?q="+o,type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",beforeSend:function(e){s.attr("disabled","disabled")},success:function(e){a.resultUsersData(e)},error:function(){console.log("erro")}}).done(function(){s.removeAttr("disabled")})},a.goToRepos=function(o){a.resultUsersData(null),a.chosenUserData(null),$.ajax({url:"https://api.github.com/users/"+o.login,type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){a.chosenReposData(e),$.ajax({url:"https://api.github.com/users/"+o.login+"/repos",type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){a.repoItemsData(e)},error:function(){console.log("erro ajax repos")}})},error:function(){console.log("erro")}})},a.goToUser=function(e){a.resultUsersData(null),a.chosenReposData(null),a.repoItemsData([]),$.ajax({url:"https://api.github.com/users/"+e.login,type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){a.chosenUserData(e)},error:function(){console.log("erro")}})}}$(function(){ko.applyBindings(new generalViewModel)});