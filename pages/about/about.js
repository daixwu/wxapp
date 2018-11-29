//mine.js

const app = getApp()

Page({
  data: {
    email:'daixwu@gmail.com',
    wechat:'Adaixwu',
    github:'https://github.com/daixwu'
  },

  copyDataTap:function(e){
    var data = e.target.dataset.index
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) 
          }
        })
      }
    })
  },

  onLoad: function () {
    let that = this;
  },

})
