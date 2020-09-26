export const categoryOption = [
  { label: '食費', value: 'food_expenses' },
  { label: '生活用品', value: 'living_expenses' },
  { label: '家賃', value: 'rent' },
  { label: '電気', value: 'electric_bill' },
  { label: '水道', value: 'water_bill' },
  { label: 'ガス', value: 'gas_bill' },
  { label: 'その他', value: 'others' },
];

export const makeMemberOption = (members) => {
  const option = members.map(({ id, account }) => {
    return { label: account, value: id };
  });

  return option;
};