require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user"); // Document (model instance)
const Project = require("./model/project");
const Image = require("./model/image");
const cors = require("cors"); // allow frontend to make requests to backend on different origins
const bcrypt = require("bcryptjs"); //password hasher
// const { resourceLimits } = require("worker_threads");
const jwt = require("jsonwebtoken");
// Very sensitive - keep safe.
const JWT_SECRET_KEY = "mv(3jfoa.@01va(Adup";
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/login-app-db";
const moment = require("moment");
// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
// Upload Images
const multer = require("multer");
const fs = require("fs");
let FormData = require("form-data");
// AWS Stuff
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

// test route for MVC architecture
const userRoutes = require("./routes/user");

app.use("/user", userRoutes);

// const upload = multer ( { dest: 'uploads/'});

// To allow requests from client side server

// To allow the request body to be parsed

const ROLES = {
  Admin: 1000,
  Influencer: 2000,
  Brand: 3000,
};

// Establish connection
mongoose
  .connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Database connected at ${MONGOOSE_URL}`);
  })
  .catch((err) => console.log(err));

app.use("/", express.static(path.join(__dirname, "static")));

app.listen(port, () => {
  console.log(`Server is online at Port ${port}`);
});

// Multer Storage for Files
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// use the diskStorage from above
const maxSize = 2 * 1024 * 1024; // 2.09MB
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

// Single Image Upload
// app.post("/uploadimage", upload.single("avatar"), (req, res) => {
//   console.log("inside the upload image enpdoint");
//   const { file } = req.body;

//   console.log(file)

//   const saveImage = Image({
//     name: file.filename,
//     img: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });

//   saveImage
//     .save()
//     .then((res) => {
//       console.log("the image is successfully saved");
//     })
//     .catch((err) => {
//       console.log(err, "an error has occured");
//     });

//   res.send("image is saved");
// });

// Amazon S3 Bucket Middleware
async function generateUploadURL() {
  const region = "us-west-2";
  const bucketName = "colab-images";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID;

  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });

  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  return uploadURL;
}
// Amazon S3 Bucket Middleware
app.get("/api/s3", async (req, res) => {
  console.log("inside api/s3");
  const url = await generateUploadURL();
  res.send({ url });
});

// DEPRECATED - TO UPLOAD IMAGES MANUALLY ON POSTMAN
app.post("/api/uploadimage", upload.single("avatar"), async (req, res) => {
  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  // let tmp_path = req.file.path;
  const file = req.file;
  // Add the file to the Images Collection
  // const saveImage = Image({
  //   name: file.filename,
  //   img: {
  //     data: fs.readFileSync("uploads/" + req.file.filename),
  //     contentType: "image/png",
  //   },
  // });

  let imageID;
  try {
    const res = await Image.create({
      name: file.filename,
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    // Get the Image ID
    console.log("image was saved", res._id);
    imageID = res._id;
    // Return the image Id
  } catch (err) {
    console.log(err);
  }

  res.json({ data: imageID, status: "OK" });
});

// DEPRECATED - TO UPLOAD IMAGES MANUALLY ON POSTMAN
app.post("/api/getimage", async (req, res) => {
  const { imageID } = req.body;
  // const allData = await Image.find({});
  const imageData = await Image.findOne({ _id: imageID }).exec();
  console.log("imageData found", imageData);
  // res.json(imageData);
  res.json({ data: imageData, status: "OK" });
});

// Test Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to CoLab's Backend.");
});

// ENDPOINT #1 - USER SIGNUP
app.post("/api/register", async (req, res) => {
  console.log("Registration Received: req.body:", req.body);
  let {
    user,
    pwd: plainTextPwd,
    role,
    firstName,
    lastName,
    company,
  } = req.body;

  // Username / Password Validation
  if (!user || typeof user !== "string") {
    return res.json({ status: "error", error: "invalid username" });
  }

  if (!plainTextPwd || typeof plainTextPwd !== "string") {
    console.log(plainTextPwd);
    return res.json({ status: "error", error: "invalid password" });
  }

  // Initialize Role
  if (role.toLowerCase() === "influencer") {
    role = {
      Admin: null,
      Influencer: 2000,
      Brand: null,
    };
  } else if (role.toLowerCase() === "brand") {
    role = {
      Admin: null,
      Influencer: null,
      Brand: 3000,
    };
  } else if (role.toLowerCase() === "admin") {
    role = {
      Admin: 1000,
      Influencer: null,
      Brand: null,
    };
  }

  const encryptedPwd = await bcrypt.hash(plainTextPwd, 10); // 10 = how slow the algo will be

  // Create a record/document in the User model
  try {
    const res = await User.create({
      username: user,
      password: encryptedPwd,
      roles: role,
      firstName,
      lastName,
      company,
    });
    console.log("User was created successfully: ", res);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Username already in use!",
      });
    }
    throw err;
  }
  res.json({ status: "OK" });
});

// ENDPOINT #2 - USER LOGIN
app.post("/api/login", async (req, res) => {
  const { user, pwd } = req.body;
  console.log("Server received login request:", user, pwd);

  // Find the User record
  // .lean() returns a Plain Old Java Object (POJO) instead of the entire
  const userRecord = await User.findOne({ username: user }).exec();

  console.log("User in Database:", userRecord);

  if (!userRecord) {
    return res.json({
      status: "error",
      error: "Please double check the username and/or password.",
    });
  }

  // Compares the password and the hashed password
  if (await bcrypt.compare(pwd, userRecord.password)) {
    // Public information, do not put sensitive info.
    // The JWT signs the header/payload based on our signature.
    const roles = Object.values(userRecord.roles);
    const token = jwt.sign(
      {
        id: userRecord._id,
        username: userRecord.username,
        roles: roles,
      },
      JWT_SECRET_KEY
    );
    console.log(token);
    if (token) {
      console.log("Succesfully signed token");

      res.json({ status: "OK", token: token, roles: roles });
    } else {
      console.log("Did not sign token");
    }
  } else {
    console.log("inside the err2");
    return res.json({ status: "error" });
  }
});

// ENDPOINT #3 - CHANGE PASSWORD
app.post("/api/changepassword", async (req, res) => {
  const { oldPwd, newPwd, token } = req.body;
  console.log(oldPwd, newPwd, token);
  try {
    // verify the token - will throw error if not verified
    console.log("inside the try block");

    const user = jwt.verify(JSON.parse(token).data, JWT_SECRET_KEY);
    // TDL: check old password matches the hashed password
    // insert code here
    // TDL: check new password meets requirements via REGEX (extract out from Register)

    const newHashedPwd = await bcrypt.hash(newPwd, 10);
    console.log("Password was hashed:", newHashedPwd);
    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $set: { password: newHashedPwd },
      }
    );
    const userRecord = await User.findOne({ _id });
    console.log("Password was updated", userRecord);
    res.json({ status: "OK" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Get Profile Info - Get the User Information from the database
app.post("/api/getuser", async (req, res) => {
  console.log("Inside the Get Profile Endpoint");
  // Payload contains JWT and user
  console.log(req.body);
  const { token } = req.body;
  console.log(token);

  try {
    const [user, _id] = verifyJWT(token);
    const userRecord = await findUser(_id);

    console.log("User Record", user, _id, userRecord);

    res.json({ status: "OK", userProfile: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Get all the projects that do not have an influencer assigned
app.get("/api/searchprojects", async (req, res) => {
  try {
    console.log("getting all projects");

    // step 1: Return all Projects
    const allProjects = await Project.find({
      status: "no influencer assigned",
    });

    res.send(allProjects);
    // return the projects
  } catch (error) {
    console.log(error);
  }
});

// Get a single project based on its ID
app.post("/api/getproject", async (req, res) => {
  console.log("Inside the Get Project Endpoint");
  console.log(req.body);
  const { token, projectID } = req.body;

  console.log("Token:", token, "ProjectID:", projectID);

  try {
    const [user, _id] = verifyJWT(token);
    console.log("verified JWT");
    const projectRecord = await Project.findOne({
      _id: mongoose.Types.ObjectId(projectID),
    });
    console.log("Retrieved the project", projectRecord);
    res.json({ status: "getProject succeeded!", project: projectRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not find project" });
  }
});

// UPDATE PROFILE
app.post("/api/updateprofile", async (req, res) => {
  console.log("\n\n\n\n\n", "Inside the Update Profile Endpoint");

  const { token, instagram, tiktok, youtube, keywords } = req.body;

  console.log(token, instagram, tiktok, youtube, keywords);

  if (!keywords.length) {
    return res.json({
      status: "error",
      error: "Please enter at least one keyword!",
    });
  }

  try {
    // Verify the JWT
    const [user, _id] = verifyJWT(token);
    // todo: combine all tehse updateOnes into one update
    await User.updateOne(
      { _id },
      {
        $set: { instagram: instagram },
      }
    );
    await User.updateOne(
      { _id },
      {
        $set: { tiktok: tiktok },
      }
    );
    await User.updateOne(
      { _id },
      {
        $set: { youtube: youtube },
      }
    );
    await User.updateOne(
      { _id },
      {
        $set: { keywords: keywords },
      }
    );
    const userRecord = await findUser(_id);
    console.log("Updated user links:", user, _id, userRecord);

    res.json({ status: "OK", userProfile: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Add the Avatar ID to User Profile
app.post("/api/updateavatar", async (req, res) => {
  console.log("updating the user avatar");

  const { avatar, token } = req.body;
  console.log(avatar, token);

  try {
    // Verify the JWT
    const [user, _id] = verifyJWT(token);
    await User.updateOne(
      { _id },
      {
        $set: { avatar: avatar },
      }
    );
    await User.updateOne(
      { _id },
      {
        $set: { hasUpdatedProfile: true },
      }
    );
    const userRecord = await findUser(_id);
    console.log("User Updated Record:", user, _id, userRecord);
    res.json({ status: "OK", userProfile: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});
// Add the Media Kit to User Profile
app.post("/api/updatemediakit", async (req, res) => {
  console.log("updating the media kit");

  const { token, mediaKit } = req.body;
  console.log(token, mediaKit);

  try {
    // Verify the JWT
    const [user, _id] = verifyJWT(token);
    await User.updateOne(
      { _id },
      {
        $set: { mediaKit: mediaKit },
      }
    );
    await User.updateOne(
      { _id },
      {
        $set: { hasUpdatedProfile: true },
      }
    );
    const userRecord = await findUser(_id);
    console.log("User Updated Record:", user, _id, userRecord);
    res.json({ status: "OK", userProfile: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Create Project
app.post("/api/createproject", async (req, res) => {
  console.log("Inside the Create Project Endpoint");
  // Payload contains JWT and user
  console.log("req.body:", req.body);

  const {
    token,
    title,
    description,
    influencerAssigned,
    brandRepAssigned,
    deadline,
    instagramDeliverable,
    tiktokDeliverable,
    youtubeDeliverable,
    reviewDeadline,
    deadlineTime,
    numberOfRevisions,
    paymentMethod,
    paymentPrice,
    paymentProduct,
    keywords,
    hashtags,
    tags,
    phrases,
    linkInBio,
  } = req.body;

  console.log(
    "Received Request:",
    token,
    title,
    description,
    influencerAssigned,
    brandRepAssigned,
    deadline,
    instagramDeliverable,
    tiktokDeliverable,
    youtubeDeliverable,
    reviewDeadline,
    deadlineTime,
    numberOfRevisions,
    paymentMethod,
    paymentPrice,
    paymentProduct,
    keywords,
    hashtags,
    tags,
    phrases,
    linkInBio
  );

  let projectData;

  // Verify  project properties
  if (!title || typeof title !== "string") {
    return res.json({
      status: "error",
      error: "Project title input invalid",
    });
  }

  if (!brandRepAssigned || typeof title !== "string") {
    return res.json({
      status: "error",
      error: "Brand rep input invalid",
    });
  }

  try {
    const [user, _id] = verifyJWT(token);
    const brandRepRecord = await findUser(_id);
    console.log("Brand Rep Record", user, _id, brandRepRecord);

    if (!brandRepRecord?.roles?.Influencer == 2000) {
      return res.json({
        status: "error",
        error: "You do not have authority to create a project",
      });
    }

    let influencerRecord = "";
    influencerRecord._id = "";

    // Find the influencer record if one was chosen
    if (influencerAssigned !== "none") {
      influencerRecord = await findUserByUsername(influencerAssigned);
      console.log("influencerRecord:", influencerRecord);
    }

    // Create a project
    const res = await Project.create({
      title: title,
      description: description,
      company: brandRepRecord.company,
      brandRepAssigned: brandRepRecord._id,
      influencerAssigned: influencerRecord._id,
      deadline: deadline,
      instagramTask: instagramDeliverable,
      tiktokTask: tiktokDeliverable,
      youtubeTask: youtubeDeliverable,
      reviewDeadline: reviewDeadline,
      deadlineTime: deadlineTime,
      numberOfRevisions: numberOfRevisions,
      paymentMethod: paymentMethod,
      paymentPrice: paymentPrice,
      paymentProduct: paymentProduct,
      keywords: keywords,
      hashtags: hashtags,
      tags: tags,
      phrases: phrases,
      linkInBio: linkInBio,
    });
    console.log("Project was created:", res);

    projectData = res;

    // Add project to brandRep and influencer's currentProjects property
    await User.updateOne(
      { _id },
      {
        $push: { currentProjects: res._id },
      }
    );
    console.log("Brand Rep Was Updated");

    await User.updateOne(
      { username: influencerRecord.username },
      {
        $push: { currentProjects: res._id },
      }
    );

    console.log("Influencer Was Updated");
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Username already in use!",
      });
    }
    throw err;
  }
  res.json({ status: "OK", project: projectData });
});

// TO DO: Add the Example Image Deliverables to Project
app.post("/api/addprojectimage", async (req, res) => {
  console.log("adding example deliverable images to project");

  const { projectID: _id, imageURL, social, type } = req.body;

  console.log(_id, imageURL, social, type);

  try {
    if (social === "instagram" && type === "example") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { instagramExample: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }
    if (social === "youtube" && type === "example") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { youtubeExample: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }
    if (social === "tiktok" && type === "example") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { tiktokExample: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }

    if (social === "instagram" && type === "Submission") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { instagramSubmission: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }
    if (social === "youtube" && type === "Submission") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { youtubeSubmission: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }
    if (social === "tiktok" && type === "Submission") {
      const projectRes = await Project.updateOne(
        { _id },
        {
          $set: { tiktokSubmission: imageURL },
        }
      );
      console.log("Project Updated Image Files:", projectRes);
    }

    const projectRecord = await Project.findOne({ _id }).exec();

    console.log("Updated Project:", projectRecord);

    res.json({ status: "OK", project: projectRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Update Project Everytime Status Updates
app.post("/api/updateproject", async (req, res) => {
  const { token, action, comment, project, user } = req.body;
  try {
    console.log(token, action, comment);
    console.log("user", user);
    // Create a baseline comment that will be updated depending on the update
    var newCommentWithDate = moment(new Date()).format(
      "MMMM Do YYYY @ h:mm:ss a"
    );

    //  Update comment string based based on influencer accept/reject/modify contract
    // Add Comment
    if (action === "accept") {
      newCommentWithDate += `: ${user.firstName} ${user.lastName} (influencer) accepted the project.`;
    }
    if (action === "reject") {
      newCommentWithDate += `: ${user.firstName} ${user.lastName} (influencer) rejected the project.`;
    }
    if (action === "modify") {
      newCommentWithDate +=
        ": The influencer requested the following changes: " + comment;
    }
    // Step 1A - Influencer Accepts Contract/Project
    if (action === "accept") {
      // Update Status
      await Project.updateOne(
        { _id: project._id },
        {
          $set: {
            status: "in progress/waiting for submission",
            influencerAssigned: user._id,
          },
          $push: { commentList: newCommentWithDate },
        }
      );
      // if influencer is not already assigned the project
      console.log("current projects", user.currentProjects);
      console.log("projectID", project._id);
      if (!user.currentProjects.includes(project._id)) {
        console.log("adding the project to current projects!");
        await User.updateOne(
          { _id: user._id },
          {
            $push: { currentProjects: `${project._id}` },
          }
        );
      }
    }
    // Step 1B - Influencer Reject Contract/Project
    if (action === "reject") {
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "project proposal rejected" },
          $push: { commentList: newCommentWithDate },
        }
      );
    }

    // Step 2 - Status: Project In Progress => Action: Influencer Submit Draft
    // Add Comment
    if (action === "influencer submit draft") {
      newCommentWithDate +=
        ": The influencer submitted the project. Awaiting the submission of their draft.";
    }

    if (action === "brand approves") {
      newCommentWithDate += ": The brand approves of the submission.";
    }

    if (action === "brand requests changes") {
      newCommentWithDate += ": The brand requests changes.";
    }

    // Step 2: Update Project and Notify Brand
    if (action === "influencer submit draft") {
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "brand reviewing" },
        }
      );
      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: newCommentWithDate },
        }
      );
      // await Project.updateOne(
      //   { _id: project._id },
      //   {
      //     $set: { instagramSubmission: "selfie" },
      //   }
      // );
      // await Project.updateOne(
      //   { _id: project._id },
      //   {
      //     $set: { tiktokSubmission: "some tik tok" },
      //   }
      // );
      // await Project.updateOne(
      //   { _id: project._id },
      //   {
      //     $set: { youtubeSubmission: "some video" },
      //   }
      // );
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForBrand: true },
        }
      );
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForInfluencer: false },
        }
      );
    }
    // Step 3 - Brand Accepts/Rejects Submission
    // Edit Comment if brand accepts submission
    if (action === "brand approves submission") {
      newCommentWithDate +=
        ": The brand approved the draft! Please post your content by the scheduled date.";

      // Influencer can publish
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "ready to publish" },
        }
      );
      // Add comment
      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: newCommentWithDate },
        }
      );

      // Next step with influencer
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForInfluencer: true },
        }
      );
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForBrand: false },
        }
      );
    }

    // Edit comment if the brand wants to change the submission
    if (action === "brand requests changes to submission") {
      var rejectProjectComment = newCommentWithDate + ": " + comment;
      newCommentWithDate +=
        ": The brand requested changes to the submission. Please see the comments and re-upload.";

      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "in progress/waiting for submission" },
        }
      );

      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: newCommentWithDate },
        }
      );

      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: rejectProjectComment },
        }
      );
    }

    // Action: Influencer posted the content to social media
    // Comment: Same as action
    // New Status: Awaiting Project Payment
    // Influencer is awaiting project payment from brand

    if (action === "influencer posted content") {
      newCommentWithDate +=
        ": The influencer posted the content. Brand: Please confirm the submission and pay the influencer.";

      // Influencer can publish
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "awaiting project payment" },
        }
      );
      // Add comment
      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: newCommentWithDate },
        }
      );

      // Next step with brand (must pay influencer)
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForInfluencer: false },
        }
      );
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForBrand: true },
        }
      );
    }

    // Step 5 - Brand has paid the influencer. Project is complete!
    if (action === "brand paid influencer") {
      newCommentWithDate +=
        ": The brand has sent the payment. Please allow 2-4 business days for the payment to process.";

      // Influencer can publish
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { status: "project complete" },
        }
      );
      // Add comment
      await Project.updateOne(
        { _id: project._id },
        {
          $push: { commentList: newCommentWithDate },
        }
      );

      // Next step with brand (must pay influencer)
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForInfluencer: false },
        }
      );
      await Project.updateOne(
        { _id: project._id },
        {
          $set: { waitingForBrand: false },
        }
      );
    }

    const projectRecord = await findProjectByID(project._id);

    console.log(projectRecord);
    const userRecord = await findUser(project._id);

    console.log(userRecord);
  } catch (err) {
    console.log(err);
  }
});

// Brand to pay influencer
app.post("/api/payment", async (req, res) => {
  let { amount, id } = req.body;
  console.log("inside the payment api");
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "project payment",
      payment_method: id,
      confirm: true,
    });

    console.log("payment: ", payment);
    res.json({
      message: "Payment success!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.raw.message,
      success: false,
    });
  }
});

// ~~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~~~~~~~~~
// Verify JWT tokens
const verifyJWT = (token) => {
  // Verify the user, return the user + id
  const user = jwt.verify(JSON.parse(token).token, JWT_SECRET_KEY);
  const _id = user.id;
  return [user, _id];
};

// Find the project in the database
const findUser = async (_id) => {
  return User.findOne({ _id });
};
const findProjectByID = async (_id) => {
  return Project.findOne({ _id });
};
const findUserByUsername = async (username) => {
  return User.findOne({ username });
};
const findProject = async (_id) => {
  return Project.findOne({ username });
};

const newRoleArray = (role) => {
  if (role === "Influencer") {
    role = {
      Admin: null,
      Influencer: 2000,
      Brand: null,
    };
  } else if (role === "Brand") {
    role = {
      Admin: null,
      Influencer: null,
      Brand: 3000,
    };
  } else if (role === "Admin") {
    role = {
      Admin: 1000,
      Influencer: null,
      Brand: null,
    };
  }
  console.log("newRoleArray", role);
  return role;
};
