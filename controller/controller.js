(function(){


  angular.module('app', [])
  .controller('GithubController', ['$http', function($http){
    this.OneRepoData;
    this.repoData;
    this.userData;
    this.starred;
    this.branches;
    this.branchContents;
    this.displayBranchFiles;
    this.array;

    this.getRepos = function(){
      $http.get('https://api.github.com/users/nienowt/repos')
      .then((res) => {
        this.repoData = res.data;
        console.log(res)
      })
    }
    this.getUser = function(){
      $http.get('https://api.github.com/users/nienowt')
      .then((res) => {
        console.log(res.data)
        console.log(res)
        this.userData = res.data;
        this.getStarred();
      })
    }
    this.getStarred = function(){
      $http.get('https://api.github.com/users/nienowt/starred')
      .then((res) => {
        console.log(res)
        this.starred = res.data;
      })
    }
    this.getRepo = function(repoUrl){
      $http.get(repoUrl)
      .then((res) => {
        this.oneRepoData = res.data;
        console.log(res.data);
      })
    }
    this.getBranches = function(branchesUrl){
      $http.get(branchesUrl.split('{')[0])
      .then((res)=>{
        this.branches = res.data;
        console.log(res)
      });
    }

    this.getBranchContents = function(sha) {
      $http.get('https://api.github.com/repos/nienowt/' + sha + '/contents')
      .then((res) =>{
        console.log(res)
        this.branchContents = res.data;
      })
    }
    this.getContents = function(url){
      $http.get(url)
      .then((res) => {
        console.log(res.data)
        if (res.data.tree){
          this.array = true;
          return this.displayBranchFiles = res.data.tree;
        } else {
          this.array = false;
          return this.displayBranchFiles = res.data;  ///if res.data.tree -- = res.data.tree    else = res.data.content(unencoded)
        }
      })
    }
  }])
})()
