// 20181006
//
// Quick script to scrape feat data off of the nethys website
//
// Example : http://aonprd.com/Feats.aspx
//
// Note: Requires jQuery, which is not loaded on the page by default
// (I use a utility I think was called jQuerify)

var t = document.getElementById('ctl00_MainContent_GridView6');
var r = t.childNodes[1].firstElementChild;

var feats = [];

while (r = r.nextSibling)
{
  var c1 = r.firstElementChild;
  var c2 = c1.nextSibling;
  var c3 = c2.nextSibling;

  var comments = [];
  
  var tags = [];  
  var name = c1.textContent.trim();
  
  var nameparts = name.split('*');
  if (nameparts.length > 1)
  {
    tags.push('combat feat');
    name = nameparts[0];
    if (nameparts[1] != undefined) name = name.concat(nameparts[1]);
  };
  
  nameparts = name.split('⊤⊤⊤');
  if (nameparts.length > 1)
  {
    tags.push('weapon mastery feat');
    name = nameparts[0];
    if (nameparts[1] != undefined) name = name.concat(nameparts[1]);
  };
  
  nameparts = name.split('⊤⊤');
  if (nameparts.length > 1)
  {
    tags.push('shield mastery feat');
    name = nameparts[0];
    if (nameparts[1] != undefined) name = name.concat(nameparts[1]);
  };
  
  nameparts = name.split('⊤');
  if (nameparts.length > 1)
  {
    tags.push('armor mastery feat');
    name = nameparts[0];
    if (nameparts[1] != undefined) name = name.concat(nameparts[1]);
  };

  var d = c1.firstChild.firstChild;

  while (d != null)
  {
    if (d.nodeName == 'IMG') comments.push(d.title.trim());
    d = d.nextSibling;
  };
  
  // Now for prereqs. Apparently they are delimited by , and ; at least.
  // Some have a period at the end.
  
  var prerequisites = c2.textContent.trim().replace(/;/g , ',').split(',');
  if (prerequisites.length == 1 && prerequisites[0].length < 2) prerequisites = [];
  
  var feat = 
  {
    name          : name,
    comments      : comments,
    prerequisites : prerequisites,
    description   : c3.textContent.trim(),
    tags          : tags
  };
  
  var blah;
  if (name == 'Implacable') {console.log(feat); blah = feat;}
  
  feats.push(feat);
  
};

copy(feats);


///
// Want to get the subset that are combat feats?
///

function isCombatFeat(feat){return feat.tags.includes('combat feat');}

var combatFeats = feats.filter(isCombatFeat);

///
// Sort those by number of requirements?
///

function hasFewerPrerequisites(feat1, feat2) {return feat1.prerequisites.length - feat2.prerequisites.length; }

var sortedCombatFeats = combatFeats.sort(hasFewerPrerequisites);

///
// I can do better on sorting...how about deriving level requirements?
// Base attack bonus and skill ranks are both related to that.
///

function estimateLevelRequirement(feat)
{
  var estimate = 1;
  for (let prereq of feat.prerequisites)
  {
    var reBAB = /base attack bonus \+(\d*)/i;
    var bab   = reBAB.exec(prereq);
    if (bab != null) estimate = Math.max(estimate, parseInt(bab[1]));
    
    var reRanks = / (\d*) ranks/;
    var ranks = reRanks.exec(prereq);
    if (ranks != null) estimate = Math.max(estimate, parseInt(ranks[1]));
  };
  return estimate;
};

// note am using a different array here

for (let feat of handysFeats)
{
  feat.estimatedLevelRequirement = estimateLevelRequirement(feat);
}

// then sort by this value then number of reqs

function seemsMoreAccessible (feat1, feat2)
{
  var result = feat1.estimatedLevelRequirement - feat2.estimatedLevelRequirement;
  if (result == 0) result = feat1.prerequisites.length - feat2.prerequisites.length;
  return result;
}

handysFeats.sort(seemsMoreAccessible);

///
// Still a lot. Can I derive chains of requirements?
///

