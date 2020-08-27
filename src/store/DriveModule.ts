import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'
import {DriveSpace, File, FileType} from '@/store/model/File'
import {driveListFilesService, driveUploadByHashService} from '@/service/DriveService'
import {formatDate} from '@/common/DateUtil'

@Module({
    dynamic: true,
    name   : 'DriveModule',
    store
})
class DriveModulePrivate extends VuexModule {

    @Action
    getDriveListFiles(params: { parentId: string | null, space: DriveSpace }) {
        return new Promise(((resolve: (fileList: File[]) => void, reject) => {
            driveListFilesService(params).then(res => {
                let fileList = Array<File>()
                res.data.driveListFiles.forEach((item: any) => {
                    let fileName = item.fullName[item.fullName.length - 1]
                    let file = new File()
                    file.type = file.getType(fileName)
                    file.id = item.id
                    file.name = fileName
                    file.hash = item.hash
                    file.info = item.info
                    file.time = formatDate(item.updatedAt)
                    fileList.push(file)
                })
                console.log("getDriveListFiles",fileList)
                resolve(fileList)
            }).catch(error => reject(error))
        }))
    }

    @Action
    driveUploadByHash(param: {
        fullName: string[],
        hash: string,
        space: DriveSpace,
    }) {
        return new Promise(((resolve, reject) => {
            driveUploadByHashService(param).then(res => {
                console.log(res)
            }).catch(error => reject(error))
        }))
    }
}

export const DriveModule = getModule(DriveModulePrivate)