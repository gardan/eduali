ALTER TABLE [dbo].[Training] ADD [TrainerId] [int] NOT NULL DEFAULT 0
ALTER TABLE [dbo].[Training] ADD CONSTRAINT [FK_dbo.Training_dbo.Trainer_TrainerId] FOREIGN KEY ([TrainerId]) REFERENCES [dbo].[Trainer] ([Id]) ON DELETE CASCADE
CREATE INDEX [IX_TrainerId] ON [dbo].[Training]([TrainerId])
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201308071218238_OneToOneTrainingTrainer', 0x1F8B0800000000000400ED5DDB72E3B8117D4F55FE41A5A724556BD9DE4D6A3225EFD68CC74EB9B2BED4C83BAF2E98846C667951486AC6FEB63CE493F20B01285E706BDC48919AA9799308A0D1681C348006BAF1BFFFFC77F9CB4B12CF3EE3BC88B2F46C7E72743C9FE134C8C2287D3A9B6FCBF50F6FE6BFFCFCC73F2C2FC2E465F6A9C9F723CD474AA6C5D9FCB92C376F178B2278C6092A8E9228C8B3225B974741962C50982D4E8F8FFFBE3839596042624E68CD66CB8FDBB48C125CFD217FCFB334C09B728BE2EB2CC471517F2729AB8AEAEC0625B8D8A0009FCDAFE2E0E8032AD17CF62E8E10A97F85E3F57CB6F9E9ED6F055E9579963EAD36A88C507CFFBAC1247D8DE202D7DCBEDDFC64CBF0F129657881D2342B09B92CF56AF0BC6D0A69CC056974F94AD9AA1A7436271CE77779B68E62CC662459FF895FB90FE413C9B8C179F9FA11AFEBE257E17CB6E0CB2DC4826D31A60CE580FC4ACB1F4FE7B39B6D1CA3C718B78222925C95598EFF81539CA3128777A82C719ED2B2B86A8154AB50076D564A7E3535915E21709ACF2EA3171CFE8AD3A7F2B9ADED1ABD345FC8CFF9ECB73422E82385CA7C8B59EE76FF858A6FD0E7E8A9EA1D81858F598C8BF9EC238EABD4E239DAEC9072C4C8FCA1CE75996709FDC975C82EF161956DF380B6248372DCA3FC0997F6ACDD7E497108F347531E689E9CE38CF9DCD6D8F0C4A635FCB2DC2C171DF2B478A4847C8048CBF980B129B76F40D27A6EDC0179FAD7BF690059E7D7D77C9E251B94BE6A1AE9866B067E83C05B84123C006C393C8F5194C0D0AE922BD222BABB1425C0996457969AD1E437DA440DA01A89DEA3AD6AD5B7A4FB3D869987DE172AFD84E2EDF8B5DA692F9719ABDFA851015531A8BCB07A9FA328A562FD86A07A1793C51D0E5725CA4BB2A26C01447FDF93D5E9ED7A5D508139AAFC9AEC451A0E48F4032EA27C785E6BB2C3F24A982CB7C5E8C371B57DFC170E4AE7112990A9908EF3C166EC9A2DE5D06E46D5439BA91BDC629A34BCA50CAE0BD155B9A523453D31D6890F4D2DDCF428254A33B69CC375D2AEFB412FB73693426E751A2CB72683CF021E584EB4B4E525859004B335C4D2A2C1D337A4AD475858D88B7787EEEFE2EDA9B2CFB74599255A65EBB88A6A286A755A974956694D9A343EA50CAE6A83D1A4FDF52DC49DAC91BD00DE4AE83BC2FB21FC7D14C7A4A6776198E362FC35D17B94FEFE2E08B26D5A4E688C3BCFD21205E51D99D608E695F0E7B22807A83A87B4F000B2F5328B7134BF0F899E98BC4850148F5EEB55714D346353EDFB8C8005A5FB9A68BCD12CAA7503E8FDB7F2DF557B6F44DD3D67E9F8B58E33935883E91A278F049C04FA3E78A2D6661F4C35E57C717553F59C616D9A6352466516715EE566E93ACA934A49DC67BFE3D4B1F34E4EDFF4567E350F38D468401B4ABFA2A2BC4345F125CBC34BA2C7B7F92022124816AB280D30AD6BB50D0206EE7E269D86FAA07277AAF9FC19A54F586964F315D50AC5AE6BBA011BF409E7D13A0A26C434C8C9C5CB26CAABBFEEE286F4DEBBA2C882A8222A1EDE3C280E4D2FD270A637D1EF64C599F7897CB671196DE228201C9CCDFF22490024DB2E8279B222C593B9A8926FD30F38C6259EBD0BCAEA62C7392A0214CAC2277209F92F448BE39C4ECF2826CAA528E9AAA294553E19C8D106C55ABE85520E47CC94B3B60E31E503DEE094AE20B47DD1AFF2B60E415C26E92C170CA4CC486BEC893A3C4886453D184CF0922E1B74E4D86B2B7AAA0ECD940FAE21EE3497347C7834D0B61C5BFE0D970E0120DEE013818EB5F69CCEA1CDE0410243B73DA038348D02316F33AC7BEA13A83F6CAA660EAB26512AC00E15828869BBDA0185B79538A0D064DF61AA68F7D33CF5E3A3A313EF5128D986213E614331335AEAF30187E683E6658B864F3F0A21EE471885507FD854CD9E3F4C320C65ABBF091F8A23804170A738CA759E557C263DB5354A313949C7B9034D7AE229B048D746CFF49EBC0426C69CBC04B9DA54CD5C919864D488A7ECC63E8657C61074947D0C53DECF2279B717AD26462AEFC602B8D9D04FF8455E29D2EC2B5C2AEF8A761B5B1583524B7952F54D5289C66E256C28DCDC085596AEB7BE0612CCA9A844A5EB4203917ACDA5A2D12E6F4D24DA2B33328946F79AA451CF392A1ADD046F22229CA8C994F865988D78D52CB53AD040823104CB44D844810E037D1E6EEC95472693FA52A4A8858C069896FD0E9E922A339A5B1822F5001157577CEB2C5BDE5E1E52375BA9F58CD60013AFC6FD3F4380572CBDDBACB8B22EB7DC601EB034105836C2D224B087FE976F04CAA2D01B0CEC4C060CEB8C6ED54801341230943A05DB5B0ED009AA2C0D9B9DACCB5E96D50C8296D588C7B07B658976FABFB794E40B4DB27CF41B5BBBAD2DDBC7ED0CA89106B899DDB31C1828C38200F65A96BB2D5F51C8FB2B9B21D84783B433B7468328775F76FB2F7F0D22EEB8444AC36042BA8AAB11837146857612FE42187C766D8EAEDAED429BB65CECBC68EB0FCB05E06EBBBC469B0D6D4157B2FE325BED7C6FCF7F58B97BC1263B1A8B8013B0B8B9696B2AB31C3D6121952AD8105F467941BD1FD023A2C789E7612265336F8E9A8A147B24B9DB9A756C5388FEAEB7DFB51BF211E8C3CB0AF092B429A19BEFEA4282BAB3E5D233EAFF8C62942BAED49C67F136496153005CBAF3CE6569745F654ACB85D00C69D32F494AB232F2D2B7EA1B689967D129AA4D81456FA88B41826C4E0559314227857A2A375277745FED2931BEA62C29E6F3C1746DBDE7F2EE5B85DBA475070365F733D8E49E75EDD5DAB79125517F72C3983D5227C2846E5D66010BB587A2152AE0A2FB0185EC78C8D292539D29B7FE7C0ABA6D9A3D55D9F990A52BA73A5356F22BA6D9536D1C10596ACD37072ADD112D47083EB985693116739696C6903ED9306C37F15EA3103049580C42B0E4D48A79AA7E6876977EFDA0F250B3EB07A8E4D4FD002E7B98435C6EDDA339DC9D6EE1D35A3DBCBA1532E258F42B5CF4503B56F49D626989690E545997288E249B703880E16D907EA881FD97ECA0A32F7FA8F8A91D8D5812F5277B1A8DDB10D78EFADBC160A4B59AF92F9CBD540A58F2501151BBEC70ABE267852F888E86521D69F4D04498801C736C510197B70086AEB0CE2C25E243ED1FA4A3C27AED708B01E6BB8B4545F2DCE12D2B52B28B66617C7278F5C224D8D3033D7358DA602687316474D5E1869731B77BCDEA1A7C28716E392AA25C0677FA3B1F1D15E15D8A3B4585DF8D8ABC22DB0075899E3556358B85C6D790FC91896C636E4F880063639BAEB2266A0CF8F4D847618813CE9064713899F01E60DF14A67A37CEC05B8856933A7B5FC28D31F174CBB937153749F427364D2ECDB10C74BF48317D29EF9CF490E200DD0A5E5EE909BB913B16BA0E62DAEC30599D36350A49EA6F7878F6724B6680AED6DF6BF164D0992FC24518557775AF0AEA69D93A7F5A36BB375414774160FB189B0B30844187038A1E006F8D780ABFA1370038C06B289EACB5F718465604D2AD0ECD4910386FBBCDD9C0DD8F710567C559BF2EDDCF50D7B4D70C06E94E8B98A55D3AD65FDAFFED9D96FA3E8939AEBC74C16497653E23CDFF1C85F472C9EAB52871522B907FC7E771545DF86E325CA3345AE3A2AC96BD67F3D3E3E33742907A8F00F28BA208E3038E221F510918C3B73846191003C8A79F511E3CA3FC4F097AF9B36BA0000E810CD383C43F5138FF8F18317D2FC2EFAE9EF0C29743A3F78D853E6C374C144A7B2F7DA092BF17F8B9C8D8BD282990A76DD457105A7A2F5D0745950EC96FFAE649366454E99E44A1A8D2C3901D96573EAA742F284B91A2CD6806A615360CD570DA6CB2E8BD87A4CB0E3F18EF21494B31DB4AB17507D4D9D3C5873D6CA1ABC3BDF623298770DDC7289A38C6E961772B17B2B417253E0CE963E43EEF70B6B3A1679EC962831E76FF73A13E7B51F2D70C5F55484E9F05951C70B359310E167053B995AD4211F68EA7290CE5016269FAB6DE3696A64F1F8991346D04DA3750665F39B0813207E7178C833914D41CC35CDA09CBC9AED2D3BCA83FA4562B20F8F8D8CE42F6E06AAC50EB33968DC197D0DA23E63EBA7A507B637FB5BE37BB91F67CCE4E80DA033639BBF62CC32449B6AE9E5607AD31DB41A4FD232B0D114B898B43E4154069D633FCD618F1B6F46EC24E589B8D1777D632C2F1B891871571797C232A7B07311E3D66F1E1C729B68E63DB86B65105E01A05374EEA6B20D4C09E7183EB1A27BD3675245AB74890CDA52F8F088DD3763FEC65316DF74F1DCBD13AEE2E7FE96FCC88B852301FBF98AB5EB0D138FC0D8E1BD86754AE6AF2C8B9AE01AC5DD063501F426C4538EAE2578F0893E3208C8B6997ADBAAB7AEE4B571809A27944A4B5FF2DCCD86B51D76D8CC14561643CA82E48F6DB891E363A5C7B6B028098BD4546C0889DF3C6FE9022DA0201922AF5F47522C5E05FE366ED9C0621065DD27B6E991E1363CE2D3E8098745AB1F3F5F0DB3BE860215ABD15E4F66DC870D8260CB32371B367689D6626418641553899230E1B1B635AD47DC031B6555D705F69F7AE622C53B147F9D8FADCAAA23BCA51AD39764E2B67F3F03123DDBF3B11727DE8017CE74145FC0B7EDCA027321FD69EB416F46BDBBCB2923A4D5513936CA8A403B9544797A4AAC2F52909DD4B122AFA8ECF4CE85E995092777C8242FB0285AA02BFF729CCCF5328EBF279C142F78005D8E143BE6EA11D229A673054E3443FECA51CD0987119FED2C252A76D2C9402CD5D5CA576BA419AA220F4EB07B19449A876BC68E1CAF8E08A7907D8573285757DE8F7C8C880CFAB480F61689B28CD004260DEFECD1BF80D0D41D773C12A750D7542C18104FAEF342817E06BCA660EFCC68538F7F1B111750D1526652E5866FF66EEF3C113EF262BA77145F48C615492F8B882F6F923C00DBFB76A8234B06926EDD7E4E619087D93D5FEFDFDA68F0905003FD364F1FC93B9FFFB0A03580B29E303ED431830266C83FAF41A0CE3361F7E70C7E2211F33161C74B7DEA22297DFC35427BF156423042306FC97A5FB1183C38B3572148FE5E2E336A537DD77FFA8CBF1534782C6264971C09963DA3C57E93A6B4C4302474D16E1D6ED352E51884AF42E2FA3359DF6F28C7A5254CDAD3CECA98BD8230EAFD2DB6DB9D996A4C964AB17BFB2C2A0D6255DFDD5B33C3CCFCBDB0DFD570CD104C266449D036ED3F7DB280E5BBE2F15D7850112D46C557B67D1BE2CA997D6D36B4BE9460AA40A11AAC5D75ADBEE71B28909B1E2365DA1CF18E6CD2C435E62CB0F117ACA5152D434BAF2E42F815F98BCFCFC7F1F5CDC5F05A50000, '5.0.0.net45')