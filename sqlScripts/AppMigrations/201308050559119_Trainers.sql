CREATE TABLE [dbo].[Trainer] (
    [Id] [int] NOT NULL IDENTITY,
    [Name] [nvarchar](max),
    CONSTRAINT [PK_dbo.Trainer] PRIMARY KEY ([Id])
)
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201308050559119_Trainers', 0x1F8B0800000000000400ED5DDB6E23B9117D0F907F10F4940458CBF66E82C940DE8547630746D6F660E49D5783EEA6E4CEF62DDDD48CFD6D79C827E51742B6FAC2FBAD5BDD9AC1BCD94DB258AC3A2C92C562E97FFFF9EFF29797249E7D86451965E9C5FCECE4743E8369908551BABD98EFD0E68737F35F7EFEE31F965761F232FBD4D4FB91D4C32DD3F262FE8C50FE76B12883679880F2248982222BB30D3A09B26401C26C717E7AFAF7C5D9D9026212734C6B365B7EDCA5284A60F50FFE7795A501CCD10EC4B75908E3B2FE8E4BD615D5D91D48609983005ECC6FE2E0E43D40603EBB8C2380FB5FC378339FE53FBDFDAD846B5464E9769D031481F8E13587B87C03E212D6DCBECD7FB265F8F49C30BC00699A214C2E4BBD063C6F8782077385078D5E095BD5802EE698E3E243916DA218D21571D57FC257E603FE842BE6B040AF1FE1A66E7E13CE670BB6DD826FD836A3DA100EF05F29FAF17C3EBBDBC531788A612B282CC935CA0AF80F98C20220187E0008C122256D613502A157AE0F32AC14FFD5F484B582E1349F5D472F30FC15A65BF4DCF6760B5E9A2FF8CFF9ECB734C2E8C38D50B1833477FBFFB98EEFC0E7685B698763E16316C3723EFB08E3AAB47C8EF23D524E28993FD6B5AE8B2C217F320AD9173EAEB35D11909164AA1A0FA0D84264CFDAFD9714866AFE48C923A953309C519FDB1E1B9EE8B2865F9A9BE5A2439E168F84900F10493B1F3036ED0E0D48D2CF9D3B20CFFFFA370D20EBFAFA9E57599283F4553348375C53F01B04DE3C94D413C096C3550CA2440DEDAAB822CDA3BB2B91029C2A7665A9994D7EB38DB700B299E83DDBAA517D4BB6DF639A79D87DAED34F20DE8DDFAB9DF57259B1FACD1A19502593CA0BAB0F05885222D66F08AA1F62BCB983E11A8102E11D650B20F2F703DE9DDE6F36251198A3C9AFC95EA5E18044DFC3322A86E7B5263B2CAF9849B42B479F8EEBDDD3BF6080869B913541E9A46CE6C3635BA99B967C993031850AAE5BC835DA118CCB97B4BAF0B1E98559D8844261AD156B0CB8DCB62317975CAE482DB42196DE466BDF90351B61E1B517EF1E43DFC5DBD3A4AD7625CA12580C67D31A8A5ACBD155120D475326CC4FA182AB51A3EC557FABA6E24EB47B5E006F25F41DE1FD10FE2E8A63DCD3651816B01C7FCFF00EA4BF5F0641B64BD184CEAA55962210A00F7859C39897C29FA9229DA0F21AC2F2AEA8D6CB6DC4D0FC3E257A62F22A01513C7AAF37E52DB68C4DB7EF320C16901E6AA1F146336FD60DA0F73FEA7E37ED87DA1BDEC2E409AB0B83C147C2C43FE923E5A69DAFA4EFB2D4BC5B2B206E233B483BEFFBB274131549356D1EB2DF61EAA8BCB3F337BDCD41CD030C3536C186D2AFA0441F40597EC98AF01A5BB65D3188883892E53A4A0348FA5AEF8280DA4A586E9815D40795BB53CFAB67906EA1D42DE32BAA35885D7739030EE8132CA24D144C88692527572F795454FFBA8B5B65F72ECB320BA28A28EFEE7F945CB35DA5E14CEFD4DDCB8A710863F9EC6214E57114600E2EE67F1124A024DB6E0B59B23CC5B3396F92EFD3F7308608CE2E03548502AC40198050143E964BC87EC1561C1664C10231362E2522EB2C124D3E9EC8510E622DDF5C2B874B49C259DB075FF21EE630256BAA5617FD3A6FFBE0C46592CE724141CA8CB4C6C3A6C383E06AD383C1042FE17ABA2347073AE8A93A0C53BCEA5471A7B9D6F7E1D140DB726EF90F5C703EAB78537BA23BD6DA9B1D87312B1DD814DDD6317E6C1645C5BCCDB4EE694F54FAB0E99ABADE98C4A828CE6C2A88980E701D5058EF81030A4D1E0FAA8BF684C9523F3D3939F39E8582B754C5A7DA754ACD96DA63EE307CA5C3D562E0D3CF4215F723CC42953E6CBAA63DF2934C43D10F6EC287C4293E08EE245788CEAB8ACFA267D8D828EF11CDCC89E6404BF930FB9CFD71A2B26DC40D558FFE32CFC927F8222EF6A4FA1A2269805877369131288C942555878F0934F69B1943E3260C4CDABA3EBD184850573D02954E850622F5B229A3D1EE504C24DADB769144337D4CD2A8CD868C4667A34D44B86B029112BB92DA8857CE52E3023591A07C792211BA90A343419F851B1DE74455924742F1E6D778866ED9EFE029D870E3899922524F107E8164476739F23622423E6CA9D5331EE84CBC1A8F701401D6B0F41EB3244E551CB9E1846779C6B31C84E5A9EE00FA1783894451E8CF7C76A73E8A75CAB66AA4A03CE751943A03DB5B0EAA6B21511A36871197E3086D19382BAB118FE1004213EDEC7F6F2989511AA27CF46713BBD309ADE37605D44843791E39B01C2828AB05A1D82E5B6E987D45216E916DA6601F0BA25E45B4FB67AB1DB4BFF9187C5569BCEEED36B92D5B2EF64FC6EA0FCB85E26DD9F216E4391941D7B2FE325BEF1F9AAD7E58BB3FF94AF634160123607E53DFF684B2026C21574A0C4B08AFA3A224A1BEE009909B90559808D5CC8782A623C9D940545BB37F6B1A91BFEB0377FDE6EE44F9608D16E0351E53428EDBD55DAA5CD962EB1979EC07625048EEC75759BC4B52F5E15FDDBA7B8A46D3E8BE8A94960B6E18C2295F9094E02061A56FA51BD5F6C64229B2CDB08536E4CD54826C2E346831AA2E39F454EE0475745FED29510FAB6852D4E7A3516D7DD6F0D6ADE48D90B582156D0F33D944CDBA6AB57EC84393A83FB961CC1EA9136142B71FB18085FC398E152AD44D0F030AF1950D4D4B2C75A6DC3E5E91D06DCBECA98A2F6D68BA62A9336529BF7C993DD5E6B50D4DADF9E640A5BB5D6208A92F9D269B3AED81D36BE6288ECF161347D9726A633A951E9A93909F1E644F44ECF4A06A39B51E945B15EACE88D9AB68EE92A6DBACB427742FB5AA1C0E167A55373D56C5F28F17685A7C990355FA4D0243922E381EC0B0FE323FD4A81F10D84147DFFE58F15347FAD324EA4FF6349AB87D661CF5B7A3C1487BD5E4BFD9F53229CA96532362223DA862EF6D35A16E6FA10C5D639DFB86D789FC09808E0A1D98CF2CC0D47717CF83109CCF7A20846297D94C85DDB3539A2AB0A7A70CBEA7692B2B391CC58CD1F8CCE1CC58DBBD67790F3E9498C87B1951A6823BFD7D18BE8CF0BEC49DA224B45E465E526D80BEF8E079AB9EF946E35B48F66A41F4C5B637290AA75C5B2EF3BA691CDDE47A44E2B0E2EE5A447138B9BA1ED5E1E754F76E9C29E3F3AC1652FA3EDD8D31FE16C8599B924803FDCD46534B737DA18A3F912C5FD298841E521C40ADCAE0869EB01B59B1AA7001D30183AAEA74909048521F01E0A9E596CC00AAD6C73D7832E8CC17E6228CAA58CE9B923CA66ADF77590EBB375424B1026A9F145D4BE17C5239D1251A504615780ABFA137003894610A9EACB5F7FD231B0221FA417363A25CB7DDD66C458CC4B882B3E2AC9F4A0F33D535E335834188FDE0ABB45BC7FA4BFB7F1BFB51C75D98930D0B8118FB2AF3191EFEE728244118EBD712C1A43620FF8E577154050437156E411A6D6089AA6DEFC5FCFCF4F40D97B9D823ABF0A22CC3F888530B474402C69C058E0F89F9ACC2E9675004CFA0F853025EFEECFA16984120C5F420290E24EF7B474CA37B10E177211AACF0C57CB97D13E40EAB8689F2AB1E440732F97B819F4997DA8B920479DA417D05F9460FA23A55AAD110FF4D12E16743A61AED4954956A7418B2C3F2CAA61AED0565217DE880689E2CDDE431D9A1E3CF1E794CD292AC944232C801113A5D42C3E316BA3C3F613F9262CEC143CCA28993F21DB75A991C7BBD28B179F39E22F7358CF17B0DBD079E2C99DD31E9FFABCA4D6736EA12080999E79A7DD56099E7A407BE2A2757EFC472DCA41920A99CEFE86D93CAF9E8884F296723D0BE19E3FACA81CE183738BFCA84704341CD31DF9B9DB09CBC0F3D9D70FAAB5CB901525FB2DAF9911E5D8FF4727B46B331F866557B11DBC7560FEA95EB6FD60FE65DD1DE62D909507B0D2556D77AFC4D92A4FBF297A6D9E5EB20D2FEF96986C848C36473F14A4333EB99446D8C7C4DFA47A74E589B8D9780D132D5E7B8293825D94D7C538B7A67F31C3D79E7F127ECB44EE8D8260891A5311A05374EE66B20D4A8DF6C0D6E6B9CECDAD42919AD3310B2B15163E606147262F8659FF3828DE62DD2E0B8513F6713BB9A3C87A06B2A4F17F418762C5C8A3275F2B2AF1E11A6374D6A5C4CBB6FD14534B9EF5DD448E0CFC73CADC3EF61C7DE8CB8EE630D91DC23E3411647D6EF2872DCE870D5D604003107D58F8011BB18F7C3218577062948CACCD3D78914C333043777D7340831D892DE6BCBF49818736DF101C4A4CB8A5D48BCDFD941070BDEED292177E893ACC33161981389DB8156FBB6601264184C85933BE2B8B131A64BD5071C63BB55B928FFF6ECCAA746E435CAA6A86676159D2F5FB6E7D8C7F65FCCC3A70CAB7F7F25E09A2F5D992E5D46FC0B7CCAC116AF87F583430BFAB57356DA495D26EB892A3674D2815CE8A32B9275E19A915D97905D46DF315BBB2E59BB94BC6326776D227759077E69DECD59DEA57DF92482D7E581572A7CC824F1DA29A2C9262F9B27FA692FD450CD1997E92F6C2C75D6C6C22890DAE54D6A671B84254A857EFD24162A71DD8E977C589A6E58B2EE28CE9554639D0EFD72F50FF82B05423E79ED10851580CBF3D97F7803A7A2E76C3D93474F375027144C9F439D5F14D87C66BA8172AB1593E0AEFF300F9950DF7BC8D2F54DF2FA7E98B9CA2731D7FEBC86E2196FEF39AB324DA625A6DF909B74EBFA21CBDF07F7B3AB130A40FD3320163F2F62D67F5F61283609D2FC228710861A13B649417A4D867187AFFE41078B1F8A3063C1C176EB5D0D62FB032C75E26F51D808C18801FFFDDA61C4E0F0CB10621680E5E2E32E2531C0FBFFC893C56D4782E4364861C0F829DA3A37E9266B7C261C474D152E1EF116221002042E0B146DC8B2576424C6BC1A6EF542973C537982E14D7ABF43F90EE121E33350FC4A0B83B85D74FD573F7FC1F2BCBCCFC97FE51043C06C46246CFA3E7DB78BE2B0E5FB5A1248A92041FC39F50B11A24B445E8A6C5F5B4A77596A49A8165FEB867A80491E6362E57DBA069FA19A37B30C59892DDF47605B80A4AC6974EDF1BF187E61F2F2F3FF019C8C71F15A9B0000, '5.0.0.net45')
