import moment from 'moment'
export const date_formatter=(date = new Date()) => moment(date).format('DD-MM-YYYY')
export const scan_date_time_formatter =(date = new Date())=> moment(date).format('DD-MM-YYYY  h:mm a');