const {
    getProjectEmployeeListRequest
} = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        departmentList:[],
        activeIndex:0,
        employeeList:{},
        isInitLoading:true,
        projectInfoHeight:'',   // 项目信息高度
        total:'',
        list:[]
    },
    onLoad: function (options) {
        const {id,desc,name,type,status} = options;
        

        this.setData({
            projectId:id,
            projectName:name,
            projectDesc:desc,
            projectType:type === 'undefined' ? null : type,
            projectStatus:status === 'undefined' ? null : status
        })



        // 获取项目信息高度
        this.getProjectInfoHeight();

        this.getData(id);
       
    },
    async getData(id){
        wx.showLoading({
            mask:true
        })


        const {data} = await getProjectEmployeeListRequest(id);

        wx.hideLoading();

        this.setData({
            isInitLoading:false
        })

        if(data){
            this.setData({
                list:data.list,
                total:data.total
            })
        }
    },
   // 获取顶部部门信息高度
    getProjectInfoHeight(){
        const _self = this;
        wx.createSelectorQuery().select('.project-info').boundingClientRect(rect => {
            _self.setData({
                projectInfoHeight:rect.height
            })
        }).exec();
    },
    // 监听当前激活部门id改变
    handleActiveDepartmentIdChanged(departmentId){
       const projectId = this.data.projectId;
       this.getEmployeeListForDepartment(projectId,departmentId);
    },
    changeActiveDepartmentId(e){
        const index = e.currentTarget.dataset.index;

        this.setData({
            activeIndex:index
        })
    }
})