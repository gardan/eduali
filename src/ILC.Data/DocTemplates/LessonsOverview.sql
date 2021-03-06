

UPDATE FileTemplate
Set Content = '<div id="customers"><br />
<table id="tab_customers" class="table table-striped"><colgroup> <col /> <col /> <col /> <col /> <col /> </colgroup>
<thead>
<tr class="warning"><th>Locatie: ILC Waalwijk</th><th>Aanvang&nbsp;</th><th>Einde</th><th>Uren</th><th>Totaal</th></tr>
</thead>
<tbody>
<tr>
<td><b>Totaal {{totalHours}} uur les</b></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td><b>{{totalHours}}</b></td>
</tr>
<tr>
<td><strong>{{formatDate desiredStartDate day="numeric" month="numeric" year="numeric"}}</strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;{{#each lessons}}</td>
</tr>

<tr>
<td>{{formatDate StartDate day="numeric" month="numeric" year="numeric"}}</td>
<td>{{formatDate StartDate "hhmm"}}</td>
<td>{{formatDate EndDate "hhmm"}}</td>
<td>{{ DateDifference StartDate EndDate }}</td>
<td>{{total}}{{/each}}</td>
</tr>

<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>'