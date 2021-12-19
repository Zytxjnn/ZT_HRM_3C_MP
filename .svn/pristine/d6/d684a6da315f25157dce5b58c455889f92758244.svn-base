const { 
  getEmployeeBasicInfoRequest,
  getEmployeeTrainingInfoRequest,
  getEmployeeWorkInfoRequest,
  getEmployeeIncentiveInfoRequest,
  getEmployeeTitlesInfoRequest,
  getEmployeeEducationInfoRequest,
  getArchivesListRequest,
  getDimissionEmployeeRequest,
  getFileStreamRequest
} = require('../../utils/api');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    basicInfo:{},
    trainingInfo:{},
    workInfo:[],
    incentiveInfo:{},
    titlesInfo:{},
    educationInfo:[],
    tabs:["基本信息","履历信息",'学历信息',"培训信息","奖惩信息","职称信息","档案附件"],
    tabActiveIndex:0,
    scrollViewTopNum:200,
    archivesList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id,dimission,employeeId } = options;

    // 履历信息
    this.getEmployeeWorkInfo(id);
    // 培训信息
    this.getEmployeeTrainingInfo(id);
    // 奖惩信息
    this.getEmployeeIncentiveInfo(id);
    // 职称信息
    this.getEmployeeTitlesInfo(id);
    // 学历信息
    this.getEmployeeEducationInfo(id);

    // 附件列表
    this.getArchivesList(id);

    const setDataObj = {
      id
    }

    // 是否已离职
    if(dimission){  // 已离职
      setDataObj.dimission = true;
      this.getDimissionEmployee(id);
    }else{
      setDataObj.dimission = false;
      this.getEmployeeBasicInfo(id);
    }

    this.setData(setDataObj)
  },
  // 请求员工基本详情
  async getEmployeeBasicInfo(id){
    wx.showLoading({
      title:'数据加载中'
    });
    const {data} = await getEmployeeBasicInfoRequest(id);

    wx.hideLoading();
    this.setData({
      basicInfo:data,
    })
  },
  async getDimissionEmployee(id){
    wx.showLoading({
      title:'数据加载中'
    });
    const {data} = await getDimissionEmployeeRequest(id);

    wx.hideLoading();

    this.setData({
      basicInfo:data,
    })
  },

  // 请求员工附件列表
  async getArchivesList(id){
    let {data} = await getArchivesListRequest(id);


    data = data.filter(item => {
      const filePath = item.lagerFilePath;
      const index = filePath.lastIndexOf('.')

      const fileType = filePath.slice(index+1,filePath.length);

      // 仅显示可预览的文件（包括图片）
      if(item.isView || item.isImage){
        item.fileType = fileType;
        return true;
      }

      return false;
    })


    this.setData({
      archivesList:data
    })

  },
  // 请求员工履历信息
  async getEmployeeWorkInfo(id){
    const {data} = await getEmployeeWorkInfoRequest(id);
    this.setData({
      workInfo:data[0] ? data : null
    })
  },
  // 请求员工培训信息
  async getEmployeeTrainingInfo(id){
    const {data} = await getEmployeeTrainingInfoRequest(id);

    this.setData({
      trainingInfo:data[0] || null
    })
  },
   // 请求奖惩培训信息
   async getEmployeeIncentiveInfo(id){
    const {data} = await getEmployeeIncentiveInfoRequest(id);
    
    this.setData({
      incentiveInfo:data[0] || null
    })
  },
  // 请求职称信息
  async getEmployeeTitlesInfo(id){
    const {data} = await getEmployeeTitlesInfoRequest(id);

    this.setData({
      titlesInfo:data[0] || null
    })
  },
  // 请求员工学历信息
  async getEmployeeEducationInfo(id){
    const {data} = await getEmployeeEducationInfoRequest(id);

    this.setData({
      educationInfo:data
    })
  },
  // 预览文件
  async handleFilePreview(e){
    const {type,path,isimage,isview,name} = e.currentTarget.dataset;
    
    if(!isview && !isimage){
      wx.showToast({
        title: '该文件不支持在线预览',
        icon:'none'
      })
      return;
    }


    if(isimage){
      this.handleOpenImg(path);
      return;
    } 
    
    if(!isimage){
      this.handleOpenDoc(type,path,name);
      return;
    }
  },
  async handleOpenDoc(type,path,name){
    const _self = this;

    wx.showLoading({
      title: '文件加载中',
    })


   const data =  await getFileStreamRequest(path);
   
   if(data){
     const fs = wx.getFileSystemManager();
      
      const newPath = `${wx.env.USER_DATA_PATH}/${name}.${type}`;// 临时路径名称

      // 下载文件
      fs.writeFile({
        filePath:newPath,
        data,
        encoding:'binary',
        success(res){
          _self.openDocument(newPath,type)
          
        },
        fail(err){
          console.log(err);
        }
      })
   }else{
     wx.showToast({
       title: '预览文件出错',
       icon:'none'
     })
   }
  },
  openDocument(path,type){
    wx.openDocument({
      filePath: path,
      fileType:type,
      success(){
        wx.hideLoading();
      },
      fail(err){
        wx.hideLoading();
        wx.showToast({
          title: '文件预览失败',
        })
      }
    })
  },
  handleOpenImg(path){
    console.log(path);
    if(path){
      wx.previewImage({
        urls: [path],
      })
    }
  },
  // 头像加载失败
  headImgLoadError(){
    const basicInfo = this.data.basicInfo;
    basicInfo.photoFilePath = '../../resouces/imgs/profile_photo_placeholder.png';
      this.setData({
        basicInfo
      })
  },
  // 切换tab索引
  switchTabIndex(e){
    
    const {index} = e.currentTarget.dataset;
    this.setData({
      tabActiveIndex:index
    })

    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 头像加载失败
  headImgLoadError(){
    const { basicInfo } = this.data;
    basicInfo.photoFilePath = '../../resouces/imgs/profile_photo_placeholder.png';

    this.setData({
      basicInfo
    })
  }
})