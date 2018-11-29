//mine.js

const app = getApp()

Page({
  data: {
    posts: [],
    nodata: false,
  },
  showRecent: function() {
    console.log("最近浏览")
    // wx.navigateTo({
    //   url: '../collected/collected?gotoType=recent'
    // })
  },
  onLoad: function () {
    let that = this;
    this.getData();
  },

   //事件处理函数
   bindItemTap: function (e) {
    let blogId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?blogId=' + blogId
    })
  },

  getData: function () {
    let that = this;
    var postsRecent = wx.getStorageSync('posts_Recent');
    if (postsRecent) {
      var posts = [];
      if (Object.getOwnPropertyNames(postsRecent).length > 0) {
        for (var item in postsRecent) {
          var post = {};
          post.id = item;
          post.title = postsRecent[item]['title'];
          post.imageUrl = postsRecent[item]['imageUrl'];
          post.created_at = postsRecent[item]['time'];
          posts.push(post);
        }
        that.setData({
          posts: posts.reverse(),
          nodata: false
        })
      }
      else {
        that.setData({
          nodata: true
        })
      }
    }
    else {
      that.setData({
        nodata: true
      })
    }
  }

})
