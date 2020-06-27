const sideNavElems = document.querySelector('.sidenav');
const selectElems = document.querySelector('#status');

M.Sidenav.init(sideNavElems);
M.FormSelect.init(selectElems);

CKEDITOR.replace('body', {
  plugins: 'wysiwygarea, toolbar, basicstyles, link',
});
