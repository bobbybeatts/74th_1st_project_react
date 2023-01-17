import axios from 'api/hrApi';

export const baseSalarySearch =
() => axios.get(  "/salaryinfomgmt/salary");

export const baseSalaryUpdate =
(action) => axios.post("/salarystdinfomgmt/base-salary", 
{ sendData: action.payload }, 
{  headers: {  "Content-Type": "application/json" }},
);
//=====급여조회 => 월별급여조회=====
export const searchMonthSalary =
() =>{
return axios.get( // ajax처럼 컨트롤러 호출, 뒷단의 데이터를 갖고 옴 get을 사용 -> 조회를 했다.
  "/salaryinfomgmt/salary/list"
)}

//============월급여 마감==============
export const salaryListSaga =
(action) =>
axios({
  method: "get",
  url: "/salaryinfomgmt/salary/empcode",
  params: {
    empCode: action.payload.emp,
    applyYearMonth: action.payload.date,
  },
});

export const closeSalary =
(action) => 
axios({
  headers: { "Content-Type": "application/json" },
  method: "post",
  url: "/salaryinfomgmt/salary/empcode",
  data: {
    empcode1: action.payload.empcode1,
  },
})