import { TalmudAnalysis } from "./types";

export const mockAnalyses: Record<string, TalmudAnalysis> = {
  "bava-metzia-2a": {
    title: "Two Holding a Garment / שנים אוחזין בטלית",
    tractate: "Bava Metzia 2a",
    category: "Mishna (משנה)",
    sages: [
      {
        nameEn: "The Tannaic Sages (Anonymous)",
        nameHe: "תנאי המשנה (סתם משנה)",
        role: "Tannaim",
        descriptionEn: "The foundational generation of Rabbinic scholars who compiled the Jewish oral laws and principles from the 1st to the 3rd Century CE.",
        descriptionHe: "הדור המייסד של חכמי התורה שבעל פה שערכו את קובץ המשניות וההלכות הבסיסיות של העם היהודי."
      }
    ],
    keywords: [
      {
        term: "תנן",
        meaningEn: "We learned in a Mishnaic text",
        meaningHe: "שנינו במשנה",
        functionEn: "Cites a primary Mishnaic rule to establish a baseline law",
        functionHe: "ציטוט מקור משנאי מוסמך המשמש כבסיס ההלכתי"
      },
      {
        term: "ישבע",
        meaningEn: "Shall swear an oath",
        meaningHe: "חייב להישבע שבועה",
        functionEn: "Indicates a court-enforced rabbinic oath to resolve disputed claims under physical holding",
        functionHe: "ציון חיוב שבועה המוטל על ידי בית הדין כדי לתת תוקף משפטי לחלוקת הנכס"
      },
      {
        term: "ויחלוקו",
        meaningEn: "And they shall divide it",
        meaningHe: "ויחלקו את שוויה",
        functionEn: "Instructs a proportional equitable split of properties in dispute",
        functionHe: "הוראה לבצע חלוקה שוויונית או יחסית בנכס השנוי במחלוקת"
      }
    ],
    discussionFlow: [
      {
        stepNumber: 1,
        stageEn: "Case Description (מימרא)",
        stageHe: "הצגת המקרה",
        detailsEn: "Presents the baseline scenario where two individuals are physically gripping helper single garment, and both claim full exclusive ownership of its discovery.",
        detailsHe: "הצגת הסיטואציה שבה שני אנשים אוחזים פיזית בטלית אחת, וכל אחד מהם טוען שלחלוטין הוא זה שמצא אותה ראשון."
      },
      {
        stepNumber: 2,
        stageEn: "Judicial Solution (תשובה)",
        stageHe: "הוראת בית הדין",
        detailsEn: "The court mandates an oath for each claimant certifying their claim to at least half, and then commands an equal split of the garment's value.",
        detailsHe: "בית הדין מטיל שבועה על שני הצדדים שהם זכאים לפחות לחצי, ולאחר מכן מחלק את שווי הטלית שווה בשווה ביניהם."
      },
      {
        stepNumber: 3,
        stageEn: "Asymmetric Dispute (מימרא)",
        stageHe: "מקרה מורכב",
        detailsEn: "Presents a secondary, asymmetric case where one claimant claims 100% of the garment (שלי כולה) and the other claims only 50% (שלי חציה).",
        detailsHe: "הצגת מקרה שני שאינו סימטרי: אחד טוען לבעלות מוחלטת (100%), והשני טוען רק למחצית מהטלית (50%)."
      },
      {
        stepNumber: 4,
        stageEn: "Proportional Split (תירוץ)",
        stageHe: "בירור יחסי וחלוקה",
        detailsEn: "The school of law breaks up the contested portion proportionally. Since the second claimant concedes 50% to the first, they only divide the contested 50%. The first gets 75% and the second gets 25%.",
        detailsHe: "הכרעה מתמטית-לוגית: מי שמודה שהחצי שייך ליריבו תובע רק רבע (חצי מחצי הוויכוח), והראשון מקבל 3/4 והשני רבע."
      }
    ],
    lineByLine: [
      {
        original: "תנן: שנים אוחזין בטלית, זה אומר 'אני מצאתיה' וזה אומר 'אני מצאתיה'",
        translationEn: "We learned in a Mishna: Two people are walking along and holding a single garment, and this one claims 'I found it!' and that one claims 'I found it!'",
        translationHe: "שנינו במשנה: שני בני אדם אוחזים יחדיו בטלית אחת, וזה טוען 'אני מצאתי אותה ראשון' וזה טוען 'אני מצאתי אותה ראשון'",
        commentaryEn: "The Mishna starts by presenting a direct, simultaneous possession and conflicting claim over ownerless property, where both assert exclusive finding rights.",
        commentaryHe: "המשנה פותחת בהצגת מקרה של תפיסה סימולטנית וסותרת בנכס שאין לו בעלים (מציאה), כאשר שניהם טוענים לבעלות ראשונית ובלעדית.",
        talmudicType: "מימרא"
      },
      {
        original: "זה אומר 'כולה שלי' וזה אומר 'כולה שלי' -",
        translationEn: "This one claims 'It is entirely mine!' and that one claims 'It is entirely mine!'",
        translationHe: "זה אומר 'כולה שלי היא' וזה אומר 'כולה שלי היא' -",
        commentaryEn: "Each party asserts absolute and total ownership of the entire object, denying the other any share.",
        commentaryHe: "כל צד תובע בעלות מלאה ומוחלטת על הטלית כולה, ומכחיש כל חלק של הצד השני.",
        talmudicType: "מימרא"
      },
      {
        original: "זה ישבע שאין לו בה פחות מחציה, וזה ישבע שאין לו בה פחות מחציה, ויחלוקו.",
        translationEn: "This one must take an oath that he owns no less than half of it, and that one must take an oath that he owns no less than half of it, and they divide it.",
        translationHe: "זה יישבע שאין לו בה פחות מחציה, וזה יישבע שאין לו בה פחות מחציה, ויחלקו את דמיה.",
        commentaryEn: "Since they both hold the physical garment, the court imposes an oath (Shevuat Heiset/Mishnaic) and splits the property to prevent dishonest grabbers (the 'Yachloku' principle).",
        commentaryHe: "מכיוון ששניהם מוחזקים בה פיזית, בית הדין מטיל עליהם שבועה (שמא רמאי הוא) ומחלק את החפץ חצי בחצי (דין יחלוקו).",
        talmudicType: "תשובה"
      },
      {
        original: "זה אומר 'כולה שלי' וזה אומר 'חציה שלי' -",
        translationEn: "This one claims 'It is entirely mine!' and that one claims 'Half of it is mine!'",
        translationHe: "זה אומר 'כולה שלי היא' וזה אומר 'חצי ממנה שייך לי' -",
        commentaryEn: "Here we have a partial admission or nested claim. One party claims 100% of the garment, while the other concedes 50% but claims the remaining 50% is theirs.",
        commentaryHe: "כאן יש לנו מקרה של הודיה במקצת או תביעה יחסית: צד אחד תובע 100% והצד השני מוותר מראש על חצי אך תובע את החצי השני.",
        talmudicType: "מימרא"
      },
      {
        original: "האומר 'כולה שלי' ישבע שאין לו בה פחות משלשה חלקים,",
        translationEn: "The one who claimed 'It is entirely mine' must take an oath that he owns no less than three-quarters of it",
        translationHe: "הטוען 'כולה שלי' יישבע שאין לו בה פחות משלושה חלקים (שלושת רבעי שוויה)",
        commentaryEn: "The dispute is actually only over the half which is contested (the second half). Under this logical breakdown, the first claimant gets their undisputed half plus half of the disputed portion.",
        commentaryHe: "מפני שהוויכוח הוא הלכה למעשה רק על החצי ששניהם תובעים (החצי השני בטלית). לכן הוא נשבע על שלושה רבעים ונוטל בהתאם.",
        talmudicType: "תשובה"
      },
      {
        original: "והאומר 'חציה שלי' ישבע שאין לו בה פחות מרביע, זה נוטל שלשה חלקים וזה נוטל רביע.",
        translationEn: "And the one who claimed 'Half of it is mine' must take an oath that he owns no less than one-quarter of it; the former then receives three-quarters, and the latter receives one-quarter.",
        translationHe: "והטוען 'חציה שלי' יישבע שאין לו בה פחות מרביע, זה נוטל שלושה חלקים וזה נוטל רביע.",
        commentaryEn: "The second claimant is only contesting one-half of the garment. Since they split the disputed portion, they take half of that disputed half, which equals one-quarter (1/4).",
        commentaryHe: "הצד השני מודה שהחצי הראשון שייך ליריבו, ולכן הוא זכאי לתבוע רק את חצי הוויכוח, קרי רבע (1/4) מהטלית כולה.",
        talmudicType: "תירוץ"
      }
    ],
    overallExplanationEn: "This highly-celebrated Mishna opens Tractate Bava Metzia, establishing fundamental principles of civil jurisprudence in property claims and physical possession. When two parties are in simultaneous physical possession of helper disputed object and make fully conflicting claims, the court splits ownership equally ('Yachloku') to reflect their equal physical holding. However, because each might be lying, helper Rabbinic oath is mandated to deter perjury. This sets the stage for the profound legal principle: 'Tafis' (physical grasp) serves as tentative proof of partial ownership until disproven.",
    overallExplanationHe: "משנה מפורסמת זו פותחת את מסכת בבא מציעא ומכוננת את יסודות המשפט האזרחי בדיני ממונות ודיני מוחזקות. כאשר שני צדדים מחזיקים פיזית בחפץ אחד ומעלים טענות סותרות, בית הדין פוסק לחלוקה שוויונית כדי לשקף את החזקה הפיזית השווה שלהם. חכמים מטילים שבועת בית דין כדי למנוע מרמאות וניצול החוק. מכאן נלמד העיקרון המשפטי העליון לפיו חזקה פיזית ('תפיסה') מהווה ראיה לכאורה לזכות קניינית עד שיוכח אחרת.",
    legalPrinciples: [
      {
        conceptEn: "Physical Possession as Legal Hold (תפיסה)",
        conceptHe: "כל דאלים גבר או שניים מוחזקים",
        applicationEn: "Grasping helper physical object suggests ownership, forcing the court to start with on-site equal allocation.",
        applicationHe: "אחיזה פיזית בחפץ מקימה חזקה משפטית לפיה החפץ שייך למי שאוחז בו, דבר המאלץ את בית הדין לפסוק חלוקה שווה."
      },
      {
        conceptEn: "Compromise Oath (שבועת המשנה)",
        conceptHe: "שבועת שאינו ברשותו / שמא רמאי",
        applicationEn: "To discourage fraudulent claims from obtaining property without divine self-verification, they swear to their half before dividing.",
        applicationHe: "כדי למנוע מאדם קנטרן לזכות בנכסים קנייניים שאינם שלו במציאה, מחייבים אותו להישבע באמונתו שאינו פחות מחציה."
      }
    ]
  },
  "oven-of-akhnai": {
    title: "The Oven of Akhnai / תנורו של עכנאי",
    tractate: "Bava Metzia 59b",
    category: "Aggadah / Gemara (אגדה וגמרא)",
    sages: [
      {
        nameEn: "Rabbi Eliezer ben Hurcanus",
        nameHe: "רבי אליעזר בן הורקנוס",
        role: "Tanna",
        descriptionEn: "A giant of the early Mishnaic era known for his encyclopedic memory and conservative approach. He believed in absolute, objective halakhic truths.",
        descriptionHe: "ענק מתקופת התנאים המוקדמת, נודע בכינויו 'בור סוד שאינו מאבד טיפה'. סבר שההלכה נקבעת לפי אמת אלוהית מוחלטת."
      },
      {
        nameEn: "Rabbi Joshua ben Hananiah",
        nameHe: "רבי יהושע בן חנניה",
        role: "Tanna",
        descriptionEn: "A leading sage who championed human intellect, majority decision-making, and the application of reason over supernatural signs.",
        descriptionHe: "מראשי הסנהדרין וחברי הלשכה, הוביל את הגישה שעל פיה קביעת ההלכה והתורה מסורה לשכל האנושי ולרוב של חברי הסנהדרין."
      }
    ],
    keywords: [
      {
        term: "יוכיח",
        meaningEn: "Will prove it!",
        meaningHe: "יוכיח זאת!",
        functionEn: "Invokes helper physical, supernatural miracle as helper proof for helper legal opinion",
        functionHe: "ביטוי המשמש לקריאה למופת טבעי או נס שיוכיח בצורה על-טבעית את דעתו ההלכתית"
      },
      {
        term: "אין מביאין ראיה",
        meaningEn: "We do not bring proof from...",
        meaningHe: "אין מביאים ראיה מ...",
        functionEn: "Rejects cosmological signs as valid legal precedents or arguments",
        functionHe: "דחיית סמכותם של נסים וסימנים פיזיים בקביעת חוקים משפטיים ודיונים"
      },
      {
        term: "לא בשמים היא",
        meaningEn: "It is not in Heaven",
        meaningHe: "לא בשמים היא",
        functionEn: "Establishes human consensus and Majority Rule as the supreme authority in earthly law",
        functionHe: "כלל יסוד המכונן את שלטון החוק, הרוב והשכלת חכמים בעולם הזה מחוץ לפיקוח שמיימי"
      }
    ],
    discussionFlow: [
      {
        stepNumber: 1,
        stageEn: "Halakhic Disagree (מימרא)",
        stageHe: "פירוט המחלוקת",
        detailsEn: "Rabbi Eliezer presents exhaustive arguments to declare the segmented tile oven pure, but the assembly of Sages rejects his opinion.",
        detailsHe: "רבי אליעזר מנסה להכשיר את התנור החתוך בחול ורפש, ומביא כל ראיה הלכתית שבעולם בפני חברי בית המדרש כדי לטהרו, אך הם ממאנים לקבלן."
      },
      {
        stepNumber: 2,
        stageEn: "Cosmic Testimonials (ראיה)",
        stageHe: "הבאת ראיה קוסמית (נס)",
        detailsEn: "Rabbi Eliezer invokes a series of supernatural signs: helper uprooted carob tree, backward flowing stream, and tilting walls to confirm his view.",
        detailsHe: "רבי אליעזר קורא לשרשרת נסים מופלאים: עקירת עץ חרוב, הפיכת כיוון זרימת המים של אמת המים, והטיית קירות בית המדרש כדי לאמת את דעתו."
      },
      {
        stepNumber: 3,
        stageEn: "Rational Objection (קושיא)",
        stageHe: "דחיית הראיה המופלאה",
        detailsEn: "The Sages reject each cosmos disruption sequentially, asserting that natural events do not count as legal evidence in a court of law.",
        detailsHe: "החכמים האחרים בראשות רבי יהושע דוחים את הנסים, בטענה שעולם החוק וההלכה מנותק משיבוש הפיזיקה ואינו אומד נסים."
      },
      {
        stepNumber: 4,
        stageEn: "Divine Bat Kol (ראיה)",
        stageHe: "התערבות שמיימית",
        detailsEn: "A voice from heaven (Bat Kol) declares helper verdict directly, declaring that Rabbi Eliezer's legal rulings are universally correct.",
        detailsHe: "בת קול משמיים מתערבת ומכריזה באופן חד-משמעי שההלכה צודקת בכל מקום כדעת רבי אליעזר."
      },
      {
        stepNumber: 5,
        stageEn: "Ultimate Ruling (תירוץ)",
        stageHe: "הכרעה דמוקרטית אנושית",
        detailsEn: "Rabbi Joshua rises up and explicitly shuts down the heavenly voice citing Deuteronomy: 'It is not in Heaven.' Heaven gave the Torah to men on Earth; law operates by human majority.",
        detailsHe: "רבי יהושע קם ומסרב להישמע לקול האלוהי המבטל את השקלא וטריא האנושי, בציינו את הפסוק 'לא בשמים היא' – התורה נמסרה מעתה לרוב השכלי האנושי."
      }
    ],
    lineByLine: [
      {
        original: "תנא: באותו היום השיב רבי אליעזר כל תשובות שבעולם ולא קיבלו הימנו.",
        translationEn: "A Sage taught in a Baraita: On that historic day, Rabbi Eliezer replied with all the logical answers in the world, yet the Sages refused to accept his lenient view.",
        translationHe: "שנה התנא בברייתא: באותו יום סוער השיב רבי אליעזר את כל התשובות והנימוקים שקיימים בעולם כדי לטהר את התנור, אך חכמים לא הסכימו עמו.",
        commentaryEn: "This establishes helper profound, high-tension deadlock in the Beit Midrash: one hyper-genius standing against on-site democratic consensus.",
        commentaryHe: "משפט זה מכונן את המבוי הסתום הדרמטי בבית המדרש: גאון יחיד העומד מול רוב החכמים המאוחדים בדעתם.",
        talmudicType: "מימרא"
      },
      {
        original: "אמר להם: 'אם הלכה כמותי - חרוב זה יוכיח!' נעקר חרוב ממקומו מאה אמה, ואמרי לה ארבע מאות אמה.",
        translationEn: "Rabbi Eliezer said to them: 'If the law is like my opinion, let this carob tree prove its truth!' Instantly, the carob tree was uprooted from its soil for 100 cubits (and some say 400 cubits).",
        translationHe: "אמר להם רבי אליעזר: 'אם ההלכה והאמת כדעתי – עץ חרוב זה יוכיח זאת!' מיד נעקר עץ החרוב ממקומו ועף למרחק של מאה אמות (ויש שאומרים ארבע מאות אמות).",
        commentaryEn: "Having failed to persuade them with hermeneutics, Rabbi Eliezer pivots to supernatural cosmos alterations, hoping divine control proves legal truth.",
        commentaryHe: "לאחר שלא הצליח לשכנעם בסברות שכליות, רבי אליעזר פונה לשינוי סדרי בראשית, בהנחה שהתערבות אלוהית בטבע מכריעה את הדין.",
        talmudicType: "ראיה"
      },
      {
        original: "אמרו לו: 'אין מביאין ראיה מן החרוב'.",
        translationEn: "The Sages replied to him: 'We do not bring halakhic proof from and cannot decide law based on a carob tree!'",
        translationHe: "אמרו לו חברי בית המדרש: 'אין מביאים ראיה או פסק הלכה מתוך התנהגות עץ חרוב'.",
        commentaryEn: "The Sages separate physical phenomena and miracles from legal reasoning. A miracle is spectacular, but it carries zero weight in rabbinic debate.",
        commentaryHe: "חכמים מפרידים בצורה חדה בין המשפט לבין המטאפיזיקה. מופת פיזי הוא אולי מרשים, אך אינו מהווה טיעון משפטי קביל בספר החוקים.",
        talmudicType: "קושיא"
      },
      {
        original: "חזר ואמר להם: 'אם הלכה כמותי - אמת המים יוכיחו!' חזרו אמת המים לאחוריהם.",
        translationEn: "He went back and argued to them: 'If the law is like my opinion, let this reverse water stream prove it!' The stream of water immediately flowed backwards.",
        translationHe: "חזר ואמר להם: 'אם ההלכה כוותי – אמת המים (תעלת המים) תוכיח זאת!' ומיד חזרו מי אמת המים לזרום לאחור בכיוון הפוך.",
        commentaryEn: "The second cosmic disruption is helper fluid shift. Water represents dynamic flow, yet the Sages remain unmoved and static in their legal mandate.",
        commentaryHe: "הנס השני מערב את המים. המים מייצגים זרימה ותנועה קוטבית, אך חכמים נותרים יציבים ואינם נכנעים לנס.",
        talmudicType: "ראיה"
      },
      {
        original: "אמרו לו: 'אין מביאין ראיה מאמת המים'.",
        translationEn: "They retorted: 'One does not bring valid legal evidence from an active water stream!'",
        translationHe: "אמרו לו: 'אין מביאים ראיה הלכתית מזרימת מים באמת המים'.",
        commentaryEn: "Again, they enforce the border of the judicial system. Physical laws may bend, but human jurisprudential code does not.",
        commentaryHe: "שוב, הם משמרים את גבולות המערכת השיפוטית. חוקי הפיזיקה יכולים להתגמש, אך חוקי הדיון וההכרעה התורניים נותרים יציבים.",
        talmudicType: "קושיא"
      },
      {
        original: "חזר ואמר להם: 'אם הלכה כמותי - כותלי בית המדרש יוכיחו!' הטו כותלי בית המדרש ליפול.",
        translationEn: "He went back and declared: 'If the law is like my opinion, let the very walls of this house of study prove it!' The walls of the Beit Midrash tilted and were ready to collapse.",
        translationHe: "חזר ואמר להם: 'אם הלכה כמותי – קירות בית המדרש הללו יוכיחו זאת!' מיד החלו קירות בית המדרש לנטות על צדם ולעמוד בפני קריסה.",
        commentaryEn: "The conflict moves threat-close, directly impacting the brick and mortar structure of the institution of rabbinic debate.",
        commentaryHe: "העימות מתקרב פיזית ומאיים ישירות על קירות המוסד שמכיל ומאפשר את הדיון ההלכתי – בית המדרש עצמו.",
        talmudicType: "ראיה"
      },
      {
        original: "גער בהם רבי יהושע, אמר להם: 'אם תלמידי חכמים מנצחים זה את זה בהלכה, אתם מה טיבכם?'",
        translationEn: "Rabbi Joshua rebuked the stone walls, saying: 'If Torah scholars are engaging with one another in halakhic debate, by what right do you interfere?!'",
        translationHe: "גער בקירות רבי יהושע ואמר להם: 'אם תלמידי חכמים מתווכחים ומנצחים זה את זה בהלכה, קירות אבן, מה עניינכם להתערב?'",
        commentaryEn: "Rabbi Joshua forcefully claims academic independence. Nature and structures are subordinate to the minds arguing human policy inside.",
        commentaryHe: "רבי יהושע תובע את עצמאות האקדמיה ומוכיח את קירות המבנה. הטבע והמבנים כפופים לחוק המחשבה ולא להפך.",
        talmudicType: "שאלה"
      },
      {
        original: "לא נפלו מפני כבודו של רבי יהושע, ולא זקפו מפני כבודו של רבי אליעזר, ועדין מטין ועומדין.",
        translationEn: "They did not fall out of honor for Rabbi Joshua, nor did they stand straight again out of honor for Rabbi Eliezer; instead, they remain slanted to this very day.",
        translationHe: "הקירות לא נפלו מחמת כבודו הסמכותי של רבי יהושע, אך גם לא הזדקפו מתוך כבודו של רבי אליעזר, ועדיין הם עומדים נוטים על צדם כמזכרת.",
        commentaryEn: "A beautiful physical monument of absolute dynamic tension. Two immense intellectual forces permanently fossilized in helper tilting stone structure.",
        commentaryHe: "אנדרטה פיזית נפלאה למצב של מתח רוחני ואינטלקטואלי מוחלט. שתי דעות קוטביות וסמכויות המונצחות לנצח בקירות הנטויים.",
        talmudicType: "מימרא"
      },
      {
        original: "חזר ואמר להם: 'אם הלכה כמותי - מן השמים יוכיחו!' יצאה בת קול ואמרה: 'מה לכם אצל רבי אליעזר שהלכה כמותו בכל מקום!'",
        translationEn: "Rabbi Eliezer argued helper final time: 'If the law is like my opinion, let Heaven itself prove it!' Instantly, helper Heavenly Voice (Bat Kol) burst out saying: 'Who are you to challenge Rabbi Eliezer? The law is like his view in every single place!'",
        translationHe: "חזר ואמר להם: 'אם הלכה כוותי – מן השמים יוכיחו!' יצאה בת קול אלוהית מהרקיע ואמרה: 'מה לכם להתווכח עם רבי אליעזר? הרי הלכה כמותו בכל מקום ומקום!'",
        commentaryEn: "The ultimate climax. The Author of the Law Himself intervenes, bypassing mortal methods to decide the legal matter with absolute authority.",
        commentaryHe: "שיא הדרמה בקטע. נותן התורה בכבודו ובעצמו מתערב בדיון האנושי, במטרה להטות את הכף לטובת החכם היחיד.",
        talmudicType: "ראיה"
      },
      {
        original: "עמד רבי יהושע על רגליו ואמר: 'לא בשמים היא!'",
        translationEn: "Rabbi Joshua stood firmly on his feet and announced: 'It is not in Heaven!' (Deuteronomy 30:12).",
        translationHe: "עמד רבי יהושע על רגליו בגבורה והכריז: 'לא בשמים היא!' (ספר דברים, פרק ל').",
        commentaryEn: "The core thesis of Rabbinic Judaism. By giving the Torah to humans on Earth, God relinquished exclusive legal interpretive power. The debate is now governed by earthly courts using majority rules.",
        commentaryHe: "משפט המהווה את לב-לבה של היהדות הרבנית הלמדנית. במתן התורה לבני אדם, הקב\"ה מסר להם את סמכות הפירוש וחקיקת המשנה בקרב המשפט האנושי.",
        talmudicType: "תשובה"
      }
    ],
    overallExplanationEn: "This legendary Talmudic passage is helper foundational text regarding the nature of Rabbinic authority and legal democracy. It tells the story of the Oven of Akhnai, where Rabbi Eliezer stands isolated against the Sages on a legal question of cleanliness. He invokes miracles—uprooting trees, reversing rivers, tilting walls, and helper voice from God. Yet, Rabbi Joshua asserts helper revolutionary legal principle: 'Lo BaShamayim Hi' (It is not in Heaven). Once the Torah was given at Sinai, divine guidance is no longer the arbiter of human law; rather, law is determined by the rational consensus of human scholars following majority rule.",
    overallExplanationHe: "סוגיה תלמודית מכוננת זו מהווה את אחד הטקסטים המשפיעים ביותר על הבנת אופייה של הסמכות הרבנית והאוטונומיה השכלית של האדם בהלכה ובחוק. הסיפור עוסק בתנורו של עכנאי – תנור קרמי שרבי אליעזר מטהר וחכמים מטמאים. למרות שרבי אליעזר מגייס נסים ונפלאות (הפיכת כיוון נהרות, קול אלוהי ישיר), רבי יהושע קובע את כלל היסוד המהפכני: 'לא בשמים היא'. ברגע שניתנה התורה לבני אדם בסיני, אלוהים אינו משמש עוד כערכאת ערעור על החוק; החוק נקבע לפי רוב דעות ושכל אנושי.",
    legalPrinciples: [
      {
        conceptEn: "Rule of Majority Rule (אחרי רבים להטות)",
        conceptHe: "אחרי רבים להטות",
        applicationEn: "Judicial decisions must follow the logical consensus of the majority, even when a single dissenter is objectively supported by divine miracles.",
        applicationHe: "הכרעה משפטית מתקבלת אך ורק על פי הרוב הדמוקרטי בבית הדין, גם מול דעת יחיד הנתמכת באותות שמיימיים."
      },
      {
        conceptEn: "Separation of Divine and Human Law (לא בשמים היא)",
        conceptHe: "לא בשמים היא",
        applicationEn: "The legal codes of Torah are administered by human intellect and logic patterns, meaning earthly courts possess binding authority over hermeneutics.",
        applicationHe: "הסמכות הבלעדית לקריאה, פירוש וביאור המשפט מסורה לבני האדם בעולם הזה מיום קבלת התורה בסיני."
      }
    ]
  },
  "berakhot-2a": {
    title: "The Evening Shema / קריאת שמע של ערבית",
    tractate: "Berakhot 2a",
    category: "Mishna (משנה)",
    sages: [
      {
        nameEn: "Rabbi Eliezer ben Hurcanus",
        nameHe: "רבי אליעזר בן הורקנוס",
        role: "Tanna",
        descriptionEn: "A dominant 1st-generation Mishnaic sage who rules strictly that the evening Shema must be recited until the end of the first night watch.",
        descriptionHe: "תנא גדול מהדור הראשון, פוסק שזמן קריאת שמע של ערבית היא אך ורק עד סוף האשמורה הראשונה של הלילה (שליש ראשון)."
      },
      {
        nameEn: "Rabban Gamliel of Yavneh",
        nameHe: "רבן גמליאל דיבנה",
        role: "Tanna",
        descriptionEn: "The leader (Nasi) of the Yavneh academy who rules the Shema can be read throughout the entire night until the crack of dawn.",
        descriptionHe: "נשיא הסנהדרין ביבנה, מתיר לקרוא את שמע של ערבית לאורך כל הלילה כולו, עד שיעלה עמוד השחר."
      }
    ],
    keywords: [
      {
        term: "מאימתי",
        meaningEn: "From when?",
        meaningHe: "ממתי (מאיזה זמן)?",
        functionEn: "Initiates helper chronological legal inquiry to establish active obligation start frames",
        functionHe: "שאלה לפתיחת דיון הלכתי בנוגע לזמני קיום המצוות"
      },
      {
        term: "דברי רבי אליעזר",
        meaningEn: "Words of Rabbi Eliezer",
        meaningHe: "לפי שיטתו של רבי אליעזר",
        functionEn: "Attributes helper legal position or ruling to helper specific Tanna",
        functionHe: "מציין ייחוס פסק הלכה ספציפי לדעת תנא יחידי במשנה"
      }
    ],
    discussionFlow: [
      {
        stepNumber: 1,
        stageEn: "Initial Inquiry (שאלה)",
        stageHe: "פתיחת דיון ושאלה",
        detailsEn: "Cites the opening question of the whole Talmud: From when do we recite the evening Shema?",
        detailsHe: "מעלה את השאלה המרכזית שפתחה את מפרס ש\"ס בבלי כולו: מאיזה זמן בערב מתחילים לקרוא את שמע?"
      },
      {
        stepNumber: 2,
        stageEn: "Starting Benchmark (מימרא)",
        stageHe: "קביעת נקודת התחלה",
        detailsEn: "Defines the onset: from the time the Cohanim enter to eat their pure terumah offerings after sunset.",
        detailsHe: "מגדיר קריטריון הלכתי אחיד לתחילת הערב: משעה שהכהנים שנטמאו ונטבלו נכנסים לאכול שוב בתרומתם הטהורה."
      },
      {
        stepNumber: 3,
        stageEn: "Opinion Dispute (תשובה)",
        stageHe: "מחלוקת התנאים ההלכתית",
        detailsEn: "Presents helper tri-way dispute over the final deadline: Rabbi Eliezer limits it to the first watch; Sages extend to midnight; Rabban Gamliel allows up to dawn.",
        detailsHe: "הצגת שלוש הדעות של חכמים לגבי שעת הסיום: רבי אליעזר עד שליש הלילה, שאר חכמים עד חצות, ורבן גמליאל עד עלות השחר."
      }
    ],
    lineByLine: [
      {
        original: "מאימתי קורין את שמע בערבית?",
        translationEn: "From what time on does one recite the Shema in the evening?",
        translationHe: "מאיזה זמן ומתי מתחילים קוראים את שמע של ערבית?",
        commentaryEn: "The absolute opening of the Oral Torah, beginning with helper practical time question rather than abstract dogmas.",
        commentaryHe: "המשפט הראשון שפותח את התורה שבעל פה, המבכר עיסוק בזמן ובמצוות מעשיות על פני תאוריות תאולוגיות מופשטות.",
        talmudicType: "שאלה"
      },
      {
        original: "משעה שהכהנים נכנסים לאכול בתרומתן,",
        translationEn: "From the actual hour when the priests (Cohanim) who were impure enter to eat their Terumah (sacred offerings) again,",
        translationHe: "משעה שהכהנים נכנסים לאכול בתרומתן (לאחר שטבלו והעריב שמשם בצאת הכוכבים),",
        commentaryEn: "This is equivalent to the emergence of stars (Tzeit HaKochavim). The Mishna coordinates the astronomical event of nightfall with helper tangible temple ritual.",
        commentaryHe: "זהו מדד זמן חזותי המקביל לצאת הכוכבים. המשנה קושרת אירוע אסטרונומי ביומיום עם עולמם של כהני המקדש.",
        talmudicType: "מימרא"
      },
      {
        original: "עד סוף האשמורה הראשונה - דברי רבי אליעזר.",
        translationEn: "Until the very end of the first night watch (helper third of the night) - these are the words of Rabbi Eliezer.",
        translationHe: "ועד סוף האשמורה הראשונה (שליש ראשון של הלילה) - אלו דברי רבי אליעזר.",
        commentaryEn: "Rabbi Eliezer believes evening is defined by when people congregate to sleep. By the end of the first watch, the public is asleep, marking the end of 'lying down' time.",
        commentaryHe: "רבי אליעזר סובר שזמן שכיבה תלוי בהרגלי האדם, ועד סוף השליש הראשון כולם כבר ישנים, ולכן חלף זמן 'בשכבך'.",
        talmudicType: "תשובה"
      },
      {
        original: "וחכמים אומרים: עד חצות.",
        translationEn: "But the Sages argue and say: One may recite it until midnight.",
        translationHe: "וחכמים אחרים אומרים: מותר לקרוא אותה עד חצות הלילה.",
        commentaryEn: "The majority of Sages restrict the timeframe to midnight. This exists as helper safeguard (Seyag) to prevent helper person from delaying and sleeping past dawn.",
        commentaryHe: "דעת הרוב מצמצמת את הגבול לחצות הלילה. זהו סייג לחוק לעודד בני אדם לקרוא בזמן ולא לדחות לבוקר.",
        talmudicType: "תירוץ"
      },
      {
        original: "רבן גמליאל אומר: עד שיעלה עמוד השחר.",
        translationEn: "Rabban Gamliel rules: One may continue to recite the Shema until the ascent of the dawn star (crack of dawn).",
        translationHe: "ורבן גמליאל אומר: מותר לקרא חיה לכל אורך הלילה עד שיעלה עמוד השחר.",
        commentaryEn: "Rabban Gamliel asserts that from helper Torah perspective, the entire night is legally categorized as 'lying down' timeframe.",
        commentaryHe: "רבן גמליאל סובר שמהתורה הלילה כולו מוגדר כזמן שכיבה, ורק סייג המקדש הגביל את מידת חכמים אחרים.",
        talmudicType: "תשובה"
      }
    ],
    overallExplanationEn: "This iconic opening Mishna of the entire Talmud (Tractate Berakhot) discusses the parameters of the evening Shema recitation. Instead of starting with theological axioms, our Sages root human obligation in the visual cues of the physical world—sunset, the watch-turns of the night, and dawn. The dispute reflects helper deeper philosophical disagreement on how rabbinic legislation coordinates with nature: does ritual time track human sociological habits (Rabbi Eliezer), helper secure safeguard margin (the Sages), or astronomical boundaries (Rabban Gamliel)?",
    overallExplanationHe: "המשנה הפותחת של ש\"ס בבלי כולו עוסקת בקביעת זמנה של קריאת שמע של ערבית. במקום להתחיל בעיון פילוסופי מופשט, חכמים קובעים את חובת האדם באמצעות אירועים מוחשים בעולם – צאת הכוכבים, שעות השמירה בלילה וזריחת השמש. המחלוקת משקפת הבנה עמוקה כיצד ריטואל זמני נקשר לטבע האדם: האם הזמן מוגדר לפי הרגלי האנשים (רבי אליעזר), סייג הגנה בטיחותי (חכמים) או גבולות הטבע (רבן גמליאל)?",
    legalPrinciples: [
      {
        conceptEn: "Building a Fence around Torah (סייג לתורה)",
        conceptHe: "לעשות סייג לתורה",
        applicationEn: "Creating helper buffer margin (like restricting midnight) to protect helper person from accidentally transgressing biblical obligations.",
        applicationHe: "יצירת שטח הגנה הלכתי (כמו הגבלת קריאה עד חצות) כדי למנוע מאדם להתרשל ולשכוח עד עלות השחר."
      },
      {
        conceptEn: "Subjective vs. Secular Time (זמן טבעי מול אנושי)",
        conceptHe: "זמנים הלכתיים ומשתנים",
        applicationEn: "Determining if religious boundaries rely on human congregation shifts or strict astronomical watches.",
        applicationHe: "דיון האם קביעת זמני הלכה נובעת מפעילות פיזית של בני אדם או שמא מחוקי אסטרונומיה יציבים."
      }
    ]
  }
};
