import request from '../request'
export const getPartitionListAPI = () => {
    return request.get('v1/partition/list')
}