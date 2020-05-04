<template>
    <b-row class="col-8 offset-2">
        <el-col style="width: inherit" :span="12" class="text-center">
            <div class="sub-title">{{ formdata.label }}</div>
            <el-autocomplete
                v-model="state1"
                class="inline-input"
                :fetch-suggestions="querySearch"
                :placeholder="formdata.placeholder"
                @select="handleSelect"
            ></el-autocomplete>
        </el-col>
    </b-row>
</template>
<script>
export default {
    props: ["formdata"],
    data() {
        return {
            links: [],
            state1: "",
            state2: ""
        };
    },
    created() {
        console.log("Created", this.formdata);
    },
    mounted() {
        this.links = this.loadAll();
        console.log("mounted", this.formdata);
    },
    methods: {
        querySearch(queryString, cb) {
            var links = this.links;
            var results = queryString
                ? links.filter(this.createFilter(queryString))
                : links;
            // call callback function to return suggestions
            cb(results);
        },
        createFilter(queryString) {
            return link => {
                return (
                    link.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        loadAll() {
            return this.formdata.listOfElements;
        },
        handleSelect(item) {
            // console.log("from child", item);
            // Event must be called identically like action
            this.$emit("select", item);
        }
    }
};
</script>
