import accountApi from 'api/accountApi';

export const selectBudgetStatus = (action) =>
    accountApi.get('/budget/budgetstatus', {
        params: {
            accountPeriodNo: action.params.accountPeriodNo,
            deptCode: action.params.deptCode,
            workplaceCode: action.params.workplaceCode
        }
    });
