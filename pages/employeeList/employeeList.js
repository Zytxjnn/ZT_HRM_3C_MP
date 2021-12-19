const { 
  getDepartmentListRequest,
  getEngagedInWorkListRequest,
  getJobsListRequest,
  getProfessionalList,
  getSecondaryInstitutionsList,
  getEmployeeInfoListBySiftRequest,
} = require('../../utils/api');

const app = getApp();

Page({
  data: {
    isLoading:true,
    isEnd:false,
    currentPage:0,
    pageSize:10,
    list:[],
    total:0,
    keyword:'',
    siftInfo:{
    },
    bottomPopupShow:false,
    rightPopupShow:false,
    siftContentList:[],
    showSiftContentList:[],
    popupActiveIndex:0, // 部门，从事工作，岗位，二级部门，二级机构
    labelWidth:'220rpx',
    labelPos:"end",
    employeeListTopNum:0, // employeeList距离顶部距离
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
  },
  onLoad: function (options) {
    // 初始化linui form已经请求部门、二级机构等信息
    this.init();



    // 获取搜索页面传递来的关键字
    const {keyword,keyType} = options;

    // 如果有搜索关键字则增加关键字搜索
    if(keyword){
      this.setData({
        keyword,
        keyType
      })
    }

    this.getEmployeeList();
  },
  async init(){
    wx.lin.initValidateForm(this);

    // 请求筛选所需要的数据
    const {data:departmentList} = await getDepartmentListRequest();
    const {data:engagedInWorkList} = await getEngagedInWorkListRequest();
    const {data:jobsList} = await getJobsListRequest();
    const {data:professionalInWorkList} = await getProfessionalList();
    const {data:secondaryInstitutionsList} = await getSecondaryInstitutionsList();

    const list = [departmentList,engagedInWorkList,jobsList,professionalInWorkList,secondaryInstitutionsList];

    this.setData({
      siftContentList:list,
      showSiftContentList:list
    });
  },
  // 获取列表
  async getEmployeeList(){
    // 数据是否已加载完
    if(this.data.isEnd){
      wx.showToast({
        title: '数据已加载完毕',
        icon:'none'
      })
      return;
    }

    this.setData({
      isLoading:true
    })

    wx.showLoading({
      title: '加载数据中',
      mask:true
    });

    const _self = this;
    let {currentPage,pageSize,list,keyword,siftInfo,keyType} = this.data;
    const {department,engagedInWork,jobs,professional,secondaryInstitutions} = siftInfo;

    const data = await getEmployeeInfoListBySiftRequest(
      {
        currentPage:currentPage+1,
        pageSize,
        name:siftInfo.name,
        departmentId: department?.id,
        engagedInWorkId: engagedInWork?.id,
        jobsId : jobs?.id,
        professionalId:professional?.id,
        secondaryInstitutionsId: secondaryInstitutions?.id,
        key:keyword,
        keyType
      }
    );


    if(data.list.length){
        _self.setData({
          currentPage:currentPage+1,
          list:list.concat(data.list),
          total:data.total
        })
      }else{  // 加载失败
        _self.setData({
          isEnd:true,
        })
    }

    _self.setData({
      isLoading:false
    })
    wx.hideLoading();

    
    // getEmployeeInfoList(currentPage + 1,pageSize,keyword).then(res => {
    
    //   if(res.list){ // 加载成功
    //     _self.setData({
    //       currentPage:currentPage+1,
    //       list:list.concat(res.list),
    //       total:res.total
    //     })
    //   }else{  // 加载失败
    //     _self.setData({
    //       isEnd:true,
    //     })

    //   }

    //   _self.setData({
    //     isLoading:false
    //   })
    //   wx.hideLoading();
    // })
  },
  // 页面触底，加载数据
  bindscrolltolower(){
    this.getEmployeeList();
  },
  // 进入 员工详情 页面
  intoEmployeeDetail(e){
      const {id} = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/employeeDetail/employeeDetail?id=${id}`
      })
  },
  intoSearchEmployee(){
    wx.redirectTo({
      url: `/pages/search/search`
    })
  },
  headImgLoadError(e){
    const index = Number(e.currentTarget.dataset.index);
    const list = this.data.list;
    list[index].photoFilePath = '../../resouces/imgs/profile_photo_placeholder.png';
    this.setData({
      list
    })
  },
  // 弹出底部筛选框
  openSiftBox(){
    this.setData({
      bottomPopupShow:true
    })
  },
  // 弹出右侧popup
  openRightPopup(e){

    const { index } = e.currentTarget.dataset;

    this.setData({
      rightPopupShow:true,
      popupActiveIndex:index
    })

  },
  handleInputChage(e){
   const value = e.detail.value;
   const siftInfo = this.data.siftInfo;
    siftInfo.name = value;
    this.setData({
      siftInfo
    })
  },
  // 右侧popup搜索框完成
  rightPopupSearchConfirm(e){
    const value = e.detail.value;
    const list = JSON.parse(JSON.stringify(this.data.siftContentList));
    const index = this.data.popupActiveIndex;

    list[index] = list[index].filter(item => {
      return item.name.indexOf(value) !== -1;
    })
    this.setData({
      showSiftContentList:list
    })
  },
  // 右侧popup搜索框清除按钮点击
  rightPopupSearchClear(){
    this.setData({
      showSiftContentList:this.data.siftContentList
    })
  },

  // 右侧popup item单击
  rightPopupItemTap(e){
    const index = e.currentTarget.dataset.index;
    const {popupActiveIndex,siftInfo,showSiftContentList} = this.data;
    const data = showSiftContentList[popupActiveIndex][index];
    let key = '';
    
    switch(popupActiveIndex){
      case 0:
        key = 'department';
      break;
      case 1:
        key = 'engagedInWork';
      break;
      case 2:
        key = 'jobs';
      break;
      case 3:
        key = 'professional';
      break;
      case 4:
        key = 'secondaryInstitutions';
      break;
    }

    siftInfo[key] = data;

    this.setData({
      siftInfo,
      rightPopupShow:false
    })
  },
  // 提交筛选
  async submit(){
    this.setData({
      currentPage:1,
      isLoading:true,

    })

    const {list,total} = await this.getEmployeeInfoListBySift();

    wx.hideLoading();

    this.setData({
      isLoading:false,
      list:list,
      bottomPopupShow:false,
      total:total,
      employeeListTopNum:0,
      keyword:''
    })
  },
  async getEmployeeInfoListBySift(){

      wx.showLoading({
        title: '加载中',
      })

      const {currentPage,pageSize,siftInfo} = this.data;

      const {department,engagedInWork,jobs,professional,secondaryInstitutions} = siftInfo;

      const data = await getEmployeeInfoListBySiftRequest(
        {
          currentPage,
          pageSize,
          name:siftInfo.name,
          departmentId: department?.id,
          engagedInWorkId: engagedInWork?.id,
          jobsId : jobs?.id,
          professionalId:professional?.id,
          secondaryInstitutionsId: secondaryInstitutions?.id
        }
      );
      return data;
  },
  // 重置筛选条件
  resetSiftInfo(){
    this.setData({
      siftInfo:{}
    })
  },
  // 筛选框 员工姓名清除事件
  popupSearchNameClear(){
    const siftInfo = this.data.siftInfo;
    siftInfo.name = '';
    this.setData({
      siftInfo
    })
  }
})