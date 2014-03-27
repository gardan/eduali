CREATE TABLE [dbo].[Assesment] (
    [Id] [int] NOT NULL IDENTITY,
    [EntryListeningLevel] [nvarchar](max),
    [ExitListeningLevel] [nvarchar](max),
    [EntryReadingLevel] [nvarchar](max),
    [ExittReadingLevel] [nvarchar](max),
    [EntryInteractiveTalkingLevel] [nvarchar](max),
    [ExitInteractiveTalkingLevel] [nvarchar](max),
    [EntryProductiveTalkingLevel] [nvarchar](max),
    [ExitProductiveTalkingLevel] [nvarchar](max),
    [EntryWritingLevel] [nvarchar](max),
    [ExitWritingLevel] [nvarchar](max),
    [EntryRemarks] [nvarchar](max),
    [ExitRemarks] [nvarchar](max),
    [TrainingId] [int] NOT NULL,
    [StudentId] [int] NOT NULL,
    [CreateDate] [datetimeoffset](7) NOT NULL,
    [Creator_Id] [int],
    CONSTRAINT [PK_dbo.Assesment] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_TrainingId] ON [dbo].[Assesment]([TrainingId])
CREATE INDEX [IX_StudentId] ON [dbo].[Assesment]([StudentId])
CREATE INDEX [IX_Creator_Id] ON [dbo].[Assesment]([Creator_Id])
ALTER TABLE [dbo].[Assesment] ADD CONSTRAINT [FK_dbo.Assesment_dbo.Training_TrainingId] FOREIGN KEY ([TrainingId]) REFERENCES [dbo].[Training] ([Id]) ON DELETE CASCADE
ALTER TABLE [dbo].[Assesment] ADD CONSTRAINT [FK_dbo.Assesment_dbo.Student_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[Student] ([Id])
ALTER TABLE [dbo].[Assesment] ADD CONSTRAINT [FK_dbo.Assesment_dbo.UserProfile_Creator_Id] FOREIGN KEY ([Creator_Id]) REFERENCES [dbo].[UserProfile] ([Id])
INSERT INTO [__MigrationHistory] ([MigrationId], [Model], [ProductVersion]) VALUES ('201309171331227_AddedAssesments', 0x1F8B0800000000000400ED5DD98EDC3A927D1F60FE21914F330D74A5ED5E70FBA2DC0DB75DBE30DA4B8DCB7DEF6341CE649535564AD992D22E7FDB3CCC27CD2F8C767189082EA2A454DA2F76A5480583C14332B8C4D1FFFDCFFF5EFEED611FADBEB0340B93F8E9FAF1C5A3F58AC5DB6417C6F74FD7C7FCEEF73FADFFF6D77FFFB7CBABDDFE61F56B9BEF0F65BEE2CD387BBAFE94E7879F379B6CFB89ED83EC621F6ED3244BEEF28B6DB2DF04BB64F3E4D1A3BF6C1E3FDEB042C4BA90B55A5DBE3FC679B867D58FE2E7F324DEB2437E0CA237C98E4559F3BC48B9A9A4AEDE067B961D822D7BBA7E156D2F5E0479B05E3D8BC2A028FF864577EBD5E18F3FFF336337799AC4F73787200F83E8C3B7032BD2EF8228638DB63F1FFE68AAF0A327A5C29B208E93BC1097C44E155E7755292A7355543AFF56AA5555E8E9BAD038BD4E93BB30627CC622EB3FD837E141F1A8C8786069FEED3DBB6B5E7FB55BAF36E27B1BF9C5EE35EE9D5283E2AF38FFC393F5EAED318A828F11EB0C5558F2264F52F60B8B591AE46C771DE4394BE3F25D56D54029552AA3AC565CFCD59654B44A01A7F5EA65F8C076AF597C9F7FEA4A7B133CB44F8A3FD7AB7FC66181BEE2A53C3D325EBBFAB754F0DBE04B785FB58EA4C2FB2462D97AF59E45556AF6293CD448B9E06C7EDBE47A9926FBF24FA141EAC4DB9BE4986ECB9A24588E0F417ACF7273D5DE7D8DD90ED7AF4CB92DF3A48266DCE3AEC456273EADD5D74A9B0F6910C64513C11AB5A980565292A2999C0E6977B9E9FB05D95B4A912EDDA47CCFA5ABB4EF8DDD5DCA72DEDA7797277FFA33D15D9AFC74C9CF93FD2188BF1195B4EB755CE7F0D2F96438E1DDD354C3E75110EEF18E572557A2E5BED7A780DD8F4B76E981A9F358208F4FD038E1DCDBAA5A9DD3CCE4D0CD1C6625A9D05F83E8387DA966A397CD7C3AACD74040053A951356DB69E69CA05A8ECD11CB3BE0FC3D29CC14C4D663FCB36DE95AB3DD5039D751E10AB3DD4D1EA479E17F777A957F7F287CF977777759D9806E62AFE29D47A12F5816A6FE756DC4FAD5B550323F66930F0F37C78FFFCDB6B9F5082189A97A1E4B6D3D0819EBC72C4FF6A418236D7E4B3EA77751F2B597F3CB31DCB9FB338D9168AFB8CB04B8C54D9A32F829196C171137F9B11C4760B7A149BCE5DCFA5E372551F167D41CB62E4D830ADA6E5D26C06E4D1A6EB73683ADDD5AA481AAB589B0E1D454C57240168FDEA0C53A0CB51BE119925ADDDDE9B4AAB2741587941373A06B45299BAD018B9183A55F42F695EC1B5D2E50633413D657809CB67A973B5DBB63C45E04DF68437319497343F950A383999D4D5F4EEA7025842CA0FA700E4571249BADCAC5CFFB9465D9D597C249AF9505F556F381CA13D9941A50799D06DCE2455D35D47C24844CAA41E5B5ADC6B32C63D91E9DD7BA6450693555D115C8326847AA9DFACF68D931C10AD9DCBCF5E0FAC3BC037D7D67F7DACD8D6AFDC73E93EA7D769E92ECA928196C5D157A2FDBD235C6B4535D40EF435C0B7E7084EBF44007B836C7A0F1AD6BC11F3D70580FFC7B18454549CF76BB72C69FBEF820FEFC6CBB4D8E259E663B937B9EC479B0CDAF8B9504E69F0859C00104CEA1AEC4E06CAE7E15A2ADED7A511E4E8825A55B7FE56BFDA3D30EEC3557FB208C262FF555F6A6C082F56EADE38E876B7F53904C774B27347793D93921B9A865FAED7598E5ACECEFAFD917363DC4AE1EC27C6E154A33BC67C16E5623E4F36A50DAA0DAC7287A4EF8857D08A2CFB39AE36474290D533CDB1D4F4097C22EA7A24A6996DFD2309FD518F32A500F1BFB20FD3CBD175DD67EAEB25B0771E80959BB5F3D50CCF39415B3DF905350ADCBED670750F653884D42CBA3371FCB775C3B79816FECED950D93C0CE5E2FBDCB0529D72412CAB53986DFD9F8B1B5307864B8FE94C4D3973ACD4E86F505A0EAECF09C20759D86DB7E8C65DB701F14B3EE755AFCD5DCD8FF69BDBAD90665A1F6C3F8DBE475D188D566CC90D9A016F2E29836F7E4075F28F130D1CD3543391F876347F6C8A9B98F09412C029814C00C1A4DBD4C0EF2B1FA3975E99957DE75BBCCACC4ACEBEEDA02B3AA702A2BEDDA14A7A2CD89ACB36BA39C8832B32EB76B4BCCAA82A705EB02DC0A6A5DA95C33039697581EEC105BCDE87AD43EC6453BADD2A378444A29805384E5D1ABEC6FDD2CDED83B2BEFA85A4BCCB2927E97EECAB3AF61DB6B7E230EFC861A380F82C39642832EAC628B0DF276AB53C7126E949E5397F288A0D7C95658E39FFEFEB71B749DAF29CB70D5DC667602AA7A71F89CD0EA61146E0DF4DD39AB4EBE25700F1DF02EF15C0AE689AC5E3D4C0F77F20D54F7D367D55BF2E7D467BF9FD3C97A287916675FB178283EC72DD0ECC24A82CC0A041BD1F96D6F37BE0F7661F24B9A1C0F5485E45C9A4A19645719140CDEB1667AF8C4B69F3F260F54D5C43C9A8A6933AB9750B56FB8DE471D2BB807F3B64DC743D73908328D3A07E1B94C141FE3481D28863846517399E8EDE940A51F3ACE6AE6610F135C69D746DBFDD79165E5FFBE3CBF5EB23F1FB0D5513F6BF53991B9AACD006C7941B95CBD3E7E1C1E77A625EB418CF49E7CC1CEE03F7AE6C09E59143763848BD68DBA4EB22C2C0437C8EAF24BEE139C0D769B90BCC398D654C13FA0B9149428444B0688724709E7B59F1344EA1AF99FCE97E02834AD69B4166CF312EBBFE63F1096403E5B6781746B944220D706CDA4D7796C176784B5B7B64EBEDD1D71157C4E834455B3E1CC6ACB1C25C87E27ED7C40BD0EC9A2461622F946EA719EB78434B5F1DDD77E49C3DDF324BE0BCF8A0AB1ACD5F4A4194974DCC78D31E77316798A7008AF7D8BDF0A597B90C239146422D906C1F10DDB7F2CDCCC425B1738966AB840B27DCF15966FAB800AD723067B9C15364FF755BB7E483E33DBB3F5C74F7E1A1C71DEE8404E6526925E07597E1D64D9D724DDBD0CC2E8987A31912432BB09E32D2BCBBA396EB7DC39AFE3697123DDABDDAD4A7EFE2988EF1978D3C7D554374164BBC4F558A15F591ADE85DB19318D6A72F57008EB38157B7363E3DEB32C4BB66125B45D1A8BACC8A2AA57F16E455324D7B612E8950BFB1CA33C3C44E1B6D0E0E9FA778A0550B1DDB691285696F8782D0FC9EFE217ACA4205E3DDBE655B0D1F320DB063BD5F8855D76E2936214676939BB075131B86479E9E7E4EA905F74E4F01044A4DED25BE054D1925D6FE422365D1972CA0B766071E980906D31ACF0AE0CC95C3AEB5C6E3848E991D6128252785098416930E8E0A57CF0A11727B821A4548B6AAA1F0EC0B4233EE1E1A2A346B661DF72AF787F340B720DF6BAC919A16AF7C7C1E67556E40255EE28904F6D44C19437E9D603C713AC3D4C8AE6C8B9671954105A200C223A8EA01E28224195050A75B45F5C111D899128FDD1C5C563E75E08307DA19A12B45F7A2DBD76195229C074E6C3835367C42D334177C42D605238CFA0394B8F543835B196C60936B9E1BABD5A63DEFF505ACEA931ED843C4CFB097087B5C7A250A71FF508EA542FB8F3316E59541CE099C134A448677A157B2E3B8BCA538CD6FADACFDFED70FD27E87878BB9814CEDF689EA5EBA94C427A94289721BDE14FE11BD676EA53429FA4FDA4E093DAC4C8FBEF6FC1CF0CBDF62EAB1E20CA7D566FD093AFBF9AADE20779FBFD68057254016BE326A3F735772B171BF64D963983D7CE921253AE9D25BB1A8FDC33FA4C9DEE9A4D39299F77E84CBC4107D315696B8F9120A946A8A9BD1C2C817D7668091E145D87097B22DC4E8BF0A4C42AE8A63430F788B89C617A43C944348B3082594471077BE62EFBC51E4E4CB204B7535789E9F61CD0F65A82138AD3C718A3879A55BCC27499738BB61A73207591330CCA1A648C20629EF18AD4191753200B8C6E8EA42961D45EC69322394CC9F4271397D0A94D6A32A1DB48B5DF22BA364204830149C70AD34348641BB2C0AAEEFB984B40295D8709F049B7D3229049D0B660D031E170E9E103D00C59C0D480046609DEBCBE1A13A055DF6E4BF0E829BA1E0B145183AA77C82E737835A8C83CA85DE4404B85E46250328ACFE5AE0C02F1D63617324D62C655E002FC03DEB683613E097C9D42924BF0F304476362B510A278299C6C337F37272B35C9E29D68359BAE0D073ECEB494A739458C0046C5017AC632114048A2FAC4D18C576B6A5CE36DE986F079A73120749F9C54A8387E69FAE289206CE72E8206C06E969C1FC69AFA4C005F4DC39968D0B35F9C0654B50E840185C348703D1767425BB139907B264E85098B8731E0CC9C0BAF183F1F27C3A26A73E0FD6C9C0D8CFF03839C960C848B3210E9646C6288344C220B1DB935D59A00C79AD65BE8A8AD678231049AD988ED0DD7E7335A1B576C7A8C9FCD480D19D5F474DE70575E0F3593B3F9C5EFCA1B5464021C1BB4DD2276E5A10EA839FEC45F9904B54B3CFED457631EC82EF0F813A885E95D648A377E44C0CE70590C6133C394D6519BF50A73C4781646D170A27937C855452F54711D94312CED6EDCE1503E2A498B6545CBEC372C574952B2F5EAAAE32A827454EA2C8AAA3956541935B989E6E58A46077BBB6133D28868E10849E9A7788D9086460392D13196E844D4A30628A21DB475D668A2B821197DC8BC4E08CF7F014A12993534E2BAF03A481417B067D24A70CD9A24AD882A0A826AE526BEC2AC9DBA7B5D44837137690D41C8DD62A434152E9F6A440B17D020A1D2FD408D38F5AE052413BA1E6368025A3034F5681B4CF89012D058FCE9A8B596EDEE8199B6FDE68E6E58548FA0C0710E3AA932112D7E8C09962BECEAEA860DF92348EAB8216D3B6804F63322248C9F653582386A50550E9F28C9E1664E71B6E2E8F6565C2679E60108F9C4CDEF04A4E4EBD4EF6737C58B4485B4FE0227A4995F65AF5DAC9D61CDDB4853A4DA6020AAA2AE1C86AAD31515005456F44B06D759E582036AAE218C13D4C729E30C2BA1913662FBF76BF7D6A1514DA1E4C17597B34286E05C33C20A8A24C008BD7F36D80E086319600D136E33717B956637E34706C94923CCA3E133E385F6EEE3702BA934669085346467624570BA33934AE864010641F1E7601085560B30074DBD25540025DFE241DFAD28084BA0745B230143257A220C61020B9C0FCAD514936102E07E028CA1638812EA4070447195E0176584410856A8D12DD2AD79298380FBB04815E40DD821E69037580D9036C818DD971E2963807B7C4805E4CDBD21C69037EFC673C77A14B64B7EC20569F318380E4D560F2E482B09EB267EC6D0AE38DC1D97B318E88EBBE5964698CC3D17366EC83114C9A9AF0CC21AC3D5A9DD5632B00CC20F33D2582A964A0C217046D3EA104389B569A61B4A506612DC1BD1B09840AE04CE63A2CE18FC86A2DE49C1994BC6998B70920C13831974383DA7863F934DD50351B606139BE9FBA196DBC19FC5A69FE341120762F0D2933E80E30E49FB00C042DCA03718D848A287917087500900D633211D10AAA5A11DE02A249F3B10B6D2100D8C642522AC1DB0946910BC5031833078AE72E0D10A613683C0F77126032ABEDACC7406483309C8F66BBCA980477E7917D859378D0A1637CA0DE282F95D62F0B889DA8837880406EC079E9B799868C16FCA43B3AC3658589A08A97061A17709878CE4DC4A0508CF6332E85455633CDD2565BCCEC425E5E10625AE2493A6F5D6AFA14F16237D5A1722A9F637224852EECBE2F9AEAE231361919683840FBB513DD830628FAE22D593075A6FBE1E6DF4056703835AF56C9BA0317F469EB397A31F1C068EB74C6293C473294D74127F28235FB8A08EBB34F1489361D4E09BC75A335AE1D33C40C68F69E7442671E19E5A39DBB9E506B7FA2D6B6A2C7EA2FD52B3F5A0695480AE76C47AD083EDA6590F1217CECD2C67BEE74C5C50F76BB9E976BCB0EF6AAB9633B9B32ED44B736B9DAB9370DB8EB094E69EFA702BB55FBEEDAEA67769979B722F6D1F340F2E3745962D3BE4C7207A93EC5894B5096F82C3A11C13FA379B27AB9B43B02DC7ECDFDFAC570FFB28CE9EAE3FE5F9E1E7CD26AB446717FB709B265972975F6C93FD26D8259B278F1EFD65F3F8F1665FCBD86C8555B77C91BE2BA9C04E70CFA4D4F236CE8EBD0CD32C7F11E4C1C7A0FC1AF1F3DD5EC9A6BF88DF1604DCC7575BAFBDF4D8BE54FEDD6C1546DB8B52950B0250BD015F16752ACF7CABEA31B8B1D5B78BF76FB64114A4F2D7C07745E593E8B88FF1E01DFCEDB2C838283FA4CCCBE89FAA922E37523564436D144B49A895AD6FD436D89D408346816E901AB406FC1A66C832B7DC14ED33F3E628DF78AB3447FFD45CD2F3647F08E26FB24ADCE39369DAE682AE73DBD6112A6E0D8CBC3B4E67535BD6B6557F2D66564944F3C80E63E6489D0913D49D350358602EB8012AF057C70145D923CB1051B59FD64FCD253DDB96133993B4E99F9A4B2A4F9062B6BBC983B49C6225DDD4546BC9852B84CAEDD2CCA5BE605998A2FAAAA9D692417DE53473A9852AF93113A5B5CF2CA4F45F9D1604E11FA3C66535F7AA6459DC630B44739F4115304D7C1E1597F65BF239BD8B92AFB234FEF9C90C5BDD0D79A7510BB9EF6F3068A16FCE3D91CDD50EEDB2DCAD1DE02D089376C0DE9CBB1DFCF6D5B91CC5EE06BD53B362010106ED8ABF7AAA0DFBF7308ACA03BDDDAE3C9F1765C969165283F873E15024C7723B4F10C9279C0E60C4001F37D40881DA0ED0A1DF3F55FC5CED83301245348FCC65BCCADE14EE83548FE6D9C96084BBA9EF848F3EFADE1E1BC4BBE3E0A2283BFDF63ACC72562E715EB32F4C6E63288385FC873027C503E996DABF67C18ED05D4CB6D33C2764ABC9967A57D7F38A8120FCC23E04D167A20A684EBBDA98154865B4AC61F16C7734A92096D1AE7E46C511F92C6BF75B1AE6449DC464BB9A10A29554EBDEB20FD2CF19D8519A143B5D61817C82E5A233AC49C9945567089395E1D238C228715D8DF248E1B2AA732BA62EF9F9E7273383753151EE5B654E4E31FAE6A9FA34D79F9258DE73AA1F596CB2410E35E149CF8489266868D0E669CDE4E3BE838ABC3F0E3AAED3702BB76DFDC80261C9EBA215AB636E0166FD637359F52B2F8E697321871728A7CD35622E6A9453636F86ECEDF4A452CE9B3C848871204E39D6EE4E757DE980920DE7B0387042BD6A5787BAD608970BA55B2C5B4D1C670F4E73ADA551699AAC36C3A4DE691EEE30D7EA9A9445E7B43825405D6857F7B9D60C970BA5CFE3AC7EC79302185038C8E9E14901DD5D1F52CA48B343E554A84E32FFDC5CDABB7457C65CF0829A4756A79CD071ACD3392C7800EB70F2EAD6576642B714FCE9846B9197D21ED19AF7C7C13270D66ED9CEAF932DE478774FCF143150FCA6136C00EA517BEC98081907403E86AF567BC539BAB73D359B7FB29F797A1E0C477DB48AC5E43C3D1C7F6C747ADA02E0A3591D97FF1C4DB1CBD29F7A7D24F094F7D745D8544FECE1077FAC0902A4D9679D6C4AD49774E223571FC0E76904C302199D46325CD8C982B2B09124A17A72321000E3B49DDA1EA217B76F74232973B7F69C6D254442BB3714CFD7EED84AA488719AA8FF04B07030857E189868EC1FB385F53D3329D4D9097C12B3BF3DF47402C6015E55AA1C74D03DFC01BB1161C7879B3A418EFBFE833DDCA897C7815A59A2F87EFDC426D8A67CB7FDE4851870C3A79C4C13735FD6706A61FC7D8316A65EC62C5C868ECAADDC3E1B7B598AB77AD1AAE9BEEAC01F92CF2C969B5E49B6B9E3DABC2E0F814282C5C66590E5D741967D4DD2DDCB208C8E2960063493C5EE96F87A7613C65B56CABD396EB7EAAE9736B77DC970092E929E7F0AE27B0645944119ECE5DF04510E0BAE53EC25FECAD2F02EDC628824B27928EBEAE110D6574F708B695F9A7E8414C90E24FF9FFFAC0E1226DCA54371C01A2608F94683FA011ED51C56C1B7B758046EF565D056889D66E8173F8DA6669E98C24E319997C2BA35810F06D15C0B6D2E825001FB8C14307D5D439F161A60450FCD8A7EA36820EC266E58ECAB3FBAB01B2EAB55780D6049FA433E8EADDC89F1D0D4F4E78B1C15B4D6ABD06217966DB87A95BD3D46D1D3F55D1065B23786577B3054802FDCE0B7F9F85CC86D3D8A940B3E5F51BF85E368FC569E0770A01FD77154AD63059B7820003ECA428556F5B98C23A800E3A11F5B71EDF58D140FED8A7E53E6B4FA3B5AE1C180E8804838714A1EEC58C4CE9993C40EB4BC638F32D26CB10E1DF211155DEC01DEEDC91003C292E00752E6EFFEE4B760BE972100FFCE87C1357E1C2ABADBFAF82C8B7EB8637EC0E83E5AF2BD6086FC0880D9496C9FDFE0C0D5FCE01D5A9BEB3F26E0D86E90641F9B09FAAF130C9C25553BCE353541ACAB46D738F493144DB1AC3D943ABDD1474F23FBBD8C3F18EB2C79D62666353F56035A8226929DDC51B4D1F1149142D75C8F16857657CED2ED91374FBADF1DED6E43792B70F156462999752B63640DFDAECC815B6759AF8A0A7C097725FFEDCDB72C67FBC661FA57F43C0ACB857297E14D108777C5A85BEDEF3F5D3F79F4E8A7F5EA59140659CD946CCFEECB76FB4D96ED2280DBB7EC11EA66A6C4CBFB0FA6B45BDB9EEFD9DD0A6BFACB8DFCE225009F5283A7EBB0B440D5E77E6145030539DB5D0779E146C5652E56E9BA5E9508093E9654CD0D4A36A4F89E2FB72E24FE12A4DB4F41FA1FFBE0E13F7969792A7375F2A722A4D5D40D6C3373C1DBBC7A93B5EF8D68B69ED75634DB7AF5267878CDE2FBFC5301CB3FFDD95A30C772CBA9EFAD1900D2D8C54217B2BF016C55410D0FAD074900F2C84A19B71DBC07BCD8A6EB3962EB423E863A4BA9327A765877192A1F6C2D6B57FC9D877B96DCDD65CC596C17E4E745A8CA05EB53AC5F5D5B46580F5D8AE38435ED55AA108E0CD670540530CBF14ABA6BC273BFD6528E71F8AF230BABAE74179607855E467B905775B10386E3586F6E2D88FDF47BB3961FCC1BDB1C6626FD617499E3D487489EE374BC5E44DC68F8D1AC0D07A907492D11A9BBDF235C7FF0BDCE400EB6178B802B8858D407200046511F62552E514FCAE6FEA592A4A19ED41E553E450AEA49FF31C5ABFC9F9E94F62F5460FEF4A4A54F797C44BCFBFA800B857717C2C71A7859CFF1E710BEA70B908B73B193853777A1A1F7F420C9DD91B4DE9E022EB52CB6251B0ECEA6FFB06DB80FA2F204A2F82BAB3EC9F8F8A7A2D06D500A7C628F939E99D3BD9FCB6C9C033748060F5E8B1A77E8DB358B85ED081E25CCA2E963BBDCB73F09B167FA58708DE8416AF8317DCC24E3F98F3407A68702BCBB9110F7A58F5D6A1F6EDB7738086B5927973B0E73E4951E00D670C00D5958F83D37F27B60E4027D63901144908B859747DBF7D49233AD828D1BF25AC3CAB8D8D61CDCBBAF3B6EC7254F66D6D3C6D901E1C72692EB620E63375C2E142A9E328F43324C3A34BC878B144313F4753870E14743972246BDC7A9A3F1FBDE9AC0CE7228B5DE62CDD673F4F91C4516353A51CC758B6DD78E03CFFD86C1C29B150B65596C93D674733EAE84096C731E04CA912BBE5D438C0ACEAC2961161C7D73B6EF8DE17FDB3799C21227B69B10B5F0F8C94FF6179238C23870CC30918252C30DABBD9E006EC0B2BBA37E3337A8956081FECD8F1D6AE2B791F40568DFFC42CD98E5CDC6585621340363C068CA347800BA2602FB4C82A16E6DE3521C47E921332E49783664AC465B619E617DB41021922DCACC8024DD939A9D208CD15B922F6BB83B380E26B5AC3C6666A58975FC777927A3CCD0E507B054188EB5A6E412789B19D13C188CC2882663AC9BBD3416172FCE0D5C55F8E82D303E5FC5BB55F9B809F66D8A2F43B12FEA076F8E511E1EA2705B94554CFC0A41C0BBF8052B230257CFB67975BBEA79906D839D6A8632529E2ABB8E709515689E8A5AFC4E115EB43F4BCB155610151E6D96973656C860AFD3C2830C0F41C4D758CA6431E99475EA44CA292FD881C5E538A9D47058819D5CC9B83A03084402345EBA51088E44EB5BAD4DE7DBAC7B36096EBA399357A17F380A6A40AB20ED381034188124EC03F4F196B3C0A6E735ED8831B1661359589B66EB1F9E2D74E0C0B913C00E1F2E38EF98035F2A979A4D424EF74C6CB44717178F95769B170060ED4EA0FDB930EB599ABF5D532091A5A73572B421C7C2B4D73E5BFCB80106542345CD3E6C208CDD5ED0A3193EC4905941A098B278449074E7242E102AAF0980D1931B23DB2A8EF3C048434A1F79CB2BC13D1D6F36329D2206820825CD2617F127801F9860C26936382BF0D8CC13936287F826F1C4D069593AB18653E81B9BA6139E5B4D4AF34081E03E9F1F0E3407E9844B9B9A687B11D39118150A29D2A42C7E5A2249DD4F736A82E9EAA71B63E605C7C4638D3D3E661F6F149EF6D3F76094885E40152E71E9FE8CEEF30027E9D628B05AC44C760AC89A723E7382D6EC531AFA658DE966B55300CAC4739B1356669FDE80C0E3650C4550C434A48E90BEF801491B278E143BFB9824C41E2F036162B834AF8894B278541181E1A78A2735047A018E3910B7CD2B03252FDD39D785AA23A5CEED9E03F05AC498752A089B72F47284D8EC4318F00DA645600C201D80B4392B8CE988161684B1D39F264F0560134E938EF89A7B9A04E035DF0EFADC7099692FDD1232B3EF38F01425B7485403D5B8DD2B7423F7D926DA19E58857C4A1934F187522D47FD2749C7D2F8C7206290F57F73430A9EB583E879EEF028D0B41E16CE89359516E41120D2EBC07E09F11027DA0F469028F647E17452D21719C30241D3BCF3800A4A96D90327BE298D300DED94CC7A700C479A765273C9EE0D4AC60F40CA6E7D344E78250395F84844073753EE3A544DF25C45F484967385652E465C6989C7DA494B07906E3E4E9A17231689C0D853D63DC2D4E1732E676204759C70BE41F9FC3F61FC6CC87944673A94CE5CB159ADFBEFB1AB334BBBD498EE976307D060E83F25F0C5C4ADA59F061D802B06A8D59A931783CD41F24F1394E9C363A261E2E5C0072126306AF445909EDC8E11929321F1B22121A9E96891492808E40CA09214433960C9E5BE6C7C494738B0B20669D565AFA8BD62BD60E1956571EB497DEC13B3A4ADAD26F2C90348B489124AFE23CC8D00C1596F7AD4E191B33C4CD5815D9669E3F16C27089E20D1BED3B98E702A62F1E2350AD96899369972EA78396992E3C2D721903119FD6FFE9B7427C1CF7134B612BF6594DC1E607196770DAEF46D98B2864CCD13B375A0D3D268F275EE78ADD13B820E015C2F8EB5321F9AAE270AE18D64A02C68ED66EC75E8669567EF635F81864EA505BBE75C37275C258AFAE3A5A6868DA2EE330F7C1D3F5EE6352C0AB6697163228D0158BAAB7089432EAC790F0AFECE321B86759BDD36124BFE17C060B69D2A092B8644D21BDCFAB94D1274145F4A99A123A1A64A5802E0592DF25EAC4B76B7D557C9B028A6F1335E27B4A44457E9F0415D0A7EA4A103912D562C474B02C318BA6408E034B298C4B830AE2924D70059AAD4B41516560B4167D0DBF0E8ADD269D027093C50C661CEF0186372E0B013C2E976155856078B4C2422EAADA42468D0A52CCB452B8940E152B65D11408C53A2AA54299A0A2A17C863627CB87325116B7285FBCEA0D208D4F8651C6E7B0AE6DEF3C19D4BACF6C56FB3EBF6E02841647EA5408E502274528A3890AC2853EB87C210B5AB8904B372D489764D47941CA004E0C521E4D99FC3D0BA53C3E112A8B4FD794C37DCE4E2D874F24BD283EA3812B457B864A0ECCADB2F11095F324CA2135F01BCBDCD9ABD8CC7D5476A6B1098BF6F3944C8683096D6E3017357C5839E676EB439311C576D4B3142155885B2101CB81FADB352B2E93BC2800BE6E031CA276666B1F288B3CF10D612DD2BD062F333662150CAAD76DCC768EBF5A41250FAEB0B4EAA8D4459614C8C100F7220A7EFB6A029F06012AAAFB8088A0B2BC44A954C6961F9356B66BAFCEAD27DAB4CDA35157AA27B26098B49ACA271B806AD29F75F0D49ED25AB8063DB2D075802EFC850108BE06DF22F0546570F55CBF4E2E8AEDAB0FF0E80355D7B1EDBB0353785359C357AFE2CBF321D5ED1044D516B9BDE006CED9AADA12209055055912F053434E69C28999B8CAC2E607096824E718A006377584D7E1BD9AA1D5275A1DCE385ECB4F6702941B199FBC343CCA5E7A3BB6CFC60BC0F7CE3C9881EA0B86C4BF9EBAC3ECA620FA85194DADD7AE31B539808D52A38152CFC6EA79B80436860521D44EAFBD59103250C02026B4A19E4C016E5057AFD3FBCEF6D527B82B011398325D7A193AF14DF34A84C136B81773509030A666F4848B394CA2EEF3180D1B5399043FDA10648C6D12A2D310B9FD779A133187810BAAE3691BC50F9DD22C30B918E87C6859C88CAF359195C2366825E4A967750DFC8833B881E6811A406328E09511DB7F161361644CD05EB9096F93B8058E9F46D69BE1FAE345551E70B4D80BA38E0B3D1887EA6286EC421376B3D9CD65D6E5AC296F46EC76539B0C23588176884DB8582644177CDA5EEF23D367E883CD64862B4B8290115135A5A910420AC03E26D4155E3D24F5AE44F53A710BC2610C4A14CE05E4D8970A7BF270F48B194B77216258959BDBEA9A2A4377DABDB6F4B4064063E6013398C5D77B350672A5459601A1CA8B31704C9885920FEC0CD3561F0D86260E9895BCA3EDD1837B10BAEB423E8C8063C02C46D8EFFEFC4466E8EE4968E70324E7989B49D8A862727B6BB829703C2039C7DF3799D62006018AD852C522AC71FCD5B0ED9D3DAC248BAB767E8D4D782C96517953AFAC4FCAF425B1605948170CD6A55D6EEADB96CD83E2679EA4C13D7B93EC5894554F2F37EF8FC5DB7B56FF7AC1B2F0BE177159C88C59C56BD80B6DF3BC8AEF9236344ED2A8CDD226773799F36017E4C1B3340FEFCADB4669B265853DCA71F3D7C2024596ABFD47B67B15BF3BE687635EDEE1D87F8C8483B832968E2AFF72A3E87CF9EE50FECA7C54A150332CAAC0DEC57F3F86D1AED3FB651065D2E084892883F47E61C5F3BA2DF3E27F76FFAD93F436890D0535E6EB620B3FB0FD212A8465EFE29BE00BC375D3DB50B4D8E58B30B84F837DD6C8E8DF2F7E16F0DBED1FFEFAFF3546C8A5F0010200, '5.0.0.net45')