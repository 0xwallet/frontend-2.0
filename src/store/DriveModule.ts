import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'
import {DriveSpace, File, FileType} from '@/store/model/File'
import {
    driveCreateShareService,
    driveDeleteFileService,
    driveDeleteFilesService, driveFindShareService,
    driveListFilesService, driveListSharesService, driveMakeDirService, driveMoveFileService,
    driveUploadByHashService
} from '@/service/DriveService'
import {formatDate} from '@/common/DateUtil'
import {CommonModule} from '@/store/CommonModule'
import {ToastColor} from '@/store/model/Toast'

@Module({
    dynamic: true,
    name   : 'DriveModule',
    store
})
class DriveModulePrivate extends VuexModule {

    currentId = 'root'

    @Mutation
    setCurrentId(id: string) {
        this.currentId = id
        console.log('currentId', this.currentId)
    }

    @Action
    getDriveListFiles(params: { dirFullName?: string[], dirId?: string, space: DriveSpace }) {
        return new Promise(((resolve: (fileList: File[]) => void, reject) => {
            driveListFilesService(params).then(res => {
                let fileList = Array<File>()
                res.data.driveListFiles.forEach((item: any, index: number) => {
                    if (index == 0) {
                        // let fileName = '..'
                        // let file = new File()
                        // file.type = FileType.UP
                        // file.id = item.id
                        // file.name = fileName
                        // file.hash = item.hash
                        // file.info = item.info
                        // file.time = ''
                        // fileList.push(file)
                        // this.setCurrentId(item.id)
                    } else if (index == 1) {
                        // console.log(item)
                    } else {
                        let fileName = item.fullName[item.fullName.length - 1]
                        let file = new File()
                        file.type = item.isDir ? FileType.DIR : file.getType(fileName)
                        file.id = item.id
                        file.name = fileName
                        file.hash = item.hash
                        file.info = item.info
                        file.isDir = item.isDir
                        file.fullName = item.fullName
                        file.insertedAt = item.insertedAt
                        file.space = item.space
                        file.time = formatDate(item.updatedAt)
                        fileList.push(file)
                    }
                })
                resolve(fileList)
            }).catch(error => reject(error))
        }))
    }

    @Action
    driveUploadByHash(param: {
        fullName: string[],
        hash: string,
        space: DriveSpace,
        description: string
    }) {
        return new Promise(((resolve, reject) => {
            driveUploadByHashService(param).then(res => {
                console.log(res)
                resolve()
            }).catch(error => reject(error))
        }))
    }


    @Action
    driveDeleteFile(param: {
        id: string,
        space: DriveSpace,
    }) {
        return new Promise(((resolve, reject) => {
            driveDeleteFileService(param).then(() => {
                CommonModule.toast({content: 'delete successful', color: ToastColor.SUCCESS})
                resolve()
            }).catch(error => reject(error))
        }))
    }

    @Action
    driveDeleteFiles(param: {
        ids: string[],
        space: DriveSpace,
    }) {
        return new Promise(((resolve, reject) => {
            driveDeleteFilesService(param).then(() => {
                CommonModule.toast({content: 'delete successful', color: ToastColor.SUCCESS})
                resolve()
            }).catch(error => reject(error))
        }))
    }

    @Action
    driveMoveFile(params: {
        fromId: string,
        toId: string,
    }) {
        return driveMoveFileService(params)
    }


    @Action
    createShare(params: {
        code: string,
        userFileId: string
    }) {
        return driveCreateShareService(params)
    }


    @Action
    findShare(params: {
        code: string,
        uri: string
    }) {
        return driveFindShareService(params)
    }

    @Action
    driveListShares() {
        return driveListSharesService()
    }

    @Action
    driveMakeDir(params: {
        fullName: string[],
        space: DriveSpace
    }) {
        return driveMakeDirService(params)
    }
}

export const DriveModule = getModule(DriveModulePrivate)