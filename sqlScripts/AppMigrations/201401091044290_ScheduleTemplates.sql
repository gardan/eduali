CREATE TABLE [dbo].[Template] (
    [Id] [int] NOT NULL IDENTITY,
    [Name] [nvarchar](max),
    [CreateDate] [datetimeoffset](7) NOT NULL,
    [Creator_Id] [int],
    CONSTRAINT [PK_dbo.Template] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_Creator_Id] ON [dbo].[Template]([Creator_Id])
CREATE TABLE [dbo].[TemplateDay] (
    [Id] [int] NOT NULL IDENTITY,
    [StartDate] [datetimeoffset](7) NOT NULL,
    [EndDate] [datetimeoffset](7) NOT NULL,
    [OffDay] [bit] NOT NULL,
    [TemplateId] [int] NOT NULL,
    CONSTRAINT [PK_dbo.TemplateDay] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_TemplateId] ON [dbo].[TemplateDay]([TemplateId])
ALTER TABLE [dbo].[Template] ADD CONSTRAINT [FK_dbo.Template_dbo.UserProfile_Creator_Id] FOREIGN KEY ([Creator_Id]) REFERENCES [dbo].[UserProfile] ([Id])
ALTER TABLE [dbo].[TemplateDay] ADD CONSTRAINT [FK_dbo.TemplateDay_dbo.Template_TemplateId] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([Id]) ON DELETE CASCADE
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201401091044290_ScheduleTemplates', 0x1F8B0800000000000400ED5D598FDC38927E5F60FF43A19E76071897ED39D0D328CFC0EDB21BC6F8A875797A1E0B7226ABACB5329523297DFCB67DD89FB47F61758B4744F010254A69BF749793A16030F83118BC22FEEF7FFEF7F26F5F77C9D96796E571BA7F72FEE8C1C3F333B6DFA4DB787FFFE4FC58DCFDFEA7F3BFFDF5DFFFEDF2F976F7F5ECB78EEE0F155DF9E53E7F72FEB1280E3F5F5CE49B8F6C17E50F76F1264BF3F4AE78B0497717D136BD78FCF0E15F2E1E3DBA60258BF392D7D9D9E5BBE3BE8877ACFE47F9CF67E97EC30EC5314A5EA75B96E4EDEF65C94DCDF5EC4DB463F921DAB027E72F93CD83ABA888CECF9E267154D67FC392BBF3B3C31F7FFE47CE6E8A2CDDDFDF1CA2228E92F7DF0EAC2CBF8B929CB5D2FE7CF8A3A9C00F1F57025F44FB7D5A94ECD2BD5383CFFBA6948D795E36BAF856895537E8C9792971769DA57771C278C292F4EFEC9BF043F95349786059F1ED1DBB6B3F7FB93D3FBB10BFBB903FEC3FE3BEA92428FFDA177F787C7EF6E69824D18784F58A2A357953A419FB95ED5916156C7B1D1505CBF6D5B7AC6E8152AB5447D5AC7DF9575753D92B259CCECF5EC45FD9F615DBDF171FFBDA5E475FBB5FCA3FCFCFFEB18F4BF4951F15D991F1D235FF962A7E137D8EEFEBDE91447897262C3F3F7BC792BA34FF181F1AA43CE0747EDB52BDC8D25DF5A7D0214DE1ED4D7ACC36554B528CE27D94DDB3C25CB4B75FF66C8BCB5795DC5634992019F7735F6327135FD6C96B25CDFB2C8AF76517C11275A58054529122995C6E2B5DA5ED2B5644718277665B7ECB0F26A94B011245548C0E12F9F26218CAE400AF58BB8CECEA3B97D1DD7D37F508AFEA79633FC21FFFE9CFC4086FE9E99A9F45FB2B96B0A2AFFA97B49425DAEB1991206B7BDB8BC98090051B1553099F2551BCC3CD455D5CB3962DC650021A0DAED8C56E64CE164CB6AA9075731E7075AB4E693E7518690E73A954E96F51729CBF56330366E3058C1B3510508141E584D56E723C25A83E4B770727EB2CF179BAA916046C3B96CF75523AF06C7B53445951AE1A7AB9AABFDF972B90B7777779D5816E6C9FEFB71E995EB13CCEFCCBDAB2F52B6B296471CC67370F37C70FFFCD3685B58590D8D4238F65041B13619E1DF322DD916C8CA4F967FA29BB4BD22F039F5F8FF1D6569A5FB3A85AB4DF7CCB0BB61B2BD2B33449B3D97BF74DFAF6AE536A6F1C3D4D052D72E8054E4F04AC70DA32654650086CD78337C5B132AEB02FD516DE722BB44136A55071F2540A5B3FAF1D2AB4DE7A22406F6D19AEB78EC0566F1D5240D1BA4258716AA9A23980C4A38B6CB1A446F546B8CBA45477773AA96A92DB6104AAC28914E8B25F22B3556039E659F639665FC8B1D1538112A344D85801286DE5AE362DB7C7845D45DF68457384A4BA213A54E920B1B3EA2B4F076E8440028A0F5328822364B62297FFBCCF589E3FFF5CAE5C1A6141B9553A5078824C690145EB6470CB0F75CD50E94808993483A2B56DC6D33C67F90E9DD7FA625068B55491152071B3CFCFD2FD5D7C7FCCDA3D7ECA2CAAF4B49124E87193497D64DB42C127A427228914988F040A7C5A12C9AC27F5745F449BE2BAD401067C810499DF6112759247E8AC0DFE81EDB7E8FE795F0A4F504AA93A33A924A376A53B37F784F61DE6D922D379C984A5AE3CE046EDAAB7C795C176812718D5F39DA3FEA3E7C7AD54AF3FA6FBF96B7DBADD565EC6ECF5720718FEF66687D13076C880531134A61C0E8448E9901347A01895113A9174B3E9CDEAE5C7C81E89755F9B7A938C1972CBA3DBEB1988D49DA27E5743C6A342603B66E82B0496DB589874AA27E77D39D28D237035D2CB812E463A0A978B0E94C9E9F8222607284695E8CDE4F440FB6173C6D99C5FE224296B0A35BDFF12ED3F3DDD6CD26305FB602EB4F5CA0FB273308566DDA718453F36CF7A0B5A1EB0C42EB5DB78E55BFD63D08E1C35CF77519CCC5EEBCBFC758985B1A7E2639C135FFE92F354280E5E64424489D4518652FA3D9072B55DB4BC13F96B23F6D868793D99B2DEE13A253356B632FBF62ACE0B5669E815FBCCE6B72FCFBFC64568112A35BC63F52E723825146125A874509F8B954327FECCDE47C9A7A0EA588C2C9562CADFB6C705C852EA6529A2546AF96716174195115680C66CECA2ECD3FC4BA8AAF5A1EAEEA6D4B19E5C77FF61AC4398B172F61B73D550EBB3F83951961D15E2D0D9F22A978F2D265C3A7913CAD83DAD3A2685BDD3817B4F0509D71612C275145E2E46D7D7874EC9C3BBCEE2CD302CD826DE45A5A1BCCECABFDAF7973F9D9FDD6CA2AA52FB91F7267DC5F266F364CC006E985CF5372246D91496B08D876BDCBE6C5C28E3E47CB30EBB66815CC0F3610BC42A007B00126824F56217E41B7AA7641A022FBA9A7E092C44D02557A381A0222C6591D5A86229D22C6489D5286521C2045D69359A082A82A7B5CA0ADC0A6A49A1DC58075616180D763CAC12BAEE2C4F71675F2BF4241E91520BE01461347A91BD2E99B8CBFF27E51DD56B9220E77C6FB32DCB46AE823CBFE8F4FB94D3D9088E5B0A8D7AFB822D36C887324E034B789C724A43CA23825EA51B61AF60F95B9F6ED0757EF124C355F330CA09A8EA1BA45342AB072BDC29E8BB73569D7C4B154E9077895329982748BD7A98403DB6CFFB0C44F73366D50777A73466BF9F83A9C6943CDDE75FB037403CC52DD0EDC24A822405DE2DD3F4B6B71ADF45DB38FD354B8F07AA413295A65106E46A842A836FAC23697D649B4F1FD2AF54D3441A4DC3B4C4EAE553ED17AEF750A77A278C79DBA6F6D0750E8254A3CE41389589E0539CA602D510C7282A9589DC9E0E5406D37152330FFB3AC3557664140E9DF45F479657FFF7E5F90D9CFDF9809D8CFA596BA044E6AA8E00D8F282A85CBD3EDE0E4F3BD392ED202CBD275FB057F88F9139726496D5057CD9A275A3AED33C8F4BC62DB27A7AC97D82C960B709A11D17CC5665FC039A6B418912C8D20051EE28E1BCF6538248D322FFD3F91A1C85B6378DD6821D2DB1FE6BFF07C212A0B3751648B746A904726D5022BDCC53BB3813ACBDB56DF2EDEE88ABE053321275CBFC5D795C979520C79DB4F3018D3A84447D5586D04D34E23C6F09695A33D5D2020A78B69881A7D9038E12968F65F274BB2BF59017991BE8E5719EA6D936DE57BB30D3C7239EE432B2CF7876E8F55F9320784EA81623D62D06C76B79CE4E060D441261D44578A840A058599D4234A356A535C31FDD1FFE96D3B800E42362583AA052B6561472DD76D6FB88908B41A6D11434D9E3A49BE3E190C42C9FAC82B201FBFC906685BF1A1CAFB8DA86FB54B699F188A04E58E49368AD048D2FE22C2F8218C25751A08AC3C493992990A573B0971109DEA0CC7D542238C713D42A0FCA55BCA9E48EB293BA741D6418BCC8E2D2FA25DF66A8DC3CDACCE71234D18738A99476421DBC827BE9DE17C5C81636DFC5503A13A85C7D060F118DDBB961BB4352A9F4845017C4AC4CF9F0BBED233CDBC74070DB7728BFBF0294AB71C02122EBDB6FD4A5A58E297455492A53777B64022FA83FB1474CCB36B7E56795BEC79E5AB45DE7D16AF723C6D7D0C2C00B8E3FC73DA978DB6C799E127EAB56CD6FB8D3E4B8DBB7CA5CEE3A65E8716C990253003B5120D92838BE66BB0F2CABA475816325860B24BBEF5C61F9A65E99BA4EEBF6382B759EEDEA7E7D9F7E62B68FD91E3DFE697468D75606F2ECD8740FE33ACAF32F69B67D51BAA4C7CC8B8A2496F94DBCDFB0AAAE9BE366C33DAC727C9ED572F7AA77AB9A9F7D8CF6F70C9C535D55751325B677CA3C36E83796C577F12620A651499E7F3DC4CD69A0BDBA31BBF734CFD34D5C33EDEEA2A5429A6751D4D27D3A6B2FBBA470CEE7465742BEE8523FC7A4880F49BC29257872FE3B450328DBDEA317D9CA1C1F9DCB26F96D9BF1FEEC69BDCB54DAAA28DF54875E8A492EEB167F29AD38CBAAD93D4A4AE3529D7CC7FB4235F9E5408E0F5142CA2D7D054E1515BD3A555492F575C82557ACDAED2E4524FB625CE57D1D92BA74DAB9BCE020A5475A97CC93C28392D59306830E5E7212508E9DE086905C2D9AC9BB2455FD7863154AA8C9E6326A781B8E2DF7862B098930D9F0EC448368FDFE927993D19C461CDB3E7BB1EF46F3DDA41310F46DBD341D7287CDB014DEA4126D30316D236D2AD13726B54BD90282D8D7E1B014CC5D28A185234441583B409628E4F99A0FC085C00F107E2EEC01FD615275FB4930D0E19926309418A49D18E022E663B1C0A23E65C55AECA2B625332054DB676BB191488A113314A9F946BC03554DC7C455D12744593644E536CC8E4FB99F4C04E073F42C0099DD94803BD1DADC32DEB139D40180D3D05FB051889A1B0C9593481436F3F8218572D79BF3C8443533C7A84435B08A11A9240BC57A1ACF1CCAF9BD5D500EF3D187E61B5DC59C80493F03EEB0FE5815EAF4568FC809EB057733DB7B203909262195A9641071488066D17822C38941EBC30F3B5CFE19061EDE2F2695F3B1D0820C3D35FD8C1E254A18256FF85312296B07F592D027493F2BF8A43E31DA4619E2E705865E77B54C0F10E5A29937E8C937D4CCB64A1E3E78F0C8D9FA43C9BB75139466EF68C4D4B7E6FD22A20D33FA5E2BDE231A26CEF62046BBDFAD5C76F6B48F2EDF8FD61F12A96370F47EB824C49CFBE1925E8D9D8880EE7B2FBBE6A05BA2F30E9D990FBDFBA7EC62F22E9D9858262F55094D9E3B074D2059C056E1CCD36D987124C2FDB40AA75E6C82CEBB02A927C465384F4BCD88A3718A88F4388ACF35A49FB377BEF0EC3A6B5801E91A319F0B86F6D71AD643780E2463F450B38A5798AE736ED1362304525739C3A0A9AF8C1144CC335E911A60B6E97A074C65A49B23E9BC46EA28E3337B394CC96466A4550C6A9396CCE83652FDB78AA18D6433C280A44B6D3440484C996581554D5AA455A0946EC30CF8A4FB6915C8BCC6730F61D0C13F8110AA52DBC094A86B4DDEBCBE1933A055DF6F6BF0E8815668ED29F1CD2C905DA77935684818D4AED2D05271E53128190599E79EE10049036C1E3999243E50810B24D1F0B61D0C2745C1D7296486147E9EE072F1582D84A8E42A4EBA093FCCC946CDB278277ACD6668C3D1BB032DE5E9C438460053BF9B0CCB405546A85E389AF166CD8D6BBC2FDD101E761A03F24F90930A958C429ABEF86C26B6731791CBC26E960C0F634D7B6680AFA6E34C241852B82C03AA5A07C2200FC944703D156742DBB010C83D11A7C224158D31E0CC9C0BAF183F1D27C3A26921F07E32CE0696C406839C36A30DF7E045CC8964F3984D930E67A5965BD3AC1970ACE9BD955A6D7D3A2343A099596C6FB83E1D6B6DDCB0F9317E32961A52AAE9E9BCE1AEBC1E6A2667F3ABDF953768C80C3836E8BB55ECCA43035073FC897F320B6AD778FCA96F4618C8AEF0F8136885E95D64F59359001BF0B21899754FD704B3147CC04D6E20F3A3C9EB1A4B09AC262DAF2F794CC49A713C9BF493BB38330C6928A71A060D32C1DA808426519FC5B825D3098A7C07211737CF10AD98019044DF98D4AEE4F40BFBEECC0C8F30B9F757686B0726DD90198DE5DAE10924FCC3C04365FFE37CE63E79A4DD1C4D240E9C6F46C685980152B87E173DDB6259EEB08ED6A6BC13DDD92EF9A31D9A74F9F24C6306784195469819A0A5D1F9A2F1056637C3FA9D4E75C6C5E1E0B3E2D984E2A0B2A4E9A300849F38A906CC0044AA7F8CF7B7424611807236A1DE1699C089030B9732CCC6992353AFA9EC970746AA0573F87044FF188191CB1716148DFA1D2B34079E1E2626100CB1278564ADC217E4740A2B7EE9D32740B35AF093B9AFBC2BE4799D46A60E045B59C46EB23C1CAA9FD85775BBBD22BF61851ACFA7F4AD9EF73969201995368BACAAF6433CAADFB51FD7E952B0AFDBAC351A169DB70C7119D60B1A267D6E0C95471F19DF448EEAF5012246E50EE8A46836C34129BAB3089D42DB3899108F2128A98E091F5F18E424462ED6B0EB039841ACB890681A3675640EAA97DB981F664AEEDF1A12DAE65E771B82907B594B492A3C88D6B0161E45424CA537AB1A76EAFB1F8827F464CB50053463E83844DB61C3C56FB8B3F81BFBD65276375ACCA41D2E1CE9CCA27A2D1AB473D0ED6913D6DC053594AF70D35037E6859B14E0A097AEC2186A1A384F20073174DCA3A94AD84B83984BDB9906ECC029AD3D06D0E175D80253B13A9469B8089B1FE004DD976AC74F541CF3ABB876EAA32C069B2611E9CD12B79483398A6B6C1D585A4F124446EF991A32C18C2FBFCED242A073E7601C0C2EA2861197BF54E5C3174A7C38B74F74B5B89C80671C91EC36015903057F5524ECFDE05EFCC1355396362893CED9E598B4CEA1BC7E145B67D8F22E741FD26C30B29F22AE1CD74F272BCA0068ACE8548F6EB39AB00E68B926AB9DB22B0AE7B5336C8486DB84FDDFEF15F57EBAAA0A8506975D26851431F8F384121446800E0699BDA941589FE19A4017C6601BA075B1AB3EA035F07423653830E9D66A884E781A4D233852541BD0444E739A161E78D22F40218619C284F6E87384F11388B48A24F4A4CF0A361D7890D4535A8DC1E94788662969487CE84A4942C2331DF6023C6B8943BF4E4D03A96993FA2FBC2A6AE00A680A1DCD2E9A52F323414AD26451125B82E75132E96E1DAF8915A2E4EB01D441E7F4111A8066F5E16D6ABF91466802CDE333D1105233C8108A3081059E68C65515B36102482A032843977A463C9BC593CF708DE0F722098510E96626D748BFD54B2904BC558F3441BE4E3F461DF2757903A48D524677B4452A033CFF421A201F818D51867CEC359D9302A5E120AC87993747E5EB70B520811CFFFE848570FCC1CB23B0BB2E5F1D7177FCE54B22060BAA317AC0B748641203D9F1AD124B25CCB665229C0491530B42A96F0C921A816B53774E65A0192409C244538C582B61596142D3E61016D65A35B35B5835FC3E6E6635A1FA21FB8807EB570D2E7F42A9B7BC7878FE69A6683C12BC89C20C069C3E70BC3F95CD3502D190E4263AD38F436D00737F1A9B6F600267E646965D1FD91CB43B646C730016E289BF816123A3994F843B245E36A03D93C8DA42B334B1B5B906C91719085D69A2694FA425227633A029D348CF42C30C623D738D03EF6A106A3388EE3CCD6440051136539D01D24CA20EFB55DE5CC0A362D942A79DA6A16FC5C34B83E0B7FCC91D787F853A1C3508770BE80FBC88E361A28502DD82B3AC3622AE341152317185D125DC5A22E7562A0A6E189541D7B434CA033E316CB3FAA5478502CC8D54EB6D5C03C13DB131AD8B03AA8E372212A83C96C50B63BA814CC4FEB434123EF4468D60C3B0947413A9913C527BE146B449804313855A8D6C9BC888FE941C72946351F5A0533F93007CE2719D26041F7F5625DFE0A44E013541F766C3A83E9C9B5E8D56F8348F02E747B5219109D56DB072B673CB89AFA875B3A95B4EB19F69BFD46C3D48505BB58E580F7AD0DD3CEB41A06283ED665D0C265DDB88DD2E0F9A9B7FC78B0CB7446DDB1B87698277DE4D023501BA852FFA9B6CF59BC4659A688C43C18200D56A630A090DA3A20A71EDE8DE19102AA2E208499C62EE0184BF0345AD66104A835341AD7E2C4F19E7D712103D055A256B62AC886B573CCA0A6FAAB167243A5E138F262C180872715D1B3744688E2E7288649091E731462CA7B7F160580BE8928B36FC857837850A80C15F75915EEF50D75DA89817135D6780C22C40B6471B8E41B414544006BE25C23B22CAF450211800863E75433A54646000B009A4F384894F739A7E10213100C0F95B1F2D409A78C97801C2ACC23D1523A7723242C0782D5561392A1E7D5080BEECF2A23A74DC45ED0F971725C9861D8A6394BC4EB72CC9BB82D7D1E1504D05C397ED2F67378768532D6E7F7F737EF67597ECF327E71F8BE2F0F3C5455EB3CE1FECE24D96E6E95DF16093EE2EA26D7AF1F8E1C3BF5C3C7A74B16B785C6C84E3093984415F53899DE89E49A5D575EE2D7B116779711515D187282F7BE1D976A790E943207415019110D4DEEB5EEC751F557FB767AAC9E64125CA03025083025F946DAAEE0CD6CD637067AB5F97DFDF6CA224CABAE8235CE493676972DCEDF14828F8D75595FBF22F91C7F0ABCAE9F2426A86ACA80B4553126A65ED1BF50DF6A0CDA053A0E78F06BD017F8629B2A296BBA2FBCDBC3BAA2FDE28DD31FC6ACEE959D446F01159713F2FA66BDBD7A5CE7DDBC40671EB60E4DB69069BDAB3B6BDFA5B941C2516ED4F761833476A204C506F1E0C6081ADAE0C50817F3A0D289EA5A5AFA48ED3FE57734E4F37D544CE2469865FCD3955576DF66C7B53445935C54AB2A9A5D69C4B5708E5DB979973BD62799CA1F2AAA5D69C4179E53273AE4D8405915BF79B0597E6B5A80C3FEE67735EED8A4DE6C5FD6C81E8F6A194CC8CFFDD9CDB3FD34FD95D927E91B9F1BF9B735342EDF22CB571788936A749B5FE128770FD93C5F490BEBDEB74346C2209D30548B118A34DBCB637B0D9C8636C03938D7E197A1A0F3979C237C04CE74E7567C974EA84BE0CDD0FE86CF431DDCB9350F393C5ACBBDD565705A549B7FBD16E25D62EFE64B548458BC1597F4AE836DEE1135193F18E7DB9549CF99D11578894E1EDB41354B0A7E00658C13F5D2A587E8993A46C116857E4320BAED1FE53B914488FD58D0581255FB01CC088B11DDC502344A674800EFDFD52F1F37C17C589C8A2FDC99CC7CBFC7539954BED687F9BC750F935A58150CCBD22774270FFBD037A896FA7416E5977F6ED555CAE9DAA65C92BF699C92884082CF87F8D0B923D506E29FD3B562F0031D9C5623BC90B82B75A6C2977FD46AA3455F167F63E4A3E114D4029ED5A6356214568D9C2F2B7EDD1A48118A15DFB8CAA23E82C5BF7CF2C2E883689C5762D21582BA5D6A36517659F7270A0B42576B2C20CF902CB0DADB8497FAAEC68C5705A549C1B979A52DCB3433356E2BCEA3371A66E27F2BF2F66066B5FE98FDA846F6271BBEFC423DF4F338B5D67F146DE12687EB2D9C87B557AE7F5954771F7AEFFD99C57F3C9551FFE9867289759E099256CA31C150CBF861A67AB1A1BEAB3F931FB20438079E70D1182C534838572C7DC5DB1E61A0CC51BA6B03802457D315737AC9108E70B955B2CC74CDC2D0FAE5623A5516D1A521B83AB77B5C6BB598DB82675D19416E756A8E3E5EA743592E17CA1F2302ECE773C2980B14046B94F7C821077278AE432D1EC50BB27EA8616FFBB39B7B7D9964927ACED4F56E7EED00501A79B01E0950087BB006E632510BAA5B82D4EB81673D4D8235AF3FD3458066E7F58F6F3AB7403B9F0FDAF278A1828F48A136C54460ED83161320D807C98AF4E7AC539BAB73D0D0A3FD9079E9E47C351FFD0DC62729E1F8E3FB6C73C6D01F081681C97FF5CCA3297A53FF5F944E0A95E5488B0A97FB1879F1A480203244C39A6467D4D0BB75C43EC0D4F160C8B41E264C970668B0565A9238943FDCB622000865872EA7B28D5A07DA71B7109DDDB21FB4A0862E4DE517CEE46C75E22594CD3454D6D328FE1D71FB3C584F093A31439814FCAF2690F3D1D83698057D72A9F6DF53FFE80DD84B023E3BF8C3B440672C18E385236E1360D3A6FA284E5CA4AA9FBD1E6DEF9AE6C4A5E64204ED4529BB72C69B68DF7D5C37DE5969D5834EDFBA240189642C338A1960C80638053CDF7D32053DDA9C7F6E803F68CEB23F0265FB35B4FCCF61ADFBC07A6DC661CFB462ED45E4C1F08C96D1F06FBDC641306FF76C2ED3BB9A3FB1F6D9E901E0E491DF5477C41DAFD6A25D13E3FA499BC2A1B7E5E0C50F888504E502118188085FC7A1AB8D4B15254E3C2FD6C718E1541AC865FE77DA860F3822FD81E71F5B0FB2ADE549E5894C5AE3398C4C7E532809EC552E7B517A5DEF6DBE41B0062A16431BD2E455573EA713EDC9ACB0B10F2F38956374BBD61B18EB5C7105ECD6DB18C04BE335919A39F2ED524ACEAA050882338AA6F1DAF81515F7F3FA6E0EDDD5DA501717DD4FE6673F8D02853B128DCEF8B411E1F93D071E5DC31705A3EE31F4F03BBAA4679C91ADBC67229BF6DA596B6BFF892C574F16BB6FBC0B2FC637C70EB61FC7B831EA63EC6345C2D81A017C173DC14C17BBDECD56C57EF97BE4F3FB1BDDCF54AB1CD73EAF673F9544228B05B835D4779FE25CDB62F4A27EF98016A40892C5657E2E7F94DBCDFB08AEFCD71B3512FA269A9ED6B866B70E1F4EC63B4BF6750D83188C09EFF4D941430E3A6C49EE36F2C8BEFE20D864882CC435DCFBF1EE2E6F000D798F6A3F92DA41811573A924F13D667C5466249F6E550B0484DB860F991D1C0AE8B15ACAA037E9E844468BCC5C234565AE9ABB793AC8D396C281911C6E1D64E303978B1756FF25537C1613501793B2A22EA2E14F215D09FC2D4B27F4DA73ECB6E55C5B2EB5C9BC0A013766C1FAABE8B26470429E388906064486C38407D32CB919DDAB1F3D0B18A64E3066DCB66EE012B84D3E9D350C0DD8BD292317AA89C1AAAB7075530B2CF45AE1E7A1E13731C00FA14203323A04F3845F63D4085BC77B6E86F85E9C89EEEF879E86355B475F66E1F706848474185341AA88C231701CA53D88D545EC7C543BFAAA28D839CB548A5F1D8C655579DBDCCDF1C93E4C9F95D94E4D062196CB09F89BC0222E1732B34D88D2D3BDF5B62EB632AB71F514692ADD6FF16A2B390431EA1B40AF742685260BB9CE10F8BF79D990039300989139CD836DE093ECB2ACC97031854C2EF0C33C0AB92DB3ED9AED95B9681DEE0C98AF9D325682B05AF7C64BF419C7DECFD1002FBF13B553D869A9AA094B3460FE1F493149D5F5A7BAD7F79D6479F43F77BB13F6A563DE2349E400A918410394F5E202A909480DF0B16B0AC82E431B9486A7E220EE89F4E1438FBA2C146C62522856EB91E2D4A5A4599A43FDE6A7FE9FFDDA7556C531A0AB9166BA55499136B65E46D7A4539C76143727E5636E073BCADF21B3697F05BE7F95FC9B324AE364D7A82D7D13EBE2B67E0FA68EEC9F9E3870F7F3A3F7B9AC451DE64C2B4CFDEC8B6BB8B3CDF267CAF72570CD47308B1FB2FFFCE947EEBFAF31DBB3BC3BAFEF242FEF012804F25C193F3B8D2403DE67E65650795B66B7B1D15A54BBDAFA8582DEBF9598590E843958AB345C905C97EC887D854B2FF1C659B8F51F61FBBE8EB7FF2DC8A4CCEC5C61F68925A53CF9ECCD4059FD0E855D67D37A1DA86BC85A2DACECF5E475F5FB1FD7DF1B184E59FFE6CCD98CB62D870FE10171A2656FD0064055C2D76A10E30C0ADCAA84D34E88113003D3F7D071F08ACB6EB862480A62857790CE9FFDC79A809FF1A5EDBF2EF22DEB1F4EE2E67CE6CFB6B9C5E98AAC9FE7CB2F52B6B97F2CFC390E292FE998E2A950977231E646222089F87C35D123EB95FC3E5B88FFF7564713D94EEE2EA959B9D5CCABB4577E19E3589FD3CF41A9CCFCFBB5904EF40ACD62A3A4E687693887C02F1BD690BB0D6CDB33A0F9CFAEC551E78497984FC0F1D28D5DC0F30F8B1F253771E9CFBED47EFC959E47CB0E4B3C84D679B89946C3FBAB57D3CED815397EACD7DC9E038B4FD581A633821378D560BA5E75086351FC80252ABF960AB2655F3246CE19F2B993DCD93D893F2A7B2A379927F4AF66A22344F42FB672AA440F324A54F7E7C906777CBCC45771E61DEB9B77A5EF654F8C340C34D0CEBED45E086DA6AA78C36B959AB7BB6897751521D21957FE5715A727EF45359E926AA183EB6F76D869467EE1891D39C8D806C9FE0CCDDB3F1337856857BFABADD6AA13F8147032726F37164E2DB9F811292F958394CE8C168528EF9D8E39ACE7FA1D38A79A8C0BB1B03A513F37152E1C36DF80E8DB03691D77AED30970FCC03C0DA7897631C5BBF67877E0F0D5DA06F0C3222B7D66AE1E551F743B6AE40AB30E38EBCD624BA5A6D6F8E1EDDD77DBAAC354F66D6D3C6C901E1C72686EB620E4B18B55E28D4A95F3C9A64388FC3F8112E666D9861ACC32F997E7474C562D2CBBCBACC48DF5B17D8690ECD56B45AB50D698F7C5A915559272A19D06AFBB54F2B347E4379A5DD6A9C5267B63EB67501BBDC3BEE2CD46C3B239C4931C5CEC8FE9FE8E204919F66B543D97103CA4A67A7F2206A399B75CEF7BACD174C707297A59AB33E0BCC4447BA437298892AE052C678A9C1B8A3D1C42C4BED6A2E7F8B87A138A470F17165C5DB5D44D77BE7161B225452941F265A4CB0325D3FE0E94A56DB072B38499AC84184A35FACB623BD0DA6556D15A3494356DB8FCB1E905D2692117B095C069209167D70E492D5A2A1490CE263540B79413C30940395F81ED958D20EB3AE84E395EBBBB3FB6E8A9336FB2E53F27988FD2604A978F4F827FB37345C6A0F70449B3AE560128F71ADD7A7EA1871C0DE27E93057A815632151871F3D34293A26921748D0E1176AC6F9386C946515306564C81F3AB9056C80AE89384E26B16F6E6DA390385AE9B13B12D7586A8A31B61AED8530667DDA803048120833FD91691C54723CB7825E8F7C55238E333809FC9FE1E9D32D98A9D5205302D217701C6EBD76D51AC71FAD4DA36432BB81997AC9F4049E15CBD7B554956AA3C85B18033410BCFF79CA492901E6A91151950D1D04D360C8789F19852536701D1049A6B8D6E1A5B3B89896DC6C5B47B8BB059C8AE7FBED59F5731B90B0ADBE0A17F9A0F9E1F53129E243126FCABA4A6F550962FAB60DCD77F6B4DE50AF82F5E59BEAE45351755915557713844F16A0FD5594E2770AF3B2FF59566D0B444969F8AB93F958CD35779D95CB9EF810257C8B25220B4FA96A53CF522EB962D531622991D2C27115F67C25E5EA1420043BA5F1D25B21D88D1A7AAD2BE7FBACFF6D16DCC841B46A11861F27410D9261CC7013CC0A3458C223CA150D069B2E720797C809EBB63E500FDF6DC38F270B1D3840D102B0C3475D096B73E0686C52B749C8E97F133BEDE183078F947E0B0B00B0750BE87FEE68306CF75317CD86AE13A9F8FE934A4ED692107A5A009C944B5AE14055CE47F82270E84325DA7FDB8DC2EFF3A1C9CCC079C212916A6D322419DA4029AC58101875FB1D4874C16579355DFC4AC125EF7E5BBD4F0346E744AA0AEED274B85997F9991F40339B1F1B0C2DC1FC88FBD8EB029318BE53308B62C929008B8855BA1A78AD628E0B8BAA39E73B7B48059FF5862CC8C87996E3BA69222C0D11617921B85FA7DB06305D4C8DC4109A5D1BDF0868A32C04C60F1C8ADDC9533929F0D83830B362878BAD11183A5D92468F1E926633310C1466F670ECE040A7A59C7153B1C9C8BD8AE9488C380B09D296AC7E5A22B3BF2F736A82F3DACF6763C28223C42EA1153E82DB1B25A1FBF23D1825D22F200A57B8767F860E6C8CD419DAAD5160B58A996C09C89A733E738256F0294DC1D6FCB3DA128012660BDA0E2BC1A7372020F13A4C111449191247285FBD41D2C68F46AA0D6E938498C4EB409818469917442A593DAA8880D14BC5D3B5121A79058EB92AB4200C54BC76E71C68D31ADC73005EABB0594B41D89CD6CB1162C14D98FA64641D1853E506A539298C018D5A2BC6963F4D2E0560334E938EF80A3D4D02F00AB7831E1A2E81F6D22D21137CC7814F5D708B3C27A53AB7FF84EEE4816CA69D512E2183683AF982492742DD2BDD697088A7A240EAC3C55D06267503CBA7E9F92ED0B8121406439F9C2DE1160CAECFBDAB06F252082FACA1F2795E7CCB791F14B184C269DE7FEBB2764C03403AE50552E790506219C03B99E97809400C3B2D3BE1718153B382D113989E9789CE15A132DCC30A21FDCDE9D84B29AD8FF0FC422A3A415B49253532C664704B2961F304ECE4F250B91A3406DF12043249793FDE30B8550BE4B302EFD8427406BB90AB39B8D026F6B2AA7E061CD58996561939A44911254BA1EC6AAF35660890010BA968190143FACC4F339A9F21DB94B0F936FC7A0AA60549A96555D90CFDCF25849AEEA13D0E053E1F95CCAEFF7D2A38CC7C2485E6DE5A1A26F82C453E83934DF524954FAA243C45140AD61EDC0CCF1D85D4D7CA16CED76D13B58438F4EE523309A8EC7F3C89036E30FB145257F0636D2ECDD22D9237CBB1F7A6BA65C3E58582C498F0C2BC4DC77A0291F145792EF752A0754F979F692A6F456359B80451E21A66F8F914AC0B96070BA98D0E023F13362AC96F9B95FCED4D7ACC36A3E37EE330A8FE8B814B293B8940DEB600AC7B03AF7B663CBC8FB27B86DFEAF4BCAA098F8E99CD850B401661337821AA46682DC704EBDF6B2EFB11C212324FEB440A99EE8940CA8210A2B125A3E796F09898736E710144D069A55D56779922B416C36A8344736633A4F902B8216928D6B7D321B5C762AF23F04B711E151A2B61954764B9A8983B31881D2AF04C7533A1428C34DA1D3F684D8663B44F0A2870563B943576ACE32BA0A875904F9F5145AD8E810CB2F8854492C6CC783BB35B167EE63CC873874E471C3C3C97B9E5B17ADEA80D7003E244295BFBEB44329725522599BC320C32E6B224E1B131EB3500077084B71BBD0466DBA9DE2FA661BB2C60F9EA3102B56A9D3899779B75396809F4B879955BAE5076D9E67FFA631B1F4FFB886D7BAB14BF9A8ACD1F2D9CC0CB3EB7BCC88840C6899043A3D5D063F2F8BAE554B11BF6818B7F08E39FCF85E4E775A2EC7AED5AED9AF5BB085BF622CEF2E22A2AA20F51AE9ADAEAAB1B56A813C6F9D9F33EF736346D57311777D193F3ED87B4845793C25B2050A02B56D51C672875343F43CCBFB00F87E89EE5CDA98C11FF36B13658495B06D5C4156B2A197C5EA58EA108AA6228D5D4D06FE72A15F42510FFBED0A401D5AC09CB5F95A0E257853AE9BBAD0455FAAE0494BE2BD4B01F923229FC8722A882A1545783B8FFAA562396837589249A0AB9741A4A655C195411576C08DB36963E8ADDB69C02704B6286032EC63106088E8440064765D85421F02DDA60818A6AB640A811418A8FAA542E9543D54A249A0AA1B8864AAD101154354467A873B27E8888D2B845FD62581700697C318C329EC2BAB583F364D0EA81D8ACF503BD6E02841647EA54085181932244682282F0781FAE5F20412B17A874765B7A10AB1A6E8900B4DC128DA955855E4FE23616A2262D2EF4814634E9E19F228C540E552F91185408B977EDEF58057AB7917B35A60EECA10C1CD543B1A612E13512E806F7A5981BDC13686D55541CF3ABB8BEBA1E65D0E4A492C0364BA6D2791AC26B19D5D9108A417F43A0D00D8EFE3ABF3A12FA2210F67DA9610DC80CCF9752F598CCE8FCED6F00E243218CF3A15C53CF6BB6FB508EF58FF101A8872F24D74B3CA1C1A2895E032A14D802CA662DA8DC72A3969E062BC48A3A7FB9375B28CAF766B09510B9DE92696C9615C42212A1D32E33CC9797F2011CE697D3952B448653258D35908A9A1AADF61FECB6C14C1C275BE7CE9285D4206E2308D8F5B86D86094724EF7DDC42D72F957BADBDDABA1F94BD2CF10B61CBA5FF0CDE4DB9109B60D0BCFEFCA91F686A03151A5C6069CCD7E222431839FFE43E44C16FDFCC6E7B6238AD871A0A50E122CB5B25B5C8D836C8AC8DEDFBABDF5422FA14B9950A5DBF95A55D4A3325479A682C19CC020FF8C1C94F3AEDF337BFC4AA60A291B64B64B8D0C0F451CB4DCC03AE5871687277E56618656A7B159A2946B0B40BDB9839648BD5BD999A9E85C8A6EBD9699B2C5ECED4341C279EAEF9E0B675031872377AAC2A28A8239453007EBEE60FF9B8075BA9361DA0F26489852F95B383FA53FC58604C73FBC144B516B994E9364E8335B50B674136158C79E1754C4FDF64E14C870434423905A8C1B32AE173F8086A6CF3895E87092776536651019ADE199FD035A9A0BD8C76ECF89067801F097A500335160C73177B1A0EC155418C0BB34CBB53F879B3A90338FF353294FA84B29ECD2570DE2D30A10EB0EDD582E43305146292F9D4932AC073F7FA73FA38DDBEF9EA19396538096AFFA613BF0B50B33038DDF7A20E0A1214F914B808A112755FD7C86CCCA512FCC686C0636A95108386A0F63F6816A20E031754976A6E123F744EB5C0F9D140E7439B484DD318F9B0076914762023214FBD82D4C28FB85A34523D50076814057C3261FF075111964F0A3A1B33493D251E79E197AC9AC32FFDAD29951F70636A6046DD82F2A01C6A881926489A7198055797D990B3CEDA33E1B09B5B65588E186887D8249DCC8CE8822F1136FBC8F4D5C0D16A32C395658E93095135A7AA888B90669B96C6B9387C6F61E21743C5DD3C831B9EF66A835248005AD2669AF07EF42CDC15EDBF05C2F7DA7B476AB203C821D2A444F0B57327DF5C6D9C1DF452AA7D73B1D8FE409B8DD200785D3C00776AFBEFB1CBB20EA73650287BE8E0461BF2DEF5A280786603DCB16D8E6DA8BBB30E26510EBD0E993F323CBBDF85A274D9B7D1177691D7BDB9427471A2C978147277B1C12F95DD56E252B18B0507836183465C1F36DB6B8FAB37A25B438EDE757670BE5325DE3372BF910A63223AC34E771C3165E9AE3D8F6B72FBFA5CD364E88DBAD79E9E570168BC5E644ED3C7F6F53EA90117D7651E10AABC2803C7845918DB918361DEE6777703E540ACC435423266AB97195EBEF8AF7E8EBD09F0A000BCFB3152C23D1D73177A260568C26B6A2F9D295F100B5AB72B64380F70E160F668C39FA270C0D8C49BF4B4200AA71E344C22716FD5023B23AFB980AAD0BDB0F1A1041C1D66D1037D2D946755437FDB5EEB59229453EE1861FE0958EE5D159AE945A59CFEE8715E8518842EC376FB2D029E4D7FA064FBCC0DABC97C1FDDB3B289B58F65BCAEB90FA716A5FA2A035A55491F26AA2FBBBC681E28B63F94FF2CD22CBA67AFD32D4BF2FAD7CB8B77C7F2EB1D6BFE75C5F2F87E607159F2DCB3FAF1F9C0B4A379B9BF4BBBA05992441D4957DCBF7C2EA26D54444FB322BEAB5C802CDDB0521F95DDFCADD44049F27CF7816D5FEEDF1E8BC3B1A8AE41EF3E24C22E4B15658BAAFFF24291F9F2EDA1FA57EEA309A59871D904F676FFCB314EB6BDDC2FA224978C13C6A20ADFF52B2B7F6FFAB228FFCFEEBFF59CDEA47B4346ADFAFAA863DDBE54FE767F137D66B86C7A1D8A1ABBBC8AA3FB2CDAE52D8FE1FBF29F25FCB6BBAF7FFD7FC23EBF8ADCB60200, '5.0.0.net45')
