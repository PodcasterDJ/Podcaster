<template>
    <b-container fluid>
        <b-row
            class="mx-auto py-5 justify-content-between"
            align-v="center"
            align-h="center"
            offset="2"
        >
            <b-col offset="2" cols="8">
                <h1 class="text-center mx-auto">
                    Want to enjoy work more?
                </h1>
                <p class="lead text-center mx-auto">
                    Find new career or exceed in current one.
                </p>
                <p class="small text-center mx-auto">
                    Fill the form to get 3 suggestions
                </p>
                <div v-for="(el, index) in formdata" :key="index">
                    <MainForm :formdata="el" @select="handleSelect"></MainForm>
                </div>
                <div class="row m-3">
                    <b-button
                        variant="outline-primary"
                        size="lg"
                        lg="4"
                        class="p-2 mx-auto"
                        >Switch</b-button
                    >
                </div>
                <p class="small text-center mx-auto">
                    Or create an account to get more.
                </p>
                <div class="row m-3">
                    <b-button
                        variant="outline-secondary"
                        size="lg"
                        lg="4"
                        class="p-2 mx-auto"
                        >Register</b-button
                    >
                </div>
            </b-col>
        </b-row>
        <!-- <b-col class="mt-5 text-center justify-content-center">
            <h2>Hello World</h2>
            <p class="wizard m-4">ANd this is my paraghraph wizard text.</p>
            <p class="wizard2 p-3">
                ANd this is my paraghraph wizard text.
            </p>

            <b-btn variant="primary m-4">Primary</b-btn>
            <b-btn variant="secondary m-3">secondary</b-btn>
            <b-btn variant="tertiary p-5">tertiary</b-btn>
            <b-card
                bg-variant="tertiary"
                text-variant="white"
                header="Primary"
                class="text-center"
            >
                <b-card-text
                    >Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.</b-card-text
                >
            </b-card>
        </b-col> -->
    </b-container>
</template>

<script>
import MainForm from "../components/forms/MainForm";

export default {
    components: { MainForm },

    created() {
        this.formdata = [
            {
                label: "Hobby",
                placeholder: "One of your hobbies you prefer the most.",
                listOfElements: [
                    {
                        value: "Knitting",
                        link: "https://github.com/ElemeFE/knitting"
                    },
                    {
                        value: "Cooking",
                        link: "https://github.com/ElemeFE/cooking"
                    }
                ]
            },
            {
                label: "Job title",
                placeholder: "One of your job titles that you did in the past.",
                listOfElements: [
                    {
                        value: "Sailor",
                        link: "https://github.com/ElemeFE/knitting"
                    },
                    {
                        value: "Programmer",
                        link: "https://github.com/ElemeFE/cooking"
                    },
                    {
                        value: "Developer",
                        link: "https://github.com/ElemeFE/mint-ui"
                    },
                    {
                        value: "Magician",
                        link: "https://github.com/vuejs/vue-router"
                    }
                ]
            },
            {
                label: "Education",
                placeholder: "Studies - if you have",
                listOfElements: [
                    {
                        value: "Chemistry Bachelor",
                        link: "https://github.com/ElemeFE/knitting"
                    },
                    {
                        value: "Mathematics",
                        link: "https://github.com/ElemeFE/cooking"
                    },
                    {
                        value: "History",
                        link: "https://github.com/ElemeFE/mint-ui"
                    },
                    {
                        value: "Bussinesw",
                        link: "https://github.com/vuejs/vue-router"
                    }
                ]
            }
        ];
    },
    methods: {
        handleSelect(item) {
            console.log("from parent", item.value);
        }
    }
};
</script>
