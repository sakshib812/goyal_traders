// REPLACE WITH REAL FIGURES BEFORE LAUNCH
// Modest placeholder statistics for Goyal Traders fintech platform

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  iconName: 'partner' | 'transaction' | 'service' | 'state';
}

export const statsData: StatItem[] = [
  {
    id: 'partners',
    value: 240,
    suffix: '+',
    label: 'Partner businesses',
    description: 'Active digital platforms and retail networks',
    iconName: 'partner',
  },
  {
    id: 'transactions',
    value: 650,
    suffix: 'K+',
    label: 'Transactions processed',
    description: 'Monthly utility, recharge and bill requests',
    iconName: 'transaction',
  },
  {
    id: 'services',
    value: 9,
    suffix: '',
    label: 'Services available',
    description: 'Modular fintech APIs ready for immediate integration',
    iconName: 'service',
  },
  {
    id: 'states',
    value: 18,
    suffix: '+',
    label: 'States covered',
    description: 'Regional operator and banking correspondent reach',
    iconName: 'state',
  },
];

