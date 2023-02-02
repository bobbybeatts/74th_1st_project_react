import accountApi from 'api/accountApi';

export const selectBudgetStatus = (action) =>
    accountApi.get('/budget/budgetstatus', {
        params: {
            accountPeriodNo: action.payload.accountPeriodNo,
            deptCode: action.payload.deptCode,
            workplaceCode: action.payload.workplaceCode
        }
    });
