
# 🚀 DevDisplay Mail Service: Your Daily Tech Newsletter

## 🌟 Project Overview

DevDisplay's Mail-Service delivers curated daily newsletters directly to your inbox. Stay informed about trending developers, exciting projects, and popular content across developer communities with our streamlined delivery system.

## ✨ Key Features

-   **Trending Insights**: Discover top developers, repositories, and posts with real-time updates
-   **Automated Newsletters**: Subscribe once and receive consistent, timely delivery of tech news
-   **Multi-Source Aggregation**: Comprehensive data collection from GitHub and Dev.to

## 🛠 Tech Stack

-   **Backend**: Node.js & Express.js
-   **Technologies**: Nodemailer with Brevo SMTP and MJML
-   **Data Sources**: GitHub.com, Dev.to

## 🚀 Quick Start Guide

### Prerequisites

-   Node.js
-   npm
-   MongoDB

### Installation Steps

1.  Clone the repository

```bash
git clone https://github.com/Thakar-Advait/DevDisplay-Mailserver.git
cd DevDisplay-Mailserver

```

2.  Install Dependencies

```bash
npm install

```

3.  Configure Environment Variables Create a `.env` file with the following variables:

```
PORT="<your_port>"
SMTP_API_KEY="<your_3rdparty_smtp_api_key>"
SENDER_MAIL="<sender_mail_address>"

```

5.  Start the Server

```bash
npm run dev

```

Once the server start, you can send the POST request to the following endpoint with the body as defined below:

```bash
endpoint: http://localhost:PORT/

```

```bash
{
	"recipientEmail":  "recipient_mail_addr",
	"userName":  "recipient_username",
	"authorName":  "github_repo_author",
	"authorAvatarUrl":  "https://github.com/authorName.png",
	"repoTitle":  "repo_title",
	"repoDescription":  "repo_description",
	"programmingLanguage":  "repo_programming_language",
	"stars":  "repo_start",
	"forks":  "repo_forks",
	"repoUrl":  "https://github.com/repo_author/repo_title"
}

```

## 🔒 Environment Configuration

Refer to `.env.sample` for detailed environment variable setup.

## 🙌 Acknowledgments

Special thanks to GitHub and Dev.to for providing the valuable developer data that powers this service.

----------

**Built with ❤️ by Developers, for Developers**