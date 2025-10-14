"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../lib/firebase");
var waecBiology1993Questions = [
    {
        "id": "q1",
        "text": "The organ which is sensitive to light in Euglena is the",
        "year": 1993,
        "correctOptionId": "optC",
        "options": [
            { "id": "optA", "text": "gullet" },
            { "id": "optB", "text": "chloroplast" },
            { "id": "optC", "text": "eye spot" },
            { "id": "optD", "text": "contractile vacuole" },
            { "id": "optE", "text": "flagellum" }
        ],
        "imageUrl": null
    },
    {
        "id": "q55",
        "text": "Which of the following does not illustrate adaptation to the environment?",
        "year": 1993,
        "correctOptionId": "optD",
        "options": [
            { "id": "optA", "text": "Colour changes by chameleon" },
            { "id": "optB", "text": "Streamline shape of fishes" },
            { "id": "optC", "text": "Light bones in birds" },
            { "id": "optD", "text": "Development of big muscles by a weight lifter" },
            { "id": "optE", "text": "Possession of fins by fishes" }
        ],
        "imageUrl": null
    },
    {
        "id": "q56",
        "text": "The changing of colour by a chameleon to that of the environment is an example of",
        "year": 1993,
        "correctOptionId": "optB",
        "options": [
            { "id": "optA", "text": "adaptive radiation" },
            { "id": "optB", "text": "protective coloration" },
            { "id": "optC", "text": "courtship display" },
            { "id": "optD", "text": "display of body colour" },
            { "id": "optE", "text": "territorial behaviour" }
        ],
        "imageUrl": null
    },
    {
        "id": "q57",
        "text": "The division of labour in social insects is an example of",
        "year": 1993,
        "correctOptionId": "optD",
        "options": [
            { "id": "optA", "text": "structural adaptation" },
            { "id": "optB", "text": "physiological adaptation" },
            { "id": "optC", "text": "commensalism" },
            { "id": "optD", "text": "behavioural adaptation" },
            { "id": "optE", "text": "hormonal influence" }
        ],
        "imageUrl": null
    },
    {
        "id": "q58",
        "text": "The swarming especially at the beginning of the rainy season is a courtship behaviour shown by",
        "year": 1993,
        "correctOptionId": "optD",
        "options": [
            { "id": "optA", "text": "migratory birds" },
            { "id": "optB", "text": "pigeons" },
            { "id": "optC", "text": "crickets" },
            { "id": "optD", "text": "winged termites" },
            { "id": "optE", "text": "bees" }
        ],
        "imageUrl": null
    },
    {
        "id": "q59",
        "text": "Lamarck's evolution theory could be summarised by the statement that",
        "year": 1993,
        "correctOptionId": "optD",
        "options": [
            { "id": "optA", "text": "only the fittest can survive in a challenging environment" },
            { "id": "optB", "text": "species that are unable to adapt become extinct" },
            { "id": "optC", "text": "new characteristics do not arise in organisms in time of need" },
            { "id": "optD", "text": "the changing environment imposes structural, physiological and behavioural changes in organisms" },
            { "id": "optE", "text": "in a changing and unstable environment nature rejects the weak" }
        ],
        "imageUrl": null
    },
    {
        "id": "q60",
        "text": "The property of clay soil that prevents it from supporting thick vegetation is its",
        "year": 1993,
        "correctOptionId": "optC",
        "options": [
            { "id": "optA", "text": "possession of chemically weathered granite rocks" },
            { "id": "optB", "text": "high water retention ability" },
            { "id": "optC", "text": "poor aeration" },
            { "id": "optD", "text": "high proportion of silt" },
            { "id": "optE", "text": "low proportion of clay" }
        ],
        "imageUrl": null
    }
], _a = void 0,  = _a["id"],  = _a["q2"],  = _a["text"],  = _a["Which of the following is a similarity between a typical animal cell and a typical plant cell? Presence of"],  = _a["year"],  = _a[1993],  = _a["correctOptionId"],  = _a["optD"], _b = _a["options"], _c = _b[0],  = _c["id"],  = _c["optA"],  = _c["text"],  = _c["cellulose cell wall"], _d = _b[1],  = _d["id"],  = _d["optB"],  = _d["text"],  = _d["chlorophyll"], _e = _b[2],  = _e["id"],  = _e["optC"],  = _e["text"],  = _e["centrally-placed nucleus"], _f = _b[3],  = _f["id"],  = _f["optD"],  = _f["text"],  = _f["cell membrane"], _g = _b[4],  = _g["id"],  = _g["optE"],  = _g["text"],  = _g["large vacuole"],  = _a["imageUrl"],  = _a.null, _h = void 0,  = _h["id"],  = _h["q3"],  = _h["text"],  = _h["The first scientist to describe the cell was"],  = _h["year"],  = _h[1993],  = _h["correctOptionId"],  = _h["optC"], _j = _h["options"], _k = _j[0],  = _k["id"],  = _k["optA"],  = _k["text"],  = _k["Theodor Schwann"], _l = _j[1],  = _l["id"],  = _l["optB"],  = _l["text"],  = _l["Felix Dujardin"], _m = _j[2],  = _m["id"],  = _m["optC"],  = _m["text"],  = _m["Robert Hooke"], _o = _j[3],  = _o["id"],  = _o["optD"],  = _o["text"],  = _o["Charles Darwin"], _p = _j[4],  = _p["id"],  = _p["optE"],  = _p["text"],  = _p["Matthias Schleiden"],  = _h["imageUrl"],  = _h.null, _q = void 0,  = _q["id"],  = _q["q4"],  = _q["text"],  = _q["In which of the following parts of a cell is the chromosome found?"],  = _q["year"],  = _q[1993],  = _q["correctOptionId"],  = _q["optA"], _r = _q["options"], _s = _r[0],  = _s["id"],  = _s["optA"],  = _s["text"],  = _s["Nucleus"], _t = _r[1],  = _t["id"],  = _t["optB"],  = _t["text"],  = _t["Golgi body"], _u = _r[2],  = _u["id"],  = _u["optC"],  = _u["text"],  = _u["Cytoplasm"], _v = _r[3],  = _v["id"],  = _v["optD"],  = _v["text"],  = _v["Cell membrane"], _w = _r[4],  = _w["id"],  = _w["optE"],  = _w["text"],  = _w["Cell wall"],  = _q["imageUrl"],  = _q.null, _x = void 0,  = _x["id"],  = _x["q5"],  = _x["text"],  = _x["The part labelled VII is the"],  = _x["year"],  = _x[1993],  = _x["correctOptionId"],  = _x["optD"], _y = _x["options"], _z = _y[0],  = _z["id"],  = _z["optA"],  = _z["text"],  = _z["pleural cavity"], _0 = _y[1],  = _0["id"],  = _0["optB"],  = _0["text"],  = _0["lung"], _1 = _y[2],  = _1["id"],  = _1["optC"],  = _1["text"],  = _1["rib"], _2 = _y[3],  = _2["id"],  = _2["optD"],  = _2["text"],  = _2["diaphragm"], _3 = _y[4],  = _3["id"],  = _3["optE"],  = _3["text"],  = _3["intercostal muscle"],  = _x["imageUrl"],  = _x["respiratory_diagram.jpg"], _4 = void 0,  = _4["id"],  = _4["q6"],  = _4["text"],  = _4["The part labelled I is the"],  = _4["year"],  = _4[1993],  = _4["correctOptionId"],  = _4["optD"], _5 = _4["options"], _6 = _5[0],  = _6["id"],  = _6["optA"],  = _6["text"],  = _6["epiglottis"], _7 = _5[1],  = _7["id"],  = _7["optB"],  = _7["text"],  = _7["larynx"], _8 = _5[2],  = _8["id"],  = _8["optC"],  = _8["text"],  = _8["oesophagus"], _9 = _5[3],  = _9["id"],  = _9["optD"],  = _9["text"],  = _9["trachea"], _10 = _5[4],  = _10["id"],  = _10["optE"],  = _10["text"],  = _10["bronchus"],  = _4["imageUrl"],  = _4["respiratory_diagram.jpg"], _11 = void 0,  = _11["id"],  = _11["q7"],  = _11["text"],  = _11["Exchange of gases takes place in the air sacs contained in the part labelled"],  = _11["year"],  = _11[1993],  = _11["correctOptionId"],  = _11["optE"], _12 = _11["options"], _13 = _12[0],  = _13["id"],  = _13["optA"],  = _13["text"],  = _13["I"], _14 = _12[1],  = _14["id"],  = _14["optB"],  = _14["text"],  = _14["II"], _15 = _12[2],  = _15["id"],  = _15["optC"],  = _15["text"],  = _15["IV"], _16 = _12[3],  = _16["id"],  = _16["optD"],  = _16["text"],  = _16["V"], _17 = _12[4],  = _17["id"],  = _17["optE"],  = _17["text"],  = _17["VI"],  = _11["imageUrl"],  = _11["respiratory_diagram.jpg"], _18 = void 0,  = _18["id"],  = _18["q8"],  = _18["text"],  = _18["During the process of breathing, volume and pressure changes occur as a result of the movement of the parts labelled"],  = _18["year"],  = _18[1993],  = _18["correctOptionId"],  = _18["optC"], _19 = _18["options"], _20 = _19[0],  = _20["id"],  = _20["optA"],  = _20["text"],  = _20["I and II"], _21 = _19[1],  = _21["id"],  = _21["optB"],  = _21["text"],  = _21["II and IV"], _22 = _19[2],  = _22["id"],  = _22["optC"],  = _22["text"],  = _22["III and VII"], _23 = _19[3],  = _23["id"],  = _23["optD"],  = _23["text"],  = _23["IV and V"], _24 = _19[4],  = _24["id"],  = _24["optE"],  = _24["text"],  = _24["VI and VII"],  = _18["imageUrl"],  = _18["respiratory_diagram.jpg"], _25 = void 0,  = _25["id"],  = _25["q9"],  = _25["text"],  = _25["Which of the following diseases is caused by deficiency of insulin in the body?"],  = _25["year"],  = _25[1993],  = _25["correctOptionId"],  = _25["optB"], _26 = _25["options"], _27 = _26[0],  = _27["id"],  = _27["optA"],  = _27["text"],  = _27["Malaria"], _28 = _26[1],  = _28["id"],  = _28["optB"],  = _28["text"],  = _28["Diabetes mellitus"], _29 = _26[2],  = _29["id"],  = _29["optC"],  = _29["text"],  = _29["Hepatitis"], _30 = _26[3],  = _30["id"],  = _30["optD"],  = _30["text"],  = _30["Gonorrhoea"], _31 = _26[4],  = _31["id"],  = _31["optE"],  = _31["text"],  = _31["Cholera"],  = _25["imageUrl"],  = _25.null, _32 = void 0,  = _32["id"],  = _32["q10"],  = _32["text"],  = _32["Which of the following is the medium of transportation of nutrients within unicellular organisms?"],  = _32["year"],  = _32[1993],  = _32["correctOptionId"],  = _32["optC"], _33 = _32["options"], _34 = _33[0],  = _34["id"],  = _34["optA"],  = _34["text"],  = _34["Blood"], _35 = _33[1],  = _35["id"],  = _35["optB"],  = _35["text"],  = _35["Serum"], _36 = _33[2],  = _36["id"],  = _36["optC"],  = _36["text"],  = _36["Protoplasm"], _37 = _33[3],  = _37["id"],  = _37["optD"],  = _37["text"],  = _37["Plasma"], _38 = _33[4],  = _38["id"],  = _38["optE"],  = _38["text"],  = _38["Lymph"],  = _32["imageUrl"],  = _32.null, _39 = void 0,  = _39["id"],  = _39["q11"],  = _39["text"],  = _39["Which of the following blood vessels carries oxygenated blood into the heart?"],  = _39["year"],  = _39[1993],  = _39["correctOptionId"],  = _39["optA"], _40 = _39["options"], _41 = _40[0],  = _41["id"],  = _41["optA"],  = _41["text"],  = _41["Pulmonary vein"], _42 = _40[1],  = _42["id"],  = _42["optB"],  = _42["text"],  = _42["Anterior vena cava"], _43 = _40[2],  = _43["id"],  = _43["optC"],  = _43["text"],  = _43["Pulmonary artery"], _44 = _40[3],  = _44["id"],  = _44["optD"],  = _44["text"],  = _44["Aorta"], _45 = _40[4],  = _45["id"],  = _45["optE"],  = _45["text"],  = _45["Posterior vena cava"],  = _39["imageUrl"],  = _39.null, _46 = void 0,  = _46["id"],  = _46["q12"],  = _46["text"],  = _46["The conditions that ensure successful exchange of gases in multicellular organisms include the following except"],  = _46["year"],  = _46[1993],  = _46["correctOptionId"],  = _46["optE"], _47 = _46["options"], _48 = _47[0],  = _48["id"],  = _48["optA"],  = _48["text"],  = _48["concentration gradient across the respiratory surface"], _49 = _47[1],  = _49["id"],  = _49["optB"],  = _49["text"],  = _49["presence of thin membrane as the respiratory surface"], _50 = _47[2],  = _50["id"],  = _50["optC"],  = _50["text"],  = _50["fast transportation of absorbed gases"], _51 = _47[3],  = _51["id"],  = _51["optD"],  = _51["text"],  = _51["presence of large surface area of the respiratory organ"], _52 = _47[4],  = _52["id"],  = _52["optE"],  = _52["text"],  = _52["presence of small, dry surface area of the respiratory organ"],  = _46["imageUrl"],  = _46.null, _53 = void 0,  = _53["id"],  = _53["q13"],  = _53["text"],  = _53["The respiratory organ found in the cockroach is the"],  = _53["year"],  = _53[1993],  = _53["correctOptionId"],  = _53["optB"], _54 = _53["options"], _55 = _54[0],  = _55["id"],  = _55["optA"],  = _55["text"],  = _55["air sac"], _56 = _54[1],  = _56["id"],  = _56["optB"],  = _56["text"],  = _56["trachea"], _57 = _54[2],  = _57["id"],  = _57["optC"],  = _57["text"],  = _57["lung book"], _58 = _54[3],  = _58["id"],  = _58["optD"],  = _58["text"],  = _58["lung"], _59 = _54[4],  = _59["id"],  = _59["optE"],  = _59["text"],  = _59["gill"],  = _53["imageUrl"],  = _53.null, _60 = void 0,  = _60["id"],  = _60["q14"],  = _60["text"],  = _60["Which of the following structures functions as an excretory system found in flat worms?"],  = _60["year"],  = _60[1993],  = _60["correctOptionId"],  = _60["optC"], _61 = _60["options"], _62 = _61[0],  = _62["id"],  = _62["optA"],  = _62["text"],  = _62["Contractile vacuole"], _63 = _61[1],  = _63["id"],  = _63["optB"],  = _63["text"],  = _63["Nephridium"], _64 = _61[2],  = _64["id"],  = _64["optC"],  = _64["text"],  = _64["Flame cell"], _65 = _61[3],  = _65["id"],  = _65["optD"],  = _65["text"],  = _65["Malpighian tubule"], _66 = _61[4],  = _66["id"],  = _66["optE"],  = _66["text"],  = _66["Kidney"],  = _60["imageUrl"],  = _60.null, _67 = void 0,  = _67["id"],  = _67["q15"],  = _67["text"],  = _67["Which of the following organs is associated with deamination of proteins?"],  = _67["year"],  = _67[1993],  = _67["correctOptionId"],  = _67["optD"], _68 = _67["options"], _69 = _68[0],  = _69["id"],  = _69["optA"],  = _69["text"],  = _69["Lung"], _70 = _68[1],  = _70["id"],  = _70["optB"],  = _70["text"],  = _70["Stomach"], _71 = _68[2],  = _71["id"],  = _71["optC"],  = _71["text"],  = _71["Kidney"], _72 = _68[3],  = _72["id"],  = _72["optD"],  = _72["text"],  = _72["Liver"], _73 = _68[4],  = _73["id"],  = _73["optE"],  = _73["text"],  = _73["Heart"],  = _67["imageUrl"],  = _67.null, _74 = void 0,  = _74["id"],  = _74["q16"],  = _74["text"],  = _74["Ultrafiltration in the kidney takes place in the"],  = _74["year"],  = _74[1993],  = _74["correctOptionId"],  = _74["optC"], _75 = _74["options"], _76 = _75[0],  = _76["id"],  = _76["optA"],  = _76["text"],  = _76["loop of Henle"], _77 = _75[1],  = _77["id"],  = _77["optB"],  = _77["text"],  = _77["renal vein"], _78 = _75[2],  = _78["id"],  = _78["optC"],  = _78["text"],  = _78["Bowman's capsule"], _79 = _75[3],  = _79["id"],  = _79["optD"],  = _79["text"],  = _79["pelvis"], _80 = _75[4],  = _80["id"],  = _80["optE"],  = _80["text"],  = _80["pyramid"],  = _74["imageUrl"],  = _74.null, _81 = void 0,  = _81["id"],  = _81["q17"],  = _81["text"],  = _81["When an axon is at rest, the concentration of ions on either side of the membrane are different. Which of the following is correct about the concentrations of ions on either side of the membrane?"],  = _81["year"],  = _81[1993],  = _81["correctOptionId"],  = _81["optA"], _82 = _81["options"], _83 = _82[0],  = _83["id"],  = _83["optA"],  = _83["text"],  = _83["There is an excess of potassium ions inside the axon and an excess of sodium ions outside"], _84 = _82[1],  = _84["id"],  = _84["optB"],  = _84["text"],  = _84["The inside of the axon becomes positively charged while the outside is negatively charged"], _85 = _82[2],  = _85["id"],  = _85["optC"],  = _85["text"],  = _85["There is an excess of sodium ions on the inner side of the axon"], _86 = _82[3],  = _86["id"],  = _86["optD"],  = _86["text"],  = _86["Chloride and potassium ions begin to move across the membrane"], _87 = _82[4],  = _87["id"],  = _87["optE"],  = _87["text"],  = _87["Calcium ions accumulate on the inner side of the axon"],  = _81["imageUrl"],  = _81.null, _88 = void 0,  = _88["id"],  = _88["q18"],  = _88["text"],  = _88["The groups of sensory cells found on the upper surface of the tongue are called"],  = _88["year"],  = _88[1993],  = _88["correctOptionId"],  = _88["optB"], _89 = _88["options"], _90 = _89[0],  = _90["id"],  = _90["optA"],  = _90["text"],  = _90["ampullae"], _91 = _89[1],  = _91["id"],  = _91["optB"],  = _91["text"],  = _91["taste buds"], _92 = _89[2],  = _92["id"],  = _92["optC"],  = _92["text"],  = _92["nerve cells"], _93 = _89[3],  = _93["id"],  = _93["optD"],  = _93["text"],  = _93["somatic cells"], _94 = _89[4],  = _94["id"],  = _94["optE"],  = _94["text"],  = _94["tactile cells"],  = _88["imageUrl"],  = _88.null, _95 = void 0,  = _95["id"],  = _95["q19"],  = _95["text"],  = _95["What type of eye defect is illustrated in the diagram above?"],  = _95["year"],  = _95[1993],  = _95["correctOptionId"],  = _95["optB"], _96 = _95["options"], _97 = _96[0],  = _97["id"],  = _97["optA"],  = _97["text"],  = _97["Hypermetropia"], _98 = _96[1],  = _98["id"],  = _98["optB"],  = _98["text"],  = _98["Myopia"], _99 = _96[2],  = _99["id"],  = _99["optC"],  = _99["text"],  = _99["Cataract"], _100 = _96[3],  = _100["id"],  = _100["optD"],  = _100["text"],  = _100["Astigmatism"], _101 = _96[4],  = _101["id"],  = _101["optE"],  = _101["text"],  = _101["Glaucoma"],  = _95["imageUrl"],  = _95["eye_defect_diagram.jpg"], _102 = void 0,  = _102["id"],  = _102["q20"],  = _102["text"],  = _102["This defect can be corrected by the use of"],  = _102["year"],  = _102[1993],  = _102["correctOptionId"],  = _102["optB"], _103 = _102["options"], _104 = _103[0],  = _104["id"],  = _104["optA"],  = _104["text"],  = _104["convex lens"], _105 = _103[1],  = _105["id"],  = _105["optB"],  = _105["text"],  = _105["concave lens"], _106 = _103[2],  = _106["id"],  = _106["optC"],  = _106["text"],  = _106["cylindrical lens"], _107 = _103[3],  = _107["id"],  = _107["optD"],  = _107["text"],  = _107["surgical operation"], _108 = _103[4],  = _108["id"],  = _108["optE"],  = _108["text"],  = _108["biconcave lens"],  = _102["imageUrl"],  = _102["eye_defect_diagram.jpg"], _109 = void 0,  = _109["id"],  = _109["q21"],  = _109["text"],  = _109["Which of the following is not a courtship behaviour exhibited by animals?"],  = _109["year"],  = _109[1993],  = _109["correctOptionId"],  = _109["optD"], _110 = _109["options"], _111 = _110[0],  = _111["id"],  = _111["optA"],  = _111["text"],  = _111["Pairing"], _112 = _110[1],  = _112["id"],  = _112["optB"],  = _112["text"],  = _112["Display"], _113 = _110[2],  = _113["id"],  = _113["optC"],  = _113["text"],  = _113["Seasonal migration"], _114 = _110[3],  = _114["id"],  = _114["optD"],  = _114["text"],  = _114["Hibernation"], _115 = _110[4],  = _115["id"],  = _115["optE"],  = _115["text"],  = _115["Territorialism"],  = _109["imageUrl"],  = _109.null, _116 = void 0,  = _116["id"],  = _116["q22"],  = _116["text"],  = _116["Which of the following mineral salts is a trace element?"],  = _116["year"],  = _116[1993],  = _116["correctOptionId"],  = _116["optA"], _117 = _116["options"], _118 = _117[0],  = _118["id"],  = _118["optA"],  = _118["text"],  = _118["Zinc"], _119 = _117[1],  = _119["id"],  = _119["optB"],  = _119["text"],  = _119["Carbon"], _120 = _117[2],  = _120["id"],  = _120["optC"],  = _120["text"],  = _120["Hydrogen"], _121 = _117[3],  = _121["id"],  = _121["optD"],  = _121["text"],  = _121["Potassium"], _122 = _117[4],  = _122["id"],  = _122["optE"],  = _122["text"],  = _122["Calcium"],  = _116["imageUrl"],  = _116.null, _123 = void 0,  = _123["id"],  = _123["q23"],  = _123["text"],  = _123["Which of the following organisms reduces nitrates in the soil to gaseous nitrogen?"],  = _123["year"],  = _123[1993],  = _123["correctOptionId"],  = _123["optC"], _124 = _123["options"], _125 = _124[0],  = _125["id"],  = _125["optA"],  = _125["text"],  = _125["Euglena"], _126 = _124[1],  = _126["id"],  = _126["optB"],  = _126["text"],  = _126["Protozoon"], _127 = _124[2],  = _127["id"],  = _127["optC"],  = _127["text"],  = _127["Denitrifying bacterium"], _128 = _124[3],  = _128["id"],  = _128["optD"],  = _128["text"],  = _128["Parasitic mould"], _129 = _124[4],  = _129["id"],  = _129["optE"],  = _129["text"],  = _129["Nitrifying bacterium"],  = _123["imageUrl"],  = _123.null, _130 = void 0,  = _130["id"],  = _130["q24"],  = _130["text"],  = _130["The process whereby microorganisms can convert atmospheric nitrogen into nitrogenous compound is known as"],  = _130["year"],  = _130[1993],  = _130["correctOptionId"],  = _130["optB"], _131 = _130["options"], _132 = _131[0],  = _132["id"],  = _132["optA"],  = _132["text"],  = _132["nitrogen cycle"], _133 = _131[1],  = _133["id"],  = _133["optB"],  = _133["text"],  = _133["nitrogen fixation"], _134 = _131[2],  = _134["id"],  = _134["optC"],  = _134["text"],  = _134["denitrification"], _135 = _131[3],  = _135["id"],  = _135["optD"],  = _135["text"],  = _135["putrefaction"], _136 = _131[4],  = _136["id"],  = _136["optE"],  = _136["text"],  = _136["decomposition"],  = _130["imageUrl"],  = _130.null, _137 = void 0,  = _137["id"],  = _137["q25"],  = _137["text"],  = _137["What is the function of the part labelled II?"],  = _137["year"],  = _137[1993],  = _137["correctOptionId"],  = _137["optA"], _138 = _137["options"], _139 = _138[0],  = _139["id"],  = _139["optA"],  = _139["text"],  = _139["Attraction of insects"], _140 = _138[1],  = _140["id"],  = _140["optB"],  = _140["text"],  = _140["Secretion of nectar"], _141 = _138[2],  = _141["id"],  = _141["optC"],  = _141["text"],  = _141["Protection of the stigma"], _142 = _138[3],  = _142["id"],  = _142["optD"],  = _142["text"],  = _142["Formation of fruit wall"], _143 = _138[4],  = _143["id"],  = _143["optE"],  = _143["text"],  = _143["Attachment of flower to the shoot"],  = _137["imageUrl"],  = _137["flower_diagram.jpg"], _144 = void 0,  = _144["id"],  = _144["q26"],  = _144["text"],  = _144["The function of the part labelled I is to"],  = _144["year"],  = _144[1993],  = _144["correctOptionId"],  = _144["optA"], _145 = _144["options"], _146 = _145[0],  = _146["id"],  = _146["optA"],  = _146["text"],  = _146["receive pollen grains"], _147 = _145[1],  = _147["id"],  = _147["optB"],  = _147["text"],  = _147["produce nectar"], _148 = _145[2],  = _148["id"],  = _148["optC"],  = _148["text"],  = _148["store the pollen grains"], _149 = _145[3],  = _149["id"],  = _149["optD"],  = _149["text"],  = _149["store the ovules"], _150 = _145[4],  = _150["id"],  = _150["optE"],  = _150["text"],  = _150["produce the male gametes"],  = _144["imageUrl"],  = _144["flower_diagram.jpg"], _151 = void 0,  = _151["id"],  = _151["q27"],  = _151["text"],  = _151["How would you describe the position of the ovary in relation to the receptacle?"],  = _151["year"],  = _151[1993],  = _151["correctOptionId"],  = _151["optA"], _152 = _151["options"], _153 = _152[0],  = _153["id"],  = _153["optA"],  = _153["text"],  = _153["Superior"], _154 = _152[1],  = _154["id"],  = _154["optB"],  = _154["text"],  = _154["Inferior"], _155 = _152[2],  = _155["id"],  = _155["optC"],  = _155["text"],  = _155["Semi-inferior"], _156 = _152[3],  = _156["id"],  = _156["optD"],  = _156["text"],  = _156["Gamosepalous"], _157 = _152[4],  = _157["id"],  = _157["optE"],  = _157["text"],  = _157["Polysepalous"],  = _151["imageUrl"],  = _151["flower_diagram.jpg"], _158 = void 0,  = _158["id"],  = _158["q28"],  = _158["text"],  = _158["What type of relationship exists between a tapeworm and an infected mammal?"],  = _158["year"],  = _158[1993],  = _158["correctOptionId"],  = _158["optD"], _159 = _158["options"], _160 = _159[0],  = _160["id"],  = _160["optA"],  = _160["text"],  = _160["Symbiosis"], _161 = _159[1],  = _161["id"],  = _161["optB"],  = _161["text"],  = _161["Commensalism"], _162 = _159[2],  = _162["id"],  = _162["optC"],  = _162["text"],  = _162["Predation"], _163 = _159[3],  = _163["id"],  = _163["optD"],  = _163["text"],  = _163["Parasitism"], _164 = _159[4],  = _164["id"],  = _164["optE"],  = _164["text"],  = _164["Saprophytism"],  = _158["imageUrl"],  = _158.null, _165 = void 0,  = _165["id"],  = _165["q29"],  = _165["text"],  = _165["The parts labelled IV, V, and VI respectively are the"],  = _165["year"],  = _165[1993],  = _165["correctOptionId"],  = _165["optB"], _166 = _165["options"], _167 = _166[0],  = _167["id"],  = _167["optA"],  = _167["text"],  = _167["ciliary body, optic nerve and yellow spot"], _168 = _166[1],  = _168["id"],  = _168["optB"],  = _168["text"],  = _168["blind spot, optic nerve and suspensory ligament"], _169 = _166[2],  = _169["id"],  = _169["optC"],  = _169["text"],  = _169["vitreous humour, yellow spot and optic nerve"], _170 = _166[3],  = _170["id"],  = _170["optD"],  = _170["text"],  = _170["blind spot, optic nerve and pupil"], _171 = _166[4],  = _171["id"],  = _171["optE"],  = _171["text"],  = _171["yellow spot, retina and choroid layer"],  = _165["imageUrl"],  = _165["eye_diagram.jpg"], _172 = void 0,  = _172["id"],  = _172["q30"],  = _172["text"],  = _172["The light ray entering the eye goes through the following route"],  = _172["year"],  = _172[1993],  = _172["correctOptionId"],  = _172["optB"], _173 = _172["options"], _174 = _173[0],  = _174["id"],  = _174["optA"],  = _174["text"],  = _174["II \u2192 III \u2192 I \u2192 IV \u2192 V"], _175 = _173[1],  = _175["id"],  = _175["optB"],  = _175["text"],  = _175["II \u2192 I \u2192 VII \u2192 III \u2192 V"], _176 = _173[2],  = _176["id"],  = _176["optC"],  = _176["text"],  = _176["II \u2192 I \u2192 III \u2192 IV \u2192 V"], _177 = _173[3],  = _177["id"],  = _177["optD"],  = _177["text"],  = _177["V \u2192 IV \u2192 III \u2192 I \u2192 II"], _178 = _173[4],  = _178["id"],  = _178["optE"],  = _178["text"],  = _178["I \u2192 VII \u2192 III \u2192 IV \u2192 V"],  = _172["imageUrl"],  = _172["eye_diagram.jpg"], _179 = void 0,  = _179["id"],  = _179["q31"],  = _179["text"],  = _179["Which of the following structures are adjusted in focussing the image of a distant or near object on the retina?"],  = _179["year"],  = _179[1993],  = _179["correctOptionId"],  = _179["optC"], _180 = _179["options"], _181 = _180[0],  = _181["id"],  = _181["optA"],  = _181["text"],  = _181["I and II"], _182 = _180[1],  = _182["id"],  = _182["optB"],  = _182["text"],  = _182["II and III"], _183 = _180[2],  = _183["id"],  = _183["optC"],  = _183["text"],  = _183["III and VII"], _184 = _180[3],  = _184["id"],  = _184["optD"],  = _184["text"],  = _184["IV and V"], _185 = _180[4],  = _185["id"],  = _185["optE"],  = _185["text"],  = _185["V and VII"],  = _179["imageUrl"],  = _179["eye_diagram.jpg"], _186 = void 0,  = _186["id"],  = _186["q32"],  = _186["text"],  = _186["Which of the following best describes a marine habitat? A large body of water"],  = _186["year"],  = _186[1993],  = _186["correctOptionId"],  = _186["optB"], _187 = _186["options"], _188 = _187[0],  = _188["id"],  = _188["optA"],  = _188["text"],  = _188["which has no distinctive colour or taste"], _189 = _187[1],  = _189["id"],  = _189["optB"],  = _189["text"],  = _189["with high concentration of salt"], _190 = _187[2],  = _190["id"],  = _190["optC"],  = _190["text"],  = _190["with little suspended materials"], _191 = _187[3],  = _191["id"],  = _191["optD"],  = _191["text"],  = _191["with no water weeds"], _192 = _187[4],  = _192["id"],  = _192["optE"],  = _192["text"],  = _192["which sustains no animal life"],  = _186["imageUrl"],  = _186.null, _193 = void 0,  = _193["id"],  = _193["q33"],  = _193["text"],  = _193["The following are features of the tropical rain forest except"],  = _193["year"],  = _193[1993],  = _193["correctOptionId"],  = _193["optD"], _194 = _193["options"], _195 = _194[0],  = _195["id"],  = _195["optA"],  = _195["text"],  = _195["abundant water supply"], _196 = _194[1],  = _196["id"],  = _196["optB"],  = _196["text"],  = _196["loose and moist soil"], _197 = _194[2],  = _197["id"],  = _197["optC"],  = _197["text"],  = _197["short trees growing beneath tall trees"], _198 = _194[3],  = _198["id"],  = _198["optD"],  = _198["text"],  = _198["scanty trees with small leaves"], _199 = _194[4],  = _199["id"],  = _199["optE"],  = _199["text"],  = _199["presence of many animals"],  = _193["imageUrl"],  = _193.null, _200 = void 0,  = _200["id"],  = _200["q34"],  = _200["text"],  = _200["The following are features of Northern Guinea Savanna except"],  = _200["year"],  = _200[1993],  = _200["correctOptionId"],  = _200["optB"], _201 = _200["options"], _202 = _201[0],  = _202["id"],  = _202["optA"],  = _202["text"],  = _202["presence of tall trees with thick bark"], _203 = _201[1],  = _203["id"],  = _203["optB"],  = _203["text"],  = _203["bare soil with very few trees"], _204 = _201[2],  = _204["id"],  = _204["optC"],  = _204["text"],  = _204["presence of fire-resistant trees"], _205 = _201[3],  = _205["id"],  = _205["optD"],  = _205["text"],  = _205["abundant herbivores"], _206 = _201[4],  = _206["id"],  = _206["optE"],  = _206["text"],  = _206["predominance of woody trees"],  = _200["imageUrl"],  = _200.null, _207 = void 0,  = _207["id"],  = _207["q35"],  = _207["text"],  = _207["Which of the following explains the term pyramid of numbers?"],  = _207["year"],  = _207[1993],  = _207["correctOptionId"],  = _207["optE"], _208 = _207["options"], _209 = _208[0],  = _209["id"],  = _209["optA"],  = _209["text"],  = _209["The number of organisms in a trophic level"], _210 = _208[1],  = _210["id"],  = _210["optB"],  = _210["text"],  = _210["The relationship between plants in different trophic levels"], _211 = _208[2],  = _211["id"],  = _211["optC"],  = _211["text"],  = _211["The number of saprophytes and parasites in a habitat"], _212 = _208[3],  = _212["id"],  = _212["optD"],  = _212["text"],  = _212["The number of predators in a habitat"], _213 = _208[4],  = _213["id"],  = _213["optE"],  = _213["text"],  = _213["Progressive decrease in the number of individuals from lower to higher trophic level"],  = _207["imageUrl"],  = _207.null, _214 = void 0,  = _214["id"],  = _214["q36"],  = _214["text"],  = _214["In which of the following processes is carbon dioxide not given out?"],  = _214["year"],  = _214[1993],  = _214["correctOptionId"],  = _214["optE"], _215 = _214["options"], _216 = _215[0],  = _216["id"],  = _216["optA"],  = _216["text"],  = _216["Respiration in plants"], _217 = _215[1],  = _217["id"],  = _217["optB"],  = _217["text"],  = _217["Decay of organisms"], _218 = _215[2],  = _218["id"],  = _218["optC"],  = _218["text"],  = _218["Burning of organic matter"], _219 = _215[3],  = _219["id"],  = _219["optD"],  = _219["text"],  = _219["Burning of fuels"], _220 = _215[4],  = _220["id"],  = _220["optE"],  = _220["text"],  = _220["During photosynthesis"],  = _214["imageUrl"],  = _214.null, _221 = void 0,  = _221["id"],  = _221["q37"],  = _221["text"],  = _221["Sea water taken in by a living organism can be recycled into the atmosphere through all the following processes except"],  = _221["year"],  = _221[1993],  = _221["correctOptionId"],  = _221["optB"], _222 = _221["options"], _223 = _222[0],  = _223["id"],  = _223["optA"],  = _223["text"],  = _223["transpiration"], _224 = _222[1],  = _224["id"],  = _224["optB"],  = _224["text"],  = _224["digestion"], _225 = _222[2],  = _225["id"],  = _225["optC"],  = _225["text"],  = _225["excretion"], _226 = _222[3],  = _226["id"],  = _226["optD"],  = _226["text"],  = _226["respiration"], _227 = _222[4],  = _227["id"],  = _227["optE"],  = _227["text"],  = _227["decay"],  = _221["imageUrl"],  = _221.null, _228 = void 0,  = _228["id"],  = _228["q38"],  = _228["text"],  = _228["Which of the following water pollutants may contain organisms that cause dysentery?"],  = _228["year"],  = _228[1993],  = _228["correctOptionId"],  = _228["optB"], _229 = _228["options"], _230 = _229[0],  = _230["id"],  = _230["optA"],  = _230["text"],  = _230["Pesticides"], _231 = _229[1],  = _231["id"],  = _231["optB"],  = _231["text"],  = _231["Sewage"], _232 = _229[2],  = _232["id"],  = _232["optC"],  = _232["text"],  = _232["Industrial wastes"], _233 = _229[3],  = _233["id"],  = _233["optD"],  = _233["text"],  = _233["Fertilizers"], _234 = _229[4],  = _234["id"],  = _234["optE"],  = _234["text"],  = _234["Crude oil"],  = _228["imageUrl"],  = _228.null, _235 = void 0,  = _235["id"],  = _235["q39"],  = _235["text"],  = _235["Which of the following is not an adaptation of plants or animals to desert environment?"],  = _235["year"],  = _235[1993],  = _235["correctOptionId"],  = _235["optE"], _236 = _235["options"], _237 = _236[0],  = _237["id"],  = _237["optA"],  = _237["text"],  = _237["Well developed tap root system"], _238 = _236[1],  = _238["id"],  = _238["optB"],  = _238["text"],  = _238["Small leaves with thick epidermis"], _239 = _236[2],  = _239["id"],  = _239["optC"],  = _239["text"],  = _239["Stems with spike-like leaves"], _240 = _236[3],  = _240["id"],  = _240["optD"],  = _240["text"],  = _240["Metabolic waste in the form of uric acid in some animals"], _241 = _236[4],  = _241["id"],  = _241["optE"],  = _241["text"],  = _241["Broad leaves for storage"],  = _235["imageUrl"],  = _235.null, _242 = void 0,  = _242["id"],  = _242["q40"],  = _242["text"],  = _242["A climax community is characterised by"],  = _242["year"],  = _242[1993],  = _242["correctOptionId"],  = _242["optA"], _243 = _242["options"], _244 = _243[0],  = _244["id"],  = _244["optA"],  = _244["text"],  = _244["a stable composition of plant and animal species"], _245 = _243[1],  = _245["id"],  = _245["optB"],  = _245["text"],  = _245["rapid changes in the composition of species"], _246 = _243[2],  = _246["id"],  = _246["optC"],  = _246["text"],  = _246["constant changes in appearance of the habitat"], _247 = _243[3],  = _247["id"],  = _247["optD"],  = _247["text"],  = _247["different species occurring at different times"], _248 = _243[4],  = _248["id"],  = _248["optE"],  = _248["text"],  = _248["gradual change in animal population"],  = _242["imageUrl"],  = _242.null, _249 = void 0,  = _249["id"],  = _249["q41"],  = _249["text"],  = _249["Which of the following is not a characteristic of overcrowding in plant and animal community?"],  = _249["year"],  = _249[1993],  = _249["correctOptionId"],  = _249["optE"], _250 = _249["options"], _251 = _250[0],  = _251["id"],  = _251["optA"],  = _251["text"],  = _251["Population outstripping available space"], _252 = _250[1],  = _252["id"],  = _252["optB"],  = _252["text"],  = _252["Population exceeding available food"], _253 = _250[2],  = _253["id"],  = _253["optC"],  = _253["text"],  = _253["Competition within the population"], _254 = _250[3],  = _254["id"],  = _254["optD"],  = _254["text"],  = _254["Increase in primary production"], _255 = _250[4],  = _255["id"],  = _255["optE"],  = _255["text"],  = _255["Population increasing at the same rate as the birth rate"],  = _249["imageUrl"],  = _249.null, _256 = void 0,  = _256["id"],  = _256["q42"],  = _256["text"],  = _256["The use of predators or parasites to control pests in the farm is known as"],  = _256["year"],  = _256[1993],  = _256["correctOptionId"],  = _256["optC"], _257 = _256["options"], _258 = _257[0],  = _258["id"],  = _258["optA"],  = _258["text"],  = _258["predator control"], _259 = _257[1],  = _259["id"],  = _259["optB"],  = _259["text"],  = _259["chemical control"], _260 = _257[2],  = _260["id"],  = _260["optC"],  = _260["text"],  = _260["biological control"], _261 = _257[3],  = _261["id"],  = _261["optD"],  = _261["text"],  = _261["animal control"], _262 = _257[4],  = _262["id"],  = _262["optE"],  = _262["text"],  = _262["parasitic control"],  = _256["imageUrl"],  = _256.null, _263 = void 0,  = _263["id"],  = _263["q43"],  = _263["text"],  = _263["Which of the following substances cannot control the growth of harmful microorganisms?"],  = _263["year"],  = _263[1993],  = _263["correctOptionId"],  = _263["optD"], _264 = _263["options"], _265 = _264[0],  = _265["id"],  = _265["optA"],  = _265["text"],  = _265["antibiotics"], _266 = _264[1],  = _266["id"],  = _266["optB"],  = _266["text"],  = _266["disinfectants"], _267 = _264[2],  = _267["id"],  = _267["optC"],  = _267["text"],  = _267["antiseptics"], _268 = _264[3],  = _268["id"],  = _268["optD"],  = _268["text"],  = _268["bacteriophages"], _269 = _264[4],  = _269["id"],  = _269["optE"],  = _269["text"],  = _269["fungicides"],  = _263["imageUrl"],  = _263.null, _270 = void 0,  = _270["id"],  = _270["q44"],  = _270["text"],  = _270["Which of the following is the underlining principle in the adoption of biological control of pests?"],  = _270["year"],  = _270[1993],  = _270["correctOptionId"],  = _270["optE"], _271 = _270["options"], _272 = _271[0],  = _272["id"],  = _272["optA"],  = _272["text"],  = _272["Knowledge of agricultural practices by the farmer"], _273 = _271[1],  = _273["id"],  = _273["optB"],  = _273["text"],  = _273["Relationship between plants and animals"], _274 = _271[2],  = _274["id"],  = _274["optC"],  = _274["text"],  = _274["The presence of poisonous chemicals in the farm"], _275 = _271[3],  = _275["id"],  = _275["optD"],  = _275["text"],  = _275["The relative population of plants and animals in the farm"], _276 = _271[4],  = _276["id"],  = _276["optE"],  = _276["text"],  = _276["The predator\u2013prey relationship in the ecological community"],  = _270["imageUrl"],  = _270.null, _277 = void 0,  = _277["id"],  = _277["q45"],  = _277["text"],  = _277["The following agencies are responsible for conservation in Nigeria except"],  = _277["year"],  = _277[1993],  = _277["correctOptionId"],  = _277["optD"], _278 = _277["options"], _279 = _278[0],  = _279["id"],  = _279["optA"],  = _279["text"],  = _279["Forestry Departments"], _280 = _278[1],  = _280["id"],  = _280["optB"],  = _280["text"],  = _280["Nigerian Conservation Society"], _281 = _278[2],  = _281["id"],  = _281["optC"],  = _281["text"],  = _281["Game Reserve Authority"], _282 = _278[3],  = _282["id"],  = _282["optD"],  = _282["text"],  = _282["Nigerian Red Cross Society"], _283 = _278[4],  = _283["id"],  = _283["optE"],  = _283["text"],  = _283["Ministry of Agriculture and Natural Resources"],  = _277["imageUrl"],  = _277.null, _284 = void 0,  = _284["id"],  = _284["q46"],  = _284["text"],  = _284["The largest game reserve in Nigeria is the"],  = _284["year"],  = _284[1993],  = _284["correctOptionId"],  = _284["optC"], _285 = _284["options"], _286 = _285[0],  = _286["id"],  = _286["optA"],  = _286["text"],  = _286["Kainji Game Reserve in Niger State"], _287 = _285[1],  = _287["id"],  = _287["optB"],  = _287["text"],  = _287["Zamfara Forest Reserve in Sokoto State"], _288 = _285[2],  = _288["id"],  = _288["optC"],  = _288["text"],  = _288["Yankari Game Reserve in Bauchi State"], _289 = _285[3],  = _289["id"],  = _289["optD"],  = _289["text"],  = _289["Borgu Game Reserve in Niger State"], _290 = _285[4],  = _290["id"],  = _290["optE"],  = _290["text"],  = _290["Oban Hills Game Reserve in Cross River State"],  = _284["imageUrl"],  = _284.null, _291 = void 0,  = _291["id"],  = _291["q47"],  = _291["text"],  = _291["Which of the following ratios agrees with the result?"],  = _291["year"],  = _291[1993],  = _291["correctOptionId"],  = _291["optB"], _292 = _291["options"], _293 = _292[0],  = _293["id"],  = _293["optA"],  = _293["text"],  = _293["9 : 3 : 3"], _294 = _292[1],  = _294["id"],  = _294["optB"],  = _294["text"],  = _294["1 : 2 : 1"], _295 = _292[2],  = _295["id"],  = _295["optC"],  = _295["text"],  = _295["1 : 3 : 1"], _296 = _292[3],  = _296["id"],  = _296["optD"],  = _296["text"],  = _296["2 : 1 : 1"], _297 = _292[4],  = _297["id"],  = _297["optE"],  = _297["text"],  = _297["2 : 3 : 2"],  = _291["imageUrl"],  = _291.null, _298 = void 0,  = _298["id"],  = _298["q48"],  = _298["text"],  = _298["One of the factors that must be considered for safe blood transfusion is"],  = _298["year"],  = _298[1993],  = _298["correctOptionId"],  = _298["optC"], _299 = _298["options"], _300 = _299[0],  = _300["id"],  = _300["optA"],  = _300["text"],  = _300["social class of the donor"], _301 = _299[1],  = _301["id"],  = _301["optB"],  = _301["text"],  = _301["age of the recipient"], _302 = _299[2],  = _302["id"],  = _302["optC"],  = _302["text"],  = _302["rhesus factors of the donor and the recipient"], _303 = _299[3],  = _303["id"],  = _303["optD"],  = _303["text"],  = _303["nationality of the donor"], _304 = _299[4],  = _304["id"],  = _304["optE"],  = _304["text"],  = _304["weight of the recipient"],  = _298["imageUrl"],  = _298.null, _305 = void 0,  = _305["id"],  = _305["q49"],  = _305["text"],  = _305["One of the major criticisms against Mendelian laws is that they do not recognise that"],  = _305["year"],  = _305[1993],  = _305["correctOptionId"],  = _305["optA"], _306 = _305["options"], _307 = _306[0],  = _307["id"],  = _307["optA"],  = _307["text"],  = _307["one trait is often controlled by many pairs of genes"], _308 = _306[1],  = _308["id"],  = _308["optB"],  = _308["text"],  = _308["single factor inheritance is never a reality"], _309 = _306[2],  = _309["id"],  = _309["optC"],  = _309["text"],  = _309["complete dominance is always possible"], _310 = _306[3],  = _310["id"],  = _310["optD"],  = _310["text"],  = _310["incomplete dominance is not possible"], _311 = _306[4],  = _311["id"],  = _311["optE"],  = _311["text"],  = _311["hybrids exist in living organisms"],  = _305["imageUrl"],  = _305.null, _312 = void 0,  = _312["id"],  = _312["q50"],  = _312["text"],  = _312["Identical twins inherit their genes from"],  = _312["year"],  = _312[1993],  = _312["correctOptionId"],  = _312["optD"], _313 = _312["options"], _314 = _313[0],  = _314["id"],  = _314["optA"],  = _314["text"],  = _314["the same ovum and different sperms"], _315 = _313[1],  = _315["id"],  = _315["optB"],  = _315["text"],  = _315["the same sperm and different ova"], _316 = _313[2],  = _316["id"],  = _316["optC"],  = _316["text"],  = _316["different sperms and many ova"], _317 = _313[3],  = _317["id"],  = _317["optD"],  = _317["text"],  = _317["the same ovum and the same sperm"], _318 = _313[4],  = _318["id"],  = _318["optE"],  = _318["text"],  = _318["many ova and many sperms"],  = _312["imageUrl"],  = _312.null, _319 = void 0,  = _319["id"],  = _319["q51"],  = _319["text"],  = _319["The offspring produced when pure strains interbreed is described as"],  = _319["year"],  = _319[1993],  = _319["correctOptionId"],  = _319["optE"], _320 = _319["options"], _321 = _320[0],  = _321["id"],  = _321["optA"],  = _321["text"],  = _321["dominance"], _322 = _320[1],  = _322["id"],  = _322["optB"],  = _322["text"],  = _322["phenotype"], _323 = _320[2],  = _323["id"],  = _323["optC"],  = _323["text"],  = _323["allele"], _324 = _320[3],  = _324["id"],  = _324["optD"],  = _324["text"],  = _324["genotype"], _325 = _320[4],  = _325["id"],  = _325["optE"],  = _325["text"],  = _325["hybrid"],  = _319["imageUrl"],  = _319.null, _326 = void 0,  = _326["id"],  = _326["q52"],  = _326["text"],  = _326["Which of the following diseases or disorders can be prevented by the application of the knowledge of heredity through marriage counselling?"],  = _326["year"],  = _326[1993],  = _326["correctOptionId"],  = _326["optA"], _327 = _326["options"], _328 = _327[0],  = _328["id"],  = _328["optA"],  = _328["text"],  = _328["Sickle cell anaemia"], _329 = _327[1],  = _329["id"],  = _329["optB"],  = _329["text"],  = _329["Haemophilia"], _330 = _327[2],  = _330["id"],  = _330["optC"],  = _330["text"],  = _330["Diabetes mellitus"], _331 = _327[3],  = _331["id"],  = _331["optD"],  = _331["text"],  = _331["Colour blindness"], _332 = _327[4],  = _332["id"],  = _332["optE"],  = _332["text"],  = _332["River blindness"],  = _326["imageUrl"],  = _326.null, _333 = void 0,  = _333["id"],  = _333["q53"],  = _333["text"],  = _333["From the cross above, which of the following F1 offspring does not belong to the father?"],  = _333["year"],  = _333[1993],  = _333["correctOptionId"],  = _333["optC"], _334 = _333["options"], _335 = _334[0],  = _335["id"],  = _335["optA"],  = _335["text"],  = _335["AA"], _336 = _334[1],  = _336["id"],  = _336["optB"],  = _336["text"],  = _336["AO"], _337 = _334[2],  = _337["id"],  = _337["optC"],  = _337["text"],  = _337["OB"], _338 = _334[3],  = _338["id"],  = _338["optD"],  = _338["text"],  = _338["OO"], _339 = _334[4],  = _339["id"],  = _339["optE"],  = _339["text"],  = _339["AB"],  = _333["imageUrl"],  = _333["genetic_cross_diagram.jpg"], _340 = void 0,  = _340["id"],  = _340["q54"],  = _340["text"],  = _340["Which of the following is a function of the chromosome?"],  = _340["year"],  = _340[1993],  = _340["correctOptionId"],  = _340["optA"], _341 = _340["options"], _342 = _341[0],  = _342["id"],  = _342["optA"],  = _342["text"],  = _342["Transmission of hereditary traits"], _343 = _341[1],  = _343["id"],  = _343["optB"],  = _343["text"],  = _343["Protein synthesis"], _344 = _341[2],  = _344["id"],  = _344["optC"],  = _344["text"],  = _344["Excretion"], _345 = _341[3],  = _345["id"],  = _345["optD"],  = _345["text"],  = _345["Energy production"], _346 = _341[4],  = _346["id"],  = _346["optE"],  = _346["text"],  = _346["Manufacture of enzyme"],  = _340["imageUrl"],  = _340.null;
{
    "id";
    "q54",
        "text";
    "Which of the following is a function of the chromosome?",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "Transmission of hereditary traits" },
        { "id": "optB", "text": "Protein synthesis" },
        { "id": "optC", "text": "Excretion" },
        { "id": "optD", "text": "Energy production" },
        { "id": "optE", "text": "Manufacture of enzyme" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q44",
        "text";
    "Which of the following is the underlining principle in the adoption of biological control of pests?",
        "year";
    1993,
        "correctOptionId";
    "optE",
        "options";
    [
        { "id": "optA", "text": "Knowledge of agricultural practices by the farmer" },
        { "id": "optB", "text": "Relationship between plants and animals" },
        { "id": "optC", "text": "The presence of poisonous chemicals in the farm" },
        { "id": "optD", "text": "The relative population of plants and animals in the farm" },
        { "id": "optE", "text": "The predator–prey relationship in the ecological community" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q45",
        "text";
    "The following agencies are responsible for conservation in Nigeria except",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "Forestry Departments" },
        { "id": "optB", "text": "Nigerian Conservation Society" },
        { "id": "optC", "text": "Game Reserve Authority" },
        { "id": "optD", "text": "Nigerian Red Cross Society" },
        { "id": "optE", "text": "Ministry of Agriculture and Natural Resources" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q46",
        "text";
    "The largest game reserve in Nigeria is the",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "Kainji Game Reserve in Niger State" },
        { "id": "optB", "text": "Zamfara Forest Reserve in Sokoto State" },
        { "id": "optC", "text": "Yankari Game Reserve in Bauchi State" },
        { "id": "optD", "text": "Borgu Game Reserve in Niger State" },
        { "id": "optE", "text": "Oban Hills Game Reserve in Cross River State" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q47",
        "text";
    "Which of the following ratios agrees with the result?",
        "year";
    1993,
        "correctOptionId";
    "optB",
        "options";
    [
        { "id": "optA", "text": "9 : 3 : 3" },
        { "id": "optB", "text": "1 : 2 : 1" },
        { "id": "optC", "text": "1 : 3 : 1" },
        { "id": "optD", "text": "2 : 1 : 1" },
        { "id": "optE", "text": "2 : 3 : 2" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q48",
        "text";
    "One of the factors that must be considered for safe blood transfusion is",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "social class of the donor" },
        { "id": "optB", "text": "age of the recipient" },
        { "id": "optC", "text": "rhesus factors of the donor and the recipient" },
        { "id": "optD", "text": "nationality of the donor" },
        { "id": "optE", "text": "weight of the recipient" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q49",
        "text";
    "One of the major criticisms against Mendelian laws is that they do not recognise that",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "one trait is often controlled by many pairs of genes" },
        { "id": "optB", "text": "single factor inheritance is never a reality" },
        { "id": "optC", "text": "complete dominance is always possible" },
        { "id": "optD", "text": "incomplete dominance is not possible" },
        { "id": "optE", "text": "hybrids exist in living organisms" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q50",
        "text";
    "Identical twins inherit their genes from",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "the same ovum and different sperms" },
        { "id": "optB", "text": "the same sperm and different ova" },
        { "id": "optC", "text": "different sperms and many ova" },
        { "id": "optD", "text": "the same ovum and the same sperm" },
        { "id": "optE", "text": "many ova and many sperms" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q51",
        "text";
    "The offspring produced when pure strains interbreed is described as",
        "year";
    1993,
        "correctOptionId";
    "optE",
        "options";
    [
        { "id": "optA", "text": "dominance" },
        { "id": "optB", "text": "phenotype" },
        { "id": "optC", "text": "allele" },
        { "id": "optD", "text": "genotype" },
        { "id": "optE", "text": "hybrid" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q52",
        "text";
    "Which of the following diseases or disorders can be prevented by the application of the knowledge of heredity through marriage counselling?",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "Sickle cell anaemia" },
        { "id": "optB", "text": "Haemophilia" },
        { "id": "optC", "text": "Diabetes mellitus" },
        { "id": "optD", "text": "Colour blindness" },
        { "id": "optE", "text": "River blindness" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q53",
        "text";
    "From the cross above, which of the following F1 offspring does not belong to the father?",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "AA" },
        { "id": "optB", "text": "AO" },
        { "id": "optC", "text": "OB" },
        { "id": "optD", "text": "OO" },
        { "id": "optE", "text": "AB" }
    ],
        "imageUrl";
    "genetic_cross_diagram.jpg";
}
{
    "id";
    "q54",
        "text";
    "Which of the following is a function of the chromosome?",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "Transmission of hereditary traits" },
        { "id": "optB", "text": "Protein synthesis" },
        { "id": "optC", "text": "Excretion" },
        { "id": "optD", "text": "Energy production" },
        { "id": "optE", "text": "Manufacture of enzyme" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q44",
        "text";
    "Which of the following is the underlining principle in the adoption of biological control of pests?",
        "year";
    1993,
        "correctOptionId";
    "optE",
        "options";
    [
        { "id": "optA", "text": "Knowledge of agricultural practices by the farmer" },
        { "id": "optB", "text": "Relationship between plants and animals" },
        { "id": "optC", "text": "The presence of poisonous chemicals in the farm" },
        { "id": "optD", "text": "The relative population of plants and animals in the farm" },
        { "id": "optE", "text": "The predator–prey relationship in the ecological community" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q45",
        "text";
    "The following agencies are responsible for conservation in Nigeria except",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "Forestry Departments" },
        { "id": "optB", "text": "Nigerian Conservation Society" },
        { "id": "optC", "text": "Game Reserve Authority" },
        { "id": "optD", "text": "Nigerian Red Cross Society" },
        { "id": "optE", "text": "Ministry of Agriculture and Natural Resources" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q46",
        "text";
    "The largest game reserve in Nigeria is the",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "Kainji Game Reserve in Niger State" },
        { "id": "optB", "text": "Zamfara Forest Reserve in Sokoto State" },
        { "id": "optC", "text": "Yankari Game Reserve in Bauchi State" },
        { "id": "optD", "text": "Borgu Game Reserve in Niger State" },
        { "id": "optE", "text": "Oban Hills Game Reserve in Cross River State" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q47",
        "text";
    "Which of the following ratios agrees with the result?",
        "year";
    1993,
        "correctOptionId";
    "optB",
        "options";
    [
        { "id": "optA", "text": "9 : 3 : 3" },
        { "id": "optB", "text": "1 : 2 : 1" },
        { "id": "optC", "text": "1 : 3 : 1" },
        { "id": "optD", "text": "2 : 1 : 1" },
        { "id": "optE", "text": "2 : 3 : 2" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q48",
        "text";
    "One of the factors that must be considered for safe blood transfusion is",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "social class of the donor" },
        { "id": "optB", "text": "age of the recipient" },
        { "id": "optC", "text": "rhesus factors of the donor and the recipient" },
        { "id": "optD", "text": "nationality of the donor" },
        { "id": "optE", "text": "weight of the recipient" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q49",
        "text";
    "One of the major criticisms against Mendelian laws is that they do not recognise that",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "one trait is often controlled by many pairs of genes" },
        { "id": "optB", "text": "single factor inheritance is never a reality" },
        { "id": "optC", "text": "complete dominance is always possible" },
        { "id": "optD", "text": "incomplete dominance is not possible" },
        { "id": "optE", "text": "hybrids exist in living organisms" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q50",
        "text";
    "Identical twins inherit their genes from",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "the same ovum and different sperms" },
        { "id": "optB", "text": "the same sperm and different ova" },
        { "id": "optC", "text": "different sperms and many ova" },
        { "id": "optD", "text": "the same ovum and the same sperm" },
        { "id": "optE", "text": "many ova and many sperms" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q51",
        "text";
    "The offspring produced when pure strains interbreed is described as",
        "year";
    1993,
        "correctOptionId";
    "optE",
        "options";
    [
        { "id": "optA", "text": "dominance" },
        { "id": "optB", "text": "phenotype" },
        { "id": "optC", "text": "allele" },
        { "id": "optD", "text": "genotype" },
        { "id": "optE", "text": "hybrid" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q52",
        "text";
    "Which of the following diseases or disorders can be prevented by the application of the knowledge of heredity through marriage counselling?",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "Sickle cell anaemia" },
        { "id": "optB", "text": "Haemophilia" },
        { "id": "optC", "text": "Diabetes mellitus" },
        { "id": "optD", "text": "Colour blindness" },
        { "id": "optE", "text": "River blindness" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q53",
        "text";
    "From the cross above, which of the following F1 offspring does not belong to the father?",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "AA" },
        { "id": "optB", "text": "AO" },
        { "id": "optC", "text": "OB" },
        { "id": "optD", "text": "OO" },
        { "id": "optE", "text": "AB" }
    ],
        "imageUrl";
    "genetic_cross_diagram.jpg";
}
{
    "id";
    "q54",
        "text";
    "Which of the following is a function of the chromosome?",
        "year";
    1993,
        "correctOptionId";
    "optA",
        "options";
    [
        { "id": "optA", "text": "Transmission of hereditary traits" },
        { "id": "optB", "text": "Protein synthesis" },
        { "id": "optC", "text": "Excretion" },
        { "id": "optD", "text": "Energy production" },
        { "id": "optE", "text": "Manufacture of enzyme" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q55",
        "text";
    "Which of the following does not illustrate adaptation to the environment?",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "Colour changes by chameleon" },
        { "id": "optB", "text": "Streamline shape of fishes" },
        { "id": "optC", "text": "Light bones in birds" },
        { "id": "optD", "text": "Development of big muscles by a weight lifter" },
        { "id": "optE", "text": "Possession of fins by fishes" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q56",
        "text";
    "The changing of colour by a chameleon to that of the environment is an example of",
        "year";
    1993,
        "correctOptionId";
    "optB",
        "options";
    [
        { "id": "optA", "text": "adaptive radiation" },
        { "id": "optB", "text": "protective coloration" },
        { "id": "optC", "text": "courtship display" },
        { "id": "optD", "text": "display of body colour" },
        { "id": "optE", "text": "territorial behaviour" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q57",
        "text";
    "The division of labour in social insects is an example of",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "structural adaptation" },
        { "id": "optB", "text": "physiological adaptation" },
        { "id": "optC", "text": "commensalism" },
        { "id": "optD", "text": "behavioural adaptation" },
        { "id": "optE", "text": "hormonal influence" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q58",
        "text";
    "The swarming especially at the beginning of the rainy season is a courtship behaviour shown by",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "migratory birds" },
        { "id": "optB", "text": "pigeons" },
        { "id": "optC", "text": "crickets" },
        { "id": "optD", "text": "winged termites" },
        { "id": "optE", "text": "bees" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q59",
        "text";
    "Lamarck\'s evolution theory could be summarised by the statement that",
        "year";
    1993,
        "correctOptionId";
    "optD",
        "options";
    [
        { "id": "optA", "text": "only the fittest can survive in a challenging environment" },
        { "id": "optB", "text": "species that are unable to adapt become extinct" },
        { "id": "optC", "text": "new characteristics do not arise in organisms in time of need" },
        { "id": "optD", "text": "the changing environment imposes structural, physiological and behavioural changes in organisms" },
        { "id": "optE", "text": "in a changing and unstable environment nature rejects the weak" }
    ],
        "imageUrl";
    null;
}
{
    "id";
    "q60",
        "text";
    "The property of clay soil that prevents it from supporting thick vegetation is its",
        "year";
    1993,
        "correctOptionId";
    "optC",
        "options";
    [
        { "id": "optA", "text": "possession of chemically weathered granite rocks" },
        { "id": "optB", "text": "high water retention ability" },
        { "id": "optC", "text": "poor aeration" },
        { "id": "optD", "text": "high proportion of silt" },
        { "id": "optE", "text": "low proportion of clay" }
    ],
        "imageUrl";
    null;
}
;
function uploadQuestions() {
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, waecBiology1993Questions_1, question, questionRef, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    db = (0, firebase_1.getFirestoreDb)();
                    console.log("Uploading ".concat(waecBiology1993Questions.length, " WAEC Biology 1993 questions..."));
                    _i = 0, waecBiology1993Questions_1 = waecBiology1993Questions;
                    _a.label = 1;
                case 1:
                    if (!(_i < waecBiology1993Questions_1.length)) return [3 /*break*/, 4];
                    question = waecBiology1993Questions_1[_i];
                    questionRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, 'questions'), question.id);
                    return [4 /*yield*/, (0, firestore_1.setDoc)(questionRef, question, { merge: true })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('WAEC Biology 1993 questions uploaded successfully!');
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error uploading WAEC Biology 1993 questions:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
uploadQuestions();
