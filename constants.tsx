
import React from 'react';

export const CATEGORIES: { name: string; icon: string; color: string }[] = [
  { name: 'Transport', icon: '✈️', color: 'bg-blue-100 text-blue-600' },
  { name: 'Accommodation', icon: '🏨', color: 'bg-purple-100 text-purple-600' },
  { name: 'Food', icon: '🍽️', color: 'bg-orange-100 text-orange-600' },
  { name: 'Entertainment', icon: '🎡', color: 'bg-pink-100 text-pink-600' },
  { name: 'Shopping', icon: '🛍️', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Miscellaneous', icon: '📦', color: 'bg-slate-100 text-slate-600' },
];

export const COLORS = ['#3b82f6', '#a855f7', '#f97316', '#ec4899', '#10b981', '#64748b'];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
];

export const formatCurrency = (amount: number, currencyCode: string) => {
  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(amount);
};
