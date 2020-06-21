<template>
    <CCard>
        <CCardBody>
            <CRow>
                <CCol sm="5">
                    <h4 id="traffic" class="card-title mb-0">Traffic</h4>
                    <div class="small text-muted">November 2017</div>
                </CCol>
                <CCol sm="7" class="d-none d-md-block">
                    <CButton color="primary" class="float-right">
                        <CIcon name="cil-cloud-download"/>
                    </CButton>
                    <CButtonGroup class="float-right mr-3">
                        <CButton
                                color="outline-secondary"
                                v-for="(value, key) in ['Day', 'Month', 'Year']"
                                :key="key"
                                class="mx-0"
                                :pressed="value === selected ? true : false"
                                @click="selected = value"
                        >
                            {{value}}
                        </CButton>
                    </CButtonGroup>
                </CCol>
            </CRow>
            <MainChartExample style="height:300px;margin-top:40px;"/>
        </CCardBody>
        <CCardFooter>
            <CRow class="text-center">
                <CCol md sm="12" class="mb-sm-2 mb-0">
                    <div class="text-muted">Visits</div>
                    <strong>29.703 Users (40%)</strong>
                    <CProgress
                            class="progress-xs mt-2"
                            :precision="1"
                            color="success"
                            :value="40"
                    />
                </CCol>
                <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
                    <div class="text-muted">Unique</div>
                    <strong>24.093 Users (20%)</strong>
                    <CProgress
                            class="progress-xs mt-2"
                            :precision="1"
                            color="info"
                            :value="20"
                    />
                </CCol>
                <CCol md sm="12" class="mb-sm-2 mb-0">
                    <div class="text-muted">Pageviews</div>
                    <strong>78.706 Views (60%)</strong>
                    <CProgress
                            class="progress-xs mt-2"
                            :precision="1"
                            color="warning"
                            :value="60"
                    />
                </CCol>
                <CCol md sm="12" class="mb-sm-2 mb-0">
                    <div class="text-muted">New Users</div>
                    <strong>22.123 Users (80%)</strong>
                    <CProgress
                            class="progress-xs mt-2"
                            :precision="1"
                            color="danger"
                            :value="80"
                    />
                </CCol>
                <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
                    <div class="text-muted">Bounce Rate</div>
                    <strong>Average Rate (40.15%)</strong>
                    <CProgress
                            class="progress-xs mt-2"
                            :precision="1"
                            :value="40"
                    />
                </CCol>
            </CRow>
        </CCardFooter>
    </CCard>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainChartExample from '../charts/MainChartExample.vue'

    @Component({
        components: {
            MainChartExample
        }
    })
    export default class WidgetTokenTraffic extends Vue {

    }
</script>

<style scoped>

</style>