import axios from 'api/logiApi';
import hr from 'api/hrApi';

export const downloadReport = (param) => {
    return axios.get("/sales/logisticExel", {
        params: param
    });
}

export const searchEstimate =
    async param => {
      
        const result = await axios.get("/logisales/estimate/list", {
            params: param
        });
        return result.data;
    }


export const estimateCellClicked =
    async params => {
        const result = await axios.get("/logisales/estimatedetail/list", {
            params: {
                estimateNo: params.data.estimateNo
            }
        });
        return result.data;
    }

export const searchItemCode =
    async param => {
        const result = await axios.get('/logiinfo/item/standardunitprice', {
            params: param
        });
        console.log("!!!@!@@@@@!!!");
        return result.data;
    }


export const saveEstimateRow =
    async param => {
        console.log("sssssssssssss"+JSON.stringify(param));
        const result = await axios.post(
            '/logisales/estimate/new', {
                estimateDate: param.estimateDate,
                newEstimateInfo: param
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return result.data;
    }

export const searchCustomer =
    async () => {
        const result = await axios.get('/compinfo/customer/list', {
            params: {
                searchCondition: 'ALL',
                workplaceCode: ''
            }
        })
        return result.data;
    }

export const searchItem =
    async () => {
        const result = await axios.get('/compinfo/codedetail/list', {
            params: {
                divisionCode: 'IT-_I'
            }
        })
        return result.data;
    }

export const searchDetailList =
    async (params) => {
        const result = await axios.get('/logisales/contractdetail/list', {
            params: {
                contractNo: params.data.contractNo
            }
        }
        )
        return result.data;
    }

export const searchContractList =
    async (param) => {
        const result = await axios.get('/logisales/contract/list'
            , { params:param}
            , {withCredentials:true}
            )
        console.log(result.data)
        return result.data;
    }

export const estimateSearch =
    async (param) => {
        const result = await axios.get('/logisales/estimate/list/contractavailable', {
            params: param
        })
        return result.data;
    }

export const addContract =
    async (param) => {
        const result = await axios.post('/logisales/contract/new', {
            batchList: param.batchList,
            contractDate: param.contractDate,
            personCodeInCharge: param.personCodeInCharge
        } )
        return result.data;
    }

export const searchContractType =
    async () => {
        const result = await axios.get('/compinfo/codedetail/list', {
            params: {
                divisionCode: 'CT'
            }
        })
        console.log(result.data);
        return result.data;
    }

export const searchDialogCustomer =
    async () => {
        const result = await axios.get('/compinfo/codedetail/list', {
            params: {
                divisionCode: 'CL-01'
            }
        }, {withCredentials:true})
        console.log(result.data)
        return result.data;
    }

    export function contractDetailListInMpsAvailable(param) {
        return axios.get("http://localhost:8284/production/mps/contractdetail-available", {
            batchList: param.searchCondition,
            contractDate: param.startDate,
            personCodeInCharge: param.endDate
        })
}