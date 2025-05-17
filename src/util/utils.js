export function triggerFileDownload({url , title = "Document" , uplaodDate}){
    if(!url){
        console.log("no URL provided for the download");
        return ; 
    }
    //creating a good file name 
    const date = uplaodDate ? uplaodDate : "unknown-date" ; 
    const fileName = `${title}-${date}.pdf`; 

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}
