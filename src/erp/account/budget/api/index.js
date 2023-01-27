import accountApi from 'api/accountApi';

export const searchYearList = (action) => accountApi.get('/operate/parentaccountlist', {});
