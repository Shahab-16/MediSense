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

export const images = {
  doctor1,
  appStore,
  playStore,
  modelSectionImage,
  Cancel_Icon,
  register
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
]