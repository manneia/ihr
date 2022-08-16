import service from '@/utils/request'

export const getEmployeeSimple = () => service({
  url: '/sys/user/simple'
})
