export class Base {
    uuid !: string
    sort !: number
    updateTime !: string
    createTime !: string
}

export class Pager {
    page !: number
    pageSize !: number
    totalItems !: number
    totalPages !: number
    data: any
}

export class Matter extends Base {
    puuid !: string
    userUuid !: string
    username !: string
    dir !: boolean
    name !: string
    size !: number
    privacy !: boolean
    times !: number
    active = false

    getSize() {
        return formatBytes(this.size)
    }
}

export class EyeblueUserInfo {
    cookie !: string
    sizeLimit !: number
    totalSize !: number
    totalSizeLimit !: number
    uuid !: number
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' Bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
    else return (bytes / 1073741824).toFixed(2) + ' GB'
}