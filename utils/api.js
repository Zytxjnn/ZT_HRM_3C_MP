const { request } = require('./util');
const app = getApp();

const apis = {
  login:['Account/Login','Account/Login'],
  getEmployeeInfoList:['EmployeeInfo/GetPageList','Laborer/GetPageList'],
  getEmployeeBasicInfoRequest:['EmployeeInfo/Get','Laborer/Get'],
  getEmployeeTrainingInfoRequest:['TrainingInfo/GetList?employeeId','LaborTrainingInfo/GetList?laborerId'],
  getEmployeeWorkInfoRequest:['WorkInfo/GetList?employeeId','LaborWorkInfo/GetList?laborerId'],
  getEmployeeIncentiveInfoRequest:['IncentiveInfo/GetList?employeeId','LaborIncentiveInfo/GetList?laborerId'],
  getEmployeeTitlesInfoRequest:['TitlesInfo/GetList?employeeId','LaborTitlesInfo/GetList?laborerId'],
  getEmployeeEducationInfoRequest:['EducationInfo/GetList?employeeId','LaborEducationInfo/GetList?laborerId'],
  getDepartmentListRequest:['ConfigInfo/GetDepartmentList','LaborConfigInfo/GetDepartmentList'],
  getEngagedInWorkListRequest:['ConfigInfo/GetEngagedInWorkList','LaborConfigInfo/GetEngagedInWorkList'],
  getJobsListRequest:['ConfigInfo/GetJobsList','LaborConfigInfo/GetJobsList'],
  getProfessionalList:['ConfigInfo/GetProfessionalList','LaborConfigInfo/GetProfessionalList'],
  getSecondaryInstitutionsList:['ConfigInfo/GetSecondaryInstitutionsList','LaborConfigInfo/GetSecondaryInstitutionsList'],
  getArchivesDetail:['ArchivesInfo/Get','LaborArchivesInfo/Get'],
  getArchivesList:['ArchivesInfo/GetList?employeeId','LaborArchivesInfo/GetList?laborerId'],
  getContract:['LaborContract/GetList?id','LaborContract/GetList?id'],
  getProjectDepartmentList:['Project/GetDepartmentPageList','LaborProject/GetDepartmentPageList'],
  getSecondaryInstitutionsListForProject:['Project/getSecondaryInstitutionsList?id=','Project/getSecondaryInstitutionsList?id='],
  getEmployeeListForDepartment:['Project/GetPageList','LaborProject/GetPageList'],
  getEmployeeLogPageList:['EmployeeLog/GetPageList','LaborerLog/GetPageList'],
  getDimissionEmployee:['EmployeeLog/Get','LaborerLog/Get'],
  getProjectEmployeeList:['Project/GetList','LaborProject/GetList']
}


// 根据mode 获取当前请求的是三处还是天诚
const getCurrentUrl = key => {
  const mode = app.globalData.mode;
  return apis[key][mode];
}


// 登录
const login = (account,password) => {
  return request(getCurrentUrl('login'),{
    method:'post',
    data:{
      account,password
    }
  })
}

// 获取员工列表
const getEmployeeInfoList = (currentPage,pageSize,key) => {
  return request(getCurrentUrl('getEmployeeInfoList'),{
    method:'post',
    data:{
      currentPage,
      pageSize,
      sortField:'name',
      sortDirection:'asc',
      key
    }
  })
}


// 筛选后获取员工列表
const getEmployeeInfoListBySiftRequest = ({
  currentPage,pageSize,name,departmentId,engagedInWorkId,jobsId,professionalId,secondaryInstitutionsId,key,keyType
}) => {
  return request(getCurrentUrl('getEmployeeInfoList'),{
    method:'post',
    data:{
      currentPage,
      pageSize,
      sortField:'name',
      sortDirection:'asc',
      name,
      departmentId,
      engagedInWorkId,
      jobsId,
      professionalId,
      secondaryInstitutionsId,
      key,
      keyType
    }
  })
}

// 获取员工列表
const getEmployeeInfoListBySearch = (currentPage,pageSize,key,keyType) => {
  return request(getCurrentUrl('getEmployeeInfoList'),{
    method:'post',
    data:{
      currentPage,
      pageSize,
      sortField:'name',
      sortDirection:'desc',
      key,
      keyType
    }
  })
}

// 获取单个员工基本信息
const getEmployeeBasicInfoRequest = (id) => {
  return request(`${getCurrentUrl('getEmployeeBasicInfoRequest')}?id=${id}`,{
    method:'get'
  })
}

// 获取离职员工基本信息和离职信息
const getDimissionEmployeeRequest = id => {
  return request(`${getCurrentUrl('getDimissionEmployee')}?id=${id}`,{
    method:'get'
  })
}

// 获取单个员工培训信息
const getEmployeeTrainingInfoRequest = (id) => {
  return request(`${getCurrentUrl('getEmployeeTrainingInfoRequest')}?id=${id}`,{
    method:'get'
  })
}

