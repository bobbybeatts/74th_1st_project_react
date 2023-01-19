import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};
//예산 관리, 예산편성, 예산 실적현황
const budgetPages = {
    id: 'budget',
    title : <FormattedMessage id="예산 관리" />,
    type: 'collapse',
    children: [
        {
            id : 'budgetRequest',
            title: (
                <>
                    <FormattedMessage id="예산 신청"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/budget/BudgetRequest',
        },
        {
            id : 'budgetFormulation',
            title: (
                <>
                    <FormattedMessage id="예산 편성"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/budget/BudgetFormulation',
        },
        {
            id : 'budgetStatus',
            title: (
                <>
                    <FormattedMessage id="예산 실적 현황"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/budget/BudgetStatus',
        },

    ]
};

export default budgetPages