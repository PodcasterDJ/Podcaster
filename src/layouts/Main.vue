<template>
    <d-container>
        <NavBarBasic></NavBarBasic>
        <!-- Content -->
        <slot />
    </d-container>
</template>

<script>
import NavBarBasic from "../components/navbars/NavBarBasic";

export default {
    name: "Main",
    components: {
        NavBarBasic
    },
    data() {
        return {};
    }
};
</script>
