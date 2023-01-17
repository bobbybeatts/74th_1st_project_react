import axios from "axios";
import Swal from "sweetalert2";

export const     searchContractDetailInMpsAvailable = (setContractList,calendarDate) => {
    axios.get("http://localhost:9102/production/mps/contractdetail-available",{
        params:{
            startDate:calendarDate.startDate,
            endDate :calendarDate.endDate,
            searchCondition:'contractDate'
        }
    }).then(({data}) => {
        // console.log("Mps 등록가능조회 data ========== " + JSON.stringify(data.result.data));
        if(data.errorCode < 0 ){
            Swal.fire({
                icon: data.errorCode < 0 ? "error":"success",
                title: data.errorMsg
            });
        }
        console.log("여기 오니?");
        setContractList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}
export const convertContractDetailToMps = (contract) => {
    console.log(contract)
    axios.post("http://localhost:9102/production/mps/contractdetail",
        contract
    ).then(({data}) => {
        Swal.fire({
            icon: data.errorCode < 0 ? "error":"success",
            title: data.errorMsg
        });
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}


export const searchMpsInfo = (setMpsList,calendarDate) => {

    axios.get("http://localhost:9102/production/mps/list",{
            params : {
                startDate:calendarDate.startDate,
                endDate :calendarDate.endDate,
                includeMrpApply:'includeMrpApply'
            }
        }
    ).then(({data}) => {
        console.log("data ====" + JSON.stringify(data));
        console.log("데이터가 Template에 오니?");
        setMpsList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}
