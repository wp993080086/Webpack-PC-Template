export type TUser = Partial<{
  userName: string // 用户名
  sToken: string
  userToken: string
  userType: number // 用户类型
  channel: string // 渠道标识符
  loginTimeStr: string // 登录时间
  userId: string // 用户ID
}>

export type TDetails = Partial<{
  userTypeId: string
  userType: number | string
  telephone: string
}>

export interface IUserState {
  userInfo: TUser
  userDetails: TDetails
}
