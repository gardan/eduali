Ext.define('Ilc.grid.EvalQuestions', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridEvalQuestions',


    store: 'Questions',
    constructor: function () {
        var renderRadio = function(value, metaData, record) {
            var name = record.data.id;
            var radioValue = value.name;

            return '<input type="radio" value="' + radioValue + '" name="' + name + '" />';
        };

        this.columns = [
            {
                text: 'Question',
                dataIndex: 'question',
                flex: 1
            },
            {
                text: 'Strongly Disagree',
                dataIndex: 'stronglyDisagree',
                renderer: renderRadio
            },
            {
                text: 'Disagree',
                dataIndex: 'disagree',
                renderer: renderRadio
            },
            {
                text: 'Not Event',
                dataIndex: 'notEven',
                renderer: renderRadio
            },
            {
                text: 'Once',
                dataIndex: 'once',
                renderer: renderRadio
            },
            {
                text: 'Fully Agree',
                dataIndex: 'fullyAgree',
                renderer: renderRadio
            },
            {
                text: 'Not Availables',
                dataIndex: 'notAvailable',
                renderer: renderRadio   
            }];
        this.callParent(arguments);
    }
});