<template>
    <div>
        <NavBarBasic></NavBarBasic>
        <!-- Content -->
        <slot />
    </div>
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
