// pages/index/index.js\
const baseUrl = require('../../config.js').baseUrl 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.request({
          url: baseUrl + '/Api/Question/getQuestionList', 
          data: {
              token: 'b83934df8c5a4a4c500662bc88c44768goyIrK-10GezuYPdrtGrzMW4nqF-n6KXgXOBzZ2petOYpYmZxajRpr64e5mut43cr7WdroKvdN-Cnmee'
          },
          success: res => {
              this.setData({
                  list: res.data.data.content
              })

          }
      })
  
  },
  startExam(e){
      wx.navigateTo({
          url: `/pages/exam/exam?id=${e.currentTarget.dataset.id}`
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})