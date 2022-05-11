export const circuits = Object.freeze({
  // AuthCircuitID is a type that must be used for auth circuit id definition
  authCircuitId: 'auth',
  authenticationVerificationKey: `{"protocol":"groth16","curve":"bn128","nPublic":3,"vk_alpha_1":["20491192805390485299153009773594534940189261866228447918068658471970481763042","9383485363053290200918347156157836566562967994039712273449902621266178545958","1"],"vk_beta_2":[["6375614351688725206403948262868962793625744043794305715222011528459656738731","4252822878758300859123897981450591353533073413197771768651442665752259397132"],["10505242626370262277552901082094356697409835680220590971873171140371331206856","21847035105528745403288232691147584728191162732299865338377159692350059136679"],["1","0"]],"vk_gamma_2":[["10857046999023057135944570762232829481370756359578518086990519993285655852781","11559732032986387107991004021392285783925812861821192530917403151452391805634"],["8495653923123431417604973247489272438418190587263600148770280649306958101930","4082367875863433681332203403145435568316851327593401208105741076214120093531"],["1","0"]],"vk_delta_2":[["15962076267003996422169260125963935476508517526109713534556854910921907700034","10203099752970958585773579997583997881319610695743343947180986510323499576632"],["5291725806487885368726902844431355796110039913906638239617857493267848834703","20133174864064562127953183351084904399949736606097381013832571727853923466210"],["1","0"]],"vk_alphabeta_12":[[["2029413683389138792403550203267699914886160938906632433982220835551125967885","21072700047562757817161031222997517981543347628379360635925549008442030252106"],["5940354580057074848093997050200682056184807770593307860589430076672439820312","12156638873931618554171829126792193045421052652279363021382169897324752428276"],["7898200236362823042373859371574133993780991612861777490112507062703164551277","7074218545237549455313236346927434013100842096812539264420499035217050630853"]],[["7077479683546002997211712695946002074877511277312570035766170199895071832130","10093483419865920389913245021038182291233451549023025229112148274109565435465"],["4595479056700221319381530156280926371456704509942304414423590385166031118820","19831328484489333784475432780421641293929726139240675179672856274388269393268"],["11934129596455521040620786944827826205713621633706285934057045369193958244500","8037395052364110730298837004334506829870972346962140206007064471173334027475"]]],"IC":[["19511273555916108959757211082469604487285587105614355075386885586921776136821","19358309874394905107684947879449688986076744383027735640413499674375421243291","1"],["8969414856286236750277158803223651328437482922719900755207992122423726478401","12162320688508087033716247987308242422152811677187206427628957942745170203371","1"],["10282240521353938704610691145171084626769438560610221883022493700468261396975","13015407006411214535802547657576992811022522317575729408323796135585816680151","1"],["6479681979552233471243864462423633355137756886573757191397216569494559804932","6539792335772231294015105795348398841837428140113312616453926300046561797421","1"]]}`,
  authenticationPublicSignalsSchema: `{"challenge":0,"userState":1,"userID":2}`,

  // AtomicQueryMTPCircuitID is a type for credentialAtomicQueryMTP.circom
  atomicQueryMTPCircuitId: 'credentialAtomicQueryMTP',
  atomicQueryMTPVerificationKey: `{"protocol":"groth16","curve":"bn128","nPublic":73,"vk_alpha_1":["20491192805390485299153009773594534940189261866228447918068658471970481763042","9383485363053290200918347156157836566562967994039712273449902621266178545958","1"],"vk_beta_2":[["6375614351688725206403948262868962793625744043794305715222011528459656738731","4252822878758300859123897981450591353533073413197771768651442665752259397132"],["10505242626370262277552901082094356697409835680220590971873171140371331206856","21847035105528745403288232691147584728191162732299865338377159692350059136679"],["1","0"]],"vk_gamma_2":[["10857046999023057135944570762232829481370756359578518086990519993285655852781","11559732032986387107991004021392285783925812861821192530917403151452391805634"],["8495653923123431417604973247489272438418190587263600148770280649306958101930","4082367875863433681332203403145435568316851327593401208105741076214120093531"],["1","0"]],"vk_delta_2":[["2938661305262978924319973772628231744051563432165276264760659688095054763139","14313990634211819315624390386749806465861038676711367748033048613135493974212"],["5282591755997329253634345544119338210460297896272933808752197134662242516647","1344398768472455123079335878841705649809253869207192077633775987724011366512"],["1","0"]],"vk_alphabeta_12":[[["2029413683389138792403550203267699914886160938906632433982220835551125967885","21072700047562757817161031222997517981543347628379360635925549008442030252106"],["5940354580057074848093997050200682056184807770593307860589430076672439820312","12156638873931618554171829126792193045421052652279363021382169897324752428276"],["7898200236362823042373859371574133993780991612861777490112507062703164551277","7074218545237549455313236346927434013100842096812539264420499035217050630853"]],[["7077479683546002997211712695946002074877511277312570035766170199895071832130","10093483419865920389913245021038182291233451549023025229112148274109565435465"],["4595479056700221319381530156280926371456704509942304414423590385166031118820","19831328484489333784475432780421641293929726139240675179672856274388269393268"],["11934129596455521040620786944827826205713621633706285934057045369193958244500","8037395052364110730298837004334506829870972346962140206007064471173334027475"]]],"IC":[["10433858438134163669485844084000760855366083210586242011814920630654734456579","6512160453844697026301883474573776010881223496577999996865946077048375485505","1"],["15875643405729541269318240753100344530831084269944083566034023797695329375268","14418706402028178546539798607729222753771573989510426135094313333119054125822","1"],["10788735410328380416429364781809319319828727148477245750328142975571857238221","2431851189935625620529273283833987911533361990421297913094586007846948786853","1"],["7412392347030801615685363636557512568376089450558527833496097737316892451856","18078991525501910158087153575790152022378699636197074712116315347861875218393","1"],["8594810957418204736227311959851039672360496666990785965905019159970027161032","18474719909510025441379225001187866267877848042764033071774577737685317957486","1"],["11630624663143545285213064778671462666485461203553301947837756763276249171032","5235637317437234995164835177193362153107070752275742576362946296437065693472","1"],["16781666144635872476970203190029553061832284436667797691533858277485256360183","4480282710911367937519619493130512564271056219102533432895722869291503918881","1"],["16854489807739188225056573477003371356479121227837418041908721322149007708514","4737776686597307675960135583849933327527524500774477815598918087416856412855","1"],["9814291216235936133683973876581025452466569015274502175990152263853950079675","13648776587324741941204349426815243711052468126826571935672750315458266383202","1"],["8896514846852370307680241399925159622395598364819918324743527309240401931051","4906306274463208647733128440235928198653983033026853256155578284212812902407","1"],["36342724123383967106952569972484190394125740449320772184985993369111781389","17012900144551415855465834041312098846967349381699652974536767802680018284647","1"],["12083158896986742108611152035757267375123434892914854337084986095583496181063","8645632916298737727328644935690254087513996461422579318532644695180052219626","1"],["16217262130760520993584969557403356015621025809974614369186504442116204883878","3562992414700068023410592971157027792976459245071687088816785091669206535141","1"],["20406580329216139025399586088350072552616826847414670761878316279526246169200","14032338205215696724851791157107434784491013989566711726856938557857853082375","1"],["20967532041200120929029151220090721117892209341044629604383829657688830895393","9014750962091446230961555871287553809524825332532296870413093360055055911746","1"],["6838377478873730659200335441905710705360695829053914899682013468690606304022","1387440639239192723890719338460274875507143969175846729848907208081358031771","1"],["6560032255611477352824368350655751406341799499090202209899752243266986476429","21708818194956087873439792453251680077436160343565601881034594764044240519057","1"],["10947269534863853507685703802749414157380269984942882146206318754141027152643","8863135094393453200821363282440062266120496940653723336348312058167721299280","1"],["15352790434217354031705648422267596312083993416299515689471715144478499118536","13042368885224597163834582229829349144899194898410926134242266690087458872270","1"],["1917476389327523285322772638030565607104270411585039394255285807459297174526","14655865457708038578158088784458420140483345078449605362805535861502763413690","1"],["3610690266538657579726260002471655290271109970449327749823363204075707751356","10167569069740886829476157170317557169310100977586404268703428117377751658679","1"],["4988690502627059026662512208696166100583266178253284896648165299427143231243","9515176861984559648424128712146951426338965372747746170968235694996805477963","1"],["1804693495189844871720986378070238975164383883090681310702018630202622532203","12656554748079226196744652152604233835333161672712638331110342334303839649544","1"],["11540516844417127806097406276114264432410131366963506680852006945807213835578","6727183836930532900642340859048479000101471421060997058972157197378494823916","1"],["10668872672753033897458760773100087193969355049391067582815899890496774147507","1783574210079404490893677182334792539749192597884822731378673619529902970925","1"],["12953586882429700007037854286447182656671278685286571675661436598431827519193","12739033256283432550410825286327194333682622233236688196307355408179801895834","1"],["14603909673582233630354221286100114598537292566513942980247300730226612581296","10153482619148195447582650741353924750902530701203478950347525192091861195756","1"],["11559355474886763891054440960456239647496106627664095435979615193069708467322","15877360062829537059281644992672263366364952293183648220460657963723642170510","1"],["866572651777084174969226816388443458596774840618943932897588815966990481428","21044831805723812278305770509843820608273266227481349773416558998806016892639","1"],["6998808594210352203780042582607062870411515587330156829433965998169863412459","15310427939715012841663498537299052387813132884669554104052579050915471505962","1"],["13202636404108428177607574842824025650334661634793373026725333975850473333555","17174357735288638829233526978385115001777651416949974078015044392650547014055","1"],["19181957364579789882183947779698413705204294387959586271034222907094068224993","19204276035596026866872523622268788482884693955948619348958806155083807358404","1"],["9079668011342268644703601411994909216494252899826451908217355134106938293580","16092578823422232591040995090513433712420484660725294950671927324569463272418","1"],["18485097932814764524977224573442812141665900031645677227563330813589850389776","10874325374968770650409708236781483795746603325547970665834020634889654272826","1"],["10104814563346274095462036112130091003635482680096209357701232333708747122352","19064149112520865658169707101268122137281153625909370944378297814137948747139","1"],["4157311706110069245064523695893350125453273877294091030819097521387789646528","13543948248570366763910573703194057995782762408710554175854982418773943663265","1"],["4951860467524881924765778270986151401160263023338785455887474565622611622105","10490933274472071196271800966479483898628038460796657096930658221250212041555","1"],["5077791395882591287044106387962520993463300207383987696882447784037753541133","16583178852208097601592632550223145517307953339139074880724079947758090662076","1"],["11370673381527478460145873631772048667514275246921945778991439983008909453842","3636866892446716175686949278117426548476631420194036369638706074189930135880","1"],["13454905537130758913099141002011240537262134099120718165681079099438995591831","11138121502490393317241697225835300430124706577866360086314406883720173368977","1"],["11356871725488195363634540404403047269990606929921379962956548962849213600323","4324555467558608135533152870342486107761315148169518298408269373656432047901","1"],["16227052766362109226080006534880777597450185235411919892633354784694308291547","10798510961994807839629137533288731975276794311480153879556779228929185385511","1"],["9428166536026049459918245545308987985383696260372766024684727305239723222422","19242598596260758990442205481840093168291257313331614340293602304692118915229","1"],["8836183182369390530678954668140307958204500491048597783108184518286849954040","21143442108864326508455840966160445183702249088289810113616642427969123808002","1"],["1644209618724747437568329343334169267601542882735288988707572426634724151698","19014063281254683502053089595033735570571706573499760517937191667523620959484","1"],["9348252816010543507603360362084919519177483746805494224923954411787645530577","3356326786499980322953904539789946713404591282439009777058512392342662405205","1"],["17359099511433654403613314859984676123314620750335606932059955324468866631102","7545792296016864922482585565709779171987445535144953516509882018713923910600","1"],["9939384829954218655232772271918391140100039452232768653934646885475021633709","758379984223090054216872267526508383918998440343161858610945611728204958322","1"],["6110785166690205961141068164507448336343847129824002860753731398872038775075","16691387199392712040751916580562546443346240729533951898417722795516354438669","1"],["20170107244791117788698373249670902057183963443135037790110728889879911909687","5402113617744644938379407246867974114819743772270818322101214846846921073429","1"],["19097557563918934125965883917885502681680965757232125542463491503245303304559","19025869539758253309734139846986615801216058110500576283425636412655483772437","1"],["13402288059185155346084435673443407693999787210194063748380235155105020509120","9194661737910399832764574311192258445867562445486652465792675164517082255434","1"],["3053108863291115065282608428773967010077119318411114053737155716101705792464","10301904925756370278043364243717382468094971439234454119132082218702290422083","1"],["944637190937808184430204831853703430778712836997464342182450696026606551484","15865093453648115105827210554904571421271321833102431150499199642033647034037","1"],["21726753269695250090835858885443433015589392348805956939083595671723456184913","10496015916005451844381436143911980461770768920778462199458103629845972180604","1"],["8728396719526071944263242336187517696328887084095514485944149374260321260893","1947698863471714118149623032705124901580134016990838417547006285202449393467","1"],["10017495039961884387588988133774597741438095260693256394900331783180053321492","2003872262549878677899833523046656139136454446024919959493395083980714285699","1"],["19781743594803656945288307468023085161289231351405325793612414354641367040033","19549299028311417956351211915794700745923107220876639568691471551001814253277","1"],["11144819627230802102678936618160827028105836726998329833993763557339791031171","1296319472298780350075449516478667908143243285670012187275689273620996631433","1"],["162539779924601474422055758886106141164337399065209358082781526480570875580","12497438073253278241535411832036909280293905232517963445772427848461705209947","1"],["8206847830719415987453910385724257496196263221819600952082348682531937898635","1658802400970532603600553556195686872171312775469515744114115704944633213506","1"],["6151186634816733417202125919592067716149581054160450177447257233912491468911","11987959291310159331672141155790994485633161289918321899100180626415162281230","1"],["6302292971879599826452336679494460695016546628012549514669024543664146479782","6375473636878952375735646226511715755530349391515404481883251760562987633033","1"],["8104395151407557831758582024482565326758695605646543899654033133596952473627","19869067755254406916306517036774104045680766649902279876017345492709240227009","1"],["3462949446112579565662368242402843692602582868010160654088458474511193105511","8664643030840342589672182299053281859360750420292170676886912929651354639536","1"],["11207529054567723695397235369364741704083369670955369131516426858620892327695","9665622643753789891478871630619359858354099019645285471982623078918926654374","1"],["6615337119779541981707721128122947632812987736318589089253478315085805608613","3023717497067052212732357390678583574177111382985615009899671359496752547279","1"],["7956185009221868217138842188248398595542259385072625973296902607787755020966","13208418891675658925837594254827742518006827169737162236868990138486291473695","1"],["4586845077685940868889225848774581752412428835289387975973328287243184036724","921836827683744588062150727208668124993757363127432543026411310265418420519","1"],["18199464259339351771440384075683082458682174796422145753552782997911387696247","9070388356147923495087775074977616329725373112717233963922802239502516383670","1"],["9535745126922639873178316611777430618814247471455934285159647729372707749149","14389678475996867423036927890661591729914610039318511920891251956241307082658","1"],["1818822311909003266163977066488448139714517086514851297581780797076427744909","19443652486063685470504256554919645450168575702379710365844901812130613917320","1"],["12777292437140897243175802597184665370756827557214337160715978892843913685707","1777596767934259466737836745089650413078140325556698380553346868178623078750","1"],["4847183738174546945625646927002780641804866433566478174645549397992428894006","16079591714529266003152638543954334698939819838526077224438239342525445339394","1"]]}`, 
  atomicQueryMTPPublicSignalsSchema: `{"userID":0, "userState":1,"challenge":2,"issuerClaimIdenState":3, 
"issuerID":4,"timestamp":5,"claimSchema":6,"slotIndex":7, "operator":8, "value_0": 9, "value_1": 10, "value_2": 11, "value_3": 12, "value_4": 13, "value_5": 14, "value_6": 15, "value_7": 16, "value_8": 17, "value_9": 18, "value_10": 19, "value_11": 20, "value_12": 21, "value_13": 22, "value_14": 23, "value_15": 24, "value_16": 25, "value_17": 26, "value_18": 27, "value_19": 28, "value_20": 29, "value_21": 30, "value_22": 31, "value_23": 32, "value_24": 33, "value_25": 34, "value_26": 35, "value_27": 36, "value_28": 37, "value_29": 38, "value_30": 39, "value_31": 40, "value_32": 41, "value_33": 42, "value_34": 43, "value_35": 44, "value_36": 45, "value_37": 46, "value_38": 47, "value_39": 48, "value_40": 49, "value_41": 50, "value_42": 51, "value_43": 52, "value_44": 53, "value_45": 54, "value_46": 55, "value_47": 56, "value_48": 57, "value_49": 58, "value_50": 59, "value_51": 60, "value_52": 61, "value_53": 62, "value_54": 63, "value_55": 64, "value_56": 65, "value_57": 66, "value_58": 67, "value_59": 68, "value_60": 69, "value_61": 70, "value_62": 71, "value_63": 72}`,

  // AtomicQuerySigCircuitID is a type for credentialAttrQuerySig.circom
  atomicQuerySigCircuitId: 'credentialAtomicQuerySig',
  atomicQuerySigVerificationKey: `{"protocol":"groth16","curve":"bn128","nPublic":75,"vk_alpha_1":["20491192805390485299153009773594534940189261866228447918068658471970481763042","9383485363053290200918347156157836566562967994039712273449902621266178545958","1"],"vk_beta_2":[["6375614351688725206403948262868962793625744043794305715222011528459656738731","4252822878758300859123897981450591353533073413197771768651442665752259397132"],["10505242626370262277552901082094356697409835680220590971873171140371331206856","21847035105528745403288232691147584728191162732299865338377159692350059136679"],["1","0"]],"vk_gamma_2":[["10857046999023057135944570762232829481370756359578518086990519993285655852781","11559732032986387107991004021392285783925812861821192530917403151452391805634"],["8495653923123431417604973247489272438418190587263600148770280649306958101930","4082367875863433681332203403145435568316851327593401208105741076214120093531"],["1","0"]],"vk_delta_2":[["2662413110273701736483632806887691994942247602642114341717298996180091219412","4283157032750740370929573660506214881988778342948235697228785995545733324544"],["14787770693029352105004212036209659932760988106349584352854235974091952795281","2127387731557612856480246987287333469760964738187171392661141940842279797595"],["1","0"]],"vk_alphabeta_12":[[["2029413683389138792403550203267699914886160938906632433982220835551125967885","21072700047562757817161031222997517981543347628379360635925549008442030252106"],["5940354580057074848093997050200682056184807770593307860589430076672439820312","12156638873931618554171829126792193045421052652279363021382169897324752428276"],["7898200236362823042373859371574133993780991612861777490112507062703164551277","7074218545237549455313236346927434013100842096812539264420499035217050630853"]],[["7077479683546002997211712695946002074877511277312570035766170199895071832130","10093483419865920389913245021038182291233451549023025229112148274109565435465"],["4595479056700221319381530156280926371456704509942304414423590385166031118820","19831328484489333784475432780421641293929726139240675179672856274388269393268"],["11934129596455521040620786944827826205713621633706285934057045369193958244500","8037395052364110730298837004334506829870972346962140206007064471173334027475"]]],"IC":[["7257607976411906640846721670180375469034217455325822282568949594041029296771","1758594402440540704661492864809808364117377096721479660013611728748647667283","1"],["7720113172718406588751314994077358143599120337260947793266551568834388000936","9579732413465631066551616113744032736210391415965688652779952811105881050981","1"],["16906188332137293686124319597171005483155954506675418496726325020468965602374","4149834492395437634034508262394646811467838492744732608821402420554132860840","1"],["12816652042382887474359001419820118192676764725013272460012826253628762683326","19850837030965188893377004756489312853573616927549446279785028387147007564647","1"],["5099676304336800652979423696947165826630930850903537380329928600559658858573","15735111903778262148378995895378233920208967867475999210512078453056419817385","1"],["15289736384854817843995590473616469747953446781223570549350635967397067308271","832635126243129716145329966429597415096065625836944943131496462881771980133","1"],["13459017744122662026788905289041622163709059169933391665963766742969518108769","12025307783333932315725027745400898741428951638680572120246853131082715641129","1"],["14671844519035953674454121973526710078514738894389519525658048117903972432113","13241371808632288336434779159085480815539075739862706578275516528106352066303","1"],["8130555183417875468025687260123809411756111645443266183363363019941087308435","18462630700820246410316541339676466590667921467185631956806787475770308479807","1"],["18515292830458366042123083441794349022920358276218615942511021424603371900520","20459329911765187369538426299143331748004248888854422513709751409096265421928","1"],["18372498421157389479514442805920085425542451805929025412740847854386108066278","7429534560501373025312667666647983333480726364562263960642849196623112897079","1"],["7548833796731940225000879520991830803606873622029482070596574677781449788951","15960872674844253272168181451053226913105113406531501523087419861708541755961","1"],["19302535918536015334933002536475664911819771103669904549417660363940424990351","4437273840119461534807047288496982011263261820926016196171122823421926710994","1"],["5894256697897403909890238334391181762132840496457164717927849024045356318398","24063199856696935398756970759310728562040755636286107604015866263581474052","1"],["5618373417074653864373833168106258251187072995292239556142056668313641055177","12279011028480539039827761765595809345549524705084408852762007545506724914036","1"],["10582881141515871272162810601588767933773866417625632575377836819229781419250","11453086762894422219913108236568648523698986817750354619164973539583970391218","1"],["16237292780076690012060374583194564177181607574270845195001564546750718664187","14906842660976507828805285252360303882763521172574681957862131301986743933198","1"],["9794560858170204066119256328120536758365580904948340100625205045403187574348","5115687865790140288747800791286712542596392172206071842193549982868733015245","1"],["1255546023690358783562960252439550085839587664271749715260176445321642235658","7461682896241016475871822683662300648478977027699677707517029310396407994168","1"],["5065617297875728947391454224216318843176855836715118777714771383972681878667","15081834726571490818334108514851840500445774928799460062335557014398432290245","1"],["2021918525059738772690317194892839154823706724467978777159012420888245845470","3961342047890143506499795441165531670868002255086053321110391264826988925914","1"],["5997574905497845726934828316084501090223034671879311347527946977978306565988","133845284657117704335229351696071578226593463013339522054205019453666212947","1"],["3798708763997603252968490766857007607507903365208309358629447192472423590876","10661962668053535409902443908414363360345227127045203278270210593048503361475","1"],["6929852535271642145678068490398032939754608491613273504728880576547049719923","15522012702670296493219442451129677558419569236776566033197096924545768744094","1"],["10770642375142233498519597273798959080975808372302550437402944284111990052149","4456134686734714905432330843007633222030455222639695844834821729536871163310","1"],["12586474963078307546042226255477513237874615382126975795188329732173289644052","6829399190981820928050820279609793097027308602047604153567893108105944619230","1"],["7464197662336841354625973351980188019240515055474399529618505705946675202232","20049391756762376057315055472790104681854548482678008577109591228753732725564","1"],["17382538705844222965716120589039476338474754084901685149981736212415243104377","3722051491472517808759543347818624830557209260469851858788320492805497547957","1"],["19376075360715204229268097334121566135085251963678261414090330072669230328570","12961570954527812091233755689432913720570242340377273959249676257705066115289","1"],["13284057844778050030281414478859534033582667835341555496835635706298956943903","4453271285408581116639437983827773159686271463535027319828844664733301177462","1"],["12661147629469750134574636718909608886397867117714573947624518901034062730013","18641390174622847893347089766235288774429213359146188626474952864954812120520","1"],["17525626313534131277158015702451295423387180959986757320777151512986050314554","6016214802224082138253524205095755177644356716433587165646745595005099585947","1"],["10053023494221763710103490146280440696952612875787880252142785723442147816566","5690282521668572746851283463594580423900191285806583581092681637537914612563","1"],["9742718334178163656576957805331367313950031304356796858868767608174142273819","7395202515082973801967025343527293584474761632155106147131304166714691754367","1"],["14820704214071996794697791810614241039926003949202920258663537652715143301402","6401515145262709179142376649409469128512884073030811826110068407965086894836","1"],["16085990963544370954488239402092916838158990708703947278819824860018137468938","15433752471785316902012494821567906056162841415531441876511904094593740073301","1"],["17022862425099094618893329210991970243687375560355083348200968375054755124858","369505857706826324200008861666820646110226012029732341281905207468591360509","1"],["14129076599236642617965011519516843904379412248555431823160631031275069780920","17971887356228338011211295155493449630020027779808461491837185595762899457245","1"],["14359525767685479673670189501609480740846844931390105806732333406272878836499","19688273433890387584142601369542130990725202636969632368251113589518114791712","1"],["8566980320877904963893399276774574928658692574146790936478100811190874130236","17182588810309351017137681788101079631162455767894339600341346130755152216828","1"],["20034702811492356663568055372904324631559734635923025989309419004008872289497","21637123109862537318390045703762151124104887066467705559230821598159797908285","1"],["10958660180583074974491911427328068114764543504957314052289856112887067948441","20304666528022414978661232560530131718369707480796734184679097044293618123678","1"],["16151889810342620250440317998066483705105833119732786537907501481452065039332","2160167775785119508878298945018829855350489577402385400734118954136229017272","1"],["9773854941865232656189295145352292075468650041629859834030096267889098850601","12340453556625146501842151175076796272346445353231084802276038058690443320980","1"],["2785570088148011039438626741516684097662081726902654234566582376612838058867","9131690695979986141346395039876941352905171503603952262202112402529416472567","1"],["14517169510339705112199503004208177857761188590503525339396563830664513473168","19648211468063729010062075622493006962378956840940046043406915814032125391722","1"],["68627131877282022896317993015450908413850013148999786880668160635962328754","2428791299497739802416470419767854749600078044725925257275459602875440823216","1"],["5383514246178287303974819750098210514329029866541179603924461053002075270454","18480934531535661407167642865841907678536675402376279873923503696494943697324","1"],["14074333063750699193558088310231780677941687091542893865910549208552497454614","6261989029639216090664096121761679065114525574023394841670995111087911184402","1"],["5622955911561968655152521961973951942076204051152623439344648765950877526385","17516333800151757277025010013258782922782777600905489967836852109050202807484","1"],["21607512085582375297574362461467564625092323846513736534089733980797294445166","2949962322535998993153237015995991113569649885786967836756351122005384973008","1"],["20881578674416735346180268070745940552035798171586301112962975019969880394187","15203352605409017885883110297518872303709439304396811264554526369278159791746","1"],["17685155032922193023589379774829724331331711360753974983096641457763253557812","13052656251317275804814764775783337151262738233433114962335432880277204829018","1"],["17884139579504029415852634243494014773011753024621497777341336001666048547676","17362994236054455753671345949674929380954369654669910617173157187221264247587","1"],["18010784067170666929258791688170395631455911948540567621835713931334426694194","5223366165612395482587286178145179605114107800725965203127274884662691703296","1"],["18928368993998756299908727990024896262716316004658840891355331935975686539226","10840796073460302301542873160253552598524282412281968598845350216802822232313","1"],["8966806279823311012381844054562865596082627694482218271356939559807370401356","7663470323487697104129158759256960482268460045990182345615350219456178719308","1"],["12037109757051310393262872410516944067301532442357043522437429848456877529643","797644782870599364279598717878652868367035903866362017871898287563918208945","1"],["190524854131648296906050500134565303181602343991037697930427299675552063565","20291639055021738922058789027968468033121434100571055046203540230851912107475","1"],["8029247781859401265464850337274936204205501223253970247789348634482346411652","3892664197957350056223544028718524465391965098817865856036204938847613252959","1"],["21509764874956216470448693737914856559086835498233894510161611466834245159282","13942505937055669438436419376653720894144837320171746939518417618223241943815","1"],["20434700897752572090627342632601587359125500400781604460406067606606503769150","12390853522739190927091889527115301515879621823271056929350462725093190697436","1"],["20159976772454517862934256004850424524956633193490341805846908208891040848187","18521674995267484280609873990548501915966040411901717004558220437106206684005","1"],["17968483042830838826565666113595977089117197136019447783289178264685576947416","6490843681931173105103725549542190698209201596660918605456826951712446565433","1"],["13779903879830878662922837871195543599172667058734187761612126462622055948476","2428710236551622116668972785473813490590661508331640020779618097967862784470","1"],["16954820770328319543528911237489619554882274401578395329543968159566894637668","14631138048690417113586475864069545388363176909535109433198269765334993072281","1"],["3309879480246196275541057614336640554508326251903752519015406365539695290942","11747580206778214414503815912048755624142599903164770993336190564931578729111","1"],["14556956622439523146403829746045399701875394755353797421571594578162429932541","14440340532209005516296209368709763664969460181506149490824095026579687545604","1"],["11291130669938747914988501077313021900883577941692561743465645091174051560514","3039107170181701947650744040454297901706953106893955098899527289951935970729","1"],["15724929320250496618325317872889182843947254050460686572669541362160267956567","13442317448772440274197848996249239252648782108668724731843705362770428900340","1"],["5248589816917381437253228218076754590936936484043918156066328315329113330425","17887562670503782559661434476293475308010929352375096566802751599187798964627","1"],["1374215174626609681226435899245157687239345295703195340768251107519840759553","2719225118620756803703016521189176371623121873473481133582410131156113482329","1"],["20752057200480303212109394040122439656224535059312131376491939224445201431792","5821398911773381977428162110850427546999698875393775383384624300092295661318","1"],["7067947729531615856337286931500323453402201680355418026955156944273643320446","13023949364381954789338679202309367160944118026070186860433030347239246313524","1"],["9992567324089310264413291242941355743328890252896544798298336952958338494900","2823133705239948670962112159638682059260751207183188773377155869981340787762","1"],["4743488844569701996031326373584754097463974687659997200074709994795778151982","7312728610789289094107696956766193241737138489967982682859003666049145881268","1"]]}`,
  atomicQuerySigPublicSignalsSchema: `{"IssuerAuthState": 0, "userID": 1, "userState": 2, "challenge": 3, 
 "issuerID": 4,"issuerState":5,"issuerClaimNonRevState": 6, "timestamp": 7,  "claimSchema": 8, "slotIndex":9, "operator": 10, "value_0": 11, "value_1": 12, "value_2": 13, "value_3": 14, "value_4": 15, "value_5": 16, "value_6": 17, "value_7": 18, "value_8": 19, "value_9": 20, "value_10": 21, "value_11": 22, "value_12": 23, "value_13": 24, "value_14": 25, "value_15": 26, "value_16": 27, "value_17": 28, "value_18": 29, "value_19": 30, "value_20": 31, "value_21": 32, "value_22": 33, "value_23": 34, "value_24": 35, "value_25": 36, "value_26": 37, "value_27": 38, "value_28": 39, "value_29": 40, "value_30": 41, "value_31": 42, "value_32": 43, "value_33": 44, "value_34": 45, "value_35": 46, "value_36": 47, "value_37": 48, "value_38": 49, "value_39": 50, "value_40": 51, "value_41": 52, "value_42": 53, "value_43": 54, "value_44": 55, "value_45": 56, "value_46": 57, "value_47": 58, "value_48": 59, "value_49": 60, "value_50": 61, "value_51": 62, "value_52": 63, "value_53": 64, "value_54": 65, "value_55": 66, "value_56": 67, "value_57": 68, "value_58": 69, "value_59": 70, "value_60": 71, "value_61": 72, "value_62": 73, "value_63": 74}`,
});
