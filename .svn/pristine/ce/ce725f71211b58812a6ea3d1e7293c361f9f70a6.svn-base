const app = getApp();

Page({
  data: {
    list:[
      {
        name:'人员查询',
        path:'employeeList',
        icon:'icon-renyuanxinxi'
      },
      {
        name:'项目人员查询',
        path:'projectList',
        icon:'icon-xiangmubu'
      },
      {
        name:'减员查询',
        path:'dimissionList',
        icon:'icon-lizhi'
      }
    ]
  },
  onShow: function (options) {
    const token = wx.getStorageSync('token');

    if(!token){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  dump(e){
    const {mode,path} = e.currentTarget.dataset;

    app.globalData.mode = mode;

    wx.navigateTo({
      url: `/pages/${path}/${path}`,
    })
  },
  onShareAppMessage(msg){
    return {
      title: '首页',
      path: '/pages/index/index',
    }
  },
  onShareTimeline(obj){
    return {
      title: '三处人力资源系统',
      path: '/pages/index/index',
    }
  }
})
