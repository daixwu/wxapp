//dots.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js');

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
   * 获取列表信息
   */
  getData: function () {
    let that = this;
    let page = this.data.page;
    
    var query={
      include: 'tags',
      filter: 'featured:true',
      limit: 8,
      page: page + 1
    }
    var getPostsRequest = wxRequest.getRequest(api.getBlogList(query));
    getPostsRequest.then(res=>{

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
      console.log('postIds: ', postIds);

      for (var post of posts) {
        var time = util.formatTime(post.created_at, ' / ');
        post.created_at = time;
      }

      this.setData({
        posts: this.data.posts.concat(posts),
      });
      
    })
  }
})