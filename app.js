// app.js
App({
  onLaunch(){
    this.setNavbarInfo();
  },
  globalData: {
    userInfo: null,
    host:'https://apihrm.crtg-3.com/api/',
    mode:0, // 0 三处  1 天诚
    navBarHieght:0, // 导航栏高度
    menuButtom:0, // 胶囊距底部间距
    menuRight:0,  // 胶囊右方间距
    menuHeight:0, // 胶囊高度
  },
  setNavbarInfo(){
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;
  }
})
