const { login } = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      account:'',
      password:''
  },
  onLoad: function (options) {
    const isBack = options.back;

    // 是否是token过期，自动跳转到登录页
    if(isBack){
      wx.showToast({
        title: '登录已过期，请重新登录',
        icon:'none'
      })
    }
    
    this.setData({
      isBack
    })
  },
  async login(){
    wx.showLoading({
      title: '登录中',
    })

      const {account,password} = this.data;
      const info = this.verify(account,password);

      // 验证账号密码是否输入
      if(!info.bool){
        wx.showToast({
          title: info.msg,
          icon:'none'
        })
        return false;
      }

      const res = await login(account,password);

      wx.hideLoading({
        success: () => {
          if(!res.data){
            wx.showToast({
              title: res.message,
              icon:'none'
            })
            return false;
          }
        },
      })
     
      // 本地存储用户信息
      wx.setStorageSync('token', res.data.accessToken);
      wx.setStorageSync('userInfo', res.data);

     
      wx.switchTab({
        url: '/pages/index/index',
      })
  },
  verify(account,password){
    // const info = {};
    if(!account.trim().length || !password.trim().length){
      return {
        bool:false,
        msg:'请输入账号和密码'
      }
    }else{
      return {
        bool:true
      }
    }
  }
})