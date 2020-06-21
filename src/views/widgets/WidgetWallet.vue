<template>
    <CRow>
        <CCol sm="6" lg="3">
            <CWidgetDropdown color="gradient-warning" header="9.823 BSV" text="0A95 2314 6789 EEEF">
                <template #default>
                    <CDropdown
                            color="transparent p-0"
                            placement="bottom-end"
                    >
                        <template #toggler-content>
                            <CIcon name="cil-settings"/>
                        </template>
                        <CDropdownItem>Deposit</CDropdownItem>
                        <CDropdownItem>Withdraw</CDropdownItem>
                        <CDropdownItem>Transfer</CDropdownItem>
                    </CDropdown>
                </template>

                <template #footer>
                    <CChartBarSimple
                            class="mt-3 mx-3"
                            style="height:70px"
                            background-color="rgba(255, 255, 255,.5)"
                            label="Members"
                            labels="months"
                    />
                </template>
            </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetDropdown color="gradient-primary" header="9.823 USD" text="0A95 2314 6789 EEEF">
                <template #default>
                    <CDropdown
                            color="transparent p-0"
                            placement="bottom-end"
                    >
                        <template #toggler-content>
                            <CIcon name="cil-settings"/>
                        </template>
                        <CDropdownItem>Deposit</CDropdownItem>
                        <CDropdownItem>Withdraw</CDropdownItem>
                        <CDropdownItem>Transfer</CDropdownItem>
                    </CDropdown>
                </template>

                <template #footer>
                    <CChartBarSimple
                            class="mt-3 mx-3"
                            style="height:70px"
                            background-color="rgba(255, 255, 255,.5)"
                            label="Members"
                            labels="months"
                    />
                </template>
            </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetDropdown color="gradient-danger" header="9.823 CNY" text="0A95 2314 6789 EEEF">
                <template #default>
                    <CDropdown
                            color="transparent p-0"
                            placement="bottom-end"
                    >
                        <template #toggler-content>
                            <CIcon name="cil-settings"/>
                        </template>
                        <CDropdownItem>Deposit</CDropdownItem>
                        <CDropdownItem>Withdraw</CDropdownItem>
                        <CDropdownItem>Transfer</CDropdownItem>
                    </CDropdown>
                </template>

                <template #footer>
                    <CChartBarSimple
                            class="mt-3 mx-3"
                            style="height:70px"
                            background-color="rgba(255, 255, 255,.5)"
                            label="Members"
                            labels="months"
                    />
                </template>
            </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetDropdown color="gradient-success" header="9.823 GRAM" text="0A95 2314 6789 EEEF">
                <template #default>
                    <CDropdown
                            color="transparent p-0"
                            placement="bottom-end"
                    >
                        <template #toggler-content>
                            <CIcon name="cil-settings"/>
                        </template>
                        <CDropdownItem>Deposit</CDropdownItem>
                        <CDropdownItem>Withdraw</CDropdownItem>
                        <CDropdownItem>Transfer</CDropdownItem>
                    </CDropdown>
                </template>

                <template #footer>
                    <CChartBarSimple
                            class="mt-3 mx-3"
                            style="height:70px"
                            background-color="rgba(255, 255, 255,.5)"
                            label="Members"
                            labels="months"
                    />
                </template>
            </CWidgetDropdown>
        </CCol>
    </CRow>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import CChartBarSimple from '../charts/ChartBarSimple.vue'

    @Component({
        components: {CChartBarSimple}
    })
    export default class WidgetWallet extends Vue {

    }
</script>

<style scoped>

</style>