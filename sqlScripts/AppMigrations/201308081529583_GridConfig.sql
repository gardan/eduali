CREATE TABLE [dbo].[GridConfig] (
    [Id] [int] NOT NULL IDENTITY,
    [Grid] [nvarchar](max),
    [ColumnConfig] [nvarchar](max),
    [UserProfile_Id] [int],
    CONSTRAINT [PK_dbo.GridConfig] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_UserProfile_Id] ON [dbo].[GridConfig]([UserProfile_Id])
ALTER TABLE [dbo].[GridConfig] ADD CONSTRAINT [FK_dbo.GridConfig_dbo.UserProfile_UserProfile_Id] FOREIGN KEY ([UserProfile_Id]) REFERENCES [dbo].[UserProfile] ([Id])
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201308081529583_GridConfig', 0x1F8B0800000000000400ED5DDB72E3B8117D4F55FE41A5A724556BD9DE4D6A3265EF96C7636FB9767DA991775F5DB008D9CC52A4425233F6B7E5219F945F0820F1825BE34A91F4D4BC4904D068340E1A4003E8FEDF7FFE7BF2D3CB2A997CC6791167E9E9F4E8E0703AC1E9228BE2F4E974BA2997DFBD9BFEF4E39FFF747211AD5E26BFD7F9BEA7F948C9B4389D3E97E5FAFD6C562C9EF10A1507AB78916745B62C0F16D96A86A26C767C78F8CFD9D1D10C131253426B3239F9B449CB7885B77FC8DFF32C5DE075B941C97516E1A4A8BE9394F996EAE406AD70B1460B7C3ABD4A16071F5189A693B32446A4FE394E96D3C9FA87F7BF15785EE659FA345FA33246C9FDEB1A93F4254A0A5C71FB7EFD832DC387C794E1194AD3AC24E4B2D4ABC1D3A629A43117A4D1E52B656BDBA0D329E138BFCBB3659C603623C9FA0B7EE53E904F24E31AE7E5EB27BCAC8A5F45D3C98C2F37130B36C598329403F22B2DBF3F9E4E6E3649821E13DC088A48725E6639FE19A73847258EEE5059E23CA565F1B60552AD421DB45929F955D7447A85C0693AB98C5F70F42B4E9FCAE7A6B66BF4527F213FA793DFD298A08F142AF30D66B9DBFD172ABE419FE3A76DEF082C7CCA125C4C279F70B24D2D9EE3F50E29078CCC1FAA5C9779B6A23FB90ED9253ECCB34DBEA02DC9A01CF7287FC2A53D6BB75F521CC1FCD194079A27E738633E3735D63CB16935BF2C3727B316795A3C52423E40A4E57CC05897DB3720693D37EE803CFEFB3F3480ACF2EB6B3ECF566B94BE6A1AE9866B067E9DC05B84123C006C393C4F50BC82A1BD4DDE9216D1DDA62801CE24BBB2548F26BFD1266A00D548F41E6DDB567D4DBADF639879E87DA1D2DF51B2E9BF563BEDE53263858D1A15501583CA0BABF7398A532AD6AF08AA770959DCE1685EA2BC242BCA0640F4F73D599DDE2E97051598A3CAAFC85EA45187443FE222CEBBE7B522DB2DAF84C97253F43E1CE79BC77FE145E93C2205325BA4E3DC75C61667C14D51662B2D1947FD50354FA922EAD1F9D0646A95849826A9092983EB82765E6EE888534FB055E2435D0B37CD4A89D2CC2FE7709DFCABFED4CBADC9A4905B9506CBADCEE02AB71A237AD6DA5C0ADEEA4498B92687CF3605583435C4E585939004F3D5C502AA46FB573427F5B07CB217EF6EEC7D136FE0C4D4FD5CA0D51CB5CA54290E314D1A9F520657B5C1E8F9F0D900E24E9E2FBC00DE48E81BC2C310FE214E1252D35914E5B8E87FE5F701A57F9C2D16D9262D0734399E67698916E51D99D608E695F0E7B22807A83A87B42C02B20519FF389ADF864420262F56284E7AAFF5AAB8269AB1AEF64346C082D27D4D34DE6816D5BA01F4FE068B6FAA3D185177CF59DA7FADFDCC24D660FA398F2302D265FC55D9BF68ABFA5F0C67C9669556C21C6EB2664F5E55BAADEDF1072E6BABDBD43924DD06640BD26DD778F5487425E1D6078E940D1F48D6E57C6179B355240674E4989451D922DD7146649EAFB6FD7A9FFD815347B01D1DBF0B9E8B2B1E70A499906D28FD8A8AF20E15C5972C8F2EC9B262937722228164318FD305A675CD378B05A37DFDECA835F54EE5EE54F3F9334A9FB0D2B2ED2BAA394A5CB7181D36E8779CC7CB783120A6414E2E5ED671BEFDEB2E6E48EF9D1545B688B744C513D307C54D858B349AE8CFC576B2E2CED4887C364919AF93784138389DFE4D920048B6D993F164458A47535125DFA61F71824B3C395B94DBDB54E7A858A048163E914BC47F215A1CE774764709512E454917B9A5ACF2C9408ED728D1F22D9472B8D741396BEA10533EE2354EE90244DB176195377508E23249E764C640CA8CB4DABCADC38364E7D683C1042FE9864F4B8E5B8668A93A3453BE2D0271A7B919E5C3A381B6E5D8F26FB8746206F1061F9FB5AC3587E30E6D064FDD18BACD69DED8340AC4BCCDB00ED427507FD854CD9C100FA254008309041193F5A4050A6FBA7340A1C9DCC854D1987778EA87070747DEA3503AAA80F884CF2D98D1521D5739341F3CEDB068F8F0A310E2BE875108F5874DD5EC71D820C3503E8432E1437122D509EE14F71E9C67159F494F6D1C554C4ED2DD878E263DF1CA8448D746CF044F5E02137D4E5E825C6DAA66EE250D326AE40B29C65ED669EB20F8BC4D7D0DB2DF27F2DEA4C6162F1C190102EFCA20DC29F50B4CB9AF0D1A608786D83419A55B6E99230D871168B066DB49C361C9B8330C6D57A954F9D5A743EB35FD845FE46D1BCD3EC7A5F2B5446B6552F128B5992755BDA59068ECB6A586C2F59B0865E9CA0E6520C1DC9891A8B4983610A936402A1ACD5ED344A2B9EC2993A81742266954EA4445A3D5DE2622C26D0B9912BF27B211AF9AA566416220D18E0D151576BC190831C73B321D3651A0C38C211EB7ECEB012693FA7D81A8DF8D66D586FD16E7D2246134A23244AA9126CEC17CEB2C5BDEDC5055375B399F186D7C265E8D563D8600AFA182DBAC78FD25B7DC60F4B334FB5936C2D2D0B787FE972FC5CBA2D09B01ED0C810CEB8C92D6480134FD31945A4D1D2C07E89A8E2C0D1BFB948B858AD50C82BAD688C760936289B61349B094E45BB3B27CF4E62A3B8315DBC7CD54AA910668A2DAB31C1828C382002C289636145F51C856139B2118A2419A25804683286D2A7656157F0D22DA51444ADD6042F1164523088BD1015B08FC45D1D700911EBF6844615C5E401B567F31F4B6D4806E48C9E2B0D9C3BAEC629936716B6E8D780CFBD67029D577189AAD6A937632DBF930A93E9CCC00672727D768BDA6FDDC96ACBE4CE63BCF27E7DFCDDD7D90AC7634660B0E86E2C6BAA9A9CC72F48485543A2747F832CE0BFAF6143D227AAFE43C5A49D9CC1BF3BA22C5FE5CEEBD7AEB5317A2BF2B6B58E504E64003A8568097A44D2B6A0BDBDE4C5377B65C7A42BDCFA004E58AAB99BB5B8CB0650E2EDDFA466169B45F654A2733A11992054E929464BEE4A56FD537D0CEC0A25354FB488BDE50178304595F0F61C5085D19D153B991BAA3FD6A4F89F1F4C192623E8FA66BAB6DBA77DF2A9C5658773050763F834DEE59D75EAD3C4BB024AA4F6E18B347EA4098D02DE52D60A1F60F61850AB8E87E4021BB7D6069C9A9CE941B6F0A0ABA4D9A3D55D9F5034B574E75A6ACE4574CB3A75ABB7F60A9D5DF1CA8B477753842F0151E98167374CAD2D29CA8C2B4D8B3304ECF6BCEC8061BD48D15C96B4C0336318B210D961C5ACD0FD50FB579C3AF1F54EFF0EDFA012A39743F7C15A3ABB52A78752B6427B1E857B8E8583B567C21CED212D31CA8B20FBF39926CC27800C31BC1FD5003BFD2B6838EBEFC58F1533DA76649549FEC69D48FA3B97654DF468391C66CEBBF0CF7522960C9B122A27A98CCADB19F154F0C753494EA48A38706C2046BE5F48205F47ED90A19BAC2FB01C7EE61325B7EF7C5C518C3BE32E6ED316CCA68BA187AD26BDBC370798B1ED615D6D931C55E56BF2CD6F613F3DE97EB25E6BB4BAF4B6F7EF9AE97925D260FE6352F3F833009F6F4C037BD2C6D3093839A343EF2E534A831B77BCDEA1A7C28710F7A5544B90CEEF477AF7B55847729EE14152F7655E415D93AA84B7C936B55B358A87F0DC99FB1C98712CDC12B609D6ED255E667C301A4C2722B1CCDCAE270B2F93EC0AF5A99EADD38036F915B4DCDEC79A81B63E271A8736F2A6EABE98FF8EA5C9A733CE80E23ECFF83BFD71620C50EBA15BC201708BB9E3B16BA7266DACF32599DF6AD0A49EA6F9179F67243A683AED6DF9DF364D0992FC245146FDF1B5C15D44743E336C2B2D9C15051DC37834DA06C2EC0D6099D26297A00BC99E629FC9A5E07E000AFBA79B2D65C0FEA59114897A5344787E0BCED36670357AAFA159C1567615DBA9FA1AE696F3018A01B635A83059FD5DE36A190BFFE1258EFCB27171EC7382BE85B6E468B74654ECCD26C34AA2FCDFFE6CA5C755DCD1C344CBABFB6CB329D90067C8E237A776DFE5A9478554D37FF4ECE93989E9C3519AE511A2F71516E3749A7D3E3C3C3774204328FE860B3A288921187088BA9048C5E061DBD5989D1C1D2CF285F3CA3FC2F2BF4F2575787549CBE6298EEC4EDA3C2C9548FE1B0F622FCF6661B2F7C39EE5568A0AB6EBB61A038497BE90395FCBDC0CF853D0AA2A4409EB6516F206ED05EBA0E0A191491DF34A065D665C8A040A250C8A06EC876CB2B1F322808CA521820339A81698575776AD4660A8D28857DE8705C0D16FA644C1A71FC914CC624AD9E113A5C708D710B5D1D2B238CA41CFF621FA368E00011E3EE562EDE4310253E86C363EC3E7B71F6DAAE57E38305561877FF7371128228F96B863711CF602FDDC88632089B1215E10982088A56B2AE87E3186201F8ACB0654FFFF516A2334FFF4ADBC6D6077AB0237F412B77E0C4DFB7F5B64EFC7DFA4874E16F23D0500FFDA172603DF477CE2FE880BF2BA839FAD7B7139693A12DD0DEACBFE3A25640BA43041B93E983ABF5CA534B87EC86B43754427475A706E870B5BE3743A2F678DF4E80DAF37939BBF628D42449B6AE403394F674C341A4E16E35BB70A4299DFCFA840E0872BFDA87BB55BD5B0A27AC4DFA0B7861195AA5DF90270AD781BEA15CBCA3A7F41E2C65FC0152AC036834DEF7983EEB23B085A7FAEA0835F0DBE9CE758D935E1B3A04869B0BFAFACEA8876BF861BB1F7E87376CF7BF1D27F2FCA5E13E7DBB0F8B1CCDABF061A133B81378EB603163804EE30B9B9DF56C03858C1E38B0478A11E2C635EA920B7A0C538FE0839C25E816B169F48830B925807131DC96C731B682C7CED5000FD6273C43D025348317305C77A781D8D0BE3E773509F6B81DD6BD2070DF12C33010CDAE22ADFD9B46FADEE3BA02D0F072B2673CA81E0C84E98971A3A36775E1039051E80CBB37A5FB438A78C6009054A9A7B78914C3B35F1029234288419704CF2DC363A2CFB9C50710834E2B764F50FDF6953A5888A7690A72FB36903A6C21BBD9ADBAD949B56F7907418641553819ABC68D8D3E4FEA7CC0D1F7699DF04EB2B16B883EF9C51EAD9EC9CA938F2916DEEE75E4E9347ACC48F7EF4E9A5D83E581B1F254C4BFE0C7357A22F361E5E0C3827E75E6A7ACA44A53D5C4241B2A69412ED5D126A9AA700DC7A78BC6A7A2EF18AA4F17A94F49DE318C9F368A9FAA02BF187FE6107FCABA7CA200EA8200821DEE1421D010205055C93E02086A87A226D2A06A3CEAD58B94031A9B2E6A465AC0EAB49A85F2A1B98BABD44E0749532134CAF4CA42CA2454DB5F0C2265D421C5FC06EC5F99C2BA3EF48BE3D861044B29D6A0B689D24C2304B2086F9E7491222C4CA130A770EED8750D7542C14862A9B59A9A73613B8A6676152A4D9C6579FFDF4336B5E38889FE0D15D6399CE7FBF066EE337CA67793952B23859FB4F0E6EF31CC9BC7F4011E9F31C5350BA5A020C24DFC396D2C61C0554FF0240409CBB4660A6B721D204FDF64B507A50E7BBA5F01C0318F2D62299BFB3F5418C0AA57E908731FC2803161EBBD326830F4DB7C387AAD45545C33161CA62EBD8D4E2EBF87995EB2455A09C18801FF0DC87EC4E010CB5376407632FBB449E99BACDD3FEA2DE5A925413DABA578C119F89A3C57E932AB8D8D02477516E17DC8352E51844A749697F192CEFA7946DFFC6D9BBB750E44DFA53FE2E82ABDDD94EB4D499A4C36F5C92B2B0C6AAFD4D5BF0D58CAF37C72BBA6FF8A2E9A40D88CE933B6DBF4C3264EA286EF4BC5C31680043584566F89695F96F44DF1D36B43E9460A0A0111AAC4D7D86FEFF16A9D1062C56D3A479F31CC9B5986BCC44E3EC6E82947ABA2A2D196277F09FCA2D5CB8FFF077651B7769DBB0000, '5.0.0.net45')
