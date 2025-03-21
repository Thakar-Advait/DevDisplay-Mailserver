import express from "express";
import ejs from "ejs";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";
import mjml2html from "mjml";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const app = express();
const PORT = 8080;

// Use JSON middleware for handling JSON requests
app.use(express.json());

// Configure the Nodemailer transporter with Brevo (Sendinblue) transport
const transporter = nodemailer.createTransport(
    new Transport({
        apiKey: `${process.env.SMTP_API_KEY}`,
    })
);

// Helper function to convert MJML content into HTML
const convertMJMLToHTML = (mjmlContent) => {
    try {
        const result = mjml2html(mjmlContent);
        if (result.errors && result.errors.length) {
            console.error("MJML errors:", result.errors);
            return null;
        }
        return result.html;
    } catch (error) {
        console.error("Error converting MJML to HTML:", error);
        return null;
    }
};

// Helper function to send email
const sendEmail = async (htmlContent, recipientEmail) => {
    const mailOptions = {
        from: `${process.env.SENDER_MAIL}`,  // Sender email
        to: `${recipientEmail}`,      // Recipient email
        subject: "Your Daily Tech Newsletter",
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        // Log the full response from the email service
        console.log("Email sent:", info);
        return info;  // You can access details like messageId, response, etc.
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
    }
};

// Main route to send email
app.post("/", async (req, res) => {
    const {
        recipientEmail,
        userName,
        authorName,
        authorAvatarUrl,
        repoTitle,
        repoDescription,
        programmingLanguage,
        stars,
        forks,
        repoUrl
    } = req.body;
    try {

        // Load MJML template from file
        const mjmlContent = await fs.readFile("./template.mjml", "utf-8");

        // Prepare the dynamic data to pass into the template
        const emailData = {
            logoUrl: 'https://res.cloudinary.com/dqvwuf5ev/image/upload/v1742297177/ICON_enllpk.png',
            userName: userName,
            authorName: authorName,
            authorAvatarUrl: authorAvatarUrl,
            repoTitle: repoTitle,
            repoDescription: repoDescription,
            programmingLanguage: programmingLanguage,
            stars: stars,
            forks: forks,
            repoUrl: repoUrl,
            githubUrl: 'https://github.com/devdisplay',
            twitterUrl: 'https://twitter.com/devdisplay_',
            linkedinUrl: 'https://linkedin.com/company/devdisplay'
        };
        // Function to check if a value is neither undefined nor null
        function isValid(value) {
            return value !== undefined && value !== null;
        }

        const isValidData = Object.keys(emailData).every(key => isValid(emailData[key]));
        if(!isValidData) {
            return res.status(400).json({"message": "Invalid data provided"});
        }

        // Render the MJML content with EJS
        const htmlContent = ejs.render(mjmlContent, emailData);

        // Convert MJML to HTML
        const compiledHtml = convertMJMLToHTML(htmlContent);
        if (!compiledHtml) {
            return res.status(500).json({"message": "Failed to convert MJML to HTML"});
        }

        // Send the email
        const emailInfo = await sendEmail(compiledHtml, recipientEmail);

        // Log and respond to the client
        if (emailInfo) {
            console.log("Successfully sent email:", emailInfo);
            res.status(200).json({"message": "Email sent successfully \n" + emailInfo.messageId});
        } else {
            res.status(500).send("Failed to send email");
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({"message": "Internal server error"});
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
