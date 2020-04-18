/*  
  Javascript Nice Select - v1.0
  https://github.com/mustafabakirci/jquery-nice-select
  Made by Hernán Sartorio, Developed by Mustafa Bakırcı  
*/

const niceSelectJS = function(selectName , options) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let settings = {};
    settings.activeMobile = false;
    for (var userOpt in options) {
      if (options.hasOwnProperty(userOpt)) {
          settings[userOpt] = options[userOpt];
      }
    }
    if (!(settings.activeMobile) && isMobile) {
      return;
    }

    selectName = document.querySelectorAll(selectName);
    selectName.forEach(select => {
      select.style.display = 'none';
      if (!(select.nextElementSibling)) {
        create_nice_select(select);
      }

      
    });
  
    function create_nice_select(select) {
      let divSelect = document.createElement( 'div' );
      let classes = select.getAttribute('class');
      if (!classes == '') {
        divSelect.classList.add(classes);
      }
      divSelect.classList.add("nice-select");
      divSelect.setAttribute('tabindex', select.getAttribute('disabled') ? null : '0');
      divSelect.innerHTML = '<span class="current"></span><ul class="list"></ul>';
      // addClass($select.attr('disabled') ? 'disabled' : '') disable özelliği eklenicek
  
      select.parentNode.insertBefore( divSelect, select.nextSibling );
  
      let dropdown = select.nextElementSibling;
      let _options = select.getElementsByTagName('option');
      let selected = select.getElementsByTagName('option:selected');
  
      dropdown.querySelector('.current').innerHTML = select.getAttribute('data-display') || select.firstChild.nextElementSibling.innerText;

      for (const child of _options) {
          let listUl = dropdown.querySelector('.list');
          let listItem = document.createElement('li');
          listItem.innerHTML = child.textContent;
          listItem.setAttribute('data-value', child.value)
          listItem.classList.add('option');
          if (child.getAttribute('disabled') == '' || child.getAttribute('disabled') == 'disabled') {
            listItem.classList.add('disabled');
          } else if (child.getAttribute('selected') == '' || child.getAttribute('selected') == 'selected') {
            listItem.classList.add('selected');
          }
  
          listUl.appendChild(listItem);
  
      }
    }
    
  // Open/close
    let allSelects = document.querySelectorAll('.nice-select');
  
    allSelects.forEach(link => {
      link.addEventListener('click', function(){ 
        if(this.classList.contains('open')) {
          this.classList.remove('open');
          if(this.querySelector('.focus') !== null){
            this.querySelector('.focus').classList.remove('focus');
          }
        } else {
          allSelects.forEach(el => {
            el.classList.remove('open');
          });
          this.classList.add('open');
          if(this.querySelector('.selected') !== null){
            this.querySelector('.selected').classList.add('focus');
          } 
        }
      }); 
    });
  
  // Close when clicking outside
    document.addEventListener('click', function(e){
      if(e.target.closest('.nice-select') === null) {
        allSelects.forEach(el => {
          el.classList.remove('open');
        });
      }
    });
  
  // Option click
  document.querySelectorAll('.nice-select .option:not(.disabled)').forEach(link => {
     link.addEventListener('click', function(e){
        let option = e.target;
        let dropdown = option.closest('.nice-select');
        if( dropdown.querySelector('.selected') !== null){
          dropdown.querySelector('.selected').classList.remove('selected');
         }
        option.classList.add('selected');
        let text = option.textContent;
        dropdown.querySelector('.current').textContent = text;
        dropdown.previousSibling.value = option.getAttribute('data-value');
      });
    });
    
    return this;
  
  };