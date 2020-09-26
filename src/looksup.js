export const categoryOption = [
  { label: '食費', value: 'foodExpenses' },
  { label: '生活用品', value: 'livingExpenses' },
  { label: '家賃', value: 'rent' },
  { label: '電気', value: 'electricBill' },
  { label: '水道', value: 'waterBill' },
  { label: 'ガス', value: 'gasBill' },
  { label: 'その他', value: 'others' },
];

export const makeMemberOption = (members) => {
  const option = members.map(({ id, account }) => {
    return { label: account, value: id };
  });

  return option;
};