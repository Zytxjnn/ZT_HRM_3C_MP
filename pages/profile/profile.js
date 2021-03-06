// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:{}
    },
    onLoad: function () {
      this.getUserInfo();
    },
    getUserInfo(){
      const userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo
      })
    },
    logout(){
      wx.showModal({
        content: '确定退出登录吗',
        success(obj){
          if(obj.confirm){
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('historySearchRecords');
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  })