var createPost = $('<div>').addClass("post").attr('id','createPost')
var newTextArea = $('<textarea>').css({width:'100%',height:'100px'}).attr('id','newText')
var newInput = $('<button>').css('display','block').html('SUBMIT').attr('id','submit')
createPost.append(newTextArea,newInput)

$('#CreatePost').on('click', function(){
    $('#PostBox').prepend(createPost)
})

$(document).on('click','#submit', function(){
    parseandBuild($('#newText').val())
    var submitPost = $('<div>').html($('#newText').val())
    $('#PostBox').prepend(submitPost)
    $('#createPost').remove()
})

function parseAndBuildt(s){
    var newPost
    for(var i = 0; i<s.length;i++){
        
        if(s[i]=='\n'){
            newPost += '\n'
            console.log('newline!')
        }
    }
}