export class File {
    name !: string
    size !: number
    txId !: string
    hash !: string
    parentId !: string | null
    type !: FileType
    active: boolean = false
    time !: string

    getSize() {
        return formatBytes(this.size)
    }

    getImg() {
        switch (this.type) {
            case FileType.DIR:
            case FileType.UP:
                return require('@/assets/images/icon/drive/dir.png')
            case FileType.IMG:
                return require('@/assets/images/icon/drive/img.png')
            case FileType.TXT:
                return require('@/assets/images/icon/drive/txt.png')
            case FileType.PDF:
                return require('@/assets/images/icon/drive/pdf.png')
            case FileType.MD:
                return require('@/assets/images/icon/drive/md.png')
            case FileType.LOCK:
                return require('@/assets/images/icon/drive/lock.png')
            case FileType.PERSON:
                return require('@/assets/images/icon/drive/person.png')
        }
    }
}

export enum FileType {
    DIR,
    IMG,
    PDF,
    TXT,
    UP,
    MD,
    LOCK,
    PERSON,
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' Bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
    else return (bytes / 1073741824).toFixed(2) + ' GB'
}