// 获取单个员工履历信息
const getEmployeeWorkInfoRequest = (id) => {
  return request(`${getCurrentUrl('getEmployeeWorkInfoRequest')}=${id}`,{
    method:'get'
  })
}

// 获取员工奖惩信息
const getEmployeeIncentiveInfoRequest = id => {
  return request(`${getCurrentUrl('getEmployeeIncentiveInfoRequest')}=${id}`,{
    method:'get'
  })
}

// 获取员工职称信息
const getEmployeeTitlesInfoRequest = id => {
  return request(`${getCurrentUrl('getEmployeeTitlesInfoRequest')}=${id}`,{
    method:'get'
  })
}

// 获取员工学历信息
const getEmployeeEducationInfoRequest = id => {
  return request(`${getCurrentUrl('getEmployeeEducationInfoRequest')}=${id}`,{
    method:'get'
  })
}

// 获取部门列表接口
const getDepartmentListRequest = () => {
  return request(`${getCurrentUrl('getDepartmentListRequest')}`,{
    method:'get'
  })
}

// 获取从事工作列表
const getEngagedInWorkListRequest = () => {
  return request(`${getCurrentUrl('getEngagedInWorkListRequest')}`,{
    method:'get'
  })
}

// 获取岗位列表
const getJobsListRequest = () => {
  return request(`${getCurrentUrl('getJobsListRequest')}`,{
    method:'get'
  })
}

// 获取专业技术职位列表
const getProfessionalList = () => {
  return request(`${getCurrentUrl('getProfessionalList')}`,{
    method:'get'
  })
}

// 获取二级机构列表
const getSecondaryInstitutionsList = () => {
  return request(`${getCurrentUrl('getSecondaryInstitutionsList')}`,{
    method:'get'
  })
}

// 获取员工档案列表
const getArchivesListRequest = id => {
  return request(`${getCurrentUrl('getArchivesList')}=${id}`,{
    method:'get'
  })
}

// 获取员工劳动合同
// const getContract = id => {
//   return request(`${getCurrentUrl('getContract')}=${id}`,{
//     method:'get'
//   })
// }

// 获取部门列表
const getProjectDepartmentListRequest = (currentPage,pageSize,searchValue) => {
  return request(`${getCurrentUrl('getProjectDepartmentList')}`,{
    method:'post',
    data:{
      currentPage,
      pageSize,
      name:searchValue
    }
  })
}

// 获取项目下的二级机构列表
const getSecondaryInstitutionsListForProjectReqeust = id => {
  return request(`${getCurrentUrl('getSecondaryInstitutionsListForProject')}${id}`,{
    method:'get',  
  })
}

// 获取项目的二级机构的员工列表
const getEmployeeListForDepartmentRequest = (currentPage,pageSize,departmentId,secondaryInstitutionsId) => {
  return request(`${getCurrentUrl('getEmployeeListForDepartment')}`,{
    method:'post',
    data:{
      currentPage,
      pageSize,
      departmentId,
      secondaryInstitutionsId
    }  
  })
}

// 获取减员列表
const getEmployeeLogPageListRequest = ({currentPage,pageSize,name,startTime,endTime,type}) => {
  return request(`${getCurrentUrl('getEmployeeLogPageList')}`,{
    method:'post',
    data:{
      currentPage,
      pageSize,
      name,
      startTime,
      endTime,
      type,
      sortField:'createTime',
      sortDirection:'desc'
    }  
  })
}

// 获取部门/项目下所有二级机构以及员工列表
const getProjectEmployeeListRequest = id => {
  return request(`${getCurrentUrl('getProjectEmployeeList')}?id=${id}`,{
    method:'get'
  })
}

const getFileStreamRequest = uri => {
  return request(`FileInfo/Get?uri=${uri}`,{
    method:'get',
    arraybuffer:true
  })
}


module.exports = {
  login,
  getEmployeeInfoList,
  getEmployeeInfoListBySiftRequest,
  getEmployeeInfoListBySearch,
  getEmployeeBasicInfoRequest,
  getEmployeeTrainingInfoRequest,
  getEmployeeWorkInfoRequest,
  getEmployeeIncentiveInfoRequest,
  getEmployeeTitlesInfoRequest,
  getEmployeeEducationInfoRequest,
  getDepartmentListRequest,
  getEngagedInWorkListRequest,
  getJobsListRequest,
  getProfessionalList,
  getSecondaryInstitutionsList,
  getArchivesListRequest,
  getProjectDepartmentListRequest,
  getSecondaryInstitutionsListForProjectReqeust,
  getEmployeeListForDepartmentRequest,
  getEmployeeLogPageListRequest,
  getDimissionEmployeeRequest,
  getProjectEmployeeListRequest,
  getFileStreamRequest
}