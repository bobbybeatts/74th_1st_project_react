import axios from 'api/logiApi';

export const inspection = (param) =>
    axios.put("/stock/inspection",
    { sendData: param },
    {  headers: {  "Content-Type": "application/json" }},
    );

// 1차 뒷단으로 api 수정
    export const getBomDeploy =
    async (param) => {
    const result = await axios.get(
        '/stock/bom/deploy', {
            params : {
                deployCondition: param.deployCondition,
                itemCode: param.itemCode,
                itemClassificationCondition: param.divisionCode,
            }
        }
    )
    return result.data;
    }


    export const getBomDeployRegist =
async (param) => {
const result = await axios.get("/stock/bom/info", {
    params: {
        parentItemCode: param
    },
})
return result.data;
}

// 1차 뒷단으로 api 수정
export const getDetailCode =
async (param) => {
const result = await axios.get(
    '/compinfo/codedetail/list', {
        params: {
            divisionCode: param
        }
    }
)
return result.data;
}

export const batchBom =
async (param) => {
const result = await axios.post(
    "/purchase/batchBomListProcess",
    {
        batchList: JSON.stringify(param)
    }
)
return result.data;
}

// API 변경
export const optionOrderDialog =
async () => {
const result = await axios.get('/logiinfo/getOptionItemList')
return result.data;
}

export const onClickOptionOrder =
async (params) => {
const result = await axios.get('/purchase/order/option', {
    params: {
        itemCode: params.itemCode,
        itemAmount: params.itemAmount
    }
})
return result.data;
}

export const onClickGetOrderList =
async (params) => {
const result = await axios
.get('/purchase/order/list', {
    params: {
        startDate: params.startDate,
        endDate: params.endDate
    }
})
return result.data;
}

export const onClickOrderOpen =
async (param) => {
const result = await axios
.get('/purchase/order/dialog', {
    params: {
        mrpGatheringNoList: param.mrpGatheringNoList
    }
})
return result.data;
}