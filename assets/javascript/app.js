var creatingNewPost = false
var editingPost = false
var database = firebase.database()
var postsObj
var editPostID 

console.log(database.ref())

// database.ref('posts').once('value',function(snapshot){
//     postsObj = snapshot.val()
//     for (key in postsObj){ 
//         var newPost = $('<div class="post">').html(postsObj[key]).attr('id',key)
//         var edit = $('<button class="edit">').html('Edit').attr('postKey', key).addClass('editButtons')
//         var cancel = $('<button class="editcancel" hidden>').html('Cancel').addClass('editButtons')
//         var removePost = $('<button class="delete">').attr('postKey',key).html('Delete').addClass('delete')
//         newPost.append(edit,cancel,removePost)
//         $('#PostBox').prepend(newPost)
//     }
// })

database.ref('posts').on('child_added',function(snapshot){
    var postObj = snapshot.val()
    var key = snapshot.key
    var newPost = $('<div class="post">').html(postObj).attr('id',key)
    var edit = $('<button class="edit">').html('Edit').attr('postKey', key).addClass('editButtons')
    var cancel = $('<button class="editcancel" hidden>').html('Cancel').addClass('editButtons')
    var removePost = $('<button class="delete">').attr('postKey',key).html('Delete').addClass('delete')
    newPost.append(edit,cancel,removePost)
    $('#PostBox').prepend(newPost)
})

database.ref('posts').on('child_changed',function(snapshot){
    var postID = snapshot.key
    $('#'+postID).html(snapshot.val())
})

database.ref('posts').on('child_removed',function(snapshot){
    var postID = snapshot.key
    $('#'+postID).remove()
})

$('#CreatePost').on('click', function(){
    if (creatingNewPost == true){return false}
    creatingNewPost = true

    var createPost = $('<div>').addClass("post").attr('id','createPost')
    
    var newTitle = $('<div contenteditable>').attr('id','newTitle')
    var newTextArea = $('<div contenteditable>').attr('id','newText')
    
    var newButtons = $('<div>')
    var newInput = $('<button>').html('SUBMIT').attr('id','submit')
    var newCancel = $('<button>').html('CANCEL').attr('id','cancel')
    var newFont = $('<i class="fas fa-font"></i>')
    var addFile = $('<input type="file" multiple="true">').css('display','none').attr({id: 'addFile'})
    var addFileLabel = $('<label for="addFile">')
    addFileLabel.append('<i class="fas fa-paperclip"></i>')
    newButtons.append(newInput, newFont,addFile, addFileLabel, newCancel)

    createPost.append(newTitle,newTextArea,newButtons)
    $('#PostBox').prepend(createPost)
})

$(document).on('click','#cancel',function(){
    creatingNewPost = false
    $('#createPost').remove()
})

$(document).on('click','#submit', function(){
    creatingNewPost = false
    var newPost = $('<div>').addClass('post')
    var newPostBody = $('<div>').html($('#newText').html()).addClass('postBody postElement')
    var newTitle = $('<div>').html($('#newTitle').html()).addClass('title postElement')
    var newDate = $('<div>').html(firebase.firestore.Timestamp.now().toDate()).addClass('date')
    newPost.append(newTitle,newPostBody,newDate)

    database.ref('posts').push(newPost.html())
    $('#createPost').remove()

})

$(document).on('click','.edit',function(){

    editPostID = $(this).attr('postKey')
    $('.edit').attr('hidden',true)
    $(this).siblings('.postElement').attr('contenteditable',true)
    var edited = $('#'+editPostID)
    var submit = $('<button id="editsubmit">').html('Submit').addClass('editButtons')
    edited.append(submit)
    var cancel = edited.children('.editcancel')[0]
    $(cancel).removeAttr('hidden')
})

$(document).on('click','.editcancel',function(){
    $(this).siblings('.postElement').removeAttr('contenteditable')
    $('.edit').removeAttr('hidden')
    $('#editsubmit').remove()
    $(this).attr('hidden',true)
})

$(document).on('click','#editsubmit',function(){
    $(this).siblings('.postElement').removeAttr('contenteditable')
    var edited = $('#'+editPostID)
    var editedDate = $('<div>').html('Edited:' + firebase.firestore.Timestamp.now().toDate()).addClass('date')
    edited.append(editedDate)
    $('.editButtons').remove()
    database.ref('posts/'+editPostID).set(edited.html())
})

$(document).on('click','.delete',function(){
    var editPostID = $(this).attr('postKey')
    var edited = $('#'+editPostID)
    database.ref('posts/'+editPostID).remove()

})

$(document).on('keypress','#newTitle',function(event){
    if ($('#newTitle').text().length > 40 && event.which != 8) {
        return false
    }
    return (event.which != 13)
})



