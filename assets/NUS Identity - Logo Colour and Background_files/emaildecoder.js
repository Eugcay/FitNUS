function EmailTextAreaShape(shape,coord,address)
{coded=address
cipher="aZbYcXdWeVfUgThSiRjQkPlOmNnMoLpKqJrIsHtGuFvEwDxCyBzA1234567890"
shift=coded.length
link=""
for(i=0;i<shift;i++){if(cipher.indexOf(coded.charAt(i))==-1){ltr=coded.charAt(i)
link+=(ltr)}
else{ltr=(cipher.indexOf(coded.charAt(i))-shift+cipher.length)%cipher.length
link+=(cipher.charAt(ltr))}}
document.write("<area shape='"+shape+"' coords='"+coord+"' href='mailto:"+link+"' target='_blank'>");}
function EmailText(address)
{coded=address
cipher="aZbYcXdWeVfUgThSiRjQkPlOmNnMoLpKqJrIsHtGuFvEwDxCyBzA1234567890"
shift=coded.length
link=""
for(i=0;i<shift;i++){if(cipher.indexOf(coded.charAt(i))==-1){ltr=coded.charAt(i)
link+=(ltr)}
else{ltr=(cipher.indexOf(coded.charAt(i))-shift+cipher.length)%cipher.length
link+=(cipher.charAt(ltr))}}
document.write(link);}
function EmailLink(address,displaytext)
{coded=address
cipher="aZbYcXdWeVfUgThSiRjQkPlOmNnMoLpKqJrIsHtGuFvEwDxCyBzA1234567890"
shift=coded.length
link=""
for(i=0;i<shift;i++){if(cipher.indexOf(coded.charAt(i))==-1){ltr=coded.charAt(i)
link+=(ltr)}
else{ltr=(cipher.indexOf(coded.charAt(i))-shift+cipher.length)%cipher.length
link+=(cipher.charAt(ltr))}}
if(displaytext=="")
{document.write("<a href='mailto:"+link+"'>"+link+"</a>");}
else
{document.write("<a href='mailto:"+link+"'>"+displaytext+"</a>");}}
function EmailLinkSubject(address,displaytext,subject)
{coded=address
cipher="aZbYcXdWeVfUgThSiRjQkPlOmNnMoLpKqJrIsHtGuFvEwDxCyBzA1234567890"
shift=coded.length
link=""
for(i=0;i<shift;i++){if(cipher.indexOf(coded.charAt(i))==-1){ltr=coded.charAt(i)
link+=(ltr)}
else{ltr=(cipher.indexOf(coded.charAt(i))-shift+cipher.length)%cipher.length
link+=(cipher.charAt(ltr))}}
if(displaytext=="")
{document.write("<a href='mailto:"+link+"?subject="+subject+"'>"+link+"</a>");}
else
{document.write("<a href='mailto:"+link+"?subject="+subject+"'>"+displaytext+"</a>");}}