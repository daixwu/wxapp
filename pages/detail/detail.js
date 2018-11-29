//logs.js
const WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
const api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js');

Page({
  data: {
    post: {},
  },
  onLoad: function (options) {
    console.log('options: ', options);
    let blogId = options.blogId;

    this.getData(blogId);
  },

  /**
   * 获取文章数据
   */
  getData: function(blogId) {
    let that = this;
    var query = {
      blogId: blogId
    }
    var getPostsRequest = wxRequest.getRequest(api.getBlogById(query));
    getPostsRequest.then(res => {
      const post = res.data.posts[0];
      console.log('post: ', post);
      var time = util.formatTime(post.created_at);
      post.created_at = time;

      this.setData({
        post: post
      });

      WxParse.wxParse('article', 'html', post.html, that, 5);
      
      //最近浏览
      that.operatePostsRecent(post);
    });
  },

  /**
   * 处理最近浏览
   */
  operatePostsRecent: function(post) {
    var postsRecent = wx.getStorageSync('posts_Recent');
    var content = {};
    content.imageUrl = post.feature_image;
    content.title = post.title;
    content.time = util.formatTime(new Date());
    if (postsRecent) {
      postsRecent[post.id] = content;
      if (Object.getOwnPropertyNames(postsRecent).length > 30) {
        for (var item in postsRecent) {
          delete postsRecent[item];
          break;
        }
      }
      wx.setStorageSync('posts_Recent', postsRecent);
    } else {
      postsRecent = {};
      postsRecent[post.id] = content;
      wx.setStorageSync('posts_Recent', postsRecent);
    }
  },
})