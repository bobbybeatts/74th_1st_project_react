import React from "react";

//  예 산 =========================================================================================================================
import { default as BudgetRequest } from "../page/budgetrequest/BudgetRequest"; // 예산 신청
import { default as BudgetFormulation } from "../page/budgetformulation/BudgetFormulation"; // 예산 편성
import { default as BudgetStatus } from "../page/budgetstatus/BudgetStatus"; // 예산 실적현황

import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";


const BudgetRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children : [
        {
            path: '/app/acc/budget/BudgetRequest',
            element : <BudgetRequest/>
        },
        {
            path: '/app/acc/budget/BudgetFormulation',
            element : <BudgetFormulation/>
        },
        {
            path:  '/app/acc/budget/BudgetStatus',
            element : <BudgetStatus/>
        }
    ]
};

export default BudgetRoute;