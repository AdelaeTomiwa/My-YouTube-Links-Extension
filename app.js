// const videoName = document.querySelector('.video-name');
// const videoLink = document.querySelector('.video-link');
// const form = document.querySelector('#form');

// // Get Local Links
// document.addEventListener('DOMContentLoaded', getLinks)

// form.addEventListener('submit', (e) =>{
//    e.preventDefault();
   
//    if(videoName.value === '' || videoLink.value === ""){
//       // Create an error div
//       const errorDiv = document.createElement('div');
//       errorDiv.classList.add('error-div');
//       errorDiv.innerHTML = 'Please Enter All Fields';

//       const container = document.querySelector('.container');
//       container.insertBefore(errorDiv, form);

//       // Set Time out
//       setTimeout(() => errorDiv.remove(), 3000)
//    }else{
//       // Create a div
//       const linkDiv = document.createElement('div');
//       linkDiv.innerHTML = `
//          <h4>
//             <span>
//                ${videoName.value} :
//             </span>
//             ${videoLink.value}
//          </h4>
//       `;
//       // Append to the Links Section
//       const linkSection = document.querySelector('.links-section');
//       linkSection.appendChild(linkDiv);

//       saveToLocal(`${videoName.value}  ${videoLink.value}`)

//       // Clear the fields

//       videoName.value = '';
//       videoLink.value = '';
//    }
// })

// // Save to local storage
// function saveToLocal(link){
//   let links;
//   if(localStorage.getItem('link') === null){
//       links = [];
//   }else{
//      links = JSON.parse(localStorage.getItem('link'));
//   }

//   links.push(link);
//   localStorage.setItem('link', JSON.stringify(links))
// }

// // Get Local Links
// function getLinks(){
//    let links;
//   if(localStorage.getItem('link') === null){
//       links = [];
//   }else{
//      links = JSON.parse(localStorage.getItem('link'));
//   }

//   links.forEach((link)=>{
//       // Create a div
//       const linkDiv = document.createElement('div');
//       linkDiv.innerHTML = `
//          <h4>
//             <span>
//                ${link} :
//             </span>
//             ${link}
//          </h4>
//       `;

//       // Append to the Links Section
//       const linkSection = document.querySelector('.links-section');
//       linkSection.appendChild(linkDiv);
//   })
// }

// Link Class
class Link{
   constructor (name, link, id){
      this.name = name;
      this.link = link;
      this.id = id;
   }
}

// UI CLASS
class UI{
   static displayLinks(){
      const links = Store.getFromLocal();
      links.forEach((link)=> UI.addLink(link))
   }

   static addLink(newLink){
      // Create a new Div
      const linkDiv = document.createElement('div');
      linkDiv.classList.add('link');
      linkDiv.innerHTML = `
      <div>
         <h4>
            <span>${newLink.name}:</span>
            <a target = "_blank" href="${newLink.link}">${newLink.link}</a> 
         </h4>
      </div>
      <button>
         <i class="fas fa-clipboard copy"></i>
      </button>
      <button>
         <i class ="fas fa-trash delete"></i>
      </button>
      `;
      // Append to the Links Section
      const linkSection = document.querySelector('.links-section');
      linkSection.appendChild(linkDiv);

   }

   static showAlert(message, className){
      // Create a div
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${className}`;
      alertDiv.innerHTML = message;
      
      const container = document.querySelector('.container');
      container.insertBefore(alertDiv, form);

      // Set Time out
      setTimeout(()=> document.querySelector('.alert').remove(), 3000)
   }

   static clearFields(){
      document.querySelector('.video-name').value = '';
      document.querySelector('.video-link').value = '';
   }
}

// STORAGE CLASS
class Store{
   static getFromLocal(){
      let links;
      if(localStorage.getItem('link') === null){
            links = [];
      }else{
         links = JSON.parse(localStorage.getItem('link'));
      }

      return links;
   }

   static addToLocal(link){
      let links;
      if(localStorage.getItem('link') === null){
            links = [];
      }else{
         links = JSON.parse(localStorage.getItem('link'));
      }

      links.push(link);
      localStorage.setItem('link', JSON.stringify(links));
   }
}

// EVENTS
document.addEventListener('DOMContentLoaded', UI.displayLinks)
const form = document.querySelector('#form');

form.addEventListener('submit', formSubmitted)
// FUNCTION
function formSubmitted(e){
   e.preventDefault();   

   const videoName = document.querySelector('.video-name').value;
   const videoLink = document.querySelector('.video-link').value;

   if(videoName === '' || videoLink === ''){
      UI.showAlert('Please Enter all Fields', 'error');
   }else{
      const newLink = new Link(videoName, videoLink);

      UI.addLink(newLink);

      // Add to Local Storage
      Store.addToLocal(newLink);

      // Clear Fields
      UI.clearFields();
   }
}
