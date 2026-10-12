/* 99DigiProStore FAQ helper.
   A free, rule-based chat helper. It runs only in the visitor's browser:
   no AI service, no account, no tracking, and nothing typed is sent anywhere.

   How it works, in three parts:
   1. FAQ (the brain): a list of answers. Each answer has keywords that point to it.
   2. findAnswer (the matcher): counts which answer's keywords appear in the question
      and picks the one with the highest score. No match means the email fallback.
   3. The chat window (the face): builds the bubble, the window and the buttons.

   To add or change an answer, edit the FAQ list only. Keep answers in line with
   the product pages and policies.html. */
(function () {
  "use strict";

  var EMAIL = "digiprostore99@gmail.com";
  var STORE = "https://99digiprostore.myinstamojo.com";
  var PC = " + payment charges";

  /* ---------- 1. The brain: questions and answers ----------
     id:       a short name for the answer
     keys:     words or phrases that point to this answer. A phrase of two words
               scores 2, so specific phrases beat single words.
     answer:   what the helper says (HTML is allowed, for links)
     chips:    optional follow-up buttons shown under the answer */
  var FAQ = [
    {
      id: "hello",
      keys: ["hi", "hello", "hey", "namaste", "good morning", "good evening"],
      answer: "Hello! Ask me about our products, prices, payment, download or refunds. You can also tap a button below.",
      chips: ["What do you sell?", "Prices", "How do I buy?"]
    },
    {
      id: "products",
      keys: ["product", "products", "sell", "catalogue", "catalog", "course", "courses", "list", "what do you", "available"],
      answer: "We sell interactive learning tools. Each one is a single file that opens in your browser and works offline:<ul>" +
        "<li><a href=\"fbem-smart-prep.html\">FBEM Smart Prep</a> (CMA Foundation Paper 4), ₹99" + PC + "</li>" +
        "<li><a href=\"excel-basics.html\">Excel - Basics for All</a>, ₹99" + PC + "</li>" +
        "<li><a href=\"excel-pro.html\">Excel Pro Lab</a>, ₹199" + PC + "</li>" +
        "<li><a href=\"excel-for-finance.html\">Excel for Finance - Basics to Advanced</a>, ₹299" + PC + "</li>" +
        "<li><a href=\"excel-data-analytics.html\">Excel for Data Analytics - Basics to Advanced</a>, ₹299" + PC + "</li></ul>" +
        "Every product has a free sample on its page.",
      chips: ["Which one is right for me?", "Free sample", "How do I buy?"]
    },
    {
      id: "price",
      keys: ["price", "prices", "cost", "how much", "rate", "rupees", "rs", "inr", "amount", "fee", "fees", "cheap", "expensive"],
      answer: "Our prices:<ul>" +
        "<li>FBEM Smart Prep: ₹99</li>" +
        "<li>Excel - Basics for All: ₹99</li>" +
        "<li>Excel Pro Lab: ₹199</li>" +
        "<li>Excel for Finance: ₹299</li>" +
        "<li>Excel for Data Analytics: ₹299</li></ul>" +
        "Each price is plus payment charges, which are added at checkout on Instamojo. You see the full amount before you pay.",
      chips: ["What are payment charges?", "How do I buy?", "Discounts"]
    },
    {
      id: "charges",
      keys: ["payment charges", "payment charge", "extra charge", "extra charges", "convenience fee", "gateway", "hidden", "extra", "final amount", "total"],
      answer: "Payment charges are the fees for processing your payment on Instamojo. They are added on top of the product price at checkout, and the full amount is shown before you pay. There are no other charges.",
      chips: ["How do I buy?", "Prices"]
    },
    {
      id: "discount",
      keys: ["discount", "coupon", "offer code", "offer", "offers", "promo", "code", "sale", "deal", "bundle", "combo"],
      answer: "Prices are listed on each product page. If an offer is running, you'll see it on our <a href=\"" + STORE + "\" target=\"_blank\" rel=\"noopener\">Instamojo store</a>. The best way to decide is to try the free sample first.",
      chips: ["Free sample", "Prices"]
    },
    {
      id: "buy",
      keys: ["buy", "purchase", "pay", "payment", "upi", "card", "net banking", "netbanking", "debit", "credit", "gpay", "phonepe", "paytm", "order", "checkout", "instamojo"],
      answer: "Tap <b>Buy</b> on any product. It takes you to our <a href=\"" + STORE + "\" target=\"_blank\" rel=\"noopener\">Instamojo store</a>, where you can pay by UPI, card or net banking. Payment is handled securely by Instamojo.",
      chips: ["How do I get the file?", "What are payment charges?"]
    },
    {
      id: "delivery",
      keys: ["download", "delivery", "deliver", "receive", "received", "get the file", "file", "link", "email me", "mail", "how will i get", "not received", "didn't get", "didnt get", "after payment", "instant"],
      answer: "Delivery is instant. The download link appears right after payment and is also emailed to you. You get one .html file. If the link didn't arrive, email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> and we'll resend it.",
      chips: ["How do I open it?", "Which devices work?"]
    },
    {
      id: "open",
      keys: ["open", "how to use", "install", "app", "offline", "internet", "html", "browser", "sign up", "signup", "login", "log in", "account"],
      answer: "Just open the .html file in your browser, like Chrome. There's no app to install, no sign-up and no login. After you download it, it works without internet.",
      chips: ["Which devices work?", "Do I need Excel?"]
    },
    {
      id: "devices",
      keys: ["device", "devices", "phone", "mobile", "android", "iphone", "ios", "ipad", "tablet", "laptop", "desktop", "computer", "pc", "mac", "chrome", "safari", "edge", "firefox", "windows"],
      answer: "<b>Excel labs:</b> use a laptop or desktop (Chrome, Edge, Firefox or Safari) or an Android phone in Chrome. iPhones preview downloaded .html files without saving progress, so use a laptop there.<br><br>" +
        "<b>FBEM Smart Prep:</b> works on your phone or laptop in Chrome, Edge or Firefox.",
      chips: ["Do I need Excel?", "Is my progress saved?"]
    },
    {
      id: "excel-needed",
      keys: ["need excel", "excel installed", "have excel", "microsoft excel", "ms excel", "office", "google sheets", "excel version", "version", "2010", "2016", "2019", "2021", "365", "work in excel"],
      answer: "You don't need Excel installed. Each Excel lab has its own practice spreadsheet built in. It's a light spreadsheet for learning, not a full copy of Excel.<br><br>" +
        "What you learn works in your own Excel too. Basic formulas work in Excel 2010 and later and in Google Sheets. Newer functions like XLOOKUP, FILTER and UNIQUE need Excel 2021, Excel 365 or Google Sheets. Each product page lists the details.",
      chips: ["Which devices work?", "Which one is right for me?"]
    },
    {
      id: "refund",
      keys: ["refund", "refunds", "money back", "return", "cancel", "cancellation", "changed my mind", "not satisfied"],
      answer: "All sales are final. Our products are digital downloads, so they can't be refunded, including if you change your mind. That's why every product has a free sample, so you can try before you buy.<br><br>" +
        "If a file doesn't open or doesn't work as described, we fix the problem or send a working replacement. If you were charged twice for one order, we return the duplicate charge. Read the full <a href=\"policies.html#refunds\">refund policy</a>.",
      chips: ["Free sample", "My file isn't working"]
    },
    {
      id: "faulty",
      keys: ["not working", "doesnt work", "doesn't work", "not opening", "doesnt open", "doesn't open", "won't open", "wont open", "error", "broken", "faulty", "problem", "issue", "bug", "blank", "corrupt", "stuck"],
      answer: "Sorry about that. First, try opening the file in Chrome on a laptop or an Android phone. If it still doesn't work, email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> with your order details and what you see. We'll fix the problem or send a working replacement.",
      chips: ["Contact"]
    },
    {
      id: "twice",
      keys: ["charged twice", "paid twice", "double charged", "double payment", "deducted twice", "money deducted", "amount deducted"],
      answer: "Sorry about that. Email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> with your order details. If you were charged twice for one order, we return the duplicate charge. If the money was deducted but you didn't get the download link, we resend it.",
      chips: ["Contact"]
    },
    {
      id: "sample",
      keys: ["sample", "samples", "free", "trial", "demo", "try", "preview"],
      answer: "Every product has a free sample you can open on this site, with no sign-up:<ul>" +
        "<li><a href=\"samples/fbem-smart-prep-sample.html\">FBEM Smart Prep sample</a></li>" +
        "<li><a href=\"samples/excel-basics-sample.html\">Excel - Basics for All sample</a></li>" +
        "<li><a href=\"samples/excel-pro-sample.html\">Excel Pro Lab sample</a></li>" +
        "<li><a href=\"samples/excel-for-finance-sample.html\">Excel for Finance sample</a></li>" +
        "<li><a href=\"samples/excel-data-analytics-sample.html\">Excel for Data Analytics sample</a></li></ul>" +
        "In the Excel labs, your sample progress moves to the full version.",
      chips: ["How do I buy?", "Prices"]
    },
    {
      id: "choose",
      keys: ["which one", "which", "recommend", "suggest", "right for me", "suitable", "beginner", "beginners", "start", "best", "choose", "difference", "compare", "fresher", "student"],
      answer: "A quick guide:<ul>" +
        "<li>New to Excel: <a href=\"excel-basics.html\">Excel - Basics for All</a></li>" +
        "<li>Accounts, finance, CA, CMA or CS students: <a href=\"excel-for-finance.html\">Excel for Finance</a></li>" +
        "<li>MIS, analyst or operations work: <a href=\"excel-data-analytics.html\">Excel for Data Analytics</a></li>" +
        "<li>Already know the basics and want advanced topics: <a href=\"excel-pro.html\">Excel Pro Lab</a></li>" +
        "<li>CMA Foundation Paper 4: <a href=\"fbem-smart-prep.html\">FBEM Smart Prep</a></li></ul>" +
        "Not sure? Try the free samples first.",
      chips: ["Free sample", "Prices"]
    },
    {
      id: "fbem",
      keys: ["fbem", "cma foundation", "paper 4", "foundation", "economics", "management", "mock", "mocks", "mcq", "cma"],
      answer: "<b>FBEM Smart Prep</b> is a practice kit for CMA Foundation Paper 4, Fundamentals of Business Economics and Management. It has plain-language notes for all 5 chapters, 277 practice questions with instant explanations, 2 full timed mock tests (50 questions, 2 hours), 88 flashcards and a Mistake Book.<br><br>" +
        "₹99" + PC + ". <a href=\"fbem-smart-prep.html\">See details</a> or <a href=\"samples/fbem-smart-prep-sample.html\">try the free sample</a>.",
      chips: ["How do I buy?", "Which devices work?"]
    },
    {
      id: "basics",
      keys: ["basics for all", "excel basics", "basic excel", "basic", "basics", "zero"],
      answer: "<b>Excel - Basics for All</b> teaches Excel from zero with everyday examples like a family budget and a marks sheet. It has 10 modules, 44 hands-on exercises with instant checking, 4 final projects and a certificate of completion. It works on a phone keyboard too.<br><br>" +
        "₹99" + PC + ". <a href=\"excel-basics.html\">See details</a> or <a href=\"samples/excel-basics-sample.html\">try the free sample</a>.",
      chips: ["Do I need Excel?", "How do I buy?"]
    },
    {
      id: "finance",
      keys: ["excel for finance", "finance", "accounts", "accounting", "accountant", "dcf", "npv", "irr", "emi", "commerce"],
      answer: "<b>Excel for Finance - Basics to Advanced</b> has 15 modules and 117 hands-on exercises on Indian finance data, from your first formula to a DCF valuation. It covers PivotTables, Goal Seek, Data Tables, Solver, 10 finance case studies, a module on using AI for formulas and a certificate of completion.<br><br>" +
        "₹299" + PC + ". <a href=\"excel-for-finance.html\">See details</a> or <a href=\"samples/excel-for-finance-sample.html\">try the free sample</a>.",
      chips: ["Do I need Excel?", "How do I buy?"]
    },
    {
      id: "analytics",
      keys: ["data analytics", "analytics", "analyst", "data", "mis", "dashboard", "dashboards", "statistics", "cleaning"],
      answer: "<b>Excel for Data Analytics - Basics to Advanced</b> has 18 modules and 121 hands-on exercises. You clean, summarise and analyse business data with SUMIFS, lookups, statistics, FILTER, SORT, UNIQUE, PivotTables and dashboards. It includes 5 analytics cases, an AI module and a certificate of completion.<br><br>" +
        "₹299" + PC + ". <a href=\"excel-data-analytics.html\">See details</a> or <a href=\"samples/excel-data-analytics-sample.html\">try the free sample</a>.",
      chips: ["Do I need Excel?", "How do I buy?"]
    },
    {
      id: "pro",
      keys: ["excel pro", "pro lab", "pro", "advanced", "xlookup", "lambda", "dynamic array", "dynamic arrays"],
      answer: "<b>Excel Pro Lab</b> is advanced Excel practice for people who already know the basics. It has 13 modules, 66 exercises and 80 quiz questions on XLOOKUP, FILTER, LET, LAMBDA, dynamic arrays, PivotTables, Solver and a KPI dashboard, plus 6 capstone projects and an AI module.<br><br>" +
        "₹199" + PC + ". <a href=\"excel-pro.html\">See details</a> or <a href=\"samples/excel-pro-sample.html\">try the free sample</a>.",
      chips: ["Which one is right for me?", "How do I buy?"]
    },
    {
      id: "certificate",
      keys: ["certificate", "certification", "certified", "accredited"],
      answer: "Each Excel lab includes a printable certificate of completion. It records that you finished the course on your own device. It is not an accredited qualification.",
      chips: ["Which one is right for me?"]
    },
    {
      id: "progress",
      keys: ["progress", "save", "saved", "saving", "profile", "profiles", "pin", "share device", "family", "sibling"],
      answer: "Your progress is saved in your own browser on your own device. Nothing is sent to us. People sharing a device can each keep their own progress with separate profiles, and the Excel labs let you add an optional PIN.",
      chips: ["Which devices work?"]
    },
    {
      id: "share",
      keys: ["share", "sharing", "friend", "friends", "resell", "licence", "license", "copy", "forward", "group"],
      answer: "Each purchase is a personal licence for one buyer. Please don't copy, share, upload or resell the file. Friends can try the free samples on this site.",
      chips: ["Free sample"]
    },
    {
      id: "ai",
      keys: ["ai", "chatgpt", "gemini", "copilot", "claude", "artificial intelligence"],
      answer: "The Excel labs include a module on using AI tools to write Excel formulas and catch their mistakes. No AI is built into the file and you don't need an AI account.",
      chips: ["Which one is right for me?"]
    },
    {
      id: "video",
      keys: ["video", "videos", "lecture", "lectures", "youtube", "recorded", "live class"],
      answer: "There are no videos. Our products are read-and-do: a short lesson, then you practise and get your answer checked straight away. It's the doing that builds the skill.",
      chips: ["Free sample"]
    },
    {
      id: "about",
      keys: ["who", "who runs", "who made", "about", "founder", "behind", "trust", "genuine", "legit", "safe", "scam", "company"],
      answer: "99DigiProStore is a small Indian digital products store, a new initiative by a qualified CMA. Every product is planned, written and checked by the founder. Payments go through Instamojo, and you can try every product free before buying. <a href=\"about.html\">Read more about us</a>.",
      chips: ["Free sample", "Contact"]
    },
    {
      id: "affiliation",
      keys: ["icmai", "icai", "icsi", "institute", "official", "affiliated", "endorsed", "study material", "past papers", "microsoft"],
      answer: "We're independent. 99DigiProStore is not affiliated with, endorsed by or connected to ICMAI, ICAI, ICSI, any exam body or Microsoft. Our notes and questions are our own original work.",
      chips: ["About us"]
    },
    {
      id: "privacy",
      keys: ["privacy", "personal details", "personal data", "my data", "tracking", "cookies", "spam"],
      answer: "This website doesn't ask for your personal details and doesn't use advertising trackers. This helper doesn't send anything you type anywhere. When you buy, Instamojo collects what it needs to process your order. Read our <a href=\"policies.html#privacy\">privacy policy</a>.",
      chips: ["Contact"]
    },
    {
      id: "guarantee",
      keys: ["guarantee", "guaranteed", "pass", "marks", "rank", "result", "results", "placement", "expert", "become", "get a job", "job"],
      answer: "We don't promise marks, results or jobs. Our products give you a structured way to practise and see exactly where you need to improve. The rest is your effort.",
      chips: ["Free sample"]
    },
    {
      id: "upcoming",
      keys: ["new product", "coming", "upcoming", "next", "future", "other subjects", "intermediate", "cma inter", "cma intermediate", "cma final", "final", "more products", "request"],
      answer: "More products are on the way: study kits, productivity tools and finance tools. Have an idea for one? Email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>.",
      chips: ["What do you sell?"]
    },
    {
      id: "contact",
      keys: ["contact", "email", "support", "help", "human", "person", "talk", "call", "whatsapp", "phone number", "reach", "customer care"],
      answer: "Email us at <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>. We reply within 24 hours, Monday to Saturday. Email is our only support channel.",
      chips: []
    },
    {
      id: "thanks",
      keys: ["thanks", "thank you", "thank", "thx", "ok", "okay", "great", "cool", "nice", "bye"],
      answer: "You're welcome! If you have another question, just ask.",
      chips: ["What do you sell?", "Free sample"]
    }
  ];

  /* The buttons shown when the chat first opens. Each one is asked like a typed question. */
  var START_CHIPS = ["What do you sell?", "Prices", "Free sample", "How do I buy?", "How do I get the file?", "Refunds"];

  /* Some buttons are worded differently from the keywords. This maps them straight to an answer. */
  var CHIP_TO_ID = {
    "What do you sell?": "products",
    "Prices": "price",
    "Free sample": "sample",
    "How do I buy?": "buy",
    "How do I get the file?": "delivery",
    "How do I open it?": "open",
    "Refunds": "refund",
    "What are payment charges?": "charges",
    "Discounts": "discount",
    "Which devices work?": "devices",
    "Do I need Excel?": "excel-needed",
    "Is my progress saved?": "progress",
    "Which one is right for me?": "choose",
    "My file isn't working": "faulty",
    "Contact": "contact",
    "About us": "about"
  };

  /* ---------- 2. The matcher ---------- */

  /* Make text easy to compare: lower case, no punctuation, single spaces. */
  function clean(text) {
    return " " + text.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9₹]+/g, " ").trim() + " ";
  }

  /* Score every answer and return the best one, or null if nothing matched. */
  function findAnswer(question) {
    var q = clean(question);
    var best = null, bestScore = 0;
    FAQ.forEach(function (item) {
      var score = 0;
      item.keys.forEach(function (key) {
        var k = clean(key);
        // Match whole words only, so "pro" doesn't match "product".
        // A keyword also matches its plural, e.g. "mock" matches "mocks".
        if (q.indexOf(k) !== -1 || q.indexOf(k.replace(/ $/, "s ")) !== -1) {
          score += k.trim().split(" ").length;
        }
      });
      if (score > bestScore) { best = item; bestScore = score; }
    });
    return best;
  }

  function byId(id) {
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i].id === id) return FAQ[i];
    return null;
  }

  /* ---------- 3. The chat window ---------- */

  var root, log, chipRow, input, openBtn, isOpen = false, started = false;

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html) node.innerHTML = html;
    return node;
  }

  function addMessage(who, content, isHtml) {
    var msg = el("div", "dps-msg dps-" + who);
    if (isHtml) msg.innerHTML = content; else msg.textContent = content; // visitor text is never treated as HTML
    log.appendChild(msg);
    // Scroll so the start of a new answer is in view, even when the answer is long.
    log.scrollTop = who === "bot" ? msg.offsetTop - log.offsetTop - 8 : log.scrollHeight;
  }

  function showChips(list) {
    chipRow.innerHTML = "";
    (list && list.length ? list : START_CHIPS).forEach(function (label) {
      var b = el("button", "dps-chip");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", function () { ask(label); });
      chipRow.appendChild(b);
    });
  }

  function fallback(question) {
    var mail = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Question from the website") +
      "&body=" + encodeURIComponent(question);
    return "Sorry, I don't have an answer for that yet. Please <a href=\"" + mail + "\">email us</a> at " + EMAIL +
      " and we'll reply within 24 hours, Monday to Saturday.";
  }

  function ask(question) {
    question = question.trim();
    if (!question) return;
    addMessage("user", question, false);
    var item = CHIP_TO_ID[question] ? byId(CHIP_TO_ID[question]) : findAnswer(question);
    // A short pause so the reply feels natural.
    setTimeout(function () {
      if (item) { addMessage("bot", item.answer, true); showChips(item.chips); }
      else { addMessage("bot", fallback(question), true); showChips(START_CHIPS); }
    }, 250);
  }

  function setOpen(open) {
    isOpen = open;
    root.classList.toggle("dps-open", open);
    openBtn.setAttribute("aria-expanded", String(open));
    if (open && !started) {
      started = true;
      addMessage("bot", "Hi! I can answer common questions about our products, prices, payment, download and refunds. Tap a button or type your question.", false);
      showChips(START_CHIPS);
    }
    if (open) input.focus(); else openBtn.focus();
  }

  function build() {
    root = el("div", "dps-chat");
    root.innerHTML =
      "<button class=\"dps-open-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"dps-panel\">" +
        "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z\"/></svg>" +
        "<span>Questions?</span></button>" +
      "<div class=\"dps-panel\" id=\"dps-panel\" role=\"dialog\" aria-label=\"Questions and answers\">" +
        "<div class=\"dps-head\"><div><strong>Quick answers</strong><small>Automatic replies from our FAQ</small></div>" +
        "<button class=\"dps-close\" type=\"button\" aria-label=\"Close\">×</button></div>" +
        "<div class=\"dps-log\" aria-live=\"polite\"></div>" +
        "<div class=\"dps-chips\"></div>" +
        "<form class=\"dps-form\"><input type=\"text\" maxlength=\"200\" placeholder=\"Type your question\" aria-label=\"Type your question\" autocomplete=\"off\">" +
        "<button type=\"submit\">Send</button></form>" +
      "</div>";
    document.body.appendChild(root);

    openBtn = root.querySelector(".dps-open-btn");
    log = root.querySelector(".dps-log");
    chipRow = root.querySelector(".dps-chips");
    input = root.querySelector(".dps-form input");

    openBtn.addEventListener("click", function () { setOpen(!isOpen); });
    root.querySelector(".dps-close").addEventListener("click", function () { setOpen(false); });
    root.querySelector(".dps-form").addEventListener("submit", function (e) {
      e.preventDefault();
      ask(input.value);
      input.value = "";
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) setOpen(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
