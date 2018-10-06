// 20181006
//
// Quick script to scrape archetype data off of the nethys website
//
// Example : http://aonprd.com/Archetypes.aspx?Class=Alchemist
//
// Note: Requires jQuery, which is not loaded on the page by default
// (I use a utility I think was called jQuerify)

archetypes = [];
$('tr').each(function(i, tr)
{
td_name     = $('td', tr)[0];
td_replaces = $('td', tr)[1];
td_summary  = $('td', tr)[2];
name     = (td_name     == undefined)?'undefined':td_name.textContent.trim();
replaces = (td_replaces == undefined)?'undefined':td_replaces.textContent.trim();
summary  = (td_summary  == undefined)?'undefined':td_summary.textContent.trim();
archetype =
{
  'name'     : name ,
  'replaces' : replaces,
  'summary'  : summary
};
archetypes.push(archetype);
//console.log(name + ' : ' + replaces + ' : ' + summary);
});
console.log(archetypes);
copy(archetypes)

// To get the json object in the clipboard:
// copy(archetypes)


////

// Separate script to extract class details
// Example: http://aonprd.com/ClassDisplay.aspx?ItemName=Monk%20(Unchained)

var foo = document.getElementById('ctl00_MainContent_DataListTypes_ctl00_LabelName');
var desc = foo.childNodes[5].textContent.trim();
var role = foo.childNodes[10].textContent.trim();
role = role.startsWith(':')?role.substring(1).trim():role;
var c =
{
  'description' : desc ,
  'role'        : role
};
console.log(desc);
console.log(role);
copy(c);