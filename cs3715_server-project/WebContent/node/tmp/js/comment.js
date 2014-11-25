/*comment.js*/
function addComment(){
    var ID = document.getElementById("identity").value;
    var comment = document.getElementById("newComment").value;
    var addNewComment = document.getElementById("listComment");
    var entry = getEntry(ID);

    if(ID == "visitor" && getName(ID) == ""){
        alert("Please enter your name.");
        return;
    }
    if(comment == ""){
        alert("You cannot publish without a comment.");
    }

    addNewComment.innerHTML = "<div class=" + getEntry(ID) + ">"+
                                    "<div class='photo'>"+
                                        "<a href='../img/guest.png'><img src='../img/guest.png' title='Guest1' alt='Guest1'></a>"+
                                    "<div>"+
                                    "<div class= 'content'>"+
                                        "<h3>" + getName(ID) + "</h3>"+
                                        "<p>" + comment + "</p>"+
                                    "</div>"+
                              "</div>"+ addNewComment.innerHTML;
}
function getEntry(ID){
    if(ID == "blogger1") return "entry1";
    else if(ID == "blogger2") return "entry2";
    else return "entryVistor";
}
function getName(ID){
    if(ID == "blogger1") return "Blogger1";
    else if(ID == "blogger2") return "Blogger2";
    else return document.getElementById("vistorName").value;;   
}
function getJSONDate(){
    var systemDate = new Date();
    return systemDate.getMonth()+"/"+ systemDate.getDate()+"/" + systemDate.getFullYear();
}