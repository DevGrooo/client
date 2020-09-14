import { helpers } from 'vuelidate/lib/validators'

export function username (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[a-zA-Z0-9\-_]{6,20}$/).test(value)
}

export function mobile (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[0-9]{10,11}$/).test(value)
}

export function date (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/).test(value)
}

export function idNumber (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[0-9A-Z]{9,20}$/).test(value)
}

export function accountHolder (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[a-zA-Z0-9\s]{6,255}$/).test(value)
}

export function accountNumber (value) {
  if (!helpers.req(value)) {
    return true
  }
  return new RegExp(/^[0-9]{8,20}$/).test(value)
}

export function isTradingAccountNumber (value, parentVm) {
  if (!helpers.req(value)) {
      return true
  }
  if (parentVm.fund_distributor_code !== '') {
    if (value.substr(0, 3) !== parentVm.fund_distributor_code) {
      return false
    }
  }
  if (parentVm.zone_type !== '') {
    if (parseInt(parentVm.zone_type) === 1 && value.substr(3, 1) !== 'C') {
      return false
    }
    if (parseInt(parentVm.zone_type) === 2 && value.substr(3, 1) !== 'F') {
    return false
    }
  }
  return new RegExp(/^[a-zA-Z0-9]{3}[PCF][a-zA-Z0-9]{6}$/).test(value)
}

export function isGender (value, parentVm) {
  if (!helpers.req(value)) {
      return true
  }
  if (parseInt(parentVm.scale_type) === 1) {
    if (value !== 'M' && value !== 'F') {
      return false
    }
  } else if (value !== 'O') {
    return false
  }
  return true
}

export function isExternalRequired (value, parentVm) {
  if (parseInt(parentVm.zone_type) === 1) {
    return true
  } else if (parseInt(parentVm.zone_type) === 2 && value !== '') {
    return true
  }
  return false
}
