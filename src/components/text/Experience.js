import icons from "./Icons";

const experience = [
  {
    index: 1,
    organization: "My Verification Service",
    website:
      "<a style='color:black;' href='https://talentscreen.mvsi.com'>https://talentscreen.mvsi.com</a>",
    role: "Software Engineer",
    workPeriod: "December 2018 ~ Present",
    width: {
      xs: 12,
      md: 4
    },
    section: [
      {
        title: "Duties and Responsibility",
        body: [
          "Develop and implement new software programs",
          "Maintain and improve the performance of existing software",
          "Design and update software, databases, and architectures.",
          "Test and maintain software products to ensure strong functionality and optimization.",
          "Recommend improvements to existing software programs as necessary."
        ],
        image: icons.faListAlt,
        hide: true
      },
      {
        title: "Projects",
        body: [
          "Multi languages system",
          "Action center",
          "Dashboard page",
          "Customizable email templates",
          "Client sales form",
          "Help desk support system",
          "Excel exporter",
          "Weekly report emailing system",
          "Test systems",
          "Website configuration"
        ],
        image: icons.faTasks,

        hide: true
      },
      {
        title: "Tools",
        body: [
          "React",
          "Next.js",
          "Meteor.js",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "Git",
          "Jira",
          "BrowerStack",
          "SendGrid"
        ],
        image: icons.faTools,
        hide: true
      }
    ],
    list: [
      "Used React.js, Node.js and MongoDB to build and maintain website.",
      "Developed a multi languages system, support eight languages in website.",
      "Developed action center, it records all the user’s history, such as create order, authorize order and delete files etc. It only allows the manager to view the history in website. It is useful to figure out the bugs in system.",
      "Developed and designed the dashboard page, which helps our clients to easily review the new orders, delayed orders, weekly orders graph, and top partners monthly approved orders value graph.",
      "Developed a system to auto generate the MBF report for our client.",
      "Designed and developed a customizable email templates, it allows client to edit the context.",
      "Base on client requirements to developed and designed the sales form.",
      "Built a IT help desk support system, it allows verification team and clients to submit the enquire from the website and redirect the email to our support system.",
      "Built an excel exporter, which control the authorization of users who can download files and review details from orders and verification documents.",
      "Developed weekly report emailing system, which allows our clients to subscribe to the mailing list to review reports. From the report they can see the order details, customer info and current progress etc.",
      "Lead the testing of newly released features and relevant debugging duties",
      "Used BrowserStack to test the web application in different types of browser and mobile platform and fixed the layout issues.",
      "Helped new client to setup the website configuration, it allows them to access our demo website to play around."
    ]
  },
  {
    index: 2,
    organization: "Manukau Institute of Technology",
    website: "",
    role: "Intern",
    workPeriod: "April 2018 ~ September 2018",
    width: {
      xs: 12,
      md: 4
    },
    section: [
      {
        title: "Aim",
        body:
          "The aim of this project is to develop and design the Tic Tac Toe AI mobile app. The app is published on &nbsp;. ",
        image: icons.faBullseye,
        hide: true
      },
      {
        title: "Support Features",
        body: [
          "Multiplayer over network",
          "All devices and tablets",
          "Players can play against the computer with different levels"
        ],
        image: icons.faListUl,
        hide: true
      },
      {
        title: "Tools and Resource",
        column: 1,
        isLink: true,
        body: [
          "React Native",
          "Git",
          "Php",
          "Apache",
          '<a alt="Google Play Store" style="color:white;" href="https://play.google.com/store/apps/details?id=com.mit.tictactoeai">Google Play Store</a>',
          '<a alt="Apple Store" style="color:white;" href="https://apps.apple.com/us/app/tic-tac-toe-ai/id1419451065">Apple Store</a>',
          '<a alt="Github" style="color:white;" href="https://github.com/jchu521/React_Native_TicTacToe">Github Source Code</a>',
          '<a alt="support website" style="color:white;" href="https://tictactoegame.wordpress.com/">Support Website</a>.'
        ],
        image: icons.faTools,
        hide: true
      }
    ]
  }
];

export default experience;
