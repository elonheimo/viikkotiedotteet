function getSubHeaders(name) {
  let h2 = [...document.querySelectorAll('h2')]
    .filter(h3 => h3.innerHTML.includes(name))
  if (h2.length === 0) {
    console.error('No h2 with name ' + name);
    return;
  }
  h2 = h2[0];
  h2.id = name;
  let h3s = [];
  let sibling = h2.nextElementSibling;
  while (sibling) {
    if (sibling.tagName.toLowerCase() === 'h2') {
      break;
    }
    if (sibling.tagName.toLowerCase() === 'h3') {
      h3s.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }
  h3s.forEach((h3, index) => {
    h3.id = name + '-' + index;
  });
  return h3s;
}

function appendToMenu(menu,name,subHeaders) {
  let paalinkki = document.createElement('a');
  paalinkki.className = 'menu-paalinkki';
  paalinkki.innerHTML = name;
  paalinkki.href = '#' + name;
  menu.appendChild(paalinkki);
  
  if (subHeaders === undefined) return;
  menu.appendChild(document.createElement('br'))
  subHeaders.forEach((subHeader, index) => {
    let linkki = document.createElement('a');
    linkki.className = 'menu-linkki';
    linkki.innerHTML = subHeader.innerHTML;
    linkki.href = '#' + name + '-' + index;
    menu.appendChild(linkki);
    menu.appendChild(document.createElement('br'))

  });

}

function addSimpleHeader(menu, name) {
  let h2 = [...document.querySelectorAll('h2')]
    .filter(h2 => h2.innerText.includes(name))
  if (h2.length === 0) {
    console.error('No h2 with name ' + name);
    return;
  }
  if (h2.length > 1) {
    console.error('Multiple h2 with name ' + name);
    return;
  }
  h2 = h2[0];
  h2.id = name.replace(' ', '-');
  let linkki = document.createElement('a');
  linkki.className = 'menu-paalinkki';
  linkki.innerHTML = name;
  linkki.href = '#' + h2.id;
  menu.appendChild(linkki);
}

let menu = document.createElement('div');
menu.className = 'menu-tausta';


let tiedotusAsiat = getSubHeaders('TIEDOTUSASIAT');
if (tiedotusAsiat) appendToMenu(menu, 'TIEDOTUSASIAT', tiedotusAsiat);

let tapahtumat = getSubHeaders('TAPAHTUMAT');
appendToMenu(menu, 'TAPAHTUMAT', tapahtumat);

addSimpleHeader(menu, 'TULEVAT KOKOUKSET');
addSimpleHeader(menu, 'VIIKOITTAIN TOISTUVAT');
addSimpleHeader(menu, 'PÄIVYSTYSAJAT');


document.body.prepend(menu);