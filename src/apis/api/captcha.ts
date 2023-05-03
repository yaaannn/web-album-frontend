import request from "../request"

export const getSliderAPI = () => {
    return request.get('v1/public/captcha/get')
}

export const validateSliderAPI = (x: number) => {
    return request.post('v1/public/captcha/validate', { 'x': x })
}