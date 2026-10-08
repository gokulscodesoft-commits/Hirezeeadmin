import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/banner2.jpg";
import rajanResume from "../assets/resumes/rajan_resume.pdf";

// Chart Data
export const chartData = [
  { month: "Jan", seeker: 200, recruiter: 150 },
  { month: "Feb", seeker: 350, recruiter: 300 },
  { month: "Mar", seeker: 500, recruiter: 450 },
  { month: "Apr", seeker: 400, recruiter: 380 },
  { month: "May", seeker: 250, recruiter: 200 },
  { month: "Jun", seeker: 700, recruiter: 600 },
  { month: "Jul", seeker: 500, recruiter: 420 },
  { month: "Aug", seeker: 300, recruiter: 200 },
  { month: "Sep", seeker: 480, recruiter: 410 },
  { month: "Oct", seeker: 350, recruiter: 300 },
  { month: "Nov", seeker: 600, recruiter: 500 },
  { month: "Dec", seeker: 250, recruiter: 200 },
];

// Recruiter List
export const recruiters = [
  {
    id: 1,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 2,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
  {
    id: 3,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 4,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 5,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
];

// Seeker List
export const seekers = [
  {
    id: 1,
    user: "Rajan",
    Specialization: "Biology",
    mail: "rajan@gmail.com",
    phoneNo: "+91-9876543210",
    pincodeNo: "608 502",
    status: "Seeking",
  },
  {
    id: 2,
    user: "Anbu",
    Specialization: "Mathematics",
    mail: "gnbu@gmail.com",
    phoneNo: "+91-9876543210",
    pincodeNo: "608 502",
    status: "Not Seeking",
  },
  {
    id: 3,
    user: "Guna",
    Specialization: "Physics",
    mail: "guna@gmail.com",
    phoneNo: "+91-9876543210",
    pincodeNo: "608 502",
    status: "Seeking",
  },
  {
    id: 4,
    user: "Senthil",
    Specialization: "Chemistry",
    mail: "senthil@gmail.com",
    phoneNo: "+91-9876543210",
    pincodeNo: "608 502",
    status: "Seeking",
  },
  {
    id: 5,
    user: "Velu",
    Specialization: "English",
    mail: "velu@gmail.com",
    phoneNo: "+91-9876543210",
    pincodeNo: "608 502",
    status: "Not Seeking",
  },
];

// Membership plan schemas
export const membershipSchemas = {
  "Free-Trial": {
    name: "Free-Trial",
    price: "₹ 0",
    timespan: "Monthly", // fixed
    content: [
      "Limited access to Seeker Data",
      "Explore Free Users",
      "Basic Support",
    ],
  },
  Basic: {
    name: "Basic",
    price: "₹ 500",
    timespan: "Monthly", // default (can also be Annual)
    content: [
      "Restricted access to Seeker Data",
      "Explore Basic Users",
      "Email Support",
    ],
  },
  Advance: {
    name: "Advance",
    price: "₹ 1400",
    timespan: "Monthly", // default (can also be Annual)
    content: [
      "Unlimited access to Seeker Data",
      "Export Seeker Data",
      "Explore All Users",
      "Priority Email Support",
    ],
  },
  Premium: {
    name: "Premium",
    price: "₹ 3000",
    timespan: "Monthly", // default (can also be Annual)
    content: [
      "All Advance features",
      "Priority Support (Phone & Email)",
      "Exclusive Reports",
      "Advanced Analytics",
    ],
  },
  Enterprise: {
    name: "Enterprise",
    price: "₹ 5000",
    timespan: "Annual", // default (enterprise is usually yearly)
    content: [
      "All Premium features",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Support",
    ],
  },
};

// Subscribers list derived from schemas
export const subscribers = [
  {
    id: 1,
    ...membershipSchemas["Free-Trial"],
    postedOn: "13 April 2025",
    membership: "Free-Trial",
  },
  {
    id: 2,
    ...membershipSchemas["Basic"],
    postedOn: "13 April 2025",
    membership: "Basic",
  },
  {
    id: 3,
    ...membershipSchemas["Advance"],
    postedOn: "13 April 2025",
    membership: "Advance",
  },
  {
    id: 4,
    ...membershipSchemas["Premium"],
    postedOn: "13 April 2025",
    membership: "Premium",
  },
  {
    id: 5,
    ...membershipSchemas["Enterprise"],
    postedOn: "13 April 2025",
    membership: "Enterprise",
  },
];




// banner list
export const banners = [
  {
    id: 1,
    image: banner1,
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    image: banner2,
    postedOn: "13 April 2025",
    createdBy: "Admin",
  }
];

// seekerSearchFilter list
export const seekerSearch = [
  {
    id: 1,
    specifications: "Location",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    specifications: "Experience",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    specifications: "Education Qualification",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 4,
    specifications: "Compartment Level",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 5,
    specifications: "Subject",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 6,
    specifications: "Expected Salary",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
];

// src/data/contentData.js
export const seekerData = [
  { id: 1, user: "Rajan", Specialization: "Biology", mail: "rajan@gmail.com", phoneNo: "+91-9876543210", pincodeNo: "608502", status: "Seeking", resume: rajanResume },
  { id: 2, user: "Anbu", Specialization: "Mathematics", mail: "anbu@gmail.com", phoneNo: "+91-9876543211", pincodeNo: "608502", status: "Not Seeking", resume: "/resumes/anbu_resume.pdf" },
  { id: 3, user: "Guna", Specialization: "Physics", mail: "guna@gmail.com", phoneNo: "+91-9876543212", pincodeNo: "608503", status: "Seeking", resume: "/resumes/guna_resume.pdf" },
  { id: 4, user: "Senthil", Specialization: "Chemistry", mail: "senthil@gmail.com", phoneNo: "+91-9876543213", pincodeNo: "608504", status: "Seeking", resume: "/resumes/senthil_resume.pdf" },
  { id: 5, user: "Velu", Specialization: "English", mail: "velu@gmail.com", phoneNo: "+91-9876543214", pincodeNo: "608505", status: "Not Seeking", resume: "/resumes/velu_resume.pdf" },
  { id: 6, user: "Kumar", Specialization: "Computer Science", mail: "kumar@gmail.com", phoneNo: "+91-9876543215", pincodeNo: "600001", status: "Seeking", resume: "/resumes/kumar_resume.pdf" },
  { id: 7, user: "Muthu", Specialization: "History", mail: "muthu@gmail.com", phoneNo: "+91-9876543216", pincodeNo: "600002", status: "Not Seeking", resume: "/resumes/muthu_resume.pdf" },
  { id: 8, user: "Priya", Specialization: "Economics", mail: "priya@gmail.com", phoneNo: "+91-9876543217", pincodeNo: "600003", status: "Seeking", resume: "/resumes/priya_resume.pdf" },
  { id: 9, user: "Sathya", Specialization: "Political Science", mail: "sathya@gmail.com", phoneNo: "+91-9876543218", pincodeNo: "600004", status: "Not Seeking", resume: "/resumes/sathya_resume.pdf" },
  { id: 10, user: "Deepa", Specialization: "Zoology", mail: "deepa@gmail.com", phoneNo: "+91-9876543219", pincodeNo: "600005", status: "Seeking", resume: "/resumes/deepa_resume.pdf" },
  { id: 11, user: "Arun", Specialization: "Mathematics", mail: "arun@gmail.com", phoneNo: "+91-9876543220", pincodeNo: "608502", status: "Seeking", resume: "/resumes/arun_resume.pdf" },
  { id: 12, user: "Divya", Specialization: "Physics", mail: "divya@gmail.com", phoneNo: "+91-9876543221", pincodeNo: "608503", status: "Not Seeking", resume: "/resumes/divya_resume.pdf" },
  { id: 13, user: "Ramesh", Specialization: "Chemistry", mail: "ramesh@gmail.com", phoneNo: "+91-9876543222", pincodeNo: "608504", status: "Seeking", resume: "/resumes/ramesh_resume.pdf" },
  { id: 14, user: "Shanthi", Specialization: "English", mail: "shanthi@gmail.com", phoneNo: "+91-9876543223", pincodeNo: "608505", status: "Seeking", resume: "/resumes/shanthi_resume.pdf" },
  { id: 15, user: "Karthik", Specialization: "Computer Science", mail: "karthik@gmail.com", phoneNo: "+91-9876543224", pincodeNo: "600001", status: "Not Seeking", resume: "/resumes/karthik_resume.pdf" },
  { id: 16, user: "Mani", Specialization: "History", mail: "mani@gmail.com", phoneNo: "+91-9876543225", pincodeNo: "600002", status: "Seeking", resume: "/resumes/mani_resume.pdf" },
  { id: 17, user: "Anitha", Specialization: "Economics", mail: "anitha@gmail.com", phoneNo: "+91-9876543226", pincodeNo: "600003", status: "Not Seeking", resume: "/resumes/anitha_resume.pdf" },
  { id: 18, user: "Vikram", Specialization: "Political Science", mail: "vikram@gmail.com", phoneNo: "+91-9876543227", pincodeNo: "600004", status: "Seeking", resume: "/resumes/vikram_resume.pdf" },
  { id: 19, user: "Rekha", Specialization: "Zoology", mail: "rekha@gmail.com", phoneNo: "+91-9876543228", pincodeNo: "600005", status: "Not Seeking", resume: "/resumes/rekha_resume.pdf" },
  { id: 20, user: "Suresh", Specialization: "Biology", mail: "suresh@gmail.com", phoneNo: "+91-9876543229", pincodeNo: "608502", status: "Seeking", resume: "/resumes/suresh_resume.pdf" },
];



// jobPostFilter
export const jobPostFilter = [
  {
    id: 1,
    specifications: "Job Role",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    specifications: "Subject",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    specifications: "Work Type",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 4,
    specifications: "Experience",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 5,
    specifications: "Compartment Level",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 6,
    specifications: "Education Qualification",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 7,
    specifications: "Expected Salary",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  // {
  //   id: 8,
  //   specifications: "Pincode",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  // {
  //   id: 9,
  //   specifications: "Number Of Opening",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  {
    id: 8,
    specifications: "End-Date",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
];

// recruiterProfile
export const recruiterProfile = [
  {
    id: 1,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 2,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
  {
    id: 3,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 4,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 5,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
  {
    id: 6,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
  {
    id: 7,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 8,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Basic",
  },
  {
    id: 9,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
  {
    id: 10,
    school: "CK CBSE",
    email: "ckschool@gmail.com",
    phone: "+91-9876543210",
    pincode: "608 502",
    membership: "Advanced",
  },
];

// seeker filters route map
export const seekerFilterRoutes = {
  "Experience": "/dashboard/seeker-search-filter/experience",
  "Education Qualification": "/dashboard/seeker-search-filter/education",
  "Compartment / Level": "/dashboard/seeker-search-filter/compartment",
  "Location": "/dashboard/seeker-search-filter/location",
  "Expected Salary": "/dashboard/seeker-search-filter/salary",
  "Languages": "/dashboard/seeker-search-filter/Languages",
  "Qualification Specialization": "/dashboard/seeker-search-filter/qualification-specification",
};

// main search list
export const seekerSearchPages = [
  {
    id: 1,
    specifications: "Location",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    specifications: "Experience",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },

  {
    id: 3,
    specifications: "Education Qualification",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 4,
    specifications: "Compartment / Level",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 8,
    specifications: "Expected Salary",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 9,
    specifications: "Languages",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 10,
    specifications: "Qualification Specialization",
    postedOn: "21 July 2026",
    createdBy: "Admin",
  },
];

// experience schema
export const experienceFilters = [
  { id: 1, specification: "No Experience", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, specification: "1 - 5 years", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, specification: "5 - 10 years", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, specification: "More than 10 years", postedOn: "13 April 2025", createdBy: "Admin" },
];

// education qualification schema
export const educationQualificationFilter = [
  { id: 1, qualification: "D.Ed / D.T.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, qualification: "B.Ed + Any Bachelor's Degree", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, qualification: "B.A / B.Sc + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, qualification: "B.Com + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, qualification: "M.A / M.Sc + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 6, qualification: "M.A / M.Sc + M.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 7, qualification: "BCA / MCA + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 8, qualification: "NTT + 12th Pass", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 9, qualification: "B.F.A + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 10, qualification: "B.P.Ed / M.P.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 11, qualification: "Ph.D + M.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 12, qualification: "M.Com + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
];

// compartment level schema
export const compartmentLevelFilter = [
  { id: 1, level: "Pre-Primary (Nursery to UKG)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, level: "Primary (Classes 1-5)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, level: "Upper Primary (Classes 6-8)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, level: "Secondary (Classes 9-10)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, level: "Higher Secondary (Classes 11-12)", postedOn: "13 April 2025", createdBy: "Admin" },
];

// subject schema
export const subjectFilter = [
  { id: 1, name: "Mathematics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, name: "English", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, name: "Science", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, name: "Social Studies", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, name: "Computer Science", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 6, name: "Physics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 7, name: "Chemistry", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 8, name: "Biology", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 9, name: "Economics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 10, name: "History", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 11, name: "Geography", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 12, name: "Political Science", postedOn: "13 April 2025", createdBy: "Admin" },
];

//ExpectedSalaryFilter
export const expectedSalaryFilter = [
  {
    id: 1,
    range: "₹10,000 - ₹20,000",
    postedOn: "14 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    range: "₹20,000 - ₹30,000",
    postedOn: "14 April 2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    range: "₹30,000 - ₹40,000",
    postedOn: "14 April 2025",
    createdBy: "Admin",
  },
  {
    id: 4,
    range: "₹40,000 - ₹50,000",
    postedOn: "14 April 2025",
    createdBy: "Admin",
  },
];

// recruiterJobsData

export const recruiterJobsData = [
  {
    id: 1,
    jobName: "Science Teacher",
    postedDate: "15 April 2025",
    applicants: 550,
    alInvite: 50,
    selected: 5,
    status: "Active",
  },
  {
    id: 2,
    jobName: "English Teacher",
    postedDate: "01 March 2025",
    applicants: 582,
    alInvite: 40,
    selected: 5,
    status: "Closed",
  },
  {
    id: 3,
    jobName: "Tamil Teacher",
    postedDate: "13 April 2025",
    applicants: 640,
    alInvite: 30,
    selected: 3,
    status: "Active",
  },
  {
    id: 4,
    jobName: "Social Teacher",
    postedDate: "01 March 2025",
    applicants: 253,
    alInvite: 20,
    selected: 2,
    status: "Expired",
  },
  {
    id: 5,
    jobName: "Hindi Teacher",
    postedDate: "10 April 2025",
    applicants: 913,
    alInvite: 10,
    selected: 1,
    status: "Active",
  },
];

// job post filters route map
export const jobPostFilterRoutes = {
  "Job Role": "/dashboard/job-post-filter/jobrole",
  "Subject": "/dashboard/job-post-filter/subject",
  "Work Type": "/dashboard/job-post-filter/worktype",
  "Experience": "/dashboard/job-post-filter/experience",
  "Compartment Level": "/dashboard/job-post-filter/compartment",
  "Education Qualification": "/dashboard/job-post-filter/education",
  "Expected Salary": "/dashboard/job-post-filter/salary",
  // "Pincode": "/dashboard/job-post-filter/pincode",
  // "Number Of Opening": "/dashboard/job-post-filter/openings",
  "End-Date": "/dashboard/job-post-filter/enddate",
};

// main job post search list
export const jobPostSearchPages = [
  {
    id: 1,
    specifications: "Job Role",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    specifications: "Subject",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    specifications: "Work Type",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  // {
  //   id: 4,
  //   specifications: "Experience",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  {
    id: 4,
    specifications: "Compartment Level",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 5,
    specifications: "Education Qualification",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  // {
  //   id: 7,
  //   specifications: "Expected Salary",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  // {
  //   id: 8,
  //   specifications: "Pincode",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  // {
  //   id: 9,
  //   specifications: "Number Of Opening",
  //   postedOn: "13 April 2025",
  //   createdBy: "Admin",
  // },
  {
    id: 8,
    specifications: "End-Date",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
];

// experience schema
export const jobPostExperienceFilters = [
  { id: 1, experience: "Min", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, experience: "Max", postedOn: "13 April 2025", createdBy: "Admin" }
];

// education qualification schema
export const jobPostEducationQualificationFilter = [
  { id: 1, qualification: "D.Ed / D.T.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, qualification: "B.Ed + Any Bachelor's Degree", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, qualification: "B.A / B.Sc + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, qualification: "B.Com + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, qualification: "M.A / M.Sc + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 6, qualification: "M.A / M.Sc + M.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 7, qualification: "BCA / MCA + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 8, qualification: "NTT + 12th Pass", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 9, qualification: "B.F.A + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 10, qualification: "B.P.Ed / M.P.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 11, qualification: "Ph.D + M.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 12, qualification: "M.Com + B.Ed", postedOn: "13 April 2025", createdBy: "Admin" },
];

// compartment level schema
export const jobPostCompartmentLevel = [
  { id: 1, level: "Pre-Primary (Nursery to UKG)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, level: "Primary (Classes 1-5)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, level: "Upper Primary (Classes 6-8)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, level: "Secondary (Classes 9-10)", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, level: "Higher Secondary (Classes 11-12)", postedOn: "13 April 2025", createdBy: "Admin" },
];

// subject schema
export const jobPostSubjectFilter = [
  { id: 1, name: "Mathematics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, name: "English", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, name: "Science", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, name: "Social Studies", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, name: "Computer Science", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 6, name: "Physics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 7, name: "Chemistry", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 8, name: "Biology", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 9, name: "Economics", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 10, name: "History", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 11, name: "Geography", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 12, name: "Political Science", postedOn: "13 April 2025", createdBy: "Admin" },
];

// expected salary schema
export const jobPostExpectedSalary = [
  { id: 1, expectedSalary: "Min", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, expectedSalary: "Max", postedOn: "13 April 2025", createdBy: "Admin" }
];

// End Date schema
export const endDateFilter = [
  { id: 1, endDate: "15 Days", postedOn: "13 April 2025", createdBy: "Admin" },
  // { id: 2, endDate: "30 Days", postedOn: "13 April 2025", createdBy: "Admin" },
  // { id: 3, endDate: "45 Days", postedOn: "13 April 2025", createdBy: "Admin" },
  // { id: 4, endDate: "60 Days", postedOn: "13 April 2025", createdBy: "Admin" },
];

// Work Type schema
export const workTypeFilter = [
  { id: 1, type: "Full Time", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 2, type: "Part Time", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 3, type: "Guest Lecturer", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 4, type: "Contract Basis", postedOn: "13 April 2025", createdBy: "Admin" },
  { id: 5, type: "Internship", postedOn: "13 April 2025", createdBy: "Admin" },
];

export const educationFilter = [
  {
    id: 1,
    filter: "Highest Education",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 2,
    filter: "Teaching Qualification",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
  {
    id: 3,
    filter: "Specialization",
    postedOn: "13 April 2025",
    createdBy: "Admin",
  },
];

export const jobRoleFilter = [
  {
    id: 1,
    filter: "Job Categories",
    postedOn: "2 July 2026",
    createdBy: "Admin",
  },
];


export const highestEducationDegrees = [
  { id: 1, degree: "B.Sc", postedOn: "13 April 2025", updatedOn: "-" },
  { id: 2, degree: "M.Sc", postedOn: "13 April 2025", updatedOn: "-" },
  { id: 3, degree: "B.A", postedOn: "14 April 2025", updatedOn: "-" },
  { id: 4, degree: "M.A", postedOn: "14 April 2025", updatedOn: "-" },
];

export const teachingQualificationDegrees = [
  { id: 1, degree: "D.Ed / D.T.Ed", postedOn: "13 April 2025", updatedOn: "-" },
  { id: 2, degree: "B.Ed + Any Bachelor's Degree", postedOn: "13 April 2025", updatedOn: "-" },
  { id: 3, degree: "B.A / B.Sc + B.Ed", postedOn: "14 April 2025", updatedOn: "-" },
  { id: 4, degree: "M.A / M.Sc + B.Ed", postedOn: "14 April 2025", updatedOn: "-" },
];
