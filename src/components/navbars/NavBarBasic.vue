<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="tertiary"
        sticky="true"
        fixed="top"
    >
        <b-navbar-brand to="/home" class="m-2">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/posts-list" class="m-2">Posts</b-nav-item>
                <b-nav-item to="/blog-overview" class="m-2"
                    >Dashboard</b-nav-item
                >
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="/user-profile-lite"
                        >Profile</b-dropdown-item
                    >
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "NavbarBasic"
};
</script>
