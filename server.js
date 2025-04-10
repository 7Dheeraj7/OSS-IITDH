//To store Pinata API keys in the backend so they wont be availabe from the frontend
require('dotenv').config();
//We need express so we can define backend routes simpler and efficiently
const express = require('express');
//Axios is used for sending POST requests to the Pinata API to upload data to IPFS.
const axios = require('axios');
//Allows my frontend and backend running on different ports to interact
const cors = require('cors');
// Assigning unique IDs to course registrations.
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors());
app.use(express.json());

const gateway = "https://<ENTER-YOUR-GATEWAY-DOMAIN>/ipfs";
//Takes student name, date of birth, and phone number, creates an identity metadata JSON, and uploads it to IPFS via Pinata.
app.post('/upload-to-ipfs', async (req, res) => {
  try {
    const { name, dob, phone } = req.body;

    //creating the metadata json object in IPFS format.
    const metadata = {
        pinataMetadata: { name: "StudentIdentity" },
        pinataContent: {
          name: "Id_card NFT",
          description: "This NFT contains the student's identity details.",
          image: "https://teal-managing-gull-42.mypinata.cloud/ipfs/bafybeiekdornr2ct4frv4aiyk2tq5laenbcfbp3spmxegozvvvciuwkc6i/DomainLogo-V1B.png",  
          attributes: [
            { trait_type: "Name", value: name },
            { trait_type: "DOB", value: dob },
            { trait_type: "Phone", value: phone }
          ]
        }
      };
//Posting the data to pinata and waiting for the response
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
        }
      }
    );

    //The url returned from pinata of the stored data.
    const ipfsURL = `${gateway}/${response.data.IpfsHash}`;
    res.json({ ipfsURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload to IPFS" });
  }
});


//Takes cert_type (course or degree) and an acknowledgment message.
app.post('/upload-certificate', async (req, res) => {
    try {
      const {cert_type,message } = req.body;

        //creating the metadata json object in IPFS format.
      let metadata;
      //The metadata is different for course and degree so we need if condition to do it.
      if (cert_type === "degree") {
         metadata = {
            pinataMetadata: { name: "Certificate of Completion of degree" },
            pinataContent: {
              name: "Degree Completion Certificate",
              description: "This NFT contains the student's degree completion certificate",
              image: "https://teal-managing-gull-42.mypinata.cloud/ipfs/bafybeiekdornr2ct4frv4aiyk2tq5laenbcfbp3spmxegozvvvciuwkc6i/DomainLogo-V1B.png",  
              attributes: [
                { trait_type: "acknowledgment", value: message }
              ]
            }
          };
      } 
      else {
        metadata = {
            pinataMetadata: { name: "Certificate of Completion of course" },
            pinataContent: {
              name: "Course Completion Certificate",
              description: "This NFT contains the student's course completion certificate.",
              image: "https://teal-managing-gull-42.mypinata.cloud/ipfs/bafybeiekdornr2ct4frv4aiyk2tq5laenbcfbp3spmxegozvvvciuwkc6i/DomainLogo-V1B.png",  
              attributes: [
                { trait_type: "acknowledgment", value: message }
              ]
            }
          };
      }

      
  //Posting the metadata to pinata and waiting for the response
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
          }
        }
      );
  
       //The url returned from pinata of the stored data.
      const ipfsURL = `${gateway}/${response.data.IpfsHash}`;
      res.json({ ipfsURL });
    } catch (err) {
      console.error("Certificate upload failed", err);
      res.status(500).json({ error: "Failed to upload certificate to IPFS" });
    }
  });
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



  
//Takes student name, semester, and amount, generates a metadata receipt, and uploads it to IPFS.
  app.post('/upload-semester-fee', async (req, res) => {
    try {
      const { name, semester, amount } = req.body;
      const now = new Date();
      const formattedDate = now.toISOString().replace("T", " ").substring(0, 16);
      
      //creating the metadata json object in IPFS format.
      const metadata = {
        pinataMetadata: { name: "SemesterFeeNFT" },

        pinataContent:{
        "name": "Semester Fee Receipt",
        "description": "NFT receipt for fee payment of semester - " + semester + ".",
        "image": "https://teal-managing-gull-42.mypinata.cloud/ipfs/bafybeiekdornr2ct4frv4aiyk2tq5laenbcfbp3spmxegozvvvciuwkc6i/DomainLogo-V1B.png",
        "attributes": [
            { "trait_type": "Student", "value": name },
            { "trait_type": "Amount", "value": amount },
            { "trait_type": "Semester", "value": semester },
            {"trait_type":"date" , "value": formattedDate}
        ]
    }
    
};

     
    //Posting the metadata to pinata and waiting for the response
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
          }
        }
      );
  
       //The url returned from pinata of the stored data.
      const ipfsURL = `${gateway}/${response.data.IpfsHash}`;
      res.json({ ipfsURL });
    } catch (err) {
      console.error("Semester fee upload failed", err);
      res.status(500).json({ error: "Failed to upload semester fee to IPFS" });
    }
  });
  



  //Defining the courses that the student needs to select from
let courses = [
    { id: 'CS426', name: 'Introduction to Blockchains' },
    { id: 'CS410', name: 'Parellel Computing' },
    { id: 'CS348', name: 'Computer Networks' },
    { id: 'CE301', name: 'Environmental Studies' }
  ];
  //An empty list to store the selected courses
  let registrations = [];
  
  //Returns a list of available courses.
  app.get('/courses', (req, res) => {
    res.json(courses);
  });
  
  //Accepts stu_name, wal_addr, and an array of sel_cour.
  //Stores them in memory (registrations array) with a timestamp and unique ID.
  app.post('/register-courses', (req, res) => {
    registrations = []
    const { stu_name, wal_addr, sel_cour } = req.body;
  
    if (!stu_name || !wal_addr || !sel_cour) {
      return res.status(400).json({ error: 'Missing fields' });
    }
  
    //Add the selected course with unique id,timestamp and other metadata.
    registrations.push({
      id: uuidv4(),
      stu_name,
      wal_addr,
      sel_cour,
      timestamp: new Date().toISOString()
    });
  
    res.json({ success: true, message: 'Courses registered successfully' });
  });


  //Takes a wallet address and returns the names of the courses that wallet is registered for.
  app.get('/registered-courses', (req, res) => {
    const wallet = req.query.wallet;
    if (!wallet) return res.status(400).json({ error: 'Missing wallet address' });
  
    //Getting the data from the registrations with wallet address as index.
    const user_reg = registrations.filter(r => r.wal_addr === wallet);
    const course_ids = user_reg.flatMap(r => r.sel_cour);
  
  //Returning the courses to the frontend
    const courseNames = course_ids.map(id => {
      const course = courses.find(c => c.id === id);
      return course ? course.name : id;
    });
  
    res.json(courseNames);
  });
  


//Inintializing a empty list to store feedbacks
  let feedbacks = [];
//Accepts feedback about a meal (e.g., "lunch", "dinner") and stores it in memory.
app.post('/submit-feedback', (req, res) => {
  const { meal, feedback } = req.body;
  if (!meal || !feedback) {
    return res.status(400).json({ message: "Missing fields" });
  }

  //Pushing the recieved feedbacks to the feedback list.
  feedbacks.push({ meal, feedback, timestamp: new Date().toISOString() });
  console.log("Feedback Received:", feedbacks[feedbacks.length - 1]);
  res.json({ success: true, message: "Thank you for your feedback!" });
});



//To submit work requests.
app.post('/submit-work-request', (req, res) => {
  const data = req.body;
  console.log("Received work request:", data);


  res.json({ message: "Work request received successfully!" });
});

