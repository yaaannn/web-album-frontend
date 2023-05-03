import { globalConfig } from "./global-config"

export const isURL = (url: string) => {
    const reg = /http(s)?:\/\/((([\w-]+\.)+[\w-]+)|(localhost))(:\d+)?(\/[\w- ./?%&=#]*)?/;
    return reg.test(url)
}

export const getResourceUrl = (originalUrl: string) => {
    // 如果本身就是一个url,或者前后端同源,直接返回
    if (isURL(originalUrl) || !globalConfig.domain) {
        return originalUrl;
    }
    if (originalUrl === '') {
        return undefined;
    }

    // 前后端不同源
    return `http${globalConfig.https ? 's' : ''}://${globalConfig.domain}${originalUrl}`;
}