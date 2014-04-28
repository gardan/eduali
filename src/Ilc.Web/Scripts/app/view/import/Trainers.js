Ext.define('Ilc.view.import.Trainers', {
    extend: 'Ext.container.Container',
    
    layout: 'fit',

    config: {
        trainersBulkStore: null,
    },

    csvToArray: function (strData, strDelimiter){
        var arrData = [[]];
        var arrMatches = null;
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            var strMatchedValue;
            if (arrMatches[2]) {
                strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
            } else {
                strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push(strMatchedValue);
        }

        return(arrData);
    },

    loadRawStore: function(data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'email': dataItem[0], 
                'firstName': dataItem[1], 
                'lastName': dataItem[2], 
                'birthday': dataItem[3], 
                'phone': dataItem[4], 
                'subjects': dataItem[5]
            });
        });

        this.trainersBulkStore.loadRawData(objectData);
    },

    initComponent: function() {
        var me = this;
        
        this.trainersBulkStore = Ext.create('Ext.data.Store', {
            fields: [
                'email', 'firstName', 'lastName', 'birthday', 'phone', 'subjects'
            ]
        });

        this.items = [
            {
                xtype: 'textarea',
                fieldLabel: 'Csv data',
                listeners: {
                    change: function(control, newValue) {
                        var dataArray = me.csvToArray(newValue, ',');
                        me.loadRawStore(dataArray);
                    },
                    scope: this
                }
            },
            {
                xtype: 'grid',
                columns: [
                    {
                        dataIndex: 'email',
                        text: 'Email'
                    },
                    {
                        dataIndex: 'firstName',
                        text: 'Firstname'
                    },
                    {
                        dataIndex: 'lastName',
                        text: 'Lastname'
                    },
                    {
                        dataIndex: 'birthday',
                        text: 'Birthday'
                    },
                    {
                        dataIndex: 'phone',
                        text: 'Phone'
                    },
                    {
                        dataIndex: 'subjects',
                        text: 'Subjects'
                    }
                ],
                store: this.trainersBulkStore
            }
        ];

        this.callParent();
    }
});