var pathArray = this.location.pathname.split( '/' );
var callingPage = pathArray[pathArray.length-1];
var id = {
    "blogger1": ["Blogger1"],
    "blogger2": ["Blogger2"],
    "visitor" : ["Visitor"]
};
var title = {
    "withData.html": ["iWatch"],
    "Article_iWatch.html": ["iWatch"],
    "Article_Scottish.html" : ["scottish"],
    "Article_SocialResearch.html" : ["social"],
    "Article_Syria_Iraq.html" : ["syria"]
};

function addComment(){
    var ID = document.getElementById("identity").value;
    var comment = document.getElementById("newComment").value;
    var addNewComment = document.getElementById("listComment");
    var entry = getEntry(ID);

    if(ID == "visitor" && getName(ID,0) == ""){
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
                                        "<h3>" + getName(ID,0) + "</h3>"+
                                        "<p>" + comment + "</p>"+
                                    "</div>"+
                              "</div>"+ addNewComment.innerHTML;
    setJSONFile(ID);
}
function getEntry(ID){
    if(ID == "blogger1") return "entry1";
    else if(ID == "blogger2") return "entry2";
    else return "entryVisitor";
}
function getName(ID, ctrl){
    if(ID == "blogger1") return "Blogger1";
    else if(ID == "blogger2") return "Blogger2";
    else return (ctrl == 0)?document.getElementById("visitorName").value:"Visitor";   
}
function getJSONDate(){
    var systemDate = new Date();
    return systemDate.getMonth()+"/"+ systemDate.getDate()+"/" + systemDate.getFullYear();
}
// Testing
function setJSONFile(){
    var txt = {
        date: getJSONDate(),
        article: title[callingPage],
        identity: getName(document.getElementById("identity").value,1),
        name: getName(document.getElementById("identity").value,0),
        comment: document.getElementById("newComment").value,
        location: getCurrentLocation(),
        deleted : 0
    };
    // parse json > re-write > store
    
    console.log(txt);
    // console.log(JSON.parse(txt));
}