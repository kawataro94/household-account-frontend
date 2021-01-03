// import React from 'react';

// const createRecord = record => {
//   const params = {
//     ...record,
//     date: moment(record.date).format('YYYY-MM-DD'),
//     member_id: record.paidBy,
//     create_by: 2,
//     description: "TEST DESCRIPTION",
//     fixed: false,
//   };

//   axios
//     .post(`http://localhost:8000/member/records`, params)
//     .then(({ data }) => {
//       setRecords([...records, data]);
//     })
//     .catch((e) => {
//       console.log(e, 'post error');
//     })
//     .finally(() => {
//       Alert.config({ top: 80 });
//       Alert.success('新しいレコードを追加しました');
//     });
// };