import React from 'react';
import { Icon } from 'rsuite';

export const categoryOption = [
  { label: '食費', value: 'food_expenses', color: '#fddede' },
  { label: '生活用品', value: 'living_expenses', color: '#faddeb' },
  { label: '家賃', value: 'rent', color: '#dfd6ef' },
  { label: '電気', value: 'electric_bill', color: '#dce9f7' },
  { label: '水道', value: 'water_bill', color: '#ddece7' },
  { label: 'ガス', value: 'gas_bill', color: '#fbeed5' },
  { label: 'その他', value: 'others', color: '#e6e6e5' },
];

export const makeMemberOption = (members) => {
  const option = members.map(({ id, account }) => {
    return { label: account, value: id };
  });

  return option;
};

export const navItems = [
  {
    title: 'Dashboard',
    eventKey: 'dashboard',
    icon: <Icon icon='dashboard' size='3x' />,
    to: '/'
  },
  {
    title: 'Records',
    eventKey: 'records',
    icon: <Icon icon='table' size='5x' />,
    to: '/records'
  },
  {
    title: 'Summary',
    eventKey: 'summary',
    icon: <Icon icon='target' size='5x' />,
    to: '/summary'
  },
  {
    title: 'Members',
    eventKey: 'members',
    icon: <Icon icon='user' size='5x' />,
    to: '/members'
  },
  {
    title: 'Config',
    eventKey: 'config',
    icon: <Icon icon='gear-circle' size='5x' />,
    to: '/config'
  }
];