CREATE TABLE [dbo].[TrainingOwnersConfiguration] (
    [Id] [int] NOT NULL,
    [SalesId] [int] NOT NULL,
    [AdministrationId] [int] NOT NULL,
    [CoordinatorId] [int] NOT NULL,
    [TrainerId] [int] NOT NULL,
    CONSTRAINT [PK_dbo.TrainingOwnersConfiguration] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_Id] ON [dbo].[TrainingOwnersConfiguration]([Id])
ALTER TABLE [dbo].[TrainingOwnersConfiguration] ADD CONSTRAINT [FK_dbo.TrainingOwnersConfiguration_dbo.Training_Id] FOREIGN KEY ([Id]) REFERENCES [dbo].[Training] ([Id])
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201310231120348_OwnerConfigurationWorkflowSupport', 0x1F8B0800000000000400ED5DC992DC3892BD8FD9FC43589C66DAAC15927AB1EAB254B7A953A932596BC951AAAB8E69540432C51123184D32B47CDB1CE693E617863BB1B83B16825B282F55A900E870381E1C8EEDE1FFFEE77F2FFEF66D1FADBEB0240DE3C3B3F593478FD72B76D8C6BBF070FF6C7DCAEE7EFFD3FA6F7FFDF77FBBB8DAEDBFAD7E6DF2FDA1C8977F79489FAD3F65D9F1E7CD26DD7E62FB207DB40FB7499CC677D9A36DBCDF04BB78F3F4F1E3BF6C9E3CD9B05CC43A97B55A5DBC3F1DB270CFCA7FE4FFBC8C0F5B76CC4E41F426DEB128AD7FCF536E4AA9ABB7C19EA5C760CB9EAD5F45DB472F822C58AF9E476190977FC3A2BBF5EAF8C79FFF99B29B2C890FF737C7200B83E8C3F723CBD3EF822865B5B63F1FFF68AAF0E3A785C29BE07088B35C5C7C70AAF0BAAD4A5E99ABBCD2D9F742ADB242CFD6B9C6C97512DF8511E333E659FFC1BE0B3FE43FE5198F2CC9BEBF6777F5E7AF76EBD546FC6E237FD87EC67D536890FF75C8FEF074BD7A7B8AA2E063C45A43E596BCC9E284FDC20E2C0932B6BB0EB28C2587E25B56D64029552AA3A8D621FFAB29296F951C4EEBD5CBF01BDBBD6687FBEC535BDA9BE05BF34BFEE77AF5CF4398A32FFF284B4E8CD7AEFAB754F0DBE04B785FB68EA4C2FB3862E97AF59E45656AFA293C564879C4D9FCB6CEF53289F7C59F42835489B737F129D9163589B11C1F82E49E65E6AABDFB7A603B5CBF22E5B6C893089A713FB725363AF1698DBE56DA7C4882F0903711AC51930A682525299AC9E99076179BAE5F90BDA510E9D24D8AEF5CBA4AF3DDD0DDA528E7AD7D7779FAA73F13DDA5CE4F977C191C5EB088656DD17F8F735D82835E108A27AE7F78E97F32A2F01E6AAAE16514847BBCEF95C9A568B9FB7529600FE4925D3A61E2EC0E641705B90AE70E57D6EA9C0627879EE630304985FE1A44A7F14B35736036436ABF5E030115E8544E586D469A7382EA65BC3F3A796749CEF36D115DB35D5F39D7511E0DB3DD4D1624591E82B77A157F7FC8C3F977777769D1806E62AF0E3B8F425FB0344CFCEB5A8BF5AB6BAE64764A47770F37A78FFFCDB699B58790C4943D8F25841813652E4F6916EF493146DAFC167F4EEEA2F86B27E79753B8739F48D446A203E336131019D7698AF35332D8CE236EB253E147E0B0A14EBCE522FB4E3725518967D41CB6214D8D0ADA6E6D26C06E751A6EB72683ADDD1AA481AA3589B0E1D454C57240168FD1A0C5540CB51B1119925ADDDDE9B42AB3B41587941373A0D345299BAD0173CFC1922F21FB4AF68D3617A8319A09EB2B404E5BBD8BC5AEDD29622F82EFB4A1B98CA4B9A17CA8D1C1CCCEA62F0675B8124216507D3887A23892CD56E5FC9FF7094BD3AB2F79905E290BEAADE6039527B22935A0F23A39DCFC435D35D47C24844CAA41E5B5ADC6F33465E91E1DD7DA6450693555D115C8E2E69F2FE3C35D787F4AEAB561CA2DAAF9692749E4C75D26F551AF65B726B839A389D5386B00BAD888E89F45DC53995D1DE3B934180D7C865E2DDF84670F2DDF6FA275FD293E8C5FEAF3DDAE185B26C47907E1BE38078359A823B879B82A827BC0794FC439CFE1DDE66ACD24B5CBA44E71DBE9988C202583ED7C88DE33B39C7F63DAA9F34CEF7154037E308C6AF540A3A82647AF81A66DC1871ED8AF07FE3D8CA2BCA4D15CBF5C7C70F8FC7CBB8D4F059E261B76F220380BB6D9751E61619320210BE840E01CEA720F9CCD75F286686BBB2825BB1362DDCAADBFF2B57EE8B43D7BCDD53E08A3D14B7D95BEC9B1E06FE39F5E5675ED6F0A92E96EE984E676303B2724E7B54CBEBF0ED38C15FDFD35FBC2C687D8D5B7309B5A85C20CEF59B09BD408D9B41A143628174BF39E137E611F82E8F3A4E6988D2E8561F2DF76A719E892DB652EAA1466F92D09B3498D31AD0295DBD807C9E7F1A3E8A2F65395DD04887DB7E19B4DB19E622E13968F7E7D8E5A68436E3FDB0C729C42EC4458EEEFFB98BEE3DAC9137CE368AF6898180EF63AE96D2E48B93A9150AEC9E1E56058B9A77C4E11DE75126EBB6EC1B6E13EC81DE57592FF555FE6F869BDBAD90645A1F63DEF6DFC9AA5D5FCB94F07AE84BC68B7C97AF91416B1AD87636CBE7CDC54CEC9F9B8057624043995E1C317884500FE00CCA0D1D48B5F908F6D9C936B9878D255B5CBC44A4C3AE5AA2C30A90A73996455A6988B36339962554699893293CEB42A4B4CAA82A7B9CA02C20A6A4AA11C63046616581E6CFF52CDE8BACB3AC4414EADD28344444A29405084E5D1ABEC75CAC49D083DABE8A89C934CB2D5F32ED915DB1EFD5656FCDE68F17B95C5D909F69B0AF53A108D4D36C8D3D34E1D4B38B17C4E5DCA23825EC75B61AD60FE4B9F6ED0753E062FC355735ADE09A8EAC1F47342AB072FDC18E8870B569D624BE09E03105DE2B914CC1359BD46981EEE7C18A8EEA7CFAAB730CEA9CFFE381B53952B797E48BF625704F81CB740B30B3309322B70998DCE6F7BB0ED7DB00BE35F92F874A42A24E7D254CA20BBCAD061F08D3593C827B6FDFC31FE46554DCCA3A99836B37AFE50FB85EB51C4A12E8F61D1B6A93F741D8320D3A863109ECB44F12176538162886D14359789DE9E36543AD77156230FFB36C26966A417768DF45F279616FFF715F97592FDC5808D8EFA51ABCB898C554D0660C90BCAE51AF5F17E78D89196AC07E1E93DC582ADC11F7A66CF9E991737E1E5066D18751DA769980BAE91D5E697C227381B1C362179FB91F9A9821FA0B9149428445E068872470917B59F1344AA1AF91FCE971028D4AD6934176CF212F3BFFA7F202C817CB6C10219D6288540A10D9A49AFF3D021CE00736F6D9D7C873BE22CF89C9C4459337F471E97E525C87E27AD7C40BD0EC9A25E2A43F20DD4E33C2F09696A33D4D40262C1994DC7D3AC0107114BFB0A79BEDBE77648B3C40DF4723F8FE364171E8A5598E1F91807398CEC93E4083DFE6BC28CE484EA5F927057C99D0F88FB8F1E45ADC6670189A3D3FE501B73BA2910FFB60204DCAEC56F85AC1D54E11C0A38916CBDE0F886ED3FE648CFB5758163A1860B249BEF5C61F9B6A43972DD38B3C7596EF3645FB6EB87F833B33D31F2E4E94FBDAFD0D73A90019A89A4D7419A5D0769FA351F055E0661744ABC98481299DE84872D2BCABA396DB7DCE905C73310B574AF76B72AF9F25370B867E0F9355753E5B181EDC28DC70AFDCA92F02EDC4E88695493AB6FC7B01A72EDCD8DF9BDE7691A6FC35268B3E02372C98BAA5E1D762B9A58BEB295404A9FDBE71465E1310AB7B906CFD6BF532C808A6D174345B1B2C4276BD925BFAB9FD5583DDF66E555BCCB20DD063BD5F8B95D76E22FB917674931BA0751EE5C8AF0323C64AACBCF3B72780C22526FE92B70A8689E08D8C8456CDA32E49417ECC80E450042B645BFC2DB322473E9AC73B1E120A5475A43A34CE141E153A6C1A08397F2524E274E084348A916D5549F5BC1B423DE3E72D15123DBB06FB9575CE117C474C3C9063BD51A264C8B2AE35C9D9DD89637DE6BA5438E919ED48ECB8856BA1C752C6BCDCB35AFF5F46E1453DEC497F574A2587B9814CDBDE330892745C89D3088E8989E3AA08834631628D491B77145B45454A2F4C78F1E3D71EE85005F1BAA2941DEA6D7D26B972195024C67EE1E9C3A236E9911BA236E0193C2791ED4497AA4C28C8AB5344E93CAB9EBE6949C79FF43C955C7C6B413F230ED47C01DD61E8B429DDEEB1104B85E70E7C36F59541C600BC234A4A8833A153B46428BCA538F1FE86B3F7DB7C3F51FA1E3E1ED6252387F396192AEA7F241E951A29C6BF6863F85355ADBA9E7843E49FB51C127B58951F4DF5D6899187ACDB1743D4094A3E9DEA0279F64375BBAE815ED77DEAA5E24D0CE8DDBA501CF73EE462EE6F64DA639BDE7CE921263CE9D25BB1A7BEE0963A65677CD4AA494CF3B74465E956C37F4450A339D9A189F996A848AEDCFC112D80B754B88A0E83A8CD813E1765A442425564137A481B907C4E504C31BCA0BA499841124414A38D891F0D94FF6708EA125849DBA4A8CB7E680B6D71282509C09CA183DD4A8E215A6CB1C5BB4D59802A98B1C61500230630411E38C57A44E389902099D746324CDEEA4F6329EDFCC6148A65FD75D42A736A9C9886123D57E8BE8DA08A71306241DC15307219138CC02ABBAA794978052BA0E23E0936EA74520936060C2A06342C7D4C107600CB380A9019FD312A2797D354640ABBEDD9610D153CC5B1628A29CAA77C82ED3BD1A54641AD42ED2D152B7EB3128195DB5E7CE4902D40936A7504DE81F54E0025422DE9683616A187C9E42F2C4F0E304C748643511A228669C6C337D37272B35CAE49D68359BAE0DDF619E682A4FD30319014CFD6E302C034519A17AE668C6AB3536AEF1B67443F8B4C318C0C2410E2A142587347CF19C2EB66317C1E861374A4E0F634D7D4680AFA6E14C34E8886CE601556D0061C0C632105CCF2598D0566C0AE49E49506142C8630C38B3E0C22BC6CF27C8B0A8DA14783F9B6003A3F2C120A7E5F5E16E1988CC5036778834A4400BF5DC9A6A8D80634DEB2DD46BEB499D0C8166E6B1BDE1FA7CBCB571C5C6C7F8D9786AC8A8A6BBF386ABF27AA899ECCD2F7E55DEA02223E0D8A0ED16B12A0F7540CDF627FEC928A85DE2F6A7BE1AD3407681DB9F402D4CCF22534F400C08D8090F8B91DC83BA2A9811110227B901FE4B93DB35961A580D5A5E6FF298A835627F366927777546E8D208E120860E1DFB6087078EBBD2A20B6B680BBD77DFAB9201AC64E6286E5C356BC7C763F153C1962F2B5A64BF6199CA6394AE57572D9D18A4A3526751544583A4CAA8F887341F974C57D8D735E1984644835A484AD7B735425A5A235546CBAF63A247C9FA0FAB51CC2B755A54C324A84513A5E80C5AD31640323A8E089D109EF005942452C968C4B5F7492151DC0D558D98F2CE0ED5CAF56D203323B7A710096B73E7BE0D41C89DB9A534158E4A6B440BC72521A1D269568D38F5641024133ACC6568025A301428691B4C78C10F682C7E2FDF5ACB66ADCB4CDB6E2952E716D50D53D0CF41FBAA26A2C5570061B9C21E84AECFCBAFEFA99D5E5A2433B4341069909D180A04354575832F24991FD0358238A260550E9F28C9E106697160E4C837575C26799003E839C55DA11824E86CD5EF06522516438534A10927A41ECAE5E9AC583BC39A3757B0916A8337B41575E5FBD93A5D51014065C510A8779D556648A0E61AFA48417D9C40D2B0121A6903B67F1DEF7464918029943CB8EE7256C8105DF44518411104D8A0D3D98F19428E3E1233039F47A33D97153543150CEBECC04B1AD60E08A321600D13EE4371FB85663FE41DA414D312E6D1F01DF242BB68BBBF95549A43C8421A3244B122381DA2492574B20083A0F873308842BB079883A6E6132A8092F3F1A06F27608425503ABE8180A112C11186308105CE17E76A8AD1300170C301C6D031C809752038E4B84AF07358C220046BDCE016699708288380FB344815E40D9A3EE69037600C90D6CB18EDA3CE9431C03D00A402F2E27F1F63C88BFBC345A51D0A9B2528220469F218040E6D24D53B04692461DDC48F0F6D8BC36725721603DDF1D989A511469BA5084B65A40F4572EA2B83B04A71756A16F20C2C83F0470DE44BC5520917026734AD0EE14AAC4D339E2B41998BF06844C37204851238CF913A62F04BB8FA200567361A662CC249744C0C66D0E1F49C3BFE4C36560F44D95C4C6CA6EF875AEE177F161B7F8C07495E08E7A5278501FD0E490B03C042DC1231706C2411CC40B843A84600EB99909208D5D2D092701592777A085B69884806B212417B0158CA942443A898014D06573970338B309B0131C6308301C5BF60663A03A4991036F835DE58C0A36800A00D0653D60071BFC08037805F2C0737F8A8FD0803A600C07EE04EA5878116E2080047592D9980341052740242EF12B675C9B195221098C664D03EB6C678C0278675860E617A33287428D9C4B4DEFA35702F1AEBD3BA2BD46A7F232E51CB7D59DC51D77564E2DAB4A593F06137AA071BDEE8A5AB48F5E49ED69BAE479BDC0D3531A855CFB6B954EACFC853F672EC4222B4BD65727751DC97D2DC5EE43765E4232ED47697E6BEE26818D5DF84D39BD10A9FE617E8FC98764A6442651BCC9CEDC272E22B6ADE6C1A9653E2475A2F359B0F12B9AD6A47CC073DD86E9CF92050B0C172B3EEFA8AAE6EC46A9707CB8DBFE245DE54A196ED8D6FB8C02BEF26775C00DBC227214D96FA4DAEB40CD4C7917B1680754D6E6408D5D3DCC9E02A241CF0240CA6B985D11F91CDD3EBEDC58B36ED6253AC5BEE83FA878B4D9E65CB8ED92988DEC43B16A54DC29BE0782CDAA6FBB2FE6575730CB6C5F8F8FB9BF5EADB3E3AA4CFD69FB2ECF8F3669396A2D347FB709BC4697C973DDAC6FB4DB08B374F1F3FFECBE6C993CDBE92B1D90A2B1CF23591B6A4BC9F06F74C4A2D4E3EEDD8CB3049B31741167C0CD2BC152E777B259BFE9A49531070DB446DBDE69C6DF351F177BD2C1B6D1F15AA3C2200D519F0655EA7627FBDAC1E831B5BFD3AFFFE661B4441D25C6EE26E365DC6D1697FC06F3AE15F17451EF2BF4419DDAFAAA48B8D540DD9501BC552126A65EB1BB50D760CD5A051A043CB06AD017F8619B2C82D3745F39B7973145FBC559AA3FBD55CD265505F031645713FCFA669EB33E1CE6D5BDDBF726B60E4DB613A9BDAB2B6ADFA6B1EC54822EA9FEC30668ED48930419D0F348005162519A002FF7418505CC6FB23D04FDB5FCD253DDF16033993B4E97E359754ECD61DD8EE260B92628895745353AD25E7A1102AB74D3397FA82A56182EAABA65A4B06F595D3CCA5E6AA64A75494D6FC6621A53AFA2EC38FFBD95C567D864D96C5FD6C8168EE496A01D3C453D5B8B4DFE2CFC95D147F95A5F1BFCFC66D11B7440CBC1672B7C2C069A15F4E3D904D397CC0DBA8A6A387BA67633A78405F4EDD0EA83FFE141F64375CFD6431EEEC76C57EBB34EC343FCE0613EDB2985BDF8497004DFA26F6E55C31E1E6BFA79A3CB437589C9A15BB9063D0AEF8A7736DD8BF8751546CA843FD554EB3901A1C3EE741667C2A96D305917CC27C00235EB073438DC02BE1001DFAFBB9E2E76A1F849128A2FEC95CC6ABF44D3E444AF5A87F9B0D46B89B324EF8E8C842ECB1417C3B0C2EF2B293EFAFC33463C5B4F735FBC2E436863258C8FF1666A47820DD52FBF72CD811BA8BC9769A67846C35D952EFF2786CEE08C22FEC43107D26AA80E6B4AB8D59815446CB1AE6BFED4E2615C432DAD5CFA838229F65ED7E4BC28CA893986C571342B4926ADD5BF641F239053B4A9D62A72B2C904FB05C88082BD25065252284C94471691CA1A3B8D682F23CE2B2CA7D63A62E03F1BFCF6604AB2F68F55A3CAD78AADC575091EF8719C5AE93702B4F64AB9F2C22A4F8751EFB96BBDD4298D4FD6C2EABFAE4454B0DC40B94D32CF0CC22B6559678BB5FA7EA678BEA1BEA8DA93E2B021DF99AF3D200216298CE428563EEA158757C81920DE7B0D8BA426331D730ACD208970BA55B4C764CC22D0FA156A5A551699AAC360E571F6AF50FB32A754DCAA2735AEC37A081976BD0556986CB85D2A709717EE04101BC06DA2B7CE2C933DD832852CA40A343199EA8CB45FCEFE6D2DE25BBE2A60C2FA8FEC96ABF14DAD875DAD105B7721DF670DDFACA44E896AEEC3AE15AE46FB547B4E6FB61B00CECDA5BB6F3EB780B85F0EDAF678A18E8D6AD136C008A5E7BEC98081906403EDC57A3BD121CDDDBEEB54C3FD84F3C3CF786A3FE8E91C5E03C3E1C1F96C73C2D01F077901DA7FF1C9DB7CBD49FFA7C20F01427E145D894BFD8C30F7E820F02A4D9637D3625EA4B9AB9E7EAAE5D7AF260D8F553274F860B9B2D28731B4912CA5F660301F076BD53DB4334FCF68D6E2465EAD69EB2AD84FBEBEE0DC5BF6BE0D84AA488619AA87BD85D38CF873EF74E34F6C368617D3A49BAA0EE043EE9050C7BE8E9040C03BCB254796FABFDF1017603C28EBCFADB6F13197827A5C796B289B461D07913442C55664ACD8F36A7A5F779558A37E5209CA8A9363789E264171E8ACBEDCAD15D3169D87B21136198BF7CED0459EE011E7B84521F0F03C8A244F1FBEA171BC014DF366F0E8978E15366D3C4DCD3464E2D8C7F6FD0C2D4C798858B8BD4722B37BF0DBDB482B77ADEAAC9BE74301FE2CFEC2037BD926C73BAB7FE5C1EC685048BC5F720CDAE8334FD9ABBAF9741189D12C00C68268B155AF1F3F4263C6C5921F7E6B4DDAA2BB7DADCF625C325B848BAFC141CEE1974BF12CA602F3F1FF332587095622FF157968477E116432491CD435957DF8E6135DAE216D37E34BE8714A93FA4392CFFAE197269BE4D876EC56B7851E45339EA0B68AA39ACAEA2DF62F7D1CB37CB1B21769AA16F171B0DCD3C4D8B9D62324B8B756B022FB6D1CC234D2E825E047BC70F18BEAEA1B7DD7A58D143B3A28FC4F584DDC80D5B07D1DCF373F85D542E1372E79478980D8EE99577EA1C1BB511E7A16115CDFA75DAE6D9B891DB157B474E77918CCB6A75610C3024FD349CA3395B311E5A9A7E10CF51416BBD722D7661D186AB57E9DB53143D5BDF05512A47D978B57B430578330D3F69CCE7424E1253EC70F0DEAFFABA9A6B67ABE5790007FA5C5B1F0F95CB19DB1100CF7C519705BB5CC6770201E3A1CF77B9F6FA5A8A8776455F299B577F472BEC67C40FB9E7BD88855334406F32D805E992581F63BE7D8F32D26CB181BA70EF89ECF2484EAB8B548425C127B7A6EFFEB07A3F980BC05F8E32B8628443457793081F65D1A7A0A6078CEE19AC1F0533E4B33266A744BAFC068741CC0F05416B2EFAE7691CDB0D92EC639148FFDE4DCF5152B5E3544313C4E36D74C44C3F48D1A4FDDA0DF3F9791F3D31F98FE27F306E6D720F55CC6ABE5D0AB4044D973D7AA068A3E31C9142D75C8F16855C5CCED2EE7DD4BFB4FF6EC9C56B626F8171BC344AC11F5E1A23AD49C665A6EF2ACB7A9557E04BB82B58BE6FBEA719DBD701D3BFA2CB282C26CA6D8637C121BCCBBD6EB96FF36CFDF4F1E39FD6ABE75118A4151FBC3D8739DBED3769BA8B0006F3A247A88BD412FBF83F98D26E4D7BBE67772BACE92F36F28717007C0A0D9EADC3C202659FFB85E50D14646C771D647918752872B152D7F5AA4048F0B120A4AF51B221C577ACE05521872F41B2FD1424FFB10FBEFD272F2D4B6446627EB78BB49ABA3161662E78F95E6FB2E6BB01CDD6B1778B665BAFDE04DF5EB3C37DF62987E59FFE6C2D98E3F2AE247F0C338D10AB7600B8B1178B5DA8010C70AB0AAAE9B63D4802A0E7A7EDE045E0C5365D47856D8A7255464782ED2E43A5BDAE64EDF2BFB370CFE2BBBB94398B6D6F207B11AA525EFB14EB57D786F8DA4397E2A8AF4D7B952A843BDB080A315184A74A75D784A7B8AEA49C0EE1BF4E2C2CBBD25D58EC147A1975C1BDE3C53A0C475F6FE75FE505D91FCD5A8023AB78A33D486A4968876B439094F9A10D5DFC96B1CD61C2E407A3CBD4CB3E44F2D4CBC3F522E258CA43B3D6D4C81E2435FCC8EEB1AB7086C530AA314601723A61B108B882F88E7D0002203AF62156A538F6A46CE65F2AC965EC49ED41E5535CC59EF41F52BC4A4BEC4969FF420542624F5AFA94C753AEB8CFF138AE157721FC45202F73727E33C9F770419C6A59EC9051530DD7B667DB701F44C51644FE575ABE3CFBE4A7BCD06D50087C6A1F927404C4EE189149877B40B6A51B760F48FC749E45E19E3EA2B358E80F10D1C034C13E96DC7DC733103DB08F807FC008464300EC632168B8F88526F9F55080F7300622F7F5B1D2ED236CF8019DB0965677B97E9863E7F500B09AE4B24F60EB77EFC9EFA6930BF48D414630DD2E165E1E6DDF71E74E340B336EC86B0DEDEC625BB377EFBE6EC96B973C98590F1B67078487450CD7C91C46DFBA5C2894448C1E5D32CCAAD6BF878B1C6A23F475F8F6C343431722063D0CAAE329FDD19AC0CE722877E862CDD69190FAF4228BF24E1435E762DBB525F9ECBFA0BCD0663526B81CAD8D6D43C08609D35D84CA7DD9239814092F7BB6FF4007A2B04B508BEDC71501A58F736802FFA40781F29D27DFF3018C1CD2AC29615E2C7D7336DF0D31E9B26F328537526C37E1BECB93A73FD99F82E22824C181C2440A4A16D9AFF67A4AC81E6B2D2D19A4B941AD040B84907EEC5051410EA42F4004E9176AC6BC8F36C6B2BA7BD5F3F6204DA2083BA06BE24AA8C935BA5BDB0B4D8E5EBACF884B5220F6F1D5682B4CE3D687BD5B86900D9AD98FA40B54B3E31C7E7A3BF245F5886C390DBCDB93E46D33332849BC86D81FA66ED25B942FABFF9C6A18936AF9B12C708A525CF977A14E4699C085F6E08B311CBB4C695EF03633225C3118D5104D86587CF2D2581C7303371094F7B86F81F1EEEAB05B153FD7D7EEEBE20B528447D50F6F4E51161EA3709B979507520A55C7BBFA02FAEAF9362B8F395E06E936D8A96628382BA8B2ABABE6B202F5AFA216BF5384E7EDCF9262C61A44F90CA1583F0855BAEDEB248FC8C36310F1359632590CE2459D5A9172CA0B766487C24F2A35EC57602B5732AECE0002A5078D97D60BC1237CD76A4D3ADF66ED6FA3E0A61D337915BA1F07410D42B26CB83E63051A8CCA958A9226834DC730DC52D462CD26F221D7CDD6FD78B6D0816F3FCE003BFC9DCF697D0E7CB15A6A360939ED6F62A33D7EF4E889D26ED30200ACDD0CDA9F78CB6994E66FE614C8F5E079798EE6DEB830EC35BF2DDE6F80B7E291A226771B0877BE17F468DC8778EF591028A62C1E11E4C303242E1052BD1180D1D18C23CB2A8EE3C0402EA5BB3ECD2BC1FD3ADC68643A44F404114A5F4F4EE267801F9825C46934382BF0D88C13A362873B883A31741ABE5CACE11422D5BAE984DFAD06A569A040BC42303D1C6836E011A73615E5FD228623F17A36A4489DB2F861897C5E619E4313FC70C4783E665A708CEC6BECF131B9BF515E4C987F04A35C8B0754E112971ECFE81EEA986558A3C06A1123D91C9035E678E604ADC98734F48D9BF146B5390065E4B1CD092B930F6FC0EDFD65B8228876005247485FBC43D2922D20C54EEE93840BFCCB4098C839C02B22A52C1E5504BBC25CF174ADF0082C2030579516948192971E9C03755A42780EC06B113E6B2E081BD37B39426C7217A69E5C5C06C600E60E489BB3C2988EAD6441189BFF303917808D384C3AE26BEA611280D7742BE853C365A2B5744BC84CBEE2C0F3FCDC22B71AA8C66D3FA11BB9CB36D2CA28C75E24BA4E3E61D08150FFB8F030EB5E186F13521EAEEE3C30A9EB583E5DCF0F81C685A07032F4C9D442B720130D77BD072071122EFA40E9E35C3C92499214B584C461AE21E928AE860120CD0F8594D9B12FCD037867331CCF0188D30ECB4E789CE1D0AC60F40C86E779A27341A89CEE8684C015773EFE52E2C013EE5F484967E82B290640634C4EEE29256C9E819F9C1F2A1783C6C9970401DA45EFDB1B06A76A01F247F08C2D94CF601572311B175A164CABE247C051C7E4788BD3CE0CB9ACCC5149F202F99FCF61191963CC444AA33979C69A13E49ADF5688BEBD894FC9B6370D0B0E83E2BF18B894B4B3E055B10560D91A78D923E3A17A1DCAA79F98373A4676172E009985CFE095282AA1F51C9E9122F324222221F7B44CA490C49004526684108D2FE93DB64C8F8931C71617404C3AAC94B1733E93AEA9A0B41EA3CE6F42A6A39DBB7484A0803484156CA1AC3A08F7295262D328F34185C64B58D1BACD171563F3B4D9A102E7B41D09150DE55233DFD63A0BAB6376DA8B56E0C28992B6F4537224B52F860C8ACB771A64681C86B745B0E9B131E64A970B389ACCD3DFBF335CCEF0BE408ACD72C0F4C56304AAD5327132EE32C77CD032D121DB452E794064DBD5FFF4CBA63E8E9811CB66568CE79A82CD37CFCFE084991B4D3CA290312FFCD468358C983C9EB23857ECCEE0509A5708E39F8F85E4ABF2DD8092D5B398B5B654AA3BF6324CD2EC4590051F835475B5C557372C53078CF5EAAA7D8A001AB68BBBFFFBE0D97AF731CEE155BD68206450A02B16552D272A65543F43C2BFB28FC7E09EA5D5AAA891FCFA9D01B0903A0D2A894BD614D2C5BC4A195D12544497AA29A15D4E510A685320F96DA249058A5113D6BF4841D52F1275DA374B09AAF64D0AA87D93A811DFB1FC2AF2BB24A8802E55578248FBAB1623A683658959340572B48E4A615C1A5410976C08DB9AD30DC56E9D4E01B8CE6286038E6B0703049785400697CBB0AA02010B5A612117556D21A3460589A743295C4A878A95B2680A84EED72BA54299A0A2A17C863627CB87325116B7285FBC5E04208D4F8651C6E7B0AE6D173C19D4BACB6C56FB2EBF6E00842647EA5008E502074528A3890AC22172B87C210B5AB8904BE7B7A58399AAE39632809E5BCA63EA55A1537CB88F8572931E17FA40A31A7F5C4CD1844F840AE6D335E570AFE5AAE5F0896480C7673488F2E8A055C981457C36C1ABB22D4EC5CA06216D913B7D75308B6CE58D362C74230344398FD9004EC4BB4A0E62F8368E7EC1153DB42B699B19CC68EF46AD3CBEE5F786AED7625CE0268CC0ECA87A3E6EC56592E748C00373E24A04D701F2029A1F9439AFF88530356B3F83675D1BB10A06D56BD7A95B7CAB1554F2E00A4B5DAD5417E939C83E09F7210A7EFB6A02AF730115D5BDE125A82C4FA94A95B1E9D2A8956DDBAB9D7C126D8A9C1E818EC9C8DA4E5C4DE5D524A09AF4CB4A9EDA539ABB57A04726E60ED0851FF981E06BF01C90A72A83B3FDEA7372126F5F7DE0291BA0EABA076FDC81297CA9AC39949FE2CB097DAADB2288AA2D7298C30D9C9355B5E12022AB0A1215E19BA89CD2441033729585B52012D048CE21400DAE71099FC34B577DAB4FB43A9C71B8961FCF04E8F304F8E0A579CAC04B6FC7961D7901F852A20733507DC1907BDF537798DC1444BF30638AF7DA35C63607B06E6CE428F584E89EDD25B04E2E08A116BEEDCD82F07103063161EEF6640A70BDBEFC9C5E86B7AF3E411F0D98C0946CDA8BEBC4F7104A1106BB025ECC4141C2981DD9132EA63089BACE63E436C63209BED323C818DA2444A72172FBEF343331874108AAA34A1D240E1DD32C30BF27187C6889408D4F799195C2166825E4A95B9735FC882DC99EE6811A406328E09301DB7F1213617C88D05AB90975A2B8048E6FCE568BE1FADD56551EB0D3DA09A3764F3D1887EA6286047F2376B3C9CD65D6E5AC59E706EC76639B0CE3388356884DE8D04644177CF8A05A47A68F14F4369319AE2C39BA0644D598A6220E50982D5A1A7349F95EC2C40F9488AB79062743ECCD865020018632214BF21A58AAC75ACACF89032B0EAE3B56587E90DD72EAF29C871D73CC58BAB32BFDAA5CDF79D05419BA19E1B5A5C73500CAD20298C18CD1C5AB3190D347B20C08555E8C8163C28CBCA4676718B7FAF59900857E031B28744C1DFE0E212847C0F8CFB1835D1E0C80373F969598CCF53959339201505205E264869277B0CD2D30BCD09DB3F361041C06665C037E37B64632437BC0481B112039878C13B171C5E4D8637F5368DC829A73F805C7710D6270D1199BE35B5C8F1E7E19C9F6B02B5692C51955BFC6266256CBDBBD632F49CDCAF405297651487BA9B44DBBD854C794EB1FF27F667112DCB337F18E4569F9EBC5E6FD29FF7ACFAA7FBD606978DF89B8C8651E58C9C9DD096DF2BC3ADCC5CD155B49A3264B93DC5E3BC8825D9005CF932CBC2B8EE925F196E5F628FCE6AFB905F22C57FB8F6CF7EAF0EE941D4F5971F869FF311276B08B3BB954F9171B45E78B77C7E25FA98F2AE46A867915D8BBC3DF4F61B46BF57E1944A9E49C3011C565DF5F58FE7BD59659FE7F76FFBD95F4363E180AAACDD7DE51FEC0F6C7281796BE3BDC045F18AE9BDE86A2C52E5E84C17D12ECD35A46F77DFECF1C7EBBFDB7BFFE3F961E5398D6200200, '5.0.0.net45')