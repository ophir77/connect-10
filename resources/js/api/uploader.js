import request from '@core/utils/request'

export function uploadImage(options, onUploadProgress) {
    return request({
        url: options.url,
        method: 'post',
        data: options.data,
        upload: true,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { 'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2) },
        onUploadProgress,
    })
}

export function removeImage(options) {
    return request({
        url: options.url,
        method: 'delete',
        data: options.data
    })
}

export function uploadFile(options, onUploadProgress, cancelToken) {
    return request({
        url: options.url,
        method: 'post',
        data: options.data,
        upload: true,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { 'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2) },
        onUploadProgress,
        cancelToken,
    })
}

export function removeFile(options) {
    return request({
        url: options.url,
        method: 'delete',
        data: options.data
    })
}