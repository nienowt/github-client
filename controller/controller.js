(function(){


  angular.module('app', [])
  .controller('TabController', function() {
    this.tab = 'repos';
    this.subTab = 'branches';
    this.setTab = function(tab){
      this.tab = tab;
    }
    this.setSubTab = function(tab){
      this.subTab = tab;
    }
    this.activeTab = function(tab){
      return this.tab == tab;
    }
    this.activeSubTab = function(tab){
      return this.subTab == tab;
    }
  })
  .controller('GithubController', ['$http', function($http){
    this.OneRepoData;
    this.repoData;
    this.userData;
    this.starred;
    this.branches;
    this.branchContents;
    this.displayBranchFolders;
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
        this.currentBranch = res.data[0].url.split('=')[1];
        this.branchContents = res.data;
      })
    }
    this.getContents = function(url){
      $http.get(url)
      .then((res) => {
        console.log(res.data)
        if (res.data.tree){
          this.array = true;
          return this.displayBranchFolders = res.data.tree;
        } else {
          this.array = false;
          var unencoded = atob(res.data.content);
          console.log(unencoded)
          return this.displayBranchFiles = unencoded; 
        }
      })
    }
  }])
})()
