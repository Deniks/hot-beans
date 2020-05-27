const express = require("express");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

let resMessage = "works";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendComplexMail = (fName, lName, phone, email, message) => {
  const mailOptions = {
    from: `"Hot Beans 👻" ${process.env.GMAIL}`, // sender address
    to: process.env.GMAIL,
    subject: `Message From - ${email} | Hot Beans User 👻`,
    text: message,
    html: `our client <b>${fName} ${lName}</b> <br> sent a message: ${message}<br>Phone - ${phone}`,

    attachments: [
      {
        filename: "mailtrap.png",
        path: __dirname + "/tmp/mailtrap.png",
        cid: "uniq-mailtrap.png",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Email transmition error: ${error}`);
    } else {
      message = "message is sent";
      console.log(`Email sent: ${info.response}`);
    }
  });
};

router.post(
  "/send-application",
  [
    check("fName").isAscii().isLength({ min: 2 }),
    check("lName").isAscii().isLength({ min: 2 }),
    check("phone").isMobilePhone(),
    check("email").isEmail(),
    check("message")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  (req, res) => {
    console.log(req.files);

    const { job, fName, lName, phone, email, message } = req.body;
    const { resume, coverLetter } = req.files;

    if (!req.files || Object.keys(req.files).length === 0) {
      resMessage = "upload your resume & cover letter";
      return res.status(400).send("No files were uploaded.");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.array()[0].param == "fName") {
        resMessage = "check your first name";
      } else if (errors.array()[0].param == "lName") {
        resMessage = "check your last name";
      } else if (errors.array()[0].param == "phone") {
        resMessage = "check your phone";
      } else if (errors.array()[0].param == "email") {
        resMessage = "check your email";
      } else if (errors.array()[0].param == "message") {
        resMessage = "check your message";
      } else {
        resMessage = "check your input fields";
      }
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    sendMail(job, fName, lName, phone, email, message);
    console.log(resMessage);
    res.json({ resMessage });
  }
);

const sendSimpleMail = (fName, lName, phone, email, message) => {
  const mailOptions = {
    from: `"Hot Beans 👻" ${process.env.GMAIL}`, // sender address
    to: process.env.GMAIL,
    subject: `Message From - ${email} | Hot Beans User 👻`,
    html: `our client <b>${fName} ${lName}</b> <br> sent a message: ${message}<br>Phone - ${phone}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Email transmition error: ${error}`);
    } else {
      message = "message is sent";
      console.log(`Email sent: ${info.response}`);
    }
  });
};

router.post(
  "/send-message",
  [
    check("fName").isAscii().isLength({ min: 2 }),
    check("lName").isAscii().isLength({ min: 2 }),
    check("phone").isMobilePhone(),
    check("email").isEmail(),
    check("message")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  (req, res) => {
    const { fName, lName, phone, email, message } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.array()[0].param == "fName") {
        resMessage = "check your first name";
      } else if (errors.array()[0].param == "lName") {
        resMessage = "check your last name";
      } else if (errors.array()[0].param == "phone") {
        resMessage = "check your phone";
      } else if (errors.array()[0].param == "email") {
        resMessage = "check your email";
      } else if (errors.array()[0].param == "message") {
        resMessage = "check your message";
      } else {
        resMessage = "check your input fields";
      }
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    sendSimpleMail(fName, lName, phone, email, message);
    console.log(resMessage);
    res.json({ resMessage });
  }
);

/* GET home page. */
router.get("/", (req, res, next) => {
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  res.render("pages/contacts", {
    title: "Contact Us",
    page: "contacts",
    description: "On this page users can contact our support team",
    heading: "High Quality Websites",
    subHeading: "Provided in time!",
    i18n: res,
  });
});

module.exports = router;
