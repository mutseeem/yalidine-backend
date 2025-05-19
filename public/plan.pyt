## This is the project structure ## 


src/
|-- assests/                   # Resources 
|   |-- icons/                 # This folder contains the SVG-PNG icons used in the project 
|   |-- images/                # This folder contains the JPEG files used in the project 
|   |-- docs/                  # This folder contains the PDF , WORD , PPT files used in the project 
|
|-- components/                # Reusable UI components 
|   |-- common/                # Shared, generic components (buttons, modals, etc.)
|   |   |-- ChartCard/         # The ChartData Card 
|   |   |   |-- ChartCard.jsx
|   |   |   |-- ChartCard.module.css
|   |   |   |-- ToolsSideBar.jsx
|   |   |   |-- ToolsSideBar.module.css
|   |   |   |-- ChartArea.jsx
|   |   |   |-- ChartArea.module.css
|   |   |   |
|   |   |-- DocumentCard/      # The Document Card 
|   |   |   |-- DocumentCard.jsx
|   |   |   |-- DocumentCard.module.css
|   |   |   |
|   |   |-- QuestionCollapsibleSection.jsx          #the question collapsible section (it might call either the chart card or the document card or both)
|   |   |-- QuestionCollapsibleSection.module.css
|   |   |
|   |-- common/                #Dummy data for the project to test the UI 
|   |   |-- DummyData.jsx  
|   |   |
|   |-- layout/                # Structural components (sidebar, navbar, etc.)
|   |   |-- Sidebar/
|   |   |   |-- AccountMenu.jsx
|   |   |   |-- Sidebar.jsx
|   |   |   |-- Sidebar.module.css
|   |   |-- Navbar/
|   |   |   |-- Navbar.jsx
|   |   |   |-- Navbar.module.css
|   |   |-- Footer/
|   |   |   | 
|   |-- temp/
|   |   |-- FirstQuestion.jsx    ##just a temp componenet that fetch the first question using API CALL 
|   |   |-- SecondQuestion.jsx   ##just a temp componenet that fetch the Second question using API CALL            
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
