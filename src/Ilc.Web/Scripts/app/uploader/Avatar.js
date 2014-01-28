Ext.define('Ilc.uploader.Avatar', {
    extend: 'Ext.container.Container',
    
    config: {
        /**
         * @cfg {String}
         * 
         * The label to be displayed to the left of the avatar
         */
        fieldLabel: null,
        
        /**
        * @cfg {Number} labelWidth
        * The width of the {@link #fieldLabel} in pixels. Only applicable if the {@link #labelAlign} is set to "left" or
        * "right".
        */
        labelWidth: 100,
        
        browseButton: null,
        
        queue: null,
        
        /**
         * @cfg {Object}
         * 
         * Configuration object for the uploader. Configuration options included in this object override the
         * options 'uploadUrl', 'uploadParams', 'uploadExtraHeaders', 'uploadTimeout'.
         */
        uploaderOptions: null,

        /**
         * @cfg {boolean} [synchronous=false]
         * 
         * If true, all files are uploaded in a sequence, otherwise files are uploaded simultaneously (asynchronously).
         */
        synchronous: true,
        
        /**
         * @cfg {Object/String}
         * 
         * Encoder object/class used to encode the filename header. Usually used, when the filename
         * contains non-ASCII characters. If an encoder is used, the server backend has to be
         * modified accordingly to decode the value.
         */
        filenameEncoder: null,
        
        avatarUrl: null
    },

    uploadManager: null,

    avatarImg: null,

    uploading: false,

    getUploaderOptions: function() {

    },

    createUploadManager: function () {
        var uploaderOptions = this.getUploaderOptions() || {};

        Ext.applyIf(uploaderOptions, {
            url: this.uploadUrl,
            params: this.uploadParams,
            extraHeaders: this.uploadExtraHeaders,
            timeout: this.uploadTimeout
        });

        var uploadManager = Ext.create('Ext.ux.upload.Manager', {
            uploader: this.uploader,
            uploaderOptions: uploaderOptions,
            synchronous: this.getSynchronous(),
            filenameEncoder: this.getFilenameEncoder()
        });

        return uploadManager;
    },

    initUpload: function() {
        this.uploadManager.uploadQueue(this.queue);
    },
    
    initQueue: function() {
        var queue = Ext.create('Ext.ux.upload.Queue');

        // queue.on('queuechange', this.onQueueChange, this);

        return queue;
    },

    finishUpload: function () {
        this.uploading = false;
    },

    onFileSelection: function (input, files) {
        this.updateAvatar(files);
        
        this.queue.clearUploadedItems();
        this.queue.addFiles(files);
        this.browseButton.reset();
    },

    onUploadComplete: function (manager, queue, errorCount) {
        debugger;
        this.finishUpload();
        if (errorCount) {
            // TODO: error handling
        }
        this.fireEvent('uploadcomplete', this, manager, queue.getUploadedItems(), errorCount);
        manager.resetUpload();
    },

    updateAvatar: function (files) {
        // Updates the image tag with the newly selected image.
        var me = this;
        var file = files[0];
        
        var reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                // me.avatarImg.getEl().src = e.target.result;
                me.avatarImg.getEl().set({
                    src: e.target.result
                });
            };
        })(file);

        reader.readAsDataURL(file);
    },

    initComponent: function() {
        var me = this;

        me.addEvents(
            'uploadcomplete'
        );

        me.queue = me.initQueue();
        me.uploadManager = me.createUploadManager();

        me.uploadManager.on('uploadcomplete', me.onUploadComplete, me);

        me.browseButton = Ext.create('Ext.ux.upload.BrowseButton', {
            buttonText: 'Select photo',
            iconCls: '',
            multiple: false
        });
        
        me.browseButton.on('fileselected', me.onFileSelection, me);
        
        me.avatarImg = Ext.create('Ext.Img', {
            padding: '0 0 0 10',
            src: me.avatarUrl,
            width: 64 + 10, // We need to account for the extra padding
            height: 64
        });

        if (me.fieldLabel != null) {
            me.layout = {
                type: 'column'
            };

            me.items = [
                {
                    xtype: 'label',
                    text: me.fieldLabel,
                    width: me.labelWidth,
                    margin: '5 5 0 0'
                },
                {
                    xtype: 'container',
                    items: [
                        me.avatarImg,
                        me.browseButton
                    ]
                }
            ];
        }

        me.callParent(arguments);
    }
});