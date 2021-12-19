// components/employeeCard/employeeCard.js
Component({
    properties: {
        employee:Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        dumpToEmployeeDetail(){
            const id = this.properties.employee.id;
            
            wx.navigateTo({
              url: `/pages/employeeDetail/employeeDetail?id=${id}`,
            })
        },
        intoEmployeeDetail(){
            const {id} = this.properties.employee;
            wx.navigateTo({
              url: `/pages/employeeDetail/employeeDetail?dimission=true&id=${id}`,
            })
        }
    }
})