function getFeatChains(feats)
{
  var chains = [];
  for (let feat of feats)
  {
    let links = [];
    for (let prereq of feat.prerequisites)
    {
      if (feats.find(feat => feat.name === prereq)) links.push(prereq);
    }
    for (let link of links)
    {
      var chain = chains.find(chain => chain[chain.length-1] == link);
      var i = chains.indexOf(chain);
      if (i >= 0) chains[i].push(feat.name);
      else chains.push(new Array(link, feat.name));
    }
    
    // then maybe find chains ending in the same feat?
    // actually that doesnt work as they may have been added to
    // so either make a chain for each feat, or...
    // build it differently?
    // honestly it's a dependency tree, if built that way it
    // would be relatively easy to print dependencies from each leaf.
    
    
    
    /*
    // ok so this method creates a single string but fails on multiple dependencies
    if (links.length == 1)
    {
      var chain = chains.find(chain => chain.endsWith(' -> ' + links[0]));
      var i = chains.indexOf(chain);
      if (i >= 0) chains[i] = chains[i].concat(' -> ', feat.name);
      else chains.push(links[0] + ' -> ' + feat.name);
    }    
    //if (links.length > 1) console.log('special case not handled for ' + feat.name);
    */
  }
  return chains;
}

// trying a new approach, building the dependency tree into the array itself
function addDependencies(feats)
{ 
  for (let feat of feats)
  {
    feat.parents = [];
    for (let prereq of feat.prerequisites)
    {
      var parent = feats.find(feat => feat.name === prereq);
      if (parent) feat.parents.push(parent);
    }
  }
  return feats;
}

// many have dependencies that repeat their parents dependencies, need to adapt to this
// maybe as traversing backwards, remove from pending any that are found, and...
// check existing paths for parents before searching elsewhere?

// recurse check
function isDependentOn(feat, deadbeat)
{
  // a feat is not dependent on itself
  if (feat.name == deadbeat) return false;
  
  // a feat with no parents is dependent on nothing
  if (feat.parents == undefined) return false;
  
  var owesChildSupport = false;
  
  for (let parent of feat.parents)
  {
    if (parent.name == deadbeat) owesChildSupport = true;
    else owesChildSupport = owesChildSupport || isDependentOn(parent, deadbeat);
  }
  
  return owesChildSupport;
}

function addDependenciesCarefully(feats)
{ 
  for (let feat of feats)
  {
    feat.parents = [];
    for (let prereq of feat.prerequisites)
    {
      // if not already depenedent on this
      if (!isDependentOn(feat, prereq))
      {
        var parent = feats.find(feat => feat.name === prereq);
        if (parent) feat.parents.push(parent);
      }
    }
  }
  
  // Maybe go through again and cleanup?
  // Cannot do that while adding as order is unknown.
  
  for (let feat of feats)
  {
    var ancestors = [];
    for (let p1 of feat.parents)
    {
      for (let p2 of feat.parents)
      {
        if (isDependentOn(p1, p2)) ancestors.push(p2);
      }
    }
    
    for (let a of ancestors)
    {
      var i = feat.parents.indexOf(a);
      feat.parents.splice(a, 1);
    }
  }
  
  // Ok this isn't perfect, but it's not bad. Still getting some
  // (e.g., Cloak and Dagger Subterfuge) listing ancestors
  // (Mobility and Dodge) but others look ok at first glance.
  
  return feats;
}

function getAncestry(feats)
{
  var ancestry = [];
  
  if (!Array.isArray(feats))
  {
    // just do it once
    var feat = feats;
    if (feat.parents.length < 1) ancestry.push(feat.name);
    else for (let parent of feat.parents)
    {
      var lineage = getAncestry(parent);
      for (let ancestor of lineage)
      {
        ancestry.push(ancestor + ' -> ' + feat.name);
      }
    }
  }
  else for (let feat of feats)
  {
    if (feat.parents.length < 1) ancestry.push(feat.name);
    else for (let parent of feat.parents)
    {
      var lineage = getAncestry(parent);
      for (let ancestor of lineage)
      {
        ancestry.push(ancestor + ' -> ' + feat.name);
      }
    }    
  }
  return ancestry;
}

// Can I get only the longest chains?

function getLongestChains(feats)
{
  var long = [];
  for (let feat of feats)
  {
    var found = feats.filter(f => f.includes(feat));
    if (found.length < 2) long.push(feat);
  }
  return long;
}