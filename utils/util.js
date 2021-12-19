const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const request = (url, options) => {
  const token = wx.getStorageSync('token');
  const header =  {
    'Content-Type': 'application/json; charset=UTF-8',
  }



  if(token){
    header.Authorization = `Bearer ${token}`;
  }


  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data), 
      header,
      responseType:options.arraybuffer ? 'arraybuffer' : 'text',
      success(request) {
          if(request.statusCode == 401){
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');

            wx.navigateTo({
              url: '/pages/login/login?back=1',
            })
          }else{
            resolve(request.data)
          }
      },
      fail(err){
        console.log(err);
      }
    })
  })
}

module.exports = {
  formatTime,
  request
}
