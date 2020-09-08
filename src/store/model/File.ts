export class File {
    id!: string
    name !: string
    hash !: string
    type !: FileType
    active: boolean = false
    info !: DriveUserFileInfo
    fullName ?: string[]
    time ?: string
    insertedAt ?: string
    isDir: boolean = false
    imgIndex = -1

    getSize() {
        return formatBytes(this.info.size)
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
            default:
                return require('@/assets/images/icon/drive/unknow.png')
        }
    }

    getType(name: string): FileType {
        let nameValue = name.split('.')
        if (nameValue.length < 2) {
            return FileType.UNKNOW
        }
        switch (nameValue[nameValue.length - 1]) {
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
                return FileType.IMG
            case 'pdf':
                return FileType.PDF
            default:
                return FileType.UNKNOW
        }
    }
}

export enum DriveSpace {
    PRIVATE = 'PRIVATE',
    PUBLIC  = 'PUBLIC'
}

export class DriveUserFileInfo {
    size !: number
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
    LOADING,
    UNKNOW
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' Bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
    else return (bytes / 1073741824).toFixed(2) + ' GB'
}