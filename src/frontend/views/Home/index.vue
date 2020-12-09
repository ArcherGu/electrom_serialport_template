<template>
    <div class="home">
        <serial-port />
    </div>
</template>

<script>
import SerialPort from "./components/SerialPort";

export default {
    name: "Home",
    components: {
        SerialPort,
    },
    props: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    computed: {},
};
</script>

<style lang="scss">
.home {
    padding: 20px;
}
</style>