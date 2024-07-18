/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

document.addEventListener('DOMContentLoaded', () => {
   const studentsPerPage = 9;
   const studentList = document.querySelector('.student-list');
   const header = document.querySelector('.header');
   const searchBarHtml = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML('beforeend', searchBarHtml);
   const searchInput = document.getElementById('search');

   /**
    * Displays a specific page of students on the webpage.
    *
    * @param {Array} list - The list of student objects to paginate.
    * @param {number} page - The page number to display.
    */
   const showPage = (list, page) => {
      const startIndex = (page * studentsPerPage) - studentsPerPage;
      const endIndex = (page * studentsPerPage) - 1;
      studentList.innerHTML = '';

      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i <= endIndex) {
            const html = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
            studentList.insertAdjacentHTML('beforeend', html);
         };
      }
   };

   /**
    * Adds pagination buttons based on the number of students and sets up event listeners for page navigation.
    *
    * @param {Array} list - The list of student objects to paginate.
    */
   const addPagination = (list) => {
      const numberOfButtons = Math.ceil(Math.floor(list.length / studentsPerPage));
      const paginationList = document.querySelector('.link-list');
      paginationList.innerHTML = '';

      for (let i = 1; i <= numberOfButtons; i++) {
         const buttonHtml = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
         paginationList.insertAdjacentHTML('beforeend', buttonHtml);
         paginationList.querySelector('button').classList.add('active');
      };

      paginationList.addEventListener('click', (e) => {
         const activeButton = paginationList.querySelector('.active');
         const buttonClicked = e.target.closest('button');

         if (buttonClicked.tagName.toLowerCase() === 'button') {
            activeButton.classList.remove('active');
            buttonClicked.classList.add('active');
            showPage(list, buttonClicked.innerHTML);
         };
      });
   };

   /**
    * Filters the student list based on the user's input and updates the pagination and displayed page.
    */
   searchInput.addEventListener('keyup', (e) => {
      const filteredList = [];
      const userInput = searchInput.value.toLowerCase();

      for (let i = 0; i < data.length; i++) {
         const studentName = `${data[i].name.first} ${data[i].name.last}`.toLowerCase();

         if (studentName.includes(userInput)) {
            filteredList.push(data[i]);
         }

         if (filteredList.length > 0) {
            showPage(filteredList, 1);
            addPagination(filteredList);
         } else {
            const noResultsFoundHtml = `<h3>No results found</h3>`
            studentList.innerHTML = noResultsFoundHtml;
         }
      }
   });

   // Call functions
   addPagination(data);
   showPage(data, 1);
});
