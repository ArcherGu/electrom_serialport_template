<template>
    <el-card class="box-card">
        串口:
        <el-select
            v-model="selectedPort"
            placeholder="请选择串口"
            :disabled="isOpen"
        >
            <el-option
                v-for="port in portList"
                :key="port"
                :label="port"
                :value="port"
            >
            </el-option>
        </el-select>

        <el-divider direction="vertical"></el-divider>

        <el-button
            :type="isOpen? 'danger' : 'success'"
            @click="changeOpenState"
        >
            {{ isOpen? '关闭串口' : '打开串口'}}
        </el-button>

        <el-divider direction="vertical"></el-divider>

        串口状态:

        <el-tag
            v-if="isOpen"
            type="success"
            effect="plain"
        >
            <i class="el-icon-circle-check"></i> 已开启
        </el-tag>

        <el-tag
            v-else
            type="danger"
            effect="plain"
        >
            <i class="el-icon-circle-close"></i> 已关闭
        </el-tag>

    </el-card>
</template>

<script>
import {
    getSerialPortList,
    getSerialPortStatus,
    openOrCloseSerialPort,
} from "@/api/method";

export default {
    name: "SerialPort",
    components: {},
    props: {},
    data() {
        return {
            portList: [],
            selectedPort: "",
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            try {
                const statusRep = await getSerialPortStatus();

                this.$store.commit("setPortStatus", statusRep.data.isOpen);

                const listRep = await getSerialPortList();
                this.portList = [...listRep.data];

                this.selectedPort = this.isOpen
                    ? statusRep.data.port
                    : this.portList.length > 0
                    ? this.portList[0]
                    : "";
            } catch (error) {
                console.log(error);
            }
        },

        changeOpenState() {
            const data = {
                isOpen: !this.isOpen,
                port: this.selectedPort,
            };

            openOrCloseSerialPort(data)
                .then((response) => {
                    if (response.data == "SUCCESS") {
                        this.$store.commit("setPortStatus", !this.isOpen);
                        this.$message({
                            type: this.isOpen ? "success" : "warning",
                            message: this.isOpen
                                ? `${this.selectedPort}串口打开成功`
                                : `${this.selectedPort}串口已经关闭`,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    computed: {
        isOpen() {
            return this.$store.state.isOpen;
        },
    },
};
</script>

<style>
</style>