const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js');
const app = getApp()

Page({
  data: {
    posts: [],
    page: 0,
    loading: true,
    nomore: false
  },

  onLoad: function () {

    this.getData();
  },

  /**
   * 下拉
   */
  lower: function () {
    let that = this;
    if (!that.data.nomore) {
      that.getData();
    }
  },

   /**
   * 点击文章明细
   */
  bindItemTap: function (e) {
    let blogId = e.currentTarget.id;
    console.log('blogId: ', blogId);
    wx.navigateTo({
      url: '../detail/detail?blogId=' + blogId
    })
  },
 
  /**
   * 获取列表信息
   */
  getData: function () {
    let that = this;
    let page = this.data.page;
    
    var query={
      include: 'tags',
      filter: 'featured:false',
      limit: 8,
      page: page + 1
    }
    var getPostsRequest = wxRequest.getRequest(api.getBlogList(query));
    getPostsRequest.then(res=>{
      console.log('res: ', res);

      if (res.data.meta.pagination.next == null) {
        that.setData({
          nomore: true
        });
      }

      that.setData({
        page: res.data.meta.pagination.page,
        loading: false
      });

      const posts = res.data.posts;
      
      var postIds = [];
      
      posts.forEach(function (v) { postIds.push(v.id); });

      for (var post of posts) {
        var time = util.formatTime(post.created_at, '-');
        post.created_at = time;
      }
      

      this.setData({
        posts: this.data.posts.concat(posts),
      });
      
    })
  }
})
