const { getEmployeeInfoListBySearch } = require('../../utils/api');

const app = getApp();

Page({
  data: {
    history:[],
    searchKey:'',
    result:[],
    searchTypes:[
      {
        key:1,
        name:'姓名'
      },
      {
        key:2,
        name:'机构'
      },
      {
        key:3,
        name:'岗位'
      },
      {
        key:4,
        name:'专业技术职位'
      },
      {
        key:5,
        name:'二级机构'
      },
      {
        key:6,
        name:'从事工作'
      }
    ],
    searchTypeIndex:0,
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
  },
  onLoad: function (options) {
  },
  onShow(){
    const searchKey = this.data.searchKey;
    this.getHistoryRecords();
    
   searchKey && this.getSearchResult(searchKey);
  },
  // 获取历史搜索记录
  getHistoryRecords(){
    const list = wx.getStorageSync('historySearchRecords');
    if(list){

      this.setData({
        history:list
      })

    }
  }, 
  // 选择搜索的类型
  chooseSearchType(e){
    const index = Number(e.detail.value);

    this.setData({
      searchTypeIndex:index
    })
  },
  searchContentInput(e){
      const {value} = e.detail;

      if(value){
        this.setData({
          searchKey:value
        })
        
        this.getSearchResult(value);
      }else{
        this.setData({
          result:[]
        })
      }
      
     
      
  },
  // 获取搜索结果
  async getSearchResult(value){
    const keyType= this.data.searchTypes[this.data.searchTypeIndex].key;

    const {list:data} = await getEmployeeInfoListBySearch(1,10,value,keyType);

    this.setData({
      result:data
    })
  },
  
  // 进入 员工详情 页面
  intoEmployeeDetail(e){
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/employeeDetail/employeeDetail?id=${id}`
    })
  },
  selectHistory(e){
      const {name} = e.currentTarget.dataset;

      const keyType= this.data.searchTypes[this.data.searchTypeIndex].key;


      wx.navigateTo({
        url: `/pages/employeeList/employeeList?keyword=${name}&keyType=${keyType}`
      })
  },
  search(){
    const searchKey = this.data.searchKey;
    if(!searchKey.trim()){

      return false;
    }
    this.recordSearchValue(searchKey);

    const keyType= this.data.searchTypes[this.data.searchTypeIndex].key;


    wx.navigateTo({
      url: `/pages/employeeList/employeeList?keyword=${searchKey}&keyType=${keyType}`
    })
  },
  // 点击搜索后，页面和本地保存搜索关键字
  recordSearchValue(searchKey){
    const list = this.data.history;

    // 存在重复关键字
    if(list.indexOf(searchKey) !== -1){
      return false;
    }

    // 最多存储20条记录
    if(list.length >= 20){
      list.pop();
      list.unshift(searchKey)
    }else{
      list.unshift(searchKey);

    }

    this.setData({
      history:list
    })
    wx.setStorageSync('historySearchRecords', list)
  },
  // 清空搜索历史
  emptyHistoryRecords(){
    if(!this.data.history.length){
      return false;
    }

    const _self = this;
    wx.showModal({
      content:"确认删除全部历史记录？",
      success(res){
        if(res.confirm){
          wx.removeStorageSync('historySearchRecords');
          _self.setData({
            history:[]
          })
        }
      }
    })
  }
})