﻿Ext.define('Ilc.model.Customer', {
    extend: 'Ext.data.Model',

    fields: ['id', 'customerId', 'name', 'billingAddress', 'postcode', 'city', 'country', 'phone', 'bankName', 'bankAccount', 'commerceNumber', 'fiscalCode', 'contactPerson']
});
