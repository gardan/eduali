ALTER TABLE [dbo].[UserProfile] ADD [Training_Id] [int]
ALTER TABLE [dbo].[UserProfile] ADD CONSTRAINT [FK_dbo.UserProfile_dbo.Training_Training_Id] FOREIGN KEY ([Training_Id]) REFERENCES [dbo].[Training] ([Id])
CREATE INDEX [IX_Training_Id] ON [dbo].[UserProfile]([Training_Id])
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201307260955075_TrainingOwners', 0x1F8B0800000000000400DD1DD96EE436F27D81FC83A0A7DD05E2B69D64313BE84EE0B4ED8591D81E4C3BF36AD012BBADAC446945CA637F5B1EF693F20B21D53A285E2225F531F3D6E651AC8B55C5224BFEF38FFFCF7F7A4D62EF05E6384AD1C23F3B39F53D8882348CD066E11764FDED3BFFA71FBFF9DBFC2A4C5EBD4FF5B8EFD8383A13E185FF4C48F67E36C3C1334C003E49A2204F71BA2627419ACC4098CECE4F4FFF3D3B3B9B410AC2A7B03C6FFEB140244A60F907FD7399A20066A400F16D1AC21857EDB4675542F5EE4002710602B8F06FE2E0E41210E07B177104E8FA2B18AF7D2FFBFEFD6F18AE489EA2CD2A032402F1C35B0669FF1AC41856D8BECFBEB745F8F49C213C0308A584824BD12082FD86144ACC15259ABC31B44A82163EC538FF90A7EB2886FC403AF417F8D669A04D74600673F2F611AEABE937A1EFCDBAF366E2C4661A378761407F21F2DDB9EFDD15710C9E62D8308A727245D21CFE0722980302C30F801098233617961448AB0A6B30B210FD55AF44A542D5C9F7AEA35718FE0AD1863C37ABDD82D7BA85FEF4BDDF5044B58F4E22790179ECB67F0B0BDF819768534A4740E1631A43EC7B1F615CF6E2E728DB6ACA09C7F3C76AD4759E26EC674720DBCEC7555AE401A324D58D7800F906127BD4EE3F2318EAF1633D8F6C4CDEC18C6B6E56AC71E2FB6A7C796CE6B356F38CFAC8000D5144366F8832D6F376AD906C9D3B77853CFFE15F0685ACC69B575EA64906D09B814837BDE6D46F12F5165549BF016C315CC6204AF4AA5D7697A045ED6E7B940ACE75BBA254EFA661BB4DB400AA9D3878B795547D4DB67FC0361B60F785453F81B8D8FFAA76D6CBC5638DDB352A45556CAA41BAFA90830831B67E45AAFA21A6C11D0C5704E48446948D02B1DF0F343ABD5FAF316398A3C9AFC05EA17042A0971047F9F4B85660A7C59522490ABCF7EDB82A9E7E87013960D0B92205533DB5A7A977D0633BAADDC952A7B499E51143E24E8D176C80CB9E50E8D2E3358547AC68FB9A8CCC1EFCA1357B6F61F2446544E53E84C32C341CC2E57ADE504EDFA5A83FCCCE219DA3B261AE566499A2759427E50E7948FF0B91A3F0CECEDF8DB46337B8C201364CFB39A57B0D205748BF024C3E008C3FA779780DA2B8C82761910012AF221440B6D6AA080288B16344A4813E29DF9D565E3E03B4814A8F3894552B10BB3AA60909FA04F3681D0507D4692D2657AF5994977FBAB35B67F72E304E83A8042A9EB41E15190E1AFC78E6787ACBAB4E2C4EF953C424CAE228A0182CFC7F4A1CD0826D0EB75DB022C4335F34C9F7E812C69040EF22206516760970004299F9942F61B7855A7198338705626A5C30614E9BC8269F6EE42803B1116F6196433E8861D6AC21F65CC20C22E6538DB218B778B386C0AE3EEECC679C4AF56B5A1D4599F4410AA7CCCAD0A75E5266B005C7E798CD501DC894B34C3AEC0C19D52138F6C0B6DC5BC30997A3781D728690BE45AE39560B089E9E9C9C1908D71F0638D875303D3DED3DFAAD3D324C47F74ED57DEB55A8252074359857D45F64196B82AFE2F1643B7C05893245DBBA28158212A55D5055025782B1D5E99EC975225639BB72623D206A7EABA0B422EC01D29E7725188D8AF680E00E2E3210BE5380C309B8CB543E9FC60D5267DC443FD21B3034E8B742909C516F78C001A9D440F4F25DEA2C296F8EF86AB2957BBBD77BF5E1DAEBAF3800DDED339A66C57D884C798F3BB37468964458BAB01DC85F91829279D1E3E12C7D1C873D67440C8CD0BB340E548BF774BCD0EF07A3BFB3F278C3B930F9FEA80F4B8D5B6BDF58CCB68F2CEAC71833CD6B8CF92DC83246413BB36AF156DBA719CB6F57EE8F24922D8C5980156F251A6C9B95489A830D147A59DA2684D7518E59721C3C0176805D868934ACDF89D70B297CB92CB6DA13D593D8EF2A8953BD5239D13EF1E019784D694AD8D9A74C81A9852DCFF6D8F31810835C91D65CA67191205D6AD434BB7DBCC1C3685B6548F399408674F09238259D57BBDCB7928DCE505B0845E5D62DA4A19EA663647D0EE5D9A83B9B9AA1DC49E2685BED21714F1178505CF3D188B68A9A06CB5671AB6E2D60CDDCDD6C3659B2AE52ADAEBE791055939B8ED96BEA8174A275A083D4427D816DA515FAA9BB510AF95E9A8725F73A436EAE7B15709B3E7BA8F2DD340F57EE7586ACC457ECB3875ADF4FF3D0EA360728F57573074CDD7834DBC610C55BEC1AE5856C39BD6FD368671EDA901E480EBABB575B49E8E75B08C334D914078A32515F019BA0F017B39DA8836B770961A4CBD96E282375DBC3EE5CBB761491EFB087A7BD7CE5616B0739D8F4DEDBD88E95EF1DEDBEB27A8521903A37AF2AA09D01EEF0B7D7B02AC0DB1E77888AAB551578C5B009D6122F4FAD561627EDDF42767314F2A1AE49C968A2FBA65F15BE1B4ECC2CCFA2887C85A48DCC0EA798F9517FFDC82DEF8699F6E6D5CA91F2294637C4C47492B33415C957738AA41E65C883E852F2FA87F2DD34ED082E4E20566DBE77A4DAED59B08A4CB2E1CCC58DB20C13159CD3E69A070AB481378154B5C9EB81B839A3442394302AAF6A6F307B32D3BCE2B1A4783A8530D86E698C43B6D3C4F441F67B2FEA3089FD3E4265902E13C4214D08D15C2A089707F32A91DF5FEF2965F6B7437C8F92FF12852CABBF7AC30426D589F57FF1328ECA4BE57AC02D40D11A6252863F0BFFFCF4F49D503C3AA0B0738671181F717567C438D0FB76D9F141A158D8895E401E3C83FCEF0978FD87EB9BC08E0672484FF2D459F1CE6F8F958C3B617E9BF3EF325F2E591C5BA338AD180E54E2B61319A8F83F48F93B156BA3202934CF48D41750F2B513D1E9AABD42FA9B7D8B209DB2DA6B24505DB5D73460A7C5B55BED354A95850A2E0758C75F6174DCE668A7BEF818CA8EFAEDA2C22F4A4545F55699ACA848E9C3CB728BD135434F518FFC64283DF54243A9B7AD171A2223B15AC886A1638B81C6F2812F069A1C5F6DADCF54AAE658CA63C72CA78072E4B9CA9CA5551B207DFED4EE68F0E81AA5A9ED198FC6E4F19E31C73AC6564F7AD01A6FD6A70A98C717484C5112D12927185A5233A83CCCF0A2C62678F25CAAC1CCAF28E5E57AB2797B2A04B32C39DC6F29A0A2F0606889E3E0AAC2BD17111E7FE1A07B61D914D6A329C071AE1BFB12AC86FEF5D2B15A0CD35D86BBD530D78CEA3C87D4F7559801570FD27397BF677D50DD208D0B028E5B3B5CA5750005E97F56B1071DB17BE5B03B4D11CF0C1A901635D85F88A6F43C44713B151D46437A6CC968DF72789DD8A76F19A2107B742BC23D7D938F14ABE544616A4BDAFB2ADAB7B7F30B3F7C4AA9E4B7876AD792776DC5BB0AF867F894810DD56B7595AC0A7E75BC512E52F5A956E2BA2DEBE68D65F3AA255C8BEA4D35F52AF89317DC1B2562A8CC5789C5AC65D2089D885CB44DB24726E5B6D041361ADF20B52AEEAF0E5959796C5B87AEAB369EA0E85A488A8CFDF48254246F2451DAF942C9DF11D7D7BBCB53B00F9DB796D3C851AC75377E4F42F3386FB43C756ADB6707C6915C57E59B4956BFFA1BB7E70EC800FD772F2CBEA7D12FFFB1CCD05872E5EBF15D3043AF13B64FBE476D86DD90EFF0D108F93D278D5AB9FFF231678F4F362D08F64A15C1A013AF36636ED03AADC36601A37A8870A9730B090869307B9193680D0242BBD9D5726926CBB7560BFF8A0623E10DBA2F4856104A320D4EE2CEE75B59F86D5ABFFC324617E7F97D567E4A770A12289A11BB2DBD473F17511C36785F2BAEA43420585C5F3D2F61B224EC99C9E6AD81247F495507A8625F731C798049165360F81EADC00BD4E3D6CFC32EC7E69711D8E420C1158C763EFD93AA5F98BCFEF817B6B55C08A7660000, '5.0.0.net45')