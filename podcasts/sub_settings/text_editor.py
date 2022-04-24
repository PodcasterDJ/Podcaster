SUMMERNOTE_CONFIG = {
    # Using SummernoteWidget - iframe mode, default
    'iframe': True,

    # Or, you can set it as False to use SummernoteInplaceWidget by default - no iframe mode
    # In this case, you have to load Bootstrap/jQuery stuff by manually.
    # Use this when you're already using Bootstraip/jQuery based themes.
    # 'iframe': False,

    # You can put custom Summernote settings
    'summernote': {
        # As an example, using Summernote Air-mode
        # 'airMode': True,

        # Change editor size
        'width': '90%',
        'height': '820',

        # Use proper language setting automatically (default)
        'lang': "de-DE",

        # Or, set editor language/locale forcely
        # 'lang': 'ko-KR',


        # You can also add custom settings for external plugins
        # 'print': {
        #     'stylesheetUrl': '/some_static_folder/printable.css',
        # },
        # 'codemirror': {
        #     'mode': 'htmlmixed',
        #     'lineNumbers': 'true',
        #     # You have to include theme file in 'css' or 'css_for_inplace' before using it.
        #     'theme': 'monokai',
        # },
    },

    # Need authentication while uploading attachments.
    # 'attachment_require_authentication': False,

    # Set `upload_to` function for attachments.
    # 'attachment_upload_to': my_custom_upload_to_func(),

    # Set custom storage class for attachments.
    # 'attachment_storage_class': 'my.custom.storage.class.name',

    # Set custom model for attachments (default: 'django_summernote.Attachment')
    # must inherit 'django_summernote.AbstractAttachment'
    # 'attachment_model': 'my.custom.attachment.model',

    # You can disable attachment feature.
    # 'disable_attachment': False,

    # Set `True` to return attachment paths in absolute URIs.
    # 'attachment_absolute_uri': False,

    # test_func in summernote upload view. (Allow upload images only when user passes the test)
    # https://docs.djangoproject.com/en/2.2/topics/auth/default/#django.contrib.auth.mixins.UserPassesTestMixin

    # def example_test_func(request):
    #     return request.user.groups.filter(name='group_name').exists()

    # 'test_func_upload_view': example_test_func,

    # You can add custom css/js for SummernoteWidget.
    # 'css': (
    # ),
    # 'js': (
    # ),

    # You can also add custom css/js for SummernoteInplaceWidget.
    # !!! Be sure to put {{ form.media }} in template before initiate summernote.
    # 'css_for_inplace': (
    # ),
    # 'js_for_inplace': (
    # ),

    # Codemirror as codeview
    # If any codemirror settings are defined, it will include codemirror files automatically.
    # 'css': (
    #     '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/theme/monokai.min.css',
    # ),

    # Lazy initialize
    # If you want to initialize summernote at the bottom of page, set this as True
    # and call `initSummernote()` on your page.
    # 'lazy': True,

    # To use external plugins,
    # Include them within `css` and `js`.
    # 'js': {
    #     '/some_static_folder/summernote-ext-print.js',
    #     '//somewhere_in_internet/summernote-plugin-name.js',
    # },
}
# Django summernote default theme for text editor
SUMMERNOTE_THEME = 'bs4'
