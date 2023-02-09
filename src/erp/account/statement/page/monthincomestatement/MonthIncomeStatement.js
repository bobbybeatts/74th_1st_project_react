import React from 'react';
import MonthIncomeStatementGrid from './MonthIncomeStatementGrid';
import MonthIncomeStatementMenu from './MonthIncomeStatementMenu';

const MonthIncomeStatement = () => {
    return (
        <>
            <MonthIncomeStatementMenu />
            <MonthIncomeStatementGrid />
        </>
    );
};

export default MonthIncomeStatement;
