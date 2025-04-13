src/
|-- components/                # Reusable UI components
|   |-- common/                # Shared, generic components (buttons, modals, etc.)
|   |   |--           
|   |   |-- 
|   |   |-- 
|   |-- layout/                # Structural components (sidebar, navbar, etc.)
|   |   |-- Sidebar/
|   |   |   |-- AccountMenu.jsx
|   |   |   |-- Sidebar.jsx
|   |   |   |-- Sidebar.module.css
|   |   |-- Navbar/
|   |   |   |-- Navbar.jsx
|   |   |   |-- Navbar.module.css
|   |   |-- Footer/
|   |   |   |-- 
|   |   |   |-- 
|   |-- layout/ 
|   |   |   |-- ChapterContent.jsx 
|
|
|-- mocks/
|   |-- db.json
|
|-- hooks/                     # Custom React hooks (e.g., useAuth, useFetch)
|   |-- useChapterData.js 
|   |-- 
|
|-- contexts/                  # Context API files for global state management
|   |-- 
|
|-- pages/                     # Page-level components
|   |-- LandingPage/
|   |   |-- ContactUs/
|   |   |   |-- ContactUs.jsx
|   |   |   |-- ContactUs.css
|   |   |-- DomainSection/
|   |   |   |-- DomainCard.jsx
|   |   |   |-- DomainCard.css
|   |   |   |-- Domains.jsx         ## will reuse the domainCard , got click event links us to ChapterHomeLayout
|   |   |   |-- Domains.css 
|   |   |-- HeroSection/
|   |   |   |-- HeroSection.jsx
|   |   |   |-- HeroSection.css
|   |   |-- MeetOurTeam/
|   |   |   |-- MeetOurTeam.jsx
|   |   |   |-- MeetOurTeam.css
|   |   |   |-- profile.jsx
|   |   |   |-- profile.css
|   |   |-- Navbar/
|   |   |   |-- Navbar.jsx
|   |   |   |-- Navbar.css
|   |   |-- RnaqSection/
|   |   |   |-- RnaqSection.jsx
|   |   |   |-- RnaqSection.css
|   |   |-- LandingPage.jsx
|   |   |-- LandingPage.css
|   |-- OverView/
|   |   |-- AnsweredQuestionsCountTable/
|   |   |   |-- AnsweredQuestionsCountTable.jsx
|   |   |   |-- AnsweredQuestionsCountTable.css
|   |   |-- AnsweredQuestionsDonutChart/
|   |   |   |-- AnsweredQuestionsDonutChart.jsx
|   |   |   |-- AnsweredQuestionsDonutChart.css
|   |   |-- QuestionList/
|   |   |   |-- QuestionSingle.jsxcalled
|   |   |   |-- QuestionSingle.css
|   |   |   |-- QuestionList.jsx                #will reuse the question single
|   |   |   |-- QuestionList.css
|   |   |-- OverView.jsx                        ##The Overview page (valled inside ChapterHome) 
|   |   |-- OverView.css
|   |-- ChapterHome/                            #main entry for each domain (we get here from DomainSection)
|   |   |-- ChapterHomeLayout.jsx
|   |   |-- ChapterHomeLayout.css
|   |-- ChapterPage/ 
|   |   |-- ChapterPage.jsx   
|
|-- Routes/                  #API calls and external services
|   |-- Routes.jsx
|
|
|-- services/                  #API calls and external services
|   |-- api.js
|   |-- 
|
|-- utils/                      #Utility/helper functions
|   |-- chart.js                #charts functionalities 
|
|-- features/                    #Feature-based architecture (better for scalability) //this whole are didnt get created
|   |-- Dashboard/             
|   |   |-- Dashboard.jsx        
|   |   |-- Dashboard.module.css
|   |   |-- components/          # Dashboard-specific UI parts
|   |       |-- Chart.jsx
|   |       |-- SummaryCard.jsx
|   |-- Authentication/
|   |   |-- Login.jsx
|   |   |-- Signup.jsx
|   |   |-- authSlice.js       # Redux slice (if using Redux for state management)
|-- store/                     # State management (Redux, Zustand, etc.) //this whole are didnt get created
|   |-- store.js
|   |-- slices/
|   |   |-- userSlice.js
|
|-- styles/                    # Global styling
|   
|-- App.jsx                     # Root component
|-- main.jsx                    # ReactDOM entry point
|-- index.css                    # Main CSS file
