/* 99DigiProStore FAQ helper.
   A free, tap-to-ask FAQ. It runs only in the visitor's browser:
   no AI service, no account, no tracking, and no typing box.

   How it works, in two parts:
   1. SECTIONS (the content): FAQs grouped into topics. Each FAQ is a question and its answer.
   2. The chat window: shows the topics as buttons, then the questions in the chosen
      topic, then the answer. Anything not covered goes to the business email.

   To add or change an FAQ, edit SECTIONS only. Keep answers in line with
   the product pages and policies.html. */
(function () {
  "use strict";

  var EMAIL = "digiprostore99@gmail.com";
  var STORE = "https://99digiprostore.myinstamojo.com";
  var PC = "";
  var MAIL = "<a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>";
  function sale(was, now) { return "<s>" + was + "</s> " + now + " (launch offer)" + PC; }
  var STORE_LINK = "<a href=\"" + STORE + "\" target=\"_blank\" rel=\"noopener\">Instamojo store</a>";

  /* ---------- 1. The content: topics and their FAQs ----------
     title: the topic button
     faqs:  a list of { q: question button, a: answer (HTML allowed, for links) } */
  var SECTIONS = [
    {
      title: "General",
      faqs: [
        { q: "What is 99DigiProStore?",
          a: "A small Indian digital products store. We make learning, skills, productivity and finance tools that you use, not just read. Each product is a single interactive file that you buy once, download and open in your browser. <a href=\"about.html\">Read more about us</a>." },
        { q: "Who runs it?",
          a: "It's a new initiative by a qualified CMA, run as a small sole proprietorship from India. Every product is planned, written and checked by the founder." },
        { q: "What do you sell?",
          a: "Right now:<ul>" +
            "<li><a href=\"fresher-interview-kit.html\">Complete Fresher Interview Kit</a> (English round, aptitude mocks, HR, GD, emails, resume), ₹99, no extra charges</li>" +
            "<li><a href=\"wedding-planner.html\">Wedding Planner and Shagun Book</a> (budget, guest list by function, shagun book, checklist), ₹99, no extra charges</li>" +
            "<li><a href=\"ai-prompt-kit.html\">AI Prompt Kit</a> (Prompt Handbook + Prompt Learn and Practice portal), <s>₹299</s> ₹99, launch price till 15 Nov 2026, no extra charges</li>" +
            "<li><a href=\"index.html#products\">CMA Foundation All 4 Papers Bundle</a> (FBLC + FFCA + FBMS + FBEM Smart Prep), ₹99" + PC + "</li>" +
            "<li><a href=\"fblc-smart-prep.html\">FBLC Smart Prep</a> (CMA Foundation Paper 1), " + "₹99" + PC + "</li>" +
            "<li><a href=\"fbem-smart-prep.html\">FBEM Smart Prep</a> (CMA Foundation Paper 4), " + "₹99" + PC + "</li>" +
            "<li><a href=\"excel-basics.html\">Excel - Basics for All</a>, ₹99" + PC + "</li>" +
            "<li><a href=\"excel-pro.html\">Excel Pro Lab</a>, ₹99" + PC + "</li>" +
            "<li><a href=\"excel-for-finance.html\">Excel for Finance - Basics to Advanced</a>, " + sale("₹299", "₹99") + "</li>" +
            "<li><a href=\"excel-data-analytics.html\">Excel for Data Analytics - Basics to Advanced</a>, " + sale("₹299", "₹99") + "</li></ul>" +
            "Most products have a free sample on their page." },
        { q: "How is this different from free material?",
          a: "Free notes, videos and PDFs are things you read. Our products make you practise: a short lesson, then you try it yourself and your answer is checked straight away, so you know exactly what to fix." },
        { q: "Are there videos?",
          a: "No. Our products are read-and-do: a short lesson, then you practise and get your answer checked straight away." },
        { q: "Is it safe to buy?",
          a: "Yes. Payment is handled by Instamojo, and most products have a free sample to try first. We never ask for your card or bank details ourselves." },
        { q: "Are you linked to ICMAI or Microsoft?",
          a: "No. 99DigiProStore is independent. It is not affiliated with, endorsed by or connected to ICMAI, ICAI, ICSI, any exam body or Microsoft. Our notes and questions are our own original work." },
        { q: "Do you guarantee marks or a job?",
          a: "No. We don't promise marks, results or jobs. Our products give you a structured way to practise and see where you need to improve. The rest is your effort." },
        { q: "Can I share it with a friend?",
          a: "Each purchase is a personal licence for one buyer. Please don't copy, share, upload or resell the file. Your friends can try the free samples on this site." },
        { q: "What data do you collect?",
          a: "This website doesn't ask for your personal details. It uses the Meta Pixel to count page visits and Buy clicks, so we can see which of our ads work. Our product files don't collect or send any data. When you buy, Instamojo collects what it needs to process your order. See our <a href=\"policies.html#privacy\">privacy policy</a>." },
        { q: "Are new products coming?",
          a: "Yes. We add new study kits, productivity tools and finance tools regularly. Have an idea for one? Email " + MAIL + "." }
      ]
    },
    {
      title: "Courses",
      faqs: [
        { q: "Which course is right for me?",
          a: "A quick guide:<ul>" +
            "<li>Preparing for a fresher job drive or placement: <a href=\"fresher-interview-kit.html\">Complete Fresher Interview Kit</a></li>" +
            "<li>Planning a wedding in the family: <a href=\"wedding-planner.html\">Wedding Planner and Shagun Book</a></li>" +
            "<li>Want better answers from ChatGPT, Gemini or other AI tools: <a href=\"ai-prompt-kit.html\">AI Prompt Kit</a></li>" +
            "<li>New to Excel: <a href=\"excel-basics.html\">Excel - Basics for All</a></li>" +
            "<li>Accounts, finance, CA, CMA or CS students: <a href=\"excel-for-finance.html\">Excel for Finance</a></li>" +
            "<li>MIS, analyst or operations work: <a href=\"excel-data-analytics.html\">Excel for Data Analytics</a></li>" +
            "<li>Already know the basics: <a href=\"excel-pro.html\">Excel Pro Lab</a></li>" +
            "<li>CMA Foundation Paper 1: <a href=\"fblc-smart-prep.html\">FBLC Smart Prep</a></li>" +
            "<li>CMA Foundation Paper 4: <a href=\"fbem-smart-prep.html\">FBEM Smart Prep</a></li></ul>" +
            "Not sure? Try the free samples first." },
        { q: "What's in the Fresher Interview Kit?",
          a: "One file to practise every round of a fresher drive: the spoken-English round (read aloud, repeat, short answers, sentence builds, story retell, open questions; speak and see the words you missed), 10 timed aptitude mocks with solutions, 30 HR questions with sample answers, 10 GD topics, 8 email templates, a 25-point resume checklist and a 7-day plan. The speaking check needs Chrome and internet. It is our own practice, not an official test, and it does not promise a job or score.<br><br>₹99, no extra charges. <a href=\"fresher-interview-kit.html\">Details</a>" },
        { q: "What's in the Wedding Planner?",
          a: "One offline file for planning an Indian wedding: budget and vendor payments (advances, balances, due dates), a guest list with headcount for every function, a shagun book of cash and gifts received and given, a 33-task checklist, a catering calculator, print and spreadsheet download, and a backup file you can share with family. Your data stays on your device.<br><br>₹99, no extra charges. <a href=\"wedding-planner.html\">Details</a>" },
        { q: "What's in the AI Prompt Kit?",
          a: "The Prompting and Prompt Engineering Handbook (15-page PDF), plus the full Prompt Learn and Practice portal as a free bonus: 30 modules, 160 tasks where you write the prompt and get a score out of 10, 145 ready prompts, a prompt builder and a certificate. Works with any AI chat tool; no AI is built in.<br><br><s>₹299</s> ₹99" + PC + ", launch price till 15 Nov 2026. <a href=\"ai-prompt-kit.html\">Details</a>" },
        { q: "What's in the CMA Foundation bundle?",
          a: "All 4 CMA Foundation Smart Prep kits in one download: FBLC (Paper 1), FFCA (Paper 2), FBMS (Paper 3) and FBEM (Paper 4). 1,249 practice MCQs with explanations, 8 full timed mocks (2 per paper), flashcards and a Mistake Book in every kit.<br><br>₹99" + PC + " for all 4." },
        { q: "What's in Excel - Basics for All?",
          a: "Excel from zero with everyday examples like a family budget and a marks sheet. 10 modules, 44 hands-on exercises with instant checking, 13 short quizzes, 4 final projects and a certificate of completion. It works on a phone keyboard too.<br><br>₹99" + PC + ". <a href=\"excel-basics.html\">Details</a> · <a href=\"samples/excel-basics-sample.html\">Free sample</a>" },
        { q: "What's in Excel for Finance?",
          a: "15 modules and 117 hands-on exercises on Indian finance data, from your first formula to a DCF valuation. PivotTables, Goal Seek, Data Tables, Solver, 10 finance case studies, 8 final challenges, an AI module and a certificate of completion.<br><br>" + sale("₹299", "₹99") + ". <a href=\"excel-for-finance.html\">Details</a> · <a href=\"samples/excel-for-finance-sample.html\">Free sample</a>" },
        { q: "What's in Excel for Data Analytics?",
          a: "18 modules and 121 hands-on exercises. Data cleaning, SUMIFS, lookups, statistics, FILTER, SORT, UNIQUE, PivotTables and dashboards, 5 analytics cases, an AI module and a certificate of completion.<br><br>" + sale("₹299", "₹99") + ". <a href=\"excel-data-analytics.html\">Details</a> · <a href=\"samples/excel-data-analytics-sample.html\">Free sample</a>" },
        { q: "What's in Excel Pro Lab?",
          a: "Advanced Excel for people who already know the basics. 13 modules, 66 exercises and 80 quiz questions on XLOOKUP, FILTER, LET, LAMBDA, dynamic arrays, PivotTables, Solver and a KPI dashboard, plus 6 capstone projects and an AI module.<br><br>₹99" + PC + ". <a href=\"excel-pro.html\">Details</a> · <a href=\"samples/excel-pro-sample.html\">Free sample</a>" },
        { q: "What's in FBLC Smart Prep?",
          a: "A practice kit for CMA Foundation Paper 1, Fundamentals of Business Laws and Business Communication. Simple overviews and formats for all 5 modules, 345 practice MCQs with instant explanations, 2 full timed mocks (50 questions, 1 hour) with a calculator and rough sheet, 142 flashcards and a Mistake Book.<br><br>" + "₹99" + PC + ". <a href=\"fblc-smart-prep.html\">Details</a> · <a href=\"samples/fblc-smart-prep-sample.html\">Free sample</a>" },
        { q: "What's in FBEM Smart Prep?",
          a: "A revision toolkit for CMA Foundation Paper 4, Fundamentals of Business Economics and Management. Plain-language notes for all 5 chapters, 307 practice questions with instant explanations, 2 full timed mock tests (50 questions, 2 hours), 97 flashcards and a Mistake Book.<br><br>" + "₹99" + PC + ". <a href=\"fbem-smart-prep.html\">Details</a> · <a href=\"samples/fbem-smart-prep-sample.html\">Free sample</a>" },
        { q: "Is there a free sample?",
          a: "Yes, for these products, with no sign-up:<ul>" +
            "<li><a href=\"samples/fblc-smart-prep-sample.html\">FBLC Smart Prep</a></li>" +
            "<li><a href=\"samples/ffca-smart-prep-sample.html\">FFCA Smart Prep</a></li>" +
            "<li><a href=\"samples/fbms-smart-prep-sample.html\">FBMS Smart Prep</a></li>" +
            "<li><a href=\"samples/fbem-smart-prep-sample.html\">FBEM Smart Prep</a></li>" +
            "<li><a href=\"samples/excel-basics-sample.html\">Excel - Basics for All</a></li>" +
            "<li><a href=\"samples/excel-pro-sample.html\">Excel Pro Lab</a></li>" +
            "<li><a href=\"samples/excel-for-finance-sample.html\">Excel for Finance</a></li>" +
            "<li><a href=\"samples/excel-data-analytics-sample.html\">Excel for Data Analytics</a></li></ul>" +
            "In the Excel labs, your sample progress moves to the full version." },
        { q: "Do I need Excel installed?",
          a: "No. Each Excel lab has its own practice spreadsheet built in. It's a light spreadsheet for learning, not a full copy of Excel. Use Excel or Google Sheets for your real work." },
        { q: "Will it work with my Excel version?",
          a: "Basic formulas work in Excel 2010 and later and in Google Sheets. Newer functions like XLOOKUP, FILTER and UNIQUE need Excel 2021, Excel 365 or Google Sheets, and a few (like LAMBDA and TAKE) need Excel 365. Each product page lists the details." },
        { q: "Do I get a certificate?",
          a: "Each Excel lab includes a printable certificate of completion. It records that you finished the course on your own device. It is not an accredited qualification." },
        { q: "Is there an AI module?",
          a: "Yes, in the Excel labs. It shows you how to use AI tools to write Excel formulas and how to catch their mistakes. No AI is built into the file and you don't need an AI account." },
        { q: "Do you have CMA Inter or Final?",
          a: "Not yet. For CMA students we have Smart Prep kits for all 4 CMA Foundation papers right now (sold together as a bundle). More study kits are on the way. Email " + MAIL + " to tell us what you need." }
      ]
    },
    {
      title: "Price and payment",
      faqs: [
        { q: "How much do they cost?",
          a: "Current prices:<ul><li>Complete Fresher Interview Kit: ₹99</li><li>Wedding Planner and Shagun Book: ₹99</li><li>AI Prompt Kit: <s>₹299</s> ₹99, launch price till 15 Nov 2026</li><li>CMA Foundation All 4 Papers Bundle: ₹99 (₹396 if bought separately)</li><li>FBLC Smart Prep: ₹99</li><li>FBEM Smart Prep: ₹99</li><li>Excel for Finance: <s>₹299</s> ₹99</li><li>Excel for Data Analytics: <s>₹299</s> ₹99</li><li>Excel - Basics for All: ₹99</li><li>Excel Pro Lab: ₹99</li></ul>The price shown is the full price, with no extra charges at checkout." },
        { q: "Are there any extra charges?",
          a: "No. The price you see is the price you pay. There are no payment charges or hidden fees at checkout." },
        { q: "How do I buy?",
          a: "Tap <b>Buy</b> on any product. It takes you to our " + STORE_LINK + ". Pay there, and your download link appears straight away." },
        { q: "How can I pay?",
          a: "By UPI, card or net banking on our " + STORE_LINK + ". Payment is handled securely by Instamojo." },
        { q: "Are there any discounts?",
          a: "Yes, launch prices are on: the AI Prompt Kit is ₹99 till 15 Nov 2026 (₹299 after that), and Excel for Finance and Excel for Data Analytics are ₹99 (regular ₹299). The CMA Foundation All 4 Papers Bundle is ₹99. Excel - Basics for All and Excel Pro Lab are ₹99." },
        { q: "Do I need an account to buy?",
          a: "No. You don't sign up anywhere. Instamojo asks for your name, email and phone number at checkout so it can send your file." }
      ]
    },
    {
      title: "Download and use",
      faqs: [
        { q: "How do I get the file?",
          a: "Delivery is instant. The download link appears right after payment and is also emailed to you. You get one .html file. Nothing is shipped." },
        { q: "How do I open it?",
          a: "Open the .html file in your browser, like Chrome. There's no app to install, no sign-up and no login." },
        { q: "Does it work offline?",
          a: "Yes. After you download it, it works without internet." },
        { q: "Which devices work?",
          a: "<b>Excel labs:</b> a laptop or desktop (Chrome, Edge, Firefox or Safari) or an Android phone in Chrome.<br><b>FBLC and FBEM Smart Prep:</b> your phone or laptop in Chrome, Edge or Firefox." },
        { q: "Can I use it on an iPhone?",
          a: "iPhones preview downloaded .html files without saving progress, so please use a laptop for the Excel labs." },
        { q: "Is my progress saved?",
          a: "Yes, in your own browser on your own device. Nothing is sent to us. If you clear your browser data or switch browsers, your progress there starts fresh." },
        { q: "Can my family use the same device?",
          a: "Yes. Each person can make their own profile, so everyone keeps their own progress. The Excel labs also let you add an optional PIN." }
      ]
    },
    {
      title: "Grievance redressal",
      faqs: [
        { q: "How do I raise a complaint?",
          a: "Email " + MAIL + " with:<ul><li>your order ID or the email you used to buy</li><li>the product name</li><li>what went wrong, with a screenshot if you can</li></ul>Email is our only support channel." },
        { q: "How soon will you reply?",
          a: "We reply within 24 hours, Monday to Saturday." },
        { q: "Can I get a refund?",
          a: "All sales are final. Our products are digital downloads, so they can't be refunded, including if you change your mind. That's why most products have a free sample, so you can try before you buy. See the <a href=\"policies.html#refunds\">refund policy</a>." },
        { q: "My file isn't working",
          a: "Sorry about that. First, try opening it in Chrome on a laptop or an Android phone. If it still doesn't work, email " + MAIL + " with your order details and what you see. We'll fix the problem or send a working replacement." },
        { q: "I paid but didn't get the link",
          a: "Check your spam or promotions folder first. If it isn't there, email " + MAIL + " with your order details and we'll resend the link." },
        { q: "I was charged twice",
          a: "Sorry about that. Email " + MAIL + " with your order details and we'll return the duplicate charge." },
        { q: "I found a mistake in the content",
          a: "Thank you for telling us. Email " + MAIL + " with the product name and where the mistake is, and we'll check and correct it." },
        { q: "Correct or delete my order details",
          a: "Email " + MAIL + " from the email you used to buy, and tell us what to correct or delete. See our <a href=\"policies.html#privacy\">privacy policy</a>." }
      ]
    }
  ];

  /* ---------- 2. The chat window ---------- */

  var root, log, menu, openBtn, isOpen = false, started = false;

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html) node.innerHTML = html;
    return node;
  }

  function addMessage(who, html) {
    var msg = el("div", "dps-msg dps-" + who, html);
    log.appendChild(msg);
    // Scroll so the start of a new answer is in view, even when it's long.
    log.scrollTop = who === "bot" ? msg.offsetTop - log.offsetTop - 8 : log.scrollHeight;
  }

  function button(label, cls, onClick) {
    var b = el("button", "dps-chip" + (cls ? " " + cls : ""));
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", onClick);
    menu.appendChild(b);
  }

  /* The home menu: one button per topic. */
  function showSections() {
    menu.innerHTML = "";
    menu.appendChild(el("div", "dps-label", "Pick a topic"));
    SECTIONS.forEach(function (section) {
      button(section.title, "dps-section", function () { showQuestions(section, null); });
    });
    menu.scrollTop = 0;
  }

  /* Inside a topic: one button per question (except the one just answered), plus a way back. */
  function showQuestions(section, skip) {
    menu.innerHTML = "";
    menu.appendChild(el("div", "dps-label", section.title));
    section.faqs.forEach(function (faq) {
      if (faq !== skip) button(faq.q, "", function () { answer(section, faq); });
    });
    button("← All topics", "dps-back", showSections);
    menu.scrollTop = 0;
  }

  function answer(section, faq) {
    addMessage("user", faq.q);
    setTimeout(function () {
      addMessage("bot", faq.a);
      showQuestions(section, faq);
    }, 200);
  }

  function setOpen(open) {
    isOpen = open;
    root.classList.toggle("dps-open", open);
    openBtn.setAttribute("aria-expanded", String(open));
    if (open && !started) {
      started = true;
      addMessage("bot", "Hi! Pick a topic below, then tap a question to see the answer.");
      showSections();
    }
    if (open) root.querySelector(".dps-close").focus(); else openBtn.focus();
  }

  function build() {
    root = el("div", "dps-chat");
    root.innerHTML =
      "<button class=\"dps-open-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"dps-panel\">" +
        "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z\"/></svg>" +
        "<span>FAQs</span></button>" +
      "<div class=\"dps-panel\" id=\"dps-panel\" role=\"dialog\" aria-label=\"Frequently asked questions\">" +
        "<div class=\"dps-head\"><div><strong>Quick answers</strong><small>Tap a question to see the answer</small></div>" +
        "<button class=\"dps-close\" type=\"button\" aria-label=\"Close\">×</button></div>" +
        "<div class=\"dps-log\" aria-live=\"polite\"></div>" +
        "<div class=\"dps-menu\"></div>" +
        "<div class=\"dps-foot\">Still have a question? <a href=\"mailto:" + EMAIL + "?subject=" +
          encodeURIComponent("Question from the website") + "\">Email us</a></div>" +
      "</div>";
    document.body.appendChild(root);

    openBtn = root.querySelector(".dps-open-btn");
    log = root.querySelector(".dps-log");
    menu = root.querySelector(".dps-menu");

    openBtn.addEventListener("click", function () { setOpen(!isOpen); });
    root.querySelector(".dps-close").addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) setOpen(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
