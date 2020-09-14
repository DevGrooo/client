import { put, post } from '@/untils/api'

export function callApiTransactionFundImport (context, params = {}) {
    return put('/transaction_fund/import', params, context, true)
}

export function callApiTransactionFundImportFileExcel (context, params = {}) {
    return post('/transaction_fund/import_file_excel', params, context, true)
}
