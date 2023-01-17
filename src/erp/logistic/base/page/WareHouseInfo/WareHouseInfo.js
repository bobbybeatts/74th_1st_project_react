import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
// import * as types from "erp/logistic/ActionType/ActionType";
import { useDispatch, useSelector } from 'react-redux';
import {
    searchWarehouseList,
    saveWarehouseList,
    warehouseDetail
} from 'erp/logistic/base/action/LogisticsInfoAction';
import WarehouseDialog from './WareHouseDialog';
import WarehouseDialogInfo from './WareHouseDialogInfo';
import MyGrid from 'util/LogiUtil/MyGrid';
import { param } from 'jquery';

function WareHouseInfo( ) {
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const dispatch = useDispatch();
    const warehouseList = useSelector(state => state.RootReducers.logistic.logisticsinfo.warehouseList);
    const warehouseDetailList = useSelector(state => state.RootReducers.logistic.logisticsinfo.warehouseDetail)
    console.log('나와라 나와라...',warehouseDetailList)

    const list = warehouseList.filter(ele => {
        if (ele.status !== 'DELETE') {
            return ele;
        }
    });

    //깃테스트중!
    const columns = {
        columnDefs: [
            // { width: "40", headerCheckboxSelection: true, checkboxSelection: true },
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                width: 50
            },
            {
                headerName: '창고 코드',
                field: 'warehouseCode'
            },
            {
                headerName: '창고 명',
                field: 'warehouseName',
                editable: true
            },
            {
                headerName: '창고 사용여부',
                field: 'warehouseUseOrNot',
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: { values: ['Y', 'N'] }
            },
            { headerName: '설명', field: 'description', editable: true }
        ]
    };


    const column = {
        columnDefs: [
            // { width: "40", headerCheckboxSelection: true, checkboxSelection: true },
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                width: 50
            },
            {
                headerName: '창고코드',
                field: 'warehouseCode'
            },
            {
                headerName: '자재코드',
                field: 'itemCode',
                editable: true
            },
            {
                headerName: '자재명',
                field: 'itemName',
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: { values: ['Y', 'N'] }
            },
            { headerName: '단위', field: 'unitOfStock', editable: true },
            { headerName: '안전재고량', field: 'safetyAllowanceAmount', editable: true },
            { headerName: '가용재고량', field: 'stockAmount', editable: true },
            { headerName: '전체재고량', field: 'totalStockAmount', editable: true }
            // { headerName: '상태', field: 'description', editable: true }
        ]
    };

    const [warehouseCode, setWarehouseCode] = useState([]);

    const onClick = () => {
        //console.log("추가버튼");
        setAddOpenDialog(true);
    };

    const close = () => {
        setAddOpenDialog(false);
    };

    const onCellClicked=param=>{
        console.log('warehouseCode 뭐가 들어왔누~ : ',param.data.warehouseCode);
        setWarehouseCode(param.data.warehouseCode);
    }
    const searchonClick = () => {
        console.log('자재조회 클릭!');
        console.log('현재 warehouseCode는??? : ',warehouseCode);
        dispatch(warehouseDetail({warehouseCode}));
    }

    /*-----------------*/
    /*-----addItem-----*/
    /*-----------------*/
    const onSubmit = warehouseTo => {
        //console.log("서브밋", warehouseTo);
        console.log(warehouseTo);
        gridApi.updateRowData({add: [warehouseTo]});
        setAddOpenDialog(false);

        gridApi.forEachNode(node =>
            console.log(node.data)
        );
    };

/*--------------------*/
/*-----batchItems-----*/
/*--------------------*/
    const onSave = () => {
        var batchList = [];
        gridApi.forEachNode(node => batchList.push(node.data));
        dispatch(saveWarehouseList(batchList));
    };

    const onGridReady = params => {
        //console.log("AgCheckbox@@", params.api.getAgCheckbox());
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

/*---------------------*/
/*-----deleteItems-----*/
/*---------------------*/
    const onDelete = params => {
        const rows = gridApi.getSelectedRows();
        console.log(rows);
        gridApi.updateRowData({remove:rows});
    };
    const valueChanged = e => {
        console.log(e);
        e.data.status = 'UPDATE';
    };
    useEffect(() => {
        dispatch(searchWarehouseList());
    }, []);
    

    return (
        <>
            <MyGrid
                // title={'창고 관리'}
                column={columns}
                list={list}
                onCellClicked={onCellClicked}
                onCellValueChanged={valueChanged}
                api={onGridReady}
                rowSelection="single"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onClick}
                >
                    창고 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={searchonClick}
                >
                    자재조회
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onDelete}
                >
                    {' '}
                    삭제{' '}
                </Button>
                {/* <Button variant="contained" color="secondary" onClick={onSave}>
                    일괄 저장
                </Button> */}
            </MyGrid>
            <MyGrid
                column={column}
                list={warehouseDetailList}
                rowSelection="single"
                >
            </MyGrid>
            <WarehouseDialog open={addOpenDialog} close={close}>
                <div>
                    <WarehouseDialogInfo onSubmit={onSubmit} />
                </div>
            </WarehouseDialog>
        </>
    );
}

export default WareHouseInfo;
