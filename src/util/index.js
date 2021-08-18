
export * as app_storage from './storage';

export const plainNumber = (value) => +value.replace(/[^0-9]/g,'');

export const moneyFormatter = (value) => {
    if(!value)  return ''
    return new Intl.NumberFormat().format(plainNumber(value));
}

