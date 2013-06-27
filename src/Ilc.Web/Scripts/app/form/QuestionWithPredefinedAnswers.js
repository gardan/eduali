Ext.define('Ilc.form.QuestionWithPredefinedAnswers', {
    extend: 'Ext.form.Panel',

    xtype: 'predefquestions',

    constructor: function () {
        this.items = [];

        this.items.push({
            xtype: 'toolbar',
            region: 'north',
            items: [
                {
                    xtype: 'label',
                    width: 600
                },
                {
                    xtype: 'label',
                    text: 'totally disagree',
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: 'totally sdasasdasd',
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: 'totally disagree',
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: 'totally sdasasdasd',
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: 'totally disagree',
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: 'totally sdasasdasd',
                    flex: 1
                }
            ]
        });

        var questions = [
            {
                id: 1,
                question: 'Het intakegesprek voorafgaand aan de training heb ik als zinvol ervaren'
            },
            {
                id: 2,
                question: 'De coördinator heeft me een goed en deskundig advies gegeven'
            },
            {
                id: 3,
                question: 'De coördinator heeft me een goed en deskundig advies gegeven'
            },
            {
                id: 4,
                question: 'De coördinator heeft me een goed en deskundig advies gegeven'
            },
            {
                id: 5,
                question: 'De coördinator heeft me een goed en deskundig advies gegeven'
            }
        ];
        

        for (var i = 0; i < questions.length; i++) {
            var id = questions[i].id;
            var question = questions[i].question;
            var newItem = {
                xtype: 'radiogroup',
                fieldLabel: question,
                labelWidth: 600,
                items: [
                    {
                        name: id,
                        inputValue: 1
                    },
                    {
                        name: id,
                        inputValue: 2
                    },
                    {
                        name: id,
                        inputValue: 3
                    },
                    {
                        name: id,
                        inputValue: 4
                    },
                    {
                        name: id,
                        inputValue: 5
                    },
                    {
                        name: id,
                        inputValue: 6
                    }
                ]
            };
            
            this.items.push(newItem);
        }

        this.callParent(arguments);
    }
})