    jQuery(document).ready(function ($) {
        var settings_ap = {
            disable_volume: 'off',
            disable_scrub: 'default',
            design_skin: 'skin-wave',
            skinwave_dynamicwaves: 'on',
            google_analytics_send_play_event: 'on'
        };
        dzsag_init('#ag1', {
            'transition': 'fade',
            'autoplay': 'off',
            'settings_ap': settings_ap,
            google_analytics_send_play_event: "on"

        });
    });

