﻿Ext.define('Ilc.resources.Resources', {
    singleton: true,

    resources: {
        'mainMenu.tasks': 'Taken',
        'mainMenu.trainings': 'Trainingen',
        'mainMenu.customers': 'Klanten',
        'mainMenu.students': 'Studenten',
        'mainMenu.statistics': 'Statistiek',
        'mainMenu.trainers': 'Trainers',
        'mainMenu.users': 'Gebruikers',
        'mainMenu.roles': 'Rollen',
        'mainMenu.subjects': 'Talen',
        'mainMenu.settings': 'Instellingen',
        'mainMenu.planning': 'Planning',

        'common.trainingId': 'Id',
        'common.id': 'Id',
        'common.name': 'Naam',
        'common.status': 'Status',
        'common.execute': 'Uitvoeren',
        'common.trainer': 'Trainer',
        'common.customer': 'Klant',
        'common.subject': 'Taal',
        'common.owners': 'Eigenaar',
        'common.newTraining': 'Nieuwe training',
        'common.contact': 'Contact',
        'common.bankAccount': 'Bankrekening',
        'common.newCustomer': 'Nieuwe klant',
        'common.edit': 'Bijwerken',
        'common.delete': 'Verwijderen',
        'common.newStudent': 'Nieuw student',
        'common.phone': 'Telefoon',
        'common.newTrainer': 'Nieuw Trainer',
        'common.possibleCosts': 'Kosten',
        'common.lessonNo': 'Lesnummer',
        'common.lessonDuration': 'Lesduur',
        'common.interviewDay': 'Intakegesprek datum',
        'common.location': 'Plaats',
        'common.createInterview': 'Aanmaken intake',
        'common.studentsInterviews': 'Studenten intake',
        'common.view': 'Bekijk',
        'common.add': 'Toevoegen',
        'common.close': 'Sluiten',
        'common.done': 'Klaar',
        'common.lessons': 'Les',
        'common.evaluations': 'Evaluatie',
        'common.progress': 'Vortgang',
        'common.exam': 'Toets',
        'common.trainingEval': 'Training evaluatie',
        'common.planInterview': 'Intake plannen',
        'common.interview': 'Intake',
        'common.newInterview': 'Nieuwe intake',
        'common.listeningLevel': 'Niveau luisteren',
        'common.listeningTargetLevel': 'Doel niveau luisteren',
        'common.planLessons': 'Les plannen',
        'common.progressEvaluations': 'Voortgang evaluatie',
        'common.startDate': 'Begin datum',
        'common.endDate': 'Eind datum',
        'common.system': 'Systeem',
        'common.students': 'Studenten',
        'common.billingAddress': 'Factuuradres',
        'common.contactName': 'Contact naam',
        'common.contactEmail': 'Contact email',
        'common.phoneNr': 'Contact telefoon',
        'common.address': 'Adres',
        'common.student': 'Student',
        'common.createOffer': 'Offer aanmaken',
        'common.file': 'Bestand',
        'common.creator': 'Author',
        'common.createAt': 'Gemaakt op',
        'common.planning': 'Planning',
        'common.readingLevel': 'Niveau lezen',
        'common.readingTargetLevel': 'Doel niveau lezen',
        'common.interactiveTalkingLevel': 'Niveau praten',
        'common.interactiveTalkingDesiredLevel': 'Doel niveau praten',
        'common.productiveTalkingLevel': 'Niveau productive praten',
        'common.productiveTalkingTargetLevel': 'Doel niveau productive praten',
        'common.writingLevel': 'Niveau schrijven',
        'common.writingTargetLevel': 'Doel niveau schrijven',
        'common.accepted': 'Aanvaard',
        'common.rejected': 'Geweigerd',
        'common.newAssesment': 'Aanslag',
        'common.listeningEntryLevel': 'Start niveau luisteren',
        'common.listeningExitLevel': 'Eind niveau luisteren',
        'common.readingEntryLevel': 'Start niveau lezen',
        'common.readingExitLevel': 'Eind niveau lezen',
        'common.interactiveTalkingEntryLevel': 'Start niveau interactieve praten',
        'common.interactiveTalkingExitLevel': 'Eind niveau interactieve praten',
        'common.productiveTalkingEntryLevel': 'Start niveau productieve praten',
        'common.productiveTalkingExitLevel': 'Eind niveau productieve praten',
        'common.writingEntryLevel': 'Start niveau schrijven',
        'common.writingExitLevel': 'Eind niveau schrijven',
        'common.logout': 'Uitloggen',
        'common.save': 'Opslaan',
        'common.remarks': 'Opmerkingen',
        'common.level': 'Niveau',
        'common.targetLevel': 'Doel niveau',
        'common.listening': 'Luisteren',
        'common.reading': 'Lezen',
        'common.interactiveTalking': 'Interactieve praten',
        'common.productiveTalking': 'Productieve praten',
        'common.writing': 'Schrijven',
        'common.cancel': 'Annuleren',
        'common.update': 'Bijwerken',
        'common.username': 'User naam',
        'common.newUser': 'Nieuwe gebruiker',
        'common.createUser': 'Gebruiker aanmaken',
        'common.firstName': 'Naam',
        'common.lastName': 'Achternaam',
        'common.email': 'Email',
        'common.newSubject': 'Nieuwe taal',
        'common.yes': 'Ja',
        'common.no': 'Nee',
        'common.main': 'Hoofd',
        'common.trainingContact': 'Cursus contact',
        'common.price': 'Prijs',
        'common.subjects': 'Talen',

        'common.address': 'Adres',
        'common.city': 'Stad',
        'common.country': 'Land',
        'common.active': 'Actief',
        'common.createDate': 'Aanmaakdatum',
        'common.trainings': 'Trainings',
        'common.amount': 'Bedrag',
        'common.sentAt': 'Verzenddatum',
        'common.paymentDueAt': 'Vervaldatum',
        'common.tos': 'Termen en voorwaarden',
        'common.payed': 'Betaald',
        'common.notSent': 'Niet verzonden',
        'common.training': 'Training',
        'common.trainingMaterial': 'Training documentatie',

        'common.addStudent': 'Voeg student toe',
        'common.addContact': 'Voeg contact toe',
        'common.addExpense': 'Voeg expense toe',

        'common.fiscalCode': 'BTW nummer',
        'common.commerceNumber': 'KvK nummer',

        'tasks.title.ended': 'Afgesloten',
        'tasks.title.offer': 'Oferte',
        'tasks.planned.mainLbl': 'Klaar om het cursus te beginen ?',

        'tasks.offer.mainLbl': 'Selecteer de volgende status van de opleiding aan is aanvaard of geweigerd aub',
        
        'formats.date': 'MM-DD-YYYY',
        'formats.extjsdate': 'm-d-Y g:i',
        'formats.extjsdateonly': 'm-d-Y'
    }
});
