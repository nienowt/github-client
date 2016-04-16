(function(){


  angular.module('app', [])
  .controller('TabController', function() {
    this.tabs = {
      tab: 'repos',
      subTab: 'branches',
      pathTab: ''
    }
    // this.tab = 'repos';
    // this.subTab = 'branches';
    // this.pathTab;

    this.set = function(tab, level){
      this.tabs[level] = tab;
    }

    this.active = function(tab, level){
      return this.tabs[level] == tab;
    }

    // this.setTab = function(tab){
    //   this.tab = tab;
    // }
    // this.setSubTab = function(tab){
    //   this.subTab = tab;
    // }
    // this.activeTab = function(tab){
    //   return this.tab == tab;
    // }
    // this.activeSubTab = function(tab){
    //   return this.subTab == tab;
    // }
  })
  .controller('GithubController', ['$http', function($http){
    this.array;
    this.branches;
    this.branchContents;
    this.branchPaths = [];
    this.currentBranch;
    this.displayBranchFolders;
    this.displayBranchFiles;
    this.OneRepoData;
    this.pathData = {};
    this.repoData;
    this.search;
    this.searchResults;
    this.starred;
    this.userData;
    this.showPaths;

    this.findUser = function(user){
      this.searchResults = null;
      $http.get('https://api.github.com/search/users?q=' + user.toLowerCase())
      .then((res) => {
        this.searchResults = res.data.items;
        this.search = '';
        this.userData = null;
        this.repoData = null;
      });
    }

    this.getRepos = function(url){
      $http.get(url || 'https://api.github.com/users/nienowt/repos')
      .then((res) => {
        this.repoData = res.data;
        console.log(res);
        if(this.repoData[0]) this.getUser(this.repoData[0].owner.url);
        // this.userData = this.repoData[0].owner;
      });
    }
    this.getUser = function(user){
      $http.get(user || 'https://api.github.com/users/nienowt')
      .then((res) => {
        console.log(res.data);
        console.log(res);
        this.userData = res.data;
        this.getStarred();
      });
    }
    this.getStarred = function(){
      $http.get('https://api.github.com/users/nienowt/starred')
      .then((res) => {
        console.log(res);
        this.starred = res.data;
      });
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
        console.log(branchesUrl)
        this.branches = res.data;
        console.log(this.branches)
        console.log(res)
      });
    }

    this.getBranchContents = function(branch) {
      this.branchContents = null;
      this.displayBranchFolders = null;
      $http.get(branch.commit.url)
      .then((res) =>{
        this.currentBranch = branch.name;
        $http.get(res.data.commit.tree.url)
        .then((res)=> {
          console.log(res);
          console.log(this.oneRepoData);
          this.branchContents = res.data;
          console.log('commitdata',this.branchContents);
          return this.array = true;
        })
      })
    }

    this.returnPathContents = function(path){
      console.log(this.diplayBranchFolders)
      this.displayBranchFolders = this.pathData[path]
      this.branchPaths = this.branchPaths.slice(0, (this.branchPaths.indexOf(path)) + 1);
    }
    this.reset = function(){
      this.displayBranchFolders = null;
      this.branchPaths = [];
      this. displayBranchFiles = null;
      this.branches = null;
      this.currentBranch = null;
      this.branchContents = null;
    }
    this.getContents = function(content){
      $http.get(content.url)
      .then((res) => {
        this.showPaths = true;
        this.branchPaths.push(content.path);
        console.log(res.data)
        if (res.data.tree){
          this.array = true;
          this.pathData[content.path] = res.data.tree;
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
