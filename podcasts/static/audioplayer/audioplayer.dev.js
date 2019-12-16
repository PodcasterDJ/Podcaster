/*
 * Author: Audio Player with Playlist
 * Website: http://digitalzoomstudio.net/
 * Portfolio: http://bit.ly/nM4R6u
 * Version: 5.20
 * */

if(!(window.dzsap_init_calls)){
  window.dzsap_init_calls = [];
}
function dzsap_is_mobile(){

  // return true;
  return is_ios() || is_android_good();
}


function is_ios() {
  // return true;
  return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1));
}

function is_android(){
  return is_android_good();
}

function is_android_good() {
  //return false;
  //return true;
  var ua = navigator.userAgent.toLowerCase();

  //console.log('ua - ',ua);
  return (ua.indexOf("android") > -1);
}

function dzsap_generate_keyboard_tooltip(keyboard_controls, lab){


  // console.log('keyboard_controls - ',keyboard_controls,lab,keyboard_controls.lab);
  var fout = '<span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: auto;  white-space:nowrap;">'+'Shortcut'+': '+keyboard_controls[lab]+'</span>';
  // left: 5px;
  fout = fout.replace('32','space');
  fout = fout.replace('27','escape');

  return fout;


}
function dzsap_generate_keyboard_controls(){
  var keyboard_controls = {
    'play_trigger_step_back':'off'
    ,'step_back_amount':'5'
    ,'step_back':'37'
    ,'step_forward':'39'
    ,'sync_players_goto_next':''
    ,'sync_players_goto_prev':''
    ,'pause_play':'32'
    ,'show_tooltips':'off'
  }



  if(window.dzsap_keyboard_controls){
    // console.log('keyboard_controls - ',keyboard_controls);
    // console.log('window.dzsap_keyboard_controls - ',window.dzsap_keyboard_controls);
    keyboard_controls = jQuery.extend(keyboard_controls,window.dzsap_keyboard_controls);
  }

  keyboard_controls.step_back_amount = Number(keyboard_controls.step_back_amount);

  return keyboard_controls;
}
function htmlEncode(arg) {
  return jQuery('<div/>').text(arg).html();
}

function htmlDecode(value) {
  return jQuery('<div/>').html(arg).text();
}


var dzsap_list = []; // -- this is for the players
var dzsap_yt_list = []; // -- this is for the yt players
var dzsap_ytapiloaded = false;
var dzsap_globalidind = 20;

var dzsap_list_for_sync_players = []; // this is for next / prev buttons
var dzsap_list_for_sync_sw_built = false;
var dzsap_list_for_sync_inter_build = 0;

window.loading_multi_sharer = false;

window.dzsap_moving_playlist_item = false;
window.dzsap_playlist_con = null;
window.dzsap_playlist_item_moving = null;
window.dzsap_playlist_item_target = null;

window.dzsap_player_interrupted_by_dzsap = null;
window.dzsap_audio_ctx = null;
window.dzsap__style = null;
window.dzsap_sticktobottom_con = null;

window.dzsap_self_options = {};

window.dzsap_generating_pcm = false;
window.dzsap_box_main_con = null;
window.dzsap_lasto = null;
window.dzsap_wavesurfer_load_attempt = 0;


window.dzsap_player_index = 0; // -- the player index on the page



function register_dzsap_plugin(){
  (function($) {




    window.dzsap_list_for_sync_build = function() {


    };

    Math.easeOutQuart = function(t, b, c, d) {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    };
    Math.easeOutQuad = function(t, b, c, d) {
      return -c * t / d * (t / d - 2) + b;
    };
    Math.easeIn = function(t, b, c, d) {
      // console.log('math.easein')

      return -c *(t/=d)*(t-2) + b;

    };
    Math.easeOutQuad = function(t, b, c, d) {
      return -c * t / d * (t / d - 2) + b;
    };
    Math.easeOutQuad_rev = function(t, b, c, d) {
      // t /= d;
      return (c * d + d * Math.sqrt(c * (c + b - t))) / c;
    };


    var svg_play_icon = '<svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>  ';

    var svg_heart_icon = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15"  viewBox="0 0 645 700" id="svg2"> <defs id="defs4" /> <g id="layer1"> <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="" /> <g transform="translate(129.28571,-64.285714)" id="g2221" /> </g> </svg> ';
    var svg_arrow_resize = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g><path d="M328.906,401.994h-36.553V109.636h36.553c4.948,0,9.236-1.809,12.847-5.426c3.613-3.615,5.421-7.898,5.421-12.845 c0-4.949-1.801-9.231-5.428-12.851l-73.087-73.09C265.044,1.809,260.76,0,255.813,0c-4.948,0-9.229,1.809-12.847,5.424 l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.845c3.619,3.617,7.901,5.426,12.85,5.426 h36.545v292.358h-36.542c-4.952,0-9.235,1.808-12.85,5.421c-3.617,3.621-5.424,7.905-5.424,12.854 c0,4.945,1.807,9.227,5.424,12.847l73.089,73.088c3.617,3.617,7.898,5.424,12.847,5.424c4.95,0,9.234-1.807,12.849-5.424 l73.087-73.088c3.613-3.62,5.421-7.901,5.421-12.847c0-4.948-1.808-9.232-5.421-12.854 C338.142,403.802,333.857,401.994,328.906,401.994z" fill="#363636"/> </g></svg>';


    var svg_share_icon = '<svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g> <path d="M506.206,179.012L360.025,32.834c-3.617-3.617-7.898-5.426-12.847-5.426s-9.233,1.809-12.847,5.426 c-3.617,3.619-5.428,7.902-5.428,12.85v73.089h-63.953c-135.716,0-218.984,38.354-249.823,115.06C5.042,259.335,0,291.03,0,328.907 c0,31.594,12.087,74.514,36.259,128.762c0.57,1.335,1.566,3.614,2.996,6.849c1.429,3.233,2.712,6.088,3.854,8.565 c1.146,2.471,2.384,4.565,3.715,6.276c2.282,3.237,4.948,4.859,7.994,4.859c2.855,0,5.092-0.951,6.711-2.854 c1.615-1.902,2.424-4.284,2.424-7.132c0-1.718-0.238-4.236-0.715-7.569c-0.476-3.333-0.715-5.564-0.715-6.708 c-0.953-12.938-1.429-24.653-1.429-35.114c0-19.223,1.668-36.449,4.996-51.675c3.333-15.229,7.948-28.407,13.85-39.543 c5.901-11.14,13.512-20.745,22.841-28.835c9.325-8.09,19.364-14.702,30.118-19.842c10.756-5.141,23.413-9.186,37.974-12.135 c14.56-2.95,29.215-4.997,43.968-6.14s31.455-1.711,50.109-1.711h63.953v73.091c0,4.948,1.807,9.232,5.421,12.847 c3.62,3.613,7.901,5.424,12.847,5.424c4.948,0,9.232-1.811,12.854-5.424l146.178-146.183c3.617-3.617,5.424-7.898,5.424-12.847 C511.626,186.92,509.82,182.636,506.206,179.012z" fill="#696969"/> </g></svg> ';



    var svg_preloader_code = ' <svg class="loading-svg" width="30" height="30" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> </g> </svg> ';
    var svg_volume_static = ' <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg> ';
    var svg_embed_button = ' <svg class="svg-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10.975px" height="14.479px" viewBox="0 0 10.975 14.479" enable-background="new 0 0 10.975 14.479" xml:space="preserve"> <g> <path d="M2.579,1.907c0.524-0.524,1.375-0.524,1.899,0l4.803,4.804c0.236-0.895,0.015-1.886-0.687-2.587L5.428,0.959 c-1.049-1.05-2.75-1.05-3.799,0L0.917,1.671c-1.049,1.05-1.049,2.751,0,3.801l3.167,3.166c0.7,0.702,1.691,0.922,2.587,0.686 L1.867,4.52c-0.524-0.524-0.524-1.376,0-1.899L2.579,1.907z M5.498,13.553c1.05,1.05,2.75,1.05,3.801,0l0.712-0.713 c1.05-1.05,1.05-2.75,0-3.8L6.843,5.876c-0.701-0.7-1.691-0.922-2.586-0.686l4.802,4.803c0.524,0.525,0.524,1.376,0,1.897 l-0.713,0.715c-0.523,0.522-1.375,0.522-1.898,0L1.646,7.802c-0.237,0.895-0.014,1.886,0.686,2.586L5.498,13.553z"/> </g> </svg> ';



    var playbtn_svg = '<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M24.156,13.195L2.406,0.25C2.141,0.094,1.867,0,1.555,0C0.703,0,0.008,0.703,0.008,1.562H0v26.875h0.008 C0.008,29.297,0.703,30,1.555,30c0.32,0,0.586-0.109,0.875-0.266l21.727-12.93C24.672,16.375,25,15.727,25,15 S24.672,13.633,24.156,13.195z"/> </svg>';
    var pausebtn_svg = '<svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M9.812,29.7c0,0.166-0.178,0.3-0.398,0.3H2.461c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> <path d="M23.188,29.7c0,0.166-0.178,0.3-0.398,0.3h-6.953c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> </svg>';



    function hexToRgb(hex, palpha) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var str = '';
      if (result) {
        result = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };



        var alpha = 1;

        if (palpha) {
          alpha = palpha;
        }



        str = 'rgba(' + result.r + ',' + result.g + ',' + result.b + ',' + alpha + ')';
      }


      // console.log('hexToRgb ( hex - '+hex+' ) result ', str);

      return str;


    }



    $.fn.prependOnce = function(arg, argfind) {
      var _t = $(this) // It's your element


      //        console.log(argfind);
      if (typeof(argfind) == 'undefined') {
        var regex = new RegExp('class="(.*?)"');
        var auxarr = regex.exec(arg);


        if (typeof auxarr[1] != 'undefined') {
          argfind = '.' + auxarr[1];
        }
      }


      // we compromise chaining for returning the success
      if (_t.children(argfind).length < 1) {
        _t.prepend(arg);
        return true;
      } else {
        return false;
      }
    };
    $.fn.appendOnce = function(arg, argfind) {
      var _t = $(this) // It's your element


      if (typeof(argfind) == 'undefined') {
        var regex = new RegExp('class="(.*?)"');
        var auxarr = regex.exec(arg);


        if (typeof auxarr[1] != 'undefined') {
          argfind = '.' + auxarr[1];
        }
      }
      // we compromise chaining for returning the success
      if (_t.children(argfind).length < 1) {
        _t.append(arg);
        return true;
      } else {
        return false;
      }
    };



    // -- define player here
    $.fn.audioplayer = function(o) {
      var defaults = {
        design_skin: 'skin-default' // -- the skin of the player - can be set from the html as well
        ,autoplay: 'off' // -- autoplay the track ( only works is cue is set to "on"
        ,call_from: 'default' // -- call from a specific api
        ,autoplay_on_scrub_click: 'off' // -- autoplay the track ( only works is cue is set to "on"
        ,cue: 'on' // this chooses wheter "on" or not "off" a part .. what part is decided by the preload_method below
        ,preload_method: 'metadata' // -- "none" or "metadata" or "auto" ( whole track )
        ,loop: 'off' // -- loop the track
        ,swf_location: "ap.swf" // -- the location of the flash backup
        ,swffull_location: "apfull.swf" // -- the location of the flash backup
        ,settings_backup_type: 'light' // == light or full

        , settings_extrahtml: '' // -- some extra html - can be rates, plays, likes
        ,settings_extrahtml_after_artist: '' // -- some extra html after the artist
        ,settings_extrahtml_in_float_left: '' // -- some extra html that you may want to add inside the player, to the right
        , settings_extrahtml_in_float_right: '' // -- some extra html that you may want to add inside the player, to the right -- .extra-html-in-controls-right
        , settings_extrahtml_before_play_pause: '' // -- some extra html that you may want before play button
        , settings_extrahtml_after_play_pause: '' // -- some extra html that you may want after play button

        ,settings_trigger_resize: '0' // -- check the player dimensions every x milli seconds
        , design_thumbh: "default" //thumbnail size
        ,design_thumbw: "200" // -- thumb width
        ,extra_classes_player: ''
        ,disable_volume: 'default'
        ,disable_scrub: 'default'
        ,disable_timer: 'default' // -- disable timer display
        ,disable_player_navigation: 'off'
        ,scrub_show_scrub_time: 'on'
        ,player_navigation: 'default' // -- auto decide if we need player navigation
        ,type: 'audio'
        ,enable_embed_button: 'off' // -- enable the embed button
        ,embed_code: '' // -- embed code
        ,skinwave_dynamicwaves: 'off' // -- dynamic scale based on volume for no spectrum wave
        ,soundcloud_apikey: '' // -- set the sound cloud api key
        ,parentgallery: null // -- the parent gallery of the player
        ,skinwave_enableSpectrum: 'off' // off or on
        ,skinwave_enableReflect: 'on'  // -- (deprecated)
        ,skinwave_place_thumb_after_volume: 'off' // -- place the thumbnail after volume button
        ,skinwave_place_metaartist_after_volume: 'off' // -- place metaartist after volume button
        ,settings_useflashplayer: 'auto' // off or on or auto
        ,skinwave_spectrummultiplier: '1' // -- (deprecated) number
        ,settings_php_handler: '' // -- the path of the publisher.php file, this is used to handle comments, likes etc.
        ,php_retriever: 'soundcloudretriever.php' // -- the soundcloud php file used to render soundcloud files
        ,skinwave_mode: 'normal' // --- "normal" or "small" or "alternate"
        ,skinwave_wave_mode: 'canvas' // --- "normal" or "canvas" or "line"
        ,skinwave_wave_mode_canvas_mode: 'normal' // --- "normal" or "reflecto"
        ,skinwave_wave_mode_canvas_normalize: 'on' // --- normalize wave to look more natural
        ,skinwave_wave_mode_canvas_waves_number: '3' // --- the number of waves in the canvas
        ,skinwave_wave_mode_canvas_waves_padding: '1' // --- padding between waves
        ,skinwave_wave_mode_canvas_reflection_size: '0.25' // --- the reflection size

        ,pcm_data_try_to_generate: 'off' // --- try to find out the pcm data and sent it via ajax ( maybe send it via php_handler
        ,pcm_data_try_to_generate_wait_for_real_pcm: 'off' // --- if set to on, the fake pcm data will not be generated
        ,pcm_notice: 'off' // --- show a notice for pcm
        ,notice_no_media: 'on' // --- show a notice for pcm

        ,skinwave_comments_links_to: '' // -- clicking the comments bar will lead to this link ( optional )
        ,skinwave_comments_enable: 'off' // -- enable the comments, publisher.php must be in the same folder as this html
        // ,skinwave_comments_mode: 'inner-field' // -- inner-field or outer-field ( no use right now )
        ,skinwave_comments_mode_outer_selector: '' // -- the outer selector if it has one
        ,skinwave_comments_playerid: '',
        skinwave_comments_account: 'none',
        skinwave_comments_process_in_php: 'on' // -- select wheter the comment text should be processed in javascript "off" / or in php, later "on"
        ,mobile_delete: "off" // -- delete the whole player on mobile, useful for unwanted footer players in mobile
        ,footer_btn_playlist: "off" // -- disable feeding to other players on mobile
        ,mobile_disable_fakeplayer: "off" // -- disable feeding to other players on mobile
        ,skinwave_comments_retrievefromajax: 'off' // --- retrieve the comment form ajax
        ,skinwave_preloader_code: 'default' // --- retrieve the comment form ajax
        ,skinwave_comments_displayontime: 'on' // --- display the comment when the scrub header is over it
        ,skinwave_comments_avatar: 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=20' // -- default image
        ,skinwave_comments_allow_post_if_not_logged_in: 'on' // -- allow posting in comments section if not looged in, to be logged in, skinwave_comments_account must be an account id

        ,skinwave_timer_static: 'off'
        , default_volume: 'default' // -- number / set the default volume 0-1 or "last" for the last known volume
        , volume_from_gallery: '' // -- the volume set from the gallery item select, leave blank if the player is not called from the gallery
        ,design_menu_show_player_state_button: 'off' // -- show a button that allows to hide or show the menu
        ,
        playfrom: 'off' //off or specific number of settings or set to "last"
        ,design_animateplaypause: 'default'
        ,embedded: 'off' // // -- if embedded in a iframe
        ,embedded_iframe_id: '' // // -- if embedded in a iframe, specify the iframe id here
        ,sample_time_start: '' // --- if this is a sample to a complete song, you can write here start times, if not, leave to 0.
        ,sample_time_end: '' // -- if this is a sample to a complete song, you can write here start times, if not, leave to 0.
        ,sample_time_total: '' // -- if this is a sample to a complete song, you can write here start times, if not, leave to 0.
        ,
        google_analytics_send_play_event: 'off' // -- send the play event to google analytics, you need to have google analytics script already on your page
        ,fakeplayer: null // -- if this is a fake player, it will feed
        ,failsafe_repair_media_element: '' // -- some scripts might effect the media element used by zoomsounds, this is how we replace the media element in a certain time
        ,action_audio_play: null // -- set a outer play function ( for example for tracking your analytics )
        ,action_audio_play2: null // -- set a outer play function ( for example for tracking your analytics )
        ,action_audio_pause: null // -- set a outer play function ( for example for tracking your analytics )
        ,action_audio_end: null // -- set a outer ended function ( for example for tracking your analytics )
        ,action_audio_comment: null // -- set a outer commented function ( for example for tracking your analytics )
        ,action_received_time_total: null // -- event triggers at receiving time total
        ,action_audio_change_media: null // -- set a outer on change track function
        ,action_audio_loaded_metadata: null // -- set a outer commented function ( for example for tracking your analytics )
        ,action_video_contor_60secs: null // -- fire every 30s
        ,type_audio_stop_buffer_on_unfocus: 'off' // -- if set to on, when the audio player goes out of focus, it will unbuffer the file so that it will not load anymore, useful if you want to stop buffer on large files
        ,construct_player_list_for_sync: 'off' // -- construct a player list from the page that features single players playing one after another. searches for the .is-single-player class in the DOM


        , settings_exclude_from_list: 'off' // -- a audioplayer list is formed at runtime so that when
        , design_wave_color_bg: '222222' // -- waveform background color..  000000,ffffff gradient is allowed
        , design_wave_color_progress: 'ea8c52' // -- waveform progress color


        ,skin_minimal_button_size: '100'
        ,gallery_gapless_play: 'off'
        ,preview_on_hover: 'off' // -- on mouseenter autoplay the track
        ,watermark_volume: '1' // -- on mouseenter autoplay the track
        ,controls_external_scrubbar: '' // -- on mouseenter autoplay the track
        ,scrubbar_type: 'auto' // -- wave or spectrum or bar
        ,wavesurfer_pcm_length: '200' // -- wave or spectrum or bar
      };



      if (typeof o == 'undefined') {
        if ( $(this).attr('data-options')) {

          var aux = $(this).attr('data-options');
          aux = 'window.dzsap_self_options  = ' + aux;
          try{

            eval(aux);
          }catch(err){
            console.warn('eval error',err);
          }
          // console.log($(this), $(this).attr('data-options'), window.dzsap_self_options);
          o = $.extend({}, window.dzsap_self_options);
          window.window.dzsap_self_options = $.extend({}, {});
        }
      }

      o = $.extend(defaults, o);
      // console.log('init ap from - ',o.call_from);


      this.each(function() {
        var cthis = $(this);
        var cchildren = cthis.children()
          ,cthisId = 'ap1'
          ,cclass=''
        ;
        var currNr = -1;
        var i = 0;
        var ww, wh, tw, th, cw // -- controls width
          , ch // -- controls height
          , sw = 0 // -- scrubbar width
          ,
          sh, spos = 0 //== scrubbar prog pos
        ;
        var _audioplayerInner, _apControls = null,
          _apControlsLeft = null,
          _apControlsRight = null,
          _conControls,
          _conPlayPause = null
          ,_conPlayPauseCon = null
          , _controlsVolume, _scrubbar, _scrubbarbg_canvas, __scrubbProg, _scrubbarhover_canvas, _scrubbarprog_canvas, _theMedia
          , _cmedia = null
          , _cwatermark = null
          , _commentsSelector = null
          , _theThumbCon, _metaArtistCon, _scrubBgReflect = null
          ,_extra_html
          ,_playlistTooltip = null
          ,_scrubBgCanvas = null,
          _scrubBgCanvasCtx = null,
          _commentsHolder = null,
          _commentsWriter = null,
          _currTime = null,
          _totalTime = null,
          _feed_fakePlayer = null,
          _feed_fakeButton = null;
        var busy = false,
          player_playing = false,
          muted = false,
          loaded = false,
          yt_inited = false,
          destroyed = false,
          google_analytics_sent_play_event = false,
          destroyed_for_rebuffer = false
          ,loop_active = false // -- if loop_active the track will loop
          ,is_sample = false
          ,sw_draw = false
          ,dzsap_can_canvas = false
          ,curr_time_first_set = false
          ,scrub_showing_scrub_time = false
          ,setuped_listeners = false
        ;
        var
          time_total = 0
          ,last_time_total = 0

          ,time_curr_for_visual = -1
          ,time_curr_for_real = -1

          ,time_total_for_visual = -1
          ,time_total_for_real = -1

          ,time_curr = 0
          ,force_time_curr = 0
          ,real_time_curr = 0 // -- we need these for sample..
          ,real_time_total = 0 // -- we need these for sample..
          ,sample_time_start = 0
          ,sample_time_end = 0
          ,pseudo_sample_time_start = 0
          ,pseudo_sample_time_end = 0
          ,sample_time_total = 0
          ,sample_perc_start = 0
          ,playlist_inner_currNr = 0
          ,sample_perc_end = 0
          ,attempt_reload = 0
          ,currTime_outerWidth = 0
          ,media_changed_index = 0
          ,player_index_in_gallery = -1 // -- the player index in gallery
        ;
        var index_extrahtml_toloads = 0;
        var last_vol = 1,
          last_vol_before_mute = 1,
          the_player_id = ''
          ,pcm_identifier = ''// -- can be either player id or source if player id is not set
        ;
        var inter_check
          , inter_checkReady
          , inter_check_yt_ready
          , inter_audiobuffer_workaround_id = 0
          , inter_ended = 0
          , inter_60_secs_contor = 0
          ,inter_trigger_resize;
        var skin_minimal_canvasplay;
        var data_source = ''
          ,src_real_mp3 = '' // -- the real source of the mp3
          ,data_station_main_url = ''
          ,id_real_mp3 = '' // -- the real source of the mp3
          ,original_real_mp3 = '' // -- this is the original real mp3 for sainvg and identifying in the database
        ;

        var res_thumbh = false
          ,debug_var = false
          ,debug_var2 = false
          ,volume_dragging = false
          ,volume_set_by_user = false // -- this shows if the user actioned on the volume
          ,pcm_is_real = false
          ,pcm_try_to_generate = true
          ,pcm_promise_generate_on_meta_load = false
          ,sw_enable_multisharer = false
          ,is_under_400 = false
          ,play_promised = false
          ,first_drawn_canvas = false
          ,sent_received_time_total = false
          ,ended = false
          ,sw_mouse_over = false


        ; // resize thumb height

        var _sticktobottom = null;

        var skin_minimal_button_size = 0;

        // -- touch controls
        var scrubbar_moving = false
          ,scrubbar_moving_x = 0
          ,aux3 = 0
        ;

        var str_ie8 = '';

        // -- spectrum stuff

        var javascriptNode = null;
        var audioCtx = null;
        var audioBuffer = null;
        var sourceNode = null;
        var analyser = null;
        var lastarray = []
          ,last_lastarray = null
        ;

        var radio_update_artist_name = false;
        var radio_update_song_name = false;

        var oscillatorNode = null
          ,gainNode = null
          ,audioCtx_finish = null
          ,audioCtx_buffer = null
        ;



        var _feed_extra_html = null;
        var skinwave_mode = 'normal';
        var webaudiosource = null;
        var canw = 100;
        var canh = 100;
        var barh = 100,
          scrubbar_h = 75
          ,design_thumbh
        ;
        var type = '';

        var sposarg = 0; // the % at which the comment will be placed

        var _commentsChildren = null;

        var str_audio_element = '';

        var lasttime_inseconds = 0;

        var controls_left_pos = 0;
        var controls_right_pos = 0;

        var ajax_view_submitted = 'auto',
          increment_views = 0
          ,type_for_fake_feed = 'audio'
        ;

        var yt_curr_id = ''
        var yt_retry_play_timeout = 0

        var starrating_index = 0,
          starrating_nrrates = 0,
          starrating_alreadyrated = -1;

        var playfrom = 'off',
          playfrom_ready = false
        ;

        var waveform_peaks = []; // -- an array of peaks for the canvas waveform

        var defaultVolume = 1;

        var currIp = '127.0.0.1';
        var action_audio_end = null
          ,action_audio_play = null
          ,action_audio_play2 = null
          ,action_audio_pause = null
          ,action_audio_comment = null; // -- set a outer ended function ( for example for tracking your analytics


        var sw_suspend_enter_frame = true
          ,sw_spectrum_fakeit = 'auto'
          ,sw_spectrum_fakeit_decided = '' // -- shows where fakeit was decided
        ;

        var type_normal_stream_type = ''; // -- normal icecast or shoutcast

        var animation_flip = true,
          animation_pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
          animation_play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
        ;

        var settings_extrahtml_in_float_right = ''; // -- the html to have in right of controls

        var static_hexcolor = '';


        var duration_viy = 20;

        var target_viy = 0;

        var begin_viy = 0;

        var finish_viy = 0;

        var change_viy = 0;

        var ggradient = null;


        var draw_canvas_inter = 0


        if (isNaN(parseInt(o.design_thumbh, 10)) == false) {
          o.design_thumbh = parseInt(o.design_thumbh, 10);

        }
        if (String(o.design_thumbw).indexOf('%') == -1) {
          o.design_thumbw = parseInt(o.design_thumbw, 10);

        }
        // console.log(cthis, o);


        window.dzsap_player_index++;




        settle_sample_times();
        if(o.autoplay=='on' && o.cue=='on'){
          o.preload_method = 'auto';
        }


        var keyboard_controls = dzsap_generate_keyboard_controls();


        cthis.addClass('preload-method-'+o.preload_method);

        o.wavesurfer_pcm_length = Number(o.wavesurfer_pcm_length);

        if(o.skinwave_preloader_code=='default'){



          // <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
          o.skinwave_preloader_code = svg_preloader_code;

        }


        //console.log(sample_perc_start,sample_perc_end);

        o.settings_trigger_resize = parseInt(o.settings_trigger_resize, 10);
        o.watermark_volume = parseFloat(o.watermark_volume);

        // console.log('%c o.settings_extrahtml_in_float_right -4 ', 'color: #da21da',cthis.children('.extra-html-in-controls-right'), cthis.children('.extra-html-in-controls-right').eq(0).html(), ' |||||||||||||||||||||||||||| o.settings_extrahtml_in_float_right - ',o.settings_extrahtml_in_float_right);



        settings_extrahtml_in_float_right = o.settings_extrahtml_in_float_right;

        if (cthis.children('.extra-html-in-controls-right').length > 0){



          settings_extrahtml_in_float_right += cthis.children('.extra-html-in-controls-right').eq(0).html();


        }


        if (cthis.children('.extra-html-in-controls-left').length > 0 && o.settings_extrahtml_in_float_left == '') {
          o.settings_extrahtml_in_float_left = cthis.children('.extra-html-in-controls-left').eq(0).html();


        }

        if(settings_extrahtml_in_float_right ) {


          // console.log('settings_extrahtml_in_float_right - ',settings_extrahtml_in_float_right);


          settings_extrahtml_in_float_right = String(settings_extrahtml_in_float_right).replace(/{{svg_share_icon}}/g, svg_share_icon);
        }







        init();

        function settle_sample_times(){

          sample_time_start = 0;
          sample_time_total = 0;
          pseudo_sample_time_start = 0;
          pseudo_sample_time_end = 0;

          if(o.sample_time_start){

          }else{
            if(cthis.attr('data-sample_time_start')){
              sample_time_start= Number(cthis.attr('data-sample_time_start'));
            }
            if(cthis.attr('data-sample_time_end')){
              sample_time_end= Number(cthis.attr('data-sample_time_end'));
            }
            if(cthis.attr('data-pseudo-sample_time_start')){
              pseudo_sample_time_start= Number(cthis.attr('data-pseudo-sample_time_start'));
            }
            if(cthis.attr('data-pseudo-sample_time_end')){
              pseudo_sample_time_end= Number(cthis.attr('data-pseudo-sample_time_end'));
            }
            if(cthis.attr('data-sample_time_total')){
              sample_time_total= Number(cthis.attr('data-sample_time_total'));
            }
          }
          // console.log('pseudo_sample_time_start ( from settle_sample_times ) -> ',pseudo_sample_time_start, cthis);


          if (isNaN(Number(o.sample_time_start))==false && Number(o.sample_time_start) > 0) {
            sample_time_start = Number(o.sample_time_start);
            if (Number(o.sample_time_end) > 0) {
              sample_time_end = Number(o.sample_time_end);

              if (Number(o.sample_time_total) > 0) {
                sample_time_total = Number(o.sample_time_total);


                sample_perc_start = sample_time_start / sample_time_total;
                sample_perc_end = sample_time_end / sample_time_total;

              }
            }
          }

          if(pseudo_sample_time_start){
            sample_time_start = pseudo_sample_time_start;
            sample_time_end = pseudo_sample_time_end;
          }


          if( (sample_time_total && sample_time_start) || (pseudo_sample_time_start && pseudo_sample_time_end)){
            is_sample = true;
          }else{
            is_sample = false;
          }

        }

        function init() {
          //console.log(typeof(o.parentgallery)=='undefined');



          cthis.addClass(o.extra_classes_player)



          if(cthis.hasClass('dzsap-inited')){
            return false;
          }


          cthis.addClass('dzsap-inited')
          window.dzsap_player_index++;




          // console.log('cthis - ',cthis,o);

          if (o.design_skin == '') {
            o.design_skin = 'skin-default';
          }

          var regexr = / skin-/g;


          if(regexr.test(cthis.attr('class'))){

          }else{

            cthis.addClass(o.design_skin);
          }



          if (cthis.hasClass('skin-default')) {
            o.design_skin = 'skin-default';
          }
          if (cthis.hasClass('skin-wave')) {
            o.design_skin = 'skin-wave';
          }
          if (cthis.hasClass('skin-justthumbandbutton')) {
            o.design_skin = 'skin-justthumbandbutton';
          }
          if (cthis.hasClass('skin-pro')) {
            o.design_skin = 'skin-pro';
          }
          if (cthis.hasClass('skin-aria')) {
            o.design_skin = 'skin-aria';
          }
          if (cthis.hasClass('skin-silver')) {
            o.design_skin = 'skin-silver';
          }
          if (cthis.hasClass('skin-redlights')) {
            o.design_skin = 'skin-redlights';
          }
          if (cthis.hasClass('skin-steel')) {
            o.design_skin = 'skin-steel';
          }
          if (cthis.hasClass('skin-customcontrols')) {
            o.design_skin = 'skin-customcontrols';
          }



          if(o.design_skin=='skin-wave'){
            if(o.scrubbar_type=='auto'){
              o.scrubbar_type = 'wave';
            }
          }
          if(o.scrubbar_type=='auto'){
            o.scrubbar_type = 'bar';
          }


          detect_skinwave_mode();

          //console.log(o.design_skin, o.disable_volume);

          if (cthis.attr('data-viewsubmitted') == 'on') {
            ajax_view_submitted = 'on';

            // console.log('ajax_view_submitted from data-viewsubmitted', cthis);
          }
          if (cthis.attr('data-userstarrating')) {
            starrating_alreadyrated = Number(cthis.attr('data-userstarrating'));
          }
          //                console.log(starrating_alreadyrated);

          if (cthis.hasClass('skin-minimal')) {
            o.design_skin = 'skin-minimal';
            if (o.disable_volume == 'default') {
              o.disable_volume = 'on';
            }

            if (o.disable_scrub == 'default') {
              o.disable_scrub = 'on';
            }
            o.disable_timer = 'on';
          }
          if (cthis.hasClass('skin-minion')) {
            o.design_skin = 'skin-minion';
            if (o.disable_volume == 'default') {
              o.disable_volume = 'on';
            }

            if (o.disable_scrub == 'default') {
              o.disable_scrub = 'on';
            }

            o.disable_timer = 'on';
          }

          if (o.design_skin == 'skin-default') {
            if (o.design_thumbh == 'default') {
              design_thumbh = cthis.height() - 40;
              res_thumbh = true;
            }
          }



          // console.log('o.mobile_delete -> ',o.mobile_delete, cthis);
          if(dzsap_is_mobile()){
            $('body').addClass('is-mobile');
          }
          if(o.mobile_delete=='on'){


            if(dzsap_is_mobile()){

              var _con = null;

              if(cthis.parent().parent().hasClass('dzsap-sticktobottom')){
                _con = cthis.parent().parent();
              }

              if(_con){
                if(_con.prev().hasClass("dzsap-sticktobottom-placeholder")){
                  _con.prev().remove();
                }

                _con.remove();
              }


              cthis.remove();


              return false;
            }
          }

          dzsap_can_canvas = can_canvas();

          apply_skinwave_mode_class();

          if(o.design_color_bg){
            o.design_wave_color_bg = o.design_color_bg;
          }
          if(o.design_color_highlight){
            o.design_wave_color_progress = o.design_color_highlight;
          }

          // console.log(o.design_wave_color_bg, o.design_wave_color_prog);

          if (o.design_skin == 'skin-justthumbandbutton') {
            if (o.design_thumbh == 'default') {
              o.design_thumbh = '';
              //                        res_thumbh = true;
            }
            o.disable_timer = 'on';
            o.disable_volume = 'on';

            if (o.design_animateplaypause == 'default') {
              o.design_animateplaypause = 'on';
            }
          }
          if (o.design_skin == 'skin-redlights') {
            o.disable_timer = 'on';
            o.disable_volume = 'off';
            if (o.design_animateplaypause == 'default') {
              o.design_animateplaypause = 'on';
            }

          }
          if (o.design_skin == 'skin-steel') {
            if (o.disable_timer == 'default') {

              o.disable_timer = 'off';
            }
            o.disable_volume = 'on';
            if (o.design_animateplaypause == 'default') {
              o.design_animateplaypause = 'on';
            }


            if (o.disable_scrub == 'default') {
              o.disable_scrub = 'on';
            }

          }
          if (o.design_skin == 'skin-customcontrols') {
            if (o.disable_timer == 'default') {

              o.disable_timer = 'on';
            }
            o.disable_volume = 'on';
            if (o.design_animateplaypause == 'default') {
              o.design_animateplaypause = 'on';
            }


            if (o.disable_scrub == 'default') {
              o.disable_scrub = 'on';
            }

          }

          if (o.skinwave_wave_mode == 'canvas') {


            o.skinwave_enableReflect = 'off';
            cthis.addClass('skin-wave-no-reflect');
          }

          if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
            o.skinwave_wave_mode_canvas_reflection_size=0.5;
            // o.skinwave_wave_mode_canvas_waves_number=1;
            // o.skinwave_wave_mode_canvas_waves_padding=0;
          }

          if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
            reflection_size = 0.5;
            // o.skinwave_timer_static='on';
          }
          if (o.skinwave_enableReflect == 'off') {

            cthis.addClass('skin-wave-no-reflect');
          }



          if (o.design_thumbh == 'default') {
            design_thumbh = 200;
          }
          if (o.embed_code == '') {
            if (cthis.find('div.feed-embed-code').length > 0) {
              o.embed_code = cthis.find('div.feed-embed-code').eq(0).html();
            }
          }

          if (o.design_animateplaypause == 'default') {
            o.design_animateplaypause = 'off';
          }

          if (o.design_animateplaypause == 'on') {
            cthis.addClass('design-animateplaypause');
          }
          //                console.log(the_player_id, o.skinwave_comments_enable, o.skinwave_comments_playerid);

          if (o.skinwave_comments_playerid == '') {



            if (typeof(cthis.attr('id')) != 'undefined') {
              the_player_id = cthis.attr('id');
            }
            if (cthis.attr('data-playerid')) {
              the_player_id = cthis.attr('data-playerid');
            }
          } else {
            the_player_id = o.skinwave_comments_playerid;

            if (!(cthis.attr('id')) ) {
              cthis.attr('id', the_player_id);
            }
          }

          // console.log('the_player_id - ',the_player_id);

          if(cthis.attr('data-playerid')){

          }else{
            // console.log('the_player_id - ',the_player_id);
            if (the_player_id == '') {
              the_player_id = dzs_clean_string(cthis.attr('data-source'));
              cthis.attr('data-playerid',the_player_id);
            }
          }


          if(isNaN(Number(the_player_id))){
            // TODO: maybe if we except only number for wp database, maybe convert ascii to number


          }


          if (the_player_id == '' ) {
            o.skinwave_comments_enable = 'off';

          }

          // console.warn('o.skinwave_comments_enable - ',o.skinwave_comments_enable);


          if(o.mobile_disable_fakeplayer=='on' && dzsap_is_mobile()){
            cthis.attr('data-fakeplayer', '');
          }

          if (cthis.attr('data-fakeplayer')) {

            // console.log("cthis.attr('data-fakeplayer') -> ",cthis.attr('data-fakeplayer'));

            // && (is_android() || is_ios()) == false

            // if we have fakeplayer

            var _c = $(cthis.attr('data-fakeplayer'));

            if(_c.length==0){
              _c = $(String(cthis.attr('data-fakeplayer')).replace('#','.'));
              if(_c.length){
                o.fakeplayer = $(String(cthis.attr('data-fakeplayer')).replace('#','.'));


                cthis.attr('data-fakeplayer',String(cthis.attr('data-fakeplayer')).replace('#','.'));



              }

            }

            if(_c.length==0){
              cthis.attr('data-fakeplayer','');
            }else{

              cthis.addClass('player-is-feeding');
              if (cthis.attr('data-type')) {

                o.fakeplayer = $(cthis.attr('data-fakeplayer')).eq(0);
                type_for_fake_feed = cthis.attr('data-type');
                cthis.attr('data-original-type', type_for_fake_feed);
                // cthis.attr('data-type', 'fake');
                // o.type = 'fake';
                // type = 'fake';

              }
            }


          }

          cthis.addClass('scrubbar-type-'+o.scrubbar_type);









          if (cthis.children('.extra-html').length > 0 && o.settings_extrahtml == '') {
            o.settings_extrahtml = cthis.children('.extra-html').eq(0).html();

            _feed_extra_html = cthis.children('.extra-html').eq(0);

            // console.log('o.settings_extrahtml - ',o.settings_extrahtml);


            var re_ratesubmitted = /{\{ratesubmitted=(.?)}}/g;
            if (re_ratesubmitted.test(String(o.settings_extrahtml))) {
              re_ratesubmitted.lastIndex = 0;
              var auxa = (re_ratesubmitted.exec(String(o.settings_extrahtml)));


              starrating_alreadyrated = auxa[1];

              o.settings_extrahtml = String(o.settings_extrahtml).replace(re_ratesubmitted, '');

              if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_player_rateSubmitted != undefined) {
                $(o.parentgallery).get(0).api_player_rateSubmitted();
              }
            }


            cthis.children('.extra-html').remove();
          }

          if (o.construct_player_list_for_sync == 'on') {

            if (dzsap_list_for_sync_sw_built == false) {

              dzsap_list_for_sync_players = [];

              dzsap_list_for_sync_sw_built = true;

              $('.audioplayer.is-single-player,.audioplayer-tobe.is-single-player').each(function() {
                var _t23 = $(this);


                if(_t23.hasClass('dzsap_footer')){
                  return;
                }

                // console.log(_t23);

                if(_t23.attr('data-do-not-include-in-list')!='on'){

                  dzsap_list_for_sync_players.push(_t23);
                }
              })

              // console.log(dzsap_list_for_sync_players);

              clearTimeout(dzsap_list_for_sync_inter_build);

              dzsap_list_for_sync_inter_build = setTimeout(function() {
                dzsap_list_for_sync_sw_built = false;
              }, 500);

            }
          }

          // console.log('dzsap_list_for_sync_players - ',dzsap_list_for_sync_players);


          playfrom = o.playfrom;

          if (isValid(cthis.attr('data-playfrom'))) {
            playfrom = cthis.attr('data-playfrom');
          }

          if (isNaN(parseInt(playfrom, 10)) == false) {
            playfrom = parseInt(playfrom, 10);
          }



          if(playfrom=='off' || playfrom==''){
            if(get_query_arg(window.location.href,'audio_time')){
              playfrom = sanitize_from_point_time(get_query_arg(window.location.href,'audio_time'));
            }
          }

          // console.log('playfrom - ',playfrom);


          pcm_identifier = the_player_id; // -- the pcm identifier to send via ajax

          // console.warn('pcm identified', cthis, pcm_identifier);


          var _feed_obj = null;

          if (_feed_fakeButton) {

            _feed_obj = _feed_fakeButton;
          } else {
            if (_feed_fakePlayer) {

              _feed_obj = _feed_fakePlayer;
            } else {
              _feed_obj = null;
            }
          }



          if(pcm_identifier=='dzs_footer'){
            pcm_identifier = dzs_clean_string(cthis.attr('data-source'));
          }

          if (_feed_obj) {

            if (_feed_obj.attr('data-playerid')) {

              pcm_identifier = _feed_obj.attr('data-playerid');
            } else {

              if (_feed_obj.attr('data-source')) {

                pcm_identifier = _feed_obj.attr('data-source');
              }
            }
          }

          // console.log('inited - ', the_player_id, ' skinwave_comments_enable - ', o.skinwave_comments_enable, cthis);

          if (cthis.attr('data-type') == 'youtube') {
            o.type = 'youtube';

            type = 'youtube';
          }
          if (cthis.attr('data-type') == 'soundcloud') {
            o.type = 'soundcloud';
            type = 'soundcloud';

            o.skinwave_enableSpectrum='off';
            cthis.removeClass('skin-wave-is-spectrum');
          }
          if (cthis.attr('data-type') == 'mediafile') {
            o.type = 'audio';
            type = 'audio';
          }

          // todo: move shoutcast
          if (cthis.attr('data-type') == 'shoutcast') {
            o.type = 'shoutcast';
            type = 'audio';
            o.disable_timer = 'on';
            o.skinwave_enableSpectrum='off';
            //===might still use it for skin-wave

            if (o.design_skin == 'skin-default') {
              o.disable_scrub = 'on';
            }
            //                    o.disable_scrub = 'on';
          }



          if (type == '') {
            type = 'audio';
          }


          type_normal_stream_type = '';

          // console.log('type - ',type, cthis.attr('data-streamtype'));


          if(type=='normal' || type=='audio'){
            if(cthis.attr('data-streamtype') && cthis.attr('data-streamtype')!='off'){
              type_normal_stream_type = cthis.attr('data-streamtype');
              data_station_main_url = cthis.attr('data-source');
              cthis.addClass('is-radio-type');

            }else{
              type_normal_stream_type = '';
            }
          }

          // -- no shoutcast autoupdate at the moment
          if(type_normal_stream_type=='shoutcast'){
            // type_normal_stream_type = '';

            // -- todo: we
          }



          // console.log('type_normal_stream_type - ', type_normal_stream_type);

          src_real_mp3 = cthis.attr('data-source');
          if (type == 'audio') {
            src_real_mp3 = cthis.attr('data-source');
          }

          //====we disable the function if audioplayer inited
          if (cthis.hasClass('audioplayer')) {
            return;
          }
          //console.log('ceva');

          if (cthis.attr('id') != undefined) {
            cthisId = cthis.attr('id');
          } else {
            cthisId = 'ap' + dzsap_globalidind++;
          }


          yt_curr_id = 'ytplayer_' + cthisId;



          cthis.removeClass('audioplayer-tobe');
          cthis.addClass('audioplayer');

          draw_scrub_prog();

          setTimeout(function(){
            draw_scrub_prog()
          },1000);


          if (cthis.find('.the-comments').length > 0 && cthis.find('.the-comments').eq(0).children().length > 0) {
            _commentsChildren = cthis.find('.the-comments').eq(0).children();
          } else {
            if (o.skinwave_comments_retrievefromajax == 'on') {

              var data = {
                action: 'dzsap_get_comments',
                postdata: '1',
                playerid: the_player_id
              };





              // -- get comments
              if (o.settings_php_handler) {
                $.ajax({
                  type: "POST",
                  url: o.settings_php_handler,
                  data: data,
                  success: function(response) {
                    //if(typeof window.console != "undefined" ){ console.log('Ajax - get - comments - ' + response); }

                    cthis.prependOnce('<div class="the-comments"></div>', '.the-comments');

                    if (response.indexOf('a-comment') > -1) {

                      response = response.replace(/a-comment/g, 'a-comment dzstooltip-con');
                      response = response.replace(/dzstooltip arrow-bottom/g, 'dzstooltip arrow-from-start transition-slidein arrow-bottom');

                    }
                    cthis.find('.the-comments').eq(0).html(response);

                    _commentsChildren = cthis.find('.the-comments').eq(0).children();

                    setup_controls_commentsHolder();

                  },
                  error: function(arg) {
                    if (typeof window.console != "undefined") {
                      // console.log('Got this from the server: ' + arg, arg);
                    };
                  }
                });
              }

            }
          }

          if (o.design_skin=='skin-wave' && o.skinwave_wave_mode == 'canvas') {
            wave_mode_canvas_try_to_get_pcm();
          }




          //===ios does not support volume controls so just let it die
          //====== .. or autoplay FORCE STAFF


          if (is_ios() || is_android()) {

            o.autoplay = 'off';
            o.disable_volume = 'on';


            if (o.cue == 'off') {
              o.cue = 'on';
            }
            o.cue = 'on';
          }


          // console.log('o.autoplay here - ',o.autoplay, cthis);

          if(o.cue=='off'){

            // -- cue is forcing autoplay on
            cthis.addClass('cue-off');
            o.autoplay='on';
          }

          // console.log('o.autoplay here - ',o.autoplay, cthis);

          if (type == 'youtube') {

            load_yt_api();
          }
          data_source = cthis.attr('data-source');



          //====sound cloud INTEGRATION //
          if (cthis.attr('data-source') != undefined && String(cthis.attr('data-source')).indexOf('https://soundcloud.com/') > -1) {
            type = 'soundcloud';
          }
          //console.log(o.type);
          if (type == 'soundcloud') {


            retrieve_soundcloud_url();

            //                    type='audio';
          }
          //====END soundcloud INTEGRATION//












          setup_structure(); //  -- inside init()

          //console.log(cthis, is_ios(), o.type);
          //trying to access the youtube api with ios did not work





          //                console.log(o.design_skin, type, o.skinwave_comments_enable, o.design_skin=='skin-wave' && (type=='audio'||type=='soundcloud') && o.skinwave_comments_enable=='on');

          //console.log(o.design_skin, type, o.skinwave_comments_enable)

          if (o.design_skin == 'skin-wave' && (type == 'audio' || type == 'soundcloud' || type == 'fake') && o.skinwave_comments_enable == 'on') {

            var str_comments_holder = '<div class="comments-holder">';



            if (o.skinwave_comments_links_to) {

              str_comments_holder += '<a href="' + o.skinwave_comments_links_to + '" target="_blank" class="the-bg"></a>';
            } else {

              str_comments_holder += '<div class="the-comments-holder-bg"></div>';
            }


            str_comments_holder += '</div><div class="clear"></div><div class="comments-writer"><div class="comments-writer-inner"><div class="setting"><div class="setting-label"></div><textarea name="comment-text" placeholder="Your comment.." type="text" class="comment-input"></textarea><div class="float-right"><button class="submit-ap-comment dzs-button-dzsap float-right">Submit</button><button class="cancel-ap-comment dzs-button-dzsap float-right">Cancel</button></div><div class="overflow-it"><input placeholder="Your email.." name="comment-email" type="text" class="comment-input"/></div><div class="clear"></div></div></div></div>';


            if(skinwave_mode=='normal'){

              _apControls.appendOnce(str_comments_holder);
            }else{

              cthis.appendOnce(str_comments_holder);
            }
            _commentsHolder = cthis.find('.comments-holder').eq(0);
            _commentsWriter = cthis.find('.comments-writer').eq(0);



            setup_controls_commentsHolder();

            // console.log('_commentsHolder -> ',_commentsHolder);
            // _commentsHolder.on('click', '.the-comments-holder-bg', click_comments_bg);
            _commentsHolder.on('click', click_comments_bg);
            _commentsWriter.find('.cancel-ap-comment').bind('click', click_cancel_comment);
            _commentsWriter.find('.submit-ap-comment').bind('click', click_submit_comment);
          }


          if (o.settings_extrahtml != '') {


            // console.log('_feed_extra_html - ',_feed_extra_html);
            if(_feed_extra_html){


              // console.log('_feed_extra_html.attr(\'data-playerid\') - ' , _feed_extra_html.attr('data-playerid'));
            }
            cthis.append('<div class="extra-html">' + o.settings_extrahtml + '</div>');

            _extra_html = cthis.children('extra-html');


            if(_feed_extra_html && _feed_extra_html.attr('data-playerid')){
              _extra_html = _feed_extra_html.attr('data-playerid');
            }


            if(_feed_extra_html && _feed_extra_html.attr('data-posttype')){
              _extra_html = _feed_extra_html.attr('data-posttype');
            }


          }





          //console.log();






          if (type == 'audio') {


            //                    img = document.createElement('img');
            //                    img.onerror = function(){
            //                        return;
            //                        if(cthis.children('.meta-artist').length>0){
            //                            _audioplayerInner.children('.meta-artist').html('audio not found...');
            //                        }else{
            //                            _audioplayerInner.append('<div class="meta-artist">audio not found...</div>');
            //                            _audioplayerInner.children('.meta-artist').eq(0).wrap('<div class="meta-artist-con"></div>');
            //                        }
            //                    };
            //                    img.src= cthis.attr('data-source');

          }

          if (o.autoplay == 'on' && o.cue == 'on') {
            increment_views = 1;
          }


          if (type == 'youtube' && is_ios() && 1==0) {
            if (cthis.height() < 200) {
              cthis.height(200);
            }
            aux = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + data_source + '" frameborder="0" allowfullscreen></iframe>';
            cthis.html(aux);
            return;
          } else {
            // -- soundcloud will setupmedia when api done

            // console.log(o.cue, type);
            if (o.cue == 'on' && type != 'soundcloud') {


              if (is_android() || is_ios()) {

                cthis.find('.playbtn').bind('click', play_media);
              }




              // console.log('source - ',cthis.attr('data-source'), dataSrc);


              dataSrc = cthis.attr('data-source');

              if(dataSrc.indexOf('{{generatenonce}}') > -1){






                var original_id = '';

                var aux = /id=(\d*?)/g.exec(dataSrc);

                if(aux){

                  original_id = aux[1];
                }

                // -- generate nonce
                $.ajax({
                  type: "POST",
                  url: dataSrc,
                  data: {},
                  success: function (response) {
                    //if(typeof window.console != "undefined" ){ console.log('Ajax - get - comments - ' + response); }

                    // console.groupCollapsed("receivedPCM");
                    // console.log(response);
                    // console.groupEnd();

                    if (response) {

                      // console.log('response - ',response);


                      if(response.indexOf(original_id)>-1){

                        cthis.attr('data-source', response);

                        setup_media();
                      }
                    }
                  }
                })
                ;


              }else{

                // console.log('type_normal_stream_type - ',type_normal_stream_type);
                if( type_normal_stream_type!='icecast'){
                  setup_media();

                  if(type_normal_stream_type=='shoutcast'){


                    // -- we can just set an interval for retrieving shoutcast current artist
                    setInterval(function () {
                        icecast_shoutcast_get_data()
                      }
                      , 10000
                    );
                  }
                }else{
                  if(type_normal_stream_type=='icecast'){


                    // -- if we have icecast we can update currently playing song
                    setInterval(function(){
                        icecast_shoutcast_get_data()
                      }
                      ,10000
                    );
                  }
                }

              }

              // setup_media();


            } else {


              //console.log(' -- cue is of so set autoplay to on')
              // o.autoplay = 'on';
              cthis.find('.playbtn').bind('click', click_for_setup_media);
              cthis.find('.scrubbar').bind('click', click_for_setup_media);
              handleResize();
            }

          }

          setInterval(function() {
            debug_var = true;
          }, 3000);

          setInterval(function() {
            debug_var2 = true;
          }, 2000);

          // -- we call the api functions here
          //console.log('api sets');



          if(cthis.parent().hasClass('dzsap-sticktobottom')){

            _sticktobottom = cthis.parent();

          }
          if(cthis.parent().parent().hasClass('dzsap-sticktobottom')){

            _sticktobottom = cthis.parent().parent();
          }


          // console.log('_sticktobottom -> ',_sticktobottom, cthis,cthis.parent().attr('class'),cthis.parent().parent().attr('class'));
          if(_sticktobottom){
            if(cthis.hasClass('theme-dark')){
              _sticktobottom.addClass('theme-dark');
            }

            setTimeout(function(){

              _sticktobottom.addClass('inited');
            },500)
            _sticktobottom.addClass('dzsap-sticktobottom-for-'+o.design_skin);
            _sticktobottom.prev().addClass('dzsap-sticktobottom-for-'+o.design_skin);

            if(o.design_skin=='skin-wave'){
              _sticktobottom.addClass('dzsap-sticktobottom-for-'+o.design_skin+'--mode-'+skinwave_mode)
              _sticktobottom.prev().addClass('dzsap-sticktobottom-for-'+o.design_skin+'--mode-'+skinwave_mode)
            }


            cclass = cthis.attr('class');


            var regex = /(skinvariation-.*?)($| )/g

            var aux = regex.exec(cclass);

            // console.log('aux - ',aux);

            if(aux && aux[1]){

              // console.log("YESSS ",aux[1]);
              _sticktobottom.addClass(aux[1]);
              _sticktobottom.prev().addClass(aux[1]);
            }


          }

          cthis.get(0).api_destroy = destroy_it; // -- destroy the player and the listeners
          cthis.get(0).api_play = play_media; // -- play the media
          cthis.get(0).api_get_last_vol = get_last_vol; // -- play the media
          cthis.get(0).api_click_for_setup_media = click_for_setup_media; // -- play the media
          cthis.get(0).api_init_loaded = init_loaded; // -- force resize event
          cthis.get(0).api_handleResize = handleResize; // -- force resize event
          cthis.get(0).api_set_playback_speed = set_playback_speed; // -- set the playback speed, only works for local hosted mp3
          cthis.get(0).api_change_media = change_media; // -- change the media file from the API
          cthis.get(0).api_seek_to_perc = seek_to_perc; // -- seek to percentage ( for example seek to 0.5 skips to half of the song )
          cthis.get(0).api_seek_to = seek_to; // -- seek to percentage ( for example seek to 0.5 skips to half of the song )
          cthis.get(0).api_seek_to_visual = seek_to_visual; // -- seek to perchange but only visually ( does not actually skip to that ) , good for a fake player
          cthis.get(0).api_set_volume = set_volume; // -- set a volume
          cthis.get(0).api_visual_set_volume = visual_set_volume; // -- set a volume
          cthis.get(0).api_destroy_listeners = destroy_listeners; // -- set a volume

          cthis.get(0).api_pause_media = pause_media; // -- pause the media
          cthis.get(0).api_pause_media_visual = pause_media_visual; // -- pause the media, but only visually
          cthis.get(0).api_play_media = play_media; // -- play the media
          cthis.get(0).api_play_media_visual = play_media_visual; // -- play the media, but only visually
          cthis.get(0).api_handle_end = handle_end; // -- play the media, but only visually
          cthis.get(0).api_change_visual_target = change_visual_target; // -- play the media, but only visually
          cthis.get(0).api_change_design_color_highlight = change_design_color_highlight; // -- play the media, but only visually
          cthis.get(0).api_draw_scrub_prog = draw_scrub_prog;
          cthis.get(0).api_draw_curr_time = draw_curr_time;
          cthis.get(0).api_get_times = get_times;
          cthis.get(0).api_check_time = check_time;
          cthis.get(0).api_sync_players_goto_next = sync_players_goto_next;
          cthis.get(0).api_sync_players_goto_prev = sync_players_goto_prev;
          cthis.get(0).api_regenerate_playerlist_inner = function(){
            setup_playlist_inner();
          };



          // -- get current time
          cthis.get(0).api_get_time_curr = function() {
            return time_curr_for_real;
          };
          // -- set current time
          cthis.get(0).api_set_time_curr = function(arg) {
            time_curr_for_visual = arg;

            curr_time_first_set = true;


            if(pseudo_sample_time_start==0){

              if (sample_time_start > 0) {
                time_curr_for_visual = sample_time_start + time_curr_for_visual;

              }
            }
            // if(debug_var2 && o.fakeplayer){
            //
            //     console.log('cthis.get(0).api_set_time_curr', arg);
            //     console.log('time_curr_for_visual', time_curr_for_visual);
            //     debug_var2 = false;
            // }
          };
          // -- get total time
          cthis.get(0).api_get_time_total = function() {
            return time_total_for_visual;
          };
          // -- set total time
          cthis.get(0).api_set_time_total = function(arg) {
            time_total_for_visual = arg;
            curr_time_first_set = true;

            // console.log('time_total_for_visual - ',time_total_for_visual);
          };




          cthis.get(0).api_seek_to_0 = function(arg) {
            seek_to(0);
          }
          cthis.get(0).api_step_back = function(arg) {

            if(arg){

            }else{
              arg = keyboard_controls.step_back_amount;
            }
            seek_to(time_curr-arg);
          }
          cthis.get(0).api_step_forward = function(arg) {

            if(arg){

            }else{
              arg = keyboard_controls.step_back_amount;
            }
            seek_to(time_curr+arg);
          }
          cthis.get(0).api_playback_slow = function(arg) {
            console.log(_cmedia);
            if(_cmedia && _cmedia.playbackRate){
              _cmedia.playbackRate = 0.65;
            }
          }
          cthis.get(0).api_playback_reset = function(arg) {
            // seek_to(0);
            if(_cmedia && _cmedia.playbackRate){
              _cmedia.playbackRate = 1;
            }
          }


          cthis.get(0).api_set_action_audio_play = function(arg) {
            action_audio_play = arg;
          };
          cthis.get(0).api_set_action_audio_pause = function(arg) {
            action_audio_pause = arg;
          };
          cthis.get(0).api_set_action_audio_end = function(arg) {
            action_audio_end = arg;
            cthis.data('has-action-end','on');
          };
          cthis.get(0).api_set_action_audio_comment = function(arg) {
            action_audio_comment = arg;
          };
          cthis.get(0).api_try_to_submit_view = try_to_submit_view;

          //console.log(cthis.get(0));

          //console.log(o);
          if (o.action_audio_play) {
            action_audio_play = o.action_audio_play;
          };
          if (o.action_audio_pause) {
            action_audio_pause = o.action_audio_pause;
          };
          if (o.action_audio_play2) {
            action_audio_play2 = o.action_audio_play2;
          };

          if (o.action_audio_end) {
            action_audio_end = o.action_audio_end;
            cthis.data('has-action-end','on');
          }



          check_time({
            'fire_only_once': true
          });


          setInterval(check_every_05_secs,500);

          //console.log(o.design_skin);
          if (o.design_skin == 'skin-minimal') {
            check_time({
              'fire_only_once': true
            });
          }


          cthis.on('click','.dzsap-repeat-button,.dzsap-loop-button,.btn-zoomsounds-download,.zoomsounds-btn-step-backward,.zoomsounds-btn-step-forward,.zoomsounds-btn-go-beginning,.zoomsounds-btn-slow-playback,.zoomsounds-btn-reset, .playlist-menu-item, .tooltip-indicator--btn-footer-playlist',handle_mouse);
          // cthis.on('mouseover',handle_mouse);
          cthis.on('mouseenter',handle_mouse);
          cthis.on('mouseleave',handle_mouse);


          //console.log('_conPlayPause - ',_conPlayPause, cthis);
          _conPlayPause.on('click',click_playpause);
          //cthis.on('click','.con-playpause', click_playpause);




          cthis.on('click','.skip-15-sec', function(){
            cthis.get(0).api_step_forward(15);
          });



          $(window).on('resize.dzsap', handleResize);
          handleResize();

          if(_scrubbar && _scrubbar.get(0)){

            _scrubbar.get(0).addEventListener('touchstart', function(e) {
              if(player_playing){

                scrubbar_moving = true;
              }
            }, {passive: true})
          }


          if(type_normal_stream_type=='icecast' || type_normal_stream_type=='shoutcast'){


            icecast_shoutcast_get_data();

          }

          // _scrubbar.on('touchstart', function(e) {
          //     if(player_playing){
          //
          //         scrubbar_moving = true;
          //     }
          // }, {passive: true})
          $(document).on('touchmove', function(e) {
            if (scrubbar_moving) {
              scrubbar_moving_x = e.originalEvent.touches[0].pageX;


              aux3 = scrubbar_moving_x - _scrubbar.offset().left;

              if (aux3 < 0) {
                aux3 = 0;
              }
              if (aux3 > _scrubbar.width()) {
                aux3 = _scrubbar.width();
              }

              seek_to_perc(aux3 / _scrubbar.width());


              //console.log(aux3);


            }
          });

          $(document).on('touchend', function(e) {
            scrubbar_moving = false;
          });





          // console.warn('skinwave_comments_mode_outer_selector - ',o.skinwave_comments_mode_outer_selector);

          if(o.skinwave_comments_mode_outer_selector){
            _commentsSelector = $(o.skinwave_comments_mode_outer_selector);

            if(_commentsSelector.data){

              _commentsSelector.data('parent', cthis);

              if(o.skinwave_comments_account && o.skinwave_comments_account!='none'){
                _commentsSelector.find('.comment_email,*[name=comment_user]').remove();
              }

              _commentsSelector.on('click','.comments-btn-cancel,.comments-btn-submit',comments_selector_event);
              _commentsSelector.on('focusin','input',comments_selector_event);
              _commentsSelector.on('focusout','input',comments_selector_event);

              // console.log(_commentsSelector, _commentsSelector.find('input'));
            }else{
              console.log('%c, data not available .. ','color: #990000;', $(o.skinwave_comments_mode_outer_selector));
            }
          }


          // console.log("hmm",cthis);
          cthis.off('click','.btn-like');
          cthis.on('click','.btn-like',  click_like);


          $(document).on('mousemove', '.star-rating-con', mouse_starrating);
          $(document).on('mouseleave','.star-rating-con',  mouse_starrating);
          $(document).on( 'click','.star-rating-con', mouse_starrating);

          setTimeout(function(){

            handleResize();


            if(o.skinwave_wave_mode=='canvas'){

              calculate_dims_time();

              setTimeout(function(){
                calculate_dims_time();


              },100)
            }

          },100)


          cthis.find('.btn-menu-state').eq(0).bind('click', click_menu_state);


          //console.log('init');


          cthis.on('click', '.prev-btn,.next-btn',handle_mouse);
        }


        function icecast_shoutcast_get_data(){



          var url = cthis.attr('data-source');

          if(type_normal_stream_type == 'shoutcast'){

            url = add_query_arg(o.settings_php_handler,'action','dzsap_shoutcast_get_streamtitle');
            url = add_query_arg(url,'source',(dataSrc));
          }


          $.ajax({
            type: "GET",
            url: url,
            crossDomain: true,
            success: function (response) {

              if(response.documentElement && response.documentElement.innerHTML){
                response = response.documentElement.innerHTML;
              }

              // console.log(' response - ',response);

              var regex_title = '';
              var regex_creator = '';
              var new_title = '';
              var new_artist = '';

              if(type_normal_stream_type=='icecast'){

                var regex_location = /<location>(.*?)<\/location>/g

                if(aux = regex_location.exec(response)){
                  console.log( ' aux - ',aux);

                  if(aux[1]!=data_source){
                    data_source = aux[1];
                    setup_media();
                  }
                }
              }

              if(radio_update_song_name) {

                if(type_normal_stream_type=='icecast') {
                  regex_title = /<title>(.*?)<\/title>/g

                  if(aux = regex_title.exec(response)){
                    new_title = aux[1];
                  }
                }
                if(type_normal_stream_type=='shoutcast'){

                  new_title = response;
                }

              }
              if(radio_update_artist_name){
                if(type_normal_stream_type=='icecast'){

                  regex_creator = /<creator>(.*?)<\/creator>/g;

                  if(aux = regex_creator.exec(response)){
                    new_artist = aux[1];
                  }
                }
                if(type_normal_stream_type=='shoutcast'){
                }
              }

              if(radio_update_song_name){

                _metaArtistCon.find('.the-name').html(new_title);
              }
              if(radio_update_artist_name){

                _metaArtistCon.find('.the-artist').html(new_artist)
              }
            },
            error: function(err){
              console.log('error loading icecast - ',err);
            }
          });
        }


        function check_every_05_secs(){


          // console.log('check_every_05_secs',cthis);
          if(!cthis){
            return false;
          }
          if (cthis.hasClass('first-played') == false) {

            if (!(cthis.attr('data-playfrom')) || cthis.attr('data-playfrom') == '0') {
              time_total_for_real = 0;
              time_total = 0;
              if ($(_cmedia) && $(_cmedia).html() && $(_cmedia).html().indexOf('api.soundcloud.com') > -1) {
                if(_cmedia.currentTime!=0){

                  seek_to(0, {
                    'call_from': 'first_played_false'
                  });
                }
              }
            }

          }


          if (type == 'fake' || o.fakeplayer) {


            // console.log('curr_time_first_set -> ',curr_time_first_set);

            if(cthis.hasClass('current-feeder-for-parent-player')==false){

              if(time_curr_for_visual){

                time_curr = time_curr_for_visual;
              }
            }

            // console.log(time_curr,_cmedia.currentTime,_cmedia);


            if (time_total == 0) {

              //if(cthis.attr('id')=='ap26'){
              //    console.log(time_total, _cmedia, _cmedia.duration);
              //}
              if (_cmedia) {
                time_total = _cmedia.duration;
                if (inter_audiobuffer_workaround_id == 0) {

                  time_curr = _cmedia.currentTime;
                }
              }
            }
            if (time_curr == 5) {
              // time_curr = 0;
            }


            // console.log(time_curr);
            // -- trying to fix some soundcloud wrong reporting





            // console.log(time_curr,cthis.hasClass('first-played'), cthis.attr('data-playfrom'), cthis)
            real_time_curr = time_curr;
            real_time_total = time_total;
          }
        }

        function load_yt_api(){

          // console.error("LOAD YT API");

          if (dzsap_ytapiloaded == false) {
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            dzsap_ytapiloaded = true;
          }
        }

        function detect_skinwave_mode(){

          skinwave_mode = o.skinwave_mode;

          if(cthis.hasClass('skin-wave-mode-small')){
            skinwave_mode = 'small'
          }
          if(cthis.hasClass('skin-wave-mode-alternate')){
            skinwave_mode = 'alternate'
          }
        }

        function comments_selector_event(e){
          var _t = $(this);
          var _con = null;

          if(_t.parent().parent().hasClass('zoomsounds-comment-wrapper')){
            _con = _t.parent().parent();
          }
          if(_t.parent().parent().parent().hasClass('zoomsounds-comment-wrapper')){
            _con = _t.parent().parent().parent();
          }
          // console.log(_t, e.type);
          if(e.type=='focusin'){

            // console.log(_t);


            var spx = time_curr / time_total * _commentsHolder.width();
            spx += 'px';
            // console.log(spx);


            sposarg = time_curr / time_total * 100 + '%';

            _con.addClass('active');

            add_comments_placeholder(spx);
          }
          if(e.type=='focusout'){



          }
          if(e.type=='click'){

            if(_t.hasClass('comments-btn-cancel')){

              _con.removeClass('active');
              _con.find('input').val('');
            }
            if(_t.hasClass('comments-btn-submit')){


              var comment_email = '';

              if(_con.find('.comment_email').length){
                comment_email = _con.find('.comment_email').eq(0).val();
              }


              comment_submit(_con.find('.comment_text').eq(0).val(), comment_email);



              _con.removeClass('active');
              _con.find('input').val('');


              return false;
            }


          }
        }



        function calculate_dims_time(){
          var reflection_size = parseFloat(o.skinwave_wave_mode_canvas_reflection_size);


          reflection_size = 1-reflection_size;


          var scrubbarh = _scrubbar.height();

          if(o.design_skin=='skin-wave'){


            // console.log('skinwave_mode - ',skinwave_mode);
            if(skinwave_mode=='small'){
              scrubbarh = 60;
            }

            if(_commentsHolder){

              if(reflection_size==0){

                // console.log(_scrubbar.offset().top - cthis.offset().top + scrubbarh *reflection_size - _commentsHolder.height())

                _commentsHolder.css('top',_scrubbar.offset().top - cthis.offset().top + scrubbarh *reflection_size - _commentsHolder.height());
              }else{

                // console.log(_scrubbar.height()*reflection_size);


                // console.log(_scrubbar.offset().top, cthis.offset().top, _scrubbar.offset().top - cthis.offset().top, reflection_size, _scrubbar.height(), _currTime.outerHeight());

                // console.log(_scrubbar.offset().top - cthis.offset().top + scrubbarh *reflection_size)
                // console.log('scrubbarh ->5 ',scrubbarh, _scrubbar.offset().top - cthis.offset().top, _scrubbar.parent().offset().top);
                // _commentsHolder.css('top', _scrubbar.offset().top - cthis.offset().top + scrubbarh *reflection_size);


                // console.log('_scrubbar.offset().top - ',_scrubbar.offset().top);
                // console.log('_scrubbar.parent().offset().top - ',_scrubbar.parent().offset().top);
                // console.log('scrubbarh * reflection_size - ',scrubbarh * reflection_size);


                _commentsHolder.css('top', _scrubbar.offset().top - _scrubbar.parent().offset().top + scrubbarh *reflection_size);
                _commentsWriter.css('top', _scrubbar.offset().top - _scrubbar.parent().offset().top + scrubbarh *reflection_size);
              }
            }

            //console.warn('cthis - ',cthis);
            //console.log('_scrubbar.height() - ',scrubbarh);
            //console.log('reflection_size - ',reflection_size);
            //console.log('_currTime.outerHeight() - ',_currTime.outerHeight());
            //
            //
            // console.warn(skinwave_mode,scrubbarh,reflection_size,_currTime.outerHeight());

            if(_currTime){

              // console.log('scrubbarh - ',scrubbarh);
              // console.log('reflection_size - ',reflection_size);
              // console.log('_currTime.outerHeight() - ',_currTime.outerHeight());


              _currTime.css('top', scrubbarh*reflection_size- _currTime.outerHeight());
            }
            if(_totalTime){

              _totalTime.css('top', scrubbarh*reflection_size- _totalTime.outerHeight());
            }
          }

          //console.log('reflection_size - ',reflection_size);

          cthis.attr('data-reflection-size',reflection_size);
        }

        function select_all(el) {
          if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.select();
          }
        }

        function change_visual_target(arg, pargs) {
          // -- change the visual target, the main is the main palyer player_playing and the visual target is the player which is a visual representation of this

          console.log('change_visual_target() - ', arg);

          var margs = {

          }


          // return false;


          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.log('old _feed_fakePlayer -  ', _feed_fakePlayer);

          if(_feed_fakePlayer && _feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_pause_media_visual) {
            _feed_fakePlayer.get(0).api_pause_media_visual({
              'call_from':'change_visual_target'
            });
          }
          _feed_fakePlayer = arg;


          console.log('new _feed_fakePlayer -  ', _feed_fakePlayer);

          var __c = _feed_fakePlayer.get(0);
          if(player_playing){
            if(_feed_fakePlayer && __c && __c.api_play_media_visual) {
              __c.api_play_media_visual();
            }
          }

          if(__c && __c.api_draw_curr_time){



            __c.api_set_time_curr(time_curr);
            __c.api_get_times({
              'call_from': ' change visual target .. in api '
            });
            __c.api_check_time({
              'fire_only_once': true
            });
            __c.api_draw_curr_time();
            __c.api_draw_scrub_prog();
          }

          setTimeout(function(){

            // console.log('__c.api_draw_curr_time - ',__c.api_draw_curr_time);
            if(__c && __c.api_draw_curr_time) {
              __c.api_get_times();
              __c.api_check_time({
                'fire_only_once': true
              });
              __c.api_draw_curr_time();
              __c.api_draw_scrub_prog();
            }
          },800);

        }

        function change_design_color_highlight(arg) {
          // -- change the visual target, the main is the main palyer player_playing and the visual target is the player which is a visual representation of this

          //console.log(arg);

          o.design_wave_color_progress = arg;

          if(o.skinwave_wave_mode=='canvas'){
            draw_canvas(_scrubbarbg_canvas.get(0), cthis.attr('data-pcm'), "#" + o.design_wave_color_bg,{call_from: 'canvas_change_pcm_bg'});
            draw_canvas(_scrubbarprog_canvas.get(0), cthis.attr('data-pcm'), "#" + o.design_wave_color_progress,{call_from: 'canvas_change_pcm_prog'});
          }

        }


        function change_media(arg, pargs) {
          // @arg - source
          // @pargs - {type:"audio", fakeplayer_is_feeder:"off"}
          // -- change media source for the player / change_media("song.mp3", {type:"audio", fakeplayer_is_feeder:"off"});


          var margs = {
            type: '',
            fakeplayer_is_feeder: 'off' // -- this is OFF in case there is a button feeding it, and on if it's an actual player
            ,call_from: 'default'
            ,source: 'default'
            ,pcm: ''
            ,artist:""
            ,song_name:""
            ,thumb:""
            ,thumb_link:""
            ,autoplay:"on"
            ,cue:"on"
            ,feeder_type:"player"
            ,watermark:""
            ,watermark_volume:""
            ,playerid:""
          };



          ajax_view_submitted = 'on'; // -- view submitted from caller

          var handle_resize_delay = 500;
          if (pargs) {
            margs = $.extend(margs, pargs);
          }
          // console.warn("change_media()",arg,margs);

          var _arg = arg;

          media_changed_index++;

          // console.log(_feed_fakePlayer,margs.fakeplayer_is_feeder);



          $('.current-feeder-for-parent-player').removeClass('current-feeder-for-parent-player');
          //console.log('change_media', "margs - ", margs, cthis, _feed_fakePlayer, arg);






          // -- let us decide if we pause old player
          var sw_pause_old_player = true;

          if(arg && arg.attr && cthis.attr('data-source') == arg.attr('data-source')){
            sw_pause_old_player = false;
          }
          if(cthis.attr('data-source') == arg){
            sw_pause_old_player = false;
          }







          // -- old feed fake player

          if (sw_pause_old_player && _feed_fakePlayer) {
            _feed_fakePlayer.get(0).api_pause_media_visual({
              'call_from':'change_media'
            });
          }




          if (margs.fakeplayer_is_feeder == 'on') {
            _feed_fakePlayer = arg;

            cthis.data('feeding-from',_feed_fakePlayer.get(0));
            _feed_fakePlayer.addClass('current-feeder-for-parent-player');

            margs.source = _feed_fakePlayer.attr('data-source');

            if(_feed_fakePlayer.attr('data-pcm')){
              margs.pcm = _feed_fakePlayer.attr('data-pcm');
            }


            // console.log("_feed_fakePlayer.find('.meta-artist') -> ",_feed_fakePlayer.find('.meta-artist'));





            if (_feed_fakePlayer.attr('data-thumb')) {
              margs.thumb = _arg.attr('data-thumb');
            }




            if (_feed_fakePlayer.attr('data-thumb_link')) {

              margs.thumb_link = _arg.attr('data-thumb_link');

            }



            if (_feed_fakePlayer.attr('data-soft-watermark')) {

              margs.watermark = _arg.attr('data-soft-watermark');

            }
            if (_feed_fakePlayer.attr('data-watermark-volume')) {

              margs.watermark_volume = _arg.attr('data-watermark-volume');

            }
            if (_feed_fakePlayer.attr('data-sample_time_start')) {
              cthis.attr('data-sample_time_start',_arg.attr('data-sample_time_start'));
            }else{
              cthis.attr('data-sample_time_start','');
            }
            if (_feed_fakePlayer.attr('data-sample_time_end')) {
              cthis.attr('data-sample_time_end',_arg.attr('data-sample_time_end'));
            }else{
              cthis.attr('data-sample_time_end','');
            }
            if (_feed_fakePlayer.attr('data-pseudo-sample_time_start')) {
              cthis.attr('data-pseudo-sample_time_start',_feed_fakePlayer.attr('data-pseudo-sample_time_start'));
            }else{
              cthis.attr('data-pseudo-sample_time_start','');
            }
            if (_feed_fakePlayer.attr('data-pseudo-sample_time_end')) {
              cthis.attr('data-pseudo-sample_time_end',_feed_fakePlayer.attr('data-pseudo-sample_time_end'));
            }else{
              cthis.attr('data-pseudo-sample_time_end','');
            }


            if (_feed_fakePlayer.attr('data-sample_time_total')) {
              cthis.attr('data-sample_time_total',_arg.attr('data-sample_time_total'));
            }else{
              cthis.attr('data-sample_time_total','');
            }



            _feed_fakeButton = null;

          } else {
            _feed_fakePlayer = null;
            _feed_fakeButton = arg;

            // console.log('check button feed', arg,_arg);


            // console.warn(margs);
          }




          if (_arg ) {
            if (_arg.attr('data-playerid')) {
              cthis.attr('data-feed-playerid', _arg.attr('data-playerid'));

              margs.playerid = _arg.attr('data-playerid');
            } else {

              cthis.attr('data-feed-playerid', '');
              margs.playerid='';
            }





            if(_arg.find('.meta-artist').length > 0 || _arg.find('.meta-artist-con').length > 0){

              margs.artist = _arg.find('.the-artist').eq(0).html();
              margs.song_name = _arg.find('.the-name').eq(0).html();
            }


            if (_arg.attr('data-thumb_for_parent')) {
              margs.thumb = _arg.attr('data-thumb_for_parent');
            }

            if(_arg.find('.feed-song-name').length > 0 || _arg.find('.feed-artist-name').length > 0){

              margs.artist = _arg.find('.feed-artist-name').eq(0).html();
              margs.song_name = _arg.find('.feed-song-name').eq(0).html();
            }
          }



          // console.log('change_media', "margs - ", margs);



          // console.log('change_media() - ');
          // --- if the media is the same DON'T CHANGE IT
          if (_feed_fakePlayer ) {

            // console.error(cthis.attr('data-source'), arg.attr('data-source'));

            if(cthis.attr('data-source') == arg.attr('data-source')){

              return false;
            }



            // -- TODO: if we want to add init_loaded to feeder we just uncomment this
            // if(_feed_fakePlayer.hasClass('init-loaded')){
            //
            // }else{
            //
            //     if(_feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_init_loaded){

            // _feed_fakePlayer.get(0).api_init_loaded({
            //     'called_from':'api'
            // });
            //     }
            // }

          }else{


            if(cthis.attr('data-source') == arg){

              return false;
            }

          }




          if(_feed_fakeButton){

            var _c = _feed_fakeButton;
            margs.source = _c.attr('data-source');

            if(_c.attr('data-pcm')){
              margs.pcm = _c.attr('data-pcm');
            }


            if (_c.find('.meta-artist').length > 0) {
              margs.artist = _arg.find('.the-artist').eq(0).html();
              margs.song_name = _arg.find('.the-name').eq(0).html();


            }


            if (_c.attr('data-thumb')) {
              margs.thumb = _arg.attr('data-thumb');
            }


            if (_c.attr('data-thumb_link')) {
              margs.thumb_link = _arg.attr('data-thumb_link');
            }

            // console.log(' _arg.attr(\'data-type\') ->  ',_arg.attr('data-type'));
            if (_arg.attr('data-type')) {
              margs.type = _arg.attr('data-type');
            }
          }





          if(margs.type=='detect'){
            margs.type = 'audio';
          }
          if(margs.type=='youtube'){

            var ytid = 'ytplayer_' + cthisId;

            if(media_changed_index){
              ytid+=media_changed_index;
            }
          }

          // console.log('change_media() margs - ',margs);
          cthis.removeClass('meta-loaded');

          // console.log('change_media()',arg,margs, cthis);

          if (cthis.parent().hasClass('audioplayer-was-loaded')) {

            cthis.parent().addClass('audioplayer-loaded');
            cthis.parent().removeClass('audioplayer-was-loaded');
          }

          if(_sticktobottom){
            _sticktobottom.addClass('audioplayer-loaded');
          }


          cthis.removeClass('errored-out');




          destroy_media();






          //console.log(cthis);


          cthis.attr('data-source', margs.source);
          cthis.attr('data-soft-watermark', margs.watermark);


          if(margs.watermark_volume){
            o.watermark_volume = margs.watermark_volume;
          }else{

            o.watermark_volume = 1;
          }


          //console.log('o.watermark_volume - ',o.watermark_volume);


          var original_type = margs.type;
          if (margs.type=='mediafile') {
            margs.type='audio';
          }

          if (margs.type) {

            if (margs.type == 'soundcloud') {
              margs.type = 'audio';
            }
            if (margs.type == 'album_part') {
              margs.type = 'audio';
            }
            cthis.attr('data-type', margs.type);
            type = margs.type;
            o.type = margs.type;
          }

          loaded = false;



          if(o.design_skin=='skin-wave') {
            if (o.skinwave_wave_mode == 'canvas') {

              if (_feed_fakePlayer) {

                src_real_mp3 = _arg.attr('data-source');

              } else {
                src_real_mp3 = arg;

              }


              // console.groupCollapsed('margs pcm');
              // console.log('margs pcm - ',margs.pcm, margs.pcm!='');
              // console.groupEnd();

              if (_arg && margs.pcm) {

                cthis.attr('data-pcm', _arg.attr('data-pcm'));
                generate_wave_data_animate(_arg.attr('data-pcm'));
              } else {
                // console.log("HMMM canvas")
                init_generate_wave_data({
                  'call_from':'regenerate_canvas_from_change_media'
                });
              }


              if (margs.pcm!='') {

                generate_wave_data_animate(margs.pcm);
                cthis.attr('data-pcm', margs.pcm);
              } else {



                _scrubbar.addClass('fast-animate-scrubbar');

                cthis.removeClass('scrubbar-loaded');
                setTimeout(function(){
                },10)
                setTimeout(function(){
                  cthis.removeClass('fast-animate-scrubbar');


                  // console.log("HMMM canvas")
                  pcm_is_real=false;
                  // pcm_identifier = src_real_mp3; // -- let's reload this so it does have nothing to do with the id

                  cthis.attr('data-pcm','');

                  // -- why would we do this
                  // pcm_identifier = '';

                  wave_mode_canvas_try_to_get_pcm();
                  init_generate_wave_data({
                    'call_from': 'regenerate_canvas_from_change_media'
                  });

                },120);


              }


            }



            // console.log(' artist - ',margs.artist, cthis.find('.the-artist'), margs)


            // -- inside skin-wave
            if(margs.thumb){

              if(cthis.find('.the-thumb').length){

                cthis.find('.the-thumb').css('background-image', 'url('+margs.thumb+')');
              }else{
                cthis.attr('data-thumb', margs.thumb);
                struct_generate_thumb();
              }

            }
          }





          if(margs.thumb){

            if(cthis.find('.the-thumb').length){

              cthis.find('.the-thumb').css('background-image', 'url('+margs.thumb+')');
            }else{
              cthis.attr('data-thumb', margs.thumb);
              struct_generate_thumb();
            }

            cthis.removeClass('does-not-have-thumb');
            cthis.addClass('has-thumb');
          }else{
            cthis.addClass('does-not-have-thumb');
            cthis.removeClass('has-thumb');
          }




          if(margs.pcm==''){

            setup_pcm_random_for_now();
          }else{

          }

          // console.log('%c _feed_fakePlayer.attr(\'data-playerid\') - ','color: #da00ff;',_feed_fakePlayer.attr('data-playerid'), cthis);


          if (_feed_fakePlayer) {

            if (_feed_fakePlayer.attr('data-playerid')) {

              pcm_identifier = _feed_fakePlayer.attr('data-playerid');
            } else {

              if (_feed_fakePlayer.attr('data-source')) {

                pcm_identifier = _feed_fakePlayer.attr('data-source');
              }
            }
          }
          console.log('%c pcm_identifier - ','color: #da00ff;',pcm_identifier);




          if(_playlistTooltip){
            var ind = 0;
            var _cach = _playlistTooltip.children('.dzstooltip--inner');
            _cach.children().removeClass('current-playlist-item');
            _cach.children().each(function(){
              var _t = $(this);

              // console.log('_t - ',_t);

              if(_t.attr('data-playerid')==margs.playerid){
                _t.addClass('current-playlist-item');
                playlist_inner_currNr = ind;
              }
            })
          }






          handle_resize_delay = 100;
          if (_feed_fakePlayer && _arg.find('.meta-artist').eq(0).html()) {

          }

          if(margs.artist){

            // _metaArtistCon.find('.the-artist').html(margs.artist);
            // _metaArtistCon.find('.the-artist').html(margs.artist);
          }

          if(_feed_fakePlayer){

            // -- .feed-dzsap-for-extra-html-right will be appended to the footer player
            if(_feed_fakePlayer.find('.feed-dzsap-for-extra-html-right').length){
              cthis.find('.extrahtml-in-float-right').eq(0).html(_feed_fakePlayer.find('.feed-dzsap-for-extra-html-right').html());

            }else{

            }
          }

          if(margs.artist){



            cthis.find('.the-artist').html(margs.artist);

          }
          if(margs.song_name){

            cthis.find('.the-name').html(margs.song_name);

          }


          // console.error('margs.source - ',margs.source,margs.type, type);
          if(original_type=='soundcloud' && margs.source.indexOf('api.soundcloud')==-1){

            data_source = margs.source;
            console.log("RETRIEVE SOUNDCLOUD URL");
            play_promised = true;

            setTimeout(function(){
              play_promised = true;
            },501);
            retrieve_soundcloud_url();

          }else{

            setup_media({
              'call_from': 'change_media'
            });
          }


          settle_sample_times();

          if(last_vol){

            set_volume(last_vol, {
              call_from: "change_media"
            });
          }


          if (type == 'fake') {
            return false;

          }

          if(o.action_audio_change_media){
            o.action_audio_change_media(arg,margs);
          }


          //console.log("IS MOBILE - ",dzsap_is_mobile());
          // console.log('%c before autoplay margs - ','color: #dadada;',margs, dzsap_is_mobile());
          if(margs.autoplay=='on' && dzsap_is_mobile()==false){
            play_media_visual();

            setTimeout(function() {

              play_media({
                'call_from':'margs.autoplay'
              });
            }, 500);
          }
          setTimeout(function() {

            handleResize();
          }, handle_resize_delay)
        }


        function setup_controls_commentsHolder() {





          if(_commentsChildren){


            // console.log(' _commentsChildren - ',_commentsChildren, cthis);
            _commentsChildren.each(function(){

              var _c = $(this);






              if (o.skinwave_comments_process_in_php == 'on') {

                if(_c && _c.hasClass && _c.hasClass('dzstooltip-con')){
                  if(_c.find('.dzstooltip > .dzstooltip--inner').length){

                  }else{
                    // -- convert


                    // console.error("CONVERT");
                    _c.find('.dzstooltip').wrapInner('<div class="dzstooltip--inner"></div>');


                    _c.find('.the-avatar').addClass('tooltip-indicator');

                    _c.find('.dzstooltip').before(_c.find('.tooltip-indicator'));
                    _c.find('.dzstooltip').addClass('talign-start style-rounded color-dark-light');
                  }
                }
              }

              _commentsHolder.append(_c);
            })
          }


          // for (i = 0; i < _commentsChildren.length; i++) {
          //
          //     // -- add comments here
          //     if (_commentsHolder && _commentsChildren[i] != null) {
          //
          //         var _c = _commentsChildren[i];
          //
          //
          //
          //
          //         if(_c && _c.hasClass && _c.hasClass('dzstooltip-con')){
          //             if(_c.find('.dzstooltip > .dzstooltip--inner').length){
          //
          //             }else{
          //                 // -- convert
          //
          //
          //                 console.error("CONVERT");
          //                 _c.find('.dzstooltip').wrapInner('<div class="dzstooltip--inner"></div>');
          //             }
          //         }
          //
          //         _commentsHolder.append(_c);
          //
          //     }
          // }
        }

        function destroy_listeners() {


          if (destroyed) {
            return false;
          }



          sw_suspend_enter_frame = true;

        }

        function destroy_it() {


          if (destroyed) {
            return false;
          }

          if (player_playing) {
            pause_media();
          }



          $(window).off('resize.dzsap');

          cthis.remove();
          cthis = null;

          destroyed = true;
        }

        function click_for_setup_media(e, pargs) {
          // console.log('click_for_setup_media', cthis, pargs);

          //console.log(e.target);
          //cthis.unbind('click', click_for_setup_media);



          var margs = {

            'do_not_autoplay': false
          };

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          cthis.find('.playbtn').unbind('click', click_for_setup_media);
          cthis.find('.scrubbar').unbind('click', click_for_setup_media);

          setup_media(margs);


          if (is_android() || is_ios()) {

            play_media({
              'call_from':'click_for_setup_media'
            });
          }
        }

        function blur_ap() {
          //console.log('ceva');
          hide_comments_writer();
        }

        function click_menu_state(e) {

          if (o.parentgallery && typeof(o.parentgallery.get(0)) != "undefined") {
            o.parentgallery.get(0).api_toggle_menu_state();
          }
        }

        function click_comments_bg(e) {

          console.log('click_comments_bg');
          var _t = $(this);
          var lmx = parseInt(e.clientX, 10) - _t.offset().left;
          sposarg = (lmx / _t.width()) * 100 + '%';
          var argcomm = htmlEncode('');


          if (o.skinwave_comments_links_to) {
            return;
          }

          if (o.skinwave_comments_allow_post_if_not_logged_in == 'off' && o.skinwave_comments_account == 'none') {

            return false;
          }

          var sw = true;

          _commentsHolder.children().each(function() {
            var _t2 = $(this);
            //console.log(_t2);

            if (_t2.hasClass('placeholder') || _t2.hasClass('the-bg')) {
              return;
            }

            var lmx2 = _t2.offset().left - _t.offset().left;

            //console.log(lmx2, Math.abs(lmx2-lmx));

            if (Math.abs(lmx2 - lmx) < 20) {
              _commentsHolder.find('.dzstooltip-con.placeholder').remove();
              sw = false;

              return false;
            }
          })


          if (!sw) {
            return false;
          }

          var comments_offset = _commentsHolder.offset().left - cthis.offset().left;


          var aux3 = lmx+comments_offset - (_commentsWriter.width()/2)+7;

          var aux4 = -1;

          if(aux3<comments_offset){
            aux4 = aux3+32;
            aux3 = comments_offset;

            // console.error(aux4);


            cthis.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:'+aux4+'px  }</style>');

          }else{

            if(aux3>tw-comments_offset - (_commentsWriter.width()/2) ){
              aux4 = lmx - (_commentsWriter.offset().left - cthis.offset().left) + (_commentsWriter.width()/3) ;
              aux3 = tw-comments_offset - (_commentsWriter.width()/2);

              // console.error(lmx, _commentsWriter.offset().left - cthis.offset().left,  aux4);


              cthis.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:'+aux4+'px  }</style>');

            }else{

              cthis.find('.comments-writter-temp-css').remove();
            }
          }


          _commentsWriter.css('left', (aux3)+'px')



          _commentsWriter.css({
            'left':'50%'
            ,'top':'80px'
            ,'transform':'translate3d(-50%,0,0)'
            ,'width':'100%'
          })


          if (_commentsWriter.hasClass('active') == false) {
            _commentsWriter.css({
              'height': _commentsWriter.find('.comments-writer-inner').eq(0).outerHeight() + 20
            });


            _commentsWriter.addClass('active');

            cthis.addClass('comments-writer-active');

            if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_handleResize != undefined) {
              $(o.parentgallery).get(0).api_handleResize();
            }
          }

          if (o.skinwave_comments_account != 'none') {
            cthis.find('input[name=comment-email]').remove();
          }


          add_comments_placeholder(sposarg);

          //cthis.unbind('focusout', blur_ap);
          //cthis.bind('blur', blur_ap);
        }


        function add_comments_placeholder(sposarg){


          _commentsHolder.remove('.dzsap-style-comments');
          _commentsHolder.append('<style class="dzsap-style-comments">.dzstooltip-con:not(.placeholder) { opacity: 0.5; }</style>')
          _commentsHolder.find('.dzstooltip-con.placeholder').remove();
          _commentsHolder.append('<span class="dzstooltip-con placeholder" style="left:' + sposarg + ';"><div class="the-avatar" style="background-image: url(' + o.skinwave_comments_avatar + ')"></div></span>');
        }

        function click_cancel_comment(e) {
          hide_comments_writer();
        }


        function comment_submit(comment_text, comment_email, comment_username){
          var comm_author = '';
          if (comment_email) {
            var regex_mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (regex_mail.test(comment_email) == false) {
              alert('please insert email, your email is just used for gravatar. it will not be sent or stored anywhere');
              return false;
            }

            comm_author = String(comment_email).split('@')[0];
            o.skinwave_comments_account = comm_author;
            //console.log(comm_author);


            if(_commentsSelector){

              _commentsSelector.find('*[name=comment_email],*[name=comment_user]').remove();
            }


            o.skinwave_comments_avatar = 'https://secure.gravatar.com/avatar/' + MD5(String(cthis.find('input[name=comment-email]').eq(0).val()).toLowerCase()) + '?s=20';
          } else {

          }


          console.log('comment_submit() - ',comment_text, comment_email);

          // return false;

          comm_author = o.skinwave_comments_account;

          var aux = '';



          if (o.skinwave_comments_process_in_php != 'on') {

            // -- process the comment now, in javascript

            aux += '<span class="dzstooltip-con zoomsounds-comment" style="left:' + sposarg + '"><div class="the-avatar tooltip-indicator" style="background-image: url(' + o.skinwave_comments_avatar + ')"></div><span class="dzstooltip arrow-bottom style-rounded color-dark-light talign-start  transition-slidein arrow-bottom " style="width: 250px;"><span class="dzstooltip--inner"><span class="the-comment-author">@' + comm_author + '</span> says:<br>';
            aux += htmlEncode(comment_text);


            aux += '</span></span></span>';
          } else {



            // -- process php

            aux += comment_text;
          }


          cthis.find('*[name=comment-text]').eq(0).val('');





          cthis.find('.comments-writter-temp-css,.dzsap-style-comments').remove();


          skinwave_comment_publish(aux)

          hide_comments_writer();

          if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_player_commentSubmitted != undefined) {
            $(o.parentgallery).get(0).api_player_commentSubmitted();
          }

        }

        function click_submit_comment(e) {

          var comment_email = '';

          if(cthis.find('input[name=comment-email]').length){
            comment_email = cthis.find('input[name=comment-email]').eq(0).val();
          }


          comment_submit(cthis.find('*[name=comment-text]').eq(0).val(), comment_email);


          return false;
        }

        function hide_comments_writer() {

          //console.log(_commentsWriter);
          cthis.removeClass('comments-writer-active');
          _commentsHolder.find('.dzstooltip-con.placeholder').remove();
          _commentsWriter.removeClass('active');
          _commentsWriter.css({
            'height': 0
          })


          if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_handleResize != undefined) {
            $(o.parentgallery).get(0).api_handleResize();
          }

          setTimeout(function(){

            cthis.find('.comments-writter-temp-css,.dzsap-style-comments').remove();
          },300);
          //cthis.unbind('focusout', blur_ap);
        }

        function check_yt_ready(argid) {
          //console.log(loaded);


          console.log('check_yt_ready()', loaded, window.YT)
          if (loaded == true) {
            return;
          }
          //console.log('ceva');
          //var player;

          if(argid){

          }else{
            argid = yt_curr_id;
          }


          console.log(argid, $(argid));
          _cmedia = new YT.Player(argid + '', {
            height: '200',
            width: '200',
            videoId: cthis.attr('data-source'),
            playerVars: {
              origin: ''
              , controls: 1, 'showinfo': 0, 'playsinline' : 1, rel:0, autohide: 0, wmode: 'transparent', iv_load_policy: '3'
            },
            events: {
              'onReady': check_yt_ready_phase_two,
              'onStateChange': change_yt_state
            }
          });

          yt_inited = true;


          return false;
          //init_loaded();
        }

        function check_yt_ready_phase_two(arg) {

          console.log('check_yt_ready_phase_two', arg);



          // console.log(_cmedia, _cmedia.getPlayerState);

          //debugger;
          if(_cmedia && _cmedia.getPlayerState){
            init_loaded({
              'call_from':'check_yt_ready_phase_two'
            });

            if(yt_retry_play_timeout){
              setTimeout(function(){
                play_media({
                  'call_from':'check_yt_ready_phase_two'
                });
              },500);
            }
          }else{
            setTimeout(function(){
              check_yt_ready_phase_two(arg)
            },1000);
          }
        }

        function change_yt_state(arg) {
          // console.log('change_yt_state - ', arg);

          if(arg.data==4){

          }
          if(arg.data==2){

            pause_media({
              'call_from':'youtube paused'
            });
          }
          if(arg.data==1){

            play_media({
              'call_from':'youtube playing'
            });
            cthis.addClass('dzsap-loaded');
          }
          if(arg.data==-1){

            // console.log('player_playing - ',player_playing);

            if(player_playing){
              seek_to(0);
            }
          }
        }

        function check_ready(pargs) {
          // console.log('check_ready()', cthis, _cmedia, _cmedia.readyState);
          //=== do a little ready checking



          var margs = {

            'do_not_autoplay': false
          };

          if(o.fakeplayer && is_ios()){
            return false;
          }


          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.log(_cmedia.readyState);
          if (type == 'youtube') {

            init_loaded(margs);
          } else {
            if (typeof(_cmedia) != 'undefined' && _cmedia) {


              //console.log(_cmedia.readyState, o.type, is_safari());


              //                        return false;
              if (_cmedia.nodeName != "AUDIO" || o.type == 'shoutcast') {
                init_loaded(margs);
              } else {
                if (is_safari()) {

                  if (_cmedia.readyState >= 1) {
                    //console.log("CALL INIT LOADED FROM ",_cmedia.readyState);

                    if(loaded==false){
                    }

                    init_loaded(margs);
                    clearInterval(inter_checkReady);

                    if (o.action_audio_loaded_metadata) {
                      o.action_audio_loaded_metadata(cthis);
                    }
                  }
                } else {
                  if (_cmedia.readyState >= 2) {
                    //console.log("CALL INIT LOADED FROM ",_cmedia.readyState);
                    if(loaded==false) {
                    }
                    init_loaded(margs);
                    clearInterval(inter_checkReady);

                    // console.log(_cmedia.duration);


                    // console.log(o.action_audio_loaded_metadata)
                    if (o.action_audio_loaded_metadata) {
                      o.action_audio_loaded_metadata(cthis);
                    }
                  }
                }

              }
            }

          }

        }

        function show_scrubbar() {

          // return false;


          setTimeout(function(){


            if(cthis){

              cthis.addClass('scrubbar-loaded');
            }
            // _scrubbar.css({
            //     'opacity':'1'
            // });
            //
            // setTimeout(function(){
            //
            //     _scrubbar.css('opacity','');
            // },500);
          },1000);
        }

        function wave_mode_canvas_try_to_get_pcm(pargs){


          var margs = {

          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }


          // console.log("TRY TO GET PCM",cthis,margs, cthis.attr('data-pcm'));

          if(src_real_mp3=='fake'){
            return false;
          }

          if (cthis.attr('data-pcm')) {


          } else {

            var data = {
              action: 'dzsap_get_pcm',
              postdata: '1',
              source: cthis.attr('data-source'),
              playerid: pcm_identifier
            };



            // console.error("TRY TO GET PCM");



            if (o.settings_php_handler) {
              $.ajax({
                type: "POST",
                url: o.settings_php_handler,
                data: data,
                success: function(response) {
                  //if(typeof window.console != "undefined" ){ console.log('Ajax - get - comments - ' + response); }

                  // console.groupCollapsed("receivedPCM");
                  // console.log(response);
                  // console.groupEnd();

                  // console.log('response pcm - ',response);
                  if(response){

                    if(response!='0' && response.indexOf(',')>-1){

                      cthis.attr('data-pcm', response);
                      pcm_is_real=true;

                      if(_scrubbar.css('opacity')=='0'){

                      }

                      setTimeout(function(){


                        cthis.addClass('scrubbar-loaded');
                        calculate_dims_time();
                        setTimeout(function(){

                          // calculate_dims();

                        },100);
                      },100);
                      // show_scrubbar();
                    }else{

                      pcm_try_to_generate=true;
                      init_generate_wave_data({
                        'call_from':'no response from pcm ajax, generate it'
                      });
                    }

                    // console.log('pcm_try_to_generate - ',pcm_try_to_generate);
                  }else{





                    // console.log('o.cue - ',o.cue);

                    if(o.cue=='on'){

                      pcm_try_to_generate=true;



                      init_generate_wave_data({
                        'call_from':'pcm_data_try_to_generate .. no data-pcm'
                      });
                    }else{

                      pcm_promise_generate_on_meta_load = true; // -- we are promising generating on meta load
                      if(o.pcm_data_try_to_generate_wait_for_real_pcm=='on'){

                        // console.log('ceva - ',pcm_promise_generate_on_meta_load)
                        // console.log('cthis meta loaded ? ',cthis.hasClass('meta-loaded'), cthis)

                        var default_pcm = [];

                        for (var i3 = 0; i3 < 200; i3++) {
                          default_pcm[i3] = Number(Math.random()).toFixed(3);
                        }
                        default_pcm = JSON.stringify(default_pcm);
                        generate_wave_data_animate(default_pcm);

                        pcm_is_real= false;
                      }
                    }
                  }

                },
                error: function(arg) {
                  if (typeof window.console != "undefined") {
                    // console.log('Got this from the server: ' , arg);
                  };
                }
              });
              pcm_try_to_generate=false;
            }else{

            }
          }
        }


        function init_generate_wave_data(pargs) {





          var margs = {
            'call_from' : 'default'
            ,'call_attempt' : 0
          };


          if(pargs){
            margs = $.extend(margs,pargs);
          }

          if(pcm_is_real){
            return false;
          }

          if(src_real_mp3=='fake'){
            return false;
          }

          //console.log('init_generate_wave_data(pargs) ->> ',margs, cthis, 'pcm_try_to_generate - ',pcm_try_to_generate);


          if(pcm_try_to_generate){

          }else{
            setTimeout(function(){

              margs.call_attempt++;

              if(margs.call_attempt<10){

                init_generate_wave_data(margs);
              }

            },1000)
            return false;
          }


          // console.log('init_generate_wave_data', margs);


          // console.log('init_generate_wave_data', cthis.attr('data-source'));
          if (window.WaveSurfer) {
            // console.log('wavesurfer already loaded');
            generate_wave_data({
              'call_from': 'wavesurfer already loaded'
            });
          } else {
            var scripts = document.getElementsByTagName("script");


            var baseUrl = '';
            for (var i23 in scripts) {
              if(scripts[i23] && scripts[i23].src){
                if (scripts[i23].src.indexOf('audioplayer.js') > -1) {
                  break;
                }
              }
            }
            var baseUrl_arr = String(scripts[i23].src).split('/');
            for (var i24 = 0; i24 < baseUrl_arr.length - 1; i24++) {
              baseUrl += baseUrl_arr[i24] + '/';
            }

            var url = baseUrl + 'wavesurfer.js';





            if(o.pcm_notice=='on'){

              cthis.addClass('errored-out');
              cthis.append('<div class="feedback-text pcm-notice">please wait while pcm data is generated.. </div>');
            }




            dzsap_wavesurfer_load_attempt++;

            if(dzsap_wavesurfer_load_attempt>2){
              url = 'https://unpkg.com/wavesurfer.js@2.1.3/dist/wavesurfer.min.js';
            }
            if(dzsap_wavesurfer_load_attempt<6) {
              // console.log('load wavesurfer');
              $.ajax({
                url: url,
                dataType: "script",
                success: function (arg) {
                  //console.log(arg);

                  // cthis.append('')


                  generate_wave_data({
                    'call_from': 'load_script'
                    , 'wavesurfer_url': url
                  });


                },
                error: function (arg) {

                }
              });
            }
          }
        }


        function send_pcm(ar_str){



          cthis.attr('data-pcm', ar_str);
          if (_feed_fakeButton && _feed_fakeButton.attr) {
            _feed_fakeButton.attr('data-pcm', ar_str);
          }
          if (_feed_fakePlayer && _feed_fakePlayer.attr) {
            _feed_fakePlayer.attr('data-pcm', ar_str);
          }


          console.log("which is fake player ? ", cthis, o.fakeplayer, _feed_fakePlayer);





          cthis.find('.pcm-notice').fadeOut("fast");
          cthis.removeClass('errored-out');






          // console.log('generating wave data for '+cthis.attr('data-source'));
          console.log('%c pcm_identifier before- ','color: #dd0022; background-color: #eee;', pcm_identifier, cthis);
          if (pcm_identifier == '') {
            pcm_identifier = cthis.attr('data-source');


            if (original_real_mp3) {
              pcm_identifier = original_real_mp3;
            }
          }
          console.log('%c pcm_identifier- ','color: #dd0022; background-color: #eee;', pcm_identifier, cthis);




          var data = {
            action: 'dzsap_submit_pcm'
            ,postdata: ar_str
            ,playerid: pcm_identifier
            ,source: cthis.attr('data-source')
          };


          window.dzsap_generating_pcm = false;


          if (o.settings_php_handler) {


            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {

              }
            });
          }
        }


        function generate_wave_data(pargs) {


          var margs = {
            call_from: 'default'
          }

          if (pargs) {
            $.extend(margs, pargs);
          }



          // console.log('generate_wave_data margs - ', margs);




          if(src_real_mp3!='fake'){

          }else{
            return false;
          }


          if(window.dzsap_generating_pcm ){
            setTimeout(function(){
              generate_wave_data(margs)
            },1000);

            return false;
          }


          window.dzsap_generating_pcm = true;

          // console.log('generate_wave_data margs - ', margs);


          // console.log(' generate_wave_data()', src_real_mp3);

          var id = 'wavesurfer' + Math.ceil(Math.random() * 10000);
          cthis.append('<div id="' + id + '" class="hidden"></div>');

          var wavesurfer = WaveSurfer.create({
            container: '#' + id
            ,normalize: true
            ,pixelRatio: 1
          });


          // console.log(String(cthis.attr('data-source')).indexOf('https://soundcloud.com'));
          if (String(cthis.attr('data-source')).indexOf('https://soundcloud.com') == 0 || cthis.attr('data-source') == 'fake') {
            return;
          }
          if (String(cthis.attr('data-source')).indexOf('https://api.soundcloud.com') == 0) {}


          // console.log(' src_real_mp3 - '+src_real_mp3, src_real_mp3);
          try{
            wavesurfer.load(src_real_mp3);
          }catch(err){
            console.log("WAVE SURFER NO LOAD");
          }



          wavesurfer.on('ready', function() {
            //            wavesurfer.play();

            var accuracy = 100;

            if(_cmedia  && _cmedia.duration && _cmedia.duration>1000){

              accuracy= 100;
            }

            // console.log(_cmedia, _cmedia.duration);

            var ar_str = [];
            if(wavesurfer && wavesurfer.exportPCM){

              ar_str = wavesurfer.exportPCM(o.wavesurfer_pcm_length, accuracy, true);
            }else{
              ar_str = generateFakeArray();
            }

            // console.groupCollapsed("new ar_str");
            // console.log('new ar_str - ' , ar_str);
            //
            // console.groupEnd();

            // console.log('ar_str -',ar_str);


            send_pcm(ar_str);

            generate_wave_data_animate(ar_str);


          });

          wavesurfer.on('error', function() {
            //            wavesurfer.play();

            console.log("WAVE SURFER ERROR !!!");

            var default_pcm = [];

            for (var i3 = 0; i3 < 200; i3++) {
              default_pcm[i3] = Number(Math.random()).toFixed(3);
            }
            default_pcm = JSON.stringify(default_pcm);

            send_pcm(default_pcm);
            generate_wave_data_animate(default_pcm);

          });



        }



        function generate_wave_data_animate(argpcm) {

          //console.log('generate_wave_data_animate',cthis);




          _scrubbar.find('.scrub-bg-img,.scrub-prog-img').removeClass('transitioning-in');
          _scrubbar.find('.scrub-bg-img,.scrub-prog-img').addClass('transitioning-out');
          _scrubbar.find('.scrub-bg-img,.scrub-prog-img').animate({
            'opacity': 0
          }, {
            queue: false,
            duration: 300
          });

          setup_structure_scrub_canvas({
            'prepare_for_transition_in': true
          });



          // console.log('what is canvas width??',_scrubbarprog_canvas, _scrubbar.find('.scrub-bg-img').width());


          // console.groupCollapsed("'generate_wave_data_animate'");
          // console.log(_scrubbarbg_canvas.eq(0), argpcm, o.design_wave_color_bg, o.design_wave_color_progress);
          // console.groupEnd();

          // console.log("#"+o.design_wave_color_bg, '#'+o.design_wave_color_progress, _scrubbarprog_canvas.width());


          _scrubbarbg_canvas = cthis.find('.scrub-bg-img.transitioning-in');
          _scrubbarprog_canvas = cthis.find('.scrub-prog-img.transitioning-in');

          // console.log('_scrubbarbg_canvas ( should be current )  - ',_scrubbarbg_canvas)



          draw_canvas(_scrubbarbg_canvas.get(0), argpcm, "#" + o.design_wave_color_bg,{call_from: 'canvas_generate_wave_data_animate_pcm_bg'});
          draw_canvas(_scrubbarprog_canvas.get(0), argpcm, '#' + o.design_wave_color_progress,{call_from: 'canvas_generate_wave_data_animate_pcm_prog'});


          _scrubbar.find('.scrub-bg-img.transitioning-in,.scrub-prog-img.transitioning-in').animate({
            'opacity': 1
          }, {
            queue: false,
            duration: 300,
            complete: function() {
              var _con = $(this).parent();

              // console.log(_con);
              // console.log("REMOVING",_con.children('.transitioning-out') );
              _con.children('.transitioning-out').remove();
              _con.children('.transitioning-in').removeClass('transitioning-in');
            }
          });



          // -- warning - not always real pcm
          pcm_is_real = true;

          show_scrubbar();
        }

        function struct_generate_thumb(){

          // return false;


          if (cthis.attr('data-thumb') ) {


            cthis.addClass('has-thumb');
            var aux_thumb_con_str = '';

            if (cthis.attr('data-thumb_link')) {
              aux_thumb_con_str += '<a href="' + cthis.attr('data-thumb_link') + '"';
            } else {
              aux_thumb_con_str += '<div';
            }
            aux_thumb_con_str += ' class="the-thumb-con"><div class="the-thumb" style=" background-image:url(' + cthis.attr('data-thumb') + ')"></div>';


            if (cthis.attr('data-thumb_link')) {
              aux_thumb_con_str += '</a>';
            } else {
              aux_thumb_con_str += '</div>';
            }


            if(cthis.children('.the-thumb-con').length){
              aux_thumb_con_str = cthis.children('.the-thumb-con').eq(0);
            }


            if (o.design_skin != 'skin-customcontrols') {
              if (o.design_skin == 'skin-wave' && ( skinwave_mode == 'small' || skinwave_mode == 'alternate' ) ) {

                if(skinwave_mode == 'alternate'){

                  // console.log("WHERE IS INNER ? ",_audioplayerInner);
                  _audioplayerInner.prepend(aux_thumb_con_str);
                }else{

                  _apControlsLeft.prepend(aux_thumb_con_str);
                }
              } else if (o.design_skin == 'skin-steel') {


                _apControlsLeft.append(aux_thumb_con_str);
              } else {

                _audioplayerInner.prepend(aux_thumb_con_str);
              }
            }

            _theThumbCon = _audioplayerInner.children('.the-thumb-con').eq(0);
          }else{

            cthis.removeClass('has-thumb');
          }
        }

        function apply_skinwave_mode_class() {


          cthis.removeClass('skin-wave-mode-normal');
          if (o.design_skin == 'skin-wave') {
            cthis.addClass('skin-wave-mode-' + skinwave_mode);


            if (skinwave_mode == 'small') {
              if (o.design_thumbh == 'default') {
                design_thumbh = 80;
              }
            }
            cthis.addClass('skin-wave-wave-mode-' + o.skinwave_wave_mode);

            if(o.skinwave_enableSpectrum=='on'){

              cthis.addClass('skin-wave-is-spectrum');
            }
            cthis.addClass('skin-wave-wave-mode-canvas-mode-' + o.skinwave_wave_mode_canvas_mode);

          }

        }
        function retrieve_soundcloud_url(pargs) {



          console.log( ' ooo - ',o);
          if (o.soundcloud_apikey == '') {
            alert('soundcloud api key not defined, read docs!');
          }
          var aux = 'http://api.' + 'soundcloud.com' + '/resolve?url=' + data_source + '&format=json&consumer_key=' + o.soundcloud_apikey;
          //console.log(aux);

          if ((o.design_skin == 'skin-wave' && !cthis.attr('data-scrubbg'))) {
            o.skinwave_enableReflect = 'off';
          }

          aux = encodeURIComponent(aux);


          var soundcloud_retriever = o.php_retriever + '?scurl=' + aux;


          $.ajax({
            type: "GET",
            url: soundcloud_retriever
            ,data: {}
            ,async: true
            ,dataType: 'text'
            ,error: function (err, q,t) {

              console.log('retried soundcloud error', err, q, t);
            }
            ,success: function (response) {

              // console.log('got response - ', response);
              var data = [];


              try {
                var data = JSON.parse(response);
                // console.log('got json - ', data);
                type = 'audio';


                if (data == '') {
                  cthis.addClass('errored-out');
                  cthis.append('<div class="feedback-text">soundcloud track does not seem to serve via api</div>');
                }



                //console.log('o.design_skin - ', o.design_skin);
                original_real_mp3 = cthis.attr('data-source');
                if(data.stream_url){

                  cthis.attr('data-source', data.stream_url + '?consumer_key=' + o.soundcloud_apikey + '&origin=localhost');



                  if(_feed_fakeButton){
                    _feed_fakeButton.attr('data-source',cthis.attr('data-source') );
                  }
                  if(_feed_fakePlayer){
                    _feed_fakePlayer.attr('data-source',cthis.attr('data-source') );
                  }
                }else{

                  cthis.addClass('errored-out');
                  cthis.append('<div class="feedback-text ">this soundcloud track does not allow streaming  </div>');
                }
                src_real_mp3 = cthis.attr('data-source');


                if (cthis.attr('data-pcm')) {


                  pcm_is_real = true;
                }
                if (o.design_skin == 'skin-wave'){

                  if (o.skinwave_wave_mode == 'canvas') {

                    // console.log('pcm_is_real - ',pcm_is_real);
                    if (pcm_is_real == false) {

                      if( ( o.pcm_data_try_to_generate=='on' && o.pcm_data_try_to_generate_wait_for_real_pcm=='on')==false ) {
                        init_generate_wave_data({
                          'call_from': 'init(), pcm not real..'
                        });
                      }
                    }
                  }
                }


                //                        if(window.console) { console.log(data); };

                if (o.cue == 'on' || _feed_fakePlayer || _feed_fakeButton) {

                  // console.log("SETUPING MEDIA")
                  setup_media({
                    'call_from':'retrieve_soundcloud_url'
                  });


                  setTimeout(function(){

                    // console.log('play_promised -3 ',play_promised);
                    if(play_promised){
                      play_media({
                        'call_from':'retrieve_soundcloud_url'
                      })
                      play_promised = false;
                    }
                  },300);


                }
              }catch(err){
                console.log('soduncloud parse error -'  ,response, ' - ',soundcloud_retriever);
              }
            }
          });

        }


        function playlist_goto_item(arg,pargs) {

          // -- this is the function called from playlist menu item ( footer )


          var margs = {
            'call_from':"default"
          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }



          console.log('playlist_goto_item - margs - ',margs, 'arg - ',arg);





          var _cach_con = null;


          if(_playlistTooltip){
            _cach_con = _playlistTooltip.find('.dzstooltip--inner');

            var _cach = _cach_con.children().eq(arg);

            // console.log(_cach);

            var playerid = _cach.attr('data-playerid');


            // console.log('playerid && $(\'.audioplayer[data-playerid="\'+playerid+\'"]\').length && $(\'.audioplayer[data-playerid="\'+playerid+\'"]\').eq(0).get(0).api_play_media - ',playerid);
            // console.log('the-player - ', $('.audioplayer[data-playerid="'+playerid+'"],.audioplayer-tobe[data-playerid="'+playerid+'"]'));


            var _cach = $('.audioplayer[data-playerid="'+playerid+'"],.audioplayer-tobe[data-playerid="'+playerid+'"]');


            if(playerid && _cach.length && _cach.eq(0).get(0) && _cach.eq(0).get(0).api_play_media){


              $('.audioplayer[data-playerid="'+playerid+'"]').eq(0).get(0).api_play_media({

                'call_from':'api_sync_players_prev'
              });

            }else{



              if(_cach.parent().parent().parent().hasClass('audiogallery')){
                _cach.parent().parent().parent().get(0).api_goto_item(arg);
              }else{

                // -- in case we change the page ;)
                change_media(_cach);
              }


            }

            playlist_inner_currNr = arg;

          }
        }


        function setup_playlist_inner(pargs) {
          // -- setup playlist for footer


          var margs = {
            'call_from':"default"
          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }




          // console.log('setup_playlist_inner() dzsap_list_for_sync_players -4 ',dzsap_list_for_sync_players,margs,cthis);


          if(_playlistTooltip){
            // -- clear all before adding
            _playlistTooltip.find('.dzstooltip--inner').html('');
            var aux = '';
            for(var lab in dzsap_list_for_sync_players){
              // -- setup inner playlist for sticky player


              var _c = dzsap_list_for_sync_players[lab];

              if(_c.hasClass('number-wrapper') || _c.hasClass('for-number-wrapper')){
                continue;
              }

              aux+='<div class="playlist-menu-item"';



              $.each(_c.get(0).attributes, function() {
                // -- we remember attributes in case the page has changed and we lost..
                if(this.specified && this.name && this.name!='id' && this.name!='style') {

                  aux+=' '+this.name+'="'+this.value+'"';
                  // console.log(this.name, this.value);
                }
              });



              aux+='>';


              aux+='<div class="pi-thumb-con">';
              aux+='<div class="pi-thumb divimage" style="background-image: url('+_c.attr('data-thumb')+')">';
              aux+='</div>'
              aux+='</div>'
              aux+='<div class="pi-meta-con">';

              aux+='<div class="pi-the-artist">';
              aux+=_c.find('.the-artist').eq(0).text();
              aux+='</div>';

              aux+='<div class="pi-the-name">';
              aux+=_c.find('.the-name').eq(0).text();
              aux+='</div>';

              aux+='</div>';


              aux+='<div class="the-sort-handle">';
              aux+=svg_arrow_resize;
              aux+='</div>';

              aux+='</div>';

            }
            _playlistTooltip.find('.dzstooltip--inner').append(aux);



            cthis.on('mousedown','.the-sort-handle',handle_mouse);
            $(document).on('mousemove.dzsap_playlist_item',function(e){

              if(window.dzsap_moving_playlist_item){

                var my = e.clientY;

                my -= dzsap_playlist_con.offset().top;

                // console.log(mx,my);

                dzsap_playlist_item_moving.css('top',my - 20);




                dzsap_playlist_item_target.parent().children(':not(".target-playlist-item"):not(".cloner")').each(function(){
                  var _t = $(this);

                  var tmy = _t.offset().top - dzsap_playlist_con.offset().top;


                  // console.log(my,tmy);
                  if(my>tmy){
                    _t.after(dzsap_playlist_item_target);
                  }
                })

                if(my<50){
                  dzsap_playlist_item_target.parent().prepend(dzsap_playlist_item_target);
                }
              }
            });
            $(document).on('mouseup.dzsap_playlist_item',function(e){

              if(window.dzsap_moving_playlist_item){

                window.dzsap_moving_playlist_item = false;


                dzsap_playlist_item_moving.parent().children('.cloner').remove();
                dzsap_playlist_item_target.removeClass('target-playlist-item');
                dzsap_playlist_item_moving.remove();
                dzsap_playlist_item_moving = null;
                dzsap_playlist_item_target = null;
              }
            })
          }else{
            console.error('no tooltip .. why, should be here?');
          }

        }


        function setup_structure(pargs) {


          var margs = {
            'setup_inner_player':true
            ,'setup_media':true
            ,'setup_otherstructure':true
            ,'call_from':"default"


          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }

          // console.log('%c .setup_structure', 'color: #da23da', margs);


          if(margs.call_from=='reconstruct'){
            if(_metaArtistCon){

              //_metaArtistCon.remove();
            }


            _metaArtistCon = null;
            if(cthis.hasClass('skin-wave')){
              o.design_skin='skin-wave';
            }
            if(cthis.hasClass('skin-silver')){
              o.design_skin='skin-silver';
            }
          }

          // console.log('new design skin - ' ,cthis.hasClass('skin-silver'), o.design_skin, margs, cthis.attr('class'));

          //alert('ceva');

          if(margs.setup_inner_player) {
            cthis.append('<div class="audioplayer-inner"></div>');
            _audioplayerInner = cthis.children('.audioplayer-inner');
          }

          if(margs.setup_media){

            _audioplayerInner.append('<div class="the-media"></div>');
            _theMedia = _audioplayerInner.children('.the-media').eq(0);
          }







          if(margs.setup_otherstructure==false){
            return false;
          }

          if (o.design_skin != 'skin-customcontrols') {

            _audioplayerInner.append('<div class="ap-controls"></div>');
          }
          if (o.design_skin == 'skin-customcontrols') {


            // console.log('cthis.html() - ',cthis.html());

            cthis.html(String(cthis.html()).replace('{{svg_play_icon}}',svg_play_icon));
            cthis.html(String(cthis.html()).replace('{{svg_pause_icon}}',pausebtn_svg));

          }
          _apControls = _audioplayerInner.children('.ap-controls').eq(0);



          if(cthis.attr('data-wrapper-image')){
            var img = new Image();




            if(cthis.hasClass('zoomsounds-no-wrapper')==false){

              img.onload = function(){
                // console.log('image loaded', this, this.src);


                cthis.css('background-image','url('+this.src+')');
                // _audioplayerInner.prepend('<div class="zoomsounds-bg" style="background-image: url('+this.src+'); "></div>');
                setTimeout(function(){

                  cthis.find('.zoomsounds-bg').addClass('loaded');

                  //var tw = cthis.width();

                  if(tw>300){
                    tw = 300;
                  }

                  if(cthis.hasClass('zoomsounds-wrapper-bg-bellow')){

                    //cthis.css('padding-top', tw - _audioplayerInner.outerHeight())
                    cthis.css('padding-top', 200);
                  }
                },100);
              }

              img.src = cthis.attr('data-wrapper-image');
            }

          }




          var aux_str_scrubbar = '<div class="scrubbar">';
          var aux_str_con_controls = '';
          var aux_str_con_controls_part2 = '';


          aux_str_scrubbar += '<div class="scrub-bg"></div><div class="scrub-buffer"></div><div class="scrub-prog"></div><div class="scrubBox"></div><div class="scrubBox-prog"></div><div class="scrubBox-hover"></div>';


          if (o.design_skin == 'skin-wave' && o.disable_timer != 'on') {
            aux_str_scrubbar += '<div class="total-time">00:00</div><div class="curr-time">00:00</div>';

          }

          if (sample_perc_start) {

            aux_str_scrubbar += '<div class="sample-block-start" style="width: ' + (sample_perc_start * 100) + '%"></div>'
          }
          if (sample_perc_end) {

            aux_str_scrubbar += '<div class="sample-block-end" style="left: ' + (sample_perc_end * 100) + '%; width: ' + (100 - (sample_perc_end * 100)) + '%"></div>'
          }

          aux_str_scrubbar += '</div>'; // -- end scrubbar



          if(o.controls_external_scrubbar){
            aux_str_scrubbar = '';
          }


          var struct_con_playpause ='';



          if(o.settings_extrahtml_before_play_pause){
            struct_con_playpause+=o.settings_extrahtml_before_play_pause;


          }
          // console.log(cthis.find('.feed-dzsap-before-playpause'));

          struct_con_playpause+='<div class="con-playpause-con">';

          if(cthis.find('.feed-dzsap-before-playpause').length){
            struct_con_playpause+=cthis.find('.feed-dzsap-before-playpause').eq(0).html();
            cthis.find('.feed-dzsap-before-playpause').remove();

          }

          struct_con_playpause+='<div class="con-playpause';

          if(keyboard_controls.show_tooltips=='on'){
            struct_con_playpause+=' dzstooltip-con';
          }

          struct_con_playpause+='">';
          if(keyboard_controls.show_tooltips=='on'){
            struct_con_playpause+=dzsap_generate_keyboard_tooltip(keyboard_controls,'pause_play');
          }



          struct_con_playpause+='<div class="playbtn"><div class="the-icon-bg"></div><div class="dzsap-play-icon">';







          var has_svg_icons = false;


          if(cthis.hasClass('button-aspect-noir') || cthis.hasClass('skin-pro') || cthis.hasClass('skin-silver') || cthis.hasClass('skin-redlights') || cthis.hasClass('skin-default')){
            has_svg_icons = true;
          }
          // console.log("HMM dada", cthis);

          //console.log('cthis.hasClass(\'skin-pro\') - ',cthis.hasClass('skin-pro'));
          if(has_svg_icons){
            // console.log("HMM dada2", cthis);


            struct_con_playpause+=svg_play_icon;
          }

          struct_con_playpause+='</div>';
          struct_con_playpause+='</div>'; // -- end playbtn


          struct_con_playpause+='<div class="pausebtn"';

          if(o.design_animateplaypause!='on') {
            struct_con_playpause += ' style="display:none"';
          }

          struct_con_playpause+='><div class="the-icon-bg"></div><div class="pause-icon"><div class="pause-part-1"></div><div class="pause-part-2"></div>';


          if(has_svg_icons){
            // console.log("HMM dada2", cthis);

            // struct_con_playpause+='<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.75px" height="15.812px" viewBox="-1.5 -1.844 13.75 15.812" enable-background="new -1.5 -1.844 13.75 15.812" xml:space="preserve"> <g> <path fill="#D2D6DB" d="M11.363,5.662c0.603,0.375,0.592,0.969-0.028,1.317L0.049,13.291c-0.624,0.351-1.131,0.05-1.131-0.664 V-0.782c0-0.711,0.495-0.988,1.1-0.611L11.363,5.662z"/> </g> </svg> ';
            struct_con_playpause+=' <svg class="svg-icon" version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="13px" viewBox="0 0 13.415 16.333" enable-background="new 0 0 13.415 16.333" xml:space="preserve"> <path fill="#D2D6DB" d="M4.868,14.59c0,0.549-0.591,0.997-1.322,0.997H2.2c-0.731,0-1.322-0.448-1.322-0.997V1.618 c0-0.55,0.592-0.997,1.322-0.997h1.346c0.731,0,1.322,0.447,1.322,0.997V14.59z"/> <path fill="#D2D6DB" d="M12.118,14.59c0,0.549-0.593,0.997-1.324,0.997H9.448c-0.729,0-1.322-0.448-1.322-0.997V1.619 c0-0.55,0.593-0.997,1.322-0.997h1.346c0.731,0,1.324,0.447,1.324,0.997V14.59z"/> </svg>  ';
          }


          struct_con_playpause+='</div>';// -- end pause-icon
          struct_con_playpause+='</div>'; // -- end pausebtn




          struct_con_playpause+='';



          if(o.design_skin=='skin-wave'){
            struct_con_playpause+=o.skinwave_preloader_code;
          }




          struct_con_playpause+='</div>';
          if(cthis.find('.feed-dzsap-after-playpause').length){
            struct_con_playpause+=cthis.find('.feed-dzsap-after-playpause').eq(0).html();

            cthis.find('.feed-dzsap-after-playpause').remove();
          }



          struct_con_playpause+='</div>';


          // struct_con_playpause = '';
          // console.log(' - struct_con_playpause - ',struct_con_playpause);




          aux_str_con_controls += '<div class="con-controls"><div class="the-bg"></div>'+struct_con_playpause;


          if (o.settings_extrahtml_in_float_left) {
            aux_str_con_controls += o.settings_extrahtml_in_float_left;
          }


          //console.log(o.disable_timer, aux_str_con_controls);


          if (o.design_skin == 'skin-pro'){
            aux_str_con_controls += '<div class="con-controls--right">';
          }

          if (o.design_skin != 'skin-wave' && o.disable_timer != 'on') {
            aux_str_con_controls += '<div class="curr-time">00:00</div><div class="total-time">00:00</div>';

          }

          if (o.design_skin == 'skin-pro'){

            aux_str_con_controls += '</div>';
          }


          var aux_str_con_volume = '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>';
          if (o.disable_volume == 'on') {
            aux_str_con_volume = '';
          }


          if (o.design_skin == 'skin-default' || o.design_skin == 'skin-wave') {

            aux_str_con_controls += '<div class="ap-controls-right">';
            if (o.disable_volume != 'on') {
              aux_str_con_controls += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>';
            }


            // console.log('aux_str_con_controls -> ',aux_str_con_controls);

            aux_str_con_controls += '</div>';
            aux_str_con_controls += '<div class="clear"></div>';



          }

          aux_str_con_controls += '</div>'; // -- end con-controls




          //console.log(o.disable_timer, aux_str_con_controls);


          if (o.design_skin == 'skin-wave' && skinwave_mode == 'small') {
            aux_str_con_controls = '<div class="the-bg"></div><div class="ap-controls-left">'+struct_con_playpause+'</div>'+aux_str_scrubbar+'<div class="ap-controls-right">'+aux_str_con_volume+'<div class="extrahtml-in-float-right for-skin-wave-small">'+settings_extrahtml_in_float_right+'</div></div>';





            _apControls.append(aux_str_con_controls);



          } else {


            // -- other skins

            if (o.design_skin == 'skin-aria' || o.design_skin == 'skin-silver' || o.design_skin == 'skin-redlights' || o.design_skin == 'skin-steel') {



              if (o.design_skin == 'skin-silver') {
                ;
                pausebtn_svg = '<svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M9.812,29.7c0,0.166-0.178,0.3-0.398,0.3H2.461c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> <path d="M23.188,29.7c0,0.166-0.178,0.3-0.398,0.3h-6.953c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> </svg>';
              }


              //o.design_skin == 'skin-redlights' ||
              if (o.design_skin == 'skin-steel') {
                playbtn_svg = '';
                pausebtn_svg = '';
              }

              aux_str_con_controls = '<div class="the-bg"></div><div class="ap-controls-left">';


              if(o.design_skin == 'skin-silver'){

                aux_str_con_controls+=struct_con_playpause;
              }else{

                // -- TODO: maybe convert all to struct_con_playpause


                aux_str_con_controls+='<div class="con-playpause';

                if(keyboard_controls.show_tooltips=='on'){
                  aux_str_con_controls+=' dzstooltip-con';
                }

                aux_str_con_controls+='">';


                if(keyboard_controls.show_tooltips=='on'){
                  aux_str_con_controls+=dzsap_generate_keyboard_tooltip(keyboard_controls,'pause_play');
                }


                aux_str_con_controls+='<div class="playbtn"><div class="dzsap-play-icon">' + playbtn_svg + '</div><div class="play-icon-hover"></div></div><div class="pausebtn" ';


                // console.log('o.design_animateplaypause - ',o.design_animateplaypause);
                if(o.design_animateplaypause!='on'){
                  aux_str_con_controls+=' style="display:none"';
                }else{
                  cthis.addClass('playing-animation');
                }

                aux_str_con_controls+='><div class="pause-icon">' + pausebtn_svg + '</div><div class="pause-icon-hover"></div></div></div>'; // -- enc con-playpause

              }




              // console.log('cthis.find(\'.feed-dzsap-after-playpause\') - ',cthis.find('.feed-dzsap-after-playpause'));
              if(cthis.find('.feed-dzsap-after-playpause').length){
                aux_str_con_controls+=cthis.find('.feed-dzsap-after-playpause').eq(0).html();


                cthis.find('.feed-dzsap-after-playpause').remove();
              }



              if (o.design_skin == 'skin-silver') {

                aux_str_con_controls += '<div class="curr-time">00:00</div>';
              }


              aux_str_con_controls += '</div>';

              //console.log(settings_extrahtml_in_float_right);


              if (settings_extrahtml_in_float_right) {
                aux_str_con_controls += '<div class="controls-right">' + settings_extrahtml_in_float_right + '</div>';

                //console.log(o._gall)
                //console.log('dada');

                if (o.design_skin == 'skin-redlights') {

                  //console.log(o.parentgallery, o.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all);
                  if (o.parentgallery && o.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all) {
                    o.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all();
                  }
                }
              }

              //console.log('ceva');


              aux_str_con_controls += '<div class="ap-controls-right">';

              if (o.design_skin == 'skin-silver') {

                aux_str_con_controls += '<div class="controls-volume controls-volume-vertical"><div class="volumeicon"></div><div class="volume-holder"><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div></div>';

                if (o.disable_timer != 'on') {
                  aux_str_con_controls += '<div class="total-time">00:00</div>';
                }

                aux_str_con_controls += '</div>' + aux_str_scrubbar;
              } else {



                if (o.design_skin == 'skin-redlights') {

                  if (o.disable_volume != 'on') {
                    aux_str_con_controls += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static">'+svg_volume_static+'</div><div class="volume_active"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg></div><div class="volume_cut"></div></div>';
                  }
                }

                aux_str_con_controls += aux_str_scrubbar;


                if (o.disable_timer != 'on') {
                  aux_str_con_controls += '<div class="total-time">00:00</div>';
                }
              }







              if (o.design_skin == 'skin-silver') {

              } else {
                aux_str_con_controls += '</div>';
              }


              _apControls.append(aux_str_con_controls);



            } else {





              if (cthis.hasClass('skin-wave-mode-alternate')) {

                _apControls.append(aux_str_con_controls + aux_str_scrubbar);

              } else {
                _apControls.append(aux_str_scrubbar + aux_str_con_controls);
              }
            }


          }


          _apControlsRight = null;

          if (_apControls.find('.ap-controls-right').length > 0) {

            _apControlsRight = cthis.find('.ap-controls-right');
          }
          if (_apControls.find('.ap-controls-left').length > 0) {
            _apControlsLeft = _apControls.find('.ap-controls-left').eq(0);
          }




          if(o.design_skin=='skin-pro'){
            _apControlsRight = cthis.find('.con-controls--right').eq(0)
          }


          // console.log('settings_extrahtml_in_float_right - ',settings_extrahtml_in_float_right);
          if (settings_extrahtml_in_float_right) {
            // aux_str_con_controls += ;

            if(String(settings_extrahtml_in_float_right).indexOf('dzsap-multisharer-but')>-1){
              sw_enable_multisharer = true;
            }

            var finstring = '';



            // console.log('%c settings_extrahtml_in_float_right -3 [', 'color:#da21dd', settings_extrahtml_in_float_right);
            if (o.design_skin == 'skin-wave' && skinwave_mode == 'small') {

            }else{

              finstring += '<div class="extrahtml-in-float-right from-setup_structure from-js-setup_structure">'+settings_extrahtml_in_float_right+'</div>';
            }


            if(o.design_skin=='skin-wave' || o.design_skin=='skin-default'){

              cthis.find('.ap-controls-right').eq(0).append(finstring);
              // console.log('cthis.find(\'.ap-controls-right\') - ', cthis.find('.ap-controls-right'));
            }
            if(o.design_skin=='skin-pro'){

              cthis.find('.con-controls--right').eq(0).append(finstring);
              // console.log('cthis.find(\'.ap-controls-right\') - ', cthis.find('.ap-controls-right'));
            }
          }


          // -- Todo: if we have footer, playlist btn we can place it in ap-controls-right


          if(o.footer_btn_playlist=='on'){

            if(_apControlsRight.find('.btn-footer-playlist').length==0){

              _apControlsRight.append('<div class="btn-footer-playlist for-hover dzstooltip-con player-but"> <div class="tooltip-indicator tooltip-indicator--btn-footer-playlist"><div class="the-icon-bg"></div> <svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div><div class="dzstooltip playlist-tooltip style-default color-light-dark arrow-bottom talign-end transition-scaleup active2"><div class="dzstooltip--inner"> </div></div></div>');


              _playlistTooltip = cthis.find('.playlist-tooltip');



              setTimeout(function(){
                setup_playlist_inner();
              },100);

              setTimeout(function(){
                // setup_playlist_inner();
              },1000)
            }

          }



          if(cthis.find('.feed-dzsap-after-con-controls').length){
            _apControls.append(cthis.find('.feed-dzsap-after-con-controls').eq(0).html());


            cthis.find('.feed-dzsap-after-con-controls').remove();
          }


          // console.log("_apControls - ",_apControls.find('.ap-controls'));
          // console.log("_apControls.find('.ap-controls-right') -> ",_apControls.find('.ap-controls-right'));





          if (o.disable_timer != 'on') {
            _currTime = cthis.find('.curr-time').eq(0);
            _totalTime = cthis.find('.total-time').eq(0);

            if (o.design_skin == 'skin-steel') {
              if (_currTime.length == 0) {
                _totalTime.before('<div class="curr-time">00:00</div> <span class="separator-slash">/</span> ');
                //console.log('WHAT WHAT IN THE BUTT', _totalTime, _totalTime.prev(),  cthis.find('.curr-time'));

                _currTime = _totalTime.prev().prev();

              }
            }

            //console.log(_currTime, _totalTime);
          }



          if (Number(o.sample_time_total) > 0) {

            time_total = Number(o.sample_time_total);

            //console.log(_currTime,time_total);
            if (_totalTime) {

              // console.error("ENTER HERE");
              _totalTime.html(formatTime(time_total_for_visual));
            }

            //console.log(_totalTime.html());

            //return false;
          }



          // console.log('o.controls_external_scrubbar - ',o.controls_external_scrubbar);
          if(o.controls_external_scrubbar){

            _scrubbar = $(o.controls_external_scrubbar).children('.scrubbar').eq(0);
          }else{

            _scrubbar = _apControls.find('.scrubbar').eq(0);
          }


          __scrubbProg = _scrubbar.find('.scrub-prog').get(0);


          // console.log('_scrubbar -> ',_scrubbar);
          // console.log('__scrubbProg -> ',__scrubbProg);


          _conControls = _apControls.children('.con-controls');
          _conPlayPause = cthis.find('.con-playpause').eq(0);
          _conPlayPauseCon = cthis.find('.con-playpause-con').eq(0);


          _controlsVolume = cthis.find('.controls-volume').eq(0);



          if(cthis.attr("data-type")=='fake'){
            if(cthis.find('.meta-artist').length==0){
              cthis.append('<span class="meta-artist"><span class="the-artist"></span><span class="the-name"></span></span>')
            }
          }



          if (!_metaArtistCon || margs.call_from=='reconstruct') {
            if (cthis.children('.meta-artist').length > 0) {
              //console.log(cthis.hasClass('alternate-layout'));
              if (cthis.hasClass('skin-wave-mode-alternate')) {
                //console.log(_conControls.children().last());

                if (_conControls.children().last().hasClass('clear')) {
                  _conControls.children().last().remove();
                }
                _conControls.append(cthis.children('.meta-artist'));
              } else {
                _audioplayerInner.append(cthis.children('.meta-artist'));
              }

            }
            _audioplayerInner.find('.meta-artist').eq(0).wrap('<div class="meta-artist-con"></div>');

            //console.log('ceva');

            _metaArtistCon = _audioplayerInner.find('.meta-artist-con').eq(0);


            if (o.design_skin == 'skin-wave') {


              if(cthis.find('.dzsap-repeat-button').length){
                cthis.find('.dzsap-repeat-button').after(_metaArtistCon);
              }else{


                if(cthis.find('.dzsap-loop-button').length && cthis.find('.dzsap-loop-button').eq(0).parent().hasClass('feed-dzsap-for-extra-html-right')==false){
                  cthis.find('.dzsap-loop-button').after(_metaArtistCon);
                }else {

                  _conPlayPauseCon.after(_metaArtistCon);
                }
              }




              //console.log('o.skinwave_mode - ',o.skinwave_mode,_apControlsRight,_metaArtistCon);
              if(skinwave_mode=='alternate'){
                _apControlsRight.before(_metaArtistCon);
              }


            }
            if (o.design_skin == 'skin-aria') {
              _apControlsRight.prepend(_metaArtistCon);

            }
            if (o.design_skin == 'skin-redlights' || o.design_skin == 'skin-steel') {

              _apControlsRight.prepend(_metaArtistCon);


            }
            if (o.design_skin == 'skin-silver') {

              _apControlsRight.append(_metaArtistCon);
            }
            if (o.design_skin == 'skin-default') {


              _apControlsRight.before(_metaArtistCon);
            }



          }


          if(radio_update_song_name == false && _metaArtistCon.find('.the-name').length && _metaArtistCon.find('.the-name').eq(0).text().length > 0){
            // -- we already have artist name..
            radio_update_song_name = false;
            if(_metaArtistCon.find('.the-name').eq(0).html().indexOf('&nbsp;&nbsp;')>-1){
              radio_update_song_name = true;
            }
          }else{
            radio_update_song_name = true;
          }

          if(radio_update_artist_name == false && _metaArtistCon.find('.the-name').length && _metaArtistCon.find('.the-artist').eq(0).text().length > 0){
            // -- we already have artist name..
            radio_update_artist_name = false;
            if(_metaArtistCon.find('.the-name').eq(0).html().indexOf('&nbsp;&nbsp;')>-1){
              radio_update_artist_name = true;
            }
          }else{
            radio_update_artist_name = true;
          }

          if (o.design_skin == 'skin-silver') {
            _scrubbar.after(_apControlsRight);
          }



          var str_thumbh = "";
          if (design_thumbh != '') {
            str_thumbh = ' height:' + o.design_thumbh + 'px;';
          }



          struct_generate_thumb();

          //console.log(cthis, o.disable_volume,_controlsVolume);
          if (o.disable_scrub == 'on') {
            cthis.addClass('disable-scrubbar');
          }



          if (o.design_skin == 'skin-wave' && o.parentgallery && typeof(o.parentgallery) != 'undefined' && o.design_menu_show_player_state_button == 'on') {



            if (o.design_skin == 'skin-wave') {


              if(_apControlsRight){

                _apControlsRight.appendOnce('<div class="btn-menu-state player-but"> <div class="the-icon-bg"></div> <svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div></div>');
              }else{
                console.log('_apControlsRight not found ? ');
              }
            } else {
              _audioplayerInner.appendOnce('<div class="btn-menu-state"></div>');
            }
          }
          // console.log(_controlsVolume,_theThumbCon , o.skinwave_place_thumb_after_volume);
          if(o.skinwave_place_metaartist_after_volume=='on'){

            _controlsVolume.before(_metaArtistCon);
          }


          if(o.settings_extrahtml_after_artist){
            _metaArtistCon.find('.the-artist').append(o.settings_extrahtml_after_artist);
          }

          if(o.skinwave_place_thumb_after_volume=='on'){

            _controlsVolume.before(cthis.find('.the-thumb-con'));
          }
          //                console.log(o.embed_code);


          if (o.design_skin == 'skin-wave' && o.embed_code != '') {
            if (o.design_skin == 'skin-wave') {

              if(o.enable_embed_button=='on'){
                if(_apControlsRight) {
                  _apControlsRight.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code player-but"> <div class="the-icon-bg"></div> '+svg_embed_button+'</div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' + o.embed_code + '</span></span></div>');
                }
              }

            } else {
              if(o.enable_embed_button=='on') {
                _audioplayerInner.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code player-but "> <div class="the-icon-bg"></div> <svg class="svg-icon" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" xml:space="preserve"> <g id="Layer_1"> <polygon fill="#E6E7E8" points="1.221,7.067 0.494,5.422 4.963,1.12 5.69,2.767 "/> <polygon fill="#E6E7E8" points="0.5,5.358 1.657,4.263 3.944,10.578 2.787,11.676 "/> <polygon fill="#E6E7E8" points="13.588,9.597 14.887,8.34 12.268,2.672 10.969,3.93 "/> <polygon fill="#E6E7E8" points="14.903,8.278 14.22,6.829 9.714,11.837 10.397,13.287 "/> </g> <g id="Layer_2"> <rect x="6.416" y="1.713" transform="matrix(0.9663 0.2575 -0.2575 0.9663 2.1699 -1.6329)" fill="#E6E7E8" width="1.805" height="11.509"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' + o.embed_code + '</span></span></div>');
              }
            }

            cthis.on('click', '.btn-embed-code-con, .btn-embed', function() {
              var _t = $(this);

              // console.log(_t);
              select_all(_t.find('.dzstooltip').get(0));
            })
            cthis.on('click', '.copy-embed-code-btn', function() {
              var _t = $(this);

              // console.log(_t);
              select_all(_t.parent().parent().find('.dzstooltip--inner > span').get(0));

              document.execCommand('copy');
              setTimeout(function(){

                select_all(_t.get(0));
              },100)
            })

            // cthis.on(' .btn-embed .dzstooltip').bind('click', function() {
            //     var _t = $(this);
            //
            //     console.log(_t);
            //     select_all(_t.get(0));
            // })
          }

          if (o.design_skin == 'skin-wave') {
            //console.log((o.design_thumbw + 20));


            // -- structure setup

            setup_structure_scrub();


            if (o.skinwave_timer_static == 'on') {
              if (_currTime) {
                _currTime.addClass('static');
              }
              if (_totalTime) {
                _totalTime.addClass('static');
              }
            }


            _apControls.css({
              //'height': design_thumbh
            })



            //console.log('setup_lsiteners()');

            // console.log("PREPARE SCRUBBAR LOADED");
            if (o.skinwave_wave_mode == 'canvas') {

              setTimeout(function() {
                cthis.addClass('scrubbar-loaded');
                _scrubbar.parent().addClass('scrubbar-loaded');


                // console.log(" SCRUBBAR  is LOADED",_scrubbar);
              }, 700); // -- tbc

            }

          }
          // --- END skin-wave


          check_multisharer();

          if (cthis.hasClass('skin-minimal')) {
            // -- here is skin-minimal


            // -- HERE WE SETUP SKIN MINIMAL CANVAS
            // console.log("HERE WE SETUP SKIN MINIMAL CANVAS");

            cthis.find('.the-bg').before('<div class="skin-minimal-bg skin-minimal--outer-bg"></div><div class="skin-minimal-bg skin-minimal--inner-bg-under"></div><div class="skin-minimal-bg skin-minimal--inner-bg"></div><div class="skin-minimal-bg skin-minimal--inner-inner-bg"></div>')
            cthis.find('.the-bg').append('<canvas width="100" height="100" class="playbtn-canvas"/>')
            skin_minimal_canvasplay = cthis.find('.playbtn-canvas').eq(0).get(0);





            _conPlayPause.children('.playbtn').append(playbtn_svg);
            _conPlayPause.children('.pausebtn').append(pausebtn_svg);

            setTimeout(function(){
              first_drawn_canvas = false;

            },200);


          }


          if(o.design_animateplaypause!='on'){
            // aux_str_con_controls+=' style="display:none"';
          }else{
            cthis.addClass('playing-animation');
          }
          //console.log(o.parentgallery, o.disable_player_navigation);
          if (typeof(o.parentgallery) != 'undefined' && o.disable_player_navigation != 'on') {
            //                    _conControls.appendOnce('<div class="prev-btn"></div><div class="next-btn"></div>','.prev-btn');

          }

          if (cthis.hasClass('skin-minion')) {
            if (cthis.find('.menu-description').length > 0) {
              //console.log('ceva');
              _conPlayPause.addClass('with-tooltip');
              _conPlayPause.prepend('<span class="dzstooltip" style="left:-7px;">' + cthis.find('.menu-description').html() + '</span>');
              //console.log(_conPlayPause.children('span').eq(0), _conPlayPause.children('span').eq(0).textWidth());
              _conPlayPause.children('span').eq(0).css('width', _conPlayPause.children('span').eq(0).textWidth() + 10);
            }
          }



          // === setup_structore for both flash and html5


          //console.error('o.disable_player_navigation - ',o.disable_player_navigation);
          //console.warn('o.player_navigation - ',o.player_navigation,o.parentgallery);



          if(o.player_navigation == 'default') {

            if (o.parentgallery && o.disable_player_navigation != 'on') {

              o.player_navigation = 'on';
            }



            if (o.parentgallery && o.parentgallery.hasClass('mode-showall')) {
              o.player_navigation = 'off';
            }
          }

          if(o.disable_player_navigation == 'on') {

            o.player_navigation = 'off';
          }

          if(o.player_navigation == 'default') {

            o.player_navigation = 'off';
          }


          // console.warn('o.player_navigation - ',o.player_navigation);


          // console.log('o.disable_player_navigation - ',o.disable_player_navigation);
          if (o.player_navigation=='on') {

            var prev_btn_str = '<div class="prev-btn player-but"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M2.581,7.375c-0.744-0.462-1.413-0.94-1.486-1.061C1.021,6.194,1.867,5.586,2.632,5.158l2.35-1.313 c0.765-0.427,1.505-0.782,1.646-0.789s0.257,1.03,0.257,1.905V7.87c0,0.876-0.051,1.692-0.112,1.817 C6.711,9.81,5.776,9.361,5.032,8.898L2.581,7.375z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.307,7.57C5.413,7.014,4.61,6.441,4.521,6.295C4.432,6.15,5.447,5.42,6.366,4.906l2.82-1.577 c0.919-0.513,1.809-0.939,1.979-0.947s0.309,1.236,0.309,2.288v3.493c0,1.053-0.061,2.033-0.135,2.182S10.144,9.955,9.25,9.4 L6.307,7.57z"/> </g> </g> </g> </svg> </div>';

            var next_btn_str = '<div class="next-btn player-but"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M9.874,5.443c0.744,0.462,1.414,0.939,1.486,1.06c0.074,0.121-0.771,0.729-1.535,1.156L7.482,8.967 C6.719,9.394,5.978,9.75,5.837,9.756C5.696,9.761,5.581,8.726,5.581,7.851V4.952c0-0.875,0.05-1.693,0.112-1.816 c0.062-0.124,0.995,0.326,1.739,0.788L9.874,5.443z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.155,5.248c0.893,0.556,1.696,1.129,1.786,1.274c0.088,0.145-0.928,0.875-1.847,1.389l-2.811,1.57 c-0.918,0.514-1.808,0.939-1.978,0.947c-0.169,0.008-0.308-1.234-0.308-2.287V4.66c0-1.052,0.061-2.034,0.135-2.182 s1.195,0.391,2.089,0.947L6.155,5.248z"/> </g> </g> </g> </svg>  </div>';

            if (o.design_skin == 'skin-steel') {

              prev_btn_str = '<div class="prev-btn player-but"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg> <svg class="svg2"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg></div>';


              next_btn_str = '<div class="next-btn player-but"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg><svg class="svg2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg></div>';

            }




            var auxs = prev_btn_str + next_btn_str;


            //console.log(o.parentgallery);


            // console.log(o.design_skin, skinwave_mode);
            if (o.design_skin == 'skin-wave' && skinwave_mode == 'small') {


              _conPlayPause.before(prev_btn_str)
              _conPlayPause.after(next_btn_str)


            } else {
              if (o.design_skin == 'skin-wave') {

                // _conPlayPause.after(auxs);

                // console.warn('o.player_navigation - ',o.player_navigation);


                if(o.player_navigation=='on'){

                  _conPlayPauseCon.prependOnce(prev_btn_str, '.prev-btn');
                  _conPlayPauseCon.appendOnce(next_btn_str, '.next-btn');
                }

              } else if (o.design_skin == 'skin-steel') {

                _apControlsLeft.prependOnce(prev_btn_str, '.prev-btn');

                if (_apControlsLeft.children('.the-thumb-con').length > 0) {
                  //console.log(_theThumbCon.prev());

                  if (_apControlsLeft.children('.the-thumb-con').eq(0).length > 0) {
                    if (_apControlsLeft.children('.the-thumb-con').eq(0).prev().hasClass('next-btn') == false) {
                      _apControlsLeft.children('.the-thumb-con').eq(0).before(next_btn_str);
                    }
                  }

                } else {

                  _apControlsLeft.appendOnce(next_btn_str, '.next-btn');
                }
              } else {

                _audioplayerInner.appendOnce(auxs, '.prev-btn');
              }
            }


            // console.warn("SETUPED PLAYER NAVIGATION yes ;) ");

          }





          if (cthis.find('.afterplayer').length > 0) {
            //console.log(cthis.children('.afterplayer'));
            cthis.append(cthis.find('.afterplayer'));
          }

          //console.log(o.settings_extrahtml);


          if(cthis.find('.extra-html-extra').length){
            if (o.settings_extrahtml == '') {

              o.settings_extrahtml = ' ';
            }
            var _c_html = cthis.find('.extra-html-extra').eq(0).html();

            if(_c_html.length){
              o.settings_extrahtml = _c_html;
              cthis.find('.extra-html-extra').eq(0).html('');
            }
          }

          if (o.settings_extrahtml != '') {

            // console.log('o.settings_extrahtml -> ', o.settings_extrahtml, index_extrahtml_toloads);

            if (String(o.settings_extrahtml).indexOf('{{get_likes}}') > -1) {
              index_extrahtml_toloads++;
              ajax_get_likes();
            }
            if (String(o.settings_extrahtml).indexOf('{{get_plays}}') > -1 ) {
              index_extrahtml_toloads++;
              ajax_get_views();
            } else {
              // console.log('increment_views', increment_views);
              if (increment_views === 1) {
                ajax_submit_views();
                increment_views = 2;
              }
            }

            if (String(o.settings_extrahtml).indexOf('{{get_rates}}') > -1) {
              index_extrahtml_toloads++;
              ajax_get_rates();
            }
            o.settings_extrahtml = String(o.settings_extrahtml).replace('{{heart_svg}}',svg_heart_icon);
            o.settings_extrahtml = String(o.settings_extrahtml).replace('{{embed_code}}',o.embed_code);


            if (index_extrahtml_toloads == 0) {
              //console.log('lel',cthis.find('.extra-html'))

              cthis.find('.extra-html').addClass('active');
            }
            setTimeout(function() {

              //console.log('lel',cthis.find('.extra-html'))
              cthis.find('.extra-html').addClass('active');



              // console.warn("cthis.find('.extra-html') -> ",cthis.find('.extra-html'))
              // console.warn("cthis.find('.extra-html-extra') -> ",cthis.find('.extra-html-extra'))
              // cthis.find('.extra-html-extra').removeClass('dzsap-feed');

              if(cthis.find('.float-left').length==0){
                cthis.find('.extra-html').append(cthis.find('.extra-html-extra'));
              }else{
                cthis.find('.extra-html .float-left').append(cthis.find('.extra-html-extra'));
              }


              var _c = cthis.find('.extra-html-extra').children().eq(0);

              cthis.find('.extra-html-extra').children().unwrap();
              // if(_c.parent().hasClass('float-left')){                         }


              // console.log('o.settings_extrahtml->',o.settings_extrahtml);
              // console.log('cthis.find(\'.extra-html\').html()->',cthis.find('.extra-html').html());


              if(cthis.find('.extra-html').html().indexOf('dzsap-multisharer-but')>-1){
                sw_enable_multisharer=true;


              }

            }, 2000);

          }

          if(cthis.find('.con-after-playpause').length){
            _conPlayPause.after(cthis.find('.con-after-playpause').eq(0));
          }


          if(cthis.hasClass('zoomsounds-wrapper-bg-bellow') && cthis.find('.dzsap-wrapper-buts').length==0){

            // console.log('NO WRAPPER BUTS - ',cthis.find('.ap-controls-right'));

            cthis.append('<div class="temp-wrapper"></div>');
            cthis.find('.temp-wrapper').append(settings_extrahtml_in_float_right);
            cthis.find('.temp-wrapper').children('*:not(.dzsap-wrapper-but)').remove();
            cthis.find('.temp-wrapper > .dzsap-wrapper-but').unwrap();
            cthis.children('.dzsap-wrapper-but').each(function(){
              var aux = $(this).html();
              // console.log('aux - ',aux);

              aux = aux.replace('{{heart_svg}}',svg_heart_icon);
              aux = aux.replace('{{svg_share_icon}}',svg_share_icon);




              if($(this).get(0) && $(this).get(0).outerHTML.indexOf('dzsap-multisharer-but')>-1){
                sw_enable_multisharer=true;

                console.log("sw_enable_multisharer",sw_enable_multisharer);

              }

              $(this).html(aux);
            }).wrapAll('<div class="dzsap-wrapper-buts"></div>');
          }

          if(cthis.hasClass('skinvariation-wave-bigtitles')){

            if(cthis.find('.controls-volume').length && _metaArtistCon.find('.controls-volume').length==0){
              _metaArtistCon.append('<br>');
              _metaArtistCon.append(cthis.find('.controls-volume'));
            }

            // cthis.find('.scrubbar').after('<img class="skip-15-sec" width="50" src="http://i.imgur.com/oObhtLE.jpg"/>');
          }

          if(cthis.hasClass('skinvariation-wave-righter')){

            _apControls.appendOnce('<div class="playbuttons-con"></div>');

            var _c = cthis.find('.playbuttons-con').eq(0);

            _c.append(cthis.find('.con-playpause-con'));

            // cthis.find('.scrubbar').after('<img class="skip-15-sec" width="50" src="http://i.imgur.com/oObhtLE.jpg"/>');
          }


          if(o.design_skin=='skin-redlights'){
            _apControlsRight.append('<div class="ap-controls-right--top"></div>');
            _apControlsRight.append('<div class="ap-controls-right--bottom"></div>');
            _apControlsRight.find('.ap-controls-right--top').append(_apControlsRight.find('.meta-artist-con'));
            _apControlsRight.find('.ap-controls-right--top').append(_apControlsRight.find('.controls-volume'));
            _apControlsRight.find('.ap-controls-right--bottom').append(_apControlsRight.find('.scrubbar'));
          }



          if(margs.call_from=='reconstruct'){
            if(cthis.hasClass('skin-silver')){
              _apControlsLeft.append(cthis.find('.con-playpause'));
            }
          }


          // console.log('sw_enable_multisharer - ',sw_enable_multisharer);

          if(sw_enable_multisharer){

            check_multisharer();
          }

          // console.log('type - ',type);
          // console.log('o.type - ',o.type);
          // console.log('cthis.attr("data-type") - ',cthis.attr("data-type"));

          // console.error("META LODED");
          cthis.addClass('structure-setuped');

        }

        function check_multisharer(){


          cthis.find('.dzsap-multisharer-but').data('cthis',cthis);
          // console.warn("WE SETUP HERE", cthis.find('.dzsap-multisharer-but').data('cthis'));
          if(sw_enable_multisharer){
            setTimeout(function(){
              // console.log("LOAD MULTISHARER");


              if(o.embed_code){
                cthis.data('embed_code',o.embed_code);
              }


              // console.log('window.dzsap_multisharer_assets_loaded - ',window.dzsap_multisharer_assets_loaded);
              if(window.dzsap_multisharer_assets_loaded){

              }else{
                if (window.dzsap_multisharer_assets_loaded != true && o.settings_php_handler && window.loading_multi_sharer!=true) {

                  // -- only if settings_php_handler is set


                  window.loading_multi_sharer = true;
                  var head  = document.getElementsByTagName('head')[0];
                  var link  = document.createElement('link');
                  link.id   = 'dzsap-load-multi-sharer';
                  link.rel  = 'stylesheet';
                  link.type = 'text/css';
                  link.href = add_query_arg(o.settings_php_handler,'load-lightbox-css','on');
                  link.media = 'all';
                  head.appendChild(link);


                  // console.warn("APPEND MULTISHARER STYLE");

                  setTimeout(function(){

                    if(dzsap_box_main_con==null){

                      $('body').append('<div class="dzsap-main-con skin-default gallery-skin-default transition-slideup "> <div class="overlay-background"></div> <div class="box-mains-con"> <div class="box-main box-main-for-share" style=""> <div class="box-main-media-con transition-target"> <div class="close-btn-con"> <svg enable-background="new 0 0 40 40" id="" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28.1,26.8c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3l-6.8-6.8l-6.8,6.8c-0.2,0.2-0.5,0.3-0.7,0.3 s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6.8-6.8l-6.8-6.8c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l6.8,6.8l6.8-6.8 c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L21.3,20L28.1,26.8z"></path></g><g><path d="M19.9,40c-11,0-20-9-20-20s9-20,20-20c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2 c-3.2-2.5-7-3.8-11-3.8c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4 c0.5-0.3,1.1-0.1,1.4,0.3c1.8,3.1,2.8,6.6,2.8,10.2C39.9,31,30.9,40,19.9,40z"></path></g></svg></div> <div class="box-main-media type-inlinecontent" style="width: 530px; height: 280px;"><div class=" real-media" style=""><div class="hidden-content share-content" > <div class="social-networks-con"></div> <div class="share-link-con"></div> <div class="embed-link-con"></div> </div> </div> </div> <div class="box-main-under"></div> </div> </div> </div><!-- end .box-mains-con--> </div>');


                      dzsap_box_main_con = $('.dzsap-main-con').eq(0);

                      // console.log('dzsap_box_main_con - ',dzsap_box_main_con);
                    }

                  },1000);




                }
              }
              $(document).on('click.dzsap','.dzsap-main-con .close-btn-con,.dzsap-main-con .overlay-background', function(){

                var _c = $('.dzsap-main-con').eq(0);

                _c.removeClass('loading-item loaded-item');
              })

            },2000)
          }

        }

        function setup_pcm_random_for_now(pargs) {


          var margs = {
            call_from: 'default'
          }



          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          var default_pcm = [];

          if( ( o.pcm_data_try_to_generate=='on' && o.pcm_data_try_to_generate_wait_for_real_pcm=='on')==false) {
            for (var i3 = 0; i3 < 200; i3++) {
              default_pcm[i3] = Number(Math.random()).toFixed(2);
            }
            default_pcm = JSON.stringify(default_pcm);


            cthis.addClass('rnd-pcm-for-now')

            cthis.attr('data-pcm', default_pcm);

            // console.groupCollapsed("SETUPED PCM")
            // console.log(cthis, cthis.attr('data-pcm'));
            // console.groupEnd();
          }







          setup_structure_scrub_canvas();



          if (o.pcm_data_try_to_generate == 'on') {


            if(o.pcm_data_try_to_generate_wait_for_real_pcm!='on'){

              // console.error("TRYING TO GENERATE WITHOUT REAL PCM -4")
            }



          }

        }
        function setup_structure_scrub_canvas(pargs) {


          var margs = {
            prepare_for_transition_in: false
          }

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          var aux = '';
          var aux_selector = '';



          aux = '<canvas class="scrub-bg-img';



          if (margs.prepare_for_transition_in) {
            aux += ' transitioning-in';
          }


          aux += '" ></canvas>';






          _scrubbar.children('.scrub-bg').eq(0).append(aux);


          aux_selector = '.scrub-bg-img';

          if (margs.prepare_for_transition_in) {
            aux_selector += '.transitioning-in';
          }


          _scrubbarbg_canvas = _scrubbar.find(aux_selector).eq(0);

          // console.log("_scrubbarbg_canvas -> -> ",_scrubbarbg_canvas);






          aux = '<canvas class="scrub-prog-img';



          if (margs.prepare_for_transition_in) {
            aux += ' transitioning-in';
          }


          aux += '" ></canvas>';


          if(_scrubbar.children('.scrub-prog').eq(0).find('.scrub-prog-img').length==0) {

          }




          _scrubbar.children('.scrub-prog').eq(0).append(aux);



          aux_selector = '.scrub-prog-img';

          if (margs.prepare_for_transition_in) {
            aux_selector += '.transitioning-in';
          }

          _scrubbarprog_canvas = _scrubbar.find(aux_selector).eq(0);

          if(o.skinwave_enableSpectrum=='on'){
            _scrubbarprog_canvas.hide();
          }
        }



        function setup_structure_scrub(){
          if (o.skinwave_enableSpectrum != 'on') {

            if (o.skinwave_wave_mode == 'canvas') {
              // console.log('verify pcm - ',cthis, cthis.attr('data-pcm'));

              if (cthis.attr('data-pcm')) {



                // console.log('has pcm - ', cthis);



                pcm_is_real = true;
                setup_structure_scrub_canvas();

              } else {

                setup_pcm_random_for_now();

              }


            } else {
              if (o.skinwave_wave_mode == 'line') {


              }
              if (o.skinwave_wave_mode == 'image') {

                var aux = '<img class="scrub-bg--img" src="'+cthis.attr('data-scrubbg')+'"/>'
                _scrubbar.children('.scrub-bg').eq(0).append(aux);

                setTimeout(function(){

                  show_scrubbar();
                },300);
                aux = '<img class="scrub-prog--img" src="'+cthis.attr('data-scrubprog')+'"/>'
                _scrubbar.children('.scrub-prog').eq(0).append(aux);

                setTimeout(function(){

                  show_scrubbar();
                },300);

              }





            }



          } else {

            // -- spectrum ON

            setup_structure_scrub_canvas(); // -- hmm
            // -- old spectrum code
            // _scrubbar.children('.scrub-bg').eq(0).append('<canvas class="scrub-bg-canvas" style="width: 100%; height: 100%;"></canvas><div class="wave-separator"></div>');
            _scrubBgCanvas = cthis.find('.scrub-bg-img').eq(0);
            //console.log('_scrubBgCanvas - ',_scrubBgCanvas)
            _scrubBgCanvasCtx = _scrubBgCanvas.get(0).getContext("2d");


          }

        }

        function htmlEntities(str) {
          return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function draw_canvas(_arg, pcm_arr, hexcolor, pargs) {

          // -- draw canvas here

          var margs = {
            'call_from':'default'

          };

          if(pargs){
            margs = $.extend(margs,pargs);
          }


          // - _arg -> the canvas
          // console.groupCollapsed('draw_canvas');
          // console.log(_arg, pcm_arr, hexcolor, pargs);
          // console.groupEnd();

          // console.log('%c draw_canvas() - ', 'color: #dd0022;', margs, hexcolor);

          if(margs.call_from=='canvas_normal_pcm_bg'){
            static_hexcolor = hexcolor;

            if(hexcolor.indexOf(',')>-1){
              static_hexcolor = hexcolor.split(',')[0];

            }
          }

          var _canvas = $(_arg);
          var __canvas = _arg;


          // console.warn('draw_canvas() - ', margs, hexcolor, _canvas);
          if(_canvas && _canvas.get(0)){

          }else{
            return false;
          }

          var ctx = _canvas.get(0).getContext("2d");

          var ar_str = pcm_arr;


          // console.groupCollapsed('ar_str');
          // console.log('ar_str - ',cthis,ar_str, cthis.attr('data-pcm'));
          // console.groupEnd();


          var ar = [];


          // console.log(_scrubbarprog_canvas, _scrubbar.width());
          if(_scrubbar){

            if(_scrubbarprog_canvas){

              _scrubbarprog_canvas.width(_scrubbar.width());
              _arg.width = _scrubbar.width();
              _arg.height = _scrubbar.height();
              // _scrubbarprog_canvas.attr('width', _scrubbar.width());
            }
          }else{

          }
          // ctx.translate(0.5, 0.5);
          // ctx.lineWidth = .5;

          ctx.imageSmoothingEnabled = false;
          ctx.imageSmoothing = false;
          ctx.imageSmoothingQuality = "high";
          ctx.webkitImageSmoothing = false;

          // console.log(ctx.canvas.clientWidth, ctx);
          // console.log(ctx.canvas.clientHeight, ctx);
          // return false;

          if(pcm_arr){

          }else{
            setTimeout(function(){
              // draw_canvas(_arg,pcm_arr,hexcolor);
            },1000);

            return false;
          }

          // console.log(ar_str, typeof(ar_str));

          if(typeof(ar_str)=='object'){
            ar = ar_str;
          }else{
            try{

              ar = JSON.parse(ar_str);
            }catch(err){
              // console.error('parse error - ',ar_str, ar_str!='');
            }
          }




          // console.log('ar - ', ar);


          var ratio = 1;

          var i = 0,
            j = 0,
            max = 0,
            ratio = 0;

          // console.log(ar);

          // -- normalazing
          for (i = 0; i < ar.length; i++) {
            // if (Math.abs(ar[i]) > max) {
            //     max = Math.abs(ar[i]);
            // }


            if ((ar[i]) > max) {
              max = (ar[i]);

            }
          }


          // ratio = 1 / max;


          // console.groupCollapsed("results");
          var ar_new = [];
          for (i = 0; i < ar.length; i++) {
            // ar[i] = parseFloat(Number(ar[i]) * parseFloat(ratio));
            // console.log(parseFloat(Number(ar[i]) / Number(max)));


            // ar_new[i] = parseFloat(Number(ar[i]) / Number(max));


            ar_new[i] = parseFloat(Math.abs(ar[i]) / Number(max));


            // if(i>0 && i<ar.length-1){
            //
            //     ar_new[i] = parseFloat( ((Math.abs(ar[i-1]) + Math.abs(ar[i]) + Math.abs(ar[i])) / 3) / Number(max));
            // }else{
            //
            //     ar_new[i] = parseFloat(Math.abs(ar[i]) / Number(max));
            // }
          }
          // console.groupEnd();

          // -- normalazing END




          // console.warn(162*0.005, 204/216, 204*0.0046);

          // console.log('max - ',max, ' ratio - ',ratio, 'hextoRGBA - ',hexToRgb('#222223', 0.5));
          // console.log(ar_new, ratio, ar[0], ar[1],ar[2],ar[3], ar[4]);

          ar = ar_new;



          var cww;
          var chh;


          // console.log(__canvas.width, _canvas.width());
          __canvas.width = _scrubbar.width();

          cww = __canvas.width;
          chh = __canvas.height;


          ctx.clearRect(0, 0, cww, chh);




          var bar_len = parseInt(o.skinwave_wave_mode_canvas_waves_number);
          var bar_space = parseFloat(o.skinwave_wave_mode_canvas_waves_padding);

          // console.log(bar_len);
          if(bar_len==1){
            bar_len = cww/bar_len;
          }
          if(bar_len==2){
            bar_len = cww/2;
          }
          if(bar_len==3){
            bar_len = (cww)/3;
          }

          // console.log(cww,bar_len);


          var reflection_size = parseFloat(o.skinwave_wave_mode_canvas_reflection_size);

          // console.log('draw canvas dimenstions - ',cw,ch, cww,chh, bar_len, bar_space);
          // console.log('bar_len -  ',bar_len);

          if (cww / bar_len < 1) {
            bar_len = Math.ceil(bar_len / 3);

          }

          // if (cww / bar_len < 2) {
          //     bar_len = Math.ceil(bar_len / 2);
          // }
          // if (cww / bar_len < 3) {
          //     bar_len = Math.ceil(cww / 4);
          // }

          // console.log('bar len - ', bar_len);


          var bar_w = Math.ceil(cww / bar_len);
          var normal_size_ratio = 1 - reflection_size;

          // console.log("bar_w - ",bar_w);

          if(bar_w == 0){
            bar_w = 1;
            bar_space = 0;
          }
          if(bar_w == 1){
            bar_space = bar_space/2;
          }
          // console.log('bar_w - ', bar_w, bar_space);


          // console.log('chh - ', chh, ' normal_size_ratio - ', normal_size_ratio, 'ar - ', ar);
          var lastval = 0;




          // -- left right gradient

          //console.log('hexcolor - ',hexcolor);
          var temp_hex = hexcolor;
          temp_hex = temp_hex.replace('#','');
          var hexcolors = []; // -- hex colors array
          if(temp_hex.indexOf(',')>-1){
            hexcolors = temp_hex.split(',');
          }



          var progress_hexcolor = '';
          var progress_hexcolors = '';


          if(margs.call_from=='spectrum'){


            var progress_hexcolor = o.design_wave_color_progress;
            progress_hexcolor = progress_hexcolor.replace('#','');
            var progress_hexcolors = []; // -- hex colors array
            if(progress_hexcolor.indexOf(',')>-1){
              progress_hexcolors = progress_hexcolor.split(',');

            }
          }


          var is_progress = false; // -- color the bar in progress colors

          // -- left right gradient END


          for (var i = 0; i < bar_len; i++) {
            sw_draw = true;

            ctx.save();

            // console.log('is_sample -> ',is_sample);


            var searched_index = Math.ceil(i * (ar.length / bar_len));



            if(margs.call_from=='canvas_normal_pcm_bg'){
              // console.log(bar_len, ar.length, searched_index, ar[searched_index], ar[searched_index-1], ar[searched_index+1]);
            }
            // console.log(searched_index);


            // -- we'll try to prevent
            if(i<bar_len/5){
              if(ar[searched_index]<0.1){
                ar[searched_index] = 0.1;
              }
            }
            if(ar.length > bar_len * 2.5 && i>0 && i<ar.length-1){
              ar[searched_index] = Math.abs(ar[searched_index] + ar[searched_index-1] + ar[searched_index+1])/3
            }


            // var barh = Math.abs(ar[searched_index] * chh);
            var barh_normal = Math.abs(ar[searched_index] * chh * normal_size_ratio);

            // -- let's try to normalize
            if(o.skinwave_wave_mode_canvas_normalize=='on'){

              barh_normal = barh_normal/1.5 + lastval/2.5;
            }
            lastval = barh_normal;
            // console.log('ar searched_index', ar[searched_index], 'barh - ',barh);

            //            var barh =


            ctx.lineWidth = 0;

            // console.log('bar w - ',bar_w);
            // bar_w = parseInt(bar)

            barh_normal = Math.floor(barh_normal);

            // var y = chh * normal_size_ratio - barh_normal;
            var y = Math.ceil(chh * normal_size_ratio - barh_normal);
            if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
              // y +=1 ;
              barh_normal ++ ;
            }

            // console.log(barh_normal + y)
            // if(barh_normal + y > scrubbar_h/reflection_size){
            //
            //     barh_normal = scrubbar_h/reflection_size - y;
            //
            // }


            ctx.beginPath();
            ctx.rect(i * bar_w, y, bar_w - bar_space, barh_normal);

            // console.log('coords - ',i*bar_w, parseInt(chh * normal_size_ratio - barh_normal,10), bar_w-bar_space, parseInt(barh_normal,10));

            // console.log(hexcolor);



            // -- left right gradient
            // nr++;
            //
            // hexcolor = '#'+nr.toString(16);

            // -- left right gradient END



            if(margs.call_from=='spectrum'){
              if(i/bar_len<time_curr/time_total){
                is_progress = true;
              }else{
                is_progress = false;
              }
              if(debug_var){
                //console.log(time_curr, time_total);
                //console.log(i, bar_len);





                if(i>50){

                }

                //console.log('is_progress - ',is_progress, progress_hexcolor, progress_hexcolors);
              }
              // debug_var = false;
            }





            // console.log('is_progress - ',is_progress);
            if(is_progress){
              // -- only for spectrum


              ctx.fillStyle = '#'+progress_hexcolor;

              if(progress_hexcolors.length){
                var gradient = ctx.createLinearGradient(0,0,0,chh);
                gradient.addColorStop(0,'#'+progress_hexcolors[0]);
                gradient.addColorStop(1,'#'+progress_hexcolors[1]);
                ctx.fillStyle = gradient;
              }



              if(is_sample){

                // console.log(i/bar_len, sample_time_start/sample_time_total,sample_time_end/sample_time_total );
                if( (i/bar_len < sample_time_start/sample_time_total) || i/bar_len > sample_time_end/sample_time_total){

                  ctx.fillStyle = hexToRgb(static_hexcolor,0);
                  // sw_draw = false;
                  // ctx.globalAlpha = 0.5;

                  // console.log("YES");
                }
              }
            }else{

              // -- not progress

              ctx.fillStyle = hexcolor;

              // -- if we have gradient
              if(hexcolors.length){
                var gradient = ctx.createLinearGradient(0,0,0,chh);
                hexcolors[0] = String(hexcolors[0]).replace('#','');
                hexcolors[1] = String(hexcolors[1]).replace('#','');
                gradient.addColorStop(0,'#'+hexcolors[0]);
                gradient.addColorStop(1,'#'+hexcolors[1]);
                ctx.fillStyle = gradient;
              }

              // ctx.fillRect(20,20,150,100);
              // console.log('ctx.fillStyle - ',ctx.fillStyle);

              if(is_sample){

                // console.log(i/bar_len, sample_time_start/sample_time_total,sample_time_end/sample_time_total, sample_time_end, sample_time_total );

                // if(i/bar_len > sample_time_end/sample_time_total){
                //     // console.warn("BIGGER");
                // }

                console.log('sample_time_start - ',sample_time_start);

                if( (i/bar_len < sample_time_start/sample_time_total) || i/bar_len > sample_time_end/sample_time_total){

                  ctx.fillStyle = hexToRgb(static_hexcolor,0.5);

                  if(margs.call_from.indexOf('pcm_prog')>-1){
                    sw_draw=false;
                  }
                }
                // console.log('ctx.fillStyle - ',ctx.fillStyle);
              }
            }


            // console.log('ctx.fillStyle - ',ctx.fillStyle);
            // console.log(ctx.fillStyle);

            // -- top bottom gradient

            // var gradient = ctx.createLinearGradient(0,0,0,chh);
            // gradient.addColorStop(0,hexcolor);
            // gradient.addColorStop(1,ColorLuminance(hexcolor, -0.25));
            // ctx.fillStyle = gradient;


            // -- top bottom gradient END

            if(sw_draw){

              // console.log('ctx.fillStyle - ',ctx.fillStyle);
              ctx.fill();
              ctx.closePath();
            }




            ctx.restore();

          }


          // -- reflection

          // -- reflection
          if (reflection_size > 0) {
            for (var i = 0; i < bar_len; i++) {

              sw_draw = true;


              var searched_index = Math.ceil(i * (ar.length / bar_len));


              // console.log(searched_index);

              var barh = Math.abs(ar[searched_index] * chh);
              var barh_ref = Math.abs(ar[searched_index] * chh * reflection_size);

              // console.log('ar searched_index', ar[searched_index], 'barh - ',barh);

              //            var barh =

              ctx.beginPath();
              ctx.rect(i * bar_w, chh * normal_size_ratio, bar_w - bar_space, barh_ref);

              //            console.log('coords - ',i*bar_w, chh-( normal_size_ratio * barh ), bar_w-bar_space, normal_size_ratio * barh);



              if(margs.call_from=='spectrum') {
                if (i / bar_len < time_curr / time_total) {
                  is_progress = true;
                } else {
                  is_progress = false;
                }
              }

              if(is_progress){

                // -- spectrum

                if(o.skinwave_wave_mode_canvas_mode!='reflecto'){

                  ctx.fillStyle = hexToRgb(progress_hexcolor, 0.25);
                }



                if(progress_hexcolors.length){
                  var gradient = ctx.createLinearGradient(0,0,0,chh);
                  var aux = hexToRgb('#'+progress_hexcolors[1], 0.25);
                  if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
                    aux = hexToRgb('#'+progress_hexcolors[1], 1);
                  }
                  gradient.addColorStop(0,aux);
                  aux = hexToRgb('#'+progress_hexcolors[0], 0.25);
                  if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
                    aux = hexToRgb('#'+progress_hexcolors[0], 1);
                  }
                  gradient.addColorStop(1,aux);
                  ctx.fillStyle = gradient;
                }
              }else{

                if(margs.call_from=='canvas_normal_pcm_prog'){
                  // console.warn('hexcolor -> ',hexcolor);
                }

                ctx.fillStyle = hexcolor;

                // -- we make this trapsnarent
                if(o.skinwave_wave_mode_canvas_mode!='reflecto'){

                  ctx.fillStyle = hexToRgb(hexcolor, 0.25);
                }



                if(hexcolors.length){
                  var gradient = ctx.createLinearGradient(0,0,0,chh);
                  var aux = hexToRgb('#'+hexcolors[1], 0.25);
                  if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
                    aux = hexToRgb('#'+hexcolors[1], 1);
                  }
                  gradient.addColorStop(0,aux);
                  aux = hexToRgb('#'+hexcolors[0], 0.25);
                  if(o.skinwave_wave_mode_canvas_mode=='reflecto'){
                    aux = hexToRgb('#'+hexcolors[0], 1);
                  }
                  gradient.addColorStop(1,aux);
                  ctx.fillStyle = gradient;
                }


                if(is_sample){


                  if( (i/bar_len < sample_time_start/sample_time_total) || i/bar_len > sample_time_end/sample_time_total){

                    ctx.fillStyle = hexToRgb(static_hexcolor,0.5);

                    if(margs.call_from.indexOf('pcm_prog')>-1){
                      sw_draw=false;
                    }
                  }
                }
              }



              if(sw_draw){

                ctx.fill();


                ctx.closePath();
              }

            }
          }

          setTimeout(function(){

            show_scrubbar();
          },100)

        }

        function ajax_get_likes(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_get_likes',
            postdata: mainarg,
            playerid: the_player_id
          };





          if (o.settings_php_handler) {


            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (window.console) {
                  // console.log('Got this from the server: ' + response);
                }

                var auxls = false;
                if (response.indexOf('likesubmitted') > -1) {
                  response = response.replace('likesubmitted', '');
                  auxls = true;
                }


                if (response == '') {
                  response = 0;
                }


                var _cach = cthis.find('.extra-html').eq(0);

                // console.warn('_cach - ',_cach);


                _cach.css('opacity','');
                var auxhtml = _cach.html();
                auxhtml = auxhtml.replace('{{get_likes}}', response);
                _cach.html(auxhtml);
                index_extrahtml_toloads--;
                if (auxls) {
                  cthis.find('.extra-html').find('.btn-like').addClass('active');
                }



                //console.log(index_extrahtml_toloads);
                if (index_extrahtml_toloads == 0) {
                  cthis.find('.extra-html').addClass('active');
                }

              },
              error: function(arg) {
                if (window.console) {
                  // console.log('Got this from the server: ' + arg, arg);
                };
                index_extrahtml_toloads--;
                if (index_extrahtml_toloads == 0) {
                  cthis.find('.extra-html').addClass('active');
                }
              }
            });
          }

        }

        function ajax_get_rates(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_get_rate',
            postdata: mainarg,
            playerid: the_player_id
          };


          if (o.settings_php_handler) {

            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                var auxls = false;
                if (response.indexOf('likesubmitted') > -1) {
                  response = response.replace('likesubmitted', '');
                  auxls = true;
                }


                if (response == '') {
                  response = '0|0';
                }


                var auxresponse = response.split('|');


                starrating_nrrates = auxresponse[1];
                cthis.find('.extra-html .counter-rates .the-number').eq(0).html(starrating_nrrates);
                index_extrahtml_toloads--;


                cthis.find('.star-rating-set-clip').width(auxresponse[0] * (parseInt(cthis.find('.star-rating-bg').width(), 10) / 5));


                //===ratesubmitted
                if (typeof(auxresponse[2]) != 'undefined') {
                  starrating_alreadyrated = auxresponse[2];


                  if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_player_rateSubmitted != undefined) {
                    $(o.parentgallery).get(0).api_player_rateSubmitted();
                  }
                }


                if (index_extrahtml_toloads <= 0) {
                  cthis.find('.extra-html').addClass('active');
                }

              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };
                index_extrahtml_toloads--;
                if (index_extrahtml_toloads <= 0) {
                  cthis.find('.extra-html').addClass('active');
                }
              }
            });
          }
        }

        function ajax_get_views(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_get_views',
            postdata: mainarg,
            playerid: the_player_id
          };



          if(data.playerid==''){
            data.playerid = dzs_clean_string(data_source);
          }



          if (o.settings_php_handler) {

            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                // console.log(response);


                if (response.indexOf('viewsubmitted') > -1) {
                  response = response.replace('viewsubmitted', '');
                  ajax_view_submitted = 'on';
                  increment_views = 0;
                }

                if (response == '') {
                  response = 0;
                }


                if (String(response).indexOf('{{theip') > -1) {

                  var auxa = /{\{theip-(.*?)}}/g.exec(response);
                  if (auxa[1]) {
                    currIp = auxa[1];
                  }

                  response = response.replace(/{\{theip-(.*?)}}/g, '');


                }


                // console.log('increment_views', increment_views);
                if (increment_views == 1) {
                  ajax_submit_views();
                  //console.log('response iz '+response);
                  response = Number(response) + increment_views;;
                  //console.log(response);
                  increment_views = 2;
                }

                var auxhtml = cthis.find('.extra-html').eq(0).html();


                auxhtml = auxhtml.replace('{{get_plays}}', response);
                cthis.find('.extra-html').eq(0).html(auxhtml);
                index_extrahtml_toloads--;


                if (index_extrahtml_toloads == 0) {
                  cthis.find('.extra-html').addClass('active');
                }

              },
              error: function(arg) {

                index_extrahtml_toloads--;
                if (index_extrahtml_toloads == 0) {
                  cthis.find('.extra-html').addClass('active');
                }
              }
            });
          }
        }


        function ajax_submit_rating(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_submit_rate',
            postdata: mainarg,
            playerid: the_player_id
          };

          if (starrating_alreadyrated > -1) {
            return;
          }
          cthis.find('.star-rating-con').addClass('just-rated');


          if (o.settings_php_handler) {
            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                };


                var resp_arr = {};

                try{
                  resp_arr = JSON.parse(response);
                }catch(e){
                  console.log(e);
                }

                var aux = cthis.find('.star-rating-set-clip').outerWidth() / cthis.find('.star-rating-bg').outerWidth();
                var nrrates = parseInt(cthis.find('.counter-rates .the-number').html(), 10);

                nrrates++;

                var aux2 = ((nrrates - 1) * (aux * 5) + starrating_index) / (nrrates)

                //                        console.log(aux, aux2, nrrates);

                setTimeout(function(){

                  cthis.find('.star-rating-con').removeClass('just-rated');
                },100);
                cthis.find('.counter-rates .the-number').html(resp_arr.number);

                cthis.find('.star-rating-con').attr('data-initial-rating-index',Number(resp_arr.index)/5);
                cthis.find('.star-rating-con .rating-prog').css('width',(Number(resp_arr.index)/5*100) + '%');

                if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_player_rateSubmitted != undefined) {
                  $(o.parentgallery).get(0).api_player_rateSubmitted();
                }

              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };


                var aux = cthis.find('.star-rating-set-clip').outerWidth() / cthis.find('.star-rating-bg').outerWidth();
                var nrrates = parseInt(cthis.find('.counter-rates .the-number').html(), 10);

                nrrates++;

                var aux2 = ((nrrates - 1) * (aux * 5) + starrating_index) / (nrrates)

                //                        console.log(aux, aux2, nrrates);
                cthis.find('.star-rating-set-clip').width(aux2 * (parseInt(cthis.find('.star-rating-bg').width(), 10) / 5));
                cthis.find('.counter-rates .the-number').html(nrrates);

                if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_player_rateSubmitted != undefined) {
                  $(o.parentgallery).get(0).api_player_rateSubmitted();
                }

              }
            });
          }
        };


        function ajax_submit_download(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_submit_download',
            postdata: mainarg,
            playerid: the_player_id
          };

          if (starrating_alreadyrated > -1) {
            return;
          }

          if (o.settings_php_handler) {

            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                // console.log('Got this from the server: ' + response);



              },
              error: function(arg) {
                // console.log('Got this from the server: ' + arg, arg);



              }
            });
          }
        };


        function ajax_submit_views(argp) {

          // console.log('ajax_submit_views()',argp);

          var data = {
            action: 'dzsap_submit_views',
            postdata: 1,
            playerid: the_player_id,
            currip: currIp
          };


          if(cthis.attr('data-playerid-for-views')){
            data.playerid = cthis.attr('data-playerid-for-views');
          }


          if(data.playerid==''){
            data.playerid = dzs_clean_string(data_source);
          }

          //                console.log(ajax_view_submitted);



          // -- submit view
          if (o.settings_php_handler) {
            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                // -- increase number of hits
                var auxnr = cthis.find('.counter-hits .the-number').html();
                auxnr = parseInt(auxnr, 10);
                if (increment_views != 2) {
                  auxnr++;
                }

                cthis.find('.counter-hits .the-number').html(auxnr);

                ajax_view_submitted = 'on';
              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };


                var auxlikes = cthis.find('.counter-hits .the-number').html();
                auxlikes = parseInt(auxlikes, 10);
                auxlikes++;
                cthis.find('.counter-hits .the-number').html(auxlikes);

                ajax_view_submitted = 'on';
              }
            });
            ajax_view_submitted = 'on';
          }
        }

        function ajax_submit_like(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_submit_like',
            postdata: mainarg,
            playerid: the_player_id
          };


          cthis.find('.btn-like').addClass('disabled');

          if (o.settings_php_handler || cthis.hasClass('is-preview')) {

            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                cthis.find('.btn-like').addClass('active');
                cthis.find('.btn-like').removeClass('disabled');
                var auxlikes = cthis.find('.counter-likes .the-number').html();
                auxlikes = parseInt(auxlikes, 10);
                auxlikes++;
                cthis.find('.counter-likes .the-number').html(auxlikes);
              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };


                cthis.find('.btn-like').addClass('active');
                cthis.find('.btn-like').removeClass('disabled');
                var auxlikes = cthis.find('.counter-likes .the-number').html();
                auxlikes = parseInt(auxlikes, 10);
                auxlikes++;
                cthis.find('.counter-likes .the-number').html(auxlikes);
              }
            });
          }
        }

        function ajax_retract_like(argp) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_retract_like',
            postdata: mainarg,
            playerid: the_player_id
          };

          cthis.find('.btn-like').addClass('disabled');


          if (o.settings_php_handler) {
            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                cthis.find('.btn-like').removeClass('active');
                cthis.find('.btn-like').removeClass('disabled');
                var auxlikes = cthis.find('.counter-likes .the-number').html();
                auxlikes = parseInt(auxlikes, 10);
                auxlikes--;
                cthis.find('.counter-likes .the-number').html(auxlikes);
              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };

                cthis.find('.btn-like').removeClass('active');
                cthis.find('.btn-like').removeClass('disabled');
                var auxlikes = cthis.find('.counter-likes .the-number').html();
                auxlikes = parseInt(auxlikes, 10);
                auxlikes--;
                cthis.find('.counter-likes .the-number').html(auxlikes);
              }
            });
          }
        }

        function skinwave_comment_publish(argp) {
          // -- only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_front_submitcomment',
            postdata: mainarg,
            playerid: the_player_id,
            comm_position: sposarg,
            skinwave_comments_process_in_php: o.skinwave_comments_process_in_php,
            skinwave_comments_avatar: o.skinwave_comments_avatar,
            skinwave_comments_account: o.skinwave_comments_account
          };

          if (cthis.find('*[name=comment-email]').length > 0) {

            data.email = cthis.find('*[name=comment-email]').eq(0).val();
          }



          if (o.settings_php_handler) {
            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (response.charAt(response.length - 1) == '0') {
                  response = response.slice(0, response.length - 1);
                }
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                //console.log(data.postdata);


                var aux = '';
                if (o.skinwave_comments_process_in_php != 'on') {

                  // -- process the comment now, in javascript
                  aux = (data.postdata);

                } else {

                  // -- process php
                  aux = '';


                  aux += '<span class="dzstooltip-con" style="left:' + sposarg + '"><span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: 250px;"><span class="the-comment-author">@' + o.skinwave_comments_account + '</span> says:<br>';
                  aux += htmlEncode(data.postdata);


                  aux += '</span><div class="the-avatar" style="background-image: url(' + o.skinwave_comments_avatar + ')"></div></span>';


                }

                // console.log(aux);
                // _commentsHolder.append(aux);

                _commentsHolder.children().each(function(){
                  var _t2 = $(this);

                  if(_t2.hasClass('dzstooltip-con')==false){
                    _t2.addClass('dzstooltip-con');
                  }
                })

                _commentsHolder.append(aux);



                if (action_audio_comment) {
                  action_audio_comment(cthis, aux);
                }


                //jQuery('#save-ajax-loading').css('visibility', 'hidden');
              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };
                _commentsHolder.append(data.postdata);
              }
            });
          }
        }

        function setup_media(pargs) {
          // -- order = init, setup_media, init_loaded


          //                return;


          var margs = {

            'do_not_autoplay': false
            ,'call_from': 'default'
          };


          if (pargs) {
            margs = $.extend(margs, pargs);
          }
          // console.log('%c --- #setup_media()', 'background-color: #eaeaea;', cthis.attr('data-source'), o.cue,ajax_view_submitted, margs, loaded, 'cthis - ', cthis, 'o.preload_method -'  , o.preload_method, 'loaded - ',loaded);


          // -- these types should not exist
          if(type=='icecast' || type=='shoutcast'){
            type = 'audio';
          }

          if (o.cue == 'off') {
            //console.log(ajax_view_submitted);
            if (ajax_view_submitted == 'auto') {


              // -- why is view submitted ?
              increment_views = 1;

              // console.log(o.settings_extrahtml);
              if (String(o.settings_extrahtml).indexOf('{{get_plays}}') > -1) {
                ajax_view_submitted = 'on'
              } else {
                ajax_view_submitted = 'off';
              };
            }
          }






          //console.log(type, o.type, loaded);

          if (loaded == true) {
            return;
          }




          if(cthis.attr('data-original-type')=='youtube'){
            return;
          }

          // console.warn("SETUP MEDIA", margs, type);




          if (type == 'youtube') {

            load_yt_api();





            if(String(cthis.attr('data-source')).indexOf('youtube.com/watch')){

              var dataSrc = cthis.attr('data-source');
              var auxa = String(dataSrc).split('youtube.com/watch?v=');
//                            console.log(auxa);
              if(auxa[1]){

                dataSrc = auxa[1];
                if(auxa[1].indexOf('&')>-1){
                  var auxb = String(auxa[1]).split('&');
                  dataSrc = auxb[0];
                }

                cthis.attr('data-source', dataSrc);
              }
            }
          }




          if (type == 'youtube') {
            if (o.settings_exclude_from_list != 'on' && dzsap_list && dzsap_list.indexOf(cthis) == -1) {
              if (dzsap_list) {

                if(cthis.attr('data-do-not-include-in-list')!='on'){
                  dzsap_list.push(cthis);
                }
              }
            }
            dzsap_yt_list.push(cthis);



            if(margs.call_from=='change_media'){

              yt_inited = false;

              if (_cmedia && _cmedia.destroy) {

                _cmedia.destroy();
                //return false;
                console.log("DESTROYED LAST PLAYERS");
              }

              _theMedia.children().remove();
            }

            // console.log('_theMedia - ',_theMedia);


            _theMedia.append('<div id="'+yt_curr_id+'"></div>');
            cthis.get(0).fn_yt_ready = check_yt_ready;

            if (window.YT) {

              check_yt_ready(yt_curr_id);
            }



            //inter_check_yt_ready = setInterval(check_yt_ready, 500);









            // console.log("media-setuped");
            cthis.addClass('media-setuped');
            cthis.addClass('meta-loaded');

            if(_feed_fakePlayer){
              _feed_fakePlayer.addClass('meta-loaded');
            }
            //_conPlayPause.unbind('click');
            //_conPlayPause.off('click');
            //_conPlayPause.on('click', click_playpause);
            // return;
          }


          var str_open_audio_tag = '';
          var aux_source = '';
          var aux9 = '';

          if(is_ios()){
            o.preload_method='metadata';
          }

          // console.warn("COOKING .change_media", ' type - ',type);

          if(type=='audio' || type=='normal' || type=='soundcloud') {
            str_open_audio_tag += '<audio';
            str_open_audio_tag += ' preload="' + o.preload_method + '"';
            if (o.skinwave_enableSpectrum == 'on') {
              str_open_audio_tag+=' crossOrigin="anonymous"';
              // str_open_audio_tag += ' src="'+cthis.attr('data-source')+'"';
            }

            if (is_ios()) {
              if (margs.call_from == 'change_media') {
                aux += ' autoplay';
              }
            }

            str_open_audio_tag += '>';
            aux_source = '';

            // console.log('cthis.attr("data-source")', cthis.attr('data-source'));
            if (cthis.attr('data-source')) {

              if(type_normal_stream_type!='icecast' ){

                data_source = cthis.attr('data-source');
              }

              // console.log('data_source'+' - '+data_source)
              if (data_source != 'fake') {

                aux_source += '<source src="' + data_source + '" type="audio/mpeg">';
                if (cthis.attr('data-sourceogg') != undefined) {
                  aux_source += '<source src="' + cthis.attr('data-sourceogg') + '" type="audio/ogg">';
                }
              } else {
                cthis.addClass('meta-loaded meta-fake');
              }
            }
            aux9 += '</audio>';


            //<embed src="'+ o.swf_location+'" width="100" height="100" allowScriptAccess="always">
            //console.log(str_open_audio_tag, _theMedia);

            str_audio_element = str_open_audio_tag + aux_source + aux9;

            // console.log(' .final_aux - ', str_audio_element, _theMedia);


            // -- change media
            if (margs.call_from == 'change_media') {
              if (_cwatermark && _cwatermark.pause) {
                _cwatermark.pause();
              }
              _theMedia.find('.the-watermark').remove();
              _cwatermark = null;
              if (is_ios() || is_android()) {

                // -- we append only the source to mobile devices as we need the thing to autoplay without user action

                if (_cmedia) {
                  _theMedia.children().remove();
                  $(_cmedia).append(aux_source);
                  if (margs.call_from == 'change_media') {

                    _cmedia.addEventListener('loadedmetadata', function (e) {
                      // console.warn('loadedmetadata', this, this.audioElement, this.duration, cthis);
                      // console.log('add metaloaded here');

                      cthis.addClass('meta-loaded');
                      cthis.removeClass('meta-fake');
                      if(_feed_fakePlayer){
                        _feed_fakePlayer.addClass('meta-loaded');
                      }
                    }, true);
                  }
                  if (_cmedia.load) {

                    _cmedia.load();
                  }
                }

              } else {
                // -- normal desktop

                // console.log('%c .str_audio_element - ', 'background-color: #dada20;',str_audio_element);
                _theMedia.append(str_audio_element);
                _cmedia = (_theMedia.children('audio').get(0));
              }
            } else {


              // console.log("_theMedia.html() - ",_theMedia.html());
              // console.log("str_audio_element - ",str_audio_element);
              _theMedia.children().remove();
              _theMedia.append(str_audio_element);
              _cmedia = (_theMedia.children('audio').get(0));
              // console.log("_theMedia.html() - ",_theMedia.html());



              if (is_ios() || is_android()) {
                if(margs.call_from=='retrieve_soundcloud_url'){
                  setTimeout(function(){

                    pause_media();
                  },500);
                }
              }
            }

            if (cthis.attr('data-soft-watermark')) {
              //type="audio/wav"

              //console.log('add watermark');
              _theMedia.append('<audio class="the-watermark" preload="metadata" loop><source src="' + cthis.attr('data-soft-watermark') + '" /></audio>');
              _cwatermark = _theMedia.find('.the-watermark').get(0);

              if (_cwatermark.volume) {
                _cwatermark.volume = defaultVolume * o.watermark_volume;
              }
              //console.log(_cwatermark);
            }

            // console.warn(margs);


            //return;
            //_theMedia.children('audio').get(0).autoplay = false;


            // console.log('cthis.attr(\'data-source\') - ',cthis.attr('data-source'));
            if (_cmedia && _cmedia.addEventListener && cthis.attr('data-source') != 'fake') {
              _cmedia.addEventListener('error', function (e) {
                console.log('errored out', this, this.audioElement, this.duration, e, e.target.error);
                var noSourcesLoaded = (this.networkState === HTMLMediaElement.NETWORK_NO_SOURCE);
                if (noSourcesLoaded && dzsap_is_mobile()==false) {
                  if (cthis.hasClass('errored-out') == false) {
                    console.log("%c could not load audio source - ",'color:#ff2222;', cthis.attr('data-source'));

                    if (attempt_reload < 5) {
                      setTimeout(function (earg) {

                        // console.log("ERROR !!!", _cmedia, _cmedia.src, cthis.attr('data-source'), earg);
                        // console.log(earg.target.error)

                        _cmedia.src = '';
                        // _cmedia.load();


                        setTimeout(function () {

                          // console.log(_cmedia, _cmedia.src, cthis.attr('data-source'));

                          _cmedia.src = cthis.attr('data-source');
                          _cmedia.load();
                        }, 1000)


                      }, 1000,e)
                      attempt_reload++;
                    }else{


                      if(o.notice_no_media=='on' ){

                        //&& e.target && e.target.error && (e.target.error.code==1 || e.target.error.code==2|| e.target.error.code==3|| e.target.error.code==5)


                        cthis.addClass('errored-out');

                        var txt = 'error - file does not exist...';
                        if(e.target.error){
                          txt = e.target.error.message;
                        }




                        cthis.append('<div class="feedback-text">'+txt+' </div>');
                      }
                    }
                  }
                }

              }, true);
              _cmedia.addEventListener('loadedmetadata', function (e) {
                // console.log('loadedmetadata', this, this.audioElement, this.duration, cthis);
                cthis.addClass('meta-loaded');
                cthis.removeClass('meta-fake');

                if(_feed_fakePlayer){
                  _feed_fakePlayer.addClass('meta-loaded');
                  _feed_fakePlayer.removeClass('meta-fake');
                }
                // console.log('add metaloaded here');


                if (margs.call_from == 'change_media') {
                  if (cthis.hasClass('init-loaded') == false) {
                    init_loaded({
                      'call_from': 'force_reload_change_media'
                    })
                  }
                }
              }, true);
            }


            //console.log(cthis,type);
            if (type != 'fake') {

              //return false;
            }

            //alert(_cmedia);
          }

          // console.warn("MEDIA SETUPED",_conPlayPause);
          cthis.addClass('media-setuped');
          //_conPlayPause.off('click');






          if(margs.call_from=='change_media'){
            return false;
          }


          //console.log("TRY TO CHECK READY", cthis);

          // console.log("CEVA");
          //           is_ios() ||

          if(type!='youtube'){
            if(cthis.attr('data-source')=='fake'){
              if(is_ios() || is_android()){
                init_loaded(margs);
              }
            }else{



              if (is_ios()) {

                // console.log("o.settings_backup_type - ", o.settings_backup_type);
                if (o.settings_backup_type == 'full') {
                  init_loaded(margs);
                } else {
                  setTimeout(function() {
                    init_loaded(margs);
                  }, 1000);
                }

              } else {

                // -- check_ready() will fire init_loaded()
                inter_checkReady = setInterval(function() {
                  check_ready(margs);
                }, 50);
                //= setInterval(check_ready, 50);
              }

            }




            if(o.preload_method=='none'){

              // console.log(window.dzsap_player_index);
              setTimeout(function(){
                if(_cmedia){

                  $(_cmedia).attr('preload', 'metadata');
                }
              }, (Number(window.dzsap_player_index)+1 * 18000) );
            }


            // -- hmm
            // console.log("ASSIGN HERE", cthis, _conPlayPause);


            if (o.design_skin == 'skin-customcontrols' || o.design_skin == 'skin-customhtml') {
              cthis.find('.custom-play-btn,.custom-pause-btn').off('click');
              cthis.find('.custom-play-btn,.custom-pause-btn').on('click', click_playpause);
            }

            if (o.failsafe_repair_media_element) {
              setTimeout(function() {

                if (_theMedia.children().eq(0).get(0) && _theMedia.children().eq(0).get(0).nodeName == "AUDIO") {
                  //console.log('ceva');
                  return false;
                }
                _theMedia.html('');
                _theMedia.append(str_audio_element);

                var aux_wasplaying = player_playing;

                pause_media();
                //return;
                //_theMedia.children('audio').get(0).autoplay = false;
                _cmedia = (_theMedia.children('audio').get(0));



                if (aux_wasplaying) {
                  aux_wasplaying = false;
                  setTimeout(function() {

                    play_media({
                      'call_from':'aux_was_playing'
                    });
                  }, 20);
                }
              }, o.failsafe_repair_media_element);

              o.failsafe_repair_media_element = '';

            }
          }



          // is_ios() ||







        }

        function destroy_media() {
          //console.log("destroy_media()", cthis)
          pause_media();



          if (_cmedia) {

            //console.log(_cmedia, _cmedia.src);
            if (_cmedia.children) {

              //_cmedia.children().remove();
            }

            //console.log(_cmedia.innerHTML);
            if (o.type == 'audio') {
              _cmedia.innerHTML = '';
              _cmedia.load();
            }
            //console.log(_cmedia.innerHTML);

            //_cmedia.remove();
          }

          if(is_ios() || is_android()){
            if (_cmedia) {

              // _cmedia.children().remove();
              // loaded = false;
            }
          }else{
            if (_theMedia) {

              _theMedia.children().remove();
              loaded = false;
            }
          }

        }

        function setup_listeners() {


          if(setuped_listeners){
            return false;
          }
          // console.log('setup_listeners()');

          setuped_listeners = true;


          // -- adding scrubbar listeners
          _scrubbar.unbind('mousemove');
          _scrubbar.unbind('mouseleave');
          _scrubbar.unbind('click');
          _scrubbar.bind('mousemove', handle_mouse_scrubbar);
          _scrubbar.bind('mouseleave', handle_mouse_scrubbar);
          _scrubbar.bind('click', handle_mouse_scrubbar);

          // cthis.on('');



          // console.log('_controlsVolume -' ,_controlsVolume);


          _controlsVolume.on('click','.volumeicon', click_mute);

          if (o.design_skin == 'skin-redlights') {
            _controlsVolume.bind('mousemove', mouse_volumebar);
            _controlsVolume.bind('mousedown', mouse_volumebar);


            $(document).undelegate(window, 'mouseup', mouse_volumebar);
            $(document).delegate(window, 'mouseup', mouse_volumebar);
          } else {

            _controlsVolume.find('.volume_active').bind('click', mouse_volumebar);
            _controlsVolume.find('.volume_static').bind('click', mouse_volumebar);

            if (o.design_skin == 'skin-silver') {
              cthis.on('click', '.volume-holder',mouse_volumebar);
            }

          }

          cthis.find('.playbtn').unbind('click');





          //                console.log('setup_listeners()');

          setTimeout(handleResize, 300);
          // setTimeout(handleResize,1000);
          setTimeout(handleResize, 2000);

          if (o.settings_trigger_resize > 0) {
            inter_trigger_resize = setInterval(handleResize, o.settings_trigger_resize);
          }




          cthis.addClass('listeners-setuped');





          return false;

          //                console.log('ceva');
        }

        function click_like() {
          console.log('click_like()');
          var _t = $(this);
          if (cthis.has(_t).length == 0) {
            return;
          }

          if (_t.hasClass('active')) {
            ajax_retract_like();
          } else {
            ajax_submit_like();
          }
        }



        function get_last_vol() {
          return last_vol;
        }

        function init_loaded(pargs) {

          if (cthis.attr('id') == 'apminimal') {
          }
          // console.warn('init_loaded() - ', pargs, cthis, cthis.hasClass('loaded'));
          if (cthis.hasClass('dzsap-loaded')) {
            return;
          }

          var margs = {

            'do_not_autoplay': false
            ,'call_from': 'init'
          };


          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.groupCollapsed('init_loaded()');
          // console.log('', margs);
          //
          // console.warn(cthis, cthis.hasClass('loaded'));
          // console.groupEnd();



          if (typeof(_cmedia) != "undefined" && _cmedia) {
            if (_cmedia.nodeName == 'AUDIO') {
              //console.log(_cmedia);
              _cmedia.addEventListener('ended', handle_end);
            } else {

            }
          }



          var _vc_tta_panel = null;


          if(cthis.parent().hasClass("vc_tta-panel-body")){
            _vc_tta_panel = cthis.parent();
          }else{
            if(cthis.parent().parent().parent().hasClass("vc_tta-panel-body")){
              _vc_tta_panel = cthis.parent().parent().parent();
            }
            if(cthis.parent().parent().parent().parent().parent().hasClass("vc_tta-panel-body")){
              _vc_tta_panel = cthis.parent().parent().parent().parent().parent();
            }
          }



          // console.log('check panel - ',cthis.parent().parent().parent(), cthis.parent().parent().parent().parent());

          if(_vc_tta_panel){
            // console.log("yes, it's tabs",_vc_tta_panel.parent().parent().parent().parent());


            var _c = _vc_tta_panel.parent().parent().parent().parent();
            // console.log("_c - ",_c);
            _c.find('.vc_tta-tab,.vc_tta-panel-heading').data('parent-tabs',_c);




            // console.log('big con is ',_c);
            _c.on('click','.vc_tta-tab,.vc_tta-panel-heading',function(){
              var _t2 = $(this);

              // console.log("CLICKED", _t2, _t2.data('parent-tabs'));

              if(_t2.data('parent-tabs')){
                var _con2 = _t2.data('parent-tabs');

                _con2.find('.audioplayer').each(function(){
                  var _t3 = $(this);



                  if(_t3.get(0) && _t3.get(0).api_handleResize){
                    setTimeout(function(arg){
                      arg.get(0).api_handleResize();
                      // arg.get(0).api_handleResize_currVideo();
                    },10,_t3);
                    setTimeout(function(arg){
                      arg.get(0).api_pause_media();
                    },100,_t3);
                  }
                })
              }
            })
          }








          //console.log("CLEAR THE TIMEOUT HERE")
          clearInterval(inter_checkReady);
          clearTimeout(inter_checkReady);
          setup_listeners();
          //console.log('setuped_listeners', cthis.hasClass('dzsap-loaded'), cthis)


          setTimeout(function() {

            //console.log(_currTime, )
            if (_currTime && _currTime.outerWidth() > 0) {
              currTime_outerWidth = _currTime.outerWidth();
            }
          }, 1000);




          // -- this comes from cue off, no pcm data


          // console.log('pcm_promise_generate_on_meta_load - ',pcm_promise_generate_on_meta_load);
          if(pcm_promise_generate_on_meta_load){

            pcm_try_to_generate=true;



            // console.log("YEA",'pcm_is_real - ',pcm_is_real);
            init_generate_wave_data({
              'call_from':'pcm_data_try_to_generate .. no data-pcm'
            });
          }



          //console.log('type - ',type);
          //console.log('initLoaded() - margs - ',margs);


          if (type != 'fake' && margs.call_from!='force_reload_change_media') {


            if (o.settings_exclude_from_list != 'on' && dzsap_list && dzsap_list.indexOf(cthis) == -1) {
              if (o.fakeplayer == null) {

                dzsap_list.push(cthis);
              }
            }


            if (o.type_audio_stop_buffer_on_unfocus == 'on') {


              cthis.data('type_audio_stop_buffer_on_unfocus', 'on');

              cthis.get(0).api_destroy_for_rebuffer = function() {

                if (o.type == 'audio') {
                  playfrom = _cmedia.currentTime;
                }
                //console.log(playfrom);
                destroy_media();

                destroyed_for_rebuffer = true;
              }

            }
          }

          //console.log("CHECK TIME",cthis);


          if (o.design_skin == 'skin-wave') {
            if (o.skinwave_enableSpectrum == 'on') {

              //console.log(typeof AudioContext);

              // console.log("USED AUDIO CONTEXT");





              // trying to use only one audio ctx per page.
              if (window.dzsap_audio_ctx == null) {
                if (typeof AudioContext !== 'undefined') {
                  audioCtx = new AudioContext();
                  window.dzsap_audio_ctx = audioCtx;
                } else if (typeof webkitAudioContext !== 'undefined') {
                  audioCtx = new webkitAudioContext();
                  window.dzsap_audio_ctx = audioCtx;
                } else {
                  audioCtx = null;
                }

              } else {

                audioCtx = window.dzsap_audio_ctx;
              }



              if(audioCtx.createOscillator){

                // oscillatorNode = audioCtx.createOscillator();
              }

              if(audioCtx.destination){

                // audioCtx_finish = audioCtx.destination;
              }





              //console.log(audioCtx);

              if (audioCtx) {


                // console.log('audioCtx - ', audioCtx);




                //if(!)
                if (typeof audioCtx.createJavaScriptNode != 'undefined') {
                  javascriptNode = audioCtx.createJavaScriptNode(2048, 1, 1);
                }
                if (typeof audioCtx.createScriptProcessor != 'undefined') {
                  javascriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
                  //console.log(javascriptNode);
                }


                if (is_android()) {


                  analyser = audioCtx.createAnalyser();
                  analyser.smoothingTimeConstant = 0.3;
                  analyser.fftSize = 512;


                  //oscillator = audioCtx.createOscillator();
                  //oscillator.start(0);

                  // Set up a script node that sets output to white noise
                  var url = data_source;


                  javascriptNode.onaudioprocess = function(event) {
                    //var output = event.outputBuffer.getChannelData(0);
                    //for (i = 0; i < output.length; i++) {
                    //    output[i] = Math.random() / 10;
                    //}

                    // -- android

                    var array = new Uint8Array(analyser.frequencyBinCount);
                    //console.log(analyser, analyser.getByteFrequencyData(array), new Uint8Array(analyser.frequencyBinCount));
                    //console.log('Processing buffer', array);
                    analyser.getByteFrequencyData(array);

                    lastarray = array.slice();



                    if (player_playing) {
                      lastarray = generateFakeArray();
                    }

                    //console.log(playing, lastarray);


                  };

                  // Connect oscillator to script node and script node to destination
                  // (should output white noise)
                  //                                oscillator.connect(javascriptNode);


                  webaudiosource = audioCtx.createMediaElementSource(_cmedia);
                  webaudiosource.connect(analyser);
                  //console.log(webaudiosource);
                  analyser.connect(audioCtx.destination);


                  javascriptNode.connect(audioCtx.destination);



                  //console.log('ceva');
                } else {
                  if (javascriptNode) {
                    // setup a analyzer
                    analyser = audioCtx.createAnalyser();
                    analyser.smoothingTimeConstant = 0.3;
                    //analyser.fftSize = 64;
                    //analyser.fftSize = 256;
                    analyser.fftSize = 512;
                    //console.log(analyser);
                    // -- create a buffer source node
                    // console.log('is_ios - ',is_ios());
                    // console.log("HMM  analyser", data_source);
                    //console.log('cevaal');
                    //console.log(_cmedia, _cmedia.get(0))
                    //console.log(is_chrome(), is_firefox());
                    // -- && (is_chrome() || is_firefox() || is_safari() || is_ios())
                    if (type == 'audio' ) {
                      // console.log(_cmedia);
                      // return;
                      _cmedia.crossOrigin = "anonymous";
                      if(is_ios()){
                        //webaudiosource = audioCtx.createMediaStreamSource(_cmedia);
                      }else{

                      }
                      webaudiosource = audioCtx.createMediaElementSource(_cmedia);
                      webaudiosource.connect(analyser);

                      if(audioCtx.createGain){
                        gainNode = audioCtx.createGain();
                      }

                      // source.connect(gainNode);

                      analyser.connect(audioCtx.destination);

                      // console.log(audioCtx);

                      //var node = audioCtx.createGain(4096, 2, 2);
                      //node.connect(javascriptNode);
                      // javascriptNode.connect(audioCtx.destination);
                      gainNode.connect(audioCtx.destination);
                      // console.log('cmedia - ',_cmedia, analyser, audioCtx.destination);
                      // audioCtx_buffer  = audioCtx.createBuffer(2, 22050, 22050);
                      var frameCount = audioCtx.sampleRate * 2.0;
                      var audioCtx_buffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
                    }
                    //playSound();

                    var stopaudioprocessfordebug = false;
                    setTimeout(function() {
                      // stopaudioprocessfordebug = true;
                    }, 3000);


                  }
                }


                // -- deprecated ios
                // if(is_ios() ){
                //
                //   // -- is ios
                //
                //
                //   var file = null;
                //   var fr = new FileReader();
                //
                //
                //   var getFileBlob = function (url, cb) {
                //     var xhr = new XMLHttpRequest();
                //     xhr.open("GET", url);
                //     xhr.responseType = "blob";
                //     xhr.addEventListener('load', function() {
                //       cb(xhr.response);
                //     });
                //     xhr.send();
                //   };
                //
                //   var blobToFile = function (blob, name) {
                //     blob.lastModifiedDate = new Date();
                //     blob.name = name;
                //     return blob;
                //   };
                //
                //   var getFileObject = function(filePathOrUrl, cb) {
                //     getFileBlob(filePathOrUrl, function (blob) {
                //       cb(blobToFile(blob, ''));
                //     });
                //   };
                //
                //   fr.onload = function(e){
                //     var fileResult = e.target.result;
                //
                //     audioCtx.decodeAudioData(fileResult, function(buffer) {
                //
                //       //console.warn('decode successful');
                //       //console.warn(fileResult);
                //       audioCtx_buffer = buffer;
                //     }, function(e) {
                //     });
                //   }
                //
                //   var aux =
                //     getFileObject(data_source, function (fileObject) {
                //       file = fileObject;
                //       fr.readAsArrayBuffer(file);
                //     });
                //
                //   audioCtx_buffer = 'waiting';
                // }




              }
            }
          }

          //console.log(ajax_view_submitted);

          if (ajax_view_submitted == 'auto') {
            setTimeout(function() {
              if (ajax_view_submitted == 'auto') {
                ajax_view_submitted = 'off';
              }
            }, 1000);
          }

          //console.log('---- ADDED LOADED BUT FROM WHERE', cthis);
          loaded = true;

          if(data_source!='fake'){

            cthis.addClass('dzsap-loaded');
          }

          //                console.log(playfrom);

          if(o.default_volume=='default'){
            defaultVolume = 1;
          }

          if (isNaN(Number(o.default_volume)) == false) {
            defaultVolume = Number(o.default_volume);
          } else {
            if (o.default_volume == 'last') {


              if (localStorage != null && the_player_id) {

                //console.log(the_player_id);


                if (localStorage.getItem('dzsap_last_volume_' + the_player_id)) {

                  defaultVolume = localStorage.getItem('dzsap_last_volume_' + the_player_id);
                } else {

                  defaultVolume = 1;
                }
              } else {

                defaultVolume = 1;
              }
            }
          }

          if (o.volume_from_gallery) {
            defaultVolume = o.volume_from_gallery;
          }


          // console.log(pargs);
          set_volume(defaultVolume, {
            call_from: "from_init_loaded"
          });


          // console.log('pseudo_sample_time_start -> ',pseudo_sample_time_start);
          if(pseudo_sample_time_start){
            playfrom = (pseudo_sample_time_start);
          }
          // console.log('playfrom -> ',playfrom);
          if (isInt(playfrom)) {
            seek_to(playfrom, {
              call_from: 'from_playfrom'
            });
          }


          // TODO: debug
          // localStorage['dzsap_' + the_player_id + '_lastpos'] = 10;
          if (playfrom == 'last') {
            // -- here we save last position
            if (typeof Storage != 'undefined') {
              setTimeout(function() {
                playfrom_ready = true;
              })


              if (typeof localStorage['dzsap_' + the_player_id + '_lastpos'] != 'undefined') {

                // console.warn("LETS SEEK TO lastposition -3 ",localStorage['dzsap_' + the_player_id + '_lastpos'])
                seek_to(localStorage['dzsap_' + the_player_id + '_lastpos'], {
                  'call_from': 'last_pos'
                });
              }
            }
          }
          //return false ;

          //                console.log(cthis, o.autoplay);





          if (margs.do_not_autoplay != true) {

            if (o.autoplay == 'on' && o.cue=='on') {
              // console.log('margs.do_not_autoplay - ', margs.do_not_autoplay, margs,o);
              play_media({
                'call_from':'do not autoplay not true ( init_loaded() ) '
              });
            };
          }

          if(_cmedia && _cmedia.duration){
            cthis.addClass('meta-loaded');
          }


          // -- init loaded()


          // if(debug_var2){
          //
          //     debug_var2 = false;
          // }

          // console.log('called check_time() - ',cthis);

          check_time({
            'fire_only_once': false
          });

          if(o.autoplay=='off'){
            sw_suspend_enter_frame=true;
          }

          cthis.addClass('init-loaded');

          setTimeout(function() {
            //console.log(cthis.find('.wave-download'));

            get_times({
              'call_from': 'set timeout 500'
            });
            check_time({
              'fire_only_once': true
            });

            cthis.find('.wave-download').bind('click', handle_mouse);
          }, 500);

          setTimeout(function() {
            //console.log(cthis.find('.wave-download'));

            get_times({
              'call_from': 'set timeout 1000'
            });

            // console.log('audioCtx_buffer.duration - ',audioCtx_buffer.duration)
            // console.log('_cmedia.duration - ',_cmedia.duration)

            if (audioCtx_buffer) {
              time_total = audioCtx_buffer.duration;
            }
            check_time({
              'fire_only_once': true
            });


          }, 1000);


          setTimeout(function(){

            // console.log('_cmedia.duration - ',_cmedia.duration)
          },2000);


          // console.log('init_loaded - ',o.action_video_contor_60secs);
          if(inter_60_secs_contor==0 && o.action_video_contor_60secs){
            inter_60_secs_contor = setInterval(count_60secs, 30000);
          }




        }


        function count_60secs(){

          // console.log('count it',o.action_video_contor_60secs,cthis.hasClass('is-playing'));
          if(o.action_video_contor_60secs && cthis.hasClass('is-playing')){


            o.action_video_contor_60secs(cthis,'');
          }
        }

        function generateFakeArray() {

          //console.log('generateFakeArray()');
          var maxlen = 256;

          var arr = [];

          for (var it1 = 0; it1 < maxlen; it1++) {
            arr[it1] = Math.random() * 100;

          }

          return arr;
        }


        function isInt(n) {
          return typeof n == 'number' && Math.round(n) % 1 == 0;
        }

        function isValid(n) {
          return typeof n != 'undefined' && n != '';
        }

        function handle_mouse(e) {
          var _t = $(this);

          // console.log('handle_mouse() _t - ',_t);

          if (e.type == 'click') {
            if (_t.hasClass('wave-download')) {
              ajax_submit_download();
            }
            if (_t.hasClass('prev-btn')) {
              click_prev_btn();
            }
            if (_t.hasClass('next-btn')) {
              click_next_btn();
            }
            if (_t.hasClass('tooltip-indicator--btn-footer-playlist')) {

              _t.parent().find('.dzstooltip').toggleClass('active');
            }
            if (_t.hasClass('playlist-menu-item')) {


              var ind = _t.parent().children().index(_t);


              console.log('ind - ',ind);

              playlist_goto_item(ind,{
                'call_from':'handle_mouse'
              })


            }
            if (_t.hasClass('zoomsounds-btn-go-beginning')) {

              var _target = cthis;
              if(o.fakeplayer){
                _target = o.fakeplayer;
              }

              _target.get(0).api_seek_to_0();
            }
            if (_t.hasClass('zoomsounds-btn-step-backward')) {

              var _target = cthis;
              if(o.fakeplayer){
                _target = o.fakeplayer;
              }

              _target.get(0).api_step_back();
            }
            if (_t.hasClass('zoomsounds-btn-step-forward')) {

              var _target = cthis;
              if(o.fakeplayer){
                _target = o.fakeplayer;
              }

              _target.get(0).api_step_forward();
            }
            if (_t.hasClass('zoomsounds-btn-slow-playback')) {
              var _target = cthis;
              if(o.fakeplayer){
                _target = o.fakeplayer;
              }

              _target.get(0).api_playback_slow();
            }
            if (_t.hasClass('zoomsounds-btn-reset')) {
              var _target = cthis;
              if(o.fakeplayer){
                _target = o.fakeplayer;
              }

              _target.get(0).api_playback_reset();
            }
            if (_t.hasClass('btn-zoomsounds-download')) {
              ajax_submit_download();
            }
            if (_t.hasClass('dzsap-repeat-button')) {

              // console.log("REPEAT");
              if(player_playing){
              }
              seek_to(0, {
                call_from:"repeat"
              });
            }
            if (_t.hasClass('dzsap-loop-button')) {

              if(_t.hasClass('active')){
                _t.removeClass('active');
                loop_active = false;
              }else{

                _t.addClass('active');
                loop_active = true;

              }
              console.log('loop_active - ',loop_active, cthis);


            }
          }
          if (e.type == 'mousedown') {

            console.log('ceva');

            var _con = _t.parent();

            _con.parent().append(_con.clone().addClass('cloner'));
            var _clone = _con.parent().children('.cloner').eq(0);

            dzsap_playlist_con = _con.parent();
            dzsap_moving_playlist_item = true;

            dzsap_playlist_item_target = _con;
            dzsap_playlist_item_moving = _clone;
            _con.addClass('target-playlist-item');






          }
          if (e.type == 'mouseover') {
          }
          if (e.type == 'mouseenter') {
            // console.log('mouseenter');

            if(o.preview_on_hover=='on'){
              seek_to_perc(0);

              play_media({
                'call_from':'preview_on_hover'
              });
              console.log('mouseover');
            }

            window.dzsap_mouseover = true;
          }
          if (e.type == 'mouseleave') {
            // console.log('mouseleave');


            if(o.preview_on_hover=='on'){
              seek_to_perc(0);

              pause_media();
            }
            window.dzsap_mouseover = false;
          }
        }

        function mouse_starrating(e) {
          var _t = $(this);

          // console.log('mouse_starrating ' , e.type, _t);


          if (cthis.has(_t).length == 0) {
            return;
          }

          if (e.type == 'mouseleave') {


            var auxnr = Number(cthis.find('.star-rating-con').eq(0).attr('data-initial-rating-index'))*100;


            // console.warn('starrating_alreadyrated - ',starrating_alreadyrated);
            if (starrating_alreadyrated > -1 && starrating_alreadyrated>0) {
              auxnr = starrating_alreadyrated*100/5;
            }

            cthis.find('.rating-prog').css({
              'width': auxnr + '%'
            })


          }
          if (e.type == 'mousemove') {
            //console.log(_t);
            var mx = e.pageX - _t.offset().left;
            var my = e.pageX - _t.offset().left;

            // console.log('Math.round(mx/ (_t.outerWidth()/5)) - ' , Math.round(mx/ (_t.outerWidth()/5)) );
            // console.log('starrating_alreadyrated - ' , starrating_alreadyrated );


            starrating_index = Math.round(mx/ (_t.outerWidth()/5));




            if (starrating_index > 4) {
              starrating_index = 5;
            } else {
              starrating_index = Math.round(starrating_index);
            }

            if(starrating_index<1){
              starrating_index=1;
            }

            //                    console.log(starrating_index, cthis.find('.star-rating-prog-clip'));

            // console.log('starrating_index - ',starrating_index);
            // console.log('(starrating_index/5 * 100) - ',(starrating_index/5 * 100));
            cthis.find('.rating-prog').css({
              'width': (starrating_index/5 * 100) + '%'
            })

            starrating_alreadyrated = -1;



            cthis.find('.star-rating-set-clip').css({
              'opacity': 0
            })
          }
          if (e.type == 'click') {


            if (starrating_alreadyrated > -1 && starrating_alreadyrated > 0) {
              return;
            }

            ajax_submit_rating(starrating_index);
          }


        }



        function drawSpectrum(argarray) {
          //console.log(array);
          //console.log()
          //console.log($('.scrub-bg-canvas').eq(0).get(0).width, canw);

          //console.log(_scrubBgCanvas.get(0).width, _scrubBgCanvas.width())


          // console.log(_scrubbarbg_canvas);
          if(_scrubbarbg_canvas){

            draw_canvas(_scrubbarbg_canvas.get(0), argarray, o.design_wave_color_bg,{call_from: 'draw_spectrum_pcm_bg'});
            // draw_canvas(_scrubbarprog_canvas.get(0), argarray, o.design_wave_color_progress);
          }

          return false;



        };




        // log if an error occurs
        function onError(e) {
          console.log(e);
        }

        function draw_curr_time(){

          // -- draw current time -- called onEnterFrame when playing
          // console.log('draw_curr_time() -7');


          if (o.design_skin == 'skin-wave') {
            if (o.skinwave_enableSpectrum == 'on') {

              // -- spectrum ON


              //console.log(_scrubBgCanvas.width());



              if (debug_var) {

                // console.groupCollapsed("debug analyzer data");
                // console.log(lastarray);
                // console.log(last_lastarray);
                // console.groupEnd();

                // if(lastarray){
                //     for(var i3=0;i3<lastarray.length;i3++){
                //         var change_vy = array[i3] - lastarray[i3];
                //         array[i3] = Math.easeOutQuad(1, lastarray[i], change_vy,20);
                //     }
                // }

                //debug_var = false;
              }

              // -- easing


              if(player_playing){

              }else{
                // requestAnimFrame(check_time);
                return false;
              }


              /*
                         ctx.imageSmoothingEnabled = false;
                         ctx.imageSmoothing = false;
                         ctx.imageSmoothingQuality = "high";
                         ctx.webkitImageSmoothing = false;
                         */

              var meterNum = canw / (10 + 2); //count of the meters


              //console.log(_scrubBgCanvas);
              if(_scrubBgCanvas){

                canw = _scrubBgCanvas.width();
                canh = _scrubBgCanvas.height();

                _scrubBgCanvas.get(0).width = canw;
                _scrubBgCanvas.get(0).height = canh;
              }



              var drawMeter = function() {
                //var array = new Uint8Array(analyser.frequencyBinCount);
                //analyser.getByteFrequencyData(array);

                //console.log(o.type);

                if(o.type=='soundcloud' || sw_spectrum_fakeit=='on'){

                  lastarray = generateFakeArray();

                }else{

                  lastarray = new Uint8Array(analyser.frequencyBinCount);
                  analyser.getByteFrequencyData(lastarray);
                }


                //console.log(analyser, analyser.getByteFrequencyData(array), new Uint8Array(analyser.frequencyBinCount));
                //console.log(array);

                if(debug_var){

                  // console.log(analyser.frequencyBinCount);
                  // console.log('sw_spectrum_fakeit - ',sw_spectrum_fakeit);
                  // console.log(lastarray);


                  // -- try to find out if all these are 0
                  if(lastarray[0]==0 && lastarray[Math.round(lastarray.length/4)]==0 && lastarray[Math.round(lastarray.length/2)]==0 && lastarray[Math.round(lastarray.length/3/4)]==0){

                    if(sw_spectrum_fakeit=='auto'){

                      sw_spectrum_fakeit = 'on';
                      sw_spectrum_fakeit_decided = 'lastarray0';
                    }
                  }else{

                    if(sw_spectrum_fakeit=='auto' || sw_spectrum_fakeit_decided=='lastarray0') {
                      sw_spectrum_fakeit = 'off';
                    }
                  }
                  debug_var = false;
                }


                if(lastarray && lastarray.length){




                  //fix when some sounds end the value still not back to zero
                  var len = lastarray.length;
                  for (var i = len - 1; i >= 0; i--) {
                    //lastarray[i] = 0;

                    if(i<len/2){

                      lastarray[i] = lastarray[i]/255 * canh;
                    }else{

                      lastarray[i] = lastarray[len - i]/255 * canh;
                    }
                  };



                  if(last_lastarray){
                    for(var i3=0;i3<last_lastarray.length;i3++){
                      begin_viy = last_lastarray[i3]; // -- last value
                      change_viy = lastarray[i3] - begin_viy; // -- target value - last value
                      duration_viy = 3;
                      lastarray[i3] = Math.easeIn(1, begin_viy, change_viy,duration_viy);
                    }
                  }
                  // -- easing END


                  // last_lastarray = [];
                  // last_lastarray = last_lastarray.concat(lastarray);




                  //allCapsReachBottom = true;
                  //for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                  //    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                  //};
                  //
                  //
                  //console.log('allCapsReachBottom - ',allCapsReachBottom);
                  //
                  //if (allCapsReachBottom) {
                  //    cancelAnimationFrame(animationId); //since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                  //    return;
                  //};

                  //console.log(gradient);


                  var step = Math.round(lastarray.length / meterNum); //sample limited data from the total array





                  draw_canvas(_scrubBgCanvas.get(0),lastarray , ''+o.design_wave_color_bg,{
                    'call_from':'spectrum'


                  })



                  if(lastarray){

                    last_lastarray = lastarray.slice();
                  }


                }

              }

              drawMeter();



              // -- end spectrum
            }

            // console.log('_currTime - ',_currTime, o.skinwave_timer_static);

            if (_currTime && _currTime.length) {
              //                        console.log(_currTime, time_curr, time_total, formatTime(time_curr))

              if (o.skinwave_timer_static != 'on') {

                if(spos<0){
                  spos = 0;
                }
                spos = parseInt(spos,10);


                if(spos<2 && cthis.data('promise-to-play-footer-player-from')){
                  // console.error("WE RETURN IT")
                  return false;
                }

                // -- move currTime
                _currTime.css({
                  'left': spos
                });

                // console.log('spos - ',spos);
                // console.log('sw - ',sw);
                if (spos > sw - currTime_outerWidth) {
                  //console.log(sw, currTime_outerWidth);
                  _currTime.css({
                    'left': sw - currTime_outerWidth
                  })
                }
                if (spos > sw - 30 && sw ) {
                  _totalTime.css({
                    'opacity': 1 - (((spos - (sw - 30)) / 30))
                  });
                } else {
                  if (_totalTime.css('opacity') != '1') {
                    _totalTime.css({
                      'opacity': ''
                    });
                  }
                };
              };
            }
          }




          // console.log('sample_time_total - ',sample_time_total,'time_curr - ',time_curr);
          // console.log('sample_time_total - ',sample_time_total,'time_total - ',time_total);


          if (_currTime) {
            //console.log(_currTime, time_curr, formatTime(time_curr))
            //console.log("CEVA");


            // if(debug_var2){
            //
            //     console.warn('time_curr_for_visual - ',time_curr_for_visual, cthis);
            //     console.warn('time_total_for_visual - ',time_total_for_visual);
            //     debug_var2 = false;
            // }



            if(scrub_showing_scrub_time==false){

              _currTime.html(formatTime(time_curr_for_visual));
            }

            // console.error("time_total_for_visual - ",time_total_for_visual)
            // console.error("last_time_total - ",last_time_total, time_total_for_visual)
            // console.error("o.action_received_time_total - ",o.action_received_time_total, cthis)
            if(time_total_for_visual && time_total_for_visual>-1){
              cthis.addClass('time-total-visible');




              if(sent_received_time_total==false){

                if(o.action_received_time_total){
                  o.action_received_time_total(time_total_for_visual, cthis);
                }
                sent_received_time_total = true;
              }
            }
            if(time_total_for_visual != last_time_total){

              _totalTime.html(formatTime(time_total_for_visual));
              _totalTime.fadeIn('fast');
            }
          }

        }
        function draw_scrub_prog(){

          if(time_total==0){
            time_total = time_total_for_visual;
          }
          spos = (time_curr / time_total) * sw;

          // console.log('sw - ',sw);

          if(o.fakeplayer){

            if(time_curr_for_visual>0 && time_total_for_visual>0){

              spos = (time_curr_for_visual / time_total_for_visual) * sw;
            }

            if(debug_var){

              // console.log('time_curr - ',time_curr, cthis);
              // console.log('time_total - ',time_total);
              // console.log('time_curr_for_visual - ',time_curr_for_visual);
              // console.log('time_total_for_visual - ',time_total_for_visual);
              // console.log('sw - ',sw);
              // console.log('spos - ',spos);
              // console.warn('time_curr_for_visual o.fakeplayer', time_curr_for_visual, time_total_for_visual);
              // debug_var = false;
            }
          }
          if (isNaN(spos)) {
            spos = 0;
          }
          if (spos > sw) {
            spos = sw;
          }

          if(time_curr==-1){
            spos = 0;
          }

          if(time_total==0 || time_total=='-1' || isNaN(time_total)){
            // spos = 0;
          }


          // console.log('time_curr - ',time_curr, cthis);
          // console.log('time_total - ',time_total);
          // console.log('time_curr_for_visual - ',time_curr_for_visual);
          // console.log('time_total_for_visual - ',time_total_for_visual);
          // console.log('sw - ',sw);
          // console.log('spos - ',spos);

          // if(debug_var2){
          //     console.log('spos - ',spos,'time_total - ',time_total,cthis,'audioCtx_buffer - ',audioCtx_buffer,'_scrubbar - ', _scrubbar, '_scrubbar.children(\'.scrub-prog\') - > ',_scrubbar.children('.scrub-prog'));
          //     // debug_var2 = false;
          // }




          // console.warn('spos -3 ',spos, 'promise-to-play-footer-player-from -',cthis.data('promise-to-play-footer-player-from'), "||", cthis);

          if(spos<2 && cthis.data('promise-to-play-footer-player-from')){
            // console.error("WE RETURN IT")
            return false;
          }

          // console.warn('draw_scrub_prog', 'time_curr - ',time_curr, 'time_total  - ','sw - ',sw);
          if (audioCtx_buffer == null) {
            if(__scrubbProg){

              // console.log('spos - ' ,spos, _scrubbar.width(), _scrubbar.children('.scrub-prog'));

              // _scrubbar.children('.scrub-prog').css({
              //     'width': spos+'px'
              // })

              // console.log('spos ( normal mode )  - ',spos);
              __scrubbProg.style.width = parseInt(spos,10)+'px';
            }


            // if(debug_var2){
            //     console.warn('_scrubbar.children(\'.scrub-prog\') - ',_scrubbar.children('.scrub-prog').width());
            //     console.warn(' spos+\'px\' - ',spos+'px');
            //     debug_var2 = false;
            // }

          }
        }

        function click_prev_btn() {


          console.log('click_prev_btn()')
          if (o.parentgallery && (o.parentgallery.get(0)) ) {
            o.parentgallery.get(0).api_goto_prev();
          }else{

            sync_players_goto_prev();
          }
        }

        function click_next_btn() {
          // console.log('click_next_btn()', dzsap_list, dzsap_list_for_sync_players);
          if (o.parentgallery && (o.parentgallery.get(0))) {
            o.parentgallery.get(0).api_goto_next();
          }else{

            sync_players_goto_next();
          }
        }

        function get_times(pargs){



          var margs = {
            'call_from': 'default'
          }

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.log('get_times () margs - ',margs,'type - ',type,o.type);
          // -- trying to get current time
          if ( (type == 'audio' || ( type=='fake' && o.fakeplayer)) ) {
            if (o.type != 'shoutcast') {

              // console.log('check - (audioCtx_buffer && audioCtx_buffer != \'placeholder\' && audioCtx_buffer != \'waiting\') -> ',(audioCtx_buffer && audioCtx_buffer != 'placeholder' && audioCtx_buffer != 'waiting'),audioCtx_buffer);

              // -- get real for spectrum
              if (audioCtx_buffer && audioCtx_buffer != 'placeholder' && audioCtx_buffer != 'waiting') {
                //                                console.log(time_curr);

                time_total_for_real = audioCtx_buffer.duration;

                // console.log('time_total_for_real - ',time_total_for_real);

                if(o.fakeplayer==null){

                  time_curr_for_real = audioCtx.currentTime;
                }
                //                                console.log(audioCtx_buffer, audioCtx_buffer.currentTime, audioCtx_buffer.duration);

              }else{

                // -- normal
                if (_cmedia) {
                  time_total_for_real = _cmedia.duration;

                  if(_cmedia.duration){
                    // cthis.addClass('meta-loaded');
                  }


                  if(o.fakeplayer==null) {
                    time_curr_for_real = _cmedia.currentTime;
                  }


                  if (inter_audiobuffer_workaround_id == 0) {



                  }

                  // if(debug_var){
                  //     console.log("time_curr - ",time_curr, cthis.attr('id'));
                  //     console.error("real_time_curr - ",real_time_curr, cthis.attr('id'));
                  //
                  // }
                }

              }



              //                            console.log(time_curr, time_total, inter_audiobuffer_workaround_id);
              //                            console.log(audioBuffer, audioCtx, webaudiosource);

              if(debug_var){
                // console.log(audioBuffer);
                // console.log(audioCtx);
                // console.log(time_curr,time_total);
                // debug_var = false;
              }

              if(o.fakeplayer){

                time_curr = time_curr_for_visual;
              }

              if (audioCtx && is_firefox()) {
                //                                time_curr = audioCtx.currentTime;
              }
              if (playfrom == 'last' && playfrom_ready) {
                if (typeof Storage != 'undefined') {
                  localStorage['dzsap_' + the_player_id + '_lastpos'] = time_curr;
                  //                                    console.log(localStorage['dzsap_'+the_player_id+'_lastpos']);
                }
              }


            }


          }

          // console.log('time_total_for_real -5 ',time_total_for_real);
        }



        function sanitize_from_point_time(arg) {
          //formats the time


          var fint = '';


          arg = String(arg).replace('%3A',':');
          arg = String(arg).replace('#','');

          if(arg && String(arg).indexOf(':')>-1){

            var arr = /(\d.*):(\d.*)/g.exec(arg);

            // console.log('result arr -  ',arr);

            var m = parseInt(arr[1],10);
            var s = parseInt(arr[2],10);


            return (m*60) + s;
          }else{
            return Number(arg);
          }
        }


        function format_to_point_time(arg) {
          //formats the time
          var s = Math.round(arg);
          var m = 0;
          if (s > 0) {
            while (s > 59) {
              m++;
              s -= 60;
            }
            return String((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
          } else {
            return "00:00";
          }
        }

        function check_time(pargs) {


          // -- enter frame
          // console.log('check_time()', cthis);

          var margs = {
            'fire_only_once': false
          }

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.log('check_time()');
          // console.log('check_time()', cthis);

          // if (cthis.attr('id') == 'apminimal') {

          //console.log(cthis,'check');
          // }
          if (destroyed) {
            console.warn("DESTROYED");
            return false;
          }

          // if (debug_var) {
          //     console.log('check_time()' , cthis);
          //     debug_var = false;
          // }


          // if(debug_var){
          //
          //     console.log("-- trying to show current time in feed fakeplayer ",_feed_fakePlayer)
          //     debug_var = false;
          //
          // }

          // console.log(sw_suspend_enter_frame);
          if (margs.fire_only_once==false && sw_suspend_enter_frame) {

            requestAnimFrame(check_time);
            // console.log("SUSPENDED ENTER FRAME HERE");
            return false;
          }
          // console.log("REACHED");

          time_total_for_real = -1;
          time_curr_for_real = -1;


          // -- trying to get current time
          if (type == 'youtube') {
            try {
              if (_cmedia && _cmedia.getDuration) {
                time_total_for_real = _cmedia.getDuration();
                if (o.fakeplayer==null) {
                  time_curr_for_real = _cmedia.getCurrentTime();
                }
              }


              if (playfrom == 'last' && playfrom_ready) {
                if (typeof Storage != 'undefined') {
                  localStorage['dzsap_' + the_player_id + '_lastpos'] = time_curr_for_real;
                }
              }
            } catch (err) {
              console.log('yt error - ', err);
            }
          }


          get_times({
            'call_from': 'checK_time'
          });



          // if(debug_var && o.fakeplayer){
          //     console.log('time_curr - ',time_curr);
          //     console.log('time_curr_for_visual - ',time_curr_for_visual);
          //     console.log('time_curr_for_real - ',time_curr_for_real);
          //     debug_var = false;
          // }
          // -- setting real times
          if(time_curr_for_real>-1){
            time_curr = time_curr_for_real;
            time_curr_for_visual = time_curr_for_real;
          }

          if(time_total_for_real>-1){
            time_total = time_total_for_real;
            time_total_for_visual = time_total_for_real;
          }

          // console.warn('time_total -6 ',time_total);



          if (o.design_skin == 'skin-wave') {
            if (o.skinwave_comments_displayontime == 'on') {

              var timer_curr_perc = Math.round((real_time_curr / real_time_total) * 100) / 100;

              if(type=='fake'){
                timer_curr_perc = Math.round((time_curr / time_total) * 100) / 100;
              }

              //                                    console.log(timer_curr_perc);

              if (_commentsHolder) {

                _commentsHolder.children().each(function() {
                  var _t = $(this);
                  if (_t.hasClass('dzstooltip-con')) {
                    var _t_posx = _t.offset().left - _commentsHolder.offset().left;

                    // console.log('_t.offset().left - ',_t.offset().left)
                    // console.log('_commentsHolder.offset().left - ',_commentsHolder.offset().left)

                    var aux = Math.round((parseFloat(_t_posx) / _commentsHolder.outerWidth()) * 100) / 100;


                    // console.log('parseFloat(_t.css(\'left\')) - ',_t_posx);
                    // console.log('_commentsHolder.outerWidth() - ',_commentsHolder.outerWidth());


                    // console.log('aux - ',aux);
                    // console.log('Math.abs(aux - timer_curr_perc) - ',Math.abs(aux - timer_curr_perc));
                    if(cthis.attr('id')=='track5'){
                      // console.log('hmm');
                      // console.log(parseFloat(_t.css('left')), aux, time_curr, timer_curr_perc, real_time_curr,Math.abs(aux - real_time_curr));
                    }



                    if (aux) {

                      if (Math.abs(aux - timer_curr_perc) < 0.02) {
                        _commentsHolder.find('.dzstooltip').removeClass('active');
                        _t.find('.dzstooltip').addClass('active');
                      } else {
                        _t.find('.dzstooltip').removeClass('active');
                      }
                    }
                  }
                })
              }
            }
          }




          //if(cthis.hasClass("skin-minimal")){ console.log(time_curr, time_total) };

          //                console.log(time_curr, time_total, sw);

          //console.log(time_curr,type);

          if(type=='audio'){

            // console.log('real_time_curr - ',real_time_curr);
          }




          // if(debug_var){
          //     console.error("time_curr - ",time_curr,  cthis.attr('id'));
          //     console.error("real_time_curr - ",real_time_curr, cthis.attr('id'));
          //     debug_var = false;
          // }


          if(pseudo_sample_time_start){

            if(time_curr_for_visual<pseudo_sample_time_start){
              time_curr_for_visual = pseudo_sample_time_start;
            }


            // console.error('time_curr - ',time_curr)
            // console.log('pseudo_sample_time_end - ',pseudo_sample_time_end)


            if(pseudo_sample_time_end){

              if(time_curr>pseudo_sample_time_end){

                var args = {
                  'call_from':'time_curr>pseudo_sample_time_end'
                }
                handle_end(args);

                ended = true;

                clearTimeout(inter_ended);
                inter_ended = setTimeout(function(){

                  ended = false;
                },1000);
              }
            }
          }


          if(o.fakeplayer==null){

            if(pseudo_sample_time_start==0){

              if (sample_time_start > 0) {
                time_curr_for_visual = sample_time_start + time_curr_for_real;

              }
            }
          }



          if (sample_time_total > 0) {

            // console.error('sample_time_total - ',sample_time_total);
            time_total_for_visual = sample_time_total;
          }
          // console.log('sample_time_total - ',sample_time_total,'time_total - ',time_total);

          // if (cthis.hasClass('is-playing')) {

          //console.log(sw);
          // }
          //--- incase of new skin - watch sw it will be 0


          //console.log(time_curr, time_total, sw);

          //console.log(_scrubbar, _scrubbar.children('.scrub-prog'), spos, time_total, '-timecurr ', time_curr, sw);


          //                console.log(audioBuffer);


          // if(debug_var && o.fakeplayer){
          //     console.log('time_curr before draw_scrub_prog - ',time_curr);
          //     console.log('time_curr_for_visual - ',time_curr_for_visual);
          //     console.log('time_curr_for_real - ',time_curr_for_real);
          //     debug_var = false;
          // }



          // if(o.fakeplayer==null){
          //
          // }
          draw_scrub_prog();

          if (debug_var) {

            //console.log(cthis, _feed_fakePlayer, time_curr/time_total);
            //debug_var = false;
          }


          //console.log(cthis, _feed_fakePlayer);

          if (_feed_fakePlayer) {
            //console.log(cthis, _feed_fakePlayer);

            if(_feed_fakePlayer.get(0)){
              if(_feed_fakePlayer.get(0).api_get_time_curr){
                // console.warn('getting time total', _feed_fakePlayer.get(0).api_get_time_total());
                if(isNaN(_feed_fakePlayer.get(0).api_get_time_total()) || _feed_fakePlayer.get(0).api_get_time_total()=='' || _feed_fakePlayer.get(0).api_get_time_total()<1){
                  // console.warn('setting time total');

                  // console.log("SET TIME CUR - ",time_curr);
                  // console.error('SET time_total - ',time_total_for_visual);
                  _feed_fakePlayer.get(0).api_set_time_total(time_total_for_visual);
                }

                // if(debug_var){
                //     console.error("SETTING TIME CURR",time_curr, _feed_fakePlayer);
                //      debug_var = false;
                // }

                _feed_fakePlayer.get(0).api_set_time_curr(time_curr);
              }
            }





            // if(debug_var){
            //
            //     console.log("-- trying to show current time in feed fakeplayer ",_feed_fakePlayer)
            //     debug_var = false;
            //
            // }

            if(_feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_seek_to_visual){

              var temp_time_curr = time_curr;

              // TODO: to be continued

              if(pseudo_sample_time_start==0){

                if(sample_time_start){
                  temp_time_curr-=sample_time_start;
                }
              }

              // if(debug_var){
              //
              //     console.log("-- trying to show current time in feed fakeplayer ",temp_time_curr / time_total, temp_time_curr,time_total, _feed_fakePlayer)
              //     debug_var = false;
              //
              // }


              _feed_fakePlayer.get(0).api_seek_to_visual(temp_time_curr / time_total);
            }else{
              console.log('warning .. no seek to visual');
            }

          }


          // if(debug_var){
          //     console.log('cthis.hasClass(\'skin-minimal\') - ',cthis.hasClass('skin-minimal'), cthis,player_playing,first_drawn_canvas);
          //
          //     debug_var = false;
          // }



          // -- skin minimal
          if (o.design_skin=='skin-minimal' ) {



            // if(debug_var){
            //     console.log('player_playing - ',player_playing);
            //     console.log('dzsap_can_canvas - ',dzsap_can_canvas);
            //     console.log('skin_minimal_canvasplay - ',skin_minimal_canvasplay);
            //
            //     debug_var = false;
            // }

            if (!dzsap_can_canvas) {
              _conPlayPause.addClass('canvas-fallback');
            } else {


              if(player_playing || first_drawn_canvas == false){

                if(skin_minimal_canvasplay){

                  var ctx_minimal = skin_minimal_canvasplay.getContext('2d');
                  //console.log(ctx);


                  var ctx_w = skin_minimal_canvasplay.width;
                  var ctx_h = skin_minimal_canvasplay.height;

                  // console.log(ctx_w);
                  var pw = ctx_w / 100;
                  var ph = ctx_h / 100;

                  // if(debug_var){
                  // console.log('time_curr_for_visual - ',time_curr_for_visual);
                  // console.log('o.fakeplayer - ',o.fakeplayer, cthis);

                  // debug_var = false;
                  // }
                  if(o.fakeplayer){


                    // spos = Math.PI * 2 * (time_curr_for_visual / time_total_for_visual);
                  }else{

                  }
                  spos = Math.PI * 2 * (time_curr / time_total);

                  if (isNaN(spos)) {
                    spos = 0;
                  }
                  if (spos > Math.PI * 2) {
                    spos = Math.PI * 2;
                  }

                  ctx_minimal.clearRect(0, 0, ctx_w, ctx_h);
                  //console.log(ctx_w, ctx_h);






                  var aux1 = parseInt(o.design_wave_color_progress, 16);


                  var color1 = aux1;
                  var color2 = aux1 + 12000;


                  // console.log(aux1,color1,color2, color1.toString(16), color2.toString(16));
                  //console.log(aux1.toString(16));









                  ctx_minimal.beginPath();
                  ctx_minimal.arc((50 * pw), (50 * ph), (40 * pw), 0, Math.PI * 2, false);
                  ctx_minimal.fillStyle = "rgba(0,0,0,0.1)";
                  ctx_minimal.fill();





                  // console.log(spos);
                  ctx_minimal.beginPath();
                  ctx_minimal.arc((50 * pw), (50 * ph), (34 * pw), 0, spos, false);
                  //ctx_minimal.fillStyle = "rgba(0,0,0,0.3)";
                  ctx_minimal.lineWidth = (10 * pw);
                  ctx_minimal.strokeStyle = 'rgba(0,0,0,0.3)';
                  ctx_minimal.stroke();







                  first_drawn_canvas = true;
                }


              }else{

                if (margs.fire_only_once != true) {
                  requestAnimFrame(check_time);

                }
                return false;
              }
            }
            //console.log('ceva');
          }


          //                console.log(o.design_skin);

          // -- enter_frame
          // console.log("REACHED2");
          draw_curr_time();

          //                console.log(time_curr, time_total);
          if (time_total > 1 && time_curr >= time_total - 0.07) {
            var args = {
              'call_from':'time_total > 0 && time_curr >= time_total - 0.07 ... '
            }

            // if(debug_var2){
            //
            //     console.warn('time_curr - ',time_curr, cthis);
            //     console.warn('time_total - ',time_total);
            //     debug_var2 = false;
            // }


            if(o.fakeplayer){

            }else{

              handle_end(args);

              ended = true;


              clearTimeout(inter_ended);
              inter_ended = setTimeout(function(){

                ended = false;
              },1000);
            }
          }



          // -- debug check_time
          // inter_check = setTimeout(check_time, 2000);
          if (margs.fire_only_once != true) {
            requestAnimFrame(check_time);

          }




          last_time_total = time_total_for_visual;


          if(audioCtx){

            if (_totalTime) {

              // console.error("ENTER HERE 9057");
              _totalTime.html(formatTime(time_total_for_visual));
            }
          }

        }

        function click_playpause(e) {
          //console.log('click_playpause', 'player_playing - ',player_playing);

          if(cthis.hasClass('prevent-bubble')){

            if (e && e.stopPropagation) {
              e.preventDefault();
              e.stopPropagation();
              ;
              // return false;
            }

          }

          var _t = $(this);

          var sw_cancel_toggle = false;
          //console.log(_t);

          // console.log('time_total_for_visual -7 ',time_total_for_visual);

          if(cthis.hasClass('listeners-setuped')){

          }else{

            $(_cmedia).attr('preload','auto');

            setup_listeners();
            init_loaded();

            console.log('time_total_for_visual - ',time_total_for_visual);

            var it3 = setInterval(function(){

              // console.log(_cmedia, _cmedia.duration);
              if(_cmedia && _cmedia.duration && isNaN(_cmedia.duration) == false){

                real_time_total = _cmedia.duration;
                time_total = real_time_total;


                cthis.addClass('meta-loaded');
                if (_totalTime){
                  // console.error("ENTER HERE 9057");
                  _totalTime.html(formatTime(time_total_for_visual));
                }

                clearInterval(it3);
              }
            },1000);
          }



          if (o.design_skin == 'skin-minimal') {

            var center_x = _t.offset().left + skin_minimal_button_size/2;
            var center_y = _t.offset().top + skin_minimal_button_size/2;
            var mouse_x = e.pageX;
            var mouse_y = e.pageY;
            var pzero_x = center_x + skin_minimal_button_size/2;
            var pzero_y = center_y;

            //var angle = Math.acos(mouse_x - center_x);

            //console.log(pzero_x, pzero_y, mouse_x, mouse_y, center_x, center_y, mouse_x - center_x, angle);

            //A = center, B = mousex, C=pointzero

            var AB = Math.sqrt(Math.pow((mouse_x - center_x), 2) + Math.pow((mouse_y - center_y), 2));
            var AC = Math.sqrt(Math.pow((pzero_x - center_x), 2) + Math.pow((pzero_y - center_y), 2));
            var BC = Math.sqrt(Math.pow((pzero_x - mouse_x), 2) + Math.pow((pzero_y - mouse_y), 2));


            var angle = Math.acos((AB + AC + BC) / (2 * AC * AB));
            var angle2 = Math.acos((mouse_x - center_x) / (skin_minimal_button_size/2));

            //console.log(AB, AC, BC, angle, (mouse_x - center_x), angle2, Math.PI);

            var perc = -(mouse_x - center_x - (skin_minimal_button_size/2)) * 0.005; //angle2 / Math.PI / 2;


            if (mouse_y < center_y) {
              perc = 0.5 + (0.5 - perc)
            }

            // console.log('perc - ',perc);
            // console.log('mouse_x - ',mouse_x);
            // console.log('center_x - ',center_x);
            // console.log('pzero_x - ',pzero_x);
            // console.log('pzero_x - skin_minimal_button_size + 10 - ',pzero_x - skin_minimal_button_size + 20);
            // console.log('mouse_y - ',mouse_y);
            // console.log('pzero_y - ',pzero_y);
            // console.log('center_y - ',center_y);
            //
            // console.log('pzero_y - skin_minimal_button_size + 20 - ',pzero_y - skin_minimal_button_size + 20);

            // console.log('mouse_x - ',mouse_x);
            // console.log('center_x - ',center_x);
            // console.log('mouse_y - ',mouse_y);
            // console.log('center_y - ',center_y);
            // console.log('Math.abs(mouse_x - center_x) - ',Math.abs(mouse_x - center_x));
            // console.log('Math.abs(mouse_y - center_y) - ',Math.abs(mouse_y - center_y));

            if( Math.abs(mouse_y - center_y)>20 || Math.abs(mouse_x - center_x)>20){


              // console.log('perc - ',perc);
              seek_to_perc(perc,{
                call_from: "skin_minimal_scrub"
              })
              sw_cancel_toggle = true;

              check_time({
                'fire_only_once': true
              });
            }


          }



          //unghi = acos (x - centruX) = asin(centruY - y)



          if(sw_cancel_toggle==false){

            //console.log("PLAYER_PLAYING -> ",player_playing);
            if (player_playing == false) {
              play_media({
                'call_from':'click_playpause'
              });
            } else {
              pause_media();
            }
          }


          return false;
        }


        function sync_players_goto_prev(){
          // console.log('sync_players_goto_prev ', dzsap_list_for_sync_players);


          if(o.fakeplayer){
            o.fakeplayer.get(0).api_sync_players_goto_prev();

            return false;
          }


          if(_playlistTooltip && _playlistTooltip.children('.dzstooltip--inner').length){


            var tempNr = playlist_inner_currNr-1;

            if(tempNr>=0){

              playlist_goto_item(tempNr,{
                'call_from':'api_sync_players_prev'
              });
            }else{
            }


          }else{

            if (dzsap_list_for_sync_players.length > 0) {
              for (var i24 in dzsap_list_for_sync_players) {


                var _ctarget = cthis;

                if(_feed_fakePlayer){
                  _ctarget = _feed_fakePlayer;
                }


                if (dzsap_list_for_sync_players[i24].get(0) == _ctarget.get(0)) {
                  // console.log('THIS IS ',i24,dzsap_list_for_sync_players.length-1, dzsap_list_for_sync_players);

                  i24 = parseInt(i24, 10);
                  if (i24 > 0) {
                    var _c_ = dzsap_list_for_sync_players[i24 - 1].get(0);
                    // console.log('THIS IS _c ',_c);

                    // console.log(_c_, i24, dzsap_list_for_sync_players[i24+1]);
                    if (_c_ && _c_.api_play_media) {
                      setTimeout(function() {
                        _c_.api_play_media({
                          'call_from':'api_sync_players_prev'
                        });
                      }, 200);

                    }
                  }
                }
              }
            }
          }


        }


        function sync_players_goto_next(){


          // console.log('sync_players_goto_next() - ', cthis, 'o.fakeplayer - ',o.fakeplayer);


          if(o.fakeplayer){
            o.fakeplayer.get(0).api_sync_players_goto_next();

            return false;
          }

          if(_playlistTooltip && _playlistTooltip.find('.playlist-menu-item').length){


            var tempNr = playlist_inner_currNr+1;


            if(tempNr-1 > _playlistTooltip.find('.playlist-menu-item').length){

            }else{
              playlist_goto_item(tempNr,{
                'call_from':'api_sync_players_prev'
              });
            }


          }else{

            var _ctarget = null;

            // console.log('dzsap_list_for_sync_players -4 ',dzsap_list_for_sync_players);
            if (dzsap_list_for_sync_players.length > 0) {
              for (var i24 in dzsap_list_for_sync_players) {


                _ctarget = cthis;

                if(_feed_fakePlayer){
                  _ctarget = _feed_fakePlayer;
                }


                if (dzsap_list_for_sync_players[i24].get(0) == _ctarget.get(0)) {
                  // console.log('THIS IS ',i24,dzsap_list_for_sync_players.length-1, dzsap_list_for_sync_players);

                  i24 = parseInt(i24, 10);

                  var tempNr = i24 + 1;

                  if(tempNr>dzsap_list_for_sync_players.length - 1){

                    // tempNr = 0;
                  }



                  if(tempNr<dzsap_list_for_sync_players.length ) {
                    var _c_ = dzsap_list_for_sync_players[tempNr].get(0);

                    if (_c_) {

                      // console.log('THIS IS _c ',_c);

                      // console.log(_c_, i24, dzsap_list_for_sync_players[i24+1]);
                      if (_c_ && _c_.api_play_media) {
                        setTimeout(function () {
                          _c_.api_play_media({
                            'call_from': 'api_sync_players_prev'
                          });
                        }, 200);

                      }
                    }
                  }

                }
              }
            }
          }

        }

        function handle_end(pargs) {


          var margs = {
            'call_from':'default'
          }


          if(pargs){
            margs = $.extend(margs,pargs);
          }
          //console.log('end');
          if(ended){
            return false;
          }

          if(debug_var){
            // debug_var = false;
          }
          // console.log('handle_end -5', cthis, margs,   o.fakeplayer, 'action_audio_end - ',action_audio_end, 'time_total - ',time_total, cthis);


          // time_curr  = 0;
          ended = true;

          inter_ended = setTimeout(function(){

            ended = false;
          },1000);


          seek_to(0, {
            'call_from': 'handle_end'
          });
          if(debug_var){
            // console.log('handle_end after seek_to', cthis, margs,   o.fakeplayer, 'action_audio_end - ',action_audio_end, 'time_curr - ',time_curr, 'time_total - ',time_total);
            // debug_var = false;
          }



          if(o.fakeplayer && margs.call_from!='fake_player'){
            // -- lets leave fake player handle handle_end
            return false;
          }
          // console.log('loop_active ( fromdzspend) - ',loop_active, cthis);

          if (o.loop == 'on' || loop_active) {
            play_media({
              'call_from':'track_end'
            });
            return false;
          } else {
            pause_media();
          }

          if (o.parentgallery && typeof(o.parentgallery) != 'undefined') {
            //console.log(o.parentgallery);


            var args = {
              'call_from':'player_handle_end'
            }
            o.parentgallery.get(0).api_gallery_handle_end();
          }







          setTimeout(function() {


            if (cthis.hasClass('is-single-player')) {

              // -- called on handle end
              sync_players_goto_next();
            }

          }, 100);

          setTimeout(function() {


            //console.log('handle_end',_feed_fakePlayer)

            if(_feed_fakePlayer && (_feed_fakePlayer.hasClass('is-single-player') || _feed_fakePlayer.hasClass('feeded-whole-playlist'))){
              //action_audio_end(_feed_fakePlayer,args);
              _feed_fakePlayer.get(0).api_handle_end({
                'call_from':'fake_player'
              });
              return false;
              //args.child_player = _feed_fakePlayer;
            }

            if (action_audio_end) {


              var args = {};


              // console.log(cthis, _feed_fakePlayer)


              action_audio_end(cthis,args);
            }
          }, 200);

        }


        function sanitize_to_css_size(arg){


          arg = String(arg);
          if(arg.indexOf('px')==-1 && arg.indexOf('%')==-1){

            arg+='px';
          }

          return arg;
        }
        function handleResize(e, pargs) {



          var margs = {

            'call_from' : 'default'
          }

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          if(cthis){

          }



          //cthis.attr('data-pcm')
          ww = $(window).width();
          tw = cthis.width();
          th = cthis.height();


          if (_scrubBgCanvas && typeof(_scrubBgCanvas.width)=='function') {
            canw = _scrubBgCanvas.width();
            canh = _scrubBgCanvas.height();

          }

          // console.log('handleResize', _commentsHolder)

          if (tw <= 720) {
            cthis.addClass('under-720');
          } else {

            cthis.removeClass('under-720');
          }
          if (tw <= 500) {
            cthis.addClass('under-500');
          } else {

            cthis.removeClass('under-500');
          }


          sw = tw;
          if (o.design_skin == 'skin-default') {
            sw = tw;
          }
          if (o.design_skin == 'skin-pro') {
            sw = tw;
          }
          if (o.design_skin == 'skin-silver' || o.design_skin == 'skin-aria') {
            sw = tw;

            sw = _scrubbar.width();
            //console.log(sw);





          }


          if (o.design_skin == 'skin-justthumbandbutton') {
            tw = cthis.children('.audioplayer-inner').outerWidth();
            sw = tw;
          }
          if (o.design_skin == 'skin-redlights' || o.design_skin == 'skin-steel') {
            sw = _scrubbar.width();
          }


          //console.log(sw);




          if (o.design_skin == 'skin-wave') {
            sw = _scrubbar.outerWidth(false);
            // console.log('scrubbar width - ', sw, _scrubbar);

            scrubbar_h = _scrubbar.outerHeight(false);

            if (_commentsHolder) {

              // var aux = _scrubbar.offset().left - cthis.offset().left;
              var aux = 0;


              if(_scrubbar && cthis && _scrubbar.offset()){
                aux = _scrubbar.offset().left - cthis.offset().left;
              }else{
                console.log('no scrubbar or cthis',_scrubbar, cthis);
              }

              //console.log(aux);

              // console.log('aux - ',aux);

              _commentsHolder.css({
                'width': sw
                //,'left': aux + 'px'
              })


              if(cthis.hasClass('skin-wave-mode-small')){

                _commentsHolder.css({
                  'left': aux + 'px'
                })
              }
              //return;
              _commentsHolder.addClass('active');

              //                        _commentsHolder.find('.a-comment').each(function(){
              //                            var _t = $(this);
              //
              //
              ////                            console.log(_t, _t.offset(), _t.find('.dzstooltip').eq(0).width(), _t.offset().left + _t.find('.dzstooltip').eq(0).width(), _t.offset().left + _t.find('.dzstooltip').eq(0).width() > ww - 50)
              //                            if(_t.offset().left + _t.find('.dzstooltip').eq(0).width() > ww - 50){
              //                                _t.find('.dzstooltip').eq(0).addClass('align-right');
              //                            }else{
              //
              //                                _t.find('.dzstooltip').eq(0).removeClass('align-right');
              //                            }
              //                        })
            }

            if (cthis.hasClass('fullflashbackup')) {
              if (_commentsHolder) {
                _commentsHolder.css({
                  'width': tw - 212,
                  'left': 212
                })
                if (tw <= 480) {
                  _commentsHolder.css({
                    'width': tw - 112,
                    'left': 112
                  })
                }
                _commentsHolder.addClass('active');
              }

            }
          }

          //console.log(o.design_skin, tw, sw);


          if (res_thumbh == true) {

            //                    console.log(cthis.get(0).style.height);


            if (o.design_skin == 'skin-default') {


              if (cthis.get(0) != undefined) {
                // if the height is auto then
                if (cthis.get(0).style.height == 'auto') {
                  cthis.height(200);
                }
              }

              var cthis_height = _audioplayerInner.height();
              if (typeof cthis.attr('data-initheight') == 'undefined' && cthis.attr('data-initheight') != '') {
                cthis.attr('data-initheight', _audioplayerInner.height());
              } else {
                cthis_height = Number(cthis.attr('data-initheight'));
              }

              // console.log('cthis_height - ', cthis_height, cthis.attr('data-initheight'));

              if (o.design_thumbh == 'default') {

                design_thumbh = cthis_height - 44;
              }

            }

            _audioplayerInner.find('.the-thumb').eq(0).css({
              // 'height': design_thumbh
            })
          }


          //===display none + overflow hidden hack does not work .. yeah
          //console.log(cthis, _scrubbar.children('.scrub-bg').width());

          if (cthis.css('display') != 'none') {
            _scrubbar.find('.scrub-bg-img').eq(0).css({
              // 'width' : _scrubbar.children('.scrub-bg').width()
            });
            _scrubbar.find('.scrub-prog-img').eq(0).css({
              'width': _scrubbar.children('.scrub-bg').width()
            });
            _scrubbar.find('.scrub-prog-canvas').eq(0).css({
              'width': _scrubbar.children('.scrub-bg').width()
            });
            _scrubbar.find('.scrub-prog-img-reflect').eq(0).css({
              'width': _scrubbar.children('.scrub-bg').width()
            });
            _scrubbar.find('.scrub-prog-canvas-reflect').eq(0).css({
              'width': _scrubbar.children('.scrub-bg').width()
            });
          }



          // console.log('is_under_400 - ',is_under_400);
          // console.log('tw - ',tw);
          cthis.removeClass('under-240 under-400');
          if (tw <= 240) {
            cthis.addClass('under-240');
          }
          if (tw <= 500) {
            cthis.addClass('under-400');

            if(is_under_400==false){
              is_under_400 = true;
              reconstruct_player();
            }
            if (_controlsVolume) {
            }

          } else {


            if(is_under_400==true){
              is_under_400 = false;
              reconstruct_player();
            }
          }





          //console.log(_conPlayPause.outerWidth(), o.design_skin);

          var aux2 = 50;

          // ---skin-wave
          if (o.design_skin == 'skin-wave') {
            //console.log((o.design_thumbw + 20));
            controls_left_pos = 0;
            if (cthis.find('.the-thumb').length > 0) {
              controls_left_pos += cthis.find('.the-thumb').width() + 20;
            }

            controls_left_pos += 70;

            var sh = _scrubbar.eq(0).height();





            if (skinwave_mode == 'small') {
              controls_left_pos -= 80;
              sh = 5;

              controls_left_pos += 13;
              _conPlayPause.css({
                //'left' : controls_left_pos
              })

              controls_left_pos += _conPlayPause.outerWidth() + 10;




            }





            // -- adding the prev and next buttons
            if (o.parentgallery && typeof(o.parentgallery) != 'undefined' && o.disable_player_navigation != 'on') {




            }


            if (_metaArtistCon && _metaArtistCon.css('display') != 'none') {


              if (!(o.design_skin == 'skin-wave' && skinwave_mode == 'small')) {
                _metaArtistCon.css({
                  //'left': controls_left_pos
                });

                if (o.design_skin == 'skin-wave' && skinwave_mode != 'small') {
                  _metaArtistCon.css({
                    //'width': tw - controls_left_pos - _apControlsRight.outerWidth()
                  });
                }
              }

              controls_left_pos += _metaArtistCon.outerWidth();

              //console.log(_metaArtistCon, _metaArtistCon.outerWidth());
            }





            controls_right_pos = 0;

            if (_controlsVolume && _controlsVolume.css('display') != 'none') {
              controls_right_pos += 55;
            }





            // ---------- calculate dims small
            if (skinwave_mode == 'small') {

              _scrubbar.css({
                //'left' : controls_left_pos
              })


              //sw =  ( tw - controls_left_pos - controls_right_pos );





              sw = _scrubbar.width();

              //console.log(sw,controls_left_pos,controls_right_pos);





              _scrubbar.find('.scrub-bg--img').eq(0).css({
                'width': sw
              })
              _scrubbar.find('.scrub-prog--img').eq(0).css({
                'width': sw
              })
              //cthis.find('.comments-holder').eq(0).css({
              //    'width' :  _scrubbar.width()
              //    ,'left' : controls_left_pos
              //});



            }



            if (o.skinwave_wave_mode == 'canvas') {

              if (cthis.attr('data-pcm')) {

                // console.log("WILL CALL draw_canvas_inter_func", cthis, data_source);



                if (_scrubbarbg_canvas.width() == 100) {
                  _scrubbarbg_canvas.width(_scrubbar.width());
                }

                if(_scrubbarbg_canvas && _theThumbCon && _apControls.parent(), _scrubbar){

                  // console.log("HMM PCM DRAW", _scrubbarbg_canvas, _scrubbarbg_canvas.width(), _scrubbar.width(), _apControls.width(), _apControls.parent().width(), tw, _theThumbCon.width());
                }


                if(data_source!='fake') {


                  // -- if inter definied then clear timeout and call
                  if (draw_canvas_inter) {
                    clearTimeout(draw_canvas_inter);
                    draw_canvas_inter = setTimeout(draw_canvas_inter_func, 500);
                  } else {
                    draw_canvas_inter_func();
                    draw_canvas_inter = 1;
                  }
                }
              }
            }
          }



          if (o.design_skin == 'skin-minimal') {




            // console.log('skin_minimal_button_size - ' ,skin_minimal_button_size);

            skin_minimal_button_size = _apControls.width();
            if(skin_minimal_canvasplay){
              skin_minimal_canvasplay.style.width = skin_minimal_button_size;
              skin_minimal_canvasplay.width = skin_minimal_button_size;
              skin_minimal_canvasplay.style.height = skin_minimal_button_size;
              skin_minimal_canvasplay.height = skin_minimal_button_size;


              // skin_minimal_button_size = sanitize_to_css_size(skin_minimal_button_size);



              $(skin_minimal_canvasplay).css({
                'width' : skin_minimal_button_size
                ,'height' : skin_minimal_button_size
              });
            }


          }


          if (o.design_skin == 'skin-default') {
            if (_currTime) {
              //console.log(o.design_skin, parseInt(_metaArtistCon.css('left'),10) + _metaArtistCon.outerWidth() + 10);
              var _metaArtistCon_l = parseInt(_metaArtistCon.css('left'), 10);
              var _metaArtistCon_w = _metaArtistCon.outerWidth();

              if (_metaArtistCon.css('display') == 'none') {
                _metaArtistCon_w = 0;
              }
              if (isNaN(_metaArtistCon_l)) {
                _metaArtistCon_l = 20;
              }
              //                        console.log(o.design_skin, _currTime,  _metaArtistCon, _metaArtistCon.css('left'), parseInt(_metaArtistCon.css('left'),10), parseInt(_metaArtistCon.css('left'),10) + _metaArtistCon_w + 10);

              // _currTime.css({
              //     'left': _metaArtistCon_l + _metaArtistCon_w + 10
              // })
              // _totalTime.css({
              //     'left': _metaArtistCon_l + _metaArtistCon_w + 55
              // })
              /*
                         */
            }

          }

          if (o.design_skin == 'skin-minion') {
            //console.log();
            aux2 = parseInt(_conControls.find('.con-playpause').eq(0).offset().left, 10) - parseInt(_conControls.eq(0).offset().left, 10) - 18;
            _conControls.find('.prev-btn').eq(0).css({
              'top': 0,
              'left': aux2
            })
            aux2 += 36;
            _conControls.find('.next-btn').eq(0).css({
              'top': 0,
              'left': aux2
            })
          }


          if (o.embedded == 'on') {
            //console.log(window.frameElement)
            if (window.frameElement) {
              //window.frameElement.height = cthis.height();
              //console.log(window.frameElement.height, cthis.outerHeight())


              var args = {
                height: cthis.outerHeight()
              };


              if (o.embedded_iframe_id) {

                args.embedded_iframe_id = o.embedded_iframe_id;
              }


              var message = {
                name: "resizeIframe",
                params: args
              };
              window.parent.postMessage(message, '*');
            }

          }




          draw_scrub_prog();

          // draw_curr_time();


          if (o.settings_trigger_resize > 0) {

            if (o.parentgallery && $(o.parentgallery).get(0) != undefined && $(o.parentgallery).get(0).api_handleResize != undefined) {
              $(o.parentgallery).get(0).api_handleResize();
            }
          }

        }




        function reconstruct_player(){

          // console.log('reconstruct_player() ', o.restyle_player_over_400,o.restyle_player_under_400);

          if(o.restyle_player_over_400 && o.restyle_player_under_400){


            //console.log('reconstruct_player() ',o.restyle_player_over_400,' is_under_400 - ', is_under_400, cthis.attr('class'));



            if(is_under_400){
              console.log("RESTYLING WITH CLASS -> ",o.restyle_player_under_400);
              cthis.removeClass(o.restyle_player_over_400);
              cthis.addClass(o.restyle_player_under_400);
            }else{

              console.log("RESTYLING WITH CLASS -> ",o.restyle_player_over_400);
              cthis.removeClass(o.restyle_player_under_400);
              cthis.addClass(o.restyle_player_over_400);
            }

            detect_skinwave_mode();
            apply_skinwave_mode_class();

            //console.error("_audioplayerInner.find('.meta-artist-con').eq(0) -> ", _audioplayerInner.find('.meta-artist-con').eq(0));

            _audioplayerInner.append(cthis.find('.meta-artist-con'));

            cthis.find('.ap-controls').remove();
            _audioplayerInner.children('.the-thumb-con').remove();




            if(is_under_400){
              console.log("RESTYLING WITH CLASS -> ",o.restyle_player_under_400);
              cthis.removeClass(o.restyle_player_over_400);
              cthis.addClass(o.restyle_player_under_400);
            }else{

              cthis.css({
                'padding-top':''
              });
              console.log("RESTYLING WITH CLASS -> ",o.restyle_player_over_400);
              cthis.removeClass(o.restyle_player_under_400);
              cthis.addClass(o.restyle_player_over_400);
            }

            setup_structure({
              'setup_inner_player':false
              ,'setup_media':false
              ,'setup_otherstructure':true
              ,'call_from':"reconstruct"


            });



            setup_listeners();
          }
        }


        function draw_canvas_inter_func(){


          // console.log(cthis,"_scrubbarbg_canvas.get(0) -> ",_scrubbarbg_canvas.get(0));
          draw_canvas(_scrubbarbg_canvas.get(0), cthis.attr('data-pcm'), "#" + o.design_wave_color_bg,{call_from: 'canvas_normal_pcm_bg'});
          draw_canvas(_scrubbarprog_canvas.get(0), cthis.attr('data-pcm'), "#" + o.design_wave_color_progress,{call_from: 'canvas_normal_pcm_prog'});

          draw_canvas_inter = 0;
        }

        function mouse_volumebar(e) {
          var _t = $(this);

          //var mx = e.clientX - _controlsVolume.offset().left;
          if (e.type == 'mousemove') {

            //console.log(volume_dragging, mx);


            if (volume_dragging) {
              aux = (e.pageX - (_controlsVolume.find('.volume_static').eq(0).offset().left)) / (_controlsVolume.find('.volume_static').eq(0).width());

              if (_t.parent().hasClass('volume-holder') || _t.hasClass('volume-holder')) {



              }

              if (o.design_skin == 'skin-redlights') {
                aux *= 10;

                aux = Math.round(aux);

                //console.log(aux);
                aux /= 10;
              }


              set_volume(aux, {
                call_from: "set_by_mousemove"
              });
              muted = false;
            }

          }
          if (e.type == 'mouseleave') {

          }
          if (e.type == 'click') {

            //console.log(_t, _t.offset().left)

            aux = (e.pageX - (_controlsVolume.find('.volume_static').eq(0).offset().left)) / (_controlsVolume.find('.volume_static').eq(0).width());

            if (_t.parent().hasClass('volume-holder')) {


              aux = 1 - ((e.pageY - (_controlsVolume.find('.volume_static').eq(0).offset().top)) / (_controlsVolume.find('.volume_static').eq(0).height()));

            }
            if(_t.hasClass('volume-holder')) {
              aux = 1 - ((e.pageY - (_controlsVolume.find('.volume_static').eq(0).offset().top)) / (_controlsVolume.find('.volume_static').eq(0).height()));

              console.log(aux);

            }

            //console.log(aux);

            set_volume(aux, {
              call_from: "set_by_mouseclick"
            });
            muted = false;
          }

          if (e.type == 'mousedown') {

            volume_dragging = true;
            cthis.addClass('volume-dragging');




            aux = (e.pageX - (_controlsVolume.find('.volume_static').eq(0).offset().left)) / (_controlsVolume.find('.volume_static').eq(0).width());

            if (_t.parent().hasClass('volume-holder')) {


              aux = 1 - ((e.pageY - (_controlsVolume.find('.volume_static').eq(0).offset().top)) / (_controlsVolume.find('.volume_static').eq(0).height()));

            }

            //console.log(aux);

            set_volume(aux, {
              call_from: "set_by_mousedown"
            });
            muted = false;
          }
          if (e.type == 'mouseup') {

            volume_dragging = false;
            cthis.removeClass('volume-dragging');

          }

        }

        function handle_mouse_scrubbar(e) {
          var mousex = e.pageX;




          if ($(e.target).hasClass('sample-block-start') || $(e.target).hasClass('sample-block-end')) {
            return false;
          }

          if (e.type == 'mousemove') {
            _scrubbar.children('.scrubBox-hover').css({
              'left': (mousex - _scrubbar.offset().left)
            });



            if(o.scrub_show_scrub_time=='on'){

              // console.log('_currTime - ',_currTime);

              if(time_total){
                var aux = (mousex - _scrubbar.offset().left) / _scrubbar.outerWidth() * time_total;


                if(_currTime){
                  _currTime.html(formatTime(aux));
                  _currTime.addClass('scrub-time');

                }

                scrub_showing_scrub_time = true;
              }
            }

          }
          if (e.type == 'mouseleave') {

            scrub_showing_scrub_time = false;

            if(_currTime){
              _currTime.removeClass('scrub-time');

            }

            draw_curr_time();

          }
          if (e.type == 'click') {


            if(cthis.hasClass('prevent-bubble')){

              if(e && e.stopPropagation){
                e.preventDefault();
                e.stopPropagation();;
                // return false;
              }
            }

            if (audioCtx_buffer) {
              time_total = audioCtx_buffer.duration;
            }


            if(sw == 0){

              sw = _scrubbar.width();
            }
            if(sw == 0){

              sw = 300;
            }
            var aux = ((e.pageX - (_scrubbar.offset().left)) / (sw) * time_total);


            //console.log(e.target,e.pageX, (_scrubbar.offset().left), (sw), time_total, aux);

            if(pseudo_sample_time_start==0){

              if (sample_time_start > 0) {
                aux -= sample_time_start;
              }
            }

            if (o.fakeplayer) {


              var args = {
                type: type_for_fake_feed,
                fakeplayer_is_feeder: 'on'
              }

              //o.fakeplayer.get(0).api_change_media(cthis, args);
              setTimeout(function() {

                if (o.fakeplayer.get(0) && o.fakeplayer.get(0).api_pause_media) {

                  o.fakeplayer.get(0).api_seek_to_perc(aux / time_total,{
                    'call_from': 'from_feeder_to_feed'
                  });
                }
              }, 50);
            }


            // console.log('((e.pageX - (_scrubbar.offset().left)) / (sw) * time_total) - ',((e.pageX - (_scrubbar.offset().left)) / (sw) * time_total));
            // console.log('time_total - ',time_total);
            // console.log('aux - ',aux);
            // console.log('sw - ',sw);

            seek_to(aux, {
              'call_from': 'handle_mouse_scrubbar'
            });

            // return false;

            if(o.autoplay_on_scrub_click=='on'){

              if (player_playing == false) {
                play_media({
                  'call_from':'handle_mouse_scrubbar'
                });
              }
            }

            if(cthis.hasClass('from-wc_loop')){
              return false;
            }
          }

        }

        function seek_to_perc(argperc, pargs) {

          if(o.fakeplayer){
            time_total = time_total_for_visual;
          }
          seek_to((argperc * time_total),pargs);
        }

        function seek_to(arg, pargs) {
          //arg = nr seconds


          //console.log(_feed_fakePlayer);

          var margs = {
            'call_from': 'default'
            ,'deeplinking': 'off' // -- default or "auto" or "user action"
            ,'call_from_type': 'default' // -- default or "auto" or "user action"
          };

          if(pargs){
            margs = $.extend(margs,pargs);
          }

          if(margs.call_from=='from_feeder_to_feed'){

          }

          if(arg==0){
            time_curr = 0;
          }

          if(debug_var2){
            // console.log('seek_to', arg, margs, 'type - ',type,'_cmedia - ',_cmedia);
            debug_var2 = false;
          }

          if(margs.deeplinking=='on'){
            var newlink = add_query_arg(window.location.href,'audio_time',arg);


            var stateObj = { foo: "bar" };
            history.pushState(stateObj, null, newlink);
          }


          // console.log('seek_to arg - ',arg, 'type - ',type, cthis);
          arg = sanitize_from_point_time(arg);



          if(pseudo_sample_time_start){
            if(arg<pseudo_sample_time_start){
              arg = pseudo_sample_time_start;
            }
            if(arg>pseudo_sample_time_end){
              arg = pseudo_sample_time_end;
            }
          }



          // console.log('pseudo_sample_time_end -3 ',pseudo_sample_time_end);

          // console.log('cthis.hasClass(\'first-played\') - ',cthis.hasClass('first-played'));

          // console.log('curr_time_first_set - ',curr_time_first_set);
          if (o.fakeplayer) {


            var args = {
              type: type_for_fake_feed,
              fakeplayer_is_feeder: 'on'
            }



            if(o.fakeplayer.length && o.fakeplayer.data('feeding-from')!=cthis.get(0)){


              console.log('margs - ',margs, 'arg - ',arg);
              if( margs.call_from!='handle_end' &&margs.call_from!='from_playfrom' &&margs.call_from!='last_pos'   ){


                // -- if it is not user action

                args.call_from='seek_to from player '+cthis.attr('data-source');
                o.fakeplayer.get(0).api_change_media(cthis, args);



              }else{

                time_curr = arg;
                time_curr_for_visual = arg;
                time_curr_for_real = arg;

                cthis.data('promise-to-play-footer-player-from',arg);

              }
            }


            //o.fakeplayer.get(0).api_change_media(cthis, args);
            setTimeout(function() {

              if (o.fakeplayer.get(0) && o.fakeplayer.get(0).api_pause_media) {

                if(margs.call_from!='from_playfrom' && margs.call_from!='last_pos'){
                  o.fakeplayer.get(0).api_seek_to(arg,{
                    'call_from': 'from_feeder_to_feed'
                  });
                }

              }
            }, 50);

            return false;
          }


          if (type == 'youtube') {
            try{

              _cmedia.seekTo(arg);
            }catch(err){
              console.log('yt seek err - ',err);
            }
          }

          check_time({
            'fire_only_once':true
          })
          setTimeout(function(){
            check_time({
              'fire_only_once':true
            })
          },20);


          if (type == 'audio') {
            if (audioCtx_buffer && audioCtx_buffer != 'waiting') {

              //console.log('arg - ',arg);
              lasttime_inseconds = arg;
              audioCtx.currentTime = lasttime_inseconds;

              if (inter_audiobuffer_workaround_id != 0) {
                time_curr = arg;
              }

              pause_media({
                'audioapi_setlasttime': false
              });
              play_media({
                'call_from':'audio_buffer'
              });
            } else {

              // console.log("HMM",_cmedia,_cmedia.currentTime)

              if (o.design_skin == 'skin-pro') {
                // var aux = parseInt(Math.easeOutQuad_rev(arg/totalDuration, 0, sw,1), 10);
                //
                // console.log(arg/totalDuration, aux/sw, arg, aux, sw)
              }

              if(_cmedia && typeof(_cmedia.currentTime)!='undefined'){

                try{

                  _cmedia.currentTime = arg;
                }catch(e){
                  console.log('error on scrub',e, ' arg - ',arg);

                }

                // console.log('_cmedia.currentTime -> ',_cmedia.currentTime);
              }

              return false;

            }

          }


        }

        function seek_to_visual(argperc) {


          //console.log(time_total);
          if (time_total == 0) {


            if (_cmedia && _cmedia.duration) {
              time_total = _cmedia.duration;
            }
            //
            //if(debug_var){
            //    //console.log('seek_to_visual()', o.type, argperc,time_curr, time_total,_cmedia, _cmedia.duration);
            //    debug_var = false;
            //}
          }
          // console.log('seek_to_visual()', o.type, argperc,time_curr, time_total,_cmedia, _cmedia.duration);

          if(o.fakeplayer){
            time_curr = time_curr_for_visual;
            time_total = time_total_for_visual;
          }
          // if(debug_var2){
          //     console.log('seek_to_visual()',argperc,cthis);
          //     debug_var2 = false;
          // }

          time_curr = argperc * time_total;

          curr_time_first_set = true;


          // if(debug_var2){
          //     console.log('time_curr - ',time_curr,'time_total - ',time_total,cthis);
          //     console.log('time_curr_for_visual - ',time_curr_for_visual,'time_total_for_visual - ',time_total_for_visual,cthis);
          //     debug_var2 = false;
          // }

          // draw_scrub_prog();

          // draw_curr_time();


          //console.log(time_curr,argperc,time_total);
          //check_time();
          check_time({
            'fire_only_once':true
          })
          setTimeout(function(){
            check_time({
              'fire_only_once':true
            })
          },20);
        }

        function set_playback_speed(arg) {
          //=== outputs a playback speed from 0.1 to 10

          if (type == 'youtube') {
            _cmedia.setPlaybackRate(arg);
          }
          if (type == 'audio') {
            _cmedia.playbackRate = arg;

          }

        }

        function set_volume(arg, pargs) {
          // -- outputs a volume from 0 to 1

          var margs = {

            'call_from': 'default'
          };

          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          if(arg>1){
            arg = 1;
          }
          if(arg<0){
            arg = 0;
          }


          if(margs.call_from=='from_fake_player_feeder_from_init_loaded'){
            // -- lets prevent call from the init_loaded set_volume if the volume has been changed
            if(_feed_fakePlayer){


              // console.log('volume_set_by_user - ',volume_set_by_user);

              if(o.default_volume!='default'){
                volume_set_by_user = true;
              }


              if(volume_set_by_user){
                return false;
              }else{

                volume_set_by_user= true;

                console.log("SET VOLUME BY USER", cthis);
              }
            }
          }

          if(margs.call_from=='set_by_mouseclick' || margs.call_from=='set_by_mousemove'){
            volume_set_by_user = true;
          }

          // console.log("set_volume()",arg, cthis, margs);

          if (type == 'youtube') {

            if(_cmedia && _cmedia.setVolume){

              _cmedia.setVolume(arg * 100);
            }
          }
          if (type == 'audio') {
            if(_cmedia){

              //console.log('volume - ',arg, arg* o.watermark_volume);
              _cmedia.volume = arg;

              if(_cwatermark){
                _cwatermark.volume = arg* o.watermark_volume;
              }
            }else{


              if(_cmedia){

                $(_cmedia).attr('preload', 'metadata');
              }

            }

          }

          //console.log(_controlsVolume.children('.volume_active'));


          visual_set_volume(arg,margs);

          if(_feed_fakePlayer){
            margs.call_from = ('from_fake_player')

            if(_feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_visual_set_volume(arg,margs)){

              _feed_fakePlayer.get(0).api_visual_set_volume(arg,margs);
            }
          }

          if(o.fakeplayer){

            // console.log(margs);
            if(margs.call_from != ('from_fake_player')){

              // margs.call_from = ('from_fake_player_feeder')
              if(margs.call_from=='from_init_loaded'){

                margs.call_from = ('from_fake_player_feeder_from_init_loaded')
              }else{

                margs.call_from = ('from_fake_player_feeder')
              }
              if(_feed_fakePlayer && _feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_set_volume(arg,margs)) {
                o.fakeplayer.get(0).api_set_volume(arg, margs);
              }
            }
          }

          // console.log(o.fakeplayer);
        }


        function visual_set_volume(arg,margs){



          if (_controlsVolume.hasClass('controls-volume-vertical')) {

            //console.log('ceva');
            _controlsVolume.find('.volume_active').eq(0).css({
              'height': (_controlsVolume.find('.volume_static').eq(0).height() * arg)
            });
          } else {

            _controlsVolume.find('.volume_active').eq(0).css({
              'width': (_controlsVolume.find('.volume_static').eq(0).width() * arg)
            });
          }


          if (o.design_skin == 'skin-wave' && o.skinwave_dynamicwaves == 'on') {
            //console.log(arg);
            _scrubbar.find('.scrub-bg-img').eq(0).css({
              'transform': 'scaleY(' + arg + ')'
            })
            _scrubbar.find('.scrub-prog-img').eq(0).css({
              'transform': 'scaleY(' + arg + ')'
            })

            if (o.skinwave_enableReflect == 'on') {

              if (arg == 0) {
                cthis.find('.scrub-bg-img-reflect').fadeOut('slow');
              } else {
                cthis.find('.scrub-bg-img-reflect').fadeIn('slow');
              }
            }
          }


          if (localStorage != null && the_player_id) {

            //console.log(the_player_id);

            localStorage.setItem('dzsap_last_volume_' + the_player_id, arg);

          }

          last_vol = arg;
        }


        function click_mute(e) {

          // console.warn('click_mute() - ',muted, last_vol, last_vol_before_mute,e)
          if (muted == false) {
            last_vol_before_mute = last_vol;
            set_volume(0, {
              call_from: "from_mute"
            });
            muted = true;
          } else {
            set_volume(last_vol_before_mute, {
              call_from: "from_unmute"
            });
            muted = false;
          }
        }

        function pause_media_visual(pargs) {

          if (_feed_fakePlayer) {
            //console.warn('has _feed_fakePlayer and will pause that too - ',_feed_fakePlayer);
          }

          var margs = {
            'call_from': 'default'
          };


          if (pargs) {
            margs = $.extend(margs, pargs);
          }

          // console.log('pause_media_visual',margs);


          // console.log('_conPlayPause - ',_conPlayPause, o.design_animateplaypause);
          if (o.design_animateplaypause != 'on') {
            _conPlayPause.children('.playbtn').css({
              'display': 'block'
            });
            _conPlayPause.children('.pausebtn').css({
              'display': 'none'
            });
          } else {

          }


          _conPlayPause.removeClass('playing');
          cthis.removeClass('is-playing');
          player_playing = false;

          //console.log("PAUSE MEDIA VISUAL")


          if(cthis.parent().hasClass('zoomsounds-wrapper-bg-center')){
            cthis.parent().removeClass('is-playing');
          }


          if(o.parentgallery){
            o.parentgallery.removeClass('player-is-playing');
          }


          sw_suspend_enter_frame = true;




          if (action_audio_pause) {
            action_audio_pause(cthis);
          }
        }

        function pause_media(pargs) {
          //console.warn('pause_media()', cthis);

          if (_feed_fakePlayer) {
            //console.warn('has _feed_fakePlayer and will pause that too - ',_feed_fakePlayer);
          }

          var margs = {
            'audioapi_setlasttime': true,
            'donot_change_media': false
          };

          if (destroyed) {
            return false;
          }

          if (pargs) {
            margs = $.extend(margs, pargs);
          }



          pause_media_visual({
            'call_from':'pause_media'
          });


          //console.log(margs.donot_change_media);
          if (margs.donot_change_media != true) {


            //console.log(o.fakeplayer);
            if (o.fakeplayer != null) {

              var args = {
                type: type_for_fake_feed,
                fakeplayer_is_feeder: 'on'
              }
              //console.log(playing, args, o.fakeplayer);
              // o.fakeplayer.get(0).api_change_media(cthis, args);



              if(o.fakeplayer && o.fakeplayer.length && o.fakeplayer.data('feeding-from')!=cthis.get(0)){

                args.call_from='pause_media from player '+cthis.attr('data-source');
                o.fakeplayer.get(0).api_change_media(cthis, args);


              }

              setTimeout(function() {

                if (o.fakeplayer.get(0) && o.fakeplayer.get(0).api_pause_media) {

                  o.fakeplayer.get(0).api_pause_media();
                }
              }, 100);

              player_playing = false;
              cthis.removeClass('is-playing');


              if(cthis.parent().hasClass('zoomsounds-wrapper-bg-center')){
                cthis.parent().removeClass('is-playing');
              }

              return;
            }



          }


          if (type == 'youtube') {

            // console.warn('trying to pause youtube video, ',_cmedia);
            if(_cmedia && _cmedia.pauseVideo){

              _cmedia.pauseVideo();
            }
          }
          if (type == 'audio') {

            if (audioCtx_buffer != null) {
              //console.log(audioCtx.currentTime, audioCtx_buffer.duration);
              //console.log(lasttime_inseconds);
              ///==== on safari we need to wait a little for the sound to load
              if (audioCtx_buffer != 'placeholder' && audioCtx_buffer != 'waiting') {
                if (margs.audioapi_setlasttime == true) {
                  lasttime_inseconds = audioCtx.currentTime;
                }
                //console.log('trebuie doar la pauza', lasttime_inseconds);

                if(webaudiosource && webaudiosource.stop){

                  webaudiosource.stop(0);
                }
              }
            } else {
              if (_cmedia) {
                if (_cmedia.pause) {
                  _cmedia.pause();
                }
              }
              if (_cwatermark && _cwatermark.pause) {

                _cwatermark.pause();

              }

            }


          }

          if (_feed_fakePlayer) {

            _feed_fakePlayer.get(0).api_pause_media_visual({
              'call_from':'pause_media in child player'
            });
          }


          player_playing = false;
          cthis.removeClass('is-playing');


          if(cthis.parent().hasClass('zoomsounds-wrapper-bg-center')){
            cthis.parent().removeClass('is-playing');
          }

        }

        function play_media_visual(margs) {



          if (o.design_animateplaypause != 'on') {

            _conPlayPause.children('.playbtn').css({
              'display': 'none'
            });
            _conPlayPause.children('.pausebtn').css({
              'display': 'block'
            });
          }





          //return false;
          player_playing = true;
          sw_suspend_enter_frame = false;

          //return false;
          cthis.addClass('is-playing');
          cthis.addClass('first-played');

          _conPlayPause.addClass('playing');

          if(cthis.parent().hasClass('zoomsounds-wrapper-bg-center')){
            cthis.parent().addClass('is-playing');
          }

          if(o.parentgallery){
            o.parentgallery.addClass('player-is-playing');
          }



          if(_sticktobottom){
            _sticktobottom.addClass('audioplayer-loaded');
          }

          //console.log(cthis, margs);

          if (action_audio_play) {
            action_audio_play(cthis);
          }
          if (action_audio_play2) {
            action_audio_play2(cthis);
          }


        }

        function play_media(pargs) {

          //                console.log(dzsap_list);


          var margs = {
            'api_report_play_media': true
            ,'call_from': 'default'
            ,'retry_call': 0
          }
          if (pargs) {
            margs = $.extend(margs, pargs)
          }




          // console.log('.play_media() -3 ',margs,cthis, 'type - ',type, '_cmedia - ', _cmedia);
          //return false ;
          //return;

          if(margs.call_from=='api_sync_players_prev'){
            // console.log('o.parentgallery - ',o.parentgallery);

            player_index_in_gallery = cthis.parent().children('.audioplayer,.audioplayer-tobe').index(cthis);

            if(o.parentgallery && o.parentgallery.get(0) && o.parentgallery.get(0).api_goto_item){
              o.parentgallery.get(0).api_goto_item(player_index_in_gallery);
            }
          }
          if(is_ios() && audioCtx_buffer == 'waiting'){
            setTimeout(function(){
              pargs.call_from_aux='waiting audioCtx_buffer or ios';
              play_media(pargs);
            },500);
            return false;
          }

          if(margs.call_from=='click_playpause'){
            // -- lets setup the playlist
          }



          if (cthis.hasClass('media-setuped') == false && o.fakeplayer==null) {
            console.log('warning: media not setuped, there might be issues', cthis.attr('id'));
          }



          if(margs.call_from=='feed_to_feeder'){

            // console.log('play from - ',_feed_fakePlayer, margs);

            if (cthis.hasClass('dzsap-loaded')==false) {

              init_loaded();

              var delay = 300;

              if(is_ios()){

              }
              if(is_android_good()){
                delay = 0;
              }

              if(margs.call_from_aux!='with delay'){

                if(delay){

                  setTimeout(function () {

                    margs.call_from_aux = 'with delay';
                    play_media(margs);
                  },delay);
                }else{

                  play_media(margs);
                }
                return false;
              }

            }
          }


          //console.log(o.type);
          if (type != 'fake') {

            //return false;
          }


          for (i = 0; i < dzsap_list.length; i++) {



            //console.log('comparing dzsap_list - ', dzsap_list[i].get(0), cthis.get(0));
            //console.log(dzsap_list[i].get(0) != cthis.get(0));


            // -- pause other players
            if (dzsap_list[i].get(0)  && dzsap_list[i].get(0).api_pause_media && ( dzsap_list[i].get(0) != cthis.get(0)) ) {


              //console.error("LETS PAUSE");
              //console.log('try to pause', dzsap_list[i].get(0),dzsap_list[i].data('type_audio_stop_buffer_on_unfocus'))
              if (dzsap_list[i].data('type_audio_stop_buffer_on_unfocus') && dzsap_list[i].data('type_audio_stop_buffer_on_unfocus') == 'on') {
                dzsap_list[i].get(0).api_destroy_for_rebuffer();
              } else {

                dzsap_list[i].get(0).api_pause_media({
                  'audioapi_setlasttime': false
                });
              }
            }
          }


          if (destroyed_for_rebuffer) {

            setup_media();


            if (isInt(playfrom)) {
              seek_to(playfrom,{
                'call_from':'destroyed_for_rebuffer_playfrom'
              });
            }

            destroyed_for_rebuffer = false;
          }

          // console.log(o.google_analytics_send_play_event, window._gaq, google_analytics_sent_play_event);
          if (o.google_analytics_send_play_event == 'on' && window._gaq && google_analytics_sent_play_event == false) {
            //if(window.console){ console.log( 'sent event'); }
            window._gaq.push(['_trackEvent', 'ZoomSounds Play', 'Play', 'zoomsounds play - ' + cthis.attr('data-source')]);
            google_analytics_sent_play_event = true;
          }
          // console.log(o.google_analytics_send_play_event, window.ga, google_analytics_sent_play_event);

          if (!window.ga) {
            if (window.__gaTracker) {
              window.ga = window.__gaTracker;
            }
          }
          if (o.google_analytics_send_play_event == 'on' && window.ga && google_analytics_sent_play_event == false) {
            if (window.console) {
              console.log('sent event');
            }
            google_analytics_sent_play_event = true;
            window.ga('send', {
              hitType: 'event',
              eventCategory: 'zoomsounds play - ' + cthis.attr('data-source'),
              eventAction: 'play',
              eventLabel: 'zoomsounds play - ' + cthis.attr('data-source')
            });
          }

          //===media functions

          if (_feed_fakePlayer) {

            //console.log(cthis, _feed_fakePlayer);
            _feed_fakePlayer.get(0).api_play_media_visual({
              'api_report_play_media': false
            });
          }

          // console.log("TYPE IS ",type, o.fakeplayer);

          if (o.fakeplayer) {

            //console.log("SUBMIT PLAY TO fakeplayer", o.fakeplayer);
            var args = {
              type: type_for_fake_feed,
              fakeplayer_is_feeder: 'on',
              call_from: 'play_media_audioplayer'
            }
            //console.log(playing, args, o.fakeplayer);




            try{

              //console.log("o.fakeplayer.data('feeding-from') - ",o.fakeplayer.data('feeding-from'),o.fakeplayer);


              if(margs.call_from=='click_playpause'){
                // -- let us reset up the playlist


                if(o.parentgallery){
                  o.parentgallery.get(0).api_regenerate_sync_players_with_this_playlist();
                  o.fakeplayer.get(0).api_regenerate_playerlist_inner();
                }

                // console.log("we regenerate playlist here");
              }

              if(o.fakeplayer && o.fakeplayer.length && o.fakeplayer.data('feeding-from')!=cthis.get(0)){

                args.call_from='play_media from player '+cthis.attr('data-source');
                o.fakeplayer.get(0).api_change_media(cthis, args);




                if(cthis.hasClass('first-played')==false){
                  // console.log("YES");

                  // console.log('cthis.data(\'promise-to-play-footer-player-from\' -',cthis.data('promise-to-play-footer-player-from'));

                  if(cthis.data('promise-to-play-footer-player-from')){
                    seek_to(cthis.data('promise-to-play-footer-player-from'));

                    setTimeout(function(){

                      // console.log('cthis.data(\'promise-to-play-footer-player-from\' -',cthis.data('promise-to-play-footer-player-from'));
                      cthis.data('promise-to-play-footer-player-from','');
                    },1000);
                  }
                }

              }
              setTimeout(function() {

                if (o.fakeplayer.get(0) && o.fakeplayer.get(0).api_play_media) {

                  o.fakeplayer.get(0).api_play_media({
                    'call_from':'feed_to_feeder'
                  });
                }
              }, 100);




              // console.log('ajax view submitted', cthis, ajax_view_submitted);
              if (ajax_view_submitted == 'off') {
                ajax_submit_views();
              }
              return;


            }catch(err){
              console.log('no fake player..', err);

              // play_media();
            }



          }



          if (type == 'youtube') {
            // console.warn('is youtube .. try to play it .. ', _cmedia);
            try{
              if (_cmedia && _cmedia.playVideo) {

                _cmedia.playVideo();
                //return false;
              }else{

                // console.warn('lets retry ', margs.retry_call,  _cmedia, 'yt_inited - ',yt_inited);
                if(margs.retry_call<5){

                  margs.retry_call++;
                  margs.call_from='retry for youtube';


                  if(yt_inited==false){

                    // -- clearly not loaded..
                    loaded = false;



                    check_yt_ready(yt_curr_id);

                    // console.log("RETRYING");

                    yt_retry_play_timeout = setTimeout(function(args){
                      play_media(args);
                    },500,margs);
                  }else{

                    yt_retry_play_timeout = setTimeout(function(args){
                      play_media(args);
                    },500,margs);
                  }
                }
              }
            }catch(err){
              console.log(err);
            }

          }
          if (type == 'normal' || type=='detect') {
            type = 'audio';
          }
          if (type == 'audio') {

            if(cthis.attr('data-original-type')){
              // -- then this player is feeding
            }else{


              if (audioCtx_buffer ) {
                //console.log(audioCtx_buffer);
                ///==== on safari we need to wait a little for the sound to load
                if (audioCtx_buffer != 'placeholder'  && audioCtx_buffer != 'waiting') {
                  webaudiosource = audioCtx.createBufferSource();
                  webaudiosource.buffer = audioCtx_buffer;
                  //javascriptNode.connect(audioCtx.destination);
                  webaudiosource.connect(audioCtx.destination);

                  webaudiosource.connect(analyser)
                  //analyser.connect(audioCtx.destination);
                  //console.log("play ctx", lasttime_inseconds);
                  webaudiosource.start(0, lasttime_inseconds);
                } else {
                  return;
                }

              } else {
                // -- no audioCtx_buffer
                if (_cmedia) {

                  // console.log('actually playing _cmedia.play', _cmedia, cthis)
                  if (_cmedia.play ) {
                    _cmedia.play();

                  }else{

                    if(o.fakeplayer==null){

                      play_promised = true;
                    }
                  }
                }else{
                  if(o.fakeplayer==null) {
                    play_promised = true;
                  }
                }
                //console.log('watermark - .play', _cwatermark)
                if (_cwatermark) {

                  //console.log('watermark - .play', _cwatermark, _cwatermark.play)
                  if (_cwatermark.play ) {
                    _cwatermark.play();
                  }
                }

              }

            }



          }



          //return false;
          play_media_visual(margs);




          //console.log(ajax_view_submitted);



          if(_feed_fakePlayer){
            dzsap_currplayer_focused = _feed_fakePlayer.get(0);
            _feed_fakePlayer.get(0).api_try_to_submit_view();
          }else{

            dzsap_currplayer_focused = cthis.get(0);
            try_to_submit_view();
          }


          // console.log('keyboard_controls.play_trigger_step_back - ',keyboard_controls);
          if(keyboard_controls.play_trigger_step_back=='on'){

            if(dzsap_currplayer_focused){

              dzsap_currplayer_focused.api_step_back(keyboard_controls.step_back_amount);
            }
          }

        }

        function try_to_submit_view(){
          // console.log('try_to_submit_view', cthis, ajax_view_submitted);
          if (ajax_view_submitted == 'auto') {
            ajax_view_submitted = 'off';
          }
          if (ajax_view_submitted == 'off') {
            ajax_submit_views();
          }
        }



        function formatTime(arg) {
          //formats the time
          var s = Math.round(arg);
          var m = 0;
          if (s > 0) {
            while (s > 59 && s < 3000000 && isFinite(s)) {
              m++;
              s -= 60;
            }
            return String((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
          } else {
            return "00:00";
          }
        }
        return this;
      })
    }









    //////=======
    // -- the nav
    /////========

    $.fn.zoomsounds_nav = function(o) {
      var defaults = {


      }


      if (typeof o == 'undefined') {
        if (typeof $(this).attr('data-options') != 'undefined' && $(this).attr('data-options') != '') {
          var aux = $(this).attr('data-options');
          aux = 'var aux_opts = ' + aux;
          eval(aux);
          o = aux_opts;
        }
      }


      o = $.extend(defaults, o);
      this.each(function () {

        //console.log("INITED");
        var cgallery = $(this);
        var cchildren = cgallery.children(),
          cgalleryId = 'ag1';
        var currNr = -1 // -- the current player that is playing

          , currNr_2 = -1
          , lastCurrNr = 0
          , nrChildren = 0

      });




    };




















    // -- defined gallery here
    // --
    // AUDIO GALLERY
    // --

    $.fn.audiogallery = function(o) {
      var defaults = {
        design_skin: 'skin-default',
        cueFirstMedia: 'on',
        autoplay: 'off'
        ,settings_enable_linking: 'off' // -- use html5 history to remember last position in the gallery
        ,autoplayNext: 'on',
        design_menu_position: 'bottom',
        design_menu_state: 'open' // -- options are "open" or "closed", this sets the initial state of the menu, even if the initial state is "closed", it can still be opened by a button if you set design_menu_show_player_state_button to "on"
        ,design_menu_show_player_state_button: 'off' // -- show a button that allows to hide or show the menu
        ,design_menu_width: 'default'
        ,design_menu_height: '200'
        ,design_menu_space: 'default'
        ,settings_php_handler: '',
        design_menuitem_width: 'default',
        design_menuitem_height: 'default',
        design_menuitem_space: 'default'
        ,force_autoplay_when_coming_from_share_link: 'off'
        ,disable_menu_navigation: 'off'
        ,loop_playlist: 'on'
        ,menu_nav_type: 'mousemove' // -- mousemove or scroller or all
        ,menu_facebook_share: 'auto' // -- mousemove or scroller or all
        ,enable_easing: 'off' // -- enable easing for menu animation
        ,settings_ap: 'default'
        ,transition: 'fade' // -- fade or direct
        ,embedded: 'off'
        ,mode_showall_layout: 'one-per-row' // or two-per-row or three-per-row
        ,settings_mode: 'mode-normal' // mode-normal or mode-showall
        ,settings_mode_showall_show_number: 'on' // mode-normal or mode-showall
        ,mode_normal_video_mode: 'auto' // -- auto or "one" ( only one audio player )

      }




      if (typeof o == 'undefined') {
        if (typeof $(this).attr('data-options') != 'undefined' && $(this).attr('data-options') != '') {
          var aux = $(this).attr('data-options');
          aux = 'var aux_opts = ' + aux;
          eval(aux);
          o = aux_opts;
        }
      }


      o = $.extend(defaults, o);
      this.each(function() {

        //console.log("INITED");
        var cgallery = $(this);
        var cchildren = cgallery.children(),
          cid = 'ag1';
        var currNr = -1 // -- the current player that is playing

          ,currNr_2 = -1
          ,lastCurrNr = 0
          ,nrChildren = 0
          ,tempNr = 0;
        var busy = true;
        var i = 0;
        var ww, wh, tw, th
          , nc_maindim // -- nav clip size
          , nm_maindim // -- nav main total size
          , sw = 0 // -- scrubbar width
          ,
          sh, spos = 0 // --  scrubbar prog pos
        ;
        var _sliderMain, _sliderClipper, _navMain, _navClipper, _cache;
        var busy = false,
          playing = false,
          muted = false,
          loaded = false,
          first = true,
          destroyed = true,
          skin_redlight_give_controls_right_to_all_players = false // -- if the mode is mode-showall and the skin of the player is redlights, then make all players with controls right
        ;
        var time_total = 0,
          time_curr = 0;
        var last_vol = 1,
          last_vol_before_mute = 1;
        var inter_check, inter_checkReady;

        var data_source;

        var aux_error = 20; //==erroring for the menu scroll

        var res_thumbh = false;
        var trying_to_get_track_data = false;

        var str_ie8 = '';

        var arr_menuitems = [];
        var track_data = []; // -- the whole track data views / likes etc.

        var str_alertBeforeRate = 'You need to comment or rate before downloading.';



        var duration_viy = 20;

        var target_viy = 0;

        var begin_viy = 0;

        var finish_viy = 0;

        var change_viy = 0;


        if (window.dzsap_settings && typeof(window.dzsap_settings.str_alertBeforeRate) != 'undefined') {
          str_alertBeforeRate = window.dzsap_settings.str_alertBeforeRate;
        }

        cgallery.get(0).currNr_2 = -1; // -- we use this as backup currNR for mode-showall ( hack )

        init();

        function init() {
          // -- init gallery here

          // console.log('o.settings_ap before data-player-options - ',o.settings_ap);
          // console.log('%c o gallery','background-color: #ccc;',$.extend({},o));


          if(cgallery.attr('data-player-options')){
            try{

              if(o.settings_ap=='default'){

                o.settings_ap = JSON.parse(cgallery.attr('data-player-options'));
              }
            }catch(err){
              console.log('json not correct .. data-player-options', cgallery.attr('data-player-options'))
            }
          }

          console.log('o.settings_ap after data-player-options - ',Object.assign({}, o.settings_ap));
          if(o.settings_ap=='default'){
            o.settings_ap = {};
          }


          if (o.design_menu_width == 'default') {
            o.design_menu_width = '100%';
          }
          if (o.design_menu_height == 'default') {
            o.design_menu_height = '200';
          }


          if(cgallery.hasClass('skin-wave')){
            o.design_skin = 'skin-wave';
          }
          if(cgallery.hasClass('skin-default')){
            o.design_skin = 'skin-default';
          }
          if(cgallery.hasClass('skin-aura')){
            o.design_skin = 'skin-aura';
          }


          cgallery.addClass(o.settings_mode);


          cgallery.append('<div class="slider-main"><div class="slider-clipper"></div></div>');

          cgallery.addClass('menu-position-' + o.design_menu_position);

          _sliderMain = cgallery.find('.slider-main').eq(0);


          var auxlen = cgallery.find('.items').children('.audioplayer-tobe').length;

          // --- if there is a single audio player in the gallery - theres no point of a menu


          o.settings_ap.disable_player_navigation = o.disable_player_navigation;
          if (auxlen == 0 || auxlen == 1) {
            o.design_menu_position = 'none';
            o.settings_ap.disable_player_navigation = 'on';
          }


          var aux = '<div class="nav-main zoomsounds-nav '+o.design_skin+' nav-type-'+o.menu_nav_type+'"><div class="nav-clipper"></div></div>';

          if (o.design_menu_position == 'top') {
            _sliderMain.before(aux);
          }
          if (o.design_menu_position == 'bottom') {
            _sliderMain.after(aux);
          }

          if(o.settings_php_handler){

          }else{
            if(o.settings_ap.settings_php_handler){
              o.settings_php_handler = o.settings_ap.settings_php_handler;
            }
          }


          if(typeof cgallery.attr('id')){
            cid = cgallery.attr('id');
          }else{

            var ind = 0;
            while($('ag'+ind).length==0){
              ind++;
            }


            cid = 'ag'+ind;

            cgallery.attr('id',cid);
          }



          _sliderClipper = cgallery.find('.slider-clipper').eq(0);
          _navMain = cgallery.find('.nav-main').eq(0);
          _navClipper = cgallery.find('.nav-clipper').eq(0);

          if(cgallery.children('.extra-html').length){
            cgallery.append(cgallery.children('.extra-html'));
          }

          if (o.settings_mode == 'mode-showall') {
            _sliderClipper.addClass('layout-'+o.mode_showall_layout);
          }


          reinit();

          //console.log(arr_menuitems);

          if (o.disable_menu_navigation == 'on') {
            _navMain.hide();
          }

          //                console.log(o.design_menu_height, o.design_menu_state);
          _navMain.css({
            'height': o.design_menu_height
          })

          if (is_ios() || is_android()) {
            _navMain.css({
              'overflow': 'auto'
            })
          }

          parse_track_data();

          if (o.design_menu_state == 'closed') {

            _navMain.css({
              'height': 0
            })
          }else{
            cgallery.addClass('menu-opened');
          }


          if(can_history_api()==false){
            o.settings_enable_linking = 'off';
          }



          if (cgallery.css('opacity') == 0) {
            cgallery.animate({
              'opacity': 1
            }, 1000);
          }

          $(window).bind('resize', handleResize);
          handleResize();
          setTimeout(handleResize, 1000);



          cgallery.get(0).api_skin_redlights_give_controls_right_to_all = function() {

            // -- void f()

            skin_redlight_give_controls_right_to_all_players = true;
          }


          if(get_query_arg(window.location.href,'audiogallery_startitem_'+cid)){
            tempNr = Number(get_query_arg(window.location.href, 'audiogallery_startitem_'+cid));

            lastCurrNr = tempNr;
            if(Number(get_query_arg(window.location.href,'audiogallery_startitem_'+cid)) && Number(get_query_arg(window.location.href,'audiogallery_startitem_'+cid))>0){

              // console.log(cid,o.force_autoplay_when_coming_from_share_link)

              // -- caution .. coming from share link will trigger autoplay!!!
              if(o.force_autoplay_when_coming_from_share_link=='on'){
                o.autoplay='on';
              }
            }
          }
          // console.log('%c o gallery','background-color: #ccc;',$.extend({},o));


          if (o.settings_mode == 'mode-normal') {

            goto_item(tempNr);
          }


          if (o.settings_mode == 'mode-showall') {
            // -- mode-showall

            _sliderClipper.children().each(function() {
              var _t = $(this);

              //console.log(_t);

              var ind = _t.parent().children('.audioplayer,.audioplayer-tobe').index(_t);

              if (_t.hasClass('audioplayer-tobe')) {
                //console.log(o.settings_ap);


                var player_args = Object.assign({}, o.settings_ap);
                player_args.parentgallery = cgallery;
                player_args.call_from = 'mode show-all';
                player_args.action_audio_play = mode_showall_listen_for_play;

                // -- showall
                _t.audioplayer(player_args);

                //console.log(ind);

                ind = String(ind + 1);

                if (ind.length < 2) {
                  ind = '0' + ind;
                }

                if(o.mode_showall_layout=='one-per-row' && o.settings_mode_showall_show_number!='off'){

                  _t.before('<div class="number-wrapper"><span class="the-number">' + ind + '</span></div>')
                  _t.after('<div class="clear for-number-wrapper"></div>')
                }
              }

            })


            if($.fn.isotope && o.mode_showall_layout!='one-per-row'){

              // -- we have isotope

              // console.log('_sliderClipper.find(\'.audioplayer,.audioplayer-tobe\') - ' ,_sliderClipper.find('.audioplayer,.audioplayer-tobe'));
              _sliderClipper.find('.audioplayer,.audioplayer-tobe').addClass('isotope-item');
              setTimeout(function(){

                _sliderClipper.prepend('<div class="grid-sizer"></div>');
                _sliderClipper.isotope({
                  // options
                  itemSelector: '.isotope-item',
                  layoutMode: 'fitRows',
                  percentPosition: true,
                  masonry: {
                    columnWidth: '.grid-sizer'
                  }
                });
                _sliderClipper.addClass('isotoped');
                setTimeout(function(){
                  _sliderClipper.isotope('layout')
                },900);
              },300);


              _sliderClipper.append('<div class="clear"></div>');
            }


            //console.log('dada2', skin_redlight_give_controls_right_to_all_players);


            if (skin_redlight_give_controls_right_to_all_players) {

              _sliderClipper.children('.audioplayer').each(function() {

                var _t = $(this);

                //console.log(_t);

                if (_t.find('.ap-controls-right').eq(0).prev().hasClass('controls-right') == false) {
                  _t.find('.ap-controls-right').eq(0).before('<div class="controls-right"> </div>');
                }
              });
            }

          }


          _navClipper.on('click','.menu-btn-like,.menu-facebook-share', click_menuitem);
          _navClipper.on('click','.menu-item', click_menuitem);
          cgallery.find('.download-after-rate').bind('click', click_downloadAfterRate);

          cgallery.get(0).api_regenerate_sync_players_with_this_playlist = regenerate_sync_players_with_this_playlist;
          cgallery.get(0).api_goto_next = goto_next;
          cgallery.get(0).api_goto_prev = goto_prev;
          cgallery.get(0).api_goto_item = goto_item;
          cgallery.get(0).api_gallery_handle_end = gallery_handle_end;
          cgallery.get(0).api_toggle_menu_state = toggle_menu_state;
          cgallery.get(0).api_handleResize = handleResize;
          cgallery.get(0).api_player_commentSubmitted = player_commentSubmitted;
          cgallery.get(0).api_player_rateSubmitted = player_rateSubmitted;
          cgallery.get(0).api_reinit = reinit;
          cgallery.get(0).api_play_curr_media = play_curr_media;
          cgallery.get(0).api_get_nr_children = get_nr_children;
          cgallery.get(0).api_init_player_from_gallery = init_player_from_gallery;
          cgallery.get(0).api_filter = filter;
          cgallery.get(0).api_destroy = destroy_gallery;


          setInterval(calculate_on_interval, 1000);



          setTimeout(init_loaded, 700);



          if (o.enable_easing == 'on') {

            handle_frame();
          }
          //console.log(cgallery);

          cgallery.addClass('dzsag-inited');

          cgallery.addClass('transition-' + o.transition);



        }


        function destroy_gallery() {


          if (destroyed) {
            return false;
          }





          // $(window).off('resize.dzsap');

          cgallery.remove();
          cgallery = null;

          destroyed = true;
        }

        function filter(argby, arg){
          if(!(argby)){
            argby = 'title';
          }

          const triage = function(argthis){


            var _t = $(this);
            if(this == window){
              _t = $(argthis);
            }
            var referenceVal = '';

            if(argby=='title'){
              referenceVal = _t.find('.the-name').text();
            }

            // console.log('$(this).find(\'.the-name\') - ',referenceVal, ' | ', arg);

            if(arg==''){
              return true;
            }
            if(referenceVal.toLowerCase().indexOf(arg.toLowerCase())>-1){
              return true;
            }
            return false;
            // console.log(arg2,this,arg);
          }
          if(_sliderClipper.hasClass('isotoped')){
            _sliderClipper.isotope({
              filter: triage
            });
          }else{
            _sliderClipper.children().each(function(){
              var sw = triage(this);
              // console.log('sw - ',sw);
              if(sw){
                $(this).fadeIn('fast');
              }else{

                // console.warn("OUT FAST");
                $(this).fadeOut('fast');
              }
            })
          }
        }

        function regenerate_sync_players_with_this_playlist(){

          // -- in case we play from playlist we overwrite whole footer playlist

          dzsap_list_for_sync_players = [];

          _sliderClipper.children('.audioplayer,.audioplayer-tobe').each(function(){
            var _t = $(this);
            _t.addClass('feeded-whole-playlist');

            if(_t.attr('data-do-not-include-in-list')!='on'){
              dzsap_list_for_sync_players.push(_t);
            }
          })
        }


        function init_parse_track_data(){

          if(trying_to_get_track_data){
            return false;
          }

          trying_to_get_track_data = true;

          var data = {
            action: 'dzsap_get_views_all',
            postdata: '1',
          };





          if (o.settings_php_handler) {
            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                //if(typeof window.console != "undefined" ){ console.log('Ajax - get - comments - ' + response); }

                cgallery.attr('data-track-data',response);
                parse_track_data();

              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };
              }
            });
          }


        }
        function parse_track_data(){
          if(cgallery.attr('data-track-data')){
            try{
              track_data = JSON.parse(cgallery.attr('data-track-data'));
            }catch (err){
              console.log(err);
            }
            var foundnr = 0;

            if(track_data && track_data.length){
              _navMain.find('.menu-item-views').each(function(){
                var _t2 = $(this);

                var aux_html = _t2.html();

                var reg_findid = /{{views_(.*?)}}/g;


                var aux = reg_findid.exec(aux_html);

                //console.log(aux);

                var id ='';
                if(aux && aux[1]) {

                  id = aux[1];

                  for(var i in track_data) {

                    //console.log(id, track_data[i].views, aux[0])

                    if(id==track_data[i].label || id=='ap'+track_data[i].label) {
                      aux_html = aux_html.replace(aux[0],track_data[i].views);
                      foundnr++;
                      break;
                    }
                  }


                  _t2.html(aux_html);

                }




              })

              //console.warn(foundnr, track_data.length);
              if(foundnr<track_data.length){

                _navMain.find('.menu-item-views').each(function(){

                  var _t2 = $(this);

                  var aux_html = _t2.html();
                  var reg_findid = /{{views_(.*?)}}/g;

                  var aux = reg_findid.exec(aux_html);

                  if(aux && aux[0]) {

                    aux_html = aux_html.replace(aux[0],0);
                    _t2.html(aux_html);
                  }

                })
              }
            }


          }

          //console.log(' track_data - ' ,track_data);
        }

        function get_nr_children(){ return nrChildren; }

        function find_player_id(arg){
          if(arg.attr('data-player-id')){
            return arg.attr('data-player-id');
          }else{
            if(arg.attr('id')){
              return arg.attr('id');
            }else{
              if(arg.attr('data-source')){
                return dzs_clean_string(arg.attr('data-source'));
              }
            }
          }
        }

        function reinit() {



          //console.log('reinit()', cgallery.find('.items').eq(0).children(), cgallery.find('.items').eq(0).children().length);

          var auxlen = cgallery.find('.items').eq(0).children('.audioplayer-tobe').length;
          arr_menuitems = [];

          var player_id = '';

          //console.log('reinit - ', cgallery.find('.items').eq(0).children());

          for (i = 0; i < auxlen; i++) {
            // -- construct palyers here
            var _c = cgallery.find('.items').children('.audioplayer-tobe').eq(0);

            //console.log('_c) - ',_c);


            var auxer = {
              'menu_description' : _c.find('.menu-description').html()
              ,'player_id' : find_player_id(_c)
            }

            arr_menuitems.push(auxer)
            //cgallery.find('.items').children().eq(0).find('.menu-description').remove();

            // console.log('_c - ',_c);


            _sliderClipper.append(_c);

            // if (o.settings_mode == 'mode-showall') {
            //   _c.wrap('<div class=""></div>')
            // }

          }







          // console.log(arr_menuitems);
          for (i = 0; i < arr_menuitems.length; i++) {
            var extra_class = '';
            if (arr_menuitems[i].menu_description && arr_menuitems[i].menu_description.indexOf('<div class="menu-item-thumb-con"><div class="menu-item-thumb" style="') == -1) {
              extra_class += ' no-thumb';
            }


            var aux = '<div class="menu-item' + extra_class + '"  data-menu-index="'+i+'" data-gallery-id="'+cid+'" data-playerid="'+arr_menuitems[i].player_id+'">'

            if(cgallery.hasClass('skin-aura')){
              aux+='<div class="menu-item-number">'+(++nrChildren)+'</div>';
            }

            aux+=arr_menuitems[i].menu_description;


            if(cgallery.hasClass('skin-aura') && String(arr_menuitems[i].menu_description).indexOf('menu-item-views')==1){

              if(track_data && track_data.length>0){

                aux+='<div class="menu-item-views"></div>';
              }else{

                init_parse_track_data();
                aux+='<div class="menu-item-views">'+svg_play_icon+' '+'<span class="the-count">{{views_'+arr_menuitems[i].player_id+'}}'+'</span></div>';
              }

            }



            aux+='</div>';

            _navClipper.append(aux);



            if(cgallery.hasClass('skin-aura')){

              if(arr_menuitems[i] && arr_menuitems[i].menu_description && arr_menuitems[i].menu_description.indexOf('float-right')>-1){
                _navClipper.children().last().addClass('has-extra-info')
              }
            }
            // nrChildren++;
          }
        }

        function init_loaded() {
          // -- gallery

          cgallery.addClass('dzsag-loaded');
        }

        function click_downloadAfterRate() {
          var _t = $(this);


          if (_t.hasClass('active') == false) {
            alert(str_alertBeforeRate)
            return false;
          }


        }


        function play_curr_media() {

          if (typeof(_sliderClipper.children().eq(currNr).get(0)) != 'undefined') {
            if (typeof(_sliderClipper.children().eq(currNr).get(0).api_play_media) != 'undefined') {
              _sliderClipper.children().eq(currNr).get(0).api_play_media({
                'call_from':'play_curr_media_gallery'
              });
            }

          }
        }

        function mode_showall_listen_for_play(arg) {

          //console.log('mode_showall_listen_for_play()',currNr, arg);

          if (o.settings_mode == 'mode-showall') {

            var ind = _sliderClipper.children('.audioplayer,.audioplayer-tobe').index(arg);
            //console.log(ind);
            currNr = ind;
            cgallery.get(0).currNr_2 = ind;
            //console.log(cgallery,currNr)
          }
          //console.log('mode_showall_listen_for_play()',currNr,this, cgallery.get(0).currNr_2);
        }

        function handle_frame() {

          // -- cgallery

          if (isNaN(target_viy)) {
            target_viy = 0;
          }

          if (duration_viy === 0) {
            requestAnimFrame(handle_frame);
            return false;
          }

          begin_viy = target_viy;
          change_viy = finish_viy - begin_viy;


          //console.log('handle_frame', finish_viy, duration_viy, target_viy);

          //console.log(duration_viy);


          target_viy = Number(Math.easeIn(1, begin_viy, change_viy, duration_viy).toFixed(4));;


          if (is_ios() == false && is_android() == false) {
            _navClipper.css({
              'transform': 'translateY(' + target_viy + 'px)'
            });
          }


          //console.log(_blackOverlay,target_bo);;

          requestAnimFrame(handle_frame);
        }

        function ajax_submit_like(argp, playerid,pargs) {
          //only handles ajax call + result
          var mainarg = argp;
          var data = {
            action: 'dzsap_submit_like',
            postdata: mainarg,
            playerid: playerid
          };

          var margs = {
            refferer : null
          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }

          //console.log(margs,pargs,o.settings_php_handler);



          if (o.settings_php_handler || cthis.hasClass('is-preview')) {

            $.ajax({
              type: "POST",
              url: o.settings_php_handler,
              data: data,
              success: function(response) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + response);
                }

                if(margs.refferer){
                  margs.refferer.addClass('active');
                }
              },
              error: function(arg) {
                if (typeof window.console != "undefined") {
                  // console.log('Got this from the server: ' + arg, arg);
                };
              }
            });
          }
        }

        function toggle_menu_state() {
          if (_navMain.height() == 0) {
            _navMain.css({
              'height': o.design_menu_height
            })


            cgallery.addClass('menu-opened');
          } else {

            _navMain.css({
              'height': 0
            })
            cgallery.removeClass('menu-opened');
          }
          setTimeout(function() {
            handleResize();
          }, 400); // -- animation delay
        }

        function gallery_handle_end() {

          if(o.autoplayNext=='on'){

            goto_next();
          }
        }

        function player_commentSubmitted() {
          _navClipper.children('.menu-item').eq(currNr).find('.download-after-rate').addClass('active');

        }

        function player_rateSubmitted() {
          _navClipper.children('.menu-item').eq(currNr).find('.download-after-rate').addClass('active');
        }

        function calculateDims() {
          //                console.log('calculateDims');


          // console.log('_sliderClipper.hasClass(\'isotoped\') - ',_sliderClipper.hasClass('isotoped'));
          if(o.settings_mode!='mode-showall' && _sliderClipper.hasClass('isotoped')==false && o.mode_normal_video_mode!='one') {
            // -- mode normal, not isotope
            if (_sliderClipper.children().eq(currNr).hasClass('zoomsounds-wrapper-bg-bellow') == false) {
              _sliderClipper.css('height', _sliderClipper.children().eq(currNr).outerHeight());

            }
          }

          if(_sliderClipper.hasClass('isotoped')==false){
            // -- not isotope
            setTimeout(function(){
              _sliderClipper.css('height', 'auto');
            },300);
          }

          //                _navMain.show();
          nc_maindim = _navMain.height();
          nm_maindim = _navClipper.outerHeight();

          //                return;
          //                console.log(nm_maindim, nc_maindim)




          // console.log('nc_maindim - ', nc_maindim);
          // console.log('nm_maindim - ', nm_maindim);
          if (nm_maindim > nc_maindim && nc_maindim > 0) {
            _navMain.unbind('mousemove', navMain_mousemove);
            _navMain.bind('mousemove', navMain_mousemove);
          } else {
            _navMain.unbind('mousemove', navMain_mousemove);
          }

          if (o.embedded == 'on') {
            //console.log(window.frameElement)
            if (window.frameElement) {
              window.frameElement.height = cgallery.height();
              //console.log(window.frameElement.height, cgallery.outerHeight())
            }
          }
        }


        function calculate_on_interval(){

          if(_navMain){

            nm_maindim = _navClipper.outerHeight();
          }

          if (o.gallery_gapless_play=='on' && time_total > 1 && time_curr >= time_total - 10 && time_curr>5) {
            var args = {
              'call_from':'gapless_play'
            }

            if(o.parentgallery && cthis.hasClass('active-from-gallery')){
              var _c = o.parentgallery;
              // console.log(_c);
              // console.log(_c.data('currNr'));


              var _cach = _sliderClipper.children().eq(Number(_c.data('currNr'))+1);


              if(!(_cach.data('gapless-inited')==true) ){

                var args = {
                  preload_method : "auto"
                  ,"autoplay":"off"
                  ,"call_from":"gapless_play"
                }


                // console.log('time_curr - ',time_curr);
                _c.get(0).api_init_player_from_gallery(_cach,args);

                _cach.data('gapless-inited',true);

                setTimeout(function(){
                  _cach.get(0).api_handleResize();
                },1000)
              }
            }
          }


          // console.log('nm_maindim - ' ,nc_maindim);
        }

        function navMain_mousemove(e) {
          var _t = $(this);
          var mx = e.pageX - _t.offset().left;
          var my = e.pageY - _t.offset().top;

          // console.log('navMain_mousemove', nm_maindim, nc_maindim, nm_maindim <= nc_maindim);
          if (nm_maindim <= nc_maindim) {
            return;
          }

          nc_maindim = _navMain.outerHeight();

          //console.log(mx);

          var vix = 0;
          var viy = 0;

          viy = (my / nc_maindim) * -(nm_maindim - nc_maindim + 10 + aux_error * 2) + aux_error;
          //console.log(viy);
          if (viy > 0) {
            viy = 0;
          }
          if (viy < -(nm_maindim - nc_maindim + 10)) {
            viy = -(nm_maindim - nc_maindim + 10);
          }

          finish_viy = viy;

          // console.log(viy, nm_maindim, nc_maindim, (my / nc_maindim))

          if (is_ios() == false && is_android() == false) {
            if (o.enable_easing != 'on') {
              _navClipper.css({
                'transform': 'translateY(' + finish_viy + 'px)'
              });
            }
          }


        }

        function click_menuitem(e) {
          var _t = $(this);

          if(e.type=='click'){
            if(_t.hasClass('menu-item')){
              var ind = _t.parent().children().index(_t);

              goto_item(ind);
            }
            if(_t.hasClass('menu-btn-like')){


              if(_t.parent().parent().attr('data-playerid')){
                ajax_submit_like(1,_t.parent().parent().attr('data-playerid'),{
                  refferer: _t
                });
              }

              //console.log(_t);
              return false;
            }
            if(_t.hasClass('menu-facebook-share')){


              if(_t.parent().parent().attr('data-playerid')){
                ajax_submit_like(1,_t.parent().parent().attr('data-playerid'),{
                  refferer: _t
                });
              }

              //console.log(_t);
              return false;
            }
          }

        }

        function handleResize() {

          if(o.settings_mode!='mode-showall' && _sliderClipper.hasClass('isotoped')==false) {
            setTimeout(function () {
              //console.log(_sliderClipper.children().eq(currNr), _sliderClipper.children().eq(currNr).height())
              _sliderClipper.css('height', _sliderClipper.children().eq(currNr).outerHeight());
            }, 500);
          }

          calculateDims();

        }

        function transition_end() {

          //console.log(_sliderClipper.children().eq(lastCurrNr));

          //_sliderClipper.children().eq(lastCurrNr).hide();

          // console.log('lastCurrNr - ',lastCurrNr);

          _sliderClipper.children().eq(lastCurrNr).removeClass('transitioning-out');
          _sliderClipper.children().eq(lastCurrNr).removeClass('active active-from-gallery');

          _sliderClipper.children().eq(currNr).removeClass('transitioning-in');
          lastCurrNr = currNr;
          busy = false;
        }

        function transition_bg_end() {
          cgallery.parent().children('.the-bg').eq(0).remove();
          busy = false;
        }

        function goto_prev() {
          tempNr = currNr;
          tempNr--;

          var sw_goto_item = true;


          if (tempNr < 0) {
            tempNr = _sliderClipper.children().length - 1;

            if(o.loop_playlist=='off'){
              sw_goto_item = false;
            }
          }

          if(sw_goto_item){

            goto_item(tempNr);
          }
        }

        function goto_next() {
          // console.warn('ag','goto_next()', currNr,cgallery.get(0).currNr_2);
          tempNr = currNr;






          var sw_goto_item = true;

          if (o.settings_mode == 'mode-showall') {
            tempNr = cgallery.get(0).currNr_2;
          }
          tempNr++;
          if (tempNr >= _sliderClipper.children().length) {
            tempNr = 0;

            if(o.loop_playlist=='off'){
              sw_goto_item = false;
            }
          }


          if(sw_goto_item){

            goto_item(tempNr);
          }
        }

        function goto_item(arg, pargs) {



          var margs = {

            'ignore_arg_currNr_check' : false
            ,'ignore_linking' : false // -- does not change the link if set to true
            ,donotopenlink : "off"
          }

          if(pargs){
            margs = $.extend(margs,pargs);
          }

          // console.log('goto_item()', arg,busy);

          if (busy == true) {
            return;
          }

          if (arg == "last") {
            arg = _sliderClipper.children().length - 1;
          }

          // console.log('goto_item()', arg,busy, arg=="last");



          if (currNr == arg) {

            if (_sliderClipper && _sliderClipper.children().eq(currNr).get(0) && _sliderClipper.children().eq(currNr).get(0).api_play_media) {
              _sliderClipper.children().eq(currNr).get(0).api_play_media({
                'call_from':'gallery'
              });
            }
            return;
          }

          _cache = _sliderClipper.children('.audioplayer,.audioplayer-tobe').eq(arg);

          // console.warn('_cache - ', _cache);
          // console.warn('currNr - ', currNr);
          var currNr_last_vol = '';

          if (currNr > -1) {
            if (typeof(_sliderClipper.children().eq(currNr).get(0)) != 'undefined') {
              if (typeof(_sliderClipper.children().eq(currNr).get(0).api_pause_media) != 'undefined') {
                _sliderClipper.children().eq(currNr).get(0).api_pause_media();
              }
              if (typeof(_sliderClipper.children().eq(currNr).get(0).api_get_last_vol) != 'undefined') {
                currNr_last_vol = _sliderClipper.children().eq(currNr).get(0).api_get_last_vol();
              }

            }


            if(o.mode_normal_video_mode=='one'){

            }else{

              if (o.settings_mode != 'mode-showall') {

                //console.log(o.transition);
                if (o.transition == 'fade') {
                  _sliderClipper.children().eq(currNr).removeClass('active active-from-gallery');
                  _navClipper.children().eq(currNr).removeClass('active active-from-gallery');
                  _sliderClipper.children().eq(currNr).addClass('transitioning-out');
                  _sliderClipper.children().eq(currNr).animate({

                  }, {
                    queue: false
                  });


                  setTimeout(transition_end, 300);

                  busy = true;
                }
                if (o.transition == 'direct') {
                  transition_end();
                }
              }
            }

          }


          // --  setting settings
          if (o.settings_ap.design_skin == 'sameasgallery') {
            o.settings_ap.design_skin = o.design_skin;
          }

          // console.log('o.settings_ap HERE IT IS 2 - ',$.extend({}, o.settings_ap), currNr);


          // console.log('%c o.autoplay from gallery - ','background-color: #dadada;',o.autoplay);

          // -- if this is  the first audio
          if (currNr == -1 && o.autoplay == 'on') {
            o.settings_ap.autoplay = 'on';
          }
          // console.log('o.settings_ap HERE IT IS 24 - ',$.extend({}, o.settings_ap));

          // -- if this is not the first audio
          if (currNr > -1 && o.autoplayNext == 'on') {
            o.settings_ap.autoplay = 'on';
          }
          o.settings_ap.parentgallery = cgallery;

          o.settings_ap.design_menu_show_player_state_button = o.design_menu_show_player_state_button;
          o.settings_ap.cue = 'on';
          if (first == true) {
            if (o.cueFirstMedia == 'off') {
              o.settings_ap.cue = 'off';
            }

            first = false;
          }

          // -- setting settings END



          var args_player = $.extend({}, o.settings_ap);

          // console.log('o.settings_ap HERE IT IS 3 - ',$.extend({}, o.settings_ap));

          args_player.volume_from_gallery = currNr_last_vol;
          args_player.call_from = 'gotoItem';
          args_player.player_navigation = o.player_navigation;

          // console.log('lets init player here', arg);
          if(o.mode_normal_video_mode=='one' && arg>0){


            // console.error('lets init player here', arg);

            var _c = _sliderClipper.children().eq(currNr).get(0);

            if(_c){
              if(_c.api_play_media){

                console.log('_sliderClipper.children().eq(arg) - ',_sliderClipper.children().eq(arg));
                _c.api_change_media(_sliderClipper.children().eq(arg),{
                  'call_from':'goto_item -- mode_normal_video_mode'
                  // ,'fakeplayer_is_feeder':'on'
                });

                if (o.autoplayNext == 'on') {
                  setTimeout(function()
                  {


                    _c.api_play_media();
                  },200);
                }
              }
            }
          }else{

            // -- init player from gallery
            init_player_from_gallery(_cache, args_player);

            if (o.autoplayNext == 'on') {
              if (o.settings_mode == 'mode-showall') {
                currNr = cgallery.get(0).currNr_2;
              }
              if (currNr > -1 && _cache.get(0) && _cache.get(0).api_play) {
                _cache.get(0).api_play();
              }
            }
          }


          dzsap_currplayer_focused = _cache.get(0);



          if (o.settings_mode != 'mode-showall') {
            if (o.transition == 'fade') {
              _cache.css({})
              _cache.animate({}, {
                queue: false
              })

            }
            if (o.transition == 'direct') {

            }

            _cache.addClass('transitioning-in');




            if(_cache.attr('data-type')!='link'){
              if(margs.ignore_linking==false && o.settings_enable_linking=='on'){
                var stateObj = { foo: "bar" };
                history.pushState(stateObj, null, add_query_arg(window.location.href, 'audiogallery_startitem_'+cid, (arg)));
              }
            }
          }

          _cache.addClass('active active-from-gallery');
          _navClipper.children().eq(arg).addClass('active active-from-gallery');

          // -- background parent

          // console.log('_cache - ',_cache);


          var bgimage = '';

          if (_cache.attr("data-bgimage")){
            bgimage = _cache.attr("data-bgimage");
          }

          if (_cache.attr("data-wrapper-image")){
            bgimage = _cache.attr("data-wrapper-image");
          }


          if (bgimage && cgallery.parent().hasClass('ap-wrapper') && cgallery.parent().children('.the-bg').length > 0) {

            // console.warn("ENTER HIER");
            cgallery.parent().children('.the-bg').eq(0).after('<div class="the-bg" style="background-image: url(' + bgimage + ');"></div>')
            cgallery.parent().children('.the-bg').eq(0).css({
              'opacity': 1
            })


            cgallery.parent().children('.the-bg').eq(1).css({
              'opacity': 0
            })
            cgallery.parent().children('.the-bg').eq(1).animate({
              'opacity': 1
            }, {
              queue: false,
              duration: 1000,
              complete: transition_bg_end,
              step: function() {
                busy = true;
              }
            })
            busy = true;
          }


          //console.log('set currNr', currNr, o.settings_mode);

          if (o.settings_mode != 'mode-showall') {

            currNr = arg;

            cgallery.data('currNr',currNr);
          }



          //console.log('_sliderClipper.children().eq(currNr) - ',_sliderClipper.children().eq(currNr));
          if(_sliderClipper.children().eq(currNr).get(0) && _sliderClipper.children().eq(currNr).get(0).api_handleResize && _sliderClipper.children().eq(currNr).hasClass('media-setuped')){


            //console.log('_sliderClipper.children().eq(currNr) - ',_sliderClipper.children().eq(currNr));
            _sliderClipper.children().eq(currNr).get(0).api_handleResize();
          }

          calculateDims();
        }

        function init_player_from_gallery(_cache, pargs){

          var margs_player = $.extend({}, o.settings_ap);


          if(pargs){
            margs_player = $.extend(margs_player,pargs);
          }

          // console.log('init_player_from_gallery',margs_player);
          // console.log('currNr_last_vol', currNr_last_vol);

          if (_cache.hasClass('audioplayer-tobe')) {
            o.settings_ap.call_from = 'init player from gallery';
            _cache.audioplayer(margs_player);
          }
        }
      });
    }

    window.dzsag_init = function(selector, settings) {


      if (typeof(settings) != "undefined" && typeof(settings.init_each) != "undefined" && settings.init_each == true) {
        var element_count = 0;
        for (var e in settings) {
          element_count++;
        }
        if (element_count == 1) {
          settings = undefined;
        }

        $(selector).each(function() {
          var _t = $(this);
          _t.audiogallery(settings)
        });
      } else {
        $(selector).audiogallery(settings);
      }
    };

  })(jQuery);
}





function register_dzsap_aux_script (){
  jQuery(document).ready(function ($) {


    // -- main call
    // console.log('song changers -> ', $('.audioplayer-song-changer'));


    $('body').append('<style class="dzsap--style"></style>');

    window.dzsap__style = $('.dzsap--style');

    $(window).on('resize.dzsapmain', handle_resize_dzsap_main);

    // -- remove focus on input focus
    $(document).on('focus.dzsap','input',function(){
      // console.log("FOCUS - ");
      window.dzsap_currplayer_focused = null;
    })

    var inter_resize = 0;

    function handle_resize_dzsap_main() {

      clearTimeout(inter_resize);
      inter_resize = setTimeout(function () {
        handle_resize_dzsap_main_doit();
      }, 300)


    }

    function handle_resize_dzsap_main_doit() {

      // console.log('$(\'.dzsap-sticktobottom\') - ',$('.dzsap-sticktobottom'));
      if ($('.dzsap-sticktobottom').length) {


        dzsap_sticktobottom_con = $('.dzsap-sticktobottom').eq(0);
      }

      if (dzsap_sticktobottom_con) {
        // console.log('dzsap_sticktobottom_con - ',dzsap_sticktobottom_con);

        var aux = 'body .dzsap-sticktobottom:not(.audioplayer-loaded)';

        // console.warn('dzsap_sticktobottom_con.outerHeight() - ',dzsap_sticktobottom_con.outerHeight());
        aux += '{';
        aux += 'bottom: -' + (dzsap_sticktobottom_con.outerHeight()) + 'px';
        aux += '}';

        window.dzsap__style.html(aux);

      }
    }

    handle_resize_dzsap_main();

    $('audio.zoomsounds-from-audio').each(function () {
      var _t = $(this);
      //console.log(_t);

      _t.after('<div class="audioplayer-tobe auto-init skin-silver" data-source="' + _t.attr('src') + '"></div>');

      _t.remove();
    })


    $('.audioplayer,.audioplayer-tobe').each(function () {
      var _t2 = $(this);

      if (_t2.hasClass('auto-init')) {
        if (_t2.hasClass('audioplayer-tobe') == true) {

          if (window.dzsap_init) {

            dzsap_init(_t2, {
              init_each: true
            });
          }
        }
      }


    })

    //console.log('dzsap_list_for_sync_players - ', dzsap_list_for_sync_players);

    //console.log($('.zoomvideogallery.auto-init'));

    dzsag_init('.audiogallery.auto-init', {
      init_each: true
    });


    // console.log('we are hier');

    $(document).on('click.dzsap_metas', '.audioplayer-song-changer, .dzsap-wishlist-but', function () {
      var _t = $(this);

      // conso

      if (_t.hasClass('audioplayer-song-changer')) {

        // console.log('.audioplayer-song-changer', _t);
        var _c = $(_t.attr('data-fakeplayer')).eq(0);
        // console.log(_t, _t.attr('data-fakeplayer'), _t.attr('data-target'), _c, _c.get(0));


        if (_c && _c.get(0) && _c.get(0).api_change_media) {

          _c.get(0).api_change_media(_t, {
            'feeder_type': 'button'
            , 'call_from': 'changed audioplayer-song-changer'
          });
        }

        return false;
      }

      if (_t.hasClass('dzsap-wishlist-but')) {


        var data = {
          action: 'dzsap_add_to_wishlist',
          playerid: _t.attr('data-post_id'),
          wishlist_action: 'add',
        };


        if (_t.find('.svg-icon').hasClass('fa-star')) {
          data.wishlist_action = 'remove';
        }


        if (window.dzsap_lasto.settings_php_handler) {
          $.ajax({
            type: "POST",
            url: window.dzsap_lasto.settings_php_handler,
            data: data,
            success: function (response) {
              //if(typeof window.console != "undefined" ){ console.log('Ajax - get - comments - ' + response); }


              if (_t.find('.svg-icon').hasClass('fa-star-o')) {
                _t.find('.svg-icon').eq(0).attr('class', 'svg-icon fa fa-star');
              } else {

                _t.find('.svg-icon').eq(0).attr('class', 'svg-icon fa fa-star-o');
              }

            },
            error: function (arg) {
              if (typeof window.console != "undefined") {
                // console.log('Got this from the server: ' + arg, arg);
              }
              ;
            }
          });
        }

        return false;


      }

    })

    // console.warn('\'.dzsap-sticktobottom .icon-hide\' -' ,$('.dzsap-sticktobottom .icon-hide'));

    $(document).on('click.dzsiconhide', '.sticktobottom-close-con', function () {
      var _t = $(this);

      $('.dzsap-sticktobottom .audioplayer').get(0).api_pause_media();


      // console.log('_t -',_t);

      var _con = null;

      if (_t.parent().hasClass("dzsap-sticktobottom")) {
        _con = _t.parent();
      }
      if (_t.parent().parent().hasClass("dzsap-sticktobottom")) {
        _con = _t.parent().parent();
      }
      if (_t.parent().parent().parent().hasClass("dzsap-sticktobottom")) {
        _con = _t.parent().parent().parent();
      }

      console.log('_con - ',_con, _con.hasClass('audioplayer-loaded'));

      if (_con.hasClass('audioplayer-loaded')) {

        _con.removeClass('audioplayer-loaded');
        _con.addClass('audioplayer-was-loaded');


      } else {

        _con.addClass('audioplayer-loaded');
        _con.addClass('audioplayer-was-loaded');
      }

      return false;
    });
    $(document).on('click.dzsiconshow', '.dzsap-sticktobottom .icon-show', function () {
      var _t = $(this);


      // _t.parent().parent().addClass('audioplayer-loaded');
      // _t.parent().parent().removeClass('audioplayer-was-loaded');
      //
      // _t.parent().parent().parent().addClass('audioplayer-loaded');
      // _t.parent().parent().parent().removeClass('audioplayer-was-loaded');

      return false;
    })

    if ($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver').length > 0) {
      setInterval(function () {

        //console.log($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver > .audioplayer').eq(0).hasClass('dzsap-loaded'));
        if ($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver  .audioplayer').eq(0).hasClass('dzsap-loaded')) {
          $('.dzsap-sticktobottom-placeholder').eq(0).addClass('active');

          if ($('.dzsap-sticktobottom').hasClass('audioplayer-was-loaded') == false) {

            $('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver').addClass('audioplayer-loaded')
          }
        }
      }, 1000);
    }
    if ($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave').length > 0) {
      setInterval(function () {

        // console.log($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer'), $('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer').eq(0).hasClass('dzsap-loaded'));
        if ($('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer').eq(0).hasClass('dzsap-loaded')) {
          $('.dzsap-sticktobottom-placeholder').eq(0).addClass('active');

          if ($('.dzsap-sticktobottom').hasClass('audioplayer-was-loaded') == false) {

            $('.dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave').addClass('audioplayer-loaded')
          }
        }


      }, 1000);
    }


    // $(document).off('click.dzsap_multisharer');
    $(document).on('click.dzsap_multisharer', '.dzsap-multisharer-but', click_open_embed_ultibox);

    function click_open_embed_ultibox(e, pargs) {

      var margs = {
        'call_from': 'default'


      };

      if (pargs) {
        margs = $.extend(margs, pargs);
      }


      open_dzsap_lightbox({
        'call_from': 'click_open_embed_ultibox'
        , 'lightbox_open': 'share'
        , 'overwrite_this': this
      })


      return false;
    }


    function open_dzsap_lightbox(pargs) {

      var margs = {
        'call_from': 'default'
        , 'lightbox_open': 'share'
        , 'overwrite_this': null

      };

      if (pargs) {
        margs = $.extend(margs, pargs);
      }


      // console.log('ceva');

      var _c_mc = window.dzsap_box_main_con;
      var _t = $(this);


      if (margs.overwrite_this) {
        _t = $(margs.overwrite_this);
      }
      // console.log('open_dzsap_lightbox() _c -> ',_c_mc, _c_mc.find('.social-networks-con'), 'margs - ',margs);


      if (_t.data('cthis')) {
        var cthis = _t.data('cthis');

        console.log('found cthis in data');
      }

      if (cthis) {

        window.dzsap_currplayer_from_share = cthis;
      } else {

        if (_t.attr('data-post_id')) {
          window.dzsap_currplayer_from_share = $('.audioplayer[data-playerid="' + _t.attr('data-post_id') + '"]')
        } else {

          if (_t.parent().parent().parent().parent().parent().parent().hasClass('audioplayer')) {

            // console.log("YES");
            window.dzsap_currplayer_from_share = _t.parent().parent().parent().parent().parent().parent();
          }
        }
      }


      // console.log('window.dzsap_currplayer_from_share -> ', window.dzsap_currplayer_from_share);


      console.log('_t -> ', _t, _t.data('cthis'));
      console.log('window.dzsap_currplayer_from_share -> ', window.dzsap_currplayer_from_share);


      var aux = '';

      if (window.dzsap_social_feed_for_social_networks) {
        aux = window.dzsap_social_feed_for_social_networks;
      }

      // -- aux is feed from social_feed


      if (window.dzsap_box_main_con) {

        console.log('window.dzsap_box_main_con - ', window.dzsap_box_main_con);

        window.dzsap_box_main_con.find('.social-networks-con').html(aux);


        aux = '';
        if (window.dzsap_social_feed_for_share_link) {
          aux = window.dzsap_social_feed_for_share_link;
        }


        if (aux) {


          // console.warn('_t - ',_t);


          var newloc = window.location.href;


          if (_t.attr('data-post-url')) {
            newloc = _t.attr('data-post-url');
          }


          aux = aux.replace('{{replacewithcurrurl}}', newloc);
          aux = aux.replace('{{replacewithdataurl}}', newloc);
          window.dzsap_box_main_con.find('.share-link-con').html(aux);
        }

        var aux_social = '';
        if (window.dzsap_social_feed_for_embed_link) {
          aux_social = window.dzsap_social_feed_for_embed_link;
        }


        // console.log(' o - ',o, cthis,'dzsap_currplayer_from_share - ',dzsap_currplayer_from_share);
        if (window.dzsap_currplayer_from_share && dzsap_currplayer_from_share.data('embed_code')) {

          console.log('o.embed_code - ', dzsap_currplayer_from_share.data('embed_code'));

          if (aux_social) {

            var replace_str = dzsap_currplayer_from_share.data('embed_code');

            if (replace_str.indexOf('&lt;') == -1) {
              replace_str = htmlEntities(replace_str);
            }
            aux_social = aux_social.replace('{{replacewithembedcode}}', (replace_str));
            _c_mc.find('.embed-link-con').html(aux_social);
          }

        }

        // console.log('_c_mc - ',_c_mc);
        // console.log('o.embed_code - ',o.embed_code);
        // console.log('aux_social - ',aux_social);

        $(document).on('click.dzsap', '.field-for-view', function () {

          console.log("select all test ", this);
          selectText(this);

          // $(this).select();
        });
        _c_mc.addClass('loading-box-main-' + margs.lightbox_open);
        setTimeout(function () {

          _c_mc.addClass('loading-item');


        }, 100);

        setTimeout(function () {
          _c_mc.addClass('loaded-item');
        }, 200);


      } else {
        console.log('warning missing box-main');
      }
    }

    function selectText(arg) {
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(arg);
        range.select();
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(arg);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }


    $(document).on('keydown.dzsapkeyup keypress.dzsapkeyup', function (e) {
      // console.log('e - ',e);
      // console.log('dzsap_currplayer_focused - ',dzsap_currplayer_focused);

      // -- local .. step back / step forward


      var keyboard_controls = $.extend({}, dzsap_generate_keyboard_controls());
      // console.log('keyboard_controls.pause_play - ',keyboard_controls.pause_play);
      // console.log('keyboard_controls - ',keyboard_controls);

      // console.log('e.keyCode - ',e.keyCode, keyboard_controls);

      if (dzsap_currplayer_focused && dzsap_currplayer_focused.api_pause_media) {

        var sw_pressed;


        sw_pressed = false;
        if (keyboard_controls.pause_play.indexOf('ctrl+') > -1) {

          if (e.ctrlKey) {
            keyboard_controls.pause_play = keyboard_controls.pause_play.replace('ctrl+', '');

            if (e.keyCode == keyboard_controls.pause_play) {

              sw_pressed = true;
            }
          }

        } else {

          if (e.keyCode == keyboard_controls.pause_play) {

            sw_pressed = true;
          }
        }


        if (sw_pressed) {

          if ($(dzsap_currplayer_focused).hasClass('comments-writer-active') == false) {

            if ($(dzsap_currplayer_focused).hasClass('is-playing')) {

              dzsap_currplayer_focused.api_pause_media();

            } else {

              dzsap_currplayer_focused.api_play_media();
            }


            if (window.dzsap_mouseover) {

              e.preventDefault();
              return false;
            }
          }
        }


        sw_pressed = false;
        if (keyboard_controls.step_back.indexOf('ctrl+') > -1) {

          if (e.ctrlKey) {
            keyboard_controls.step_back = keyboard_controls.step_back.replace('ctrl+', '');
            if (e.keyCode == keyboard_controls.step_back) {


              sw_pressed = true;

            }
          }
        } else {

          if (e.keyCode == keyboard_controls.step_back) {


            sw_pressed = true;

          }
        }

        if (sw_pressed) {


          dzsap_currplayer_focused.api_step_back(keyboard_controls.step_back_amount);

        }

        sw_pressed = false;

        if (keyboard_controls.step_forward.indexOf('ctrl+') > -1) {

          if (e.ctrlKey) {
            keyboard_controls.step_forward = keyboard_controls.step_forward.replace('ctrl+', '');
            if (e.keyCode == keyboard_controls.step_forward) {

              sw_pressed = true;

            }
          }
        } else {
          if (e.keyCode == keyboard_controls.step_forward) {

            sw_pressed = true;

          }
        }

        if (sw_pressed) {


          dzsap_currplayer_focused.api_step_forward(keyboard_controls.step_back_amount);

        }

        sw_pressed = false;

        if (e.keyCode == keyboard_controls.sync_players_goto_next) {
          sw_pressed = true;
        }

        if (sw_pressed) {
          if (dzsap_currplayer_focused && dzsap_currplayer_focused.api_sync_players_goto_next) {
            dzsap_currplayer_focused.api_sync_players_goto_next();
          }
        }


        sw_pressed = false;

        if (e.keyCode == keyboard_controls.sync_players_goto_prev) {
          sw_pressed = true;

        }

        if (sw_pressed) {
          if (dzsap_currplayer_focused && dzsap_currplayer_focused.api_sync_players_goto_prev) {
            dzsap_currplayer_focused.api_sync_players_goto_prev();
          }
        }


      }
    })


    $(document).on('keydown blur', '.zoomsounds-search-field', function (e) {

      // console.info(e.currentTarget.value);
      var _t = $(e.currentTarget);

      setTimeout(function () {

        if (_t) {
          var _target = $('.audiogallery').eq(0);
          if (_t.attr('data-target')) {
            _target = $(_t.attr('data-target'));
          }
          if (_target.get(0) && _target.get(0).api_filter) {

            _target.get(0).api_filter('title', _t.val());
          }
        }
      }, 100);

    });


    $(document).on('click', '.dzsap-like-but', function (e) {

      var _t = $(this);


      var playerid = _t.attr('data-post_id');

      if (playerid && playerid != '0') {

      } else {
        if (_t.parent().parent().parent().parent().parent().hasClass('audioplayer')) {

          playerid = _t.parent().parent().parent().parent().parent().attr('data-feed-playerid');
        }
      }
      window.dzsap_submit_like(playerid, e);

      _t.removeClass('dzsap-like-but').addClass('dzsap-retract-like-but');

      return false;
    })

    $(document).on('click', '.dzsap-retract-like-but', function (e) {

      var _t = $(this);
      var playerid = _t.attr('data-post_id');

      if (playerid && playerid != '0') {

      } else {
        if (_t.parent().parent().parent().parent().parent().hasClass('audioplayer')) {

          playerid = _t.parent().parent().parent().parent().parent().attr('data-feed-playerid');
        }
      }


      window.dzsap_retract_like(playerid, e);
      _t.addClass('dzsap-like-but').removeClass('dzsap-retract-like-but');
      return false;
    })

    window.dzsap_submit_like = function (argp, e) {
      //only handles ajax call + result
      var mainarg = argp;
      var data = {
        action: 'dzsap_submit_like',
        playerid: argp
      };

      var _t = null;

      if (e) {
        _t = $(e.currentTarget);
      }


      if (window.dzsap_settings && window.dzsap_settings.ajax_url) {

        $.ajax({
          type: "POST",
          url: window.dzsap_settings.ajax_url,
          data: data,
          success: function (response) {
            if (typeof window.console != "undefined") {
              console.log('Got this from the server: ' + response);
            }


            if (_t) {

              var htmlaux = _t.html();

              _t.html(htmlaux.replace('fa-heart-o', 'fa-heart'));
            }

          },
          error: function (arg) {
            if (typeof window.console != "undefined") {
              // console.log('Got this from the server: ' + arg, arg);
            }
            ;
          }
        });
      }
    }
    window.dzsap_retract_like = function (argp, e) {
      //only handles ajax call + result
      var mainarg = argp;
      var data = {
        action: 'dzsap_retract_like',
        playerid: argp
      };

      var _t = null;

      if (e) {
        _t = $(e.currentTarget);
      }


      if (window.dzsap_settings && window.dzsap_settings.ajax_url) {

        $.ajax({
          type: "POST",
          url: window.dzsap_settings.ajax_url,
          data: data,
          success: function (response) {
            if (typeof window.console != "undefined") {
              console.log('Got this from the server: ' + response);
            }


            if (_t) {
              var htmlaux = _t.html();

              _t.html(htmlaux.replace('fa-heart', 'fa-heart-o'));
            }

          },
          error: function (arg) {
            if (typeof window.console != "undefined") {
              // console.log('Got this from the server: ' + arg, arg);
            }
            ;
          }
        });
      }
    }


  });


  jQuery.fn.textWidth = function() {
    var _t = jQuery(this);
    var html_org = _t.html();
    if (_t[0].nodeName == 'INPUT') {
      html_org = _t.val();
    }
    var html_calcS = '<span class="forcalc">' + html_org + '</span>';
    jQuery('body').append(html_calcS);
    var _lastspan = jQuery('span.forcalc').last();
    //console.log(_lastspan, html_calc);
    _lastspan.css({
      'font-size': _t.css('font-size'),
      'font-family': _t.css('font-family')
    })
    var width = _lastspan.width();
    //_t.html(html_org);
    _lastspan.remove();
    return width;
  };

}


function is_ie() {
  if (navigator.appVersion.indexOf("MSIE") != -1) {
    return true;
  };
  return false;
};

function is_firefox() {
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    return true;
  };
  return false;
};

function is_opera() {
  if (navigator.userAgent.indexOf("Opera") != -1) {
    return true;
  };
  return false;
};

function is_chrome() {
  return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
};

function is_safari() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
}

function version_ie() {
  return parseFloat(navigator.appVersion.split("MSIE")[1]);
};

function version_firefox() {
  if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    var aversion = new Number(RegExp.$1);
    return (aversion);
  };
};

function version_opera() {
  if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    var aversion = new Number(RegExp.$1);
    return (aversion);
  };
};




function can_play_mp3() {
  var a = document.createElement('audio');
  return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

function can_canvas() {
  // check if we have canvas support
  var oCanvas = document.createElement("canvas");
  if (oCanvas.getContext("2d")) {
    return true;
  }
  return false;
}

function onYouTubeIframeAPIReady() {


  for (i = 0; i < dzsap_yt_list.length; i++) {
    //console.log(dzsap_list[i].get(0).fn_yt_ready);
    if (dzsap_yt_list[i].get(0) != undefined && typeof dzsap_yt_list[i].get(0).fn_yt_ready != 'undefined') {
      dzsap_yt_list[i].get(0).fn_yt_ready();
    }
  }
}



window.requestAnimFrame = (function() {
  //console.log(callback);
  // return function( callback,element) {
  //     console.log('wow');
  //     window.setTimeout(callback, 1000 / 2);
  // };;
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();






var MD5=function(e){function g(a,d){var b=a&2147483648;var c=d&2147483648;var e=a&1073741824;var f=d&1073741824;var p=(a&1073741823)+(d&1073741823);return e&f?p^2147483648^b^c:e|f?p&1073741824?p^3221225472^b^c:p^1073741824^b^c:p^b^c}function h(b,c,a,d,e,f,n){b=g(b,g(g(c&a|~c&d,e),n));return g(b<<f|b>>>32-f,c)}function k(b,c,a,d,e,f,n){b=g(b,g(g(c&d|a&~d,e),n));return g(b<<f|b>>>32-f,c)}function l(b,c,d,a,e,f,n){b=g(b,g(g(c^d^a,e),n));return g(b<<f|b>>>32-f,c)}function m(b,c,d,a,e,f,n){b=g(b,g(g(d^
  (c|~a),e),n));return g(b<<f|b>>>32-f,c)}function q(b){var c="",d;for(d=0;3>=d;d++){var a=b>>>8*d&255;a="0"+a.toString(16);c+=a.substr(a.length-2,2)}return c}var f=[];e=function(b){b=b.replace(/\r\n/g,"\n");for(var c="",d=0;d<b.length;d++){var a=b.charCodeAt(d);128>a?c+=String.fromCharCode(a):(127<a&&2048>a?c+=String.fromCharCode(a>>6|192):(c+=String.fromCharCode(a>>12|224),c+=String.fromCharCode(a>>6&63|128)),c+=String.fromCharCode(a&63|128))}return c}(e);f=function(b){var c=b.length;var a=c+8;for(var d=
  16*((a-a%64)/64+1),e=Array(d-1),f,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(e);var a=1732584193;var d=4023233417;var b=2562383102;var c=271733878;for(e=0;e<f.length;e+=16){var r=a;var t=d;var u=b;var v=c;a=h(a,d,b,c,f[e+0],7,3614090360);c=h(c,a,d,b,f[e+1],12,3905402710);b=h(b,c,a,d,f[e+2],17,606105819);d=h(d,b,c,a,f[e+3],22,3250441966);a=h(a,d,b,c,f[e+4],7,4118548399);c=h(c,a,d,b,f[e+5],12,1200080426);b=h(b,c,a,d,f[e+
6],17,2821735955);d=h(d,b,c,a,f[e+7],22,4249261313);a=h(a,d,b,c,f[e+8],7,1770035416);c=h(c,a,d,b,f[e+9],12,2336552879);b=h(b,c,a,d,f[e+10],17,4294925233);d=h(d,b,c,a,f[e+11],22,2304563134);a=h(a,d,b,c,f[e+12],7,1804603682);c=h(c,a,d,b,f[e+13],12,4254626195);b=h(b,c,a,d,f[e+14],17,2792965006);d=h(d,b,c,a,f[e+15],22,1236535329);a=k(a,d,b,c,f[e+1],5,4129170786);c=k(c,a,d,b,f[e+6],9,3225465664);b=k(b,c,a,d,f[e+11],14,643717713);d=k(d,b,c,a,f[e+0],20,3921069994);a=k(a,d,b,c,f[e+5],5,3593408605);c=k(c,
  a,d,b,f[e+10],9,38016083);b=k(b,c,a,d,f[e+15],14,3634488961);d=k(d,b,c,a,f[e+4],20,3889429448);a=k(a,d,b,c,f[e+9],5,568446438);c=k(c,a,d,b,f[e+14],9,3275163606);b=k(b,c,a,d,f[e+3],14,4107603335);d=k(d,b,c,a,f[e+8],20,1163531501);a=k(a,d,b,c,f[e+13],5,2850285829);c=k(c,a,d,b,f[e+2],9,4243563512);b=k(b,c,a,d,f[e+7],14,1735328473);d=k(d,b,c,a,f[e+12],20,2368359562);a=l(a,d,b,c,f[e+5],4,4294588738);c=l(c,a,d,b,f[e+8],11,2272392833);b=l(b,c,a,d,f[e+11],16,1839030562);d=l(d,b,c,a,f[e+14],23,4259657740);
  a=l(a,d,b,c,f[e+1],4,2763975236);c=l(c,a,d,b,f[e+4],11,1272893353);b=l(b,c,a,d,f[e+7],16,4139469664);d=l(d,b,c,a,f[e+10],23,3200236656);a=l(a,d,b,c,f[e+13],4,681279174);c=l(c,a,d,b,f[e+0],11,3936430074);b=l(b,c,a,d,f[e+3],16,3572445317);d=l(d,b,c,a,f[e+6],23,76029189);a=l(a,d,b,c,f[e+9],4,3654602809);c=l(c,a,d,b,f[e+12],11,3873151461);b=l(b,c,a,d,f[e+15],16,530742520);d=l(d,b,c,a,f[e+2],23,3299628645);a=m(a,d,b,c,f[e+0],6,4096336452);c=m(c,a,d,b,f[e+7],10,1126891415);b=m(b,c,a,d,f[e+14],15,2878612391);
  d=m(d,b,c,a,f[e+5],21,4237533241);a=m(a,d,b,c,f[e+12],6,1700485571);c=m(c,a,d,b,f[e+3],10,2399980690);b=m(b,c,a,d,f[e+10],15,4293915773);d=m(d,b,c,a,f[e+1],21,2240044497);a=m(a,d,b,c,f[e+8],6,1873313359);c=m(c,a,d,b,f[e+15],10,4264355552);b=m(b,c,a,d,f[e+6],15,2734768916);d=m(d,b,c,a,f[e+13],21,1309151649);a=m(a,d,b,c,f[e+4],6,4149444226);c=m(c,a,d,b,f[e+11],10,3174756917);b=m(b,c,a,d,f[e+2],15,718787259);d=m(d,b,c,a,f[e+9],21,3951481745);a=g(a,r);d=g(d,t);b=g(b,u);c=g(c,v)}return(q(a)+q(d)+q(b)+
  q(c)).toLowerCase()};




window.dzsap_currplayer_focused = null;
window.dzsap_currplayer_from_share = null;
window.dzsap_mouseover = false;

window.dzs_open_social_link = function(arg,argthis){
  var leftPosition, topPosition;
  var w = 500, h= 500;
  //Allow for borders.
  leftPosition = (window.screen.width / 2) - ((w / 2) + 10);
  //Allow for title and status bars.
  topPosition = (window.screen.height / 2) - ((h / 2) + 50);
  var windowFeatures = "status=no,height=" + h + ",width=" + w + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";




  console.log('dzs_open_social_link()',arg,'argthis - ', argthis);


  arg = arg.replace('{{replacewithcurrurl}}',encodeURIComponent(window.location.href));
  if(argthis){

    arg = arg.replace(/{{replacewithdataurl}}/g,argthis.attr('data-url'));
  }

  var aux = window.location.href;


  var auxa = aux.split('?');

  var cid = '';
  var cid_gallery = '';



  if(argthis){

  }else{
    if(window.dzsap_currplayer_from_share){

      argthis = window.dzsap_currplayer_from_share;
    }
  }




  // console.log('window.dzsap_currplayer_from_share -> ', window.dzsap_currplayer_from_share);
  // console.log('argthis -> ', argthis);


  if(argthis){

    var $ = jQuery;

    if($(argthis).hasClass('audioplayer')){
      cid = $(argthis).parent().children().index(argthis);
      cid_gallery = $(argthis).parent().parent().parent().attr('id');
    }else{
      if(jQuery(argthis).parent().parent().attr('data-menu-index')){

        cid = jQuery(argthis).parent().parent().attr('data-menu-index');
      }
      if(jQuery(argthis).parent().parent().attr('data-gallery-id')){

        cid_gallery = jQuery(argthis).parent().parent().attr('data-gallery-id');
      }
    }

  }


  var shareurl = encodeURIComponent(auxa[0]+'?fromsharer=on&audiogallery_startitem_'+cid_gallery+'='+cid+'');
  arg = arg.replace('{{shareurl}}',shareurl);

  console.log('shareurl -> ',shareurl);

  //console.log(argthis);
  //console.log('arg - ',arg);
  window.open(arg,"sharer", windowFeatures);
}

function formatTime(arg) {
  //formats the time
  var s = Math.round(arg);
  var m = 0;
  if (s > 0) {
    while (s > 59) {
      m++;
      s -= 60;
    }
    return String((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
  } else {
    return "00:00";
  }
}


function dzsap_send_total_time(argtime,argcthis){



  // console.log('dzsap_send_total_time()',argtime,argcthis);

  var data = {
    action: 'dzsap_send_total_time_for_track'
    ,id_track: argcthis.attr('data-playerid')
    ,postdata: parseInt(argtime,10)
  };
  jQuery.post(window.dzsap_ajaxurl, data, function(response) {
    if(window.console != undefined){
      console.log('Got this from the server: ' + response);
    }



  });

}


function dzs_clean_string(arg){

  if(arg){

    arg = arg.replace(/[^A-Za-z0-9\-]/g, '');
    //console.log(arg);
    arg = arg.replace(/\./g, '');
    return arg;
  }

  return '';


  //console.log(arg);



}

function get_query_arg(purl, key){
  if(purl.indexOf(key+'=')>-1){
    //faconsole.log('testtt');
    var regexS = "[?&]"+key + "=.+";
    var regex = new RegExp(regexS);
    var regtest = regex.exec(purl);
    //console.log(regtest);

    if(regtest != null){
      var splitterS = regtest[0];
      if(splitterS.indexOf('&')>-1){
        var aux = splitterS.split('&');
        splitterS = aux[1];
      }
      //console.log(splitterS);
      var splitter = splitterS.split('=');
      //console.log(splitter[1]);
      //var tempNr = ;

      return splitter[1];

    }
    //$('.zoombox').eq
  }
}

function add_query_arg(purl, key,value){
  // -- key and value must be unescaped for uri
  key = encodeURIComponent(key); value = encodeURIComponent(value);

  var s = purl;
  var pair = key+"="+value;

  var r = new RegExp("(&|\\?)"+key+"=[^\&]*");

  s = s.replace(r,"$1"+pair);
  //console.log(s, pair);
  if(s.indexOf(key + '=')>-1){


  }else{
    if(s.indexOf('?')>-1){
      s+='&'+pair;
    }else{
      s+='?'+pair;
    }
  }
  //if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};


  //if value NaN we remove this field from the url
  if(value=='NaN'){
    var regex_attr = new RegExp('[\?|\&]'+key+'='+value);
    s=s.replace(regex_attr, '');



    if(s.indexOf('?')==-1 && s.indexOf('&')>-1){
      s = s.replace('&','?');
    }
  }

  return s;
}
function can_history_api() {
  return !!(window.history && history.pushState);
}


window.dzsap_wp_send_contor_60_secs = function(argcthis, argtitle){

  var data = {
    video_title: argtitle
    // ,video_analytics_id: argcthis.attr('data-analytics-id')
    ,video_analytics_id: argcthis.attr('data-playerid')
    ,curr_user: window.dzsap_curr_user
  };
  var theajaxurl = 'index.php?action=ajax_dzsap_submit_contor_60_secs';

  if(window.dzsap_settings.dzsap_site_url){

    theajaxurl = dzsap_settings.dzsap_site_url + theajaxurl;
  }

  // console.log('dzsap_wp_send_contor_60_secs()',argcthis,argtitle);



  jQuery.ajax({
    type: "POST",
    url: theajaxurl,
    data: data,
    success: function(response) {
      if(typeof window.console != "undefined" ){
        // console.log('Ajax - submit view - ' + response);
      }



    },
    error:function(arg){
      if(typeof window.console != "undefined" ){
        // console.warn('Got this from the server: ' + arg);
      };
    }
  });
}

// console.log('window.dzsap_init_calls - ', window.dzsap_init_calls);

function dzsap_call_init_calls(){
  // console.log('window.dzsap_call_init_calls - ',window.dzsap_call_init_calls);
  for(var key in window.dzsap_init_calls){
    window.dzsap_init_calls[key](jQuery);
  }
  window.dzsap_init_calls = [];

}

window.dzsap_call_init_calls = dzsap_call_init_calls;
if(window.jQuery){
  register_dzsap_plugin();
  register_dzsap_aux_script();
    jQuery(document).ready(function($){
      dzsap_call_init_calls()
    })
}else{
  var script = document.createElement('script');
  document.head.appendChild(script);
  script.type = 'text/javascript';
  script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
  script.onload = function(){
    register_dzsap_plugin();
    register_dzsap_aux_script();
    dzsap_call_init_calls()
  }
}


window.dzsap_init = function(selector, settings) {

  //console.log(selector);
  if (typeof(settings) != "undefined" && typeof(settings.init_each) != "undefined" && settings.init_each == true) {
    var element_count = 0;
    for (var e in settings) {
      element_count++;
    }
    if (element_count == 1) {
      settings = undefined;
    }


    jQuery(selector).each(function() {
      var _t = jQuery(this);

      if( settings && typeof(settings.call_from)=='undefined'){

        settings.call_from = 'dzsap_init';
      }


      _t.audioplayer(settings)
    });
  } else {
    jQuery(selector).audioplayer(settings);
  }

  dzsap_lasto = settings;


  dzsap_list_for_sync_players = [];

  if(typeof(settings) != "undefined"  && typeof(settings.construct_player_list_for_sync) != "undefined"  && settings.construct_player_list_for_sync=='on'){

    jQuery('.audioplayer,.audioplayer-tobe').each(function(){
      var _t2 = jQuery(this);
      if(_t2.attr('data-do-not-include-in-list')!='on'){
        if(_t2.attr('data-type')!='fake' || _t2.attr('data-fakeplayer')){

          dzsap_list_for_sync_players.push(_t2);
        }
      }
    })

    // console.log('dzsap_list_for_sync_players -5 ',dzsap_list_for_sync_players);

  }

};
