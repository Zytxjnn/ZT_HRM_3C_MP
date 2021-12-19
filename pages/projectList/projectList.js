const {
    getProjectDepartmentListRequest
} = require('../../utils/api');

Page({
    data: {
        list:[],
        searchedList:[],
        total:"",
        currentPage:1,
        size:20,
        isEnd:false,
        isInitLoading:true,
        isLoading:false,
        searchValue:""
    },
    async onLoad(){
      wx.showLoading({
          title:'加载中'
      })

      await this.getProjectList();

      wx.hideLoading();
    },
    async getProjectList(){
        const {currentPage,size,searchValue,list,searchedList,isInitLoading,isLoading} = this.data;

        this.setData({
            isLoading:isInitLoading ? false : isLoading
        })

        let {list:data,total} = await getProjectDepartmentListRequest(searchValue ? 1 : currentPage,size,searchValue);

        // 数据已经全部加载完毕
        if(data.length === 0){
            this.setData({
                isEnd:true,
                isLoading:false
            });
            return;
        }

        const obj = {
            total,
            isLoading:false
        }



        // 如果有搜索栏，则往不同的list内追加数据
        if(searchValue){
            obj.searchedList  = searchedList.concat(data);
        }else{
            obj.list  = list.concat(data);
            obj.currentPage = currentPage  + 1;
        }

        this.setData(obj)
    },
    // 项目列表滚动到底部
    projectListScrolltoLower(){
        const {isEnd,isLoading } = this.data;
        
        // 正在加载中或已经加载完毕
        if(isLoading || isEnd){
            return;
        }


        this.getProjectList()
    },
    // 搜索框输入
    handleInputSearch(e){
        const value = e.detail.value;
        
        this.setData({
            searchedList:[],
            isEnd:false,
            searchValue:value
        })

        this.getProjectList();
    },
    // 点击搜索框情况按钮
    handleInputClear(){
        this.setData({
            searchValue:''
        })
    
        this.getProjectList();
    },
    // 点击项目item，跳转项目详情页
    dumpToProjectList(e){
        const {id,name,desc,status,type} = e.currentTarget.dataset;

        wx.navigateTo({
          url: `/pages/projectDetail/projectDetail?id=${id}&name=${name}&desc=${desc}&status=${status}&type=${type}`,
        })
    },
})