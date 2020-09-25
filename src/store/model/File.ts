import {UserModule} from '@/store/UserModule'
import {User} from '@/store/model/User'

export class File {
    id!: string
    name !: string
    hash !: string
    type !: FileType
    active: boolean = false
    space ?: DriveSpace
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
        return File.getImg(this.type)
    }

    static getImg(type: FileType) {
        switch (type) {
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
        return File.getType(name)
    }

    static getType(name: string): FileType {
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

    static getName(file: File) {
        return file.fullName![file.fullName!.length - 1]
    }

    getPreviewUrl(): string {
        return File.getPreviewUrl(this)
    }

    static getPreviewUrl(file: File, token ?: string, userId ?: string): string {
        return 'https://drive-s.owaf.io/preview/' + (userId ?? UserModule.userInfo.id) + '/' + file.space!.toLowerCase() + '/' + file.id + '/' + File.getName(file)
            + '?token=' + (token ? token : UserModule.drivePreviewToken)
    }

    getDownloadUrl(): string {
        return File.getDownloadUrl(this)
    }

    static getDownloadUrl(file: File, token ?: string, userId ?: string): string {
        return 'https://drive-s.owaf.io/download/' + (userId ?? UserModule.userInfo.id) + '/' + file.space!.toLowerCase() + '/' + file.id + '/' + File.getName(file)
            + '?token=' + (token ? token : UserModule.drivePreviewToken)
    }

}

export enum DriveSpace {
    PRIVATE = 'PRIVATE',
    PUBLIC  = 'PUBLIC'
}

export class DriveUserFileInfo {
    size !: number
    description ?: string
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

export class DriveUserShare {
    id !: string
    uri !: string
    token !: string
    expiredAt !: string
    user !: User
    userFile !: File
}

export { formatBytes }