const app = getApp()
Component({
  /**
   * 组件的初始数据
   */
  properties:{
    title:String,
    backPath:String
  },
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    menuRight: app.globalData.menuRight, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight
  },
  methods:{
    handleBack(){
        const path = this.properties.backPath;
        
        if(path === '/pages/index/index'){
            wx.switchTab({
                url: path,
            })
        }else{
            wx.redirectTo({
                url: path,
            })
        }


    }
  }
})

