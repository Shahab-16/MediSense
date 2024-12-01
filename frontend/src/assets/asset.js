import doctor1 from "./doctor1.jpg";
import feature1 from "./feature1_doctor.jpg";
import feature2 from "./feature3_medicine.jpeg";
import feature3 from "./feature2_model.jpg";
import appStore from "./app_store.png";
import playStore from "./play_store.png";
import asthma from "./Asthma.jpg";
import diabetes from "./Diabetes.jpg";
import breastCancer from "./BreastCancer.jpg";
import heartDisease from "./HeartDisease.jpg";
import stroke from "./Stroke.jpg";
import thyroidDisease from "./ThyroidDisease.jpg";
import kidneyDisease from "./ChronicKidneyDisease.jpg";
import anaemia from "./Anaemia.jpg";
import modelSectionImage from "./modelSectionImage.jpg";
import AnasAhmed from './Doctor 01.jpg';
import DrRobertMitchell from './Doctor 02.jpg';
import DrGitaDevi from './Doctor 17.jpg';
import Cancel_Icon from './cross_icon.png';
import register from './register.png';
import sidebarImg from './SidebarImg.png';
import backgroundVideo from './backgroundVideo.mp4';
import medicineShopIcon from './medicineShopIcon.png';
import medicineShop from './medicineShop.jpg';
import Glimepiride from './Glimepiride.jpg';
import Metformine from './Metformine.jpg';
import Insulin_Glargine from './Insulin Glargine.jpg';
import Sitagliptin from './Sitagliptin.jpg';
import Dapagliflozin from './Dapagliflozin.jpg';
import Enalapril from './Enalapril.jpg';
import Hydrochlorothiazide from './Hydrochlorothiazide.jpg';
import Losartan from './Losartan.jpg';
import Metoprolol from './Metoprolol.jpeg';
import Amlodipine from './Amlodipine.jpg';



export const images = {
  doctor1,
  appStore,
  playStore,
  modelSectionImage,
  Cancel_Icon,
  register,
  sidebarImg,
  backgroundVideo,
  medicineShopIcon,
  medicineShop
};

export const model_list = {
  asthma: {
    title: "Asthma Prediction",
    description: [
      "Predicts the likelihood of asthma attacks based on symptoms and medical history.",
      "Helps in early detection and management of asthma.",
      "Reduces the risk of severe asthma attacks by providing timely alerts.",
    ],
    img: asthma,
  },
  diabetes: {
    title: "Diabetes Prediction",
    description: [
      "Accurately predicts the risk of developing diabetes.",
      "Provides personalized health recommendations to prevent diabetes.",
      "Assists in monitoring blood glucose levels and managing diet.",
    ],
    img: diabetes,
  },
  breastCancer: {
    title: "Breast Cancer Prediction",
    description: [
      "Detects early signs of breast cancer using advanced algorithms.",
      "Increases chances of successful treatment through early intervention.",
      "Provides a non-invasive method to assess cancer risk.",
    ],
    img: breastCancer,
  },
  heartDisease: {
    title: "Heart Disease Prediction",
    description: [
      "Identifies risk factors for heart disease through comprehensive analysis.",
      "Helps in preventing heart attacks by providing early warnings.",
      "Guides patients in making heart-healthy lifestyle changes.",
    ],
    img: heartDisease,
  },
  stroke: {
    title: "Stroke Prediction",
    description: [
      "Predicts the risk of stroke by analyzing medical history and lifestyle factors.",
      "Enables timely intervention to prevent strokes.",
      "Supports the creation of personalized stroke prevention plans.",
    ],
    img: stroke,
  },
  thyroidDisease: {
    title: "Thyroid Disease Prediction",
    description: [
      "Assesses the risk of thyroid disorders such as hypothyroidism and hyperthyroidism.",
      "Monitors thyroid function to provide timely medical advice.",
      "Reduces the risk of complications by ensuring early detection.",
    ],
    img: thyroidDisease,
  },
  kidneyDisease: {
    title: "Chronic Kidney Disease Prediction",
    description: [
      "Detects early signs of chronic kidney disease (CKD).",
      "Helps in slowing the progression of CKD through early diagnosis.",
      "Offers guidance on managing kidney health and preventing kidney failure.",
    ],
    img: kidneyDisease,
  },
  anaemia: {
    title: "Anaemia Prediction",
    description: [
      "Predicts the likelihood of developing anaemia based on health data.",
      "Recommends dietary and lifestyle changes to prevent anaemia.",
      "Assists in the early detection and treatment of anaemia.",
    ],
    img: anaemia,
  },
};

export const feature_list = [
  {
    title: "Find Doctor",
    subtitle: "We provide you the best doctor and their details.",
    img: feature1,
  },
  {
    title: "Get Medicines",
    subtitle:
      "We provide you with the best quality medicines at affordable prices",
    img: feature2,
  },
  {
    title: "Predict Diseases",
    subtitle: "Avalability of accurate ML and DL models for disease prediction",
    img: feature3,
  },
  {
    title: "Ask Your Question",
    subtitle: "Frequent response to your query",
    img: feature2,
  },
];

export const features = [
  {
    title: "Doctor Booking System",
    description:
      "Book appointments online with ease, make secure payments, and receive a token to save time at the clinic.",
    image: feature1,
  },
  {
    title: "Online Medicine Shop",
    description:
      "Purchase medicines online with home delivery options and easy payment methods.",
    image: feature2,
  },
  {
    title: "Disease Prediction Model",
    description:
      "Leverage advanced machine learning and deep learning models for highly accurate disease prediction.",
    image: feature3,
  },
];


export const doctor_features = [
  {
    name: "Anas Ahmed",
    specialization: "Heart specialist",
    address: "",
    stats: "",
    img: AnasAhmed

  },
  {
    name: "Dr.Robert Mitchell",
    specialization: "Endocrinologist",
    address: "",
    stats: "",
    img: DrRobertMitchell
  },
  {
    name: "Dr.Sarah Khan",
    specialization: "oncologist",
    address: "",
    stats: "",
    img:  DrRobertMitchell
  },
  {
    name:"Gita Devi",
    specialization: "Dermatologist",
    address: "",
    stats: "",
    img: DrGitaDevi
  }
];


export const medicine_categories = [
  { name: "Diabetes" },
  { name: "Hypertension" },
  { name: "Cold" },
  { name: "Heart Disease" },
  { name: "Allergies" },
  { name: "Asthma" },
  { name: "Arthritis" },
  { name: "Skin Conditions" },
  { name: "Infections" },
  { name: "Gastrointestinal Issues" },
  { name: "Thyroid Disorders" },
  { name: "Mental Health" },
  { name: "Pain Management" },
  { name: "Fever" },
  { name: "Vitamin Deficiencies" },
  { name: "Kidney Disorders" },
  { name: "Liver Disorders" },
  { name: "Neurological Disorders" },
  { name: "Cancer" },
  { name: "Eye Care" },
];




export const medicines = [
    // Diabetes
    {
      name: "Metformin",
      category: "Diabetes",
      price: 150,
      image:Metformine,
      description: "Helps lower blood sugar by improving insulin sensitivity.",
    },
    {
      name: "Glimepiride",
      category: "Diabetes",
      price: 200,
      image: Glimepiride,
      description: "Stimulates insulin release to manage blood sugar levels.",
    },
    {
      name: "Insulin Glargine",
      category: "Diabetes",
      price: 600,
      image: Insulin_Glargine,
      description: "A long-acting insulin to maintain glucose levels throughout the day.",
    },
    {
      name: "Sitagliptin",
      category: "Diabetes",
      price: 450,
      image: Sitagliptin,
      description: "Increases insulin release and reduces glucose production.",
    },
    {
      name: "Dapagliflozin",
      category: "Diabetes",
      price: 500,
      image: Dapagliflozin,
      description: "Helps kidneys remove excess sugar through urine.",
    },
    // Hypertension
    {
      name: "Amlodipine",
      category: "Hypertension",
      price: 120,
      image: Amlodipine,
      description: "Relaxes blood vessels to lower blood pressure.",
    },
    {
      name: "Losartan",
      category: "Hypertension",
      price: 140,
      image: Losartan,
      description: "Blocks receptors to reduce blood pressure and protect the heart.",
    },
    {
      name: "Hydrochlorothiazide",
      category: "Hypertension",
      price: 100,
      image: Hydrochlorothiazide,
      description: "A diuretic used to control blood pressure by reducing water retention.",
    },
    {
      name: "Enalapril",
      category: "Hypertension",
      price: 180,
      image: Enalapril,
      description: "An ACE inhibitor that relaxes blood vessels.",
    },
    {
      name: "Metoprolol",
      category: "Hypertension",
      price: 200,
      image: Metoprolol,
      description: "Slows heart rate to manage high blood pressure effectively.",
    },
    // Cold
    {
      name: "Paracetamol",
      category: "Cold",
      price: 50,
      image: "https://via.placeholder.com/150/cold/paracetamol.jpg",
      description: "Relieves fever and mild cold symptoms.",
    },
    {
      name: "Cetirizine",
      category: "Cold",
      price: 80,
      image: "https://via.placeholder.com/150/cold/cetirizine.jpg",
      description: "Reduces allergy-related cold symptoms such as a runny nose.",
    },
    {
      name: "Phenylephrine",
      category: "Cold",
      price: 70,
      image: "https://via.placeholder.com/150/cold/phenylephrine.jpg",
      description: "Decongests nasal passages for cold relief.",
    },
    {
      name: "Chlorpheniramine",
      category: "Cold",
      price: 90,
      image: "https://via.placeholder.com/150/cold/chlorpheniramine.jpg",
      description: "Eases sneezing and runny nose associated with the common cold.",
    },
    {
      name: "Dextromethorphan",
      category: "Cold",
      price: 120,
      image: "https://via.placeholder.com/150/cold/dextromethorphan.jpg",
      description: "Suppresses cough during colds and mild throat infections.",
    },
    // Heart Disease
    {
      name: "Aspirin",
      category: "Heart Disease",
      price: 60,
      image: "https://via.placeholder.com/150/heart/aspirin.jpg",
      description: "Prevents blood clots and reduces heart attack risks.",
    },
    {
      name: "Atorvastatin",
      category: "Heart Disease",
      price: 250,
      image: "https://via.placeholder.com/150/heart/atorvastatin.jpg",
      description: "Lowers cholesterol levels to protect heart health.",
    },
    {
      name: "Clopidogrel",
      category: "Heart Disease",
      price: 300,
      image: "https://via.placeholder.com/150/heart/clopidogrel.jpg",
      description: "Prevents blood clots in patients with heart disease.",
    },
    {
      name: "Carvedilol",
      category: "Heart Disease",
      price: 200,
      image: "https://via.placeholder.com/150/heart/carvedilol.jpg",
      description: "A beta-blocker that improves heart function.",
    },
    {
      name: "Digoxin",
      category: "Heart Disease",
      price: 220,
      image: "https://via.placeholder.com/150/heart/digoxin.jpg",
      description: "Strengthens heart contractions for better blood circulation.",
    },
    // Allergies
    {
      name: "Loratadine",
      category: "Allergies",
      price: 100,
      image: "https://via.placeholder.com/150/allergy/loratadine.jpg",
      description: "Relieves allergy symptoms such as sneezing and itchy eyes.",
    },
    {
      name: "Fexofenadine",
      category: "Allergies",
      price: 150,
      image: "https://via.placeholder.com/150/allergy/fexofenadine.jpg",
      description: "Treats seasonal allergies and hives effectively.",
    },
    {
      name: "Diphenhydramine",
      category: "Allergies",
      price: 90,
      image: "https://via.placeholder.com/150/allergy/diphenhydramine.jpg",
      description: "An antihistamine for relief from severe allergic reactions.",
    },
    {
      name: "Montelukast",
      category: "Allergies",
      price: 180,
      image: "https://via.placeholder.com/150/allergy/montelukast.jpg",
      description: "Prevents asthma symptoms triggered by allergies.",
    },
    {
      name: "Cetirizine",
      category: "Allergies",
      price: 80,
      image: "https://via.placeholder.com/150/allergy/cetirizine.jpg",
      description: "Alleviates sneezing and itching caused by allergens.",
    },
  
    {
      name: "Salbutamol",
      category: "Asthma",
      price: 150,
      image: "https://via.placeholder.com/150/asthma/salbutamol.jpg",
      description: "Provides quick relief from asthma symptoms by relaxing airways.",
    },
    {
      name: "Budesonide",
      category: "Asthma",
      price: 250,
      image: "https://via.placeholder.com/150/asthma/budesonide.jpg",
      description: "Reduces airway inflammation to control asthma long-term.",
    },
    {
      name: "Montelukast",
      category: "Asthma",
      price: 200,
      image: "https://via.placeholder.com/150/asthma/montelukast.jpg",
      description: "Prevents asthma attacks triggered by allergens or exercise.",
    },
    {
      name: "Theophylline",
      category: "Asthma",
      price: 300,
      image: "https://via.placeholder.com/150/asthma/theophylline.jpg",
      description: "Relaxes airway muscles to improve breathing in asthma patients.",
    },
    {
      name: "Fluticasone",
      category: "Asthma",
      price: 280,
      image: "https://via.placeholder.com/150/asthma/fluticasone.jpg",
      description: "A corticosteroid inhaler to prevent asthma symptoms.",
    },
    
    // Arthritis
    {
      name: "Ibuprofen",
      category: "Arthritis",
      price: 120,
      image: "https://via.placeholder.com/150/arthritis/ibuprofen.jpg",
      description: "Relieves pain and inflammation caused by arthritis.",
    },
    {
      name: "Celecoxib",
      category: "Arthritis",
      price: 220,
      image: "https://via.placeholder.com/150/arthritis/celecoxib.jpg",
      description: "A COX-2 inhibitor to reduce arthritis-related pain.",
    },
    {
      name: "Methotrexate",
      category: "Arthritis",
      price: 350,
      image: "https://via.placeholder.com/150/arthritis/methotrexate.jpg",
      description: "A disease-modifying agent for rheumatoid arthritis.",
    },
    {
      name: "Sulfasalazine",
      category: "Arthritis",
      price: 300,
      image: "https://via.placeholder.com/150/arthritis/sulfasalazine.jpg",
      description: "Reduces joint inflammation in rheumatoid arthritis.",
    },
    {
      name: "Prednisone",
      category: "Arthritis",
      price: 180,
      image: "https://via.placeholder.com/150/arthritis/prednisone.jpg",
      description: "A corticosteroid used to manage arthritis flare-ups.",
    },
    
    // Skin Conditions
    {
      name: "Hydrocortisone",
      category: "Skin Conditions",
      price: 90,
      image: "https://via.placeholder.com/150/skin/hydrocortisone.jpg",
      description: "Treats rashes and inflammation caused by skin conditions.",
    },
    {
      name: "Clobetasol",
      category: "Skin Conditions",
      price: 200,
      image: "https://via.placeholder.com/150/skin/clobetasol.jpg",
      description: "A potent steroid cream for severe skin disorders.",
    },
    {
      name: "Ketoconazole",
      category: "Skin Conditions",
      price: 150,
      image: "https://via.placeholder.com/150/skin/ketoconazole.jpg",
      description: "Antifungal cream for treating fungal skin infections.",
    },
    {
      name: "Tacrolimus",
      category: "Skin Conditions",
      price: 400,
      image: "https://via.placeholder.com/150/skin/tacrolimus.jpg",
      description: "An immunosuppressant cream for eczema and dermatitis.",
    },
    {
      name: "Mupirocin",
      category: "Skin Conditions",
      price: 250,
      image: "https://via.placeholder.com/150/skin/mupirocin.jpg",
      description: "An antibiotic ointment for bacterial skin infections.",
    },
    
    // Infections
    {
      name: "Amoxicillin",
      category: "Infections",
      price: 150,
      image: "https://via.placeholder.com/150/infections/amoxicillin.jpg",
      description: "A broad-spectrum antibiotic for bacterial infections.",
    },
    {
      name: "Azithromycin",
      category: "Infections",
      price: 200,
      image: "https://via.placeholder.com/150/infections/azithromycin.jpg",
      description: "Treats respiratory and skin infections effectively.",
    },
    {
      name: "Ciprofloxacin",
      category: "Infections",
      price: 220,
      image: "https://via.placeholder.com/150/infections/ciprofloxacin.jpg",
      description: "An antibiotic used to treat urinary tract infections.",
    },
    {
      name: "Metronidazole",
      category: "Infections",
      price: 180,
      image: "https://via.placeholder.com/150/infections/metronidazole.jpg",
      description: "Treats anaerobic bacterial and parasitic infections.",
    },
    {
      name: "Clindamycin",
      category: "Infections",
      price: 250,
      image: "https://via.placeholder.com/150/infections/clindamycin.jpg",
      description: "Used for severe bacterial infections, including skin infections.",
    },
// Gastrointestinal Issues
{
  name: "Omeprazole",
  category: "Gastrointestinal Issues",
  price: 100,
  image: "https://via.placeholder.com/150/gastrointestinal/omeprazole.jpg",
  description: "Reduces stomach acid for conditions like GERD.",
},
{
  name: "Ranitidine",
  category: "Gastrointestinal Issues",
  price: 80,
  image: "https://via.placeholder.com/150/gastrointestinal/ranitidine.jpg",
  description: "Treats and prevents ulcers in the stomach and intestines.",
},
{
  name: "Loperamide",
  category: "Gastrointestinal Issues",
  price: 50,
  image: "https://via.placeholder.com/150/gastrointestinal/loperamide.jpg",
  description: "Provides relief from diarrhea by slowing gut movement.",
},
{
  name: "Mesalamine",
  category: "Gastrointestinal Issues",
  price: 300,
  image: "https://via.placeholder.com/150/gastrointestinal/mesalamine.jpg",
  description: "Reduces inflammation in ulcerative colitis patients.",
},
{
  name: "Domperidone",
  category: "Gastrointestinal Issues",
  price: 120,
  image: "https://via.placeholder.com/150/gastrointestinal/domperidone.jpg",
  description: "Helps with nausea and promotes digestion.",
},

// Thyroid Disorders
{
  name: "Levothyroxine",
  category: "Thyroid Disorders",
  price: 150,
  image: "https://via.placeholder.com/150/thyroid/levothyroxine.jpg",
  description: "Hormone replacement for hypothyroidism treatment.",
},
{
  name: "Methimazole",
  category: "Thyroid Disorders",
  price: 200,
  image: "https://via.placeholder.com/150/thyroid/methimazole.jpg",
  description: "Used to manage hyperthyroidism by reducing hormone levels.",
},
{
  name: "Propylthiouracil",
  category: "Thyroid Disorders",
  price: 250,
  image: "https://via.placeholder.com/150/thyroid/propylthiouracil.jpg",
  description: "Treats overactive thyroid in patients with hyperthyroidism.",
},
{
  name: "Liothyronine",
  category: "Thyroid Disorders",
  price: 180,
  image: "https://via.placeholder.com/150/thyroid/liothyronine.jpg",
  description: "Provides active thyroid hormone replacement.",
},
{
  name: "Thyroid Extract",
  category: "Thyroid Disorders",
  price: 220,
  image: "https://via.placeholder.com/150/thyroid/thyroid-extract.jpg",
  description: "A natural thyroid hormone for hypothyroidism.",
},

// Mental Health
{
  name: "Fluoxetine",
  category: "Mental Health",
  price: 150,
  image: "https://via.placeholder.com/150/mental/fluoxetine.jpg",
  description: "An antidepressant to treat depression and anxiety disorders.",
},
{
  name: "Sertraline",
  category: "Mental Health",
  price: 180,
  image: "https://via.placeholder.com/150/mental/sertraline.jpg",
  description: "Helps with anxiety, depression, and OCD symptoms.",
},
{
  name: "Lorazepam",
  category: "Mental Health",
  price: 250,
  image: "https://via.placeholder.com/150/mental/lorazepam.jpg",
  description: "Provides relief from severe anxiety and panic disorders.",
},
{
  name: "Risperidone",
  category: "Mental Health",
  price: 300,
  image: "https://via.placeholder.com/150/mental/risperidone.jpg",
  description: "Used to manage schizophrenia and bipolar disorders.",
},
{
  name: "Clozapine",
  category: "Mental Health",
  price: 350,
  image: "https://via.placeholder.com/150/mental/clozapine.jpg",
  description: "Treats resistant schizophrenia in mental health patients.",
},

// Pain Management
{
  name: "Paracetamol",
  category: "Pain Management",
  price: 50,
  image: "https://via.placeholder.com/150/pain/paracetamol.jpg",
  description: "Relieves mild to moderate pain and fever.",
},
{
  name: "Tramadol",
  category: "Pain Management",
  price: 180,
  image: "https://via.placeholder.com/150/pain/tramadol.jpg",
  description: "Treats moderate to severe pain effectively.",
},
{
  name: "Diclofenac",
  category: "Pain Management",
  price: 150,
  image: "https://via.placeholder.com/150/pain/diclofenac.jpg",
  description: "Provides relief from inflammation and pain.",
},
{
  name: "Codeine",
  category: "Pain Management",
  price: 220,
  image: "https://via.placeholder.com/150/pain/codeine.jpg",
  description: "An opioid painkiller for severe pain management.",
},
{
  name: "Ibuprofen",
  category: "Pain Management",
  price: 100,
  image: "https://via.placeholder.com/150/pain/ibuprofen.jpg",
  description: "Reduces inflammation and alleviates pain.",
},
// Fever
{
  name: "Paracetamol",
  category: "Fever",
  price: 60,
  image: "https://via.placeholder.com/150/fever/paracetamol.jpg",
  description: "A common antipyretic to reduce fever and alleviate pain.",
},
{
  name: "Aspirin",
  category: "Fever",
  price: 80,
  image: "https://via.placeholder.com/150/fever/aspirin.jpg",
  description: "Reduces fever, pain, and inflammation.",
},
{
  name: "Ibuprofen",
  category: "Fever",
  price: 90,
  image: "https://via.placeholder.com/150/fever/ibuprofen.jpg",
  description: "Non-steroidal anti-inflammatory drug (NSAID) to treat fever.",
},
{
  name: "Acetaminophen",
  category: "Fever",
  price: 100,
  image: "https://via.placeholder.com/150/fever/acetaminophen.jpg",
  description: "Used to reduce fever and provide pain relief.",
},
{
  name: "Nimesulide",
  category: "Fever",
  price: 120,
  image: "https://via.placeholder.com/150/fever/nimesulide.jpg",
  description: "A mild painkiller and fever reducer with anti-inflammatory properties.",
},

// Vitamin Deficiencies
{
  name: "Vitamin D3",
  category: "Vitamin Deficiencies",
  price: 250,
  image: "https://via.placeholder.com/150/vitamin/vitamin-d3.jpg",
  description: "Helps treat vitamin D deficiency and promotes calcium absorption.",
},
{
  name: "Folic Acid",
  category: "Vitamin Deficiencies",
  price: 80,
  image: "https://via.placeholder.com/150/vitamin/folic-acid.jpg",
  description: "Prevents folate deficiency and promotes healthy fetal development.",
},
{
  name: "Vitamin B12",
  category: "Vitamin Deficiencies",
  price: 150,
  image: "https://via.placeholder.com/150/vitamin/vitamin-b12.jpg",
  description: "Used to treat vitamin B12 deficiency and boost energy.",
},
{
  name: "Vitamin C",
  category: "Vitamin Deficiencies",
  price: 100,
  image: "https://via.placeholder.com/150/vitamin/vitamin-c.jpg",
  description: "Helps prevent scurvy and boosts immune system function.",
},
{
  name: "Vitamin A",
  category: "Vitamin Deficiencies",
  price: 200,
  image: "https://via.placeholder.com/150/vitamin/vitamin-a.jpg",
  description: "Treats vitamin A deficiency and improves vision.",
},

// Kidney Disorders
{
  name: "Furosemide",
  category: "Kidney Disorders",
  price: 120,
  image: "https://via.placeholder.com/150/kidney/furosemide.jpg",
  description: "A diuretic used to reduce fluid retention and treat high blood pressure.",
},
{
  name: "Lisinopril",
  category: "Kidney Disorders",
  price: 150,
  image: "https://via.placeholder.com/150/kidney/lisinopril.jpg",
  description: "An ACE inhibitor for managing high blood pressure and kidney diseases.",
},
{
  name: "Losartan",
  category: "Kidney Disorders",
  price: 200,
  image: "https://via.placeholder.com/150/kidney/losartan.jpg",
  description: "Helps in the treatment of high blood pressure and chronic kidney disease.",
},
{
  name: "Calcium Carbonate",
  category: "Kidney Disorders",
  price: 90,
  image: "https://via.placeholder.com/150/kidney/calcium-carbonate.jpg",
  description: "Treats low calcium levels and supports kidney health.",
},
{
  name: "Erythropoietin",
  category: "Kidney Disorders",
  price: 350,
  image: "https://via.placeholder.com/150/kidney/erythropoietin.jpg",
  description: "Stimulates red blood cell production in kidney disease patients.",
},

// Liver Disorders
{
  name: "Silymarin",
  category: "Liver Disorders",
  price: 180,
  image: "https://via.placeholder.com/150/liver/silymarin.jpg",
  description: "A natural supplement to support liver health and detoxification.",
},
{
  name: "Ursodeoxycholic Acid",
  category: "Liver Disorders",
  price: 250,
  image: "https://via.placeholder.com/150/liver/ursodeoxycholic-acid.jpg",
  description: "Helps manage gallstones and liver diseases.",
},
{
  name: "Lactulose",
  category: "Liver Disorders",
  price: 120,
  image: "https://via.placeholder.com/150/liver/lactulose.jpg",
  description: "A laxative used to treat constipation and reduce ammonia levels in the blood.",
},
{
  name: "Enalapril",
  category: "Liver Disorders",
  price: 140,
  image: "https://via.placeholder.com/150/liver/enalapril.jpg",
  description: "Treats high blood pressure and protects kidney and liver functions.",
},
{
  name: "Diuretics",
  category: "Liver Disorders",
  price: 100,
  image: "https://via.placeholder.com/150/liver/diuretics.jpg",
  description: "Helps remove excess fluid in liver disease-related conditions.",
},

// Neurological Disorders
{
  name: "Gabapentin",
  category: "Neurological Disorders",
  price: 220,
  image: "https://via.placeholder.com/150/neuro/gabapentin.jpg",
  description: "Used for nerve pain and seizures.",
},
{
  name: "Carbamazepine",
  category: "Neurological Disorders",
  price: 180,
  image: "https://via.placeholder.com/150/neuro/carbamazepine.jpg",
  description: "Treats epilepsy and nerve-related pain.",
},
{
  name: "Donepezil",
  category: "Neurological Disorders",
  price: 300,
  image: "https://via.placeholder.com/150/neuro/donepezil.jpg",
  description: "Used to treat Alzheimer's disease and improve cognition.",
},
{
  name: "Levodopa",
  category: "Neurological Disorders",
  price: 350,
  image: "https://via.placeholder.com/150/neuro/levodopa.jpg",
  description: "A medication used to treat Parkinson’s disease symptoms.",
},
{
  name: "Topiramate",
  category: "Neurological Disorders",
  price: 250,
  image: "https://via.placeholder.com/150/neuro/topiramate.jpg",
  description: "Used to treat seizures and prevent migraines.",
},

// Cancer
{
  name: "Methotrexate",
  category: "Cancer",
  price: 400,
  image: "https://via.placeholder.com/150/cancer/methotrexate.jpg",
  description: "A chemotherapy drug used to treat cancer and autoimmune diseases.",
},
{
  name: "Cisplatin",
  category: "Cancer",
  price: 450,
  image: "https://via.placeholder.com/150/cancer/cisplatin.jpg",
  description: "Treats various types of cancer by inhibiting cancer cell growth.",
},
{
  name: "Doxorubicin",
  category: "Cancer",
  price: 500,
  image: "https://via.placeholder.com/150/cancer/doxorubicin.jpg",
  description: "A chemotherapy drug to treat cancers like leukemia, lymphoma, and more.",
},
{
  name: "Tamoxifen",
  category: "Cancer",
  price: 600,
  image: "https://via.placeholder.com/150/cancer/tamoxifen.jpg",
  description: "Used in hormone therapy for breast cancer treatment.",
},
{
  name: "Imatinib",
  category: "Cancer",
  price: 700,
  image: "https://via.placeholder.com/150/cancer/imatinib.jpg",
  description: "A targeted therapy used for chronic myelogenous leukemia (CML).",
},

// Eye Care
{
  name: "Latanoprost",
  category: "Eye Care",
  price: 250,
  image: "https://via.placeholder.com/150/eye/latanoprost.jpg",
  description: "Treats glaucoma by reducing intraocular pressure.",
},
{
  name: "Timolol",
  category: "Eye Care",
  price: 150,
  image: "https://via.placeholder.com/150/eye/timolol.jpg",
  description: "Reduces pressure in the eyes, treating glaucoma.",
},
{
  name: "Brimonidine",
  category: "Eye Care",
  price: 300,
  image: "https://via.placeholder.com/150/eye/brimonidine.jpg",
  description: "Helps manage intraocular pressure and eye redness.",
},
{
  name: "Cyclosporine",
  category: "Eye Care",
  price: 350,
  image: "https://via.placeholder.com/150/eye/cyclosporine.jpg",
  description: "Treats dry eye disease by increasing tear production.",
},
{
  name: "Prednisolone",
  category: "Eye Care",
  price: 200,
  image: "https://via.placeholder.com/150/eye/prednisolone.jpg",
  description: "A corticosteroid used to treat inflammation in eye diseases.",
},
];

