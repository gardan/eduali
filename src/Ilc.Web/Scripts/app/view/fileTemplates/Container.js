Ext.define('Ilc.view.fileTemplates.Container', {
    extend: 'Ext.container.Container',

    layout: 'fit',

    requires: [
        'Ext.ux.form.TinyMCETextArea'
    ],

    initComponent: function() {

        window.tinyMCEPreInit = {
            suffid: '',
            base: 'scripts/lib/tinymce'
        };

        this.items = [
            {
                xtype: 'tinymce_textarea',
                tinyMCEConfig: {
                    // General options
                    theme : "advanced",

                    skin: "extjs",
                    inlinepopups_skin: "extjs",
		
                    // Original value is 23, hard coded.
                    // with 23 the editor calculates the height wrong.
                    // With these settings, you can do the fine tuning of the height
                    // by the initialization.
                    theme_advanced_row_height: 27,
                    delta_height: 1,
    
                    schema: "html5",
    
                    plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist",
    
                    // Theme options
                    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
                    theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                    theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                    theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft",
                    theme_advanced_toolbar_location : "top",
                    theme_advanced_toolbar_align : "left",
                    theme_advanced_statusbar_location : "bottom",
    
                    // Example content CSS (should be your site CSS)
                }
            }
        ];

        this.callParent();
    }
});