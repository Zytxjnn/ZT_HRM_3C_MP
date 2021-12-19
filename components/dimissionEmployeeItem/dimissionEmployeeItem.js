// components/dimissionEmployeeItem/dimissionEmployeeItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        employee:Object
    },
    data: {
        info:{}
    },
    lifetimes:{
        attached(){
            const _self = this;
            this.setData({
                info:_self.properties.employee
            })
        }
    },
    methods: {
        headImgLoadError(){
            const info  = this.data.info;
            info.photoFilePath = '../../resouces/imgs/profile_photo_placeholder.png';
            this.setData({
                info
            })
            
        },
        intoEmployeeDetail(){
            const {id} = this.properties.employee;
            wx.navigateTo({
              url: `/pages/employeeDetail/employeeDetail?dimission=true&id=${id}`,
            })
        }
    },
})
