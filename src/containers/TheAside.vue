<template>
    <CSidebar
            aside
            :show="$store.state.asideShow"
            @update:show="(val) => $store.commit('set', ['asideShow', val])"
            colorScheme="light"
            overlaid
            size="lg"
    >
        <CSidebarClose @click.native="$store.commit('toggle', 'asideShow')"/>
        <CTabs tabs class="nav-underline nav-underline-primary">
            <CTab active>
                <template slot="title">
                    <CIcon name="cil-list"/>
                </template>
                <CListGroup class="list-group-accent">
                    <CListGroupItem
                            class="list-group-item-accent-secondary bg-light text-center
            font-weight-bold text-muted text-uppercase small"
                    >
                        Today
                    </CListGroupItem>
                    <CListGroupItem
                            href="#"
                            class="list-group-item-accent-warning list-group-item-divider"
                    >
                        <div class="c-avatar float-right">
                            <img
                                    class="c-avatar-img"
                                    src="img/avatars/7.jpg"
                            >
                        </div>
                        <div>Meeting with
                            <strong>Lucas</strong>
                        </div>
                        <small class="text-muted mr-3">
                            <CIcon name="cil-calendar"/>&nbsp;&nbsp;1 - 3pm
                        </small>
                        <small class="text-muted">
                            <CIcon name="cil-location-pin"/>&nbsp;&nbsp;Palo Alto, CA
                        </small>
                    </CListGroupItem>
                    <hr class="transparent mx-3 my-0">
                    <CListGroupItem
                            class="list-group-item-accent-secondary bg-light text-center
            font-weight-bold text-muted text-uppercase small"
                    >
                        Tomorrow
                    </CListGroupItem>
                    <CListGroupItem
                            href="#"
                            class="list-group-item-accent-danger list-group-item-divider"
                    >
                        <div>New UI Project - <strong>deadline</strong>
                        </div>
                        <small class="text-muted mr-3">
                            <CIcon name="cil-calendar"/>&nbsp;&nbsp;10 - 11pm
                        </small>
                        <small class="text-muted">
                            <CIcon name="cil-home"/>&nbsp;&nbsp;creativeLabs HQ
                        </small>
                    </CListGroupItem>
                </CListGroup>
            </CTab>
            <CTab>
                <template slot="title">
                    <CIcon name="cil-speedometer"/>
                </template>
                <CListGroup class="list-group-accent">
                    <CListGroupItem v-if="isUploading">
                        <div style="display: flex">
                            <div style="flex: 1">
                                <div>
                                    {{ uploadFileName }}
                                </div>
                                <div style="color: #999999">
                                    {{ uploadSpeed }}
                                </div>
                            </div>
                            <div style="margin-top: 10px">
                                {{ uploadProgress }} %
                            </div>
                        </div>
                    </CListGroupItem>
                </CListGroup>
            </CTab>
            <CTab>
                <template slot="title">
                    <CIcon name="cil-speech"/>
                </template>
                <div class="p-3">
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar">
                                <img
                                        src="img/avatars/7.jpg"
                                        class="c-avatar-img"
                                >
                                <span class="bg-success c-avatar-status"></span>
                            </div>
                        </div>
                        <div>
                            <small class="text-muted">Lukasz Holeczek</small>
                            <small class="text-muted float-right mt-1">1:52 PM</small>
                        </div>
                        <div class="text-truncate font-weight-bold">
                            Lorem ipsum dolor sit amet
                        </div>
                        <small class="text-muted">{{lorem}}</small>
                    </div>
                    <hr>
                </div>
            </CTab>
            <CTab>
                <template slot="title">
                    <CIcon name="cil-settings"/>
                </template>
                <div class="p-3">
                    <h6>Settings</h6>
                    <div>
                        <div class="clearfix mt-4">
                            <small><b>Option 1</b></small>
                            <CSwitch
                                    color="success"
                                    labelOn="On"
                                    labelOff="Off"
                                    shape="pill"
                                    size="sm"
                                    class="float-right"
                                    checked
                            />
                        </div>
                        <div>
                            <small class="text-muted">

                            </small>
                        </div>
                    </div>
                    <div>
                        <div class="clearfix mt-3">
                            <small><b>Option 2</b></small>
                            <CSwitch
                                    color="success"
                                    labelOn="On"
                                    labelOff="Off"
                                    shape="pill"
                                    size="sm"
                                    class="float-right"
                            />
                        </div>
                        <div>
                            <small class="text-muted">{{lorem}}</small>
                        </div>
                    </div>
                    <div>
                        <div class="clearfix mt-3">
                            <small><b>Option 3</b></small>
                            <CSwitch
                                    color="success"
                                    labelOn="On"
                                    labelOff="Off"
                                    shape="pill"
                                    size="sm"
                                    class="float-right"
                                    disabled
                                    checked
                            />
                        </div>
                        <div>
                            <small class="text-muted">Disabled option.</small>
                        </div>
                    </div>
                    <div>
                        <div class="clearfix mt-3">
                            <small><b>Option 4</b></small>
                            <CSwitch
                                    color="success"
                                    labelOn="On"
                                    labelOff="Off"
                                    shape="pill"
                                    size="sm"
                                    class="float-right"
                                    checked
                            />
                        </div>
                    </div>
                    <hr>
                    <h6>System Utilization</h6>
                    <system-utilization-component></system-utilization-component>
                </div>
            </CTab>
        </CTabs>
    </CSidebar>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import SystemUtilizationComponent from '@/components/SystemUtilizationComponent.vue'
    import {NknModule} from '@/store/NknModule'

    @Component({
        components: {SystemUtilizationComponent}
    })
    export default class TheAside extends Vue {
        lorem = 'Lorem ipsum doliusmod tempor incididunt ut labore et dolore magna aliqua.'

        get isUploading(): boolean {
            return NknModule.isUploading
        }

        get uploadProgress(): string {
            return NknModule.uploadProgress.toFixed(0)
        }

        get uploadSpeed(): string {
            return NknModule.uploadSpeed
        }

        get uploadFileName(): string {
            return NknModule.uploadFileName
        }
    }
</script>
