import {array,text,https,issue,table,issuesHTML,escape} from './util.js';
export const guide='Supply sourceOrigin, targetOrigin, legacyUrls and mapping (old_url, new_url, status, reason). No URLs are fetched. Paths and query strings remain significant; fragments identify the same server resource.';
export function analyse(input){
 const source=new URL(text(input.sourceOrigin,'sourceOrigin')),target=new URL(text(input.targetOrigin,'targetOrigin'));
 if(!https(source.href)||!https(target.href))throw Error('Origins must use HTTPS without credentials');
 const issues=[],map=new Map(),rows=[];
 const absolute=(value,origin)=>{const u=new URL(text(value,'URL'),origin);if(!https(u.href))throw Error('Unsafe URL: '+value);u.hash='';return u.href;};
 for(const row of array(input.mapping,'mapping')){
  const old=absolute(row.old_url,source),next=row.new_url?absolute(row.new_url,target):null;
  if(new URL(old).origin!==source.origin)throw Error('Source URL outside expected origin');
  if(![301,302,307,308,404,410].includes(Number(row.status)))throw Error('Unsupported HTTP status');
  if(Number(row.status)<400&&!next)throw Error('A redirect requires a destination');
  if(Number(row.status)>=400&&next)throw Error('Retired URLs must not have redirect destinations');
  if(map.has(old))throw Error('Duplicate or conflicting mapping for '+old);
  map.set(old,next);rows.push({...row,old_url:old,new_url:next,status:Number(row.status)});
  if(next&&new URL(next).origin!==target.origin)issues.push(issue('external','Destination is outside the expected target origin',old));
  if(next&&new URL(old).search!==new URL(next).search)issues.push(issue('query','Query string changes; confirm this is intentional',old));
 }
 for(const url of array(input.legacyUrls,'legacyUrls')){const old=absolute(url,source);if(new URL(old).origin!==source.origin)throw Error('Inventory URL outside source origin');if(!map.has(old))issues.push(issue('unmapped','No mapping or retirement decision',old));}
 for(const row of rows){
  if(!row.new_url)continue;
  let current=row.old_url,hops=0;const seen=new Set();
  while(map.get(current)){if(seen.has(current)){issues.push(issue('loop','Redirect loop detected',row.old_url));break;}seen.add(current);current=map.get(current);hops++;if(hops>rows.length+1)throw Error('Traversal guard');}
  if(hops>1&&!seen.has(current))issues.push(issue('chain',hops+' redirect hops; prefer a direct reviewed destination',row.old_url));
  const supplied=input.destinationStatuses?.[current];
  if(supplied!==undefined&&Number(supplied)>=400)issues.push(issue('missing','Supplied status export marks the destination as missing',row.old_url));
 }
 return {title:'Migration map review',summary:rows.length+' decisions reviewed. Live reachability is unchecked. Query changes require human review.',rows,issues,markdown:rows.map(r=>'- '+r.old_url+' → '+(r.new_url||'Retired')+' ('+r.status+')').join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+table(['Old URL','Destination','Status'],r.rows.map(x=>[x.old_url,x.new_url||'Retired',x.status]))+issuesHTML(r.issues);
