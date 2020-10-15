// Link Class
class Link{
   constructor(name, link, id){
      this.name = name;
      this.link = link;
      this.id = id;
   }
}

// UI CLASS
class UI{
   static displayLinks(){
      const links = Store.getLinks();
      links.forEach((link) => UI.addLink(link))
      
   }
   static addLink(newLink){
      // Create a new Div
      const newDiv = document.createElement('div');
      newDiv.classList.add('link');
      newDiv.innerHTML = `
         <div>
            <strong class="primary-color">${newLink.name}:</strong>
            <p>${newLink.link}</p>
         </div>
         <button class="delete">
            <i class="fas fa-trash"></i>
         </button>
         <button class="copy">
            <i class="fas fa-clipboard"></i>
         </button>
      `;
      
      // Append to the Link section
      const linkSection = document.querySelector('#links-section');
      linkSection.appendChild(newDiv);
   }

   // Copy to Clip Board
   static copyClipboard(e){
      // Create Text Area
      const textArea = document.createElement('textarea');
      // Grab the URL
      const URL = e.parentElement.children[0].children[1].innerText;
      textArea.value = URL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      UI.showAlert(`${URL} has been copied to Clipboard`, 'success')

   }

   static clearFields(){
      document.querySelector('#name').value = '';
      document.querySelector('#link').value = '';
   }

   static showAlert(message, className){
      // Create a new Div
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${className}`;
      alertDiv.innerHTML = message;
      const main = document.querySelector('main');
      const form = document.querySelector('form');
      main.insertBefore(alertDiv, form);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }

}

// STORE CLASS
class Store{
   static getLinks(){
      let links;
      if(localStorage.getItem('links') === null){
         links = [];
      }else{
         links = JSON.parse(localStorage.getItem('links'));
      }

      return links;
   }
   
   static addLink(newLink){
      let links;
      if(localStorage.getItem('links') === null){
         links = [];
      }else{
         links = JSON.parse(localStorage.getItem('links'));
      }
      links.push(newLink);

      localStorage.setItem('links', JSON.stringify(links))
   }

   static removeLink(siteUrl){
     const links = Store.getLinks();

     links.forEach((link, index) =>{
         if(link.link === siteUrl){
            links.splice(index, 1);
            localStorage.setItem('links', JSON.stringify(links))
         }
     })
  
   }
}

// EVENTS
const linkSection = document.querySelector('#links-section');
linkSection.addEventListener('click', deleteLink);
linkSection.addEventListener('click', clipboard);
document.addEventListener('DOMContentLoaded', UI.displayLinks())

const form = document.querySelector('form').addEventListener('submit', (e) =>{
   e.preventDefault();

   const name = document.querySelector('#name').value;
   const link = document.querySelector('#link').value;

   if(name === '' ||  link === ''){
      UI.showAlert('Please Fill All Fields', 'error')
   }else{
      const newLink = new Link(name, link);

      UI.addLink(newLink);

      // Show Alert
      UI.showAlert(`${newLink.name} is added to your YouTube Links`, 'success')

      // Save to Local Storage
      Store.addLink(newLink);

      // Clear Field
      UI.clearFields();
   }
})

function deleteLink(e){
   if(e.target.classList.contains('delete')){
      const linkDiv = e.target.parentElement;

      // Animation
      linkDiv.classList.add('animate');

      // Remove from Local Storage
      Store.removeLink(e.target.parentElement.children[0].children[1].innerText)

      linkDiv.addEventListener('transitionend', ()=>{
         linkDiv.remove();
      })

   }else{
      return;
   }
}

function clipboard(e){
   if(e.target.classList.contains('copy')){
      UI.copyClipboard(e.target);
   }else{
      return;
   }
}
