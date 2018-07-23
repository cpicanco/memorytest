var asRFC822 = function(user, data){
  var message =
  'From: '+ user.name+ ' <' + user.email + '>' + '\r\n' +
  'To: Rafael Picanço <cpicanco42@gmail.com>' + '\r\n' +
  'Subject: [experiment-0 from '+ user.id +']' + '\r\n\r\n' +
  data + '\r\n';

  return message.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

function sendGMailMessage(user, data, callback) {
  var me = {
    name : user.getBasicProfile().getName(),
    email: user.getBasicProfile().getEmail(),
    id   : user.getBasicProfile().getId()
  };
  var base64EncodedEmail = Base64.encodeURI(asRFC822(me, data));
  var request = window.gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': base64EncodedEmail
    }
  });
  request.execute(callback);
};

export { sendGMailMessage };