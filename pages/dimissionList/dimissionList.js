const {
    getEmployeeLogPageListRequest
} = require('../../utils/api');

Page({
    data: {
        timePeriod:[
            {
                key:-1,
                name:'不限'
            },
            {
                key:1,
                name:'本月'
            },
            {
                key:2,
                name:'本季度'
            },
            {
                key:3,
                name:'本年'
            },

        ],
        timePeriodActIndex:-1,
        type:-1, // 0 时间段 | 1 自定义时间范围
        key:-1,    // 1 本月| 2 本季度| 3 本年
        currentPage:1,
        pageSize:10,
        searchValue:'',
        isLoading:false,
        isEnd:false,
        list:[],
        startTime:"",
        endTime:"",
        total:null,
        popupShow:false
    },
    onLoad(){

        wx.showLoading({
          title: '加载数据中',
        })

        this.getList();

    },
    handleTimePeroidChange(e){
       const index = Number(e.currentTarget.dataset.key);

       // 时间段改变，请求数据
       this.setData({
           timePeriodActIndex:index,
           type:index < 0 ? index : 0,
           key:index,
           currentPage:1,
           isLoading:true,
           isEnd:false,
           list:[],
           total:'-',
           startTime:'',
           endTime:'',
           popupShow:false
       })

       this.getList();
    },
    
    async getList(){
        
    
        const { currentPage,pageSize,searchValue,isLoading,isEnd,list,type,key,startTime,endTime} = this.data;

        const params = {currentPage:currentPage,pageSize,name:searchValue}

        // 时间段
        if(type === 0){
            params.type = key;
        }else if(type === 1){   // 自定义时间范围
            params.startTime = startTime;
            params.endTime = endTime;
        }


        const {list:data,total} = await getEmployeeLogPageListRequest(params);


        // 需要修改的数据
        const obj = {
            list:list.concat(data),
            total,
            isLoading:false
        }

        // 数据已全部加载完成
        if(data.length < pageSize ){
            obj.isEnd = true
        }else{
            obj.currentPage = currentPage + 1;
        }

        this.setData(obj)

        wx.hideLoading();
    },
    bindDatePick(e){
        const type = e.currentTarget.dataset.type;
        const date = e.detail.value;
     

        switch(type){
            case "start":
                this.setData({
                    startTime:date
                })
            break;
            case "end":
                this.setData({
                    endTime:date
                })
            break;
        }

        // 如果开始时间和结束时间都已选择，则发起请求，筛选数据
        const {startTime,endTime} = this.data;
        if(startTime.length > 0 && endTime.length >0){
            this.setData({
                type:1,
                currentPage:1,
                isEnd:false,
                list:[],
                total:'-',
                isLoading:true,
                timePeriodActIndex:-1,
                popupShow:false
            })

            this.getList();
        }
    },
    showPopup(){
        this.setData({
            popupShow:true
        })
    },
    employeeListScrollTolower(){
       const {isLoading,isEnd} = this.data;

       // 加载中或数据已加载完
       if(isLoading || isEnd){
           return false;
       }else{
           this.setData({
               isLoading:true
           })

           this.getList();
       }
    },
    // 搜索框 键盘确认
    handleInputConfirm(){
        this.searchData();
      
    },
    // 搜索框 输入
    handleInputChange(e){
        const value = e.detail.value;


        this.setData({
            searchValue:value
        })
    },
    // 搜索框点击搜索
    handleSearchBtnTap(){
        this.searchData();
    },
    handleInputClear(){
        const data = this.getSearchInputEvent();
        
        data.searchValue = '';

                
        this.setData(data)

        this.getList();
    },
    searchData(){
        const value = this.data.searchValue;
        if(value === undefined){
            return false;
        }

        const data = this.getSearchInputEvent();
        
        
        this.setData(data)



        this.getList();
    },
    // 返回 搜索框 键盘确认和清空 需要修改的data
    getSearchInputEvent(){
        return {
            isLoading:true,
            isEnd:false,
            list:[],
            total:'-',
            currentPage:1
        }
    }
})