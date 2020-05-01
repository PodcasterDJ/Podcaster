<template>
    <div>
        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
                <b-card-body title="Horizontal Card">
                    <b-badge>New</b-badge>
                    <b-card-text>
                        This is a wider card with supporting text as a natural
                        lead-in to additional content. This content is a little
                        bit longer.
                        <h2></h2>
                    </b-card-text>
                    <b-row>
                        <b-col md="8">
                            <audio
                                controls
                                :style="{ width: '100%' }"
                                class="p-2"
                            >
                                <source src="horse.ogg" type="audio/ogg" />
                                <source src="horse.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </b-col>
                        <b-col md="4">
                            <div class="text-center">
                                <b-button variant="primary">
                                    Notifications
                                    <b-badge variant="light">4</b-badge>
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-card-body>
            </b-row>
        </b-card>
    </div>
</template>

<script></script>
