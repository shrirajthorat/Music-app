$(document).ready(function () {
    
    $("#MyTerms").on('click', function () {
      
     window.location = "/HTML/terms&Privacy.html"

    })
    
    $("#Language").on('click', function () {
      
        window.location = "/HTML/language.html"
   
       })

       $("#Invite").on('click', function () {
      
        window.location = "https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
   
       })

       $("#Help").on('click', function () {
      
        window.location = "/HTML/help.html"
   
       })

       $("#EditProfile").on('click', function () {
      
        window.location = "/HTML/EditProfile.html"
   
       })
})