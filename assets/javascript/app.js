var newPost = $('<div>').addClass("post").attr('id','newPost')
var newTextArea = $('<textarea>').css({width:'100%',height:'100px'})
var newInput = $('<button>').css('display','block').html('SUBMIT').attr('id','submit')
newPost.append(newTextArea,newInput)

$('#CreatePost').on('click', function(){
    $('#PostBox').prepend(newPost)
})

$(document).on('click','#submit', function(){
    $('#newPost').remove()
})