const title = "网络相册";
const https = false;
const domain = "localhost:8000";
const mobile = "/mobile/";
const mediaRoot = "http://127.0.0.1:8000"
const maxImgSize = 10;//上传图片最大大小(单位M)
const maxVideoSize = 500;//上传视频最大大小(单位M)

export const globalConfig = {
    title: title,
    https: https,
    domain: domain,
    mobile: mobile,
    maxImgSize: maxImgSize,
    maxVideoSize: maxVideoSize,
    mediaRoot: mediaRoot,
}