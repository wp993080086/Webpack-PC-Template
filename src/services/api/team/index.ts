import Request from '@/services/request'
import Module from '@/services/module'
import { TAreaList, ITeamAdd, ITeamDelete, ITeamDetails, ITeamEdit } from './team'

export default {
  /**
   * 交付团队添加
   * @param {String} address 交付团队地址
   * @param {Array} areaInfos 覆盖区域
   * @param {Array} deviceTypeInfos 覆盖设备类型
   * @param {String} mobile 交付团队电话
   * @param {String} principal 交付团队负责人
   * @param {Number} scopeService 服务范围
   * @param {String} teamName 交付团队名称
   */
  teamAdd(param: ITeamAdd) {
    return Request.post(Module.Provider, '/team/add', { ...param })
  },
  /**
   * 交付团队删除
   * @param {String} teamId 交付团队id
   */
  teamDelete(param: ITeamDelete) {
    return Request.post(Module.Provider, '/team/delete', { ...param })
  },
  /**
   * 交付团队详情
   * @param {String} teamId 交付团队id
   */
  teamDetails(param: ITeamDetails) {
    return Request.post(Module.Provider, '/team/info', { ...param })
  },
  /**
   * 交付团队列表
   */
  teamList(param: TAreaList) {
    return Request.post(Module.Provider, '/team/list', { ...param })
  },
  /**
   * 交付团队修改
   * @param {String} address 交付团队地址
   * @param {String} areaInfos 覆盖区域
   * @param {String} deviceTypeInfos 覆盖设备类型
   * @param {String} mobile 交付团队电话
   * @param {String} principal 交付团队负责人
   * @param {Number} scopeService 服务范围
   * @param {String} teamName 交付团队名称
   * @param {String} teamId 交付团队id
   * @param {String} userId 用户id
   */
  teamEdit(param: ITeamEdit) {
    return Request.post(Module.Provider, '/team/update', { ...param })
  }
}
