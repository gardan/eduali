Ext.define('Ilc.plugins.slider.Highlight', {
    extend: 'Ext.AbstractPlugin',
    
    onAfterRender: function (slider) {
        this.slider = slider;
        
        console.log('onAfterRender');
        this.highlighter = slider.innerEl.insertFirst({
            cls: 'ext-ux-slider-highlight'
        });
        this.innerHighlighter = this.highlighter.createChild({
            cls: 'ext-ux-slider-inner-highlight'
        });

        this.syncElementSize();
    },

    syncElementSize: function () {
        var slider = this.slider;
        if (slider.disabled) return;

        var startThumb = slider.thumbs[0];
        var endThumb = slider.thumbs[1];

        var defaultColor = '#F5F5F5';

        // Set the inner div between to two thumbs
        var leftEnd = parseFloat(endThumb.el.dom.style.left.substring(0, 5));
        var leftStart = parseFloat(startThumb.el.dom.style.left.substring(0, 5));
        var innerDivWidth = '';
        var marginLeft = '';
        var backgroundColor = '';
        var backgroundColorContainer = '';

        

        // check for overlap
        if (startThumb.value < endThumb.value) { // No overlap
            innerDivWidth = leftEnd - leftStart;
            marginLeft = leftStart;
            backgroundColor = 'green';
            backgroundColorContainer = defaultColor;
        }
        else if (startThumb.value > endThumb.value) {
            innerDivWidth = leftStart - leftEnd;
            marginLeft = leftEnd;
            backgroundColor = defaultColor;
            backgroundColorContainer = 'green';
        }

        this.innerHighlighter.setWidth(innerDivWidth + '%');
        this.innerHighlighter.applyStyles({
            'margin-left': marginLeft + '%',
            'background-color': backgroundColor
        });
        this.highlighter.applyStyles({
            'background-color': backgroundColorContainer
        });
    },

    init: function(slider) {
        slider.on({
            scope: this,
            afterrender: this.onAfterRender
        });
    },
    
    destroy: function() {

    }
});