<template>
    <el-row>
        <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 m-4"
        >
            <b-card-text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>

        <el-col
            v-for="(o, index) in 2"
            :key="o"
            :span="8"
            :offset="index > 0 ? 2 : 0"
        >
            <el-card :body-style="{ padding: '0px' }">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                />
                <div style="padding: 14px;">
                    <span>Yummy hamburger</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button"
                            >Operating</el-button
                        >
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "TestingPage"
};
</script>
