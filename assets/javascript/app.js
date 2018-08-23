var creatingNewPost = false
var database = firebase.database()

database.ref('posts').on('value',function(snapshot){
    var postsObj = snapshot.val()
    for (key in postsObj){
        var newPost = $('<div class="post">').html(postsObj[key])
        $('#PostBox').prepend(newPost)
    }
})

$('#CreatePost').on('click', function(){
    if (creatingNewPost == true){return false}
    creatingNewPost = true

    var createPost = $('<div>').addClass("post").attr('id','createPost')
    
    var newTitle = $('<div contenteditable>').attr('id','newTitle')
    var newTextArea = $('<div contenteditable>').attr('id','newText')
    
    var newButtons = $('<div>')
    var newInput = $('<button>').html('SUBMIT').attr('id','submit')
    var newFont = $('<i class="fas fa-font"></i>')
    var addFile = $('<input type="file" multiple="true">').css('display','none').attr({id: 'addFile'})
    var addFileLabel = $('<label for="addFile">')
    addFileLabel.append('<i class="fas fa-paperclip"></i>')
    newButtons.append(newInput, newFont,addFile, addFileLabel)

    createPost.append(newTitle,newTextArea,newButtons)
    $('#PostBox').prepend(createPost)
})

$(document).on('click','#submit', function(){
    creatingNewPost = false
    var newPost = $('<div>').addClass('post')
    var newPostBody = $('<div>').html($('#newText').html()).addClass('postBody')
    var newTitle = $('<div>').html($('#newTitle').html()).addClass('title')
    var newDate = $('<div>').html(firebase.firestore.Timestamp.now().toDate()).addClass('date')
    newPost.append(newTitle,newPostBody,newDate)

    database.ref('posts').push(newPost.html())
    $('#createPost').remove()
})



$(document).on('keypress','#newTitle',function(event){
    if ($('#newTitle').text().length > 40 && event.which != 8) {
        return false
    }
    return (event.which != 13)
})

// function parseAndBuild(s){
//     var newPost = ""
//     for(var i = 0; i<s.length;i++){
//         if(s[i]=='\n'){
//             newPost += '<br>'
//             console.log(newPost,'a')
//         }
//         else{
//             newPost += s[i]
//         }
//     }
//     console.log(newPost)
//     return newPost
// }
