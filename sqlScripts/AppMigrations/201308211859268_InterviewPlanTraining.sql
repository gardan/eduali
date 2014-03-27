CREATE TABLE [dbo].[InterviewPlan] (
    [Id] [int] NOT NULL IDENTITY,
    [Date] [datetimeoffset](7) NOT NULL,
    [Location] [nvarchar](max),
    [TrainingId] [int] NOT NULL,
    CONSTRAINT [PK_dbo.InterviewPlan] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_TrainingId] ON [dbo].[InterviewPlan]([TrainingId])
ALTER TABLE [dbo].[InterviewPlan] ADD CONSTRAINT [FK_dbo.InterviewPlan_dbo.Training_TrainingId] FOREIGN KEY ([TrainingId]) REFERENCES [dbo].[Training] ([Id]) ON DELETE CASCADE
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201308211859268_InterviewPlanTraining', 0x1F8B0800000000000400ED5D5993DBB8117E4F55FE834A4F49AAD6B2678F72B6C6BB658FED942BBECAF2EEAB8B23416366295221297BFCDBF2909F94BF10DEC4D1DD380892D2D86F12013680C68706D807FA7FFFF9EFE5AFB7FB68F189A55998C48F960FEEDD5F2E58BC49B6617CF36879CC77DF3D5CFEFACB9FFF74F96CBBBF5DFCDED6FBBEAC57BC19678F961FF3FCF0F36A956D3EB27D90DDDB879B34C9925D7E6F93EC57C136595DDCBFFFF7D583072B56905816B4168BCB77C7380FF7ACFA53FCBD4AE20D3BE4C7207A956C599435CF8B92754575F13AD8B3EC106CD8A3E58B6873EF699007CBC5E3280C8AF6D72CDA2D17871F7EFE2D63EB3C4DE29BF521C8C3207AFFE5C08AF25D1065ACE9EDCF871F4C3B7CFFA2ECF02A88E3242FC825B1D38097DD508AC13C2B069D7F29BB550DE8D1B2E871FA364D7661C4F88A45D57FB22FC283E25151F1C0D2FCCB3BB66B5E7FB15D2E56E27B2BF9C5EE35EE9DB207C5AF38FFFE62B9787D8CA2E03A621DA30A4EAEF32465FF60314B839C6DDF0679CED2B87C975523505A95DA28871517BFDA968A5929E0B45C3C0F6FD9F6258B6FF28F5D6BAF82DBF649F173B9F82D0E0BF4152FE5E991F1BDABFF4B0DBF0E3E8537D5EC485D7897442C5B2EDEB1A82ACD3E86871A29F7389E7F686A3D4F937DF9539890BAF0C33A39A69B72240956E37D90DEB0DCBC6B6F3EC76C8BF7AF2CF950D649859E718FBB16DB3EF1656D7FAD7AF33E0DC2B89822B8476D29D02BA948E9995C0EF5EE72D5AF0B72B594245D9649F99ECB5269DF1B7BB994EDBCB65F2E173FFE442C97A63EDDF255B23F04F117629076AB8E5B1C5E169F0C277C799AF6F02A0AC23DBEF0AAE28AB4BCF6FA1270F971C52E2B30759605B27C82E484F36AAB46759776268765E6B02B498DFE1E44C7E95B35935E36FBE9B05503011558544E586DB799BB04D5B75171F464DB751EA47971DEED0054FE7E5F9C9DDFEC7659C9304B91DF907D166F3D127DCAB230F5DFD786ACDFBE169DCC8FD9E4CB717DBCFE17DBE4D62B522253219DA5B63BB6BC0B1EB33CD993642CE543333CFAFCD855020E904D992226940AB6C7ED757E2C571CBCC136851FB80370DF37A550D9F9D51AB69B7F339F34DFBA4A00DF9A329C6F6D055BBEB51801BBD616C28C534B15CE01553C9E9B2CBE5850BE116728B257BB9DAE5755956EE050E7C41AE8579554CD9681C59A67E9A7907D26D746570BEC315A095B2B404DDB7E973AA1ED31624F832F34A3B98A24BBA17A28D3C1CACEAC2FB76378104215B0FB700DA5E348B5419FE2AD24BF43E7AD093E0DCCD95BAF956FEC1D78E8F27FCE2177C5F638D057520F13DDC6276F3C4A05DB9D8756E2599E74B0DEA93BBA13C03B0E7D43F830843F09A3A868E9F1769BB26CFAAF9A2741FCC7E3CD2639C6F98CCAFEAB24CE834DFEB6387825C86E2A540117285C433DB8C2D59CCEFDE862B53E5ECBCB953881BBAD577ED4DF16EDC055F36C1F84D1E4ADBEC85E1558689B7D92144009E2B1B642E7F5A620995E96EEEAC26F9BCF6044BDFD98C4D3B73ACD5E67AD7BAE3EC6EF12A4DEA6E1A657BAB24DB80F0AA1F5362D7E35CE220F978BF526281BB55764BE4E5E1693586DD743F4A13591A7C7B471D118AC5B2D6672A88EF62A6505C387A8ACB5C706BFFA254C0786A8A18C3788920F09ADDBAC9BE86A625D6D2A687ADAD61AB439C87AAABBB4A45F8659CE4A7EBD649FD8F427907A5E66EE443BBF3E0C31A72D2C5A2D929172B7AB4CE8765B2500A21C502BBAAA30C6D0476B3B3D8A9C535A01441D5647DF652F020F506CDF2999579D1066391FBF49B7E537CF10F1E0DBA4EED796EE2C04871D7006D975B023046904725A5882E1E52E2D298F087A996C8493FB74679169A1EB6CCD93E1AA31FA3901F51F69B8BD4AE25D78A71CA8CA514D6F714AA2E33E6E98399F469C0F2C80E0D8CFF807A16A0F47B8860247A4DA2038BE62FB6B9696BD758163D90D1748B6EFB9C2F275A50B733DECDBE3ACE079BAAFE6F57DF207B315A00F2E1E0E5627377D601DD3009DB209A5974196BF0DB2EC73926E9F0761744CBDB0482299ADC378C3CAB6D6C7CD865320BA1DCC5AEA5EF96ED5F2D5C720BE61E071CE9555EB20B2B5E3791CD0EF2C0D77E166464CA33D79767B086B15A33DBB31B9F7B8F82ED9841551D9E5FE0310EA529CDC17B46375CD2BC129BBE0CF31CAC343146E8A1E3C5AFE4DE1004AB6337C8A64658A0F96B2487E133F6511CBD9E2F126AFF4C45741B609B62AF30BBE6CC52785146769B9BB0751215CB2BC3CDDE4AAC82F1672780822B2DFD25BE056010706953DEBDA904B9EB2038BCB03083917C31AEFDA90D8A5E3CEE58A83941E69AD73248507C54B9206830E5E4A98584F4E388690542D86A9861B61BD2302FF5CFAA8A16DB8B6DC07AEB85C637DC3FDAFFBAEF55F2BE66346DDB639BA9D3BF8A94914ACF326CB7AA03CC1E6C3A4692EC46016A182D8FC3188E81C007AA088DE271628D4F9F4704D741E0A22F5FBF7EE3D705E85801B0FDA53C2A747DF4BAF4B86EC14C03A73F1E0B41871CE4CB01C710E9834CEBB9FCEB2221587546CA671EF544E5CB71622F3F587FAB44E8D6927E461BD9F0077D87C9C15EAF4528FF03BF6823B1F72CBE5D4053B9801A723257ACBD3A94B0EFA92E99A6C74834F4F5227A63C3D497C35699A8BAC9C65D5C8316BDA39C63FCD064167E24F34C46949D74DCC83496542ED97E7C0092C084FCFE7F9B72E7A0C13AE44789E8CD76363A09B75418A2E6A66A8513C38BCE35276FD305BA7833E67509F21CD364C381029BB7CEF7667BFDDE3FE47FAD3C4FC4B563788E94E9DE87C1929217AF7BA390F9F809798317AA85DC52B4CCF736FD10E630EA49EE50E833A071A2388D867BC227586DD8674F6D2ED91B4E797BACA78DF47872D99BE40E01C16B5C948263C3652F377164B1BF1F7C280A473FEEA21243A155A6055775BC439A0941EC304F8A4E7E92C9089B87E61B0D1F981F5B0E1BC082D60A97120F3BED1D4BE189561A854F7B431858743F988DDAA1F3365F535CB558B72B65CF48E1D501F95318BA46A83B44AA3B6046B5E6EEFB104DF6E5C3F34247AF5AC4AA517011A228DCD11A2D199777524BA0BBA5412EDC79A8E1B8DCA1BA2D1DB177444A45B04544AA219D284BD70973A15AC86447B97143A3D8D0EC18CC1FC754F18A7B9D3A2217AC4CB98D09E0A072C0D69F9722485A8B4076AC8F51206A2C54B2D0D21CE2F55A5C3174A74384924AE7EFEDE4CAE92BC92016F30418422FE605DF77B69A16C385AEF2F8E4823AFE49D5D1C9DE1C8BB8BD9E061833A70A5BBB2065CD7579400305851CE0F1E3370EFB13A728DB792D07DDC5FC970101A6A23CEBFE29B04B082F65F820D17B20713D7756EAB23B880FA2C7194FAFD6E301FB02B32546E9838D60823D1B8D6F09241DAF408F6689C6978A2FD763C9C4BC055380087349E36E240705F1B9341E868010C41F1E7C010F59231951DB4DF07A4EA2141D29FD0084EA0BE1E230103B8D00C6784092C70670457564C8609C5F18012A9A073022C0865F70477912A3B24C894FC6042B6A1536CD01E313043BB3B13263B6E204675821D94F99DB0422A9A2A6E4CEDD78B01671053FBC8AB45BA7B44C71C50396F61031EC21A59FF3E1E74F08B2150E9AA3108DB99845559CB7FB7EA852E6E043690E23EF845AD3643E3A4A579D21FCBA65A81F8AD18063CD3AF43AD99CC1FC7A65B98A43D8C105E7AFB99BD050D8085A80732106CA4CD6C24DC6151F82AF74CEC3736161C6E40B27A8BE095C666331297B0E070954B26B6041B6B023720416B47B048633F18BE1EDBF0CDCE64D0955DAEEAEC84CD83CB1592C6F0F25570389473D3BFD93C59ACEB9C8657DFADEDB30BEE6B1AAB8D7088950D1C5D4B85940A6E98545A7ED56FD9F330CDCA4B6682EBA00CA9BDDAEE956A7A0349DB1060275167AF559EB62F95BF9B25DAA477BC4700AA67E0F3624CFBD23C5705E5C393ADBEBD28F34A06519002B752D41738E0C642FCED3EEB214FA37FAA52BA5C49C350EC810AA714B3AAC87DA3B9C1748B06930269A20D66037E0D63641B19CBB3118B96A5A9BC56A6A37F6A4E89CB92C793E21E9FCCD4368A7EE7B90512BE194F30F2EE388B4D9D59DB596DB2B2F1249A4776183347EA4C98A0745F06B0C0CE3E06A8C05F1D07146ACA349E965A6A4DB9BB3D0DA0DB95995355D3A6F174D5526BCA607FE53273AA6DEA349E5AFBCC824A1FA62C10C2A397715A8DEE50A6C53DB610F35CDC9C20E78978BAD916756787725AD38855CD6049A36FCE2DE6E79A875693E4360FB0BECC641EB037E79E873BB1BA7A3B95D3B46266378379C55F3DD5899533D0F0B4E4320BAA7C621981245F703A8011CDE86EA8C173AC9841877EFF54F1D32443E149348FCC69B4A94D847134CF4E06239D9DD3FD18EE2452D0374F15114D5A11E18CFD11B85D91A2018A23420ECD8489C61038E8C30C483C628E0BFCFD913ED1EAA422C2DCD68F2C10D6A70E1160D63F36A725E70FE109CA65969F2561EDE4AF7C9784B0F33F4E8DBF3554383A71CF4F06D1AA3D6DC8C918C9C251D1313C221324C681B89CDF42809454660129307786002EB086CDD77D17B92B7EE0A301BD446FBFDE05001A4407097834314345CA54CC9354465A095CEA0555B0DA1E0B9A6C0A3CA1E69195060B52B539E9D840E59A8356CD6DADCC846EC978ED846B222F4245448768CDFBE36019D0A35ACE739FEA40580BDDD33B8A18DE90EF04172C3B811156A897C7014A9D76807FBF7E62636FE47308882647BEE464A618BBB0DF7486F1F70D66987A19E3707BD7BF6CA89FE25882CFBA72A3BF38F54AB18D7E84BBAB5F5492700516A20CBBB15F906C58258BAF45ED15FEC287A4B6B67DCB700B2E9484EBFA21A242057BFAF5DDFD10E1BAC49E22701F3F441EA8E6A12DF9C67DA396E597A69790A21B99EA77D34526200E185D39E461A1F1B1039C13A4D805951D566E0D1F30DF86EA7E8796885DCFD0BB1B8CB666DEE5CFAE63B2C79FF56C02219DB4175B5B8B7055C3027D81ED0B0CFE1CC0450FD38A46910E84DDC4138BC565EA4C365C552BD30CC0493AD4D271963B321EA69A0E3075ECA075BF8A5E6CC3EA6A9317599981A54B0A6338ECC150016210715D265F0BD155527EE6B0B6CEE4567423E6B7F43C80030D7F74EC5AE7F73EB12050A209091D1DBA6FB715ECF66E24F6705A061AF5EC6CF76F240A506768EB6B5AD9D3084E82117EAE32BEA1E271A2C160C6D392F0E8A07D09782050CDC066854345679AC2852A1A79363F607451775F0B66B0F02952B5295635D76202F34047444D2EA86DFA788A48A147AE478B123F2657E95412CD93EE7F173FD6C46E0941651553CA10B18A19591347260773D555968B62009FC26D19C8B5FE92E56CDF08AC7F47575158BA9176155E0571B863595EA9531E2D2FEEDF7FB85C3C8EC220AB43FEECC3D4D876BFCAB26D0404A971395FF1AB0827C8411C961CD0661BB6CC6AD9077ED58DC49F8274F33148FFB20F6EFFEA963152E19AAA2F306317FC55AD6759FBDE886CEB03B444B609993E2F7EFCC99A3017AEC575DFDB3400D14F670B5D88FF06B055093501551E2801C82307653C77C8D5BCE73A756A9053DDD8B6F89D877B96EC7619D3310F25DB79377821AA0638F924EBB7AF6D9893072873814EA668568970114E86D20C90885CE885F77505271E3DD765E52811CDB9056652F9CAB835314291A4885F3DD3E5A01D1F24F9A09DF156116166F936AD4D508D074A6D644D4DEA3AB4DFBD049B8CEFD33818EFF26DFE9B101A0F94DC2583F5A91CD0A59FED4C36712ECD71946DC27D10958A97E257565DA9F4E061D1E82628095ED8E3A48F7E713F55CA112F03CFA78D2BAA3B15DE93CECB319E57FBFA963BB452FF6C612B079478102070A48A8F4FAB3E56E51B741DC42D1A2372BEE8E5424D3C00AC09387187856F65875F2D870BF48D4146846D9C2DBC3CF2BE0F04F12161C79C48CC1A79B6B3580768F8D05708F1191E08CAC647DF821F0B9E309B4AD86F543F9DED7B63ECAEF653A6C4551086A707170FEDBF96B9100BF093D9840A1A4C316CF4FA9009F739EA8325CC196A45580898F0C3873A5462A4FE0281127EA1661C1761C32C2B2BE840333E1D64000B20CA37C3C49EFDC1D6B4E828A587ECB86488C010598DCEC23C627D342B2FE95F6DC640D2415AAD4EF8DCEA39C9B735FC43761C4C6A1D9BCDD84AFB26FB5FF24E4C197FC9AB795AA9F47F521E3B214D6AFD60C4CCBD40CE40A503CD535D1A58A724C0C81DD4A672AC1C9371BE5FEA4E649B0627C8EB4BA7CCE37358B469F7B839EB9E4D829B3EF102D785FEE128A8C1AF3C35F944B5020D716332B0ADE0D7DE4E021B5DE63C20D79D306DFDC33B0B1DE23ACF79B143DD9D3AADCC816DAED2B449C8E99EE97279CF0E00FCEEC579E79FB8E67A92E9A7D34C9E98E4E8F298F1DB5EFBECECE5067E93F4098A0D937CB6AEE8D1880F29873B4F502C397B44E8AE13C6718104F84CB89F50D9285DF782910F24B5A70AD491A664BC9DC974BBF0B43561F7CDE2DFF62782273071209C055D9848E1B9D361651E70D019B44E001F74F0E97407184D0253B743C4B8C798DECB08E80A5738CEB7B4C561C3CFB986BA071855D59E0EACCE62273B05644DB99F39416BF62DCD2C1DEEA8BBDA290065E2BDCD092BB36F6FE629804F4C1441FE88507784F2B3174866F77D9FA04C3249967C6208139D11F98E4825678F2ADD6DDB27882793B4D2A3EE709C87234F907F7C177635F2666D5BD3FB44D8D0DD6A6A6F1AC761207B34C9B408809DA9ADDB16809A5B6127C60374C5D1303971DAE898585CB800E4246486D97DB9E3214576DF434842E2E93C91A2B9D21845CA092144234B06EF2DF36362CABDC50510B36E2B66D7EBBA6A86B5BA15F0134929BB23CA5D3B7F29F29EE25990A11115969FBBA78C8D19D4B3F60E31F845C7537A44997DA278C306E48D0DD11CFF503A87C6CCF678737A3899F6D3E574D032938DFA0C3E639E89B7C676AE53D20DAF0A649A4B83D58E2F177DE801049FFAAED847CBED755280A18E60102A2870129BAA8FAA4A1BF56388F867767D086E8AB37675E236A2DFC415808D3465504B5CB1A6915EF62A6DF44550137DA9A685CED55E69A02B81E877853AF2ED995325DF9680E4DB420DF9DEED4EA1CFA53F011AE84B752D887E786A336239D89658C564CAC1117525E8841B8C47F2F44161D59453D86AAA982180B3C06250E0AA1098E06A190E5530CBA103166A51C3162A6ABA20596F94C6A572A859A98AA641DE26A0B4C617424DF1E59A76B8487DB51DBE9094B47C4503714BEF1E4A0D4CF4DAEC228AEE83DAB40CF696B276F62236DB6294AF286CE5D07B8152C970DDD0EC066B51EB8662BB786B3D1C72B8E02AC9FB2C109408E8C7BA81B60F947313184C28BD06EFDCD2C5FB06C3EBCEDCDD5EAA0E50A9837758DAC8EBC41EF02E8D7CF3712FA258B11F2610D1050C5417F7257459DEF5EBA466C88E3EE960BBF9EAB663624E91381E284E49EEEDCCC354226D8061D2D1389EE6533A5EF2D96C7C4017C9A707C0D72084C4D390C1032990D6CF1F98A5F00702D254A0843B40C13785F32B90F0CAF7F0BBE449BAD1830E90B8F6841B00B141CEC402D4211D5FEF1AE775D7D50BBDA77C52C0C9AC466003B5160CBDAD3D2D87D95941AC0B33DF60AF4B636A76902EAD84A8D0BBC07A1697C037B04084FAA8B5670BE2810930C4C457D3132BC06FF1EA75FA13DB7EF8581E3575F826AE855E1788AA1F9033BA0D1F3EE013877CBBD1F944077FBF61CCD22901860DB9B19D68860CE7BFF338D3D33200F56902D8609A2FDC233310350E98F07C0C66E09830CD523E68314C3B7CD45985F84AA41D5B7C9E1AC10D44A722F3C1041C03A619AA7D9E18276203E28040A9454CF784E187224CAA98682C87B302C78389357E942FCA7118A2A41CEDCA2E57B5C2B87950FC55528B5EAEDE1DE3F25AD0FA5F994DEDA62751E64C8DD946305677755EC4BBA4B59D4B3D6AABB4C59D55230FB6411E3C4EF37057AA52D2A4BC76B6C253953CB0CC5B73CDB62FE237C7FC70CC8B21B3FD75241C994BDB3BD5FEE54AE9F3E59B43F92FF33184A29B617993EA9BF8C9318CB65DBF9F0397FF21244AA37E739D7539977979ADF5CD978ED2EB2A718B09A1867D9D2FC27BB63F4405B1EC4DBC0E3E31BC6F7A1E8A1CBB7C1A063769B0CF1A1AFDFBC5DF027EDBFDED2FFF07CB6F02335E1E0100, '5.0.0.net45')
