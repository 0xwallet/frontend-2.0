export class File {
    id!: string
    name !: string
    hash !: string
    type !: FileType
    active: boolean = false
    info !: DriveUserFileInfo
    time !: string


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
        }
    }

    getType(name: string): FileType {
        let nameValue = name.split('.')
        switch (nameValue[nameValue.length - 1]) {
            case 'jpeg':
            case 'jpg':
            case 'png':
                return FileType.IMG
            case 'pdf':
                return FileType.PDF
            default:
                return FileType.DIR
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
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' Bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
    else return (bytes / 1073741824).toFixed(2) + ' GB'
}