(function(){


  angular.module('app', [])
  .controller('GithubController', ['$http', function($http){
    this.OneRepoData;
    this.repoData;
    this.userData;
    this.starred;
    this.branches;
    this.branchContents;

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
      $http.get('https://api.github.com/repos/nienowt/301_portfolio/branches/' + sha)
      .then((res) =>{
        console.log(res)
        $http.get(res.data.commit.commit.tree.url)  ///probably shouldnt do this
        .then((res) => {
          this.branchContents = res.data.tree;
        })
      })
    }
  }])
})()
