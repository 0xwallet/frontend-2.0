import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'

@Module({
    dynamic: true,
    name   : 'SearchModulePrivate',
    store
})
class SearchModulePrivate extends VuexModule {

    searchModalShow = false

    @Mutation
    showSearchModal(show: boolean) {
        this.searchModalShow = show
    }

}

export const SearchModule = getModule(SearchModulePrivate